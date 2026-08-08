package com.harish.inventory_demand_forecasting.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI inventoryForecastingAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Inventory Demand Forecasting API")

                        .description("REST API for Inventory Demand Forecasting using Linear Regression")

                        .version("1.0.0")

                        .contact(new Contact()
                                .name("Harish Raghav")
                                .email("harish@example.com"))

                        .license(new License()
                                .name("Harish Raghav")))

                .externalDocs(new ExternalDocumentation()
                        .description("Inventory Demand Forecasting Documentation"));
    }
}