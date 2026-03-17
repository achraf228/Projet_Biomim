import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Leaf } from "lucide-react";
import utiliserPanier from "../../hooks/utiliserPanier";

const liens = [
  { label: "Accueil", href: "/" },
  { label: "Plantes", href: "/plantes" },
  { label: "Produits", href: "/produits" },
  { label: "Boutique", href: "/boutique" },
  { label: "Recherche", href: "/#recherche" },
  { label: "Blog", href: "/blog" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Contact", href: "/contact" },
];

export default function BarreNavigation() {
  const [ouvert, setOuvert] = useState(false);
  const [defilé, setDefilé] = useState(false);
  const { nombreArticles } = utiliserPanier();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setDefilé(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gère le défilement lors des changements de route
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleLinkClick = (href) => {
    setOuvert(false);
    const url = new URL(href, window.location.origin);
    const path = url.pathname;
    const hash = url.hash.substring(1);

    // Si on clique sur un lien de la page actuelle
    if (path === location.pathname) {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${defilé ? "bg-primary shadow-lg" : "bg-primary/95"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <Leaf size={20} className="text-accent-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-primary-foreground">BioMim</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1">
              {liens.map((lien) => (
                <NavLink key={lien.href} to={lien.href} onClick={() => handleLinkClick(lien.href)}
                  className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-white/20 text-white" : "text-primary-foreground/80 hover:text-white hover:bg-white/10"}`}>
                  {lien.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/panier" className="relative p-2 text-primary-foreground hover:bg-white/10 rounded-lg transition-colors">
                <ShoppingCart size={22} />
                {nombreArticles > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">{nombreArticles}</span>
                )}
              </Link>
              <button onClick={() => setOuvert(!ouvert)} className="lg:hidden p-2 text-primary-foreground hover:bg-white/10 rounded-lg transition-colors">
                {ouvert ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {ouvert && (
        <div className="lg:hidden bg-primary border-t border-white/10 px-4 py-4 space-y-1">
          {liens.map((lien) => (
            <NavLink key={lien.href} to={lien.href} onClick={() => handleLinkClick(lien.href)}
              className="block px-4 py-3 rounded-xl text-primary-foreground/80 hover:text-white hover:bg-white/10 transition-colors font-medium">
              {lien.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}