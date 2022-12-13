package com.mana.limo.domain.converters;

import com.mana.limo.domain.enums.AssetType;
import com.mana.limo.domain.enums.ExternalType;
import org.springframework.core.convert.converter.Converter;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.domain.converters
 */

public class AssetTypeConverter implements Converter<String, AssetType> {
    @Override
    public AssetType convert(String source) {
        if(source!=null)
            try{
                return AssetType.get(Integer.parseInt(source));
            }catch (Exception e){
                return null;
            }
        return null;
    }
}
