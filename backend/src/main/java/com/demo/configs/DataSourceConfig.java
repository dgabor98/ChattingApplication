package com.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        var connectionString = "jdbc:postgresql://" + System.getenv("DB_HOSTNAME") + ":5432/" + System.getenv("POSTGRES_DB") + "?user=" + System.getenv("DB_USER") + "&password=" + System.getenv("DB_PASSWORD");
        dataSource.setUrl(connectionString);
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }


}
