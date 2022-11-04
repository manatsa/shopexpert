package com.mana.limo.config;

import com.mana.limo.domain.converters.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
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
        registry.addConverter(new StringToDateConverter());
        registry.addConverter(new UserTypeConverter());
        registry.addConverter(new UserLevelConverter());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/resources/**")
                .addResourceLocations("/resources/");
    }

}