import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TableauDonnees from "../../components/admin/TableauDonnees";
import FenetreModale from "../../components/interface/FenetreModale";
import FormulaireUtilisateur from "../../components/admin/formulaires/FormulaireUtilisateur";
import Bouton from "../../components/interface/Bouton";
import Badge from "../../components/interface/Badge";
import toast from "react-hot-toast";

const initial = [
  { id: 1, nom: "Admin BioMim", email: "admin@biomim.com", role: "admin" },
  { id: 2, nom: "Dr. Kofi Mensah", email: "kofi@biomim.com", role: "editeur" },
];

const badgeRole = { admin: "danger", editeur: "warning", utilisateur: "primary" };

export default function GestionUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState(initial);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState(null);
  const ouvrir = (u = null) => { setUtilisateurSelectionne(u); setModaleOuverte(true); };
  const fermer = () => { setModaleOuverte(false); setUtilisateurSelectionne(null); };
  const sauvegarder = (form) => {
    if (utilisateurSelectionne) setUtilisateurs((u) => u.map((ut) => ut.id === utilisateurSelectionne.id ? { ...ut, ...form } : ut));
    else setUtilisateurs((u) => [...u, { id: Date.now(), ...form }]);
    toast.success("Utilisateur sauvegardé"); fermer();
  };
  const supprimer = (id) => { setUtilisateurs((u) => u.filter((ut) => ut.id !== id)); toast.success("Utilisateur supprimé"); };
  const colonnes = [
    { key: "nom", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "role", label: "Rôle", render: (v) => <Badge variante={badgeRole[v] || "primary"}>{v}</Badge> },
  ];
  return (
    <>
      <Helmet><title>Utilisateurs – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-foreground">Utilisateurs</h1>
          <Bouton onClick={() => ouvrir()}><Plus size={16} /> Nouvel utilisateur</Bouton>
        </div>
        <TableauDonnees colonnes={colonnes} donnees={utilisateurs} chargement={false}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <button onClick={() => ouvrir(row)} className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-primary transition-colors"><Pencil size={15} /></button>
              <button onClick={() => supprimer(row.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-foreground/60 hover:text-destructive transition-colors"><Trash2 size={15} /></button>
            </div>
          )}
        />
        <FenetreModale ouvert={modaleOuverte} onFermer={fermer} titre={utilisateurSelectionne ? "Modifier l'utilisateur" : "Nouvel utilisateur"}>
          <FormulaireUtilisateur utilisateur={utilisateurSelectionne} onSoumettre={sauvegarder} chargement={false} />
        </FenetreModale>
      </div>
    </>
  );
}