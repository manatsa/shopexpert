package com.mana.limo.controller;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.UserRole;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.PrivilegeService;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import com.mana.limo.util.Constants;
import com.mana.limo.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 3/11/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
@Transactional
public class RoleController {

    @Autowired
    UserService userService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    PrivilegeService privilegeService;

    @Transactional
    @GetMapping("/roles-list")
    public String getAllRoles(Model model, HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("title", "Roles List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Roles List");
        return "roles/list";
    }

    @GetMapping("roles-creation")
    public String createRole(Model model,@RequestParam(value = "roleId", required = false) String roleId){
        UserRole userRole=(roleId!=null)?userRoleService.get(roleId):new UserRole();
        List<Privilege> privileges=privilegeService.getAllPrivileges();
            model.addAttribute("command", userRole);
            model.addAttribute("user", userService.getCurrentUser());
            model.addAttribute("title", "Roles List");
            model.addAttribute("statuses", Status.values());
            model.addAttribute("privileges", privileges);
            model.addAttribute("pageTitle", Constants.TITLE+ ((userRole.getId()==null)?" New Role":" Edit Role::"+userRole.getName()));
        return "roles/item";
    }

    @Transactional
    @PostMapping("/roles-creation")
    public String makePrivilege(Model model, @ModelAttribute("item") @Valid UserRole userRole, BindingResult result) {
        model.addAttribute("msg", new Message("Privilege saved successfully!", MsgType.success));
        List<String> privileges = userService.getCurrentUser().getUserRoles().stream().map(role -> role.getPrivileges().stream().map(p -> p.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges", privileges);
        model.addAttribute("title", "Privilege List");
        model.addAttribute("pageTitle", Constants.TITLE + " :: Privilege List");
        if (result.hasErrors()) {
            model.addAttribute("command", userRole);
            model.addAttribute("statuses", Status.values());
            model.addAttribute("user", userService.getCurrentUser());
            model.addAttribute("privileges", privileges);
            model.addAttribute("title", "Privileges List");
            model.addAttribute("pageTitle", Constants.TITLE + " :: Privileges List");
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error -> error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            return "roles/item";
        }
//        System.err.println(privilege);
        UserRole userRole1 = (userRole.getId() == null || userRole.getId().length() < 1) ? userRoleService.save(userRole) : userRoleService.update(userRole);
        return "roles/list";
    }
}
