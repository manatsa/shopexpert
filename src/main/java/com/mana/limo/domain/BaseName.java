/*
 * Copyright 2014 Judge Muzinda.
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
import com.mana.limo.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.io.Serializable;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@MappedSuperclass
abstract public class BaseName extends BaseEntity implements Serializable {

    private String name;
    @JsonIgnore
    private String description;
    public BaseName(String id) {
        super(id);
    }


    @Transient
    public String getShortName() {
        String raw = name.trim();
        if (raw.split("\\s").length > 1) {
            String output = "";
            String[] arr = raw.split("\\s");
            if (arr[0].length() >= 3) {
                output += arr[0].substring(0, 3);
            }
            if (arr[1].length() >= 3) {
                output += " " + arr[1];
            }
            return StringUtils.toCamelCase2(output);
        }
        if (name.length() >= 7) {
            return getName().substring(0, 6);
        }
        return getName();
    }


}
