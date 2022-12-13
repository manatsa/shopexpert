package com.mana.limo.domain.enums;

import com.mana.limo.util.StringUtils;

public enum Currency {
    USD(1), RAND(2), PULA(3), ZWL(4), KWACHA(5), METICASH(6), SHILLING(7), OTHER(8);

    private final Integer code;

    private Currency(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public static Currency get(Integer code) {
        switch (code) {
            case 1:
                return USD;
            case 2:
                return RAND;
            case 3:
                return PULA;
            case 4:
                return ZWL;
            case 5:
                return KWACHA;
            case 6:
                return METICASH;
            case 7:
                return SHILLING;
            case 8:
                return OTHER;
            default:
                throw new IllegalArgumentException("Illegal parameter passed to method :" + code);
        }
    }

    public String getName(){
        return StringUtils.toCamelCase3(super.name());
    }

}
