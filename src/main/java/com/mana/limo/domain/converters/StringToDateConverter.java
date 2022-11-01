package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.Status;
import org.springframework.core.convert.converter.Converter;

import java.util.Date;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class StringToDateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String source) {
        if(source!=null)
            try{
                return new Date(Date.parse(source));
            }catch (Exception e){
                return null;
            }
        return null;
    }
}
