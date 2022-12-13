package com.mana.limo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author :: codemaster
 * created on :: 12/12/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
public class AccessDeniedController {

    @GetMapping("/access-denied")
    public String getAccessDenied() {
        return "/errors/403";
    }
}
