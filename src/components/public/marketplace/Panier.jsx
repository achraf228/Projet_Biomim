import { Trash2, Plus, Minus } from "lucide-react";
import utiliserPanier from "../../../hooks/utiliserPanier";

export default function Panier() {
  const { articles, retirerArticle, modifierQuantite, total } = utiliserPanier();
  if (!articles.length) return <div className="text-center py-12 text-muted-foreground">Votre panier est vide.</div>;
  return (
    <div className="space-y-4">
      {articles.map((a) => (
        <div key={a.id} className="card p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center shrink-0">🌿</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{a.nom}</h4>
            <p className="text-sm text-primary font-bold">{a.prix?.toLocaleString()} FCFA</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => modifierQuantite(a.id, a.quantite - 1)} className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center hover:bg-muted"><Minus size={12} /></button>
            <span className="w-6 text-center text-sm font-semibold">{a.quantite}</span>
            <button onClick={() => modifierQuantite(a.id, a.quantite + 1)} className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center hover:bg-muted"><Plus size={12} /></button>
          </div>
          <button onClick={() => retirerArticle(a.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
        </div>
      ))}
      <div className="card p-4 bg-secondary">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{total.toLocaleString()} FCFA</span>
        </div>
      </div>
    </div>
  );
}