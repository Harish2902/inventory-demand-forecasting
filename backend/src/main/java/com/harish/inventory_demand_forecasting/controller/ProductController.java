package com.harish.inventory_demand_forecasting.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.harish.inventory_demand_forecasting.dto.ProductDTO;
import com.harish.inventory_demand_forecasting.response.ApiResponse;
import com.harish.inventory_demand_forecasting.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Product Management", description = "API's for managing products")
@RestController
@RequestMapping("/products")
public class ProductController {

	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	// ============================
	// Add Product
	// ============================

	@Operation(summary = "Create new product")
	@PostMapping
	public ResponseEntity<ApiResponse<ProductDTO>> saveProduct(@Valid @RequestBody ProductDTO productDTO) {

		logger.info("Received request to create product with code: {}", productDTO.getProductCode());

		ProductDTO savedProduct = productService.saveProduct(productDTO);

		logger.info("Product created successfully with code: {}", savedProduct.getProductCode());

		ApiResponse<ProductDTO> response = new ApiResponse<>(
				true,
				"Product created successfully",
				savedProduct,
				LocalDateTime.now());

		return ResponseEntity.status(HttpStatus.CREATED).body(response);

	}

	// ============================
	// Get All Products
	// ============================

	@Operation(summary = "Retrieve all products")
	@GetMapping
	public ResponseEntity<List<ProductDTO>> getAllProducts() {

		logger.info("Received request to fetch all products");

		List<ProductDTO> products = productService.getAllProducts();

		logger.info("Fetched {} products successfully", products.size());

		return ResponseEntity.ok(products);

	}

	// ============================
	// Get Product By ID
	// ============================

	@Operation(summary = "Retrieve product by ID")
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id) {

		logger.info("Received request to fetch product with ID: {}", id);

		ProductDTO product = productService.getProductById(id);

		logger.info("Product fetched successfully with ID: {}", id);

		ApiResponse<ProductDTO> response = new ApiResponse<>(
				true,
				"Product fetched successfully",
				product,
				LocalDateTime.now());

		return ResponseEntity.ok(response);

	}

	// ============================
	// Update Product
	// ============================

	@Operation(summary = "Update product")
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(
			@PathVariable Long id,
			@Valid @RequestBody ProductDTO productDTO) {

		logger.info("Received request to update product with ID: {}", id);

		ProductDTO updatedProduct = productService.updateProduct(id, productDTO);

		logger.info("Product updated successfully with ID: {}", id);

		ApiResponse<ProductDTO> response = new ApiResponse<>(
				true,
				"Product updated successfully",
				updatedProduct,
				LocalDateTime.now());

		return ResponseEntity.ok(response);

	}

	// ============================
	// Delete Product
	// ============================

	@Operation(summary = "Delete product by ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteProductById(@PathVariable Long id) {

		logger.info("Received request to delete product with ID: {}", id);

		productService.deleteById(id);

		logger.info("Product deleted successfully with ID: {}", id);

		ApiResponse<Void> response = new ApiResponse<>(
				true,
				"Product deleted successfully",
				null,
				LocalDateTime.now());

		return ResponseEntity.ok(response);

	}

}