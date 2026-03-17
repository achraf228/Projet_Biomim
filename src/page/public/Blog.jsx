import { Helmet } from "react-helmet-async";
import ListeArticles from "../../components/public/blog/ListeArticles";
import ResearchBg from "../../assets/images/research-bg.jpg";

const articlesMock = [
  { id: 1, slug: "moringa-medicament", titre: "Le Moringa : de la plante traditionnelle au médicament moderne", auteur: "Dr. Kofi Mensah", date: "10 mars 2025", extrait: "Découvrez comment le Moringa oleifera, longtemps utilisé en médecine traditionnelle, est aujourd'hui à la base de formulations pharmaceutiques innovantes." },
  { id: 2, slug: "artemisinine-paludisme", titre: "L'artémisinine, révolution dans le traitement du paludisme", auteur: "Dr. Afia Boateng", date: "15 fév. 2025", extrait: "Retour sur la découverte de l'artémisinine extraite de l'Artemisia annua et son rôle crucial dans la lutte contre le paludisme en Afrique." },
  { id: 3, slug: "phytopharmacie-afrique", titre: "La phytopharmacie en Afrique de l'Ouest : enjeux et opportunités", auteur: "BioMim Research", date: "5 jan. 2025", extrait: "Analyse du marché africain de la phytopharmacie et des opportunités pour développer des médicaments locaux accessibles." },
];

export default function Blog() {
  return (
    <>
      <Helmet><title>Blog – BioMim</title></Helmet>
      <div className="pt-16">
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img src={ResearchBg} alt="Fond du blog" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative container-max">
            <h1 className="text-4xl font-serif font-bold mb-4">Blog scientifique</h1>
            <p className="text-primary-foreground/75">Actualités, recherches et découvertes en phytopharmacie.</p>
          </div>
        </div>
        <div className="section-padding bg-background">
          <div className="container-max">
            <ListeArticles articles={articlesMock} chargement={false} />
          </div>
        </div>
      </div>
    </>
  );
}