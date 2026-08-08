package com.harish.inventory_demand_forecasting.dto;

import java.util.List;

public class DashboardDTO {

    private Long totalProducts;

    private Long totalUnitsSold;

    private Long lowStockProducts;

    private Long reorderRequired;

    private StockStatusDTO stockStatus;

    private List<SalesByProductDTO> salesByProduct;

    private List<ReorderAlertDTO> reorderAlerts;

    // ============================
    // Getters & Setters
    // ============================

    public Long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(Long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public Long getTotalUnitsSold() {
        return totalUnitsSold;
    }

    public void setTotalUnitsSold(Long totalUnitsSold) {
        this.totalUnitsSold = totalUnitsSold;
    }

    public Long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(Long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }

    public Long getReorderRequired() {
        return reorderRequired;
    }

    public void setReorderRequired(Long reorderRequired) {
        this.reorderRequired = reorderRequired;
    }

    public StockStatusDTO getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(StockStatusDTO stockStatus) {
        this.stockStatus = stockStatus;
    }

    public List<SalesByProductDTO> getSalesByProduct() {
        return salesByProduct;
    }

    public void setSalesByProduct(List<SalesByProductDTO> salesByProduct) {
        this.salesByProduct = salesByProduct;
    }

    public List<ReorderAlertDTO> getReorderAlerts() {
        return reorderAlerts;
    }

    public void setReorderAlerts(List<ReorderAlertDTO> reorderAlerts) {
        this.reorderAlerts = reorderAlerts;
    }

    // ============================
    // Stock Status DTO
    // ============================

    public static class StockStatusDTO {

        private Long healthy;

        private Long lowStock;

        private Long outOfStock;

        public Long getHealthy() {
            return healthy;
        }

        public void setHealthy(Long healthy) {
            this.healthy = healthy;
        }

        public Long getLowStock() {
            return lowStock;
        }

        public void setLowStock(Long lowStock) {
            this.lowStock = lowStock;
        }

        public Long getOutOfStock() {
            return outOfStock;
        }

        public void setOutOfStock(Long outOfStock) {
            this.outOfStock = outOfStock;
        }
    }

    // ============================
    // Sales By Product DTO
    // ============================

    public static class SalesByProductDTO {

        private Long productId;

        private String productName;

        private Long quantitySold;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Long getQuantitySold() {
            return quantitySold;
        }

        public void setQuantitySold(Long quantitySold) {
            this.quantitySold = quantitySold;
        }
    }

    // ============================
    // Reorder Alert DTO
    // ============================

    public static class ReorderAlertDTO {

        private Long productId;

        private String productCode;

        private String productName;

        private Integer currentStock;

        private Double predictedDemand;

        private Integer reorderPoint;

        private String recommendation;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public String getProductCode() {
            return productCode;
        }

        public void setProductCode(String productCode) {
            this.productCode = productCode;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Integer getCurrentStock() {
            return currentStock;
        }

        public void setCurrentStock(Integer currentStock) {
            this.currentStock = currentStock;
        }

        public Double getPredictedDemand() {
            return predictedDemand;
        }

        public void setPredictedDemand(Double predictedDemand) {
            this.predictedDemand = predictedDemand;
        }

        public Integer getReorderPoint() {
            return reorderPoint;
        }

        public void setReorderPoint(Integer reorderPoint) {
            this.reorderPoint = reorderPoint;
        }

        public String getRecommendation() {
            return recommendation;
        }

        public void setRecommendation(String recommendation) {
            this.recommendation = recommendation;
        }
    }
}