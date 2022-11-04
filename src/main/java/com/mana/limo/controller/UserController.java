package com.mana.limo.controller;

import com.mana.limo.domain.Customer;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.*;
import com.mana.limo.repo.PrivilegeRepo;
import com.mana.limo.service.*;
import com.mana.limo.util.Constants;
import com.mana.limo.util.Message;
import com.mana.limo.validation.ProductValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
@RequestScope
@Validated
@Transactional
public class UserController {

    @Autowired
    User user;
    @Autowired
    OrganizationService organizationService;

    @Autowired
    BusinessUnitService businessUnitService;

    @Autowired
    UserService userService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    PrivilegeRepo privilegeRepo;

    @RequestMapping("users-list")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "Users List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Users List");
        return "users/list";
    }

    @GetMapping("/users-creation")
    public String createUser(Model model,@RequestParam(value = "userId", required = false) String userId, HttpServletRequest request){
        User user=(userId!=null)?userService.get(userId):null;
        model.addAttribute("command", user==null?new User():user);
        model.addAttribute("statuses", Status.values());
        model.addAttribute("types", UserType.values());
        model.addAttribute("levels", UserLevel.values());
        List<String> privileges=userService.getCurrentUser().getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges",privileges );
        model.addAttribute("userRoles",userRoleService.getAll() );
        model.addAttribute("orgs",organizationService.getAllOrganizations() );
        model.addAttribute("bunits", businessUnitService.getAllBusinessUnits());
        model.addAttribute("title", "User Edit");
        model.addAttribute("pageTitle", Constants.TITLE+" :: User Edit");
        return "users/item";
    }

    @Transactional
    @PostMapping("/users-creation")
    public String makeProduct(Model model, @ModelAttribute("item") @Valid User user, BindingResult result){
        model.addAttribute("msg", new Message("User saved successfully!", MsgType.success));
        List<String> privileges=userService.getCurrentUser().getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "User List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: User List");
        if(result.hasErrors()){
            model.addAttribute("command", user);
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", userService.getCurrentUser());
            model.addAttribute("levels", UserLevel.values());
            model.addAttribute("privileges",privileges );
            model.addAttribute("title", "User List");
            model.addAttribute("pageTitle", Constants.TITLE+" :: User List");
            model.addAttribute("msg", new Message(result.getFieldErrors().stream().map(error->error.getField()+":"+error.getDefaultMessage()).collect(Collectors.joining("\n")), MsgType.danger));
            return "users/item";
        }
        User user1=(user.getId()==null || user.getId().isEmpty())?userService.Save(user):userService.update(user);
        return "users/list";
    }

    @RequestMapping("/users-activate")
    @Transactional
    public String activateUser(@RequestParam("userId") String userId){
        User user=userService.get(userId);
        user.setActive(!user.getActive());
        userService.update(user);
        return "users/list";
    }

}
