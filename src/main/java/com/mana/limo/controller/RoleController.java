package com.mana.limo.controller;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.UserRole;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.PrivilegeService;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import com.mana.limo.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
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
        privileges.forEach(System.err::println);
            model.addAttribute("command", userRole);
            model.addAttribute("user", userService.getCurrentUser());
            model.addAttribute("title", "Roles List");
            model.addAttribute("statuses", Status.values());
            model.addAttribute("privileges", privileges);
            model.addAttribute("pageTitle", Constants.TITLE+ ((userRole.getId()==null)?" New Role":" Edit Role::"+userRole.getName()));
        return "roles/item";
    }
}
