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
package com.mana.limo.domain.enums;


import com.mana.limo.util.StringUtils;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */
public enum UserLevel {
    ADMIN(1), ORGANIZATION(2), BUSINESS_UNIT(3), OTHER(4);
    
    private final Integer code;
    
    private UserLevel(Integer code){
        this.code = code;
    }
    
    public Integer getCode(){
        return code;
    }
    
    public static UserLevel get(Integer code){
        switch(code){
            case 1:
                return ADMIN;
            case 2:
                return ORGANIZATION;
            case 3:
                return BUSINESS_UNIT;
            case 4:
                return OTHER;
            default:
                throw new IllegalArgumentException("Illegal parameter passed to method :" + code);
        }
    }
    
    public String getName(){
        return StringUtils.toCamelCase3(super.name());
    }
}