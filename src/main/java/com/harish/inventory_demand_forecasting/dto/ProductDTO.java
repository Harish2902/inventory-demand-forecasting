package com.harish.inventory_demand_forecasting.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductDTO {
		
		
		private Long id;
		
		@NotBlank(message = "Product code is required")
	    private String productCode;
		
		@NotBlank(message = "Product name is required")
	    private String productName;
		
		@NotBlank(message = "Category is required")
	    private String category;
		
		@NotNull(message = "Current stock is required")
	    @Min(value = 0, message = "Current stock cannot be negative")
	    private Integer currentStock;
		
		@NotNull(message = "Lead Time is required")
	    @Min(value = 0, message = "Lead Time cannot be negative")
	    private Integer leadTime;
		
		@NotNull(message = "Safety stock is required")
	    @Min(value = 0, message = "Safety stock cannot be negative")
	    private Integer safetyStock;

		
		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
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

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public Integer getCurrentStock() {
			return currentStock;
		}

		public void setCurrentStock(Integer currentStock) {
			this.currentStock = currentStock;
		}

		public Integer getLeadTime() {
			return leadTime;
		}

		public void setLeadTime(Integer leadTime) {
			this.leadTime = leadTime;
		}

		public Integer getSafetyStock() {
			return safetyStock;
		}

		public void setSafetyStock(Integer safetyStock) {
			this.safetyStock = safetyStock;
		}
		
		
	}

