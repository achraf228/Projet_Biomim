import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TableauDonnees from "../../components/admin/TableauDonnees";
import FenetreModale from "../../components/interface/FenetreModale";
import FormulairePartenaire from "../../components/admin/formulaires/FormulairePartenaire";
import Bouton from "../../components/interface/Bouton";
import toast from "react-hot-toast";

const initial = [
  { id: 1, nom: "Université de Lomé", type: "Académique", pays: "Togo" },
  { id: 2, nom: "CHU Tokoin", type: "Hospitalier", pays: "Togo" },
];

export default function GestionPartenaires() {
  const [partenaires, setPartenaires] = useState(initial);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [partenaireSelectionne, setPartenaireSelectionne] = useState(null);
  const ouvrir = (p = null) => { setPartenaireSelectionne(p); setModaleOuverte(true); };
  const fermer = () => { setModaleOuverte(false); setPartenaireSelectionne(null); };
  const sauvegarder = (form) => {
    if (partenaireSelectionne) setPartenaires((p) => p.map((pa) => pa.id === partenaireSelectionne.id ? { ...pa, ...form } : pa));
    else setPartenaires((p) => [...p, { id: Date.now(), ...form }]);
    toast.success("Partenaire sauvegardé"); fermer();
  };
  const supprimer = (id) => { setPartenaires((p) => p.filter((pa) => pa.id !== id)); toast.success("Partenaire supprimé"); };
  const colonnes = [{ key: "nom", label: "Nom" }, { key: "type", label: "Type" }, { key: "pays", label: "Pays" }];
  return (
    <>
      <Helmet><title>Partenaires – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-foreground">Partenaires</h1>
          <Bouton onClick={() => ouvrir()}><Plus size={16} /> Nouveau partenaire</Bouton>
        </div>
        <TableauDonnees colonnes={colonnes} donnees={partenaires} chargement={false}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <button onClick={() => ouvrir(row)} className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-primary transition-colors"><Pencil size={15} /></button>
              <button onClick={() => supprimer(row.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-foreground/60 hover:text-destructive transition-colors"><Trash2 size={15} /></button>
            </div>
          )}
        />
        <FenetreModale ouvert={modaleOuverte} onFermer={fermer} titre={partenaireSelectionne ? "Modifier le partenaire" : "Nouveau partenaire"}>
          <FormulairePartenaire partenaire={partenaireSelectionne} onSoumettre={sauvegarder} chargement={false} />
        </FenetreModale>
      </div>
    </>
  );
}