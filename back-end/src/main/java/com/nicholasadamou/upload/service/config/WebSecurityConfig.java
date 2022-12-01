package com.nicholasadamou.upload.service.config;

import java.util.Arrays;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${cors.allowed-origins}")
	private String corsAllowedOrigins;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().configurationSource(corsConfigurationSource());

		http.headers().frameOptions().sameOrigin().xssProtection().block(true);
		http.csrf().disable();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(corsAllowedOrigins.split(",")));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "HEAD", "DELETE"));
		configuration.setAllowedHeaders(Collections.singletonList("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
