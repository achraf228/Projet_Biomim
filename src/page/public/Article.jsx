import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, User } from "lucide-react";

const articlesMock = {
  "moringa-medicament": { titre: "Le Moringa : de la plante traditionnelle au médicament moderne", auteur: "Dr. Kofi Mensah", date: "10 mars 2025", contenu: "Le Moringa oleifera, surnommé « l'arbre de vie », est aujourd'hui au cœur de nombreuses recherches pharmaceutiques. Ses feuilles contiennent plus de 90 nutriments essentiels, dont des vitamines, des minéraux et des antioxydants puissants.\n\nBioMim a développé une méthode d'extraction brevetée permettant de concentrer les principes actifs du Moringa tout en préservant leur biodisponibilité. Cette technologie permet la formulation de gélules standardisées à haute efficacité thérapeutique.\n\nNos études cliniques préliminaires montrent des résultats prometteurs dans la prise en charge de la malnutrition, de l'inflammation chronique et des infections bactériennes." },
};

export default function Article() {
  const { slug } = useParams();
  const article = articlesMock[slug] || Object.values(articlesMock)[0];
  return (
    <>
      <Helmet><title>{article.titre} – BioMim</title></Helmet>
      <div className="pt-16 section-padding bg-background">
        <div className="container-max max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm font-medium"><ArrowLeft size={16} /> Retour au blog</Link>
          <div className="card p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{article.titre}</h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-2"><User size={14} />{article.auteur}</span>
              <span className="flex items-center gap-2"><Calendar size={14} />{article.date}</span>
            </div>
            <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed space-y-4">
              {article.contenu.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}