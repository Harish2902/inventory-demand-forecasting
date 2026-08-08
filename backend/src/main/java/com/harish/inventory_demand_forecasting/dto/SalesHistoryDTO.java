package com.harish.inventory_demand_forecasting.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SalesHistoryDTO {

    private Long id;

    @NotNull(message = "Product Id is required")
    private Long productId;

    private String productName;

    @NotNull(message = "Sale Date is required")
    private LocalDate saleDate;

    @NotNull(message = "Quantity Sold is required")
    @Min(value = 1, message = "Quantity Sold must be greater than zero")
    private Integer quantitySold;

    // ==========================
    // Getters & Setters
    // ==========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDate getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }

    public Integer getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(Integer quantitySold) {
        this.quantitySold = quantitySold;
    }
}