import React, { useState } from 'react';
import { HIMACHAL_LANGUAGES, HimachalLanguage } from '../data/himachalLanguages';
import { ScriptMode } from '../types';
import { Volume2, Languages, BookOpen, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
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

  const selectedLang = HIMACHAL_LANGUAGES.find(l => l.id === selectedLangId) || HIMACHAL_LANGUAGES[0];

  const handleSpeak = (text: string, label: string) => {
    setSpeakingText(label);
    speakPhonetic(text);
    setTimeout(() => {
      setSpeakingText(null);
    }, 1500);
  };

  return (
    <section id="himachal-languages-section" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-widest shadow-xs">
          <Languages className="w-3.5 h-3.5" />
          <span>हिमाचली बोलियां एवं भाषाएं • Western Pahari & Himalayan Tongues</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2c1d11] tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>हिमाचल की भाषाएं व बोलियां <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">Languages of Himachal Pradesh</span></span>
          ) : (
            <span>Languages of Himachal Pradesh</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          The high mountain ridges of Himachal cradled diverse Western Pahari dialects and Tibeto-Burman speech traditions, rich in oral poetry, devotional invocations, and historical songs.
        </p>
      </div>

      {/* Language Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {HIMACHAL_LANGUAGES.map((lang) => {
          const isSelected = lang.id === selectedLang.id;
          return (
            <button
              key={lang.id}
              onClick={() => setSelectedLangId(lang.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                isSelected
                  ? 'bg-season-accent text-white font-bold shadow-md scale-102'
                  : 'bg-white/60 text-[#5c4a3b] hover:bg-white/90 border border-[#e5d8c7]/80'
              }`}
            >
              <span>{lang.name}</span>
              <span className="opacity-75 text-[10px]">({lang.nameHindi})</span>
            </button>
          );
        })}
      </div>

      {/* Active Language Detailed Card */}
      <div className="bg-white/75 backdrop-blur-2xl rounded-3xl border border-[#e5d8c7]/90 shadow-xl p-6 sm:p-8 space-y-8">
        {/* Language Identity Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e5d8c7]/80">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c1d11]">
                {selectedLang.name} <span className="text-season-accent text-lg font-sans font-normal">({selectedLang.nameHindi})</span>
              </h3>
              <span className="text-2xl font-serif text-season-accent">{selectedLang.nameTakri}</span>
            </div>
            <p className="text-xs text-[#7a695a] pt-1">
              <span className="font-semibold text-[#2c1d11]">Family:</span> {selectedLang.family} • <span className="font-semibold text-[#2c1d11]">Region:</span> {selectedLang.region}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3 py-1.5 rounded-full bg-season-badge-bg/90 text-season-accent font-bold border border-season-badge-border/80">
              👥 {selectedLang.speakersCount}
            </span>
            {onNavigateToTakri && (
              <button
                onClick={onNavigateToTakri}
                className="text-xs px-3 py-1.5 rounded-full bg-season-accent text-white font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                Learn Takri Script →
              </button>
            )}
          </div>
        </div>

        {/* Narrative & Script History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 bg-white/50 p-4 rounded-2xl border border-[#e5d8c7]/70">
            <div className="flex items-center gap-2 text-season-accent text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Linguistic Profile & Heritage</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3e2e21] leading-relaxed">
              {selectedLang.description}
            </p>
          </div>

          <div className="space-y-2 bg-white/50 p-4 rounded-2xl border border-[#e5d8c7]/70">
            <div className="flex items-center gap-2 text-season-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Historic Script Usage (Takri & Manuscripts)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3e2e21] leading-relaxed">
              {selectedLang.scriptHistory}
            </p>
          </div>
        </div>

        {/* Sample Native Phrases with Audio Pronunciation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#2c1d11] font-serif text-lg font-bold">
            <MessageSquare className="w-4 h-4 text-season-accent" />
            <span>Interactive Spoken Phrases & Sayings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedLang.samplePhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-[#e5d8c7]/80 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-season-accent tracking-wider">
                      Phrase {idx + 1}
                    </span>
                    <button
                      onClick={() => handleSpeak(phrase.phraseNative, `phrase-${idx}`)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        speakingText === `phrase-${idx}`
                          ? 'bg-season-accent text-white border-season-accent scale-110'
                          : 'bg-white text-season-accent border-[#e5d8c7] hover:bg-[#faf6f0]'
                      }`}
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {/* Native Script */}
                  <h4 className="text-base sm:text-lg font-bold text-[#2c1d11]">
                    {phrase.phraseNative}
                  </h4>
                  
                  {/* Takri rendering */}
                  <p className="text-sm font-serif text-season-accent">
                    {phrase.phraseTakri}
                  </p>

                  {/* Phonetics */}
                  <p className="text-xs text-[#7a695a] italic">
                    "{phrase.phonetics}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e5d8c7]/60">
                  <p className="text-xs font-medium text-[#3e2e21]">
                    <strong>Meaning:</strong> {phrase.phraseEnglish}
                  </p>
                  <p className="text-[10px] text-[#8c7b6d] pt-0.5">
                    {phrase.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Grammatical & Cultural Features */}
        <div className="space-y-2 pt-2 border-t border-[#e5d8c7]/70">
          <span className="text-xs font-bold text-[#7a695a] uppercase tracking-wider block">
            Distinctive Features of {selectedLang.name}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedLang.uniqueFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#4a392b] bg-white/40 p-2.5 rounded-xl border border-[#e5d8c7]/50">
                <CheckCircle className="w-3.5 h-3.5 text-season-accent shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
