import React, { useState } from 'react';
import { HIMACHAL_FESTIVALS, HimachalFestival } from '../data/himachalFestivals';
import { ScriptMode } from '../types';
import { Calendar, MapPin, Sparkles, Flame, Info, CheckCircle2 } from 'lucide-react';

interface FestivalsSectionProps {
  scriptMode: ScriptMode;
}

export const FestivalsSection: React.FC<FestivalsSectionProps> = ({
  scriptMode
}) => {
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState<string>('all');
  const [activeFestivalId, setActiveFestivalId] = useState<string>(HIMACHAL_FESTIVALS[0].id);

  const filteredFestivals = HIMACHAL_FESTIVALS.filter(f => 
    selectedSeasonFilter === 'all' || f.season === selectedSeasonFilter
  );

  const activeFestival = HIMACHAL_FESTIVALS.find(f => f.id === activeFestivalId) || HIMACHAL_FESTIVALS[0];

  return (
    <section id="himachal-festivals-section" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-widest shadow-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>मेले एवं उत्सव • Sacred Fairs & Fetes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2c1d11] tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>देवभूमि के पावन मेले व उत्सव <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">Festivals of Himachal Pradesh</span></span>
          ) : (
            <span>Festivals of Himachal Pradesh</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          In the Himalayas, festivals are divine reunions where village devtas travel in palanquins across mountain passes, uniting communities in trance, sacred dance, and celebration.
        </p>
      </div>

      {/* Seasonal Filter Bar */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Festivals (समस्त मेले)' },
          { id: 'spring', label: '🌸 Spring / Basant (बसंत)' },
          { id: 'summer', label: '☀️ Summer / Grishma (ग्रीष्म)' },
          { id: 'monsoon', label: '🌧️ Monsoon / Varsha (वर्षा)' },
          { id: 'autumn', label: '🍂 Autumn / Sharad (शरद)' },
          { id: 'winter', label: '❄️ Winter / Shishir (शिशिर)' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedSeasonFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md ${
              selectedSeasonFilter === filter.id
                ? 'bg-season-accent text-white font-bold shadow-md'
                : 'bg-white/60 text-[#5c4a3b] hover:bg-white/90 border border-[#e5d8c7]/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Featured Grand Showcase Festival */}
      <div className="bg-white/75 backdrop-blur-2xl rounded-3xl border border-[#e5d8c7]/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-[#f4ebe1] flex flex-col justify-end p-6">
          <img
            src={activeFestival.imageUrl}
            alt={activeFestival.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b120c]/90 via-[#1b120c]/40 to-transparent" />
          
          <div className="relative z-10 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-season-accent text-white font-bold">
                {activeFestival.status} Festival
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium">
                📍 {activeFestival.district}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {activeFestival.name}
            </h3>
            <p className="text-xs text-white/80 font-sans">
              <strong>Month & Timing:</strong> {activeFestival.monthRange} ({activeFestival.venue})
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-season-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deity Focus: {activeFestival.deityFocus}</span>
            </div>
            <p className="text-sm text-[#3e2e21] leading-relaxed">
              {activeFestival.description}
            </p>
          </div>

          <div className="space-y-2 bg-white/50 p-4 rounded-2xl border border-[#e5d8c7]/70">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2c1d11]">
              <Flame className="w-3.5 h-3.5 text-season-accent" />
              <span>Sacred Rituals & Historical Lore</span>
            </div>
            <p className="text-xs text-[#5c4a3b] leading-relaxed">
              {activeFestival.ritualsLore}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#7a695a] uppercase tracking-wider block">
              Key Highlights
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeFestival.highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#3e2e21] bg-white/60 p-2.5 rounded-xl border border-[#e5d8c7]/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-season-accent shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All Festivals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFestivals.map((festival) => (
          <div
            key={festival.id}
            onClick={() => setActiveFestivalId(festival.id)}
            className={`group rounded-3xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
              festival.id === activeFestival.id
                ? 'bg-season-badge-bg/90 border-season-accent shadow-lg scale-102'
                : 'bg-white/70 border-[#e5d8c7]/80 hover:bg-white/90 hover:shadow-md'
            }`}
          >
            <div className="relative h-48 overflow-hidden bg-[#f4ebe1]">
              <img
                src={festival.imageUrl}
                alt={festival.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 font-bold text-[#2c1d11] shadow-xs">
                  {festival.district}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-serif block opacity-80">{festival.nameTakri}</span>
                <h4 className="text-base font-serif font-bold text-white leading-snug">
                  {festival.name}
                </h4>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              <p className="text-xs text-[#5c4a3b] line-clamp-2">
                {festival.description}
              </p>
              
              <div className="pt-2 border-t border-[#e5d8c7]/60 flex items-center justify-between text-[11px] text-[#7a695a]">
                <span>📅 {festival.monthRange}</span>
                <span className="font-bold text-season-accent">View Lore →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
