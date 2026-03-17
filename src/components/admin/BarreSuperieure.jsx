import { Bell, User } from "lucide-react";
import utiliserAuth from "../../hooks/utiliserAuth";

export default function BarreSuperieure() {
  const { utilisateur } = utiliserAuth();
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <h1 className="font-serif font-bold text-xl text-foreground">Administration</h1>
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
          <Bell size={20} className="text-foreground/60" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User size={16} className="text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">{utilisateur?.nom || "Admin"}</span>
        </div>
      </div>
    </header>
  );
}