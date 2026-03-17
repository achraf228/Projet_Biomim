import { ShoppingCart, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import utiliserPanier from "../../../hooks/utiliserPanier";

export default function CarteProduit({ produit }) {
  const { ajouterArticle } = utiliserPanier();
  return (
    <div className="card p-5 flex flex-col">
      <Link to={`/produits/${produit.id}`}>
        <div className="w-full h-44 bg-gradient-to-br from-primary/5 to-accent/10 rounded-xl flex items-center justify-center mb-4">
          {produit.image ? <img src={produit.image} alt={produit.nom} className="h-full object-contain" /> : <FlaskConical size={40} className="text-primary/40" />}
        </div>
        <span className="text-xs text-muted-foreground">{produit.categorie}</span>
        <h3 className="font-serif font-bold text-foreground my-1 hover:text-primary transition-colors">{produit.nom}</h3>
        <p className="text-sm text-foreground/65 line-clamp-2 mb-3">{produit.description}</p>
      </Link>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <span className="font-bold text-primary text-lg">{produit.prix?.toLocaleString()} FCFA</span>
        <button onClick={() => ajouterArticle(produit)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
          <ShoppingCart size={15} /> Ajouter
        </button>
      </div>
    </div>
  );
}