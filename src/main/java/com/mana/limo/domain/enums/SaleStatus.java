/*
 * Copyright 2015 Edward Zengeni.
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.controller
 */
public enum SaleStatus {

    ACTIVE(1), CANCELLED(2), OTHER(3);

    private final Integer code;

    private SaleStatus(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public static SaleStatus get(Integer code) {
        switch (code) {
            case 1:
                return ACTIVE;
            case 2:
                return CANCELLED;
            case 3:
                return OTHER;
            default:
                throw new IllegalArgumentException("Illegal parameter passed to method :" + code);
        }
    }
    
    public String getName(){
        //return StringUtils.toCamelCase3(super.name());
        return getAltName();
    }
    
    public String getAltName() {
        if (this == ACTIVE) {
            return "Active";
        }else if (this == CANCELLED) {
            return "Cancelled";
        }else if (this == OTHER) {
            return "Other";
        }
        return null;
    }
    
    public static List<SaleStatus> getItems() {
        return new ArrayList<>(Arrays.asList(new SaleStatus[] {
            ACTIVE, CANCELLED, OTHER
        }));
    }
}
