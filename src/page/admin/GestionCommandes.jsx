import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TableauDonnees from "../../components/admin/TableauDonnees";
import Badge from "../../components/interface/Badge";

const commandesMock = [
  { id: "CMD-001", client: "Kouassi Ama", produit: "Extrait de Moringa", montant: 25000, statut: "Livré", date: "2025-03-10" },
  { id: "CMD-002", client: "Mensah Kofi", produit: "Teinture d'Artemisia", montant: 18000, statut: "En cours", date: "2025-03-12" },
  { id: "CMD-003", client: "Afia Boateng", produit: "Sirop Hibiscus+", montant: 15000, statut: "En attente", date: "2025-03-14" },
];

const badgeStatut = { "Livré": "success", "En cours": "warning", "En attente": "primary" };

export default function GestionCommandes() {
  const colonnes = [
    { key: "id", label: "N° Commande" },
    { key: "client", label: "Client" },
    { key: "produit", label: "Produit" },
    { key: "montant", label: "Montant", render: (v) => `${v?.toLocaleString()} FCFA` },
    { key: "date", label: "Date" },
    { key: "statut", label: "Statut", render: (v) => <Badge variante={badgeStatut[v] || "primary"}>{v}</Badge> },
  ];
  return (
    <>
      <Helmet><title>Commandes – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Gestion des commandes</h1>
        <TableauDonnees colonnes={colonnes} donnees={commandesMock} chargement={false} />
      </div>
    </>
  );
}