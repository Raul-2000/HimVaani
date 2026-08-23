import React, { useState } from 'react';
import { Compass, BookOpen, Feather, Sparkles, MapPin, Landmark, Utensils, Mountain, ScrollText, Music, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { HeritagePillarId, ScriptMode, NavigationTab } from '../types';
import { HimachalSeason, HIMACHAL_SEASONS } from '../utils/seasons';
import { HERITAGE_PILLARS_META } from '../data/heritageTraditions';

interface HeroBannerProps {
  scriptMode?: ScriptMode;
  onExploreClick?: () => void;
  onPillarSelect?: (pillarId: HeritagePillarId) => void;
  onNavigate?: (tab: NavigationTab) => void;
  currentSeason?: HimachalSeason;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  scriptMode = 'all',
  onExploreClick,
  onPillarSelect,
  onNavigate,
  currentSeason = 'monsoon',
}) => {
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const activeSeasonData = HIMACHAL_SEASONS[currentSeason] || HIMACHAL_SEASONS.monsoon;
  const activePillar = HERITAGE_PILLARS_META[activePillarIdx] || HERITAGE_PILLARS_META[0];

  const handlePillarClick = (pillarId: HeritagePillarId, idx: number) => {
    setActivePillarIdx(idx);
    if (onPillarSelect) {
      onPillarSelect(pillarId);
    }
  };

  return (
    <section
      id="hero-banner-section"
      className="relative min-h-[85vh] flex items-center justify-center pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 3D Rugged Himalayan Mountain Backdrop with Rich Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=90"
          alt="Himalayan mountain peaks"
          className="w-full h-full object-cover object-center scale-102 brightness-[0.96] contrast-[1.04]"
          referrerPolicy="no-referrer"
        />
        {/* Atmospheric Color Blend & Depth Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/75 via-[#f8f3ea]/60 to-[#fdfbf7]/90 backdrop-blur-[1.5px]" />
        
        {/* Soft 3D Mountain Sun Lighting Effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        {/* Animated Himalayan Mist Layers */}
        <div className="absolute -top-10 -left-1/4 w-[150%] h-64 bg-gradient-to-r from-white/0 via-white/40 to-white/0 blur-2xl animate-mist pointer-events-none" />
        <div className="absolute bottom-10 -right-1/4 w-[150%] h-72 bg-gradient-to-r from-white/0 via-white/30 to-white/0 blur-3xl animate-mist pointer-events-none" style={{ animationDelay: '-9s' }} />
      </div>

      {/* Hero Outer Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Mission */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge and Himachal Seasonal Accent */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs uppercase tracking-[0.2em] font-semibold bg-white/80 backdrop-blur-md shadow-xs"
                style={{
                  borderColor: activeSeasonData.badgeBorder,
                  color: activeSeasonData.badgeText,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSeasonData.accentColor }}></span>
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case tracking-normal text-sm font-bold">𑚩𑚮𑚢𑚭𑚏𑚥 𑚜𑚤𑚴𑚩𑚤 • 𑚨𑚫𑚤𑚊𑚋𑚘</span>
                ) : scriptMode === 'bilingual' ? (
                  <>
                    <span>हिमाचल सांस्कृतिक धरोहर</span>
                    <span className="opacity-40">•</span>
                    <span className="font-takri text-sm normal-case tracking-normal">𑚜𑚤𑚴𑚩𑚤</span>
                  </>
                ) : (
                  <>
                    <span>CULTURAL & HERITAGE GUIDE</span>
                    <span className="opacity-40">•</span>
                    <span className="font-takri text-sm normal-case tracking-normal font-bold">𑚜𑚤𑚴𑚩𑚤</span>
                  </>
                )}
              </div>

              {/* Live Himachal Season Pill */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs bg-white/80 backdrop-blur-md text-[#5c4a3b] shadow-xs"
                style={{
                  borderColor: activeSeasonData.badgeBorder,
                }}
              >
                <span>{activeSeasonData.icon}</span>
                <span className="font-bold text-season-accent">{activeSeasonData.nameEnglish.split(' ')[0]}</span>
                <span className="opacity-40">•</span>
                <span className="font-takri font-bold text-season-accent">{activeSeasonData.nameTakri}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              {scriptMode === 'takri-only' ? (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] font-takri text-season-accent drop-shadow-xs">
                    𑚩𑚮𑚢𑚪𑚭𑚘𑚯: 𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝 𑚙𑚲 𑚜𑚤𑚴𑚩𑚤
                  </h1>
                </div>
              ) : scriptMode === 'bilingual' ? (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#2c1d11] leading-[1.08] font-serif">
                    हिमवाणी <span className="text-season-accent text-3xl sm:text-5xl font-sans font-light block pt-1">HimVaani</span>
                  </h1>
                  <p className="text-xl sm:text-3xl font-serif italic text-[#4a392b] pt-2">
                    The Cultural & Heritage Guide to Himachal Pradesh
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="font-takri text-2xl sm:text-3xl font-bold text-season-accent">
                      𑚩𑚮𑚢𑚪𑚭𑚘𑚯 • 𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝 𑚙𑚲 𑚜𑚤𑚴𑚩𑚤
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#2c1d11] leading-[1.05] font-serif">
                    HimVaani
                  </h1>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-season-accent pt-2">
                    The Cultural & Heritage Guide to Himachal Pradesh
                  </h2>
                </div>
              )}
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3e2e21] max-w-2xl leading-relaxed font-normal bg-white/40 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
              Explore the landscapes, languages, traditions, festivals, architecture, cuisine, folklore, history, and hidden stories of Himachal Pradesh—preserving its rich cultural heritage for generations to come.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                id="hero-explore-places-btn"
                onClick={() => onNavigate ? onNavigate('explore') : onExploreClick?.()}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-season-accent hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Himachal (स्थल)</span>
              </button>

              <button
                id="hero-districts-btn"
                onClick={() => onNavigate ? onNavigate('districts') : null}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/85 hover:bg-white text-[#2c1d11] font-semibold text-xs uppercase tracking-wider border border-[#e5d8c7] shadow-xs backdrop-blur-md transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-season-accent" />
                <span>12 Districts (जिले)</span>
              </button>

              <button
                id="hero-culture-btn"
                onClick={() => onNavigate ? onNavigate('culture') : null}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/85 hover:bg-white text-[#2c1d11] font-semibold text-xs uppercase tracking-wider border border-[#e5d8c7] shadow-xs backdrop-blur-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-season-accent" />
                <span>Living Traditions (धरोहर)</span>
              </button>

              <button
                id="hero-takri-btn"
                onClick={() => onNavigate ? onNavigate('takri') : null}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/70 hover:bg-white text-[#5c4a3b] text-xs font-semibold uppercase tracking-wider border border-[#ebd8c5] transition-all cursor-pointer"
              >
                <Feather className="w-4 h-4 text-season-accent" />
                <span>Takri Script (टांकरी)</span>
              </button>
            </div>

            {/* Micro proof / heritage trust points */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#e5d8c7]/80">
              <div className="flex items-center gap-1 text-[#d97706]">
                <Star className="w-4 h-4 fill-current text-current" />
                <span className="text-[#2c1d11] font-bold text-sm">4.9</span>
              </div>
              <span className="text-xs text-[#5c4a3b] font-medium">
                Comprehensive Cultural Archive of Himachal Pradesh (देवभूमि धरोहर)
              </span>
              <div
                className="hidden sm:flex items-center gap-1.5 ml-auto text-[11px] px-3 py-1 rounded-full border uppercase tracking-wider font-semibold bg-season-badge-bg/90 text-season-accent border-season-badge-border shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>UNESCO & GI Archive</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Himachal Traditions & Heritage Showcase */}
          <div className="lg:col-span-5">
            <div
              id="hero-heritage-showcase-card"
              className="relative rounded-3xl p-5 sm:p-7 bg-white/80 backdrop-blur-2xl border border-season-badge-border/90 shadow-2xl transition-all space-y-4 sm:space-y-5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center pb-3.5 border-b border-[#e5d8c7]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-season-accent"></span>
                  <span className="text-xs font-serif uppercase tracking-wider font-bold text-season-accent">
                    Himachal Heritage Pillars (धरोहर स्तम्भ)
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-season-badge-bg text-season-accent font-bold border border-season-badge-border">
                  6 Living Pillars
                </span>
              </div>

              {/* Active Heritage Focus Display */}
              <div
                onClick={() => {
                  handlePillarClick(activePillar.id, activePillarIdx);
                  if (onNavigate) onNavigate('culture');
                }}
                className="p-4 rounded-2xl bg-white/70 backdrop-blur-md hover:bg-season-badge-bg/90 border border-season-badge-border/80 space-y-2 cursor-pointer group transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white border border-[#d5be9d] text-season-accent shadow-xs">
                      {activePillar.id === 'locations' && <MapPin className="w-5 h-5" />}
                      {activePillar.id === 'architecture' && <Landmark className="w-5 h-5" />}
                      {activePillar.id === 'celebrations' && <Music className="w-5 h-5" />}
                      {activePillar.id === 'cuisine' && <Utensils className="w-5 h-5" />}
                      {activePillar.id === 'script' && <ScrollText className="w-5 h-5" />}
                      {activePillar.id === 'folklore' && <Mountain className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-serif text-[#2c1d11] group-hover:text-season-accent transition-colors">
                        {activePillar.title}
                      </h4>
                      <span className="font-takri text-sm text-season-accent font-bold">
                        {activePillar.titleTakri}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-season-accent font-bold">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <p className="text-xs text-[#5c4a3b] leading-relaxed pt-1">
                  {activePillar.desc}
                </p>
              </div>

              {/* Interactive Pillar Selector Grid with Redirection */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-[#7a695a] font-bold block">
                  Select a Cultural Pillar to Explore:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {HERITAGE_PILLARS_META.map((pillar, idx) => {
                    const isSelected = activePillarIdx === idx;
                    const IconComp =
                      pillar.id === 'locations'
                        ? MapPin
                        : pillar.id === 'architecture'
                        ? Landmark
                        : pillar.id === 'celebrations'
                        ? Music
                        : pillar.id === 'cuisine'
                        ? Utensils
                        : pillar.id === 'script'
                        ? ScrollText
                        : Mountain;

                    return (
                      <button
                        key={pillar.id}
                        onClick={() => handlePillarClick(pillar.id, idx)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-season-badge-bg border-season-accent shadow-xs'
                            : 'bg-white/60 backdrop-blur-xs border-[#e5d8c7]/80 hover:bg-white/90 text-[#5c4a3b]'
                        }`}
                      >
                        <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-season-accent' : 'text-[#7a695a]'}`} />
                        <span className={`text-xs font-semibold line-clamp-1 ${isSelected ? 'text-[#2c1d11] font-bold' : 'text-[#5c4a3b]'}`}>
                          {pillar.title.split(' ')[0]} {pillar.title.split(' ')[1] || ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Bottom Quick Link */}
              <div className="pt-3.5 border-t border-[#e5d8c7]/80 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#7a695a] block font-bold">
                    Comprehensive Cultural Archive
                  </span>
                  <span className="text-xs font-bold font-serif text-[#2c1d11]">
                    50 Valleys, 12 Districts & Lore
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('culture');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-tight shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


