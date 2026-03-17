import api from "./api";
export const obtenirProduitsMarketplace = (params) => api.get("/marketplace/produits", { params });
export const obtenirVendeurs = () => api.get("/marketplace/vendeurs");