package com.edu.auth.configer;



import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configurable
@EnableWebSecurity
public class AuthConfiger {
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) {
		http
		.authorizeHttpRequests(auth->auth.anyRequest().authenticated())
		.oauth2Login(Customizer.withDefaults());
		return http.build();
	}
}
