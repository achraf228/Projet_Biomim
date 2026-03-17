import { useState } from "react";
import ChampSaisie from "../../interface/ChampSaisie";
import Bouton from "../../interface/Bouton";

export default function FormulaireUtilisateur({ utilisateur, onSoumettre, chargement }) {
  const [form, setForm] = useState({ nom: utilisateur?.nom || "", email: utilisateur?.email || "", role: utilisateur?.role || "utilisateur", motDePasse: "" });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSoumettre(form); }} className="space-y-4">
      <ChampSaisie label="Nom complet" value={form.nom} onChange={maj("nom")} required />
      <ChampSaisie label="Email" type="email" value={form.email} onChange={maj("email")} required />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Rôle</label>
        <select value={form.role} onChange={maj("role")} className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="utilisateur">Utilisateur</option>
          <option value="editeur">Éditeur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
      <ChampSaisie label="Mot de passe" type="password" value={form.motDePasse} onChange={maj("motDePasse")} placeholder={utilisateur ? "Laisser vide pour ne pas changer" : "Requis"} />
      <Bouton type="submit" disabled={chargement} className="w-full justify-center">{chargement ? "Enregistrement..." : "Enregistrer"}</Bouton>
    </form>
  );
}