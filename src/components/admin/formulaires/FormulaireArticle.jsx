import { useState } from "react";
import ChampSaisie from "../../interface/ChampSaisie";
import Bouton from "../../interface/Bouton";

export default function FormulaireArticle({ article, onSoumettre, chargement }) {
  const [form, setForm] = useState({ titre: article?.titre || "", auteur: article?.auteur || "", extrait: article?.extrait || "", contenu: article?.contenu || "" });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSoumettre(form); }} className="space-y-4">
      <ChampSaisie label="Titre" value={form.titre} onChange={maj("titre")} required />
      <ChampSaisie label="Auteur" value={form.auteur} onChange={maj("auteur")} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Extrait</label>
        <textarea value={form.extrait} onChange={maj("extrait")} rows={2} className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Contenu</label>
        <textarea value={form.contenu} onChange={maj("contenu")} rows={8} className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      </div>
      <Bouton type="submit" disabled={chargement} className="w-full justify-center">{chargement ? "Publication..." : "Publier"}</Bouton>
    </form>
  );
}