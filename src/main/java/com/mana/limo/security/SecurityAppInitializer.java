package com.mana.limo.security;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * @author :: codemaster
 * created on :: 29/10/2022
 * Package Name :: com.mana.limo.security
 */


public class SecurityAppInitializer  extends AbstractSecurityWebApplicationInitializer {

    public SecurityAppInitializer() {
        super(SecurityConfig.class);
    }
}