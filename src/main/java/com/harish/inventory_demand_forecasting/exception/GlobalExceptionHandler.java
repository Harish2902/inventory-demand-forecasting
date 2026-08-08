package com.harish.inventory_demand_forecasting.exception;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.harish.inventory_demand_forecasting.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	// ===============================
	// Handle Resource Not Found
	// ===============================
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {

		logger.error("Resource Not Found: {}", ex.getMessage());

		ApiResponse<Object> response = new ApiResponse<>(false, ex.getMessage(), null, LocalDateTime.now());

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	// ===============================
	// Handle Validation Errors
	// ===============================
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Object>> handleValidationException(MethodArgumentNotValidException ex) {

		String errorMessage = ex.getBindingResult().getFieldError().getDefaultMessage();

		logger.error("Validation Failed: {}", errorMessage);

		ApiResponse<Object> response = new ApiResponse<>(false, errorMessage, null, LocalDateTime.now());

		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// ===============================
	// Handle Generic Exceptions
	// ===============================
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {

		logger.error("Unexpected Exception Occurred", ex);

		ApiResponse<Object> response = new ApiResponse<>(false, ex.getMessage(), null, LocalDateTime.now());

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}