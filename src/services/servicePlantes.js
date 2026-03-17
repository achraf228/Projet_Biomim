import api from "./api";
export const obtenirPlantes = (params) => api.get("/plantes", { params });
export const obtenirPlante = (id) => api.get(`/plantes/${id}`);
export const creerPlante = (data) => api.post("/plantes", data);
export const modifierPlante = (id, data) => api.put(`/plantes/${id}`, data);
export const supprimerPlante = (id) => api.delete(`/plantes/${id}`);