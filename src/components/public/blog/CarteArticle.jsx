import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function CarteArticle({ article }) {
  return (
    <Link to={`/blog/${article.slug || article.id}`} className="card overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        {article.image && <img src={article.image} alt={article.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} />{article.date}</span>
          <span className="flex items-center gap-1"><User size={12} />{article.auteur}</span>
        </div>
        <h3 className="font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.titre}</h3>
        <p className="text-sm text-foreground/65 line-clamp-3 mb-4">{article.extrait}</p>
        <span className="flex items-center gap-1 text-primary text-sm font-medium">Lire la suite <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}