package com.mana.limo.controller;

import com.mana.limo.domain.Customer;
import com.mana.limo.domain.User;
import com.mana.limo.domain.enums.ExternalType;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.CustomerService;
import com.mana.limo.service.UserService;
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
    ProductValidation productValidation;

    @Autowired
    UserService userService;

    @RequestMapping("users-list.htm")
    public String getProductList(Model model,HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "Users List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Users List");
        return "users/list";
    }

    @GetMapping("/users-creation.htm")
    public String createUser(Model model,@RequestParam(value = "userId", required = false) String userId, HttpServletRequest request){
        User user=(userId!=null)?userService.get(userId):null;
        model.addAttribute("command", user==null?new User():user);
        model.addAttribute("statuses", Status.values());
        model.addAttribute("types", ExternalType.values());
        List<String> privileges=userService.getCurrentUser().getUserRoles().stream().map(role->role.getPrivileges().stream().map(privilege -> privilege.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", "user List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: User List");
        return "users/item";
    }

    @PostMapping("/users-creation.htm")
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
            model.addAttribute("privileges",privileges );
            model.addAttribute("title", "User List");
            model.addAttribute("pageTitle", Constants.TITLE+" :: User List");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error->error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "users/item";
        }
        User user1=(user.getId()==null || user.getId().length()<1)?userService.Save(user):userService.update(user);
        return "users/list";
    }
}
