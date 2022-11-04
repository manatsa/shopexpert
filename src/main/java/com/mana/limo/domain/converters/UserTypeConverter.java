package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.Status;
import com.mana.limo.domain.enums.UserType;
import org.springframework.core.convert.converter.Converter;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class UserTypeConverter implements Converter<String, UserType> {
    @Override
    public UserType convert(String source) {
        if(source!=null)
            try{
                return UserType.get(Integer.parseInt(source));
            }catch (Exception e){
                return null;
            }
        return null;
    }
}
