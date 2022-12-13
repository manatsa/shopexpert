package com.mana.limo.controller.json;

import com.mana.limo.domain.Organization;
import com.mana.limo.domain.User;
import com.mana.limo.service.OrganizationService;
import com.mana.limo.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/change-password")
    public ResponseEntity changePassword(@RequestParam("pass") String pass, @RequestParam(value = "userId", required = false) String userId){

        User user=userService.get(userId!=null?userId:userService.getCurrentUser().getId());
        System.err.println(pass+" and "+user);
        String encoded=passwordEncoder.encode(pass);
        user.setPassword(encoded);
        userService.update(user);
        return ResponseEntity.ok("Changed password successfully!");
    }


    @Data
    class ChangePassDTO{
        public String pass;
        public String userId;
    }

}
