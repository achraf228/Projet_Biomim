export default function Bouton({ children, variante = "primary", taille = "md", className = "", ...props }) {
  const variantes = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    accent: "bg-accent text-accent-foreground hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-primary hover:bg-secondary",
    destructive: "bg-destructive text-white hover:opacity-90",
  };
  const tailles = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  return (
    <button className={`inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantes[variante]} ${tailles[taille]} ${className}`} {...props}>
      {children}
    </button>
  );
}