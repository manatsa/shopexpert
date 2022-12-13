package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.Currency;
import org.springframework.core.convert.converter.Converter;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class CurrencyConverter implements Converter<String, Currency> {
    @Override
    public Currency convert(String source) {
        if(source!=null)
            try{
                return Currency.get(Integer.parseInt(source));
            }catch (Exception e){
                return null;
            }
        return null;
    }
}
