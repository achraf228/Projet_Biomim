import api from "./api";
export const seConnecter = (data) => api.post("/auth/login", data);
export const seDeconnecter = () => api.post("/auth/logout");
export const obtenirProfil = () => api.get("/auth/me");