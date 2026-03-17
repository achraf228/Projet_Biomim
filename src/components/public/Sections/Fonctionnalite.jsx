import {
  Brain, Database, MapIcon, Shield, ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Fonctionnalite() {
  const FEATURES = [
    {
      icon: <Database size={28} />,
      title: 'Base de données',
      desc: '500+ plantes médicinales africaines documentées avec leurs propriétés botaniques, chimiques et thérapeutiques.',
      to: '/plantes',
      accent: 'emerald',
      gradient: 'from-emerald-500/10 to-emerald-500/5',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderHover: 'hover:border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: <Brain size={28} />,
      title: 'Assistant IA',
      desc: 'Chatbot scientifique  entraîné sur des données ethnobotaniques africaines pour des réponses précises.',
      to: '/chat',
      accent: 'amber',
      gradient: 'from-amber-500/10 to-amber-500/5',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderHover: 'hover:border-amber-200',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      icon: <MapIcon size={28} />,
      title: 'Carte interactive',
      desc: 'Visualisez la répartition géographique des espèces à travers les régions africaines.',
      to: '/map',
      accent: 'emerald',
      gradient: 'from-emerald-500/10 to-emerald-500/5',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderHover: 'hover:border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: <Shield size={28} />,
      title: 'Conservation',
      desc: 'Suivi des espèces menacées et système d\'alertes pour la protection de la biodiversité africaine.',
      to: '/map',
      accent: 'rose',
      gradient: 'from-rose-500/10 to-rose-500/5',
      bgLight: 'bg-rose-50',
      textColor: 'text-rose-700',
      borderHover: 'hover:border-rose-200',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-4 py-2 rounded-full mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Une plateforme complète
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Tous les outils pour explorer, analyser et préserver la richesse médicinale africaine.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <Link
              key={index}
              to={feature.to}
              className="group relative"
            >
              <div className={`
                relative h-full p-8 rounded-3xl bg-white 
                border-2 border-gray-100 
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-xl
                ${feature.borderHover}
                before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:${feature.gradient} 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                overflow-hidden
              `}>
                {/* Decorative corner accent */}
                <div className={`
                  absolute top-0 right-0 w-24 h-24 
                  bg-gradient-to-br ${feature.gradient} 
                  rounded-bl-[100px] -mr-8 -mt-8
                  transition-transform duration-300 group-hover:scale-110
                `} />

                {/* Icon */}
                <div className={`
                  relative z-10 w-16 h-16 rounded-2xl 
                  ${feature.iconBg} ${feature.iconColor}
                  flex items-center justify-center mb-6
                  transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                  shadow-sm
                `}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {feature.desc}
                  </p>

                  {/* Link */}
                  <div className={`
                    inline-flex items-center gap-2 text-sm font-semibold
                    ${feature.textColor} 
                    transition-all duration-300
                    group-hover:gap-3
                  `}>
                    <span>Découvrir</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r ${feature.gradient}
                  transform scale-x-0 group-hover:scale-x-100 
                  transition-transform duration-300 origin-left
                `} />
              </div>
            </Link>
          ))}
        </div>

       
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-emerald-100">
          {[
            { value: '500+', label: 'Plantes documentées' },
            { value: '15+', label: 'Pays couverts' },
            { value: '10k+', label: 'Utilisateurs actifs' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}