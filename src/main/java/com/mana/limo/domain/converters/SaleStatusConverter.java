package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.SaleStatus;
import com.mana.limo.domain.enums.Status;
import org.springframework.core.convert.converter.Converter;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class SaleStatusConverter implements Converter<String, SaleStatus> {
    @Override
    public SaleStatus convert(String source) {
        if(source!=null)
            try{
                return SaleStatus.get(Integer.parseInt(source));
            }catch (Exception e){
                return null;
            }
        return null;
    }
}
