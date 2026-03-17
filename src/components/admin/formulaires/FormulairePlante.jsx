import { useState } from "react";
import ChampSaisie from "../../interface/ChampSaisie";
import Bouton from "../../interface/Bouton";

export default function FormulairePlante({ plante, onSoumettre, chargement }) {
  const [form, setForm] = useState({
    nom: plante?.nom || "", famille: plante?.famille || "",
    origine: plante?.origine || "", description: plante?.description || "",
    usages: plante?.usages || "", precautions: plante?.precautions || "",
  });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSoumettre(form); }} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <ChampSaisie label="Nom scientifique" value={form.nom} onChange={maj("nom")} required />
        <ChampSaisie label="Famille botanique" value={form.famille} onChange={maj("famille")} />
      </div>
      <ChampSaisie label="Origine" value={form.origine} onChange={maj("origine")} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <textarea value={form.description} onChange={maj("description")} rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      </div>
      <ChampSaisie label="Usages" value={form.usages} onChange={maj("usages")} />
      <ChampSaisie label="Précautions" value={form.precautions} onChange={maj("precautions")} />
      <Bouton type="submit" disabled={chargement} className="w-full justify-center">{chargement ? "Enregistrement..." : "Enregistrer"}</Bouton>
    </form>
  );
}