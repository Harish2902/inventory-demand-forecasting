import api from "../api/api";

export const getDashboardSummary = () => {
    return api.get("/dashboard");
};