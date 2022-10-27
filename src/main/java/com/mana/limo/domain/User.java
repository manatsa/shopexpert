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
package com.mana.limo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mana.limo.domain.enums.Gender;
import com.mana.limo.domain.enums.UserLevel;
import com.mana.limo.domain.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties(value = {"version"})
@Table(name = "users", indexes = {
		@Index(name = "user_user_name", columnList = "userName"),
		@Index(name = "user_user_organization", columnList = "organization"),
		@Index(name = "user_user_unit", columnList = "business_unit")
})

public class User extends BaseEntity {

    @Enumerated
    private Gender gender;
    @JsonIgnore
    private static final long serialVersionUID = 1L;
    @JsonIgnore
    private String password;
    @Transient
    @JsonIgnore
    private String confirmPassword;
    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String userName;
    @Enumerated
    private UserType userType = UserType.STAFF;
    @Enumerated
    private UserLevel userLevel;
    @ManyToOne
    @JoinColumn(name = "organization")
    private Organization organization;
    @ManyToOne
    @JoinColumn(name = "business_unit")
    private BusinessUnit businessUnit;
    @Transient
    private String displayName;
    @Transient
    private String roles;
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = {
        @JoinColumn(name = "user_id", nullable = false)}, inverseJoinColumns = {
        @JoinColumn(name = "role_id", nullable = false)})
    private Set<UserRole> userRoles = new HashSet<>();



    public String getRoles() {
        if(userRoles.isEmpty()){
            return "";
        }
        StringBuilder r = new StringBuilder();
        int pos = 1;
        for(UserRole role : userRoles){
            if(pos < userRoles.size()) {
                r.append(role.getName());
                r.append(" ,");
            }else{
                r.append(role.getName());
            }
            pos++;
        }
        return r.toString();
    }




}
