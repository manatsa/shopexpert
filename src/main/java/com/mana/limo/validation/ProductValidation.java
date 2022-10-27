package com.mana.limo.validation;

import com.mana.limo.domain.Product;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.validation
 */

@Component
public class ProductValidation implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(Product.class);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Product product=(Product)target;

        ValidationUtils.rejectIfEmpty(errors, "name","empty.message");
        ValidationUtils.rejectIfEmpty(errors, "description","empty.message");
        ValidationUtils.rejectIfEmpty(errors, "status","empty.message");
        ValidationUtils.rejectIfEmpty(errors, "productType","empty.message");
        ValidationUtils.rejectIfEmpty(errors, "packaging","empty.message");
        ValidationUtils.rejectIfEmpty(errors, "price","empty.message");


    }
}
