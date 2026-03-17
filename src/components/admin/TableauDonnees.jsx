import Loader from "../interface/Loader";

export default function TableauDonnees({ colonnes, donnees, chargement, actions }) {
  if (chargement) return <Loader taille="lg" className="py-12" />;
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary border-b border-border">
            <tr>
              {colonnes.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 font-semibold text-foreground/70">{col.label}</th>
              ))}
              {actions && <th className="text-left px-4 py-3 font-semibold text-foreground/70">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {donnees?.length === 0 && (
              <tr><td colSpan={colonnes.length + 1} className="text-center py-10 text-muted-foreground">Aucune donnée</td></tr>
            )}
            {donnees?.map((row, i) => (
              <tr key={i} className="hover:bg-secondary/50 transition-colors">
                {colonnes.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-foreground/80">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && <td className="px-4 py-3">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}