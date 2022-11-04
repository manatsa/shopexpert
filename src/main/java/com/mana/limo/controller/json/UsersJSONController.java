package com.mana.limo.controller.json;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.Product;
import com.mana.limo.domain.User;
import com.mana.limo.domain.UserRole;
import com.mana.limo.repo.PrivilegeRepo;
import com.mana.limo.service.ProductService;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/user")
public class UsersJSONController {

    @Autowired
    UserService userService;

    @Autowired
    PrivilegeRepo privilegeRepo;

    @Autowired
    UserRoleService userRoleService;


    @GetMapping("/list")
    public List<User> getAllProducts(){
        return userService.getAll();
    }

    @Transactional
    @GetMapping("/activate")
    public List<User> activateUser(@Param("userId") String userId){
        User user=userService.get(userId);
        if(user!=null){
            user.setActive(!user.getActive());
            userService.update(user);
        }
        return userService.getAll();
    }

    @Transactional
    @RequestMapping("/reset-password")
    public void resetPassword(@Param("userId") String userId, @Param("pass") String pass){
        User user=userService.get(userId);
        if(user!=null){
            user.setPassword(new BCryptPasswordEncoder(8).encode(pass));
            userService.update(user);
        }
    }

    @Transactional
    @RequestMapping("/get-privileges-by-role")
    public List<Privilege> getPrivilegesByRole(@Param("roleId") String roleId){
        return privilegeRepo.findAllByRolesIn(List.of(userRoleService.get(roleId)));
    }


}
