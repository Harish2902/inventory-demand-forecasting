package com.harish.inventory_demand_forecasting.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.harish.inventory_demand_forecasting.dto.DashboardDTO;
import com.harish.inventory_demand_forecasting.dto.DashboardDTO.ReorderAlertDTO;
import com.harish.inventory_demand_forecasting.dto.DashboardDTO.SalesByProductDTO;
import com.harish.inventory_demand_forecasting.dto.DashboardDTO.StockStatusDTO;
import com.harish.inventory_demand_forecasting.entity.Product;
import com.harish.inventory_demand_forecasting.entity.SalesHistory;
import com.harish.inventory_demand_forecasting.repository.ProductRepository;
import com.harish.inventory_demand_forecasting.repository.SalesHistoryRepository;

@Service
public class DashboardService {

    private static final Logger logger =
            LoggerFactory.getLogger(DashboardService.class);

    private final ProductRepository productRepository;

    private final SalesHistoryRepository salesHistoryRepository;

    private final ForecastService forecastService;

    // ============================
    // Constructor Injection
    // ============================

    public DashboardService(
            ProductRepository productRepository,
            SalesHistoryRepository salesHistoryRepository,
            ForecastService forecastService) {

        this.productRepository = productRepository;
        this.salesHistoryRepository = salesHistoryRepository;
        this.forecastService = forecastService;
    }

    // ============================
    // Get Dashboard Summary
    // ============================

    public DashboardDTO getDashboardSummary() {

        logger.info("Generating dashboard summary.");

        List<Product> products = productRepository.findAll();

        List<SalesHistory> salesHistory =
                salesHistoryRepository.findAll();

        DashboardDTO dashboardDTO = new DashboardDTO();

        // ============================
        // Total Products
        // ============================

        dashboardDTO.setTotalProducts((long) products.size());

        // ============================
        // Total Units Sold
        // ============================

        long totalUnitsSold = 0;

        for (SalesHistory sale : salesHistory) {

            if (sale.getQuantitySold() != null) {

                totalUnitsSold += sale.getQuantitySold();

            }
        }

        dashboardDTO.setTotalUnitsSold(totalUnitsSold);

        // ============================
        // Stock Status
        // ============================

        long healthy = 0;

        long lowStock = 0;

        long outOfStock = 0;

        for (Product product : products) {

            Integer currentStock = product.getCurrentStock();

            Integer safetyStock = product.getSafetyStock();

            if (currentStock == null || currentStock == 0) {

                outOfStock++;

            } else if (safetyStock != null
                    && currentStock <= safetyStock) {

                lowStock++;

            } else {

                healthy++;
            }
        }

        StockStatusDTO stockStatus = new StockStatusDTO();

        stockStatus.setHealthy(healthy);

        stockStatus.setLowStock(lowStock);

        stockStatus.setOutOfStock(outOfStock);

        dashboardDTO.setStockStatus(stockStatus);

        dashboardDTO.setLowStockProducts(lowStock);

        // ============================
        // Sales By Product
        // ============================

        Map<Long, SalesByProductDTO> salesMap = new HashMap<>();

        for (SalesHistory sale : salesHistory) {

            Product product = sale.getProduct();

            if (product == null) {
                continue;
            }

            Long productId = product.getId();

            SalesByProductDTO salesDTO =
                    salesMap.get(productId);

            if (salesDTO == null) {

                salesDTO = new SalesByProductDTO();

                salesDTO.setProductId(productId);

                salesDTO.setProductName(
                        product.getProductName());

                salesDTO.setQuantitySold(0L);

                salesMap.put(productId, salesDTO);
            }

            long currentQuantity =
                    salesDTO.getQuantitySold();

            salesDTO.setQuantitySold(
                    currentQuantity + sale.getQuantitySold());
        }

        dashboardDTO.setSalesByProduct(
                new ArrayList<>(salesMap.values()));

        // ============================
        // Forecast / Reorder Alerts
        // ============================

        List<ReorderAlertDTO> reorderAlerts =
                new ArrayList<>();

        long reorderRequired = 0;

        for (Product product : products) {

            try {

                var forecast =
                        forecastService.predictDemand(product.getId());

                if ("REORDER NOW".equalsIgnoreCase(
                        forecast.getRecommendation())) {

                    reorderRequired++;

                    ReorderAlertDTO alert =
                            new ReorderAlertDTO();

                    alert.setProductId(product.getId());

                    alert.setProductCode(
                            product.getProductCode());

                    alert.setProductName(
                            product.getProductName());

                    alert.setCurrentStock(
                            forecast.getCurrentStock());

                    alert.setPredictedDemand(
                            forecast.getPredictedDemand());

                    alert.setReorderPoint(
                            forecast.getReorderPoint());

                    alert.setRecommendation(
                            forecast.getRecommendation());

                    reorderAlerts.add(alert);
                }

            } catch (Exception exception) {

                logger.warn(
                        "Unable to generate forecast for Product ID: {}",
                        product.getId(),
                        exception);
            }
        }

        dashboardDTO.setReorderRequired(reorderRequired);

        dashboardDTO.setReorderAlerts(reorderAlerts);

        logger.info(
                "Dashboard summary generated successfully.");

        return dashboardDTO;
    }
}