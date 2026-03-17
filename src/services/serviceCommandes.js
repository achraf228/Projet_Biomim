import api from "./api";
export const obtenirCommandes = (params) => api.get("/commandes", { params });
export const obtenirCommande = (id) => api.get(`/commandes/${id}`);
export const creerCommande = (data) => api.post("/commandes", data);
export const modifierStatutCommande = (id, statut) => api.patch(`/commandes/${id}/statut`, { statut });