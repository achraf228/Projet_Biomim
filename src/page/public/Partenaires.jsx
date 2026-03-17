import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";
import ResearchBg from "../../assets/images/research-bg.jpg";

const partenaires = [
  { nom: "Université de Lomé", type: "Académique", pays: "Togo", desc: "Collaboration en phytochimie et pharmacologie." },
  { nom: "CHU Tokoin", type: "Hospitalier", pays: "Togo", desc: "Essais cliniques et validation thérapeutique." },
  { nom: "CERBA", type: "Recherche", pays: "Côte d'Ivoire", desc: "Centre de recherche en biologie appliquée." },
  { nom: "PhytoAfrica Lab", type: "Industriel", pays: "Ghana", desc: "Partenariat de co-développement de formulations." },
  { nom: "OMS Togo", type: "International", pays: "Togo", desc: "Cadre réglementaire et standards de qualité." },
  { nom: "ANRP", type: "Réglementaire", pays: "Togo", desc: "Autorité nationale de réglementation pharmaceutique." },
];

export default function Partenaires() {
  return (
    <>
      <Helmet><title>Partenaires – BioMim</title></Helmet>
      <div className="pt-16">
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img src={ResearchBg} alt="Fond partenaires" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative container-max text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Nos partenaires</h1>
            <p className="text-primary-foreground/75 max-w-xl mx-auto">Un écosystème de collaboration au service de l'innovation pharmaceutique africaine.</p>
          </div>
        </div>
        <div className="section-padding bg-background">
          <div className="container-max">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partenaires.map((p) => (
                <div key={p.nom} className="card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{p.type}</span>
                    <span className="text-xs text-muted-foreground">{p.pays}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-foreground mb-2">{p.nom}</h3>
                  <p className="text-sm text-foreground/65">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}