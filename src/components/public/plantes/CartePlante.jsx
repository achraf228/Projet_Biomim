import { Link } from "react-router-dom";
import { Leaf, ChevronRight } from "lucide-react";

export default function CartePlante({ plante }) {
  return (
    <Link to={`/plantes/${plante.id}`} className="card p-5 group flex flex-col">
      <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-secondary rounded-xl flex items-center justify-center mb-4 overflow-hidden">
        {plante.image ? <img src={plante.image} alt={plante.nom} className="w-full h-full object-cover" /> : <Leaf size={40} className="text-primary/40" />}
      </div>
      <span className="text-xs text-muted-foreground mb-1">{plante.famille}</span>
      <h3 className="font-serif font-bold text-foreground italic mb-2 group-hover:text-primary transition-colors">{plante.nom}</h3>
      <p className="text-sm text-foreground/65 flex-1 line-clamp-2">{plante.usages}</p>
      <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3">Voir la fiche <ChevronRight size={14} /></div>
    </Link>
  );
}