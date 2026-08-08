import api from "../api/api";

// ============================
// Get Forecast By Product ID
// ============================

export const getForecastByProductId = (productId) => {
    return api.get(`/forecast/${productId}`);
};