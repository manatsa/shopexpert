package com.mana.limo.domain.enums;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author :: codemaster
 * created on :: 20/11/2022
 * Package Name :: com.mana.limo.domain.enums
 */

public enum AssetType {

    FIXED(1), CURRENT(2), OTHER(3);

    private final Integer code;

    private AssetType(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public static AssetType get(Integer code) {
        switch (code) {
            case 1:
                return FIXED;
            case 2:
                return CURRENT;
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
        if (this == FIXED) {
            return "Fixed";
        }else if (this == CURRENT) {
            return "Current";
        }else if (this == OTHER) {
            return "Other";
        }
        return null;
    }

    public static List<AssetType> getItems() {
        return new ArrayList<>(Arrays.asList(new AssetType[] {
                FIXED, CURRENT, OTHER
        }));
    }
}
