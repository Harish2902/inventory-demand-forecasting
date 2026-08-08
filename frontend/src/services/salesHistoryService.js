import api from "../api/api";

// ============================
// Get All Sales History
// ============================

export const getAllSalesHistory = () => {
    return api.get("/sales");
};

// ============================
// Get Sales History By ID
// ============================

export const getSalesHistoryById = (id) => {
    return api.get(`/sales/${id}`);
};

// ============================
// Create Sales History
// ============================

export const createSalesHistory = (salesHistory) => {
    return api.post("/sales", salesHistory);
};

// ============================
// Update Sales History
// ============================

export const updateSalesHistory = (id, salesHistory) => {
    return api.put(`/sales/${id}`, salesHistory);
};

// ============================
// Delete Sales History
// ============================

export const deleteSalesHistory = (id) => {
    return api.delete(`/sales/${id}`);
};