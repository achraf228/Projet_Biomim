import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { plantsApi } from '../../../services/api';
import { useAuth } from '../../../services/useAuth';
import {
  Leaf, Lock, ArrowLeft, CheckCircle, MapPin, FlaskConical,
  BookOpen, AlertTriangle, Shield, Eye, Star, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet-async";

const PLANT_IMAGES = [
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  'https://images.unsplash.com/photo-1567360425618-1594206637d2?w=800&q=80',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
]

const STATUS_COLORS = {
  common: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rare: 'bg-blue-100 text-blue-800 border-blue-200',
  vulnerable: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  endangered: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
}

export default function PlantDetailPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comment, setComment] = useState('')
  const [commenting, setCommenting] = useState(false)

  useEffect(() => {
    setLoading(true)
    plantsApi.detail(slug)
      .then(res => setPlant(res.data.plant))
      .catch(() => setError('Plante introuvable'))
      .finally(() => setLoading(false))
  }, [slug])

  const handleComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setCommenting(true)
    try {
      await plantsApi.addComment(plant.id, { content: comment })
      toast.success('Commentaire soumis, en attente de modération')
      setComment('')
    } catch {
      toast.error('Erreur lors de l\'envoi du commentaire')
    }
    setCommenting(false)
  }

  if (loading) {
    return (
      <>
        <Helmet><title>Chargement... - BioMim</title></Helmet>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-[68px] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded-lg mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-5 w-1/2 bg-gray-200 rounded-lg" />
              <div className="h-24 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error || !plant) {
    return (
      <>
        <Helmet><title>Plante introuvable - BioMim</title></Helmet>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center pt-[68px]">
          <Leaf size={64} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Plante introuvable</h2>
          <p className="text-gray-600 mb-6">La plante que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link to="/plants" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <ArrowLeft size={18} />
            Retour à la liste
          </Link>
        </div>
      </>
    )
  }

  const image = plant.image || PLANT_IMAGES[plant.id % PLANT_IMAGES.length]

  return (
    <>
      <Helmet>
        <title>{plant.name} - BioMim</title>
        <meta name="description" content={plant.description?.substring(0, 160)} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-[68px]">
        {/* Breadcrumb */}
        <Link 
          to="/plants" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux plantes
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden h-[400px] shadow-xl group">
            <img 
              src={image} 
              alt={plant.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Badges flottants */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${STATUS_COLORS[plant.conservation_status]}`}>
                {plant.conservation_status_display}
              </span>
              
              {plant.is_premium && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                  <Star size={12} /> Premium
                </span>
              )}
            </div>
            
            {plant.is_verified && (
              <div className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow-lg">
                <CheckCircle size={20} className="text-emerald-600" />
              </div>
            )}
          </div>

          {/* Infos principales */}
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">
                {plant.name}
              </h1>
              <p className="text-lg text-gray-500 italic">
                {plant.scientific_name}
              </p>
            </div>

            {/* Noms locaux */}
            {plant.local_names?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {plant.local_names.map((name, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                    {name}
                  </span>
                ))}
              </div>
            )}

            {/* Métadonnées */}
            <div className="flex items-center gap-4 text-sm">
              {plant.family && (
                <div className="flex items-center gap-1.5">
                  <Leaf size={14} className="text-emerald-600" />
                  <span className="text-gray-600">
                    Famille : <span className="font-medium text-gray-900">{plant.family}</span>
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-1.5">
                <Eye size={14} className="text-emerald-600" />
                <span className="text-gray-600">
                  {plant.views_count || 0} vues
                </span>
              </div>
            </div>

            {/* Régions */}
            {plant.regions?.length > 0 && (
              <div className="flex items-start gap-1.5">
                <MapPin size={14} className="text-emerald-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  {plant.regions.map(r => r.name).join(', ')}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {plant.description}
            </p>

            {/* Propriétés thérapeutiques */}
            {plant.therapeutic_properties?.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Propriétés thérapeutiques
                </span>
                <div className="flex flex-wrap gap-2">
                  {plant.therapeutic_properties.map((prop, i) => (
                    <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium Lock */}
        {plant.locked && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 text-center mb-12">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contenu Premium</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Accédez aux données complètes : composés actifs, études pharmacologiques,
              contre-indications et références bibliographiques.
            </p>
            <Link 
              to="/pricing" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Star size={18} />
              Passer au Premium — dès 2 000 FCFA/mois
            </Link>
          </div>
        )}

        {/* Données détaillées */}
        {!plant.locked && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* Composés actifs */}
            {plant.active_compounds?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FlaskConical size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Composés actifs</h3>
                </div>
                <ul className="space-y-2">
                  {plant.active_compounds.map((comp, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usages traditionnels */}
            {plant.traditional_uses && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <BookOpen size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Usages traditionnels</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {plant.traditional_uses}
                </p>
              </div>
            )}

            {/* Activités pharmacologiques */}
            {plant.pharmacological_activities?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Activités pharmacologiques</h3>
                </div>
                <ul className="space-y-2">
                  {plant.pharmacological_activities.map((act, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-emerald-600" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contre-indications */}
            {plant.contraindications && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle size={18} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800">Contre-indications</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {plant.contraindications}
                </p>
              </div>
            )}

            {/* Habitat */}
            {plant.habitat && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <MapPin size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Habitat</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {plant.habitat}
                </p>
              </div>
            )}

            {/* Données chimiques */}
            {plant.chemical_formula && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FlaskConical size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Données chimiques</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">Formule :</span>{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-emerald-700 font-mono">
                      {plant.chemical_formula}
                    </code>
                  </p>
                  {plant.molecular_weight && (
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Masse molaire :</span>{' '}
                      <span className="font-medium">{plant.molecular_weight} g/mol</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Commentaires */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-600" />
            Commentaires scientifiques
          </h3>

          {plant.comments?.length > 0 ? (
            <div className="space-y-4 mb-6">
              {plant.comments.map((c, i) => (
                <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {c.user[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-900">{c.user}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(c.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl mb-6">
              <Sparkles size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucun commentaire pour l'instant.</p>
              <p className="text-sm text-emerald-600 mt-1">
                Soyez le premier à partager vos observations !
              </p>
            </div>
          )}

          {user ? (
            <form onSubmit={handleComment} className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Partagez vos observations scientifiques..."
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 outline-none transition-all focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10"
              />
              <button 
                type="submit" 
                disabled={commenting || !comment.trim()}
                className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {commenting ? '...' : 'Envoyer'}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
                  Connectez-vous
                </Link> pour laisser un commentaire.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}