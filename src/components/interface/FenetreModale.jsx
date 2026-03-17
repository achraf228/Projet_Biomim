import { useEffect } from "react";
import { X } from "lucide-react";

export default function FenetreModale({ ouvert, onFermer, titre, children }) {
  useEffect(() => {
    if (ouvert) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [ouvert]);

  if (!ouvert) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onFermer} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-serif font-bold text-foreground">{titre}</h2>
          <button onClick={onFermer} className="p-2 hover:bg-muted rounded-lg transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}