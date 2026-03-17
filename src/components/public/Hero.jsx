import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Leaf, Search } from "lucide-react";
import HeroImage from "../../assets/images/hero-biotech.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-16">
      <img src={HeroImage} alt="Laboratoire de biotechnologie" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full border border-white/30"
            style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Leaf size={14} /> Phytopharmacie avancée
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
              De la plante<br />
              <span className="text-accent">au médicament</span><br />
              de demain
            </h1>
            <p className="text-primary-foreground/75 text-lg leading-relaxed mb-10 max-w-lg">
              BioMim transforme les plantes médicinales en solutions pharmaceutiques améliorées, en identifiant les meilleures matières naturelles pour la médecine moderne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/produits" className="btn-accent text-base">
                Découvrir nos produits <ArrowRight size={18} />
              </Link>
              <Link to="/plantes" className="btn-outline border-white/40 text-white hover:bg-white hover:text-primary text-base">
                Explorer les plantes
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/20">
              {[["200+", "Plantes étudiées"], ["50+", "Produits formulés"], ["15+", "Partenaires"], ].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl font-serif font-bold text-accent">{val}</div>
                  <div className="text-primary-foreground/60 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: Leaf, titre: "Phytothérapie", desc: "Extraction et purification d'actifs végétaux" },
              { icon: FlaskConical, titre: "Formulation", desc: "Développement de formes pharmaceutiques" },
              { icon: Search, titre: "Identification", desc: "Screening de nouveaux composés naturels" },
              { icon: ArrowRight, titre: "Innovation", desc: "R&D en biopharmacologie naturelle" },
            ].map(({ icon: Icon, titre, desc }, i) => (
              <div key={titre} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ${i === 1 ? "mt-8" : ""}`}>
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-primary-foreground font-semibold mb-2">{titre}</h3>
                <p className="text-primary-foreground/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}