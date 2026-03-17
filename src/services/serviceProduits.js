import api from "./api";
export const obtenirProduits = (params) => api.get("/produits", { params });
export const obtenirProduit = (id) => api.get(`/produits/${id}`);
export const creerProduit = (data) => api.post("/produits", data);
export const modifierProduit = (id, data) => api.put(`/produits/${id}`, data);
export const supprimerProduit = (id) => api.delete(`/produits/${id}`);