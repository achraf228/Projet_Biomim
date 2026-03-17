import { Helmet } from "react-helmet-async";
import { Leaf, FlaskConical, ShoppingBag, FileText, Users, TrendingUp } from "lucide-react";

const stats = [
  { label: "Plantes référencées", valeur: "248", icon: Leaf, couleur: "bg-green-50 text-green-700" },
  { label: "Produits actifs", valeur: "64", icon: FlaskConical, couleur: "bg-blue-50 text-blue-700" },
  { label: "Commandes du mois", valeur: "137", icon: ShoppingBag, couleur: "bg-orange-50 text-orange-700" },
  { label: "Articles publiés", valeur: "42", icon: FileText, couleur: "bg-purple-50 text-purple-700" },
  { label: "Utilisateurs", valeur: "1 284", icon: Users, couleur: "bg-pink-50 text-pink-700" },
  { label: "Revenus (FCFA)", valeur: "4 800 000", icon: TrendingUp, couleur: "bg-accent/10 text-accent-foreground" },
];

export default function TableauDeBord() {
  return (
    <>
      <Helmet><title>Tableau de bord – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground text-sm">Vue d'ensemble de l'activité BioMim</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map(({ label, valeur, icon: Icon, couleur }) => (
            <div key={label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${couleur}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-serif font-bold text-foreground">{valeur}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}