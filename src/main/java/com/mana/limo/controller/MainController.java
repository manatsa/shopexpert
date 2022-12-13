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
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @Autowired
    private ServletContext context;

    @RequestMapping(value={"","/"})
    public String main(Model model, @RequestParam(value = "logged", required = false, defaultValue = "false") Boolean logged){
        model.addAttribute("pageTitle","Limousine");
        User user=userService.getCurrentUser();
        if(user==null) {
            return "redirect:/login.html";
        }

        List<String> privileges=user.getUserRoles().stream().map(role->role.getPrintName()).collect(Collectors.toList());
        model.addAttribute("user", user);
        model.addAttribute("context", context.getContextPath());
        model.addAttribute("privileges",privileges );
        model.addAttribute("title", Constants.TITLE);
        model.addAttribute("logged",(logged)?logged:null);
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
            model.addAttribute("errorMsg","Please sign in");
        }
        model.addAttribute("title", Constants.TITLE);
        model.addAttribute("pageTitle", Constants.TITLE+" :: Home ");
        return "redirect:/";
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        SecurityContextHolder.getContext().setAuthentication(null);
        return "redirect:/login.html";
    }

    @Lazy
    @Bean
    public User getCurrentUser(){
        return userService.getCurrentUser();
    }

}
