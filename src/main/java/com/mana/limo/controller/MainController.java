package com.mana.limo.controller;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.User;
import com.mana.limo.service.UserService;
import com.mana.limo.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
public class MainController {

    @Autowired
    UserService userService;

    @RequestMapping(value={"","/"})
    public String main(Model model, @RequestParam(value = "logged", required = false, defaultValue = "false") Boolean logged){
        model.addAttribute("pageTitle","Limousine");
        User user=userService.getCurrentUser();
        if(user==null) {
            return "redirect:/login.html";
        }
        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrintName()).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", Constants.TITLE);
        model.addAttribute("pageTitle", Constants.TITLE+" :: Home ");
        return "index";
    }

    @GetMapping("/login.html")
    public String showLoginForm(Model model, @RequestParam(value = "error", required = false) String error) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken ) {
            return "login";
        }

        if(error!=null && error.equals("true")){
            model.addAttribute("errorMsg","Invalid username/password combination!");
        }else{
            System.err.println("not error");
            model.addAttribute("errorMsg","Please sign in");
        }
        System.err.println("checking");
        model.addAttribute("title", Constants.TITLE);
        model.addAttribute("pageTitle", Constants.TITLE+" :: Home ");
        return "redirect:/";
    }

    @RequestMapping("/logout.html")
    public String logout(){
        return "redirect:/login.html";
    }

    @Lazy
    @Bean
    public User getCurrentUser(){
        return userService.getCurrentUser();
    }

}
