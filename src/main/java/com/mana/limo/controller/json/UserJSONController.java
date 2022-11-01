package com.mana.limo.controller.json;

import com.mana.limo.domain.Organization;
import com.mana.limo.domain.User;
import com.mana.limo.service.OrganizationService;
import com.mana.limo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/users")
public class UserJSONController {

    @Autowired
    UserService userService;

    @Lazy
    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/list")
    public List<User> getAllOrganizations(){
        return userService.getAll();
    }

    @Transactional
    @PostMapping("/change-password")
    public void changePassword(@RequestParam("pass") String pass){
        String encoded=passwordEncoder.encode(pass);
        System.err.println("New Password ::"+encoded);
        User user=userService.get(userService.getCurrentUser().getId());
        user.setPassword(encoded);
        userService.Save(user);
    }

}
