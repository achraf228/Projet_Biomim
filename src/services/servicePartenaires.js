import api from "./api";
export const obtenirPartenaires = () => api.get("/partenaires");
export const creerPartenaire = (data) => api.post("/partenaires", data);
export const modifierPartenaire = (id, data) => api.put(`/partenaires/${id}`, data);
export const supprimerPartenaire = (id) => api.delete(`/partenaires/${id}`);