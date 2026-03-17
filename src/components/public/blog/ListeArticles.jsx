import CarteArticle from "./CarteArticle";
import Loader from "../../interface/Loader";

export default function ListeArticles({ articles, chargement }) {
  if (chargement) return <Loader taille="lg" className="py-20" />;
  if (!articles?.length) return <div className="text-center py-20 text-muted-foreground">Aucun article disponible.</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => <CarteArticle key={a.id} article={a} />)}
    </div>
  );
}