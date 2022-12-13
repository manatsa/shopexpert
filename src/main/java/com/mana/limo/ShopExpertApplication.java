package com.mana.limo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.controller
 */


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ShopExpertApplication {

    public static void main(String[] args) {
//        BasicConfigurator.configure();
        SpringApplication.run(ShopExpertApplication.class, args);
    }

}
