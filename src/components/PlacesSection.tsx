import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Compass,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  X,
  Share2,
  Calendar,
  Mountain,
  Scroll,
  Columns,
  Layers,
  Feather,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { HIMACHAL_PLACES } from '../data/himachalPlaces';
import { HimachalPlace, ScriptMode } from '../types';
import { speakPhonetic } from '../utils/audioAmbience';

interface PlacesSectionProps {
  scriptMode: ScriptMode;
  onOpenStudioWithText?: (text: string) => void;
}

export const PlacesSection: React.FC<PlacesSectionProps> = ({
  scriptMode,
  onOpenStudioWithText,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<HimachalPlace | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'places' | 'peaks' | 'lakes'>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [modalTab, setModalTab] = useState<'history' | 'folklore' | 'travel'>('history');

  const valleys = [
    { id: 'all', label: 'All Valleys (समस्त हिमाचल)' },
    { id: 'Chamba', label: 'Chamba / Ravi Valley' },
    { id: 'Kangra', label: 'Kangra Valley' },
    { id: 'Spiti', label: 'Lahaul & Spiti' },
    { id: 'Kinnaur', label: 'Kinnaur & Sangla' },
    { id: 'Kullu', label: 'Kullu / Parvati' },
    { id: 'Shimla', label: 'Shimla & Sirmaur' },
    { id: 'Mandi', label: 'Mandi / Uhl' },
  ];

  const filteredPlaces = HIMACHAL_PLACES.filter((p) => {
    // Category match
    if (activeCategory === 'places' && p.category === 'peak') return false;
    if (activeCategory === 'peaks' && p.category !== 'peak') return false;
    if (activeCategory === 'lakes' && p.category !== 'lake' && p.category !== 'pass') return false;

    // Valley/District match
    if (activeFilter !== 'all') {
      const matchRegion = p.region.toLowerCase().includes(activeFilter.toLowerCase());
      const matchValley = p.valley.toLowerCase().includes(activeFilter.toLowerCase());
      if (!matchRegion && !matchValley) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.nameEnglish.toLowerCase().includes(q) || p.nameHindi.toLowerCase().includes(q);
      const matchRegion = p.region.toLowerCase().includes(q) || p.valley.toLowerCase().includes(q);
      const matchDesc = p.shortDescriptionEnglish.toLowerCase().includes(q) || p.shortDescriptionHindi.toLowerCase().includes(q);
      if (!matchName && !matchRegion && !matchDesc) return false;
    }

    return true;
  });

  const handleShare = (place: HimachalPlace) => {
    const text = `${place.nameEnglish} (${place.nameHindi}) - ${place.region}, Himachal Pradesh • ${place.shortDescriptionEnglish}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <section id="himachal-places-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-season-badge-bg border border-season-badge-border text-season-badge-text text-xs uppercase tracking-widest font-semibold shadow-xs">
          <span className="w-1.5 h-1.5 bg-season-accent rounded-full"></span>
          <span>DEVBHUMI ARCHIVES • 50 HERITAGE SITES & PEAKS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-season-heading tracking-tight font-bold">
          {scriptMode === 'bilingual' ? (
            <span>हिमाचल दर्शन (५० ऐतिहासिक स्थल एवं सर्वोच्च शिखर)</span>
          ) : (
            <span>Explore Himachal Destinations & Himalayan Heritage</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          {scriptMode === 'bilingual' ? (
            <span>
              प्राचीन पहाड़ी रियासतों, काष्ठ-कुणी मंदिरों, पवित्र तीर्थों और पर्वत शिखरों का विस्तृत ऐतिहासिक एवं सांस्कृतिक वृत्तांत।
            </span>
          ) : (
            <span>
              Explore encyclopedic histories, Kath-Kuni architectural marvels, sacred shrines, folklore, and traveler routes of 50 iconic Himachali destinations.
            </span>
          )}
        </p>
      </div>

      {/* Main Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          id="cat-filter-all"
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-season-accent text-white shadow-md font-bold'
              : 'bg-white text-[#5c4a3b] hover:bg-[#f5ece2] border border-[#e5d8c7]'
          }`}
        >
          All 50 Destinations (समस्त स्थल)
        </button>
        <button
          id="cat-filter-places"
          onClick={() => setActiveCategory('places')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
            activeCategory === 'places'
              ? 'bg-season-accent text-white shadow-md font-bold'
              : 'bg-white text-[#5c4a3b] hover:bg-[#f5ece2] border border-[#e5d8c7]'
          }`}
        >
          30 Heritage Sites & Temples (धरोहर स्थल)
        </button>
        <button
          id="cat-filter-peaks"
          onClick={() => setActiveCategory('peaks')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'peaks'
              ? 'bg-season-accent text-white shadow-md font-bold'
              : 'bg-white text-[#5c4a3b] hover:bg-[#f5ece2] border border-[#e5d8c7]'
          }`}
        >
          <Mountain className="w-3.5 h-3.5" />
          20 Highest Mountain Peaks (पर्वत शिखर)
        </button>
        <button
          id="cat-filter-lakes"
          onClick={() => setActiveCategory('lakes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
            activeCategory === 'lakes'
              ? 'bg-season-accent text-white shadow-md font-bold'
              : 'bg-white text-[#5c4a3b] hover:bg-[#f5ece2] border border-[#e5d8c7]'
          }`}
        >
          Sacred Lakes & Alpine Passes (झीलें व दर्रे)
        </button>
      </div>

      {/* Valley Filter Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {valleys.map((v) => {
          return (
            <button
              key={v.id}
              id={`filter-place-${v.id}`}
              onClick={() => setActiveFilter(v.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === v.id
                  ? 'bg-season-accent text-white font-bold shadow-sm'
                  : 'bg-white text-[#5c4a3b] hover:text-[#2c1d11] hover:bg-[#f5ece2] border border-[#e5d8c7]'
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Quick Search and Results Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fbf9f5] border border-[#e5d8c7] rounded-2xl px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2.5 w-full sm:w-88">
          <Compass className="w-4 h-4 text-season-accent" />
          <input
            type="text"
            id="places-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search place, peak, temple, or valley (खोजें)..."
            className="w-full bg-transparent text-sm text-[#2c1d11] placeholder-[#8a7b6e] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8a7b6e] hover:text-[#2c1d11] text-xs px-1.5 py-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-[#6e5d4e] flex items-center gap-2">
          <span>
            Showing <strong>{filteredPlaces.length}</strong> of <strong>{HIMACHAL_PLACES.length}</strong> destinations & peaks
          </span>
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            id={`place-card-${place.id}`}
            className="group rounded-2xl overflow-hidden bg-white border border-[#e2d5c3] hover:border-season-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Banner */}
            <div className="relative h-56 overflow-hidden bg-[#f4ebe1]">
              <img
                src={place.imageUrl}
                alt={place.nameEnglish}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1d11]/85 via-[#2c1d11]/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] uppercase tracking-wider font-semibold text-season-accent shadow-sm border border-[#e2d5c3]">
                  {place.region}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] uppercase tracking-wider font-semibold text-[#4a392b] shadow-sm border border-[#e2d5c3] flex items-center gap-1">
                  <Mountain className="w-3 h-3 text-season-accent" />
                  {place.altitude}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#e2d5c3] text-xs text-season-accent shadow-sm">
                <Star className="w-3.5 h-3.5 fill-[#d97706] text-[#d97706]" />
                <span className="font-bold text-[#2c1d11] text-xs">{place.rating}</span>
              </div>

              {/* Title overlay on bottom of image in English & Hindi */}
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-xl sm:text-2xl font-serif text-white font-bold tracking-tight drop-shadow-md">
                  {place.nameEnglish}
                </div>
                <div className="text-sm font-serif text-[#f4d19b] font-medium drop-shadow-xs">
                  {place.nameHindi}
                </div>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between bg-white">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#2c1d11] group-hover:text-season-accent transition-colors">
                      {place.nameEnglish}
                    </h3>
                    <div className="text-xs text-season-accent font-serif font-semibold">
                      {place.nameHindi} • {place.valley}
                    </div>
                  </div>
                  <button
                    onClick={() => speakPhonetic(place.nameHindi)}
                    className="p-1.5 rounded-lg text-[#8a7b6e] hover:text-season-accent hover:bg-[#f5ece2] cursor-pointer"
                    title="Pronounce Hindi name"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Architecture badge if available */}
                {place.architectureStyle && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#fbf2e9] text-season-accent text-[11px] font-medium border border-[#ebd8c5]">
                    <Layers className="w-3 h-3 text-season-accent" />
                    <span className="line-clamp-1">{place.architectureStyle}</span>
                  </div>
                )}

                {/* Description */}
                <div className="text-xs text-[#5c4a3b] leading-relaxed pt-1 space-y-1.5">
                  <p className="text-[#5c4a3b] leading-relaxed line-clamp-3">
                    {place.shortDescriptionEnglish}
                  </p>
                  <p className="text-[#7a695a] font-serif line-clamp-2 italic">
                    {place.shortDescriptionHindi}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#f0e6da] flex items-center justify-between gap-2">
                <div className="text-[11px] text-[#7a695a] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-season-accent" />
                  <span>{place.valley}</span>
                </div>

                <button
                  id={`read-story-${place.id}`}
                  onClick={() => {
                    setSelectedPlace(place);
                    setModalTab('history');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-season-accent hover:opacity-90 text-white text-xs font-bold uppercase tracking-tight shadow-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Know More • विस्तृत विवरण</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Place Heritage Dossier Modal */}
      {selectedPlace && (
        <div
          id="place-details-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-[#fdfcf9] border-2 border-season-accent shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-[#2c1d11]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c7]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-season-accent rounded-full"></span>
                <span className="text-xs font-serif text-season-accent uppercase tracking-widest font-bold">
                  Himachal Pradesh Cultural Heritage & Traveler Archives
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedPlace)}
                  className="p-2 rounded-xl bg-[#f5ece2] hover:bg-[#ebdccb] text-[#5c4a3b] hover:text-[#2c1d11] transition-colors cursor-pointer"
                  title="Copy share info"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="p-2 rounded-xl bg-[#f5ece2] hover:bg-[#ebdccb] text-[#5c4a3b] hover:text-[#2c1d11] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {copiedNotification && (
              <div className="p-2.5 rounded-xl bg-[#e6f4ea] border border-[#a8dab5] text-xs text-[#1e4620] text-center font-medium">
                ✓ Copied destination summary to clipboard!
              </div>
            )}

            {/* Hero Image Banner in Modal */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner bg-[#f0e6da]">
              <img
                src={selectedPlace.imageUrl}
                alt={selectedPlace.nameEnglish}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1d11]/90 via-[#2c1d11]/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="text-2xl sm:text-4xl font-serif text-white font-bold drop-shadow-md">
                  {selectedPlace.nameEnglish}
                </div>
                <div className="text-lg sm:text-xl font-serif text-[#f4d19b] flex flex-wrap items-center gap-3">
                  <span>{selectedPlace.nameHindi}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs text-white backdrop-blur-sm border border-white/20">
                    {selectedPlace.altitude} • {selectedPlace.region} ({selectedPlace.valley})
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Navigation in Modal */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#e5d8c7] pb-2">
              <button
                onClick={() => setModalTab('history')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  modalTab === 'history'
                    ? 'bg-season-accent text-white shadow-sm font-bold'
                    : 'bg-[#f5ece2] text-[#5c4a3b] hover:bg-[#ebdccb]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                History & Architecture (इतिहास व स्थापत्य)
              </button>
              <button
                onClick={() => setModalTab('folklore')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  modalTab === 'folklore'
                    ? 'bg-season-accent text-white shadow-sm font-bold'
                    : 'bg-[#f5ece2] text-[#5c4a3b] hover:bg-[#ebdccb]'
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                Folklore & Deities (लोकगाथा व देव परंपरा)
              </button>
              <button
                onClick={() => setModalTab('travel')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  modalTab === 'travel'
                    ? 'bg-season-accent text-white shadow-sm font-bold'
                    : 'bg-[#f5ece2] text-[#5c4a3b] hover:bg-[#ebdccb]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Traveler Guide & Routes (यात्रा मार्गदर्शक)
              </button>
            </div>

            {/* TAB CONTENT 1: History & Architecture */}
            {modalTab === 'history' && (
              <div className="space-y-5 text-left">
                {/* Full English Narrative */}
                <div className="p-5 rounded-2xl bg-white border border-[#e5d8c7] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-season-accent">
                      Historical & Encyclopedic Overview
                    </span>
                    <button
                      onClick={() => speakPhonetic(selectedPlace.nameEnglish)}
                      className="p-1 rounded bg-[#f5ece2] hover:bg-[#ebdccb] text-season-accent cursor-pointer"
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-[#423223] leading-relaxed">
                    {selectedPlace.fullStoryEnglish}
                  </p>
                </div>

                {/* Hindi Chronicle */}
                <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#ebd8c5] space-y-2">
                  <div className="flex items-center justify-between text-xs text-season-accent font-serif font-bold">
                    <span>हिंदी विस्तृत ऐतिहासिक विवरण (Hindi Chronicle)</span>
                    <button
                      onClick={() => speakPhonetic(selectedPlace.fullStoryHindi)}
                      className="p-1 rounded bg-[#ebdccb] hover:bg-[#d9c7b2] text-season-accent cursor-pointer"
                      title="Listen in Hindi"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-serif text-[#3e2e20] leading-relaxed">
                    {selectedPlace.fullStoryHindi}
                  </p>
                </div>

                {/* Architecture details */}
                {(selectedPlace.architectureStyle || selectedPlace.architectureDetails) && (
                  <div className="p-5 rounded-2xl bg-white border border-[#ebd8c5] space-y-3">
                    <div className="flex items-center gap-2 text-season-accent">
                      <Layers className="w-4 h-4 text-season-accent" />
                      <h4 className="font-serif font-bold text-sm text-[#2c1d11]">
                        Architectural Heritage & Construction: {selectedPlace.architectureStyle || 'Classical Western Himalayan Style'}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#423223] leading-relaxed">
                      {selectedPlace.architectureDetails ||
                        'Crafted with seasoned deodar cedar wood beams, interlocking mortise-and-tenon joints, and native slate shingles built to endure seismic shifts and heavy mountain snow loads.'}
                    </p>
                  </div>
                )}

                {/* Historical Sources */}
                {selectedPlace.historicalSources && selectedPlace.historicalSources.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white border border-[#e5d8c7] space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a695a] block">
                      Historical Archives & References:
                    </span>
                    <ul className="text-xs text-[#5c4a3b] list-disc list-inside space-y-0.5">
                      {selectedPlace.historicalSources.map((src, i) => (
                        <li key={i}>{src}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: Folklore & Local Dialects */}
            {modalTab === 'folklore' && (
              <div className="space-y-5 text-left">
                {selectedPlace.folkloreLore && (
                  <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#ebd8c5] space-y-2">
                    <div className="flex items-center gap-2 text-season-accent font-serif font-bold text-sm">
                      <Feather className="w-4 h-4" />
                      <span>Legends & Village Deity Traditions</span>
                    </div>
                    <p className="text-sm text-[#3e2e20] leading-relaxed italic">
                      &quot;{selectedPlace.folkloreLore}&quot;
                    </p>
                  </div>
                )}

                {selectedPlace.localDialect && (
                  <div className="p-5 rounded-2xl bg-white border border-[#e5d8c7] shadow-sm space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-season-accent">
                      Linguistic & Dialect Heritage
                    </div>
                    <p className="text-sm text-[#423223] leading-relaxed">
                      {selectedPlace.localDialect}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: Traveler Guide */}
            {modalTab === 'travel' && (
              <div className="space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#e5d8c7] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#7a695a] tracking-wider block">Best Season</span>
                    <p className="text-sm font-semibold text-[#2c1d11]">{selectedPlace.bestSeason}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#e5d8c7] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#7a695a] tracking-wider block">Elevation / Altitude</span>
                    <p className="text-sm font-semibold text-[#2c1d11]">{selectedPlace.altitude}</p>
                  </div>
                </div>

                {selectedPlace.nearestAccess && (
                  <div className="p-4 rounded-xl bg-[#faf6f0] border border-[#ebd8c5] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-season-accent tracking-wider block">Nearest Route & Access</span>
                    <p className="text-xs text-[#423223] leading-relaxed">{selectedPlace.nearestAccess}</p>
                  </div>
                )}

                {/* Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-season-accent block">
                    Must-Experience Cultural Highlights:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-season-badge-bg text-xs font-semibold text-season-badge-text border border-season-badge-border"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#e5d8c7] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#7a695a]">
                <Calendar className="w-4 h-4 text-season-accent" />
                <span>Best season to visit: <strong className="text-[#2c1d11]">{selectedPlace.bestSeason}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="px-6 py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-tight shadow-md transition-all cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

