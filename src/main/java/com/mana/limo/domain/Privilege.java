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
import com.mana.limo.util.StringUtils;
import lombok.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Role;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author Judge Muzinda
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity @JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "privilege")
public class Privilege extends BaseName {

    @Transient
    private String printName;

    @ManyToMany
    private Set<Privilege> roles;
    public Privilege(String id) {
        super(id);
    }

    public String getPrintName(){
        return StringUtils.toCamelCase3(super.getName());
    }

    @Override
    public String toString(){
        return "ID::"+this.getId()+", Name::"+getPrintName();
    }
    
}
