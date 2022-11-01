package com.mana.limo.security;

/**
 * @author :: codemaster
 * created on :: 29/10/2022
 * Package Name :: com.mana.limo.security
 */

import com.mana.limo.domain.User;
import com.mana.limo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {

    Logger logger = LoggerFactory.getLogger(UserAuthenticationProvider.class);

    private UserService userService;

    private PasswordEncoder encoder;

    public UserAuthenticationProvider(UserService repository, PasswordEncoder encoder) {
        this.encoder = encoder;
        this.userService = repository;
    }

    /**
     * Get the username and password from authentication object and validate with password encoders matching method
     * @param authentication
     * @return
     * @throws AuthenticationException
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = userService.findByUserName(username);
        if (user == null) {
            throw new BadCredentialsException("Details not found");
        }

        if (encoder.matches(password, user.getPassword())) {
            logger.info("Successfully Authenticated the user");
            return new UsernamePasswordAuthenticationToken(username, password, getUserRoles(user.getUserRoles().stream().map(r->r.getName()).collect(Collectors.joining(","))));
        } else {
            throw new BadCredentialsException("Password mismatch");
        }
    }

    /**
     * An user can have more than one roles separated by ",". We are splitting each role separately
     * @param userRoles
     * @return
     */
    private List<GrantedAuthority> getUserRoles(String userRoles) {
        List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
        String[] roles = userRoles.split(",");
        for (String role : roles) {
            logger.info("Role: " + role);
            grantedAuthorityList.add(new SimpleGrantedAuthority(role.replaceAll("\\s+", "")));
        }

        return grantedAuthorityList;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}