import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function PiedDePage() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                <Leaf size={20} className="text-accent-foreground" />
              </div>
              <span className="text-xl font-serif font-bold">BioMim</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Transformer les plantes médicinales en médicaments améliorés grâce à la recherche biopharmaceutique avancée.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[["Plantes médicinales", "/plantes"], ["Nos produits", "/produits"], ["Boutique", "/boutique"], ["Blog", "/blog"],["Carte", "/map"], ["Assistant IA", "/chat"], ["À propos", "/a-propos"]].map(([label, href]) => (
                <li key={href}><Link to={href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Recherche</h4>
            <ul className="space-y-2">
              {[["Phytothérapie", "#"], ["Pharmacologie", "#"], ["Partenaires", "/partenaires"], ["Publications", "#"]].map(([label, href]) => (
                <li key={label}><Link to={href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" /><span>Lomé, Adidogomé</span></li>
              <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-accent" /><span>+228 92 26 42 96</span></li>
              <li className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-accent" /><span>saeicube.dev@gmail.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} BioMim. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-accent transition-colors">Mentions légales</Link>
            <Link to="#" className="hover:text-accent transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}