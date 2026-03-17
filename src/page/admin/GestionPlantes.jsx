import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TableauDonnees from "../../components/admin/TableauDonnees";
import FenetreModale from "../../components/interface/FenetreModale";
import FormulairePlante from "../../components/admin/formulaires/FormulairePlante";
import Bouton from "../../components/interface/Bouton";
import toast from "react-hot-toast";

const initial = [
  { id: 1, nom: "Moringa oleifera", famille: "Moringaceae", origine: "Afrique de l'Ouest" },
  { id: 2, nom: "Catharanthus roseus", famille: "Apocynaceae", origine: "Madagascar" },
];

export default function GestionPlantes() {
  const [plantes, setPlantes] = useState(initial);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [planteSelectionnee, setPlanteSelectionnee] = useState(null);

  const ouvrir = (plante = null) => { setPlanteSelectionnee(plante); setModaleOuverte(true); };
  const fermer = () => { setModaleOuverte(false); setPlanteSelectionnee(null); };

  const sauvegarder = (form) => {
    if (planteSelectionnee) setPlantes((p) => p.map((pl) => pl.id === planteSelectionnee.id ? { ...pl, ...form } : pl));
    else setPlantes((p) => [...p, { id: Date.now(), ...form }]);
    toast.success("Plante sauvegardée");
    fermer();
  };

  const supprimer = (id) => { setPlantes((p) => p.filter((pl) => pl.id !== id)); toast.success("Plante supprimée"); };

  const colonnes = [
    { key: "nom", label: "Nom scientifique" },
    { key: "famille", label: "Famille" },
    { key: "origine", label: "Origine" },
  ];

  return (
    <>
      <Helmet><title>Gestion Plantes – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-foreground">Plantes médicinales</h1>
          <Bouton onClick={() => ouvrir()}><Plus size={16} /> Nouvelle plante</Bouton>
        </div>
        <TableauDonnees colonnes={colonnes} donnees={plantes} chargement={false}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <button onClick={() => ouvrir(row)} className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-primary transition-colors"><Pencil size={15} /></button>
              <button onClick={() => supprimer(row.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-foreground/60 hover:text-destructive transition-colors"><Trash2 size={15} /></button>
            </div>
          )}
        />
        <FenetreModale ouvert={modaleOuverte} onFermer={fermer} titre={planteSelectionnee ? "Modifier la plante" : "Nouvelle plante"}>
          <FormulairePlante plante={planteSelectionnee} onSoumettre={sauvegarder} chargement={false} />
        </FenetreModale>
      </div>
    </>
  );
}