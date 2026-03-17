import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

const plantesMock = [
  { id: 1, nom: "Moringa oleifera", famille: "Moringaceae", usages: "Nutritif, anti-inflammatoire", couleur: "bg-green-50" },
  { id: 2, nom: "Catharanthus roseus", famille: "Apocynaceae", usages: "Anticancéreux", couleur: "bg-rose-50" },
  { id: 3, nom: "Artemisia annua", famille: "Asteraceae", usages: "Antipaludéen", couleur: "bg-yellow-50" },
];

export default function SectionPlantes() {
  return (
    <section id="plantes" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"><Leaf size={14} /> Pharmacopée naturelle</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Plantes médicinales étudiées</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Nous analysons et transformons des centaines de plantes médicinales en principes actifs pharmaceutiques.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {plantesMock.map((p) => (
            <Link to={`/plantes/${p.id}`} key={p.id} className="card p-6 group">
              <div className={`w-16 h-16 ${p.couleur} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Leaf size={28} className="text-primary" />
              </div>
              <h3 className="font-serif font-bold text-lg italic text-foreground mb-1">{p.nom}</h3>
              <p className="text-xs text-muted-foreground mb-3">{p.famille}</p>
              <p className="text-sm text-foreground/70">{p.usages}</p>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/plantes" className="btn-primary">Voir toutes les plantes <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}