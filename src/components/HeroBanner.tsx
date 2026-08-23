import React, { useState } from 'react';
import { Compass, BookOpen, Feather, Sparkles, MapPin, Landmark, Utensils, Mountain, ScrollText, Music, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { HeritagePillarId, ScriptMode } from '../types';
import { HimachalSeason, HIMACHAL_SEASONS } from '../utils/seasons';
import { HERITAGE_PILLARS_META } from '../data/heritageTraditions';

interface HeroBannerProps {
  scriptMode?: ScriptMode;
  onLearnClick: () => void;
  onExplorePlacesClick: () => void;
  onCommunityClick: () => void;
  onSelectTradition?: (pillarId: HeritagePillarId) => void;
  currentSeason?: HimachalSeason;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  scriptMode = 'all',
  onLearnClick,
  onExplorePlacesClick,
  onCommunityClick,
  onSelectTradition,
  currentSeason = 'monsoon',
}) => {
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const activeSeasonData = HIMACHAL_SEASONS[currentSeason] || HIMACHAL_SEASONS.monsoon;
  const activePillar = HERITAGE_PILLARS_META[activePillarIdx] || HERITAGE_PILLARS_META[0];

  const handlePillarClick = (pillarId: HeritagePillarId, idx: number) => {
    setActivePillarIdx(idx);
    if (onSelectTradition) {
      onSelectTradition(pillarId);
    }
  };

  return (
    <section
      id="hero-banner-section"
      className="relative min-h-[80vh] flex items-center justify-center pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, var(--season-bg-start, #fdfbf7), var(--season-bg-mid, #f7f2ea), var(--season-bg-end, #fcfaf7))`,
      }}
    >
      {/* Background Mountain Vista with Animated Mist */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
          alt="Himachal mountain landscape"
          className="w-full h-full object-cover brightness-100 saturate-90 scale-102"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--season-body-bg,#fcfaf7)]/60 to-[var(--season-body-bg,#fcfaf7)]" />
        {/* Animated Himalayan Mist Layers */}
        <div className="absolute -top-10 -left-1/4 w-[150%] h-64 bg-gradient-to-r from-white/0 via-white/45 to-white/0 blur-2xl animate-mist pointer-events-none" />
        <div className="absolute bottom-10 -right-1/4 w-[150%] h-72 bg-gradient-to-r from-white/0 via-white/35 to-white/0 blur-3xl animate-mist pointer-events-none" style={{ animationDelay: '-9s' }} />
      </div>

      {/* Hero Outer Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Mission */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge and Himachal Seasonal Accent */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs uppercase tracking-[0.2em] font-semibold"
                style={{
                  backgroundColor: activeSeasonData.badgeBg,
                  borderColor: activeSeasonData.badgeBorder,
                  color: activeSeasonData.badgeText,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSeasonData.accentColor }}></span>
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case tracking-normal text-sm font-bold">𑚩𑚮𑚢𑚭𑚏𑚥 𑚜𑚤𑚴𑚩𑚤 • 𑚨𑚫𑚤𑚊𑚋𑚘</span>
                ) : scriptMode === 'bilingual' ? (
                  <>
                    <span>हिमाचल धरोहर संरक्षण</span>
                    <span className="opacity-40">•</span>
                    <span className="font-takri text-sm normal-case tracking-normal">𑚜𑚤𑚴𑚩𑚤</span>
                  </>
                ) : (
                  <>
                    <span>HIMACHAL PRADESH TRADITIONS</span>
                    <span className="opacity-40">•</span>
                    <span className="font-takri text-sm normal-case tracking-normal font-bold">𑚜𑚤𑚴𑚩𑚤</span>
                  </>
                )}
              </div>

              {/* Live Himachal Season Pill */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs bg-white text-[#5c4a3b] shadow-sm"
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
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] font-takri text-season-accent">
                    𑚩𑚮𑚢𑚪𑚭𑚘𑚯: 𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝 𑚙𑚲 𑚜𑚤𑚴𑚩𑚤
                  </h1>
                </div>
              ) : scriptMode === 'bilingual' ? (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-season-heading leading-[1.1] font-serif">
                    हिमवाणी <br />
                    <span className="italic text-season-accent text-3xl sm:text-5xl">Explore Himachal, Conserve Its Traditions</span>
                  </h1>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="font-takri text-2xl sm:text-3xl font-bold text-season-accent">
                      𑚩𑚮𑚢𑚪𑚭𑚘𑚯 • 𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝 𑚙𑚲 𑚜𑚤𑚴𑚩𑚤
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-season-heading leading-[1.08] font-serif">
                    HimVaani <br />
                    <span className="italic font-serif text-season-accent text-2xl sm:text-4xl lg:text-5xl block pt-1">
                      Explore Himachal, Conserve Its Traditions
                    </span>
                  </h1>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#5c4a3b] max-w-2xl leading-relaxed font-normal">
              Discover the locations, traditions, celebrations, history, architecture, cuisine, folklore, and untold tales that make Himachal Pradesh unique, preserving our legacy for coming generations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-places-btn"
                onClick={onExplorePlacesClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-season-accent hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold">𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>स्थान दर्शन (𑚛𑚤𑚧𑚝)</span>
                ) : (
                  <span>Explore 50 Places</span>
                )}
              </button>

              <button
                id="hero-start-learning-btn"
                onClick={onLearnClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#f5ece2] text-[#2c1d11] font-semibold text-xs uppercase tracking-wider border border-[#e5d8c7] shadow-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-season-accent" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold text-season-accent">𑚪𑚤𑚘𑚢𑚭𑚥𑚭 𑚨𑚮𑚋𑚴</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>वर्णमाला सीखें (𑚨𑚮𑚋𑚴)</span>
                ) : (
                  <span>Learn Section (वर्णमाला)</span>
                )}
              </button>

              <button
                id="hero-community-btn"
                onClick={onCommunityClick}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-season-badge-bg text-[#5c4a3b] hover:text-[#2c1d11] text-xs font-semibold uppercase tracking-wider border border-[#ebd8c5] transition-all cursor-pointer"
              >
                <Feather className="w-4 h-4 text-season-accent" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold text-season-accent">𑚨𑚫𑚌𑚢</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>कम्युनिटी (𑚨𑚫𑚌𑚢)</span>
                ) : (
                  <span>Community (कम्युनिटी)</span>
                )}
              </button>
            </div>

            {/* Micro proof / heritage trust points */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#e5d8c7]">
              <div className="flex items-center gap-1 text-[#d97706]">
                <Star className="w-4 h-4 fill-current text-current" />
                <span className="text-[#2c1d11] font-bold text-sm">4.9</span>
              </div>
              <span className="text-xs text-[#7a695a]">
                <span>Preserving Himachal Pradesh&apos;s Living Traditions & Cultural Heritage</span>
              </span>
              <div
                className="hidden sm:flex items-center gap-1.5 ml-auto text-[11px] px-3 py-1 rounded-full border uppercase tracking-wider font-semibold bg-season-badge-bg text-season-accent border-season-badge-border"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Devbhumi Heritage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Himachal Traditions & Heritage Showcase */}
          <div className="lg:col-span-5">
            <div
              id="hero-heritage-showcase-card"
              className="relative rounded-3xl p-5 sm:p-7 bg-white/70 backdrop-blur-xl border border-season-badge-border/90 shadow-xl transition-all space-y-4 sm:space-y-5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center pb-3.5 border-b border-[#e5d8c7]/70">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-season-accent"></span>
                  <span className="text-xs font-serif uppercase tracking-wider font-bold text-season-accent">
                    Himachal Heritage Pillars (धरोहर स्तम्भ)
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-season-badge-bg/80 text-season-accent font-bold border border-season-badge-border/80">
                  6 Living Traditions
                </span>
              </div>

              {/* Active Heritage Focus Display */}
              <div
                onClick={() => handlePillarClick(activePillar.id, activePillarIdx)}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-md hover:bg-season-badge-bg/90 border border-season-badge-border/70 space-y-2 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white border border-[#d5be9d] text-season-accent">
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
                  Select a Tradition to Explore:
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
                            ? 'bg-season-badge-bg/90 border-season-accent shadow-xs'
                            : 'bg-white/50 backdrop-blur-xs border-[#e5d8c7]/80 hover:bg-white/80 text-[#5c4a3b]'
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
              <div className="pt-3.5 border-t border-[#e5d8c7]/70 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#7a695a] block font-bold">
                    Comprehensive Archive
                  </span>
                  <span className="text-xs font-bold font-serif text-[#2c1d11]">
                    50 Valleys, Kath-Kuni & Lore
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (onSelectTradition) onSelectTradition('architecture');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-tight shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Traditions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


