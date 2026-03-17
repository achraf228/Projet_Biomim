import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Trash2, Eye } from "lucide-react";
import Badge from "../../components/interface/Badge";
import FenetreModale from "../../components/interface/FenetreModale";
import toast from "react-hot-toast";

const messagesMock = [
  { id: 1, nom: "Kouassi Ama", email: "ama@email.com", sujet: "Demande d'information", message: "Bonjour, je souhaite en savoir plus sur vos produits antipaludéens.", date: "2025-03-14", lu: false },
  { id: 2, nom: "Mensah Kofi", email: "kofi@email.com", sujet: "Partenariat", message: "Nous souhaitons établir un partenariat de distribution avec BioMim.", date: "2025-03-12", lu: true },
];

export default function GestionMessages() {
  const [messages, setMessages] = useState(messagesMock);
  const [messageSelectionne, setMessageSelectionne] = useState(null);

  const voirMessage = (msg) => {
    setMessages((m) => m.map((me) => me.id === msg.id ? { ...me, lu: true } : me));
    setMessageSelectionne(msg);
  };

  const supprimer = (id) => { setMessages((m) => m.filter((me) => me.id !== id)); toast.success("Message supprimé"); };

  return (
    <>
      <Helmet><title>Messages – Admin BioMim</title></Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">Messages reçus</h1>
        <div className="card overflow-hidden">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${!msg.lu ? "bg-primary/5" : ""}`}>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-foreground text-sm">{msg.nom}</span>
                  {!msg.lu && <Badge variante="primary" className="text-[10px]">Nouveau</Badge>}
                </div>
                <p className="text-sm text-foreground/70 truncate">{msg.sujet}</p>
                <p className="text-xs text-muted-foreground">{msg.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => voirMessage(msg)} className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-primary transition-colors"><Eye size={15} /></button>
                <button onClick={() => supprimer(msg.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-foreground/60 hover:text-destructive transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FenetreModale ouvert={!!messageSelectionne} onFermer={() => setMessageSelectionne(null)} titre={messageSelectionne?.sujet}>
        {messageSelectionne && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>De : <strong className="text-foreground">{messageSelectionne.nom}</strong> ({messageSelectionne.email})</span>
            </div>
            <p className="text-foreground/80 leading-relaxed">{messageSelectionne.message}</p>
          </div>
        )}
      </FenetreModale>
    </>
  );
}