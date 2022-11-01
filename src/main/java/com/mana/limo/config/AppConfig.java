package com.mana.limo.config;

/**
 * @author :: codemaster
 * created on :: 29/10/2022
 * Package Name :: com.mana.limo.config
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.text.SimpleDateFormat;

@EnableWebMvc
@Configuration
public class AppConfig implements WebMvcConfigurer{

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver irvr = new InternalResourceViewResolver();
        irvr.setPrefix("WEB-INF/views/");
        irvr.setSuffix(".jsp");
        irvr.setOrder(0);
        return irvr;
    }

    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper mapper = converter.getObjectMapper();
        Hibernate5Module hibernate5Module = new Hibernate5Module();
        mapper.registerModule(hibernate5Module);
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
        return converter;
    }
}