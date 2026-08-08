package com.harish.inventory_demand_forecasting.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.harish.inventory_demand_forecasting.dto.SalesHistoryDTO;
import com.harish.inventory_demand_forecasting.entity.Product;
import com.harish.inventory_demand_forecasting.entity.SalesHistory;
import com.harish.inventory_demand_forecasting.exception.ResourceNotFoundException;
import com.harish.inventory_demand_forecasting.repository.ProductRepository;
import com.harish.inventory_demand_forecasting.repository.SalesHistoryRepository;

@Service
public class SalesHistoryService {

    private static final Logger logger = LoggerFactory.getLogger(SalesHistoryService.class);

    private final SalesHistoryRepository salesHistoryRepository;
    private final ProductRepository productRepository;

    // Constructor Injection
    public SalesHistoryService(SalesHistoryRepository salesHistoryRepository,
                               ProductRepository productRepository) {

        this.salesHistoryRepository = salesHistoryRepository;
        this.productRepository = productRepository;
    }

    // =====================================
    // Convert DTO -> Entity
    // =====================================

    private SalesHistory convertToEntity(SalesHistoryDTO dto, Product product) {

        SalesHistory salesHistory = new SalesHistory();

        salesHistory.setProduct(product);
        salesHistory.setSaleDate(dto.getSaleDate());
        salesHistory.setQuantitySold(dto.getQuantitySold());

        return salesHistory;
    }

    // =====================================
    // Convert Entity -> DTO
    // =====================================

    private SalesHistoryDTO convertToDTO(SalesHistory salesHistory) {

        SalesHistoryDTO dto = new SalesHistoryDTO();

        dto.setId(salesHistory.getId());

        dto.setProductId(salesHistory.getProduct().getId());

        dto.setProductName(salesHistory.getProduct().getProductName());

        dto.setSaleDate(salesHistory.getSaleDate());

        dto.setQuantitySold(salesHistory.getQuantitySold());

        return dto;
    }

    // =====================================
    // Save Sales History
    // =====================================

    public SalesHistoryDTO saveSalesHistory(SalesHistoryDTO salesHistoryDTO) {

        logger.info("Saving sales history for Product ID: {}", salesHistoryDTO.getProductId());

        Product product = productRepository.findById(salesHistoryDTO.getProductId())
                .orElseThrow(() -> {

                    logger.warn("Product not found with ID: {}", salesHistoryDTO.getProductId());

                    return new ResourceNotFoundException(
                            "Product not found with ID : " + salesHistoryDTO.getProductId());

                });

        SalesHistory salesHistory = convertToEntity(salesHistoryDTO, product);

        SalesHistory savedSales = salesHistoryRepository.save(salesHistory);

        logger.info("Sales history saved successfully with ID: {}", savedSales.getId());

        return convertToDTO(savedSales);

    }

    // =====================================
    // Get All Sales History
    // =====================================

    public List<SalesHistoryDTO> getAllSalesHistory() {

        logger.info("Fetching all sales history.");

        List<SalesHistory> salesList = salesHistoryRepository.findAll();

        List<SalesHistoryDTO> dtoList = new ArrayList<>();

        for (SalesHistory sales : salesList) {

            dtoList.add(convertToDTO(sales));

        }

        logger.info("Fetched {} sales records.", dtoList.size());

        return dtoList;

    }

    // =====================================
    // Get Sales History By ID
    // =====================================

    public SalesHistoryDTO getSalesHistoryById(Long id) {

        logger.info("Fetching sales history with ID: {}", id);

        SalesHistory salesHistory = salesHistoryRepository.findById(id)
                .orElseThrow(() -> {

                    logger.warn("Sales history not found with ID: {}", id);

                    return new ResourceNotFoundException(
                            "Sales history not found with ID : " + id);

                });

        return convertToDTO(salesHistory);

    }

    // =====================================
    // Update Sales History
    // =====================================

    public SalesHistoryDTO updateSalesHistory(Long id,
                                              SalesHistoryDTO salesHistoryDTO) {

        logger.info("Updating sales history with ID: {}", id);

        SalesHistory existingSale = salesHistoryRepository.findById(id)
                .orElseThrow(() -> {

                    logger.warn("Sales history not found with ID: {}", id);

                    return new ResourceNotFoundException(
                            "Sales history not found with ID : " + id);

                });

        Product product = productRepository.findById(salesHistoryDTO.getProductId())
                .orElseThrow(() -> {

                    logger.warn("Product not found with ID: {}", salesHistoryDTO.getProductId());

                    return new ResourceNotFoundException(
                            "Product not found with ID : " + salesHistoryDTO.getProductId());

                });

        existingSale.setProduct(product);

        existingSale.setSaleDate(salesHistoryDTO.getSaleDate());

        existingSale.setQuantitySold(salesHistoryDTO.getQuantitySold());

        SalesHistory updatedSale = salesHistoryRepository.save(existingSale);

        logger.info("Sales history updated successfully with ID: {}", id);

        return convertToDTO(updatedSale);

    }

    // =====================================
    // Delete Sales History
    // =====================================

    public void deleteSalesHistory(Long id) {

        logger.info("Deleting sales history with ID: {}", id);

        SalesHistory sale = salesHistoryRepository.findById(id)
                .orElseThrow(() -> {

                    logger.warn("Sales history not found with ID: {}", id);

                    return new ResourceNotFoundException(
                            "Sales history not found with ID : " + id);

                });

        salesHistoryRepository.delete(sale);

        logger.info("Sales history deleted successfully with ID: {}", id);

    }

}