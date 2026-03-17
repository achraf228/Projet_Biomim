import { Helmet } from "react-helmet-async";
import CarteProduitMarketplace from "../../../components/public/marketplace/CarteProduitMarketplace";
import ResearchBg from "../../../assets/images/research-bg.jpg";

const produits = [
  { id: 10, nom: "Poudre de Baobab", vendeur: "NaturAfrique", prix: 8000 },
  { id: 11, nom: "Huile de Karité pure", vendeur: "KaritéPlus", prix: 10000 },
  { id: 12, nom: "Tisane Moringa bio", vendeur: "BioHerbs Togo", prix: 5000 },
  { id: 13, nom: "Gel d'Aloe Vera", vendeur: "AloeAfric", prix: 7500 },
];

export default function Boutique() {
  return (
    <>
      <Helmet><title>Boutique – BioMim</title></Helmet>
      <div className="pt-16">
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img src={ResearchBg} alt="Fond de la boutique" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative container-max">
            <h1 className="text-4xl font-serif font-bold mb-4">Marketplace</h1>
            <p className="text-primary-foreground/75">Produits naturels sélectionnés par nos partenaires.</p>
          </div>
        </div>
        <div className="section-padding bg-background">
          <div className="container-max">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produits.map((p) => <CarteProduitMarketplace key={p.id} produit={p} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}