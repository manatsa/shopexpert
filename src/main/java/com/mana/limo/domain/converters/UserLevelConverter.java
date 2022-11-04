package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.UserLevel;
import com.mana.limo.domain.enums.UserType;
import org.springframework.core.convert.converter.Converter;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class UserLevelConverter implements Converter<String, UserLevel> {
    @Override
    public UserLevel convert(String source) {
        if(source!=null)
            try{
                return UserLevel.get(Integer.parseInt(source));
            }catch (Exception e){
                return null;
            }
        return null;
    }
}
