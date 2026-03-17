import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { plantsApi } from '../../../services/api';
import { useAuth } from '../../../services/useAuth';
import { Leaf, Send, User, Brain, Sparkles, Search } from 'lucide-react';
import ResearchBg from "../../../assets/images/research-bg.jpg";

const SUGGESTIONS = [
  'Quelles sont les propriétés thérapeutiques du Moringa ?',
  'Quelles plantes africaines traitent le paludisme ?',
  'Comment utiliser le Neem en médecine traditionnelle ?',
  'Quels composés actifs trouve-t-on dans l\'Artemisia annua ?',
  'Quelles plantes sont menacées d\'extinction en Afrique ?',
  'Y a-t-il des plantes pour le diabète en Afrique de l\'Ouest ?',
];

export default function ChatBotPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Bonjour ! Je suis **BioMim Assistant**, votre guide expert en plantes médicinales africaines 🌿

Je peux vous aider à :
- Identifier les propriétés thérapeutiques des plantes africaines
- Expliquer les composés actifs et leurs mécanismes d'action
- Retrouver les usages traditionnels documentés
- Répondre à vos questions de pharmacognosie africaine

${user ? 'Posez votre question !' : '⚠️ Vous avez droit à 5 questions sans compte. Créez un compte gratuit pour continuer.'}`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const message = text || input.trim();
    if (!message || loading) return;

    setInput('');
    setError(null);

    const userMsg = { role: 'user', content: message, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await plantsApi.chat({ message });
      const { response, referenced_plants } = res.data;

      let fullContent = response;
      if (referenced_plants?.length > 0) {
        fullContent += `\n\n**Plantes citées :** ${referenced_plants.map(p => p.name).join(', ')}`;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fullContent,
        plants: referenced_plants,
        timestamp: new Date(),
      }]);
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.requires_auth) {
        setError(errData.message);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '🔒 Vous avez atteint la limite gratuite. Créez un compte pour continuer à utiliser l\'assistant BioMim.',
          isLimit: true,
          timestamp: new Date(),
        }]);
      } else {
        setError('Erreur lors de la communication avec l\'assistant.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      <Helmet><title>Assistant IA – BioMim</title></Helmet>
      <div className="pt-16">
        {/* Hero Section avec image de fond - Style identique à CatalogueProduits */}
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img 
            src={ResearchBg} 
            alt="Fond de l'assistant IA" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/85" />
          
          <div className="relative container-max">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Brain size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-bold mb-2">BioMim Assistant</h1>
                <p className="text-primary-foreground/75 max-w-xl">
                  Assistant IA spécialisé dans les plantes médicinales africaines
                </p>
              </div>
            </div>

            {/* Barre de recherche style hero */}
            <div className="relative max-w-md mt-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Posez votre question sur les plantes médicinales..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Badge utilisateur */}
            {!user && (
              <div className="mt-4 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm text-primary-foreground/75">
                  ⚠️ 5 questions gratuites
                </span>
                <Link 
                  to="/register" 
                  className="text-sm font-medium text-white bg-accent px-4 py-1.5 rounded-full hover:bg-accent/90 transition-colors"
                >
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Section principale - Style identique à CatalogueProduits */}
        <div className="section-padding bg-background">
          <div className="container-max">
            {/* Zone des messages */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
              <div className="h-[500px] overflow-y-auto p-6 flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${msg.role === 'user' 
                        ? 'bg-gradient-to-br from-emerald-700 to-emerald-600 text-white shadow-sm' 
                        : msg.isLimit
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : 'bg-white text-emerald-600 border border-gray-200 shadow-sm'
                      }
                    `}>
                      {msg.role === 'user' 
                        ? <User size={16} />
                        : msg.isLimit 
                          ? <Sparkles size={16} />
                          : <Leaf size={16} />
                      }
                    </div>

                    {/* Bulle de message */}
                    <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`
                        rounded-2xl p-4 shadow-sm
                        ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-emerald-700 to-emerald-600 text-white rounded-tr-sm'
                          : msg.isLimit
                            ? 'bg-red-50 border border-red-200 text-red-700 rounded-tl-sm'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm hover:shadow-md transition-shadow'
                        }
                      `}>
                        <div 
                          dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                          className="text-sm leading-relaxed space-y-2"
                        />

                        {/* Plantes référencées */}
                        {msg.plants?.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-gray-200/50 flex flex-wrap gap-2">
                            {msg.plants.map(p => (
                              <Link
                                key={p.id}
                                to={`/plants/${p.slug}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-all hover:scale-105"
                              >
                                <Leaf size={12} className="text-emerald-600" />
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Message de limite */}
                        {msg.isLimit && (
                          <div className="mt-4 flex gap-2 flex-wrap">
                            <Link 
                              to="/register" 
                              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                            >
                              Créer un compte gratuit
                            </Link>
                            <Link 
                              to="/pricing" 
                              className="inline-flex items-center px-4 py-2 bg-white border-2 border-emerald-600 text-emerald-700 text-sm font-medium rounded-xl hover:bg-emerald-50 transition-colors"
                            >
                              Voir Premium
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className="text-xs text-gray-400 px-2">
                        {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Indicateur de frappe */}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Sparkles size={16} />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                      <div className="flex gap-2 items-center">
                        {[0, 1, 2].map(i => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Suggestions de questions :
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-gray-900 transition-all hover:shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              BioMim IA est en phase de développement. Les informations fournies ne remplacent pas un avis médical.
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}