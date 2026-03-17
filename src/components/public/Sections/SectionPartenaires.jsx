export default function SectionPartenaires() {
  const partenaires = ["Université de Lomé", "CHU Tokoin", "CERBA", "PhytoAfrica Lab", "OMS Togo", "ANRP"];
  return (
    <section id="partenaires" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Nos partenaires</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">BioMim collabore avec des institutions académiques, hospitalières et industrielles de premier plan.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partenaires.map((p) => (
            <div key={p} className="card p-4 flex items-center justify-center text-center">
              <span className="text-sm font-semibold text-primary/70">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}