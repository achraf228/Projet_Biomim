import { Leaf, FlaskConical, AlertTriangle, MapPin, BookOpen, Microscope } from "lucide-react";
import Badge from "../../interface/Badge";

export default function FichePlante({ plante }) {
  if (!plante) return null;

  return (
    <div className="space-y-8">
      <div className="card p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-28 h-28 bg-gradient-to-br from-primary/10 to-secondary rounded-2xl flex items-center justify-center shrink-0">
            {plante.image ? (
              <img src={plante.image} alt={plante.nom} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <Leaf size={44} className="text-primary/50" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-serif font-bold italic text-foreground mb-2">{plante.nom}</h1>
            {plante.nomCommun && <p className="text-lg text-muted-foreground mb-3">« {plante.nomCommun} »</p>}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
              {plante.famille && <span className="flex items-center gap-1"><BookOpen size={14} /> {plante.famille}</span>}
              {plante.origine && <span className="flex items-center gap-1"><MapPin size={14} /> {plante.origine}</span>}
            </div>
            {plante.proprietes?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {plante.proprietes.map((p) => <Badge key={p} variante="primary">{p}</Badge>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="flex items-center gap-2 font-serif font-bold text-xl text-foreground mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><Leaf size={18} className="text-primary" /></div>
            Description botanique
          </h2>
          <p className="text-foreground/70 leading-relaxed text-sm">{plante.description || "Aucune description disponible."}</p>
        </div>
        <div className="card p-6">
          <h2 className="flex items-center gap-2 font-serif font-bold text-xl text-foreground mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><FlaskConical size={18} className="text-primary" /></div>
            Usages pharmaceutiques
          </h2>
          <p className="text-foreground/70 leading-relaxed text-sm">{plante.usagesPharmaceutiques || plante.usages || "Aucun usage renseigné."}</p>
        </div>
      </div>

      {plante.composants?.length > 0 && (
        <div className="card p-6">
          <h2 className="flex items-center gap-2 font-serif font-bold text-xl text-foreground mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><Microscope size={18} className="text-primary" /></div>
            Composants actifs
          </h2>
          <div className="flex flex-wrap gap-2">
            {plante.composants.map((c) => (
              <span key={c} className="px-3 py-1.5 bg-secondary rounded-xl text-sm font-medium text-foreground/80 border border-border">{c}</span>
            ))}
          </div>
        </div>
      )}

      {plante.precautions && (
        <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200 flex gap-4">
          <div className="w-9 h-9 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle size={18} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800 mb-1">Précautions d'emploi</h3>
            <p className="text-yellow-700 text-sm leading-relaxed">{plante.precautions}</p>
          </div>
        </div>
      )}
    </div>
  );
}
