package com.harish.inventory_demand_forecasting.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.harish.inventory_demand_forecasting.dto.ProductDTO;
import com.harish.inventory_demand_forecasting.entity.Product;
import com.harish.inventory_demand_forecasting.exception.ResourceNotFoundException;
import com.harish.inventory_demand_forecasting.repository.ProductRepository;

@Service
public class ProductService {

	private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

	private final ProductRepository productRepository;

	// Constructor Injection
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	// ============================
	// Convert DTO -> Entity
	// ============================

	private Product convertToEntity(ProductDTO productDTO) {

		logger.debug("Converting ProductDTO to Product Entity.");

		Product product = new Product();

		product.setId(productDTO.getId());
		product.setProductCode(productDTO.getProductCode());
		product.setProductName(productDTO.getProductName());
		product.setCategory(productDTO.getCategory());
		product.setCurrentStock(productDTO.getCurrentStock());
		product.setLeadTime(productDTO.getLeadTime());
		product.setSafetyStock(productDTO.getSafetyStock());

		return product;
	}

	// ============================
	// Convert Entity -> DTO
	// ============================

	private ProductDTO convertToDTO(Product product) {

		logger.debug("Converting Product Entity to ProductDTO.");

		ProductDTO productDTO = new ProductDTO();

		productDTO.setId(product.getId());
		productDTO.setProductCode(product.getProductCode());
		productDTO.setProductName(product.getProductName());
		productDTO.setCategory(product.getCategory());
		productDTO.setCurrentStock(product.getCurrentStock());
		productDTO.setLeadTime(product.getLeadTime());
		productDTO.setSafetyStock(product.getSafetyStock());

		return productDTO;
	}

	// ============================
	// Update Existing Entity
	// ============================

	private void updateEntity(Product existingProduct, ProductDTO productDTO) {

		logger.debug("Updating existing Product Entity.");

		existingProduct.setProductCode(productDTO.getProductCode());
		existingProduct.setProductName(productDTO.getProductName());
		existingProduct.setCategory(productDTO.getCategory());
		existingProduct.setCurrentStock(productDTO.getCurrentStock());
		existingProduct.setLeadTime(productDTO.getLeadTime());
		existingProduct.setSafetyStock(productDTO.getSafetyStock());

	}

	// ============================
	// Add Product
	// ============================

	public ProductDTO saveProduct(ProductDTO productDTO) {

		logger.info("Saving product with code: {}", productDTO.getProductCode());

		Product product = convertToEntity(productDTO);

		Product savedProduct = productRepository.save(product);

		logger.info("Product saved successfully with ID: {}", savedProduct.getId());

		return convertToDTO(savedProduct);

	}

	// ============================
	// Get All Products
	// ============================

	public List<ProductDTO> getAllProducts() {

		logger.info("Fetching all products.");

		List<Product> products = productRepository.findAll();

		logger.info("Total products found: {}", products.size());

		List<ProductDTO> productDTOs = new ArrayList<>();

		for (Product product : products) {

			productDTOs.add(convertToDTO(product));

		}

		return productDTOs;

	}

	// ============================
	// Get Product By ID
	// ============================

	public ProductDTO getProductById(Long id) {

		logger.info("Fetching product with ID: {}", id);

		Product product = productRepository.findById(id)
				.orElseThrow(() -> {

					logger.warn("Product not found with ID: {}", id);

					return new ResourceNotFoundException("Product not found with ID : " + id);

				});

		logger.info("Product fetched successfully with ID: {}", id);

		return convertToDTO(product);

	}

	// ============================
	// Update Product
	// ============================

	public ProductDTO updateProduct(Long id, ProductDTO productDTO) {

		logger.info("Updating product with ID: {}", id);

		Product existingProduct = productRepository.findById(id)
				.orElseThrow(() -> {

					logger.warn("Product not found with ID: {}", id);

					return new ResourceNotFoundException("Product not found with ID : " + id);

				});

		updateEntity(existingProduct, productDTO);

		Product updatedProduct = productRepository.save(existingProduct);

		logger.info("Product updated successfully with ID: {}", id);

		return convertToDTO(updatedProduct);

	}

	// ============================
	// Delete Product By ID
	// ============================

	public ProductDTO deleteById(Long id) {

		logger.info("Deleting product with ID: {}", id);

		Product product = productRepository.findById(id)
				.orElseThrow(() -> {

					logger.warn("Product not found with ID: {}", id);

					return new ResourceNotFoundException("Product not found with ID : " + id);

				});

		productRepository.delete(product);

		logger.info("Product deleted successfully with ID: {}", id);

		return convertToDTO(product);

	}

}