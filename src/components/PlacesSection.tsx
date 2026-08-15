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
      const matchName = p.nameEnglish.toLowerCase().includes(q) || p.nameHindi.toLowerCase().includes(q) || p.nameTakri.includes(q);
      const matchRegion = p.region.toLowerCase().includes(q) || p.valley.toLowerCase().includes(q);
      const matchDesc = p.shortDescriptionEnglish.toLowerCase().includes(q);
      if (!matchName && !matchRegion && !matchDesc) return false;
    }

    return true;
  });

  const handleShare = (place: HimachalPlace) => {
    const text = `${place.nameTakri} (${place.nameHindi}) - ${place.nameEnglish} • Discover Himachal in Takri Script on HimVani Takri Heritage`;
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full"></span>
          {scriptMode === 'takri-only' ? (
            <span className="font-takri normal-case tracking-normal text-xs text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝 • ५० 𑚞𑚤𑚨𑚮𑚛𑚜 𑚀𑚨𑚚𑚭𑚝 𑚙𑚲 𑚏𑚴𑚔𑚮𑚣𑚭𑚫</span>
          ) : scriptMode === 'bilingual' ? (
            <span>देवभूमि दर्शन • 𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝 (५० प्रमुख स्थल व चोटियाँ)</span>
          ) : (
            <span>DEVBHUMI DARSHAN • 50 HERITAGE SITES & MOUNTAIN PEAKS</span>
          )}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-[#dfbe7b] text-4xl sm:text-5xl">𑚔𑚭𑚊𑚤𑚯 𑚢𑚫𑚑 𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝</span>
          ) : scriptMode === 'bilingual' ? (
            <span>टाकरी में हिमाचल दर्शन (३० प्रमुख स्थल एवं २० सर्वोच्च शिखर)</span>
          ) : (
            <span>Explore Himachal in Takri Script (30 Iconic Places & 20 Majestic Peaks)</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-light italic">
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-lg text-[#dfbe7b] not-italic">
              𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚲 𑚞𑚭𑚪𑚝 𑚀𑚨𑚚𑚭𑚝𑚭𑚫, 𑚢𑚫𑚛𑚮𑚤𑚭𑚫 𑚙𑚲 𑚪𑚭𑚛𑚯𑚣𑚭𑚫 𑚤𑚭 𑚂𑚙𑚮𑚩𑚭𑚨 𑚔𑚭𑚊𑚤𑚯 𑚢𑚫𑚑 𑚞𑚚𑚴।
            </span>
          ) : scriptMode === 'bilingual' ? (
            <span>
              प्राचीन पहाड़ी रियासतों, पवित्र मंदिरों और बर्फ़ीली चोटियों का इतिहास टाकरी शिलालेखों और विवरणों में पढ़ें।
            </span>
          ) : (
            <span>
              Journey through 30 breathtaking destinations and 20 highest mountain summits through the lens of indigenous Takri calligraphy.
            </span>
          )}
        </p>
      </div>

      {/* Main Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          id="cat-filter-all"
          onClick={() => {
            setActiveCategory('all');
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#c5a059] text-[#1a2a2c] shadow-lg shadow-black/40'
              : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          {scriptMode === 'takri-only' ? '𑚨𑚠𑚲 (५०)' : 'All 50 Destinations & Peaks'}
        </button>
        <button
          id="cat-filter-places"
          onClick={() => {
            setActiveCategory('places');
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
            activeCategory === 'places'
              ? 'bg-[#c5a059] text-[#1a2a2c] shadow-lg shadow-black/40'
              : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          {scriptMode === 'takri-only' ? '𑚞𑚤𑚨𑚮𑚛𑚜 𑚀𑚨𑚚𑚭𑚝 (३०)' : '30 Best Places to Visit'}
        </button>
        <button
          id="cat-filter-peaks"
          onClick={() => {
            setActiveCategory('peaks');
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'peaks'
              ? 'bg-[#c5a059] text-[#1a2a2c] shadow-lg shadow-black/40'
              : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          <Mountain className="w-3.5 h-3.5" />
          {scriptMode === 'takri-only' ? '𑚨𑚤𑚦𑚴𑚏𑚏 𑚏𑚴𑚔𑚮𑚣𑚭𑚫 (२०)' : '20 Top Peaks of Himachal'}
        </button>
        <button
          id="cat-filter-lakes"
          onClick={() => {
            setActiveCategory('lakes');
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
            activeCategory === 'lakes'
              ? 'bg-[#c5a059] text-[#1a2a2c] shadow-lg shadow-black/40'
              : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
          }`}
        >
          {scriptMode === 'takri-only' ? '𑚏𑚩𑚥𑚭𑚫 𑚙𑚲 𑚛𑚤𑚤𑚲' : 'Lakes & High Passes'}
        </button>
      </div>

      {/* Valley Filter Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {valleys.map((v) => {
          let label = v.label;
          if (scriptMode === 'takri-only') {
            if (v.id === 'all') label = '𑚨𑚠𑚲 𑚀𑚨𑚚𑚭𑚝';
            else if (v.id === 'Chamba') label = '𑚏𑚢𑚠𑚭';
            else if (v.id === 'Kangra') label = '𑚊𑚭𑚫𑚌𑚚𑚭';
            else if (v.id === 'Spiti') label = '𑚨𑚞𑚮𑚙𑚯';
            else if (v.id === 'Mandi') label = '𑚢𑚉𑚚𑚯';
            else if (v.id === 'Kinnaur') label = '𑚊𑚮𑚝𑚝𑚵𑚤';
            else if (v.id === 'Kullu') label = '𑚊𑚰𑚥𑚥𑚰';
            else if (v.id === 'Shimla') label = '𑚧𑚮𑚢𑚥𑚭';
          } else if (scriptMode === 'bilingual') {
            if (v.id === 'all') label = 'समस्त हिमाचल (𑚨𑚠𑚲)';
            else if (v.id === 'Chamba') label = 'चम्बा (𑚏𑚢𑚠𑚭)';
            else if (v.id === 'Kangra') label = 'कांगड़ा (𑚊𑚭𑚫𑚌𑚚𑚭)';
            else if (v.id === 'Spiti') label = 'स्पीति (𑚨𑚞𑚮𑚙𑚯)';
            else if (v.id === 'Mandi') label = 'मंडी (𑚢𑚉𑚚𑚯)';
            else if (v.id === 'Kinnaur') label = 'किन्नौर (𑚊𑚮𑚝𑚝𑚵𑚤)';
            else if (v.id === 'Kullu') label = 'कुल्लू (𑚊𑚰𑚥𑚥𑚰)';
            else if (v.id === 'Shimla') label = 'शिमला / सराहन';
          }
          return (
            <button
              key={v.id}
              id={`filter-place-${v.id}`}
              onClick={() => {
                setActiveFilter(v.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === v.id
                  ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow-md shadow-black/30'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Quick Search and Results Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5">
        <div className="flex items-center gap-2 w-full sm:w-80">
          <Compass className="w-4 h-4 text-[#c5a059]" />
          <input
            type="text"
            id="places-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={scriptMode === 'takri-only' ? '𑚋𑚴𑚑 𑚊𑚤𑚭 (Search place or peak)...' : 'Search any place, peak, or valley...'}
            className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-white/40 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-white/70 flex items-center gap-2">
          <span>
            {scriptMode === 'takri-only' ? (
              <span className="font-takri text-sm text-[#dfbe7b]">𑚢𑚮𑚥𑚲: {filteredPlaces.length}</span>
            ) : (
              <span>Showing <strong>{filteredPlaces.length}</strong> of <strong>{HIMACHAL_PLACES.length}</strong> destinations & peaks</span>
            )}
          </span>
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            id={`place-card-${place.id}`}
            className="group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1"
          >
            {/* Image Banner */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={place.imageUrl}
                alt={place.nameEnglish}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a2c] via-[#1a2a2c]/30 to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#1a2a2c]/85 backdrop-blur-md text-[10px] uppercase tracking-wider font-medium text-[#c5a059] border border-white/10">
                  {scriptMode === 'takri-only' ? place.nameTakri : place.region}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#1a2a2c]/85 backdrop-blur-md text-[10px] uppercase tracking-wider font-medium text-white/80 border border-white/10 flex items-center gap-1">
                  <Mountain className="w-3 h-3 text-[#c5a059]" />
                  {place.altitude}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1a2a2c]/85 backdrop-blur-md border border-white/10 text-xs text-[#c5a059]">
                <Star className="w-3.5 h-3.5 fill-[#c5a059]" />
                <span className="font-bold text-white text-xs">{place.rating}</span>
              </div>

              {/* Floating Takri Title on Image */}
              <div className="absolute bottom-3 left-4 right-4">
                <div className="font-takri text-2xl sm:text-3xl text-[#dfbe7b] font-bold tracking-wide drop-shadow-md">
                  {place.nameTakri}
                </div>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {scriptMode === 'takri-only' ? (
                  <div className="flex items-center justify-between">
                    <h3 className="font-takri text-2xl text-[#dfbe7b] group-hover:text-white transition-colors">
                      {place.nameTakri}
                    </h3>
                    <button
                      onClick={() => speakPhonetic(place.nameHindi)}
                      className="p-1 rounded-lg text-white/40 hover:text-[#c5a059] hover:bg-white/5 cursor-pointer"
                      title="Pronounce name"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : scriptMode === 'bilingual' ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif italic text-white group-hover:text-[#c5a059] transition-colors">
                        {place.nameHindi}
                      </h3>
                      <button
                        onClick={() => speakPhonetic(place.nameHindi)}
                        className="p-1 rounded-lg text-white/40 hover:text-[#c5a059] hover:bg-white/5 cursor-pointer"
                        title="Pronounce Hindi name"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-takri text-base text-[#dfbe7b] pt-0.5">
                      {place.nameTakri}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif italic text-white group-hover:text-[#c5a059] transition-colors">
                        {place.nameEnglish}
                      </h3>
                      <button
                        onClick={() => speakPhonetic(place.nameHindi)}
                        className="p-1 rounded-lg text-white/40 hover:text-[#c5a059] hover:bg-white/5 cursor-pointer"
                        title="Pronounce Hindi name"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-[#c5a059] font-serif">
                      {place.nameHindi}
                    </div>
                  </div>
                )}

                {/* Description based on Script Mode */}
                <div className="text-xs text-white/70 font-light leading-relaxed pt-1">
                  {scriptMode === 'takri-only' ? (
                    <p className="font-takri text-base text-[#dfbe7b] leading-normal select-all">
                      {place.shortDescriptionTakri}
                    </p>
                  ) : scriptMode === 'bilingual' ? (
                    <div className="space-y-1">
                      <p className="font-takri text-sm text-[#dfbe7b]">{place.shortDescriptionTakri}</p>
                      <p className="text-white/80 font-serif italic">{place.shortDescriptionHindi}</p>
                    </div>
                  ) : (
                    <p className="text-white/70 font-serif italic line-clamp-3">
                      {place.shortDescriptionEnglish}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-[11px] text-white/50 uppercase tracking-wider">
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri text-xs text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥</span>
                  ) : (
                    <span>{place.valley}</span>
                  )}
                </div>

                <button
                  id={`read-story-${place.id}`}
                  onClick={() => {
                    setSelectedPlace(place);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] text-xs font-bold uppercase tracking-tight shadow-md transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri text-xs">𑚂𑚙𑚮𑚩𑚭𑚨 𑚞𑚚𑚴</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>इतिहास पढ़ें (𑚞𑚚𑚴)</span>
                  ) : (
                    <span>Read Inscriptions</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Place Story & Inscription Modal */}
      {selectedPlace && (
        <div
          id="place-details-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-[#1a2a2c] border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                <span className="text-xs font-serif text-[#c5a059] uppercase tracking-wider">
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri text-xs text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥 𑚔𑚭𑚊𑚤𑚯 𑚂𑚙𑚮𑚩𑚭𑚨</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>हिमाचल टाकरी धरोहर वृत्तांत</span>
                  ) : (
                    <span>Himachal Takri Heritage Chronicle</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedPlace)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Copy share link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {copiedNotification && (
              <div className="p-2.5 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 text-xs text-[#dfbe7b] text-center font-medium">
                Copied Takri place inscription summary to clipboard!
              </div>
            )}

            {/* Hero Banner in Modal */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
              <img
                src={selectedPlace.imageUrl}
                alt={selectedPlace.nameEnglish}
                className="w-full h-full object-cover brightness-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a2c] via-[#1a2a2c]/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="font-takri text-3xl sm:text-5xl text-[#dfbe7b] font-bold text-glow-gold">
                  {selectedPlace.nameTakri}
                </div>
                {scriptMode !== 'takri-only' && (
                  <div className="text-lg sm:text-xl font-serif text-white flex items-center gap-3">
                    {scriptMode === 'all' && <span>{selectedPlace.nameEnglish}</span>}
                    <span className="text-[#c5a059] text-sm">({selectedPlace.nameHindi})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Takri Script Historical Context Box */}
            {scriptMode !== 'takri-only' && (
              <div className="p-4 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-serif text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Historical Takri Inscription Context:</span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-light">
                  {selectedPlace.takriHistoricalContext}
                </p>
                {selectedPlace.famousInscriptions && (
                  <div className="pt-2 text-xs text-[#dfbe7b] font-mono">
                    <strong>Notable Archive:</strong> {selectedPlace.famousInscriptions}
                  </div>
                )}
              </div>
            )}

            {/* Full Chronicle Stories */}
            <div className="space-y-6 text-left">
              {/* Takri Script Full Story */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#c5a059] font-bold">
                  <span className="font-takri text-base">𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮 𑚢𑚭𑚒 𑚊𑚩𑚭𑚝𑚯</span>
                  {onOpenStudioWithText && (
                    <button
                      onClick={() => onOpenStudioWithText(selectedPlace.fullStoryTakri)}
                      className="text-[11px] text-[#c5a059] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{scriptMode === 'takri-only' ? '𑚀𑚝𑚰𑚪𑚭𑚛𑚊' : 'Transcribe in Translator'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="font-takri text-xl sm:text-2xl text-[#dfbe7b] leading-relaxed select-all">
                  {selectedPlace.fullStoryTakri}
                </p>
              </div>

              {/* Hindi Devanagari Full Story (shown in bilingual & all) */}
              {scriptMode !== 'takri-only' && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/80 font-serif">
                    <span>हिंदी अनुवाद (Devanagari Hindi Version)</span>
                    <button
                      onClick={() => speakPhonetic(selectedPlace.fullStoryHindi)}
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white cursor-pointer"
                      title="Listen in Hindi"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-serif italic text-white/90 leading-relaxed font-light">
                    {selectedPlace.fullStoryHindi}
                  </p>
                </div>
              )}

              {/* English Version (shown in all) */}
              {scriptMode === 'all' && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block">
                    English Historical Exposition
                  </span>
                  <p className="text-sm text-white/80 leading-relaxed font-light">
                    {selectedPlace.fullStoryEnglish}
                  </p>
                </div>
              )}
            </div>

            {/* Highlights Chips */}
            {scriptMode !== 'takri-only' && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                  Key Cultural Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlace.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-black/40 text-xs text-[#dfbe7b] border border-white/10"
                    >
                      ✦ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri text-xs text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥 𑚜𑚤𑚴𑚩𑚤</span>
                ) : (
                  <span>Best season: <strong className="text-white">{selectedPlace.bestSeason}</strong></span>
                )}
              </div>

              <button
                onClick={() => setSelectedPlace(null)}
                className="px-5 py-2.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs uppercase tracking-tight shadow-md transition-all cursor-pointer"
              >
                {scriptMode === 'takri-only' ? '𑚞𑚚𑚮 𑚥𑚣𑚭' : 'Done Reading'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
