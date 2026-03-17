import { useState } from "react";
import ChampSaisie from "../../interface/ChampSaisie";
import Bouton from "../../interface/Bouton";

export default function FormulairePartenaire({ partenaire, onSoumettre, chargement }) {
  const [form, setForm] = useState({ nom: partenaire?.nom || "", type: partenaire?.type || "", site: partenaire?.site || "", description: partenaire?.description || "" });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSoumettre(form); }} className="space-y-4">
      <ChampSaisie label="Nom" value={form.nom} onChange={maj("nom")} required />
      <ChampSaisie label="Type (Académique, Hospitalier…)" value={form.type} onChange={maj("type")} />
      <ChampSaisie label="Site web" type="url" value={form.site} onChange={maj("site")} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <textarea value={form.description} onChange={maj("description")} rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      </div>
      <Bouton type="submit" disabled={chargement} className="w-full justify-center">{chargement ? "Enregistrement..." : "Enregistrer"}</Bouton>
    </form>
  );
}