package com.mana.limo.controller.json;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.User;
import com.mana.limo.domain.UserRole;
import com.mana.limo.repo.PrivilegeRepo;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/role")
public class RolesJSONController {

    @Autowired
    UserService userService;

    @Autowired
    PrivilegeRepo privilegeRepo;

    @Autowired
    UserRoleService userRoleService;


    @GetMapping("/list")
    public List<UserRole> getAllRoles(){
        return userRoleService.getAll();
    }



}
