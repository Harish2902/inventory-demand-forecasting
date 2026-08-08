package com.harish.inventory_demand_forecasting.controller;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.harish.inventory_demand_forecasting.dto.ForecastDTO;
import com.harish.inventory_demand_forecasting.response.ApiResponse;
import com.harish.inventory_demand_forecasting.service.ForecastService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Demand Forecast", description = "Predict future demand using Linear Regression")
@RestController
@RequestMapping("/forecast")
public class ForecastController {

	private static final Logger logger = LoggerFactory.getLogger(ForecastController.class);

	private final ForecastService forecastService;

	// Constructor Injection
	public ForecastController(ForecastService forecastService) {
		this.forecastService = forecastService;
	}

	// ============================
	// Predict Demand
	// ============================
	@Operation(summary = "Predict future demand")
	@GetMapping("/{productId}")
	public ResponseEntity<ApiResponse<ForecastDTO>> predictDemand(@PathVariable Long productId) {

		logger.info("Received request to predict demand for Product ID: {}", productId);

		ForecastDTO forecastDTO = forecastService.predictDemand(productId);

		logger.info("Demand forecast generated successfully for Product ID: {}", productId);

		ApiResponse<ForecastDTO> response = new ApiResponse<>(true, "Demand forecast generated successfully.",
				forecastDTO, LocalDateTime.now());

		return ResponseEntity.ok(response);
	}

}