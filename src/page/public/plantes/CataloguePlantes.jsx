import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import ListePlantes from "../../../components/public/plantes/ListePlantes";
import ResearchBg from "../../../assets/images/research-bg.jpg";

const plantesMock = [
  { id: 1, nom: "Moringa oleifera", famille: "Moringaceae", usages: "Nutritif, anti-inflammatoire, antioxydant", origine: "Afrique de l'Ouest" },
  { id: 2, nom: "Catharanthus roseus", famille: "Apocynaceae", usages: "Anticancéreux (vincristine, vinblastine)", origine: "Madagascar" },
  { id: 3, nom: "Artemisia annua", famille: "Asteraceae", usages: "Antipaludéen (artémisinine)", origine: "Asie / Afrique" },
  { id: 4, nom: "Neem (Azadirachta indica)", famille: "Meliaceae", usages: "Antibactérien, antifongique, antiparasitaire", origine: "Afrique tropicale" },
  { id: 5, nom: "Hibiscus sabdariffa", famille: "Malvaceae", usages: "Antihypertenseur, diurétique", origine: "Afrique de l'Ouest" },
  { id: 6, nom: "Vernonia amygdalina", famille: "Asteraceae", usages: "Antidiabétique, antimalaria", origine: "Afrique subsaharienne" },
];

export default function CataloguePlantes() {
  const [plantes, setPlantes] = useState(plantesMock);
  const [recherche, setRecherche] = useState("");

  const plantesFiltrees = plantes.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase()) || p.usages.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Plantes médicinales – BioMim</title></Helmet>
      <div className="pt-16">
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img src={ResearchBg} alt="Fond de recherche de plantes" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative container-max">
            <h1 className="text-4xl font-serif font-bold mb-4">Plantes médicinales</h1>
            <p className="text-primary-foreground/75 max-w-xl mb-8">Explorez notre catalogue de plantes médicinales étudiées et transformées par BioMim.</p>
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
              <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher une plante…" className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>
        </div>
        <div className="section-padding bg-background">
          <div className="container-max">
            <ListePlantes plantes={plantesFiltrees} chargement={false} />
          </div>
        </div>
      </div>
    </>
  );
}