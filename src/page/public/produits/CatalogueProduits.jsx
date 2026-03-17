import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import CatalogueProduitsList from "../../../components/public/produits/CatalogueProduits";
import ResearchBg from "../../../assets/images/research-bg.jpg";

const produitsMock = [
  { id: 1, nom: "Extrait de Moringa", categorie: "Compléments nutritionnels", prix: 25000, description: "Gélules d'extrait pur de Moringa oleifera, 500mg par gélule." },
  { id: 2, nom: "Teinture d'Artemisia", categorie: "Antipaludéens naturels", prix: 18000, description: "Solution buvable à base d'Artemisia annua standardisée." },
  { id: 3, nom: "Sirop Hibiscus+", categorie: "Cardiovasculaire", prix: 15000, description: "Sirop antihypertenseur à base d'Hibiscus sabdariffa." },
  { id: 4, nom: "Gélules Neem", categorie: "Antiparasitaires", prix: 12000, description: "Extrait de feuilles de Neem pour usage antiparasitaire." },
];

export default function CatalogueProduits() {
  const [recherche, setRecherche] = useState("");
  const filtres = produitsMock.filter((p) => p.nom.toLowerCase().includes(recherche.toLowerCase()));
  return (
    <>
      <Helmet><title>Produits – BioMim</title></Helmet>
      <div className="pt-16">
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img src={ResearchBg} alt="Fond de recherche de produits" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative container-max">
            <h1 className="text-4xl font-serif font-bold mb-4">Nos produits</h1>
            <p className="text-primary-foreground/75 max-w-xl mb-8">Formulations pharmaceutiques naturelles issues de nos recherches.</p>
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
              <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un produit…" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>
        </div>
        <div className="section-padding bg-background">
          <div className="container-max">
            <CatalogueProduitsList produits={filtres} chargement={false} />
          </div>
        </div>
      </div>
    </>
  );
}