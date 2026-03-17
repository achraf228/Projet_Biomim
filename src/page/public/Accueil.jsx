import { Helmet } from "react-helmet-async";
import Hero from "../../components/public/Hero";
import SectionPlantes from "../../components/public/Sections/SectionPlantes";
import SectionProduits from "../../components/public/Sections/SectionProduits";
import SectionRecherche from "../../components/public/Sections/SectionRecherche";
import SectionPartenaires from "../../components/public/Sections/SectionPartenaires";

export default function Accueil() {
  return (
    <>
      <Helmet><title>BioMim – De la plante au médicament</title></Helmet>
      <Hero />
      <SectionPlantes />
      <SectionProduits />
      <SectionRecherche />
      <SectionPartenaires />
    </>
  );
}