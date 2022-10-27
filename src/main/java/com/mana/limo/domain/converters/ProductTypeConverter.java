package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.ProductType;
import org.springframework.core.convert.converter.Converter;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class ProductTypeConverter implements Converter<String, ProductType> {
    @Override
    public ProductType convert(String source) {
        if(source!=null){
            try{
                return ProductType.get(Integer.parseInt(source));
            }catch(Exception e){
                return null;
            }
        }
        return null;
    }
}
