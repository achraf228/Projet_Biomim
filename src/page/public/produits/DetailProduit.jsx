import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import FicheProduit from "../../../components/public/produits/FicheProduit";

const produitsMock = {
  1: { id: 1, nom: "Extrait de Moringa", categorie: "Compléments nutritionnels", prix: 25000, description: "Gélules d'extrait pur de Moringa oleifera, 500mg par gélule. Riche en vitamines A, C, E et en minéraux.", avantages: ["100% naturel", "Sans conservateurs", "Certifié qualité BioMim", "Fabriqué au Togo"] },
};

export default function DetailProduit() {
  const { id } = useParams();
  const produit = produitsMock[id] || produitsMock[1];
  return (
    <>
      <Helmet><title>{produit.nom} – BioMim</title></Helmet>
      <div className="pt-16 section-padding bg-background">
        <div className="container-max">
          <Link to="/produits" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium"><ArrowLeft size={16} /> Retour aux produits</Link>
          <FicheProduit produit={produit} />
        </div>
      </div>
    </>
  );
}