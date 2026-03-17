import { ShoppingCart } from "lucide-react";
import utiliserPanier from "../../../hooks/utiliserPanier";

export default function CarteProduitMarketplace({ produit }) {
  const { ajouterArticle } = utiliserPanier();
  return (
    <div className="card p-4">
      <div className="h-36 bg-secondary rounded-xl flex items-center justify-center mb-3">
        {produit.image ? <img src={produit.image} alt={produit.nom} className="h-full object-contain" /> : <span className="text-4xl">🌿</span>}
      </div>
      <p className="text-xs text-muted-foreground">{produit.vendeur}</p>
      <h3 className="font-semibold text-foreground my-1">{produit.nom}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-primary">{produit.prix?.toLocaleString()} FCFA</span>
        <button onClick={() => ajouterArticle(produit)} className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          <ShoppingCart size={14} />
        </button>
      </div>
    </div>
  );
}