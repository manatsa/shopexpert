package com.mana.limo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * @author :: codemaster
 * created on :: 18/10/2022
 * Package Name :: com.mana.limo.controller
 */

@EnableJpaAuditing
@SpringBootApplication
public class LimousineApplication {

    public static void main(String[] args) {
        SpringApplication.run(LimousineApplication.class, args);
    }

}
