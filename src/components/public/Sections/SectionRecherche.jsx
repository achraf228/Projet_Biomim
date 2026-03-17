import { Search, Microscope, FlaskConical, Award } from "lucide-react";

const etapes = [
  { icon: Search, num: "01", titre: "Identification", desc: "Recherche et sélection de plantes médicinales à fort potentiel thérapeutique." },
  { icon: Microscope, num: "02", titre: "Analyse", desc: "Étude phytochimique et pharmacologique des principes actifs." },
  { icon: FlaskConical, num: "03", titre: "Formulation", desc: "Développement de formes galéniques stables et efficaces." },
  { icon: Award, num: "04", titre: "Validation", desc: "Tests d'efficacité, de sécurité et contrôle qualité rigoureux." },
];

export default function SectionRecherche() {
  return (
    <section id="recherche" className="section-padding bg-primary text-primary-foreground">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4"><Microscope size={14} /> Notre processus</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">De la recherche au médicament</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">Un processus rigoureux pour garantir des produits pharmaceutiques naturels de haute qualité.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapes.map(({ icon: Icon, num, titre, desc }) => (
            <div key={num} className="relative bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-accent/50 transition-colors">
              <div className="text-5xl font-serif font-bold text-white/10 absolute top-4 right-4">{num}</div>
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Icon size={24} className="text-accent" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">{titre}</h3>
              <p className="text-primary-foreground/65 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}