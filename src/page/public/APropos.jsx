import { Helmet } from "react-helmet-async";
import { Leaf, FlaskConical, Target, Users } from "lucide-react";

export default function APropos() {
  return (
    <>
      <Helmet><title>À propos – BioMim</title></Helmet>
      <div className="pt-16">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-max text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">À propos de BioMim</h1>
            <p className="text-primary-foreground/75 text-xl max-w-3xl mx-auto">Pionnier de la pharmacologie naturelle en Afrique de l'Ouest, BioMim transforme la biodiversité végétale en solutions thérapeutiques modernes.</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-max">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Notre mission</h2>
                <p className="text-foreground/70 leading-relaxed mb-4">BioMim a pour vocation de valoriser la richesse de la flore médicinale africaine en développant des médicaments améliorés, efficaces et accessibles.</p>
                <p className="text-foreground/70 leading-relaxed">En croisant ethnobotanique, phytochimie et pharmacologie moderne, nous créons un pont entre la médecine traditionnelle et la science pharmaceutique contemporaine.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, titre: "Vision", desc: "Devenir le leader africain de la phytopharmacie" },
                  { icon: Leaf, titre: "Nature", desc: "Respecter et valoriser la biodiversité locale" },
                  { icon: FlaskConical, titre: "Science", desc: "Rigueur scientifique et innovation continue" },
                  { icon: Users, titre: "Impact", desc: "Améliorer la santé des populations africaines" },
                ].map(({ icon: Icon, titre, desc }) => (
                  <div key={titre} className="card p-5">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3"><Icon size={20} className="text-primary" /></div>
                    <h3 className="font-serif font-bold text-foreground mb-1">{titre}</h3>
                    <p className="text-sm text-foreground/65">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}