import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PanierComp from "../../../components/public/marketplace/Panier";
import utiliserPanier from "../../../hooks/utiliserPanier";

export default function Panier() {
  const { total, articles } = utiliserPanier();
  return (
    <>
      <Helmet><title>Panier – BioMim</title></Helmet>
      <div className="pt-16 section-padding bg-background">
        <div className="container-max max-w-3xl">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Mon panier</h1>
          <PanierComp />
          {articles.length > 0 && (
            <div className="mt-6">
              <Link to="/paiement" className="btn-primary w-full justify-center text-lg">Procéder au paiement</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}