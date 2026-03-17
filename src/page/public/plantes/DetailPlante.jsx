import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import FichePlante from "../../../components/public/plantes/FichePlante";

const plantesMock = {
  1: { id: 1, nom: "Moringa oleifera", famille: "Moringaceae", origine: "Afrique de l'Ouest", description: "Le Moringa est l'une des plantes les plus nutritives au monde, avec des feuilles riches en vitamines, minéraux et acides aminés essentiels.", usagesPharmaceutiques: "Utilisé dans la formulation de compléments nutritionnels, anti-inflammatoires et antioxydants.", proprietes: ["Antioxydant", "Anti-inflammatoire", "Nutritif"], precautions: "Éviter en cas de grossesse. Consulter un médecin avant toute prise prolongée." },
};

export default function DetailPlante() {
  const { id } = useParams();
  const plante = plantesMock[id] || plantesMock[1];
  return (
    <>
      <Helmet><title>{plante.nom} – BioMim</title></Helmet>
      <div className="pt-16 section-padding bg-background">
        <div className="container-max">
          <Link to="/plantes" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium"><ArrowLeft size={16} /> Retour aux plantes</Link>
          <FichePlante plante={plante} />
        </div>
      </div>
    </>
  );
}