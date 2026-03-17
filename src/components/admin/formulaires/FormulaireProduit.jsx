import { useState } from "react";
import ChampSaisie from "../../interface/ChampSaisie";
import Bouton from "../../interface/Bouton";

export default function FormulaireProduit({ produit, onSoumettre, chargement }) {
  const [form, setForm] = useState({
    nom: produit?.nom || "", categorie: produit?.categorie || "",
    prix: produit?.prix || "", description: produit?.description || "",
    composition: produit?.composition || "", dosage: produit?.dosage || "",
  });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSoumettre(form); }} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <ChampSaisie label="Nom du produit" value={form.nom} onChange={maj("nom")} required />
        <ChampSaisie label="Catégorie" value={form.categorie} onChange={maj("categorie")} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ChampSaisie label="Prix (FCFA)" type="number" value={form.prix} onChange={maj("prix")} />
        <ChampSaisie label="Dosage" value={form.dosage} onChange={maj("dosage")} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <textarea value={form.description} onChange={maj("description")} rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      </div>
      <ChampSaisie label="Composition" value={form.composition} onChange={maj("composition")} />
      <Bouton type="submit" disabled={chargement} className="w-full justify-center">{chargement ? "Enregistrement..." : "Enregistrer"}</Bouton>
    </form>
  );
}