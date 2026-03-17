import CarteProduit from "./CarteProduit";
import Loader from "../../interface/Loader";

export default function CatalogueProduits({ produits, chargement }) {
  if (chargement) return <Loader taille="lg" className="py-20" />;
  if (!produits?.length) return <div className="text-center py-20 text-muted-foreground">Aucun produit trouvé.</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {produits.map((p) => <CarteProduit key={p.id} produit={p} />)}
    </div>
  );
}