package com.harish.inventory_demand_forecasting.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.harish.inventory_demand_forecasting.dto.SalesHistoryDTO;
import com.harish.inventory_demand_forecasting.response.ApiResponse;
import com.harish.inventory_demand_forecasting.service.SalesHistoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Sales History Management", description = "APIs for managing sales history")
@RestController
@RequestMapping("/sales")
public class SalesHistoryController {

    private static final Logger logger = LoggerFactory.getLogger(SalesHistoryController.class);

    private final SalesHistoryService salesHistoryService;

    // Constructor Injection
    public SalesHistoryController(SalesHistoryService salesHistoryService) {
        this.salesHistoryService = salesHistoryService;
    }

    // ============================
    // Save Sales History
    // ============================
    @Operation(summary = "Save sales history")
    @PostMapping
    public ResponseEntity<ApiResponse<SalesHistoryDTO>> saveSalesHistory(
            @Valid @RequestBody SalesHistoryDTO salesHistoryDTO) {

        logger.info("Received request to save sales history for Product ID: {}",
                salesHistoryDTO.getProductId());

        SalesHistoryDTO savedSales =
                salesHistoryService.saveSalesHistory(salesHistoryDTO);

        logger.info("Sales history created successfully.");

        ApiResponse<SalesHistoryDTO> response =
                new ApiResponse<>(
                        true,
                        "Sales history created successfully.",
                        savedSales,
                        LocalDateTime.now());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ============================
    // Get All Sales History
    // ============================
    @Operation(summary = "Retrieve all sales history")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SalesHistoryDTO>>> getAllSalesHistory() {

        logger.info("Received request to fetch all sales history");

        List<SalesHistoryDTO> salesHistory =
                salesHistoryService.getAllSalesHistory();

        logger.info("Fetched {} sales history records successfully",
                salesHistory.size());

        ApiResponse<List<SalesHistoryDTO>> response =
                new ApiResponse<>(
                        true,
                        "Sales history fetched successfully.",
                        salesHistory,
                        LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

    // ============================
    // Get Sales History By Id
    // ============================
    @Operation(summary = "Retrieve sales history by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SalesHistoryDTO>> getSalesHistoryById(
            @PathVariable Long id) {

        logger.info("Received request to fetch sales history with ID: {}", id);

        SalesHistoryDTO salesHistory =
                salesHistoryService.getSalesHistoryById(id);

        ApiResponse<SalesHistoryDTO> response =
                new ApiResponse<>(
                        true,
                        "Sales history fetched successfully.",
                        salesHistory,
                        LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

    // ============================
    // Update Sales History
    // ============================
    @Operation(summary = "Update sales history")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SalesHistoryDTO>> updateSalesHistory(
            @PathVariable Long id,
            @Valid @RequestBody SalesHistoryDTO salesHistoryDTO) {

        logger.info("Received request to update sales history with ID: {}", id);

        SalesHistoryDTO updatedSales =
                salesHistoryService.updateSalesHistory(id, salesHistoryDTO);

        logger.info("Sales history updated successfully with ID: {}", id);

        ApiResponse<SalesHistoryDTO> response =
                new ApiResponse<>(
                        true,
                        "Sales history updated successfully.",
                        updatedSales,
                        LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

    // ============================
    // Delete Sales History
    // ============================
    @Operation(summary = "Delete sales history by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSalesHistory(
            @PathVariable Long id) {

        logger.info("Received request to delete sales history with ID: {}", id);

        salesHistoryService.deleteSalesHistory(id);

        logger.info("Sales history deleted successfully with ID: {}", id);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        true,
                        "Sales history deleted successfully.",
                        null,
                        LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

}