package com.harish.inventory_demand_forecasting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harish.inventory_demand_forecasting.entity.Product;

public interface ProductRepository extends JpaRepository<Product , Long>{


}
