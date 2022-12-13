package com.mana.limo.controller.json;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.UserRole;
import com.mana.limo.repo.PrivilegeRepo;
import com.mana.limo.service.PrivilegeService;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/privileges")
public class PrivilegesJSONController {

    @Autowired
    PrivilegeService privilegeService;



    @GetMapping("/list")
    public List<Privilege> getAllPrivileges(){
        return privilegeService.getAllPrivileges();
    }



}
