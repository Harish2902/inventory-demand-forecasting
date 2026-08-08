package com.harish.inventory_demand_forecasting.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {

	private static final Logger logger = LoggerFactory.getLogger(PredictionService.class);

	// Calculate Slope (m)
	public double calculateSlope(List<Integer> sales) {

		logger.info("Calculating slope using Linear Regression.");

		int n = sales.size();

		double sumX = 0;
		double sumY = 0;
		double sumXY = 0;
		double sumXSquare = 0;

		for (int i = 0; i < n; i++) {

			int x = i + 1;
			int y = sales.get(i);

			sumX += x;
			sumY += y;
			sumXY += x * y;
			sumXSquare += x * x;
		}

		double denominator = (n * sumXSquare) - (sumX * sumX);

		if (denominator == 0) {

			logger.warn("Denominator became zero while calculating slope.");

			return 0;
		}

		double slope = ((n * sumXY) - (sumX * sumY)) / denominator;

		logger.info("Slope calculated successfully: {}", slope);

		return slope;
	}

	// Calculate Intercept (c)
	public double calculateIntercept(List<Integer> sales, double slope) {

		logger.info("Calculating intercept.");

		int n = sales.size();

		double sumX = 0;
		double sumY = 0;

		for (int i = 0; i < n; i++) {

			sumX += (i + 1);
			sumY += sales.get(i);
		}

		double intercept = (sumY - (slope * sumX)) / n;

		logger.info("Intercept calculated successfully: {}", intercept);

		return intercept;
	}

	// Predict Next Day Demand
	public double predictDemand(List<Integer> sales) {

		logger.info("Starting demand prediction using Linear Regression.");

		if (sales == null || sales.isEmpty()) {

			logger.warn("Sales history is empty. Returning predicted demand as 0.");

			return 0;
		}

		if (sales.size() == 1) {

			logger.warn("Only one sales record found. Returning the same value as prediction.");

			return sales.get(0);
		}

		double slope = calculateSlope(sales);

		double intercept = calculateIntercept(sales, slope);

		int nextDay = sales.size() + 1;

		double predictedDemand = (slope * nextDay) + intercept;

		logger.info("Demand predicted successfully: {}", predictedDemand);

		return predictedDemand;
	}

}