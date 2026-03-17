import api from "./api";
export const obtenirArticles = (params) => api.get("/articles", { params });
export const obtenirArticle = (id) => api.get(`/articles/${id}`);
export const creerArticle = (data) => api.post("/articles", data);
export const modifierArticle = (id, data) => api.put(`/articles/${id}`, data);
export const supprimerArticle = (id) => api.delete(`/articles/${id}`);