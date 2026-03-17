import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Leaf, FlaskConical, ShoppingBag, FileText, Users, Handshake, MessageSquare, LogOut } from "lucide-react";
import utiliserAuth from "../../hooks/utiliserAuth";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Plantes", href: "/admin/plantes", icon: Leaf },
  { label: "Produits", href: "/admin/produits", icon: FlaskConical },
  { label: "Commandes", href: "/admin/commandes", icon: ShoppingBag },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Partenaires", href: "/admin/partenaires", icon: Handshake },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function BarreLaterale() {
  const { deconnexion } = utiliserAuth();
  const navigate = useNavigate();

  const handleDeconnexion = () => { deconnexion(); navigate("/admin/connexion"); };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-primary-foreground z-50 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Leaf size={16} className="text-accent-foreground" />
          </div>
          <span className="font-serif font-bold text-lg">BioMim Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => (
          <NavLink key={href} to={href} end={href === "/admin"}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive ? "bg-accent text-accent-foreground" : "text-primary-foreground/80 hover:bg-white/10 hover:text-white"}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={handleDeconnexion} className="flex items-center gap-3 px-4 py-3 rounded-xl text-primary-foreground/80 hover:bg-white/10 w-full transition-colors text-sm font-medium">
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}