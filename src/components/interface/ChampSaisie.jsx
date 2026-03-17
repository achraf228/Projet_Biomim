export default function ChampSaisie({ label, erreur, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${erreur ? "border-destructive" : ""} ${className}`}
        {...props}
      />
      {erreur && <span className="text-destructive text-xs">{erreur}</span>}
    </div>
  );
}