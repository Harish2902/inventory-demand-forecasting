import api from "../api/api";

export const getAllSales = () => {
  return api.get("/sales");
};

export const getSalesById = (id) => {
  return api.get(`/sales/${id}`);
};

export const createSales = (sales) => {
  return api.post("/sales", sales);
};

export const deleteSales = (id) => {
  return api.delete(`/sales/${id}`);
};