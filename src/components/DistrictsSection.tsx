import React, { useState } from 'react';
import { HIMACHAL_DISTRICTS, HimachalDistrict } from '../data/himachalDistricts';
import { ScriptMode } from '../types';
import { MapPin, Mountain, Compass, Award, Utensils, Calendar, BookOpen, Layers, ArrowRight } from 'lucide-react';

interface DistrictsSectionProps {
  scriptMode: ScriptMode;
  onExploreDistrictPlaces?: (districtName: string) => void;
}

export const DistrictsSection: React.FC<DistrictsSectionProps> = ({
  scriptMode,
  onExploreDistrictPlaces
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(HIMACHAL_DISTRICTS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDistricts = HIMACHAL_DISTRICTS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.nameHindi.includes(searchQuery) ||
    d.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.keyAttractions.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedDistrict = HIMACHAL_DISTRICTS.find(d => d.id === selectedDistrictId) || HIMACHAL_DISTRICTS[0];

  return (
    <section id="himachal-districts-section" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-widest shadow-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>१२ जिले • 12 Heritage Districts</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2c1d11] tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>हिमाचल के १२ जनपद <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">Districts of Himachal Pradesh</span></span>
          ) : (
            <span>Districts of Himachal Pradesh</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          From the trans-Himalayan cold desert of Lahaul & Spiti to the sacred tea slopes of Kangra and the pine kingdoms of Shimla, explore the 12 sovereign geographies of the Devbhoomi.
        </p>
      </div>

      {/* Search & Grid Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-xl p-3.5 rounded-2xl border border-[#e5d8c7]/80 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-80">
          <Compass className="w-4 h-4 text-season-accent" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district, headquarters, lore..."
            className="w-full bg-transparent text-xs text-[#2c1d11] placeholder-[#8c7b6d] focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-[#7a695a]">
          Showing {filteredDistricts.length} of 12 Districts
        </span>
      </div>

      {/* District Badges Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {HIMACHAL_DISTRICTS.map((district) => {
          const isSelected = district.id === selectedDistrict.id;
          return (
            <button
              key={district.id}
              onClick={() => setSelectedDistrictId(district.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                isSelected
                  ? 'bg-season-accent text-white font-bold shadow-md scale-102'
                  : 'bg-white/60 text-[#5c4a3b] hover:bg-white/90 border border-[#e5d8c7]/80'
              }`}
            >
              <span>{district.name}</span>
              <span className="opacity-75 text-[10px]">({district.nameHindi})</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected District Showcase Card */}
      <div className="bg-white/75 backdrop-blur-2xl rounded-3xl border border-[#e5d8c7]/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: District Image & Quick Facts */}
        <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-[#f4ebe1] flex flex-col justify-end p-6">
          <img
            src={selectedDistrict.imageUrl}
            alt={selectedDistrict.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b120c]/90 via-[#1b120c]/40 to-transparent" />
          
          <div className="relative z-10 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif">{selectedDistrict.nameTakri}</span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 font-bold">
                HQ: {selectedDistrict.headquarters}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {selectedDistrict.name} ({selectedDistrict.nameHindi})
            </h3>
            <p className="text-xs text-white/85 leading-relaxed font-light">
              "{selectedDistrict.tagline}"
            </p>
            
            {/* Stat Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-center">
              <div className="bg-black/30 backdrop-blur-md p-2 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Area</span>
                <span className="text-xs font-bold text-white">{selectedDistrict.area}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-md p-2 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Elevation</span>
                <span className="text-xs font-bold text-white">{selectedDistrict.altitudeRange}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-md p-2 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Population</span>
                <span className="text-xs font-bold text-white">{selectedDistrict.population}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Cultural & Geographical Lore */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Historical Narrative */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-season-accent text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Historical & Cultural Lore</span>
            </div>
            <p className="text-sm text-[#3e2e21] leading-relaxed">
              {selectedDistrict.historicalLore}
            </p>
          </div>

          {/* Key Attractions Grid */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[#7a695a] text-xs font-bold uppercase tracking-wider">
              <Mountain className="w-3.5 h-3.5 text-season-accent" />
              <span>Key Shrines, Forts & Valleys</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedDistrict.keyAttractions.map((attraction, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white/80 border border-[#e5d8c7] text-[#4a392b] font-medium shadow-xs"
                >
                  📍 {attraction}
                </span>
              ))}
            </div>
          </div>

          {/* Living Traditions & Crafts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e5d8c7]/70">
            {/* Crafts */}
            <div className="space-y-1.5 bg-white/50 p-3.5 rounded-2xl border border-[#e5d8c7]/60">
              <div className="flex items-center gap-2 text-xs font-bold text-season-accent">
                <Award className="w-3.5 h-3.5" />
                <span>Traditional Crafts & GI Tags</span>
              </div>
              <ul className="text-xs text-[#5c4a3b] space-y-1">
                {selectedDistrict.traditionalCrafts.map((craft, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-season-accent shrink-0" />
                    <span>{craft}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signature Dish & Festivals */}
            <div className="space-y-1.5 bg-white/50 p-3.5 rounded-2xl border border-[#e5d8c7]/60">
              <div className="flex items-center gap-2 text-xs font-bold text-season-accent">
                <Utensils className="w-3.5 h-3.5" />
                <span>Culinary Heritage</span>
              </div>
              <p className="text-xs text-[#5c4a3b]">
                {selectedDistrict.signatureDish}
              </p>
              
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-[#7a695a] block">Famous Fairs</span>
                <span className="text-xs text-[#3e2e21] font-medium">
                  {selectedDistrict.famousFestivals.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Languages Spoken & Rivers */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e5d8c7]/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#7a695a] font-medium">Spoken Dialects:</span>
              <span className="font-bold text-[#2c1d11]">{selectedDistrict.primaryLanguages.join(' • ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#7a695a] font-medium">Main Rivers:</span>
              <span className="font-bold text-season-accent">{selectedDistrict.rivers.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* All 12 Districts Bento Grid Preview */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#2c1d11]">
          Explore All 12 Sovereign Districts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {HIMACHAL_DISTRICTS.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDistrictId(d.id)}
              className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 backdrop-blur-xl ${
                d.id === selectedDistrict.id
                  ? 'bg-season-badge-bg/90 border-season-accent shadow-md scale-102'
                  : 'bg-white/60 border-[#e5d8c7]/80 hover:bg-white/90 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#2c1d11] group-hover:text-season-accent transition-colors">
                    {d.name} <span className="font-sans text-xs font-normal text-[#7a695a]">({d.nameHindi})</span>
                  </h4>
                  <span className="text-[10px] text-[#8c7b6d] block">HQ: {d.headquarters}</span>
                </div>
                <span className="text-lg font-serif text-season-accent">{d.nameTakri}</span>
              </div>
              <p className="text-xs text-[#5c4a3b] line-clamp-2">
                {d.tagline}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#e5d8c7]/50 text-[#7a695a]">
                <span>{d.altitudeRange}</span>
                <span className="font-bold text-season-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
