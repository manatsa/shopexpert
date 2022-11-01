package com.mana.limo.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @author :: codemaster
 * created on :: 14/10/2022
 * Package Name :: com.mana.limo.domain
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    UserAuthenticationProvider authenticationProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public PasswordEncoder createPasswordEncoder(){
        return new BCryptPasswordEncoder(8);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/resources/**", "/WEB-INF/views/**").permitAll()
                .antMatchers("/bootstrap-5.2/**", "/font-awesome-4.1.0/**").permitAll()
                .antMatchers("/datatables/**", "/jquery-ui/**","/mdb/**").permitAll()
                .antMatchers("/resources/**", "/WEB-INF/views/*","/images/**").permitAll()
                .antMatchers("/css/**", "/jquery-validate/**","/js/**","/mui/*").permitAll()
                .antMatchers("/autocomplete/**").permitAll()
                .antMatchers("/login.html","/logout","/logins","/logout.html").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .permitAll()
                .passwordParameter("password")
                .usernameParameter("username")
                .loginPage("/login.html")
                .permitAll()
                .loginProcessingUrl("/logins")
                .permitAll()
                .defaultSuccessUrl("/?logged=true")
                .permitAll()
                .failureUrl("/login.html?error=true")
                .permitAll()
                .and()
                .logout().permitAll().logoutUrl("/logout").logoutSuccessUrl("/login.html")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .permitAll();
    }

}