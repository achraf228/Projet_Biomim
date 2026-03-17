import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TableauDonnees from "../../components/admin/TableauDonnees";
import FenetreModale from "../../components/interface/FenetreModale";
import FormulaireProduit from "../../components/admin/formulaires/FormulaireProduit";
import Bouton from "../../components/interface/Bouton";
import toast from "react-hot-toast";

const initial = [
  { id: 1, nom: "Extrait de Moringa", categorie: "Compléments", prix: 25000 },
  { id: 2, nom: "Teinture d'Artemisia", categorie: "Antipaludéens", prix: 18000 },
];

export default function GestionProduits() {
  const [produits, setProduits] = useState(initial);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [produitSelectionne, setProduitSelectionne] = useState(null);

  const ouvrir = (p = null) => { setProduitSelectionne(p); setModaleOuverte(true); };
  const fermer = () => { setModaleOuverte(false); setProduitSelectionne(null); };
  const sauvegarder = (form) => {
    if (produitSelectionne) setProduits((p) => p.map((pr) => pr.id === produitSelectionne.id ? { ...pr, ...form } : pr));
    else setProduits((p) => [...p, { id: Date.now(), ...form }]);
    toast.success("Produit sauvegardé"); fermer();
  };
  const supprimer = (id) => { setProduits((p) => p.filter((pr) => pr.id !== id)); toast.success("Produit supprimé"); };

  const colonnes = [
    { key: "nom", label: "Nom" },
    { key: "categorie", label: "Catégorie" },
    { key: "prix", label: "Prix (FCFA)", render: (v) => v?.toLocaleString() },
  ];

  return (
    <>
      <Helmet><title>Gestion Produits – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-foreground">Produits pharmaceutiques</h1>
          <Bouton onClick={() => ouvrir()}><Plus size={16} /> Nouveau produit</Bouton>
        </div>
        <TableauDonnees colonnes={colonnes} donnees={produits} chargement={false}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <button onClick={() => ouvrir(row)} className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-primary transition-colors"><Pencil size={15} /></button>
              <button onClick={() => supprimer(row.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-foreground/60 hover:text-destructive transition-colors"><Trash2 size={15} /></button>
            </div>
          )}
        />
        <FenetreModale ouvert={modaleOuverte} onFermer={fermer} titre={produitSelectionne ? "Modifier le produit" : "Nouveau produit"}>
          <FormulaireProduit produit={produitSelectionne} onSoumettre={sauvegarder} chargement={false} />
        </FenetreModale>
      </div>
    </>
  );
}