import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ChampSaisie from "../../../components/interface/ChampSaisie";
import Bouton from "../../../components/interface/Bouton";
import utiliserPanier from "../../../hooks/utiliserPanier";
import toast from "react-hot-toast";

export default function Paiement() {
  const { total, viderPanier } = utiliserPanier();
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", adresse: "" });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Commande passée avec succès !");
    viderPanier();
  };

  return (
    <>
      <Helmet><title>Paiement – BioMim</title></Helmet>
      <div className="pt-16 section-padding bg-background">
        <div className="container-max max-w-lg">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Finaliser la commande</h1>
          <form onSubmit={handleSubmit} className="card p-8 space-y-4">
            <ChampSaisie label="Nom complet" value={form.nom} onChange={maj("nom")} required />
            <ChampSaisie label="Email" type="email" value={form.email} onChange={maj("email")} required />
            <ChampSaisie label="Téléphone" type="tel" value={form.telephone} onChange={maj("telephone")} />
            <ChampSaisie label="Adresse de livraison" value={form.adresse} onChange={maj("adresse")} required />
            <div className="flex items-center justify-between py-4 border-t border-border font-bold text-lg">
              <span>Total à payer</span>
              <span className="text-primary">{total.toLocaleString()} FCFA</span>
            </div>
            <Bouton type="submit" className="w-full justify-center">Confirmer la commande</Bouton>
          </form>
        </div>
      </div>
    </>
  );
}