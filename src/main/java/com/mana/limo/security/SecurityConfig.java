package com.mana.limo.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth
        .userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public PasswordEncoder createPasswordEncoder(){
        return new BCryptPasswordEncoder(8);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")
                .antMatchers("/anonymous*")
                .anonymous()
                .antMatchers("/login.htm")
                .permitAll()
                .antMatchers("/datatables/**")
                .permitAll()
                .antMatchers("/bootstrap-5.2/**")
                .permitAll()
                .antMatchers("**/resources/**")
                .permitAll()
                .antMatchers("/jquery-ui-1.11.4/**")
                .permitAll()
                .antMatchers("/css/**")
                .permitAll()
                .antMatchers("/js/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .loginPage("/login.htm")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/?logged=true", true)
                .failureUrl("/login.htm?error=true")
                .and()
                .httpBasic();
    }

    /*@Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")
                .antMatchers("/anonymous*")
                .anonymous()
                .antMatchers("/login*")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .loginPage("/login.htm")
                .loginProcessingUrl("/login.htm")
                .defaultSuccessUrl("/?logged=true", true)
                .failureUrl("/login.htm?error=true")
                //.failureHandler(authenticationFailureHandler())
                .and()
                .logout()
                .logoutUrl("/logout.htm")
                .deleteCookies("JSESSIONID");
        //.logoutSuccessHandler(logoutSuccessHandler());
        //return http.build();
    }
    */

    private void authenticationFailureHandler(){

    }

    private void logoutSuccessHandler(){

    }
}