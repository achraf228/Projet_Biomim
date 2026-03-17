import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, ShoppingCart } from "lucide-react";

const produitsMock = [
  { id: 1, nom: "Extrait de Moringa", forme: "Gélules", prix: 25000, badge: "Populaire" },
  { id: 2, nom: "Teinture d'Artemisia", forme: "Solution buvable", prix: 18000, badge: "Nouveau" },
  { id: 3, nom: "Crème de Karité+", forme: "Crème topique", prix: 12000, badge: null },
];

export default function SectionProduits() {
  return (
    <section id="produits" className="section-padding bg-secondary">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"><FlaskConical size={14} /> Nos formulations</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Produits pharmaceutiques naturels</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Des formulations innovantes issues de la transformation des plantes médicinales africaines.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {produitsMock.map((p) => (
            <div key={p.id} className="card p-6 relative">
              {p.badge && <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
              <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 flex items-center justify-center">
                <FlaskConical size={40} className="text-primary" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-1">{p.nom}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.forme}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{p.prix.toLocaleString()} FCFA</span>
                <button className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"><ShoppingCart size={16} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/produits" className="btn-primary">Voir le catalogue <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}