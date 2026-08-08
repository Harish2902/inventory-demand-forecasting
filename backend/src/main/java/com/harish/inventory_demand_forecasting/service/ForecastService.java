package com.harish.inventory_demand_forecasting.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.harish.inventory_demand_forecasting.dto.ForecastDTO;
import com.harish.inventory_demand_forecasting.entity.Product;
import com.harish.inventory_demand_forecasting.entity.SalesHistory;
import com.harish.inventory_demand_forecasting.exception.ResourceNotFoundException;
import com.harish.inventory_demand_forecasting.repository.ProductRepository;
import com.harish.inventory_demand_forecasting.repository.SalesHistoryRepository;

@Service
public class ForecastService {

    private static final Logger logger =
            LoggerFactory.getLogger(ForecastService.class);

    private final ProductRepository productRepository;
    private final SalesHistoryRepository salesHistoryRepository;
    private final PredictionService predictionService;

    // Constructor Injection
    public ForecastService(
            ProductRepository productRepository,
            SalesHistoryRepository salesHistoryRepository,
            PredictionService predictionService) {

        this.productRepository = productRepository;
        this.salesHistoryRepository = salesHistoryRepository;
        this.predictionService = predictionService;
    }

    // ============================
    // Convert Entity to DTO
    // ============================

    private ForecastDTO convertToDTO(
            Product product,
            double predictedDemand,
            int reorderPoint,
            String recommendation) {

        ForecastDTO forecastDTO = new ForecastDTO();

        forecastDTO.setProductId(product.getId());
        forecastDTO.setProductCode(product.getProductCode());
        forecastDTO.setProductName(product.getProductName());

        forecastDTO.setPredictedDemand(predictedDemand);

        forecastDTO.setCurrentStock(product.getCurrentStock());
        forecastDTO.setLeadTime(product.getLeadTime());
        forecastDTO.setSafetyStock(product.getSafetyStock());

        forecastDTO.setReorderPoint(reorderPoint);
        forecastDTO.setRecommendation(recommendation);

        return forecastDTO;
    }

    // ============================
    // Predict Demand
    // ============================

    public ForecastDTO predictDemand(Long productId) {

        logger.info(
                "Starting demand prediction for Product ID: {}",
                productId
        );

        // ============================
        // Step 1 : Fetch Product
        // ============================

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> {

                    logger.warn(
                            "Product not found with ID: {}",
                            productId
                    );

                    return new ResourceNotFoundException(
                            "Product not found with ID : " + productId
                    );

                });

        logger.info(
                "Product '{}' fetched successfully.",
                product.getProductName()
        );

        // ============================
        // Step 2 : Fetch Sales History
        // ============================

        List<SalesHistory> salesHistoryList =
                salesHistoryRepository
                        .findByProductOrderBySaleDateAsc(product);

        logger.info(
                "Fetched {} sales records for Product ID: {}",
                salesHistoryList.size(),
                productId
        );

        // ============================
        // Step 2.1 : Validate Sales History
        // ============================

        if (salesHistoryList.isEmpty()) {

            logger.warn(
                    "No sales history found for Product ID: {}",
                    productId
            );

            throw new ResourceNotFoundException(
                    "No sales history available for product: "
                            + product.getProductName()
            );
        }

        // ============================
        // Step 3 : Convert Sales History
        //         to List<Integer>
        // ============================

        List<Integer> sales = new ArrayList<>();

        for (SalesHistory history : salesHistoryList) {

            sales.add(history.getQuantitySold());

        }

        logger.info(
                "Prepared {} sales values for Linear Regression.",
                sales.size()
        );

        // ============================
        // Step 4 : Predict Future Demand
        // ============================

        double predictedDemand =
                predictionService.predictDemand(sales);

        logger.info(
                "Predicted demand: {}",
                predictedDemand
        );

        // ============================
        // Step 5 : Calculate Reorder Point
        // ============================

        int reorderPoint =
                calculateReorderPoint(
                        predictedDemand,
                        product.getLeadTime(),
                        product.getSafetyStock()
                );

        logger.info(
                "Calculated Reorder Point: {}",
                reorderPoint
        );

        // ============================
        // Step 6 : Recommendation
        // ============================

        String recommendation;

        if (product.getCurrentStock() < reorderPoint) {

            recommendation = "REORDER NOW";

            logger.info(
                    "Current stock ({}) is below Reorder Point ({}). "
                            + "Recommendation: {}",
                    product.getCurrentStock(),
                    reorderPoint,
                    recommendation
            );

        } else {

            recommendation = "STOCK SUFFICIENT";

            logger.info(
                    "Current stock ({}) is above Reorder Point ({}). "
                            + "Recommendation: {}",
                    product.getCurrentStock(),
                    reorderPoint,
                    recommendation
            );
        }

        logger.info(
                "Demand prediction completed successfully "
                        + "for Product ID: {}",
                productId
        );

        // ============================
        // Step 7 : Convert to DTO
        // ============================

        return convertToDTO(
                product,
                predictedDemand,
                reorderPoint,
                recommendation
        );
    }

    // ============================
    // Calculate Reorder Point
    // ============================

    private int calculateReorderPoint(
            double predictedDemand,
            int leadTime,
            int safetyStock) {

        return (int) Math.ceil(
                predictedDemand * leadTime
        ) + safetyStock;
    }
}