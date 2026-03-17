import CartePlante from "./CartePlante";
import Loader from "../../interface/Loader";

export default function ListePlantes({ plantes, chargement }) {
  if (chargement) return <Loader taille="lg" className="py-20" />;
  if (!plantes?.length) return <div className="text-center py-20 text-muted-foreground">Aucune plante trouvée.</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plantes.map((p) => <CartePlante key={p.id} plante={p} />)}
    </div>
  );
}