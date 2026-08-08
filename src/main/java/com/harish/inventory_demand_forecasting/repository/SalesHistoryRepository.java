package com.harish.inventory_demand_forecasting.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harish.inventory_demand_forecasting.entity.Product;
import com.harish.inventory_demand_forecasting.entity.SalesHistory;

public interface SalesHistoryRepository extends JpaRepository<SalesHistory, Long> {

    // Get all sales for a product
    List<SalesHistory> findByProduct(Product product);

    // Get all sales ordered by date
    List<SalesHistory> findByProductOrderBySaleDateAsc(Product product);

    // Get sales between two dates
    List<SalesHistory> findByProductAndSaleDateBetween(
            Product product,
            LocalDate startDate,
            LocalDate endDate);

}