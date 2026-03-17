import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ChampSaisie from "../../components/interface/ChampSaisie";
import Bouton from "../../components/interface/Bouton";
import toast from "react-hot-toast";
import ResearchBg from "../../assets/images/research-bg.jpg";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); toast.success("Message envoyé !"); setForm({ nom: "", email: "", sujet: "", message: "" }); };
  return (
    <>
      <Helmet><title>Contact – BioMim</title></Helmet>
      <div className="pt-16">
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img src={ResearchBg} alt="Fond contact" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative container-max">
            <h1 className="text-4xl font-serif font-bold mb-4">Contactez-nous</h1>
            <p className="text-primary-foreground/75">Nous sommes à votre écoute pour toute question scientifique, commerciale ou partenariale.</p>
          </div>
        </div>
        <div className="section-padding bg-background">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Informations de contact</h2>
                <div className="space-y-4 mb-8">
                  {[[MapPin, "Adresse", "Lomé, Adidogomé"], [Phone, "Téléphone", "+228 92 26 42 96"], [Mail, "Email", "saeicube.dev@gmail.com"]].map(([Icon, label, val]) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><Icon size={18} className="text-primary" /></div>
                      <div><p className="text-sm text-muted-foreground">{label}</p><p className="font-medium text-foreground">{val}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="card p-8 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <ChampSaisie label="Nom" value={form.nom} onChange={maj("nom")} required />
                  <ChampSaisie label="Email" type="email" value={form.email} onChange={maj("email")} required />
                </div>
                <ChampSaisie label="Sujet" value={form.sujet} onChange={maj("sujet")} />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Message</label>
                  <textarea value={form.message} onChange={maj("message")} rows={5} required className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <Bouton type="submit" className="w-full justify-center"><Send size={16} /> Envoyer</Bouton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}