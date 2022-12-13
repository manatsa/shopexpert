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
import com.mana.limo.domain.enums.Status;
import com.mana.limo.domain.enums.UserLevel;
import com.mana.limo.domain.enums.UserType;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Getter
@Setter
@ToString(exclude = {"password","confirmPassword",""})
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@JsonIgnoreProperties(value = {"version","createdBy","modifiedBy"},allowGetters = true)
@Table(name = "users", indexes = {
		@Index(name = "user_user_name", columnList = "userName"),
		@Index(name = "user_user_organization", columnList = "organization"),
		@Index(name = "user_user_unit", columnList = "business_unit")
})

public class User implements Serializable {

    @Id
    private String id;
    private Status status;

   @Column(nullable = false)
    private String createdBy;

    @Column(nullable = true)
    private String modifiedBy;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date dateCreated;

    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date dateModified;

    @Version
    private Long version;
    private Boolean active = Boolean.TRUE;

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
    @ManyToOne(optional = true)
    @JoinColumn(name = "organization")
    private Organization organization;
    @ManyToOne(optional = true)
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
