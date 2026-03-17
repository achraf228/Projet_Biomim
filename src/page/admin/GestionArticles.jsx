import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TableauDonnees from "../../components/admin/TableauDonnees";
import FenetreModale from "../../components/interface/FenetreModale";
import FormulaireArticle from "../../components/admin/formulaires/FormulaireArticle";
import Bouton from "../../components/interface/Bouton";
import toast from "react-hot-toast";

const initial = [
  { id: 1, titre: "Le Moringa : de la plante au médicament", auteur: "Dr. Kofi Mensah", date: "2025-03-10" },
];

export default function GestionArticles() {
  const [articles, setArticles] = useState(initial);
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [articleSelectionne, setArticleSelectionne] = useState(null);
  const ouvrir = (a = null) => { setArticleSelectionne(a); setModaleOuverte(true); };
  const fermer = () => { setModaleOuverte(false); setArticleSelectionne(null); };
  const sauvegarder = (form) => {
    if (articleSelectionne) setArticles((a) => a.map((ar) => ar.id === articleSelectionne.id ? { ...ar, ...form } : ar));
    else setArticles((a) => [...a, { id: Date.now(), date: new Date().toISOString().split("T")[0], ...form }]);
    toast.success("Article publié"); fermer();
  };
  const supprimer = (id) => { setArticles((a) => a.filter((ar) => ar.id !== id)); toast.success("Article supprimé"); };
  const colonnes = [{ key: "titre", label: "Titre" }, { key: "auteur", label: "Auteur" }, { key: "date", label: "Date" }];
  return (
    <>
      <Helmet><title>Articles – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-foreground">Articles du blog</h1>
          <Bouton onClick={() => ouvrir()}><Plus size={16} /> Nouvel article</Bouton>
        </div>
        <TableauDonnees colonnes={colonnes} donnees={articles} chargement={false}
          actions={(row) => (
            <div className="flex items-center gap-2">
              <button onClick={() => ouvrir(row)} className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-primary transition-colors"><Pencil size={15} /></button>
              <button onClick={() => supprimer(row.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-foreground/60 hover:text-destructive transition-colors"><Trash2 size={15} /></button>
            </div>
          )}
        />
        <FenetreModale ouvert={modaleOuverte} onFermer={fermer} titre={articleSelectionne ? "Modifier l'article" : "Nouvel article"}>
          <FormulaireArticle article={articleSelectionne} onSoumettre={sauvegarder} chargement={false} />
        </FenetreModale>
      </div>
    </>
  );
}