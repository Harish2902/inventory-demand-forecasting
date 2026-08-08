# Inventory Demand Forecasting & Reorder Alert System

A full-stack inventory management application that uses historical sales data and Linear Regression to forecast future product demand and generate intelligent reorder recommendations.

## 📌 Project Overview

The Inventory Demand Forecasting & Reorder Alert System is designed to help businesses monitor inventory, analyze historical sales data, forecast upcoming demand, and identify products that may require replenishment.

The application provides a centralized dashboard for monitoring inventory health and a forecasting module that uses historical sales data to predict the next period's demand.

The system combines:

- Product management
- Sales history management
- Demand forecasting
- Reorder point calculation
- Inventory monitoring
- Stock status visualization
- Forecast visualization
- Search and CRUD operations

---

## ✨ Features

### 📦 Product Management

- Add new products
- View product details
- Update product information
- Delete products
- Track current stock
- Configure lead time
- Configure safety stock

### 📊 Sales History Management

- Add sales records
- View sales history
- Update sales records
- Delete sales records
- Search sales records
- Track quantity sold by product and date

### 📈 Demand Forecasting

The application uses **Linear Regression** to analyze historical sales quantities and predict the next period's demand.

The forecasting module calculates:

- Slope
- Intercept
- Predicted demand

The predicted demand is then used to determine the reorder point.

### 🔔 Reorder Recommendation

The system calculates the reorder point based on predicted demand, lead time, and safety stock.

```text
Reorder Point = Predicted Demand × Lead Time + Safety Stock
