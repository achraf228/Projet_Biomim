import { MapPin, Star } from "lucide-react";

export default function CarteVendeur({ vendeur }) {
  return (
    <div className="card p-5">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-3 text-2xl font-serif font-bold text-primary">
        {vendeur.nom?.charAt(0)}
      </div>
      <h3 className="font-serif font-bold text-foreground mb-1">{vendeur.nom}</h3>
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2"><MapPin size={12} />{vendeur.localisation}</div>
      <div className="flex items-center gap-1 text-sm"><Star size={12} className="text-accent fill-accent" /><span className="font-medium">{vendeur.note}</span></div>
    </div>
  );
}