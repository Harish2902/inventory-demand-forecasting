import api from "../api/api";

// ============================
// Get All Products
// ============================

export const getAllProducts = () => {
    return api.get("/products");
};

// ============================
// Get Product By ID
// ============================

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

// ============================
// Create Product
// ============================

export const createProduct = (product) => {
    return api.post("/products", product);
};

// ============================
// Update Product
// ============================

export const updateProduct = (id, product) => {
    return api.put(`/products/${id}`, product);
};

// ============================
// Delete Product
// ============================

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};