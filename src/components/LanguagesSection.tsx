import React, { useState, useRef } from 'react';
import { HIMACHAL_LANGUAGES } from '../data/himachalLanguages';
import { ScriptMode } from '../types';
import { Volume2, BookOpen, Sparkles, Feather, MapPin, Cloud, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import { speakPhonetic } from '../utils/audioAmbience';

interface LanguagesSectionProps {
  scriptMode: ScriptMode;
  onOpenTakriScript?: () => void;
  onNavigateToTakri?: () => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  scriptMode,
  onOpenTakriScript,
  onNavigateToTakri
}) => {
  const [selectedLangId, setSelectedLangId] = useState<string>(HIMACHAL_LANGUAGES[0].id);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const langTabsContainerRef = useRef<HTMLDivElement | null>(null);

  const selectedLang = HIMACHAL_LANGUAGES.find(l => l.id === selectedLangId) || HIMACHAL_LANGUAGES[0];

  const handleSpeak = (text: string, label: string) => {
    setSpeakingText(label);
    speakPhonetic(text);
    setTimeout(() => {
      setSpeakingText(null);
    }, 2000);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (langTabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      langTabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="himachal-languages-section" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-widest shadow-xs">
          <Cloud className="w-3.5 h-3.5" />
          <span>हिमाचली बोलियां एवं भाषाएं • Western Pahari & Himalayan Dialects</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2c1d11] tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>हिमाचल की भाषाएं व बोलियां <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">Languages & Dialects of Himachal Pradesh</span></span>
          ) : (
            <span>Languages & Dialects of Himachal Pradesh</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          The high mountain ridges of Himachal cradled diverse Western Pahari dialects and Tibeto-Burman speech traditions, rich in oral poetry, devotional invocations, and historical songs.
        </p>
      </div>

      {/* Cloud-Curved Shape Language Selector Tabs with Scroll Left & Scroll Right buttons */}
      <div className="relative flex items-center gap-2">
        {/* Scroll Left Button */}
        <button
          id="scroll-left-lang-tabs"
          onClick={() => scrollTabs('left')}
          className="p-2 rounded-full bg-white/90 hover:bg-white text-season-accent border border-season-badge-border shadow-md transition-all cursor-pointer shrink-0 hover:scale-105"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={langTabsContainerRef}
          className="flex-1 flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none flex-nowrap scroll-smooth"
        >
          {HIMACHAL_LANGUAGES.map((lang) => {
            const isSelected = lang.id === selectedLang.id;
            return (
              <button
                key={lang.id}
                id={`lang-pill-${lang.id}`}
                onClick={() => setSelectedLangId(lang.id)}
                className={`group relative px-4 py-2.5 rounded-[26px] text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 backdrop-blur-md shadow-xs shrink-0 ${
                  isSelected
                    ? 'bg-season-accent text-white font-bold shadow-md scale-105 ring-2 ring-season-accent/30 -translate-y-0.5'
                    : 'bg-white/65 hover:bg-white/95 text-[#5c4a3b] hover:text-[#2c1d11] border border-[#e5d8c7]/90 hover:shadow-sm'
                }`}
                style={{
                  borderRadius: '26px 26px 22px 22px',
                }}
              >
                {/* Cloud-like top curve highlight */}
                <div className={`w-2 h-2 rounded-full transition-transform ${isSelected ? 'bg-white scale-110' : 'bg-season-accent/40 group-hover:bg-season-accent'}`} />
                <span className="tracking-wide">{lang.name}</span>
                <span className={`text-[10px] font-normal ${isSelected ? 'text-white/85' : 'text-[#8a7665]'}`}>
                  ({lang.nameHindi})
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          id="scroll-right-lang-tabs"
          onClick={() => scrollTabs('right')}
          className="p-2 rounded-full bg-white/90 hover:bg-white text-season-accent border border-season-badge-border shadow-md transition-all cursor-pointer shrink-0 hover:scale-105"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Language Detailed Showcase (Cloud-curved container) */}
      <div
        className="bg-white/80 backdrop-blur-2xl border border-[#e5d8c7]/90 shadow-xl p-6 sm:p-9 space-y-8 transition-all duration-300"
        style={{
          borderRadius: '36px',
        }}
      >
        {/* Language Identity Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-[#e5d8c7]/80">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c1d11]">
                {selectedLang.name}
              </h3>
              <span className="text-lg sm:text-2xl text-season-accent font-serif font-medium">
                ({selectedLang.nameHindi})
              </span>
              
              {/* Takri Script Representation badge (Only rendered if non-empty) */}
              {selectedLang.nameTakri && selectedLang.nameTakri.trim().length > 0 && (
                <span className="text-xl sm:text-2xl font-serif text-season-accent px-3.5 py-1 rounded-full bg-season-badge-bg/80 border border-season-badge-border shadow-xs">
                  {selectedLang.nameTakri}
                </span>
              )}

              <button
                onClick={() => handleSpeak(selectedLang.nameHindi, `lang-name-${selectedLang.id}`)}
                className={`p-2 rounded-full border transition-all cursor-pointer shadow-xs ${
                  speakingText === `lang-name-${selectedLang.id}`
                    ? 'bg-season-accent text-white border-season-accent scale-110'
                    : 'bg-white text-season-accent border-[#e5d8c7] hover:bg-[#faf6f0]'
                }`}
                title={`Listen to pronunciation of ${selectedLang.name}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#7a695a]">
              <span className="flex items-center gap-1 font-semibold text-[#2c1d11]">
                <MapPin className="w-3.5 h-3.5 text-season-accent" />
                {selectedLang.region}
              </span>
              <span>•</span>
              <span><strong className="text-[#2c1d11]">Family:</strong> {selectedLang.family}</span>
              <span>•</span>
              <span><strong className="text-[#2c1d11]">Districts:</strong> {selectedLang.district}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-season-badge-bg text-season-accent font-bold border border-season-badge-border">
              👥 {selectedLang.speakersCount}
            </span>
            {(onOpenTakriScript || onNavigateToTakri) && (
              <button
                onClick={onOpenTakriScript || onNavigateToTakri}
                className="text-xs px-4 py-2 rounded-full bg-season-accent text-white font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Explore Takri Script →</span>
              </button>
            )}
          </div>
        </div>

        {/* Narrative & Historical Script Inscription Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="space-y-2.5 bg-white/60 p-5 border border-[#e5d8c7]/80"
            style={{ borderRadius: '24px' }}
          >
            <div className="flex items-center gap-2 text-season-accent text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Linguistic Profile & Cultural Heritage</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3e2e21] leading-relaxed">
              {selectedLang.description}
            </p>
          </div>

          <div
            className="space-y-2.5 bg-white/60 p-5 border border-[#e5d8c7]/80"
            style={{ borderRadius: '24px' }}
          >
            <div className="flex items-center gap-2 text-season-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Historic Takri Script & Epigraphic Inscriptions</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3e2e21] leading-relaxed">
              {selectedLang.scriptHistory}
            </p>
          </div>
        </div>

        {/* Sub-Dialects & Oral Folk Genres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Sub-Dialect Variations */}
          <div
            className="bg-white/55 p-4 sm:p-5 border border-[#e5d8c7]/70 space-y-3"
            style={{ borderRadius: '22px' }}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-season-accent">
              <MapPin className="w-3.5 h-3.5" />
              <span>Regional Sub-Dialects & Valley Variants</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedLang.subDialects.map((dialect, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/80 border border-[#e5d8c7] font-medium text-[#3e2e21]"
                >
                  {dialect}
                </span>
              ))}
            </div>
          </div>

          {/* Oral Singing & Ballad Genres */}
          <div
            className="bg-white/55 p-4 sm:p-5 border border-[#e5d8c7]/70 space-y-3"
            style={{ borderRadius: '22px' }}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-season-accent">
              <Music className="w-3.5 h-3.5" />
              <span>Folk Singing & Oral Ballad Traditions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedLang.folkGenres.map((genre, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-full bg-season-badge-bg/70 border border-season-badge-border text-season-accent font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Distinctive Linguistic Hallmarks (Clean mention without checkboxes) */}
        <div className="space-y-3 pt-2 border-t border-[#e5d8c7]/80">
          <span className="text-xs font-bold text-[#7a695a] uppercase tracking-wider block">
            Distinctive Linguistic Characteristics of {selectedLang.name}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedLang.uniqueFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-[#3e2e21] bg-white/60 p-3 border border-[#e5d8c7]/70 leading-relaxed"
                style={{ borderRadius: '18px' }}
              >
                <div className="w-2 h-2 rounded-full bg-season-accent mt-1.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
