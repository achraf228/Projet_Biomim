import { useState, useEffect, useRef } from 'react'
import { Helmet } from "react-helmet-async";
import { plantsApi } from '../../../services/api';
import { MapPin, Leaf, AlertTriangle, Filter, Info, Search } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ResearchBg from "../../../assets/images/research-bg.jpg";

// Configuration des marqueurs Leaflet (correction des icônes par défaut)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const STATUS_COLORS_MAP = {
  common: '#22c55e',
  rare: '#84cc16',
  vulnerable: '#eab308',
  endangered: '#f97316',
  critical: '#ef4444',
}

const STATUS_LABELS = {
  common: 'Commune',
  rare: 'Rare',
  vulnerable: 'Vulnérable',
  endangered: 'En danger',
  critical: 'Critique',
}

export default function MapPage() {
  const [mapData, setMapData] = useState([])
  const [endangered, setEndangered] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('map')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  // Charger les données
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [mapResponse, endangeredResponse] = await Promise.all([
          plantsApi.map(),
          plantsApi.endangered()
        ])
        setMapData(mapResponse.data.points || [])
        setEndangered(endangeredResponse.data.plants || [])
        console.log(' Données reçues:', {
          points: mapResponse.data.points?.length || 0,
          endangered: endangeredResponse.data.plants?.length || 0
        })
      } catch (error) {
        console.error('Erreur chargement données:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Initialiser la carte
  useEffect(() => {
    if (tab !== 'map' || loading || !mapData.length || mapInstanceRef.current) return

    console.log(' Initialisation de la carte avec', mapData.length, 'points')
    
    // Détruire l'ancienne carte si elle existe
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Attendre que le DOM soit prêt
    setTimeout(() => {
      const mapContainer = document.getElementById('biomim-map')
      if (!mapContainer) {
        console.error(' Conteneur de carte non trouvé')
        return
      }

      // Créer la carte
      const map = L.map('biomim-map').setView([7.5, 4.0], 4)
      
      // Ajouter les tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      // Ajouter les marqueurs
      markersRef.current = mapData.map(point => {
        const color = STATUS_COLORS_MAP[point.conservation_status] || '#22c55e'
        
        // Créer un marqueur personnalisé
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 8,
          fillColor: color,
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        })

        // Popup avec les informations
        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 200px; padding: 8px;">
            <strong style="color: #1e293b; font-size: 16px; display: block; margin-bottom: 4px;">
              ${point.plant_name}
            </strong>
            <em style="color: #475569; font-size: 13px; display: block; margin-bottom: 6px;">
              ${point.scientific_name}
            </em>
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
              <span style="color: #334155; font-size: 12px;">
                ${STATUS_LABELS[point.conservation_status] || 'Commun'}
              </span>
            </div>
            <div style="color: #64748b; font-size: 11px; display: flex; align-items: center; gap: 4px;">
              📍 ${point.region}, ${point.country}
            </div>
          </div>
        `)

        marker.addTo(map)
        return marker
      })

      // Ajuster la vue pour voir tous les marqueurs
      if (mapData.length > 0) {
        const bounds = L.latLngBounds(mapData.map(p => [p.lat, p.lng]))
        map.fitBounds(bounds, { padding: [50, 50] })
      }

      mapInstanceRef.current = map
      console.log(' Carte initialisée avec', mapData.length, 'marqueurs')
    }, 300)

    // Nettoyage
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [tab, loading, mapData])

  // Filtrer les espèces menacées
  const filteredEndangered = endangered.filter(plant => {
    const matchesStatus = filterStatus === 'all' || plant.conservation_status === filterStatus
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <>
      <Helmet><title>Cartographie – BioMim</title></Helmet>
      <div className="pt-16">
        {/* Hero Section avec image de fond - Style identique à CatalogueProduits */}
        <div className="relative section-padding text-primary-foreground overflow-hidden">
          <img 
            src={ResearchBg} 
            alt="Fond de cartographie" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/85" />
          
          <div className="relative container-max">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <MapPin size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-bold mb-2">
                  Carte de la biodiversité africaine
                </h1>
                <p className="text-primary-foreground/75 max-w-xl">
                  {mapData.length} points géographiques • {endangered.length} espèces menacées
                </p>
              </div>
            </div>

            {/* Barre de recherche style hero */}
            <div className="relative max-w-md mt-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une espèce menacée..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Section principale - Style identique à CatalogueProduits */}
        <div className="section-padding bg-background">
          <div className="container-max">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('map')}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                  ${tab === 'map' 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-500 hover:text-emerald-600'
                  }
                `}
              >
                <MapPin size={18} />
                Carte interactive
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${tab === 'map' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  {mapData.length}
                </span>
              </button>
              
              <button
                onClick={() => setTab('endangered')}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                  ${tab === 'endangered' 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-red-500 hover:text-red-600'
                  }
                `}
              >
                <AlertTriangle size={18} />
                Espèces menacées
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${tab === 'endangered' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  {endangered.length}
                </span>
              </button>
            </div>

            {tab === 'map' && (
              <div className="space-y-4">
                {/* Légende */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium text-gray-600">Légende :</span>
                    {Object.entries(STATUS_COLORS_MAP).map(([status, color]) => (
                      <div key={status} className="flex items-center gap-2">
                        <div 
                          className="w-3.5 h-3.5 rounded-full shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-gray-600">
                          {STATUS_LABELS[status]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carte */}
                <div className="relative bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden h-[600px] shadow-lg">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
                      <div className="text-center">
                        <Leaf size={48} className="text-emerald-600 mx-auto mb-4 animate-spin" />
                        <p className="text-gray-900 font-medium">Chargement de la carte...</p>
                        <p className="text-gray-500 text-sm mt-2">
                          {mapData.length} points à afficher
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div id="biomim-map" className="w-full h-full" />
                  
                  {!loading && mapData.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="text-center max-w-xs">
                        <MapPin size={64} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium text-lg">
                          Aucune donnée géographique
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Ajoutez des coordonnées (latitude/longitude) aux régions dans l'interface d'administration
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistiques */}
                <div className="flex justify-between items-center text-sm text-gray-500 bg-white rounded-xl border border-gray-200 px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {mapData.length} points géographiques
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Données : OpenStreetMap, BioMim
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Mise à jour: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {tab === 'endangered' && (
              <div>
                {/* Alert banner */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-red-800 mb-1">
                      {endangered.length} espèces médicinales africaines menacées identifiées
                    </h3>
                    <p className="text-sm text-orange-700">
                      La déforestation et la surexploitation sont les principales causes. 
                      BioMim surveille ces espèces et alerte sur leur disparition.
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all
                      ${showFilters 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'
                      }
                    `}
                  >
                    <Filter size={16} />
                    Filtrer par statut
                  </button>

                  {showFilters && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <button
                        onClick={() => setFilterStatus('all')}
                        className={`
                          px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                          ${filterStatus === 'all'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'
                          }
                        `}
                      >
                        Tous
                      </button>
                      {['vulnerable', 'endangered', 'critical'].map(status => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${filterStatus === status
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'
                            }
                          `}
                        >
                          {STATUS_LABELS[status]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Endangered plants grid */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                        <div className="h-16 bg-gray-200 rounded mb-3" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : filteredEndangered.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                    <Info size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">
                      Aucune espèce menacée avec ce filtre
                    </p>
                    <button
                      onClick={() => {
                        setFilterStatus('all')
                        setSearchTerm('')
                      }}
                      className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      Voir toutes les espèces
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEndangered.map(plant => {
                      const statusColors = {
                        vulnerable: {
                          border: 'border-yellow-200',
                          bg: 'bg-yellow-50',
                          badge: 'bg-yellow-100 text-yellow-800',
                        },
                        endangered: {
                          border: 'border-orange-200',
                          bg: 'bg-orange-50',
                          badge: 'bg-orange-100 text-orange-800',
                        },
                        critical: {
                          border: 'border-red-200',
                          bg: 'bg-red-50',
                          badge: 'bg-red-100 text-red-800',
                        },
                      }
                      const colors = statusColors[plant.conservation_status] || statusColors.vulnerable

                      return (
                        <a
                          key={plant.id}
                          href={`/plantes/${plant.slug}`}
                          className={`
                            block p-5 rounded-xl border-2 transition-all
                            ${colors.border} ${colors.bg}
                            hover:scale-[1.02] hover:shadow-lg
                          `}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-serif font-semibold text-gray-900 text-lg">
                              {plant.name}
                            </h3>
                            <span className={`
                              text-xs px-2 py-1 rounded-full font-medium
                              ${colors.badge}
                            `}>
                              {plant.conservation_status_display}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-500 italic mb-2">
                            {plant.scientific_name}
                          </p>
                          
                          <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                            {plant.description}
                          </p>
                          
                          {plant.regions?.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-emerald-600">
                              <MapPin size={12} />
                              <span>{plant.regions.map(r => r.name).join(', ')}</span>
                            </div>
                          )}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}