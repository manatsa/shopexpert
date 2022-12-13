/*
 * Copyright 2016 Judge Muzinda.
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
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.controller
 */

public enum ProductType {

    SOLAR(1), CAR_SPARE(2), GROCER(3), STATIONERY(4), BUILDING(5), TOOL(6), FURNITURE(7), OTHER(8);

    private final Integer code;

    private ProductType(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public static ProductType get(Integer code) {
        switch (code) {
            case 1:
                return SOLAR;
            case 2:
                return CAR_SPARE;
            case 3:
                return GROCER;
            case 4:
                return STATIONERY;
            case 5:
                return BUILDING;
            case 6:
                return TOOL;
            case 7:
                return FURNITURE;
            case 8:
                return OTHER;
            default:
                throw new IllegalArgumentException("Illegal parameter passed to method :" + code);
        }
    }
    
    public String getName(){
        return StringUtils.toCamelCase3(super.name());
    }

}