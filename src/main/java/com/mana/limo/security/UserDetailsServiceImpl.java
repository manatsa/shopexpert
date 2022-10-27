/*
 * Copyright 2015 Judge Muzinda.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.mana.limo.security;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.UserRole;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Service
@Slf4j
public class UserDetailsServiceImpl implements org.springframework.security.core.userdetails.UserDetailsService {
    
    final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    
    @Resource
    private UserService userService;
    @Autowired
    private UserRoleService userRoleService;

    @Override
    public UserDetails loadUserByUsername(String userName)
            throws UsernameNotFoundException {

        //log.info("Loading user record for user name: {}", userName);
        UserDetails userDetails = null;

        com.mana.limo.domain.User user =  userService.findByUserName(userName);
        //log.error("Loading user record for user: {}", user);

        if (user != null) {
            String password = user.getPassword();
            //System.out.println("++++++++++++++++++++++++++++++++++++++++++++ "+user.toString());
            Set<UserRole> roles = user.getUserRoles();
            List<GrantedAuthority> authorities = new ArrayList<>();
            roles.stream().forEach(role-> {
                roles.stream().forEach(userRole -> {
                    Set<Privilege> privileges=userRole.getPrivileges();
                    privileges.stream().forEach(privilege -> {
                        authorities.add(new SimpleGrantedAuthority(privilege.getName()));
                    });
                });
            });
            userDetails = new User(userName, password, authorities);

        } else {
            // If username not found, throw exception

            throw new UsernameNotFoundException("User " + userName + " not found");

        }
        return userDetails;
    }
}