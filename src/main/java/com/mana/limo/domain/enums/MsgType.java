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

/**
 *
 * @author Judge Muzinda
 */
public enum MsgType {

    success(1), danger(2), warning(3);

    private final Integer code;

    private MsgType(Integer code){
        this.code = code;
    }
    
    public Integer getCode(){
        return code;
    }
    
    public static MsgType get(Integer code){
        switch(code){
            case 1:
                return success;
            case 2:
                return danger;
            case 3:
                return warning;
            default:
                throw new IllegalArgumentException("Illegal parameter passed to method :"+code);
        }
    }
    
    public String getName(){
        return super.name();
    }

    @Override
    public String toString() {
        return super.name() != null ? getName() : null;
    }
    
}