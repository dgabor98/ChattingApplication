package com.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        String frontendOrigin = System.getenv("FRONTEND_ORIGIN");
        if (frontendOrigin != null && !frontendOrigin.equals("")) {
            config.setAllowedOrigins(Arrays.asList(frontendOrigin.split(",")));
        } else {
            String localOrigin = System.getenv("LOCAL_ORIGIN");
            config.setAllowedOrigins(Arrays.asList(localOrigin));
        }

        config.setAllowCredentials(true);

        config.addAllowedMethod("*");
        config.addAllowedHeader("*");

        config.addExposedHeader(HttpHeaders.SET_COOKIE);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
