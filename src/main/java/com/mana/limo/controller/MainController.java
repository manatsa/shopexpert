package com.mana.limo.controller;

import com.mana.limo.domain.User;
import com.mana.limo.service.UserService;
import com.mana.limo.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
public class MainController {

    @Autowired
    UserService userService;

    @RequestMapping(value={""})
    public String main(Model model, @RequestParam(value = "logged", required = false, defaultValue = "false") Boolean logged){
        model.addAttribute("pageTitle","Limousine");
        User user=userService.getCurrentUser();
        if(user==null) {
            return "redirect:/login.htm";
        }
        model.addAttribute("user", user);
        model.addAttribute("title", Constants.TITLE);
        model.addAttribute("pageTitle", Constants.TITLE+" :: Home ");
        return "index";
    }

    @GetMapping(value = {"/login.htm"})
    public String login(){
        return "login";
    }

    @PostMapping(value = {"/login.htm"})
    public String successLogin(){
        return "redirect:/?logged=true";
    }

    @RequestMapping(value = "/logout.htm",method = RequestMethod.GET)
    public String logout(){
            return "redirect:/";
    }

    @Lazy
    @Bean
    public User getCurrentUser(){
        return userService.getCurrentUser();
    }

}
