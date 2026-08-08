package com.harish.inventory_demand_forecasting.controller;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harish.inventory_demand_forecasting.dto.DashboardDTO;
import com.harish.inventory_demand_forecasting.response.ApiResponse;
import com.harish.inventory_demand_forecasting.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
        name = "Dashboard",
        description = "APIs for inventory dashboard"
)
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private static final Logger logger =
            LoggerFactory.getLogger(DashboardController.class);

    private final DashboardService dashboardService;

    // ============================
    // Constructor Injection
    // ============================

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    // ============================
    // Dashboard Summary
    // ============================

    @Operation(
            summary = "Get dashboard summary"
    )
    @GetMapping
    public ResponseEntity<ApiResponse<DashboardDTO>>
            getDashboardSummary() {

        logger.info(
                "Received request to fetch dashboard summary.");

        DashboardDTO dashboardDTO =
                dashboardService.getDashboardSummary();

        ApiResponse<DashboardDTO> response =
                new ApiResponse<>(
                        true,
                        "Dashboard data fetched successfully.",
                        dashboardDTO,
                        LocalDateTime.now()
                );

        logger.info(
                "Dashboard summary fetched successfully.");

        return ResponseEntity.ok(response);
    }
}