import { ShoppingCart, FlaskConical, CheckCircle } from "lucide-react";
import utiliserPanier from "../../../hooks/utiliserPanier";
import Badge from "../../interface/Badge";

export default function FicheProduit({ produit }) {
  const { ajouterArticle } = utiliserPanier();
  if (!produit) return null;
  return (
    <div className="card p-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="h-80 bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl flex items-center justify-center">
          {produit.image ? <img src={produit.image} alt={produit.nom} className="h-full object-contain p-6" /> : <FlaskConical size={60} className="text-primary/30" />}
        </div>
        <div>
          <Badge variante="accent" className="mb-4">{produit.categorie}</Badge>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-3">{produit.nom}</h1>
          <p className="text-foreground/70 leading-relaxed mb-6">{produit.description}</p>
          <div className="text-3xl font-bold text-primary mb-6">{produit.prix?.toLocaleString()} FCFA</div>
          {produit.avantages?.length > 0 && (
            <ul className="space-y-2 mb-6">
              {produit.avantages.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-foreground/75">
                  <CheckCircle size={16} className="text-primary" /> {a}
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => ajouterArticle(produit)} className="btn-primary w-full justify-center">
            <ShoppingCart size={18} /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}