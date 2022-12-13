/*
package com.mana.limo.service.impl;

import com.mana.limo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

*/
/**
 * @author :: codemaster
 * created on :: 10/11/2022
 * Package Name :: com.mana.limo.service.impl
 *//*


@Component
public class AuditorAwareImpl implements AuditorAware<com.mana.limo.domain.User> {

    @Autowired
    UserService userService;

    @Override
    public Optional<com.mana.limo.domain.User> getCurrentAuditor() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        com.mana.limo.domain.User domainUser=null;
        if ( securityContext.getAuthentication() != null ) {
            User user = (User) securityContext.getAuthentication().getPrincipal();
            domainUser=userService.findByUserName(user.getUsername());
        }

        return Optional.ofNullable(domainUser);
    }
}
*/
