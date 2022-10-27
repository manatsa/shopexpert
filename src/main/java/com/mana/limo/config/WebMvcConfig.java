package com.mana.limo.config;

import com.mana.limo.domain.converters.ExternalTypeConverter;
import com.mana.limo.domain.converters.ProductTypeConverter;
import com.mana.limo.domain.converters.SaleStatusConverter;
import com.mana.limo.domain.converters.StatusConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.config
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StatusConverter());
        registry.addConverter(new ProductTypeConverter());
        registry.addConverter(new ExternalTypeConverter());
        registry.addConverter(new SaleStatusConverter());
    }
}