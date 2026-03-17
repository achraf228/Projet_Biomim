import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Leaf, Lock, Mail } from "lucide-react";
import ChampSaisie from "../../components/interface/ChampSaisie";
import Bouton from "../../components/interface/Bouton";
import utiliserAuth from "../../hooks/utiliserAuth";
import toast from "react-hot-toast";

export default function Connexion() {
  const [form, setForm] = useState({ email: "", motDePasse: "" });
  const [chargement, setChargement] = useState(false);
  const { connexion } = utiliserAuth();
  const navigate = useNavigate();
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChargement(true);
    try {
      // Simulation - remplacer par appel API réel
      await new Promise((r) => setTimeout(r, 800));
      connexion({ nom: "Administrateur", email: form.email, role: "admin" }, "token_demo");
      toast.success("Connexion réussie");
      navigate("/admin");
    } catch {
      toast.error("Identifiants incorrects");
    } finally {
      setChargement(false);
    }
  };

  return (
    <>
      <Helmet><title>Connexion Admin – BioMim</title></Helmet>
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf size={30} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">BioMim Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">Accès réservé aux administrateurs</p>
          </div>
          <form onSubmit={handleSubmit} className="card p-8 space-y-4">
            <ChampSaisie label="Email" type="email" value={form.email} onChange={maj("email")} required placeholder="admin@biomim.com" />
            <ChampSaisie label="Mot de passe" type="password" value={form.motDePasse} onChange={maj("motDePasse")} required placeholder="••••••••" />
            <Bouton type="submit" disabled={chargement} className="w-full justify-center mt-2">
              {chargement ? "Connexion…" : "Se connecter"}
            </Bouton>
          </form>
        </div>
      </div>
    </>
  );
}