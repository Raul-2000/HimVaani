import React, { useState } from 'react';
import { Sparkles, Star, Volume2, ArrowRight, BookOpen, Compass, CheckCircle2, Feather, RefreshCw } from 'lucide-react';
import { universalConvert } from '../utils/takriTransliterator';
import { speakPhonetic } from '../utils/audioAmbience';
import { ScriptMode } from '../types';

interface HeroBannerProps {
  scriptMode?: ScriptMode;
  onLearnClick: () => void;
  onExplorePlacesClick: () => void;
  onCommunityClick: () => void;
  onStudioClick: () => void;
}

const FEATURED_WORDS = [
  { takri: '𑚩𑚮𑚢𑚭𑚏𑚥', hindi: 'हिमाचल', english: 'Himachal', meaning: 'The Abode of Snow' },
  { takri: '𑚔𑚭𑚊𑚤𑚯', hindi: 'टाकरी', english: 'Takri', meaning: 'Ancient Himalayan Script' },
  { takri: '𑚏𑚢𑚠𑚭', hindi: 'चम्बा', english: 'Chamba', meaning: 'Kingdom of Copper Plates' },
  { takri: '𑚞𑚩𑚭𑚚', hindi: 'पहाड़', english: 'Pahar', meaning: 'Sacred Mountain Peak' },
  { takri: '𑚧𑚭𑚫𑚙𑚮', hindi: 'शांति', english: 'Shanti', meaning: 'Deep Mountain Peace' },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  scriptMode = 'all',
  onLearnClick,
  onExplorePlacesClick,
  onCommunityClick,
  onStudioClick,
}) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [heroInput, setHeroInput] = useState('Himachal');
  const activeWord = FEATURED_WORDS[wordIdx];

  const heroConverted = universalConvert(heroInput || 'Takri');

  const nextWord = () => {
    setWordIdx((prev) => (prev + 1) % FEATURED_WORDS.length);
  };

  const handleSpeak = (text: string) => {
    speakPhonetic(text);
  };

  return (
    <section
      id="hero-banner-section"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Rich Atmospheric Himalayan Misty Forest Background with Natural Pine/Teal Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Himachal Pradesh misty mountain forest"
          className="w-full h-full object-cover object-center brightness-[0.38] contrast-[1.05] scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Layered Twilight Natural Teal Mist Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a2c] via-[#1a2a2c]/70 to-[#1a2a2c]/40" />
        <div className="absolute inset-0 bg-radial-at-c from-[#c5a059]/10 via-transparent to-[#1a2a2c]/85" />
        <div className="absolute bottom-0 left-0 w-full h-[320px] pointer-events-none opacity-20 mountain-natural-texture" />
      </div>

      {/* Hero Outer Frame */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Mission */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#c5a059]/30 text-[#c5a059] text-[10px] sm:text-xs uppercase tracking-[0.25em] backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-pulse"></span>
              {scriptMode === 'takri-only' ? (
                <span className="font-takri normal-case tracking-normal text-sm text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥 𑚔𑚭𑚊𑚤𑚯 𑚜𑚤𑚴𑚩𑚤</span>
              ) : scriptMode === 'bilingual' ? (
                <>
                  <span className="font-semibold">हिमाचल धरोहर</span>
                  <span className="opacity-40">•</span>
                  <span className="font-takri text-sm normal-case tracking-normal">𑚔𑚭𑚊𑚤𑚯 𑚜𑚤𑚴𑚩𑚤</span>
                </>
              ) : (
                <>
                  <span className="font-semibold">HIMACHAL HERITAGE REVIVAL</span>
                  <span className="opacity-40">•</span>
                  <span className="font-takri text-sm normal-case tracking-normal">𑚔𑚭𑚊𑚤𑚯 𑚜𑚤𑚴𑚩𑚤</span>
                </>
              )}
            </div>

            {/* Main Headline (Natural Tones Serif + Display) */}
            <div className="space-y-2">
              {scriptMode === 'takri-only' ? (
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#dfbe7b] leading-[1.1] font-takri">
                    𑚩𑚮𑚢𑚭𑚏𑚥 𑚤𑚯 𑚞𑚤𑚭𑚏𑚯𑚝 𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮
                  </h1>
                </div>
              ) : scriptMode === 'bilingual' ? (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] font-serif">
                    हिमाचल की <br />
                    <span className="italic text-[#c5a059]">पावन प्राचीन लिपि</span>
                  </h1>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="font-takri text-2xl sm:text-4xl text-[#dfbe7b] font-medium tracking-wide">
                      𑚩𑚮𑚢𑚭𑚏𑚥 𑚤𑚯 𑚞𑚤𑚭𑚏𑚯𑚝 𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-serif">
                    Himalaya&apos;s <br />
                    <span className="italic text-[#c5a059] font-serif">
                      Living Script
                    </span>
                  </h1>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="font-takri text-2xl sm:text-4xl text-[#dfbe7b] font-medium tracking-wide">
                      𑚩𑚮𑚢𑚭𑚏𑚥 𑚤𑚯 𑚞𑚤𑚭𑚏𑚯𑚝 𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/80 max-w-2xl font-light leading-relaxed">
              {scriptMode === 'takri-only' ? (
                <span className="font-takri text-lg text-[#dfbe7b] leading-relaxed">
                  𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚲 𑚞𑚭𑚪𑚝 𑚢𑚫𑚛𑚮𑚤, 𑚞𑚩𑚭𑚚𑚭𑚫 𑚙𑚲 𑚪𑚭𑚛𑚯𑚣𑚭𑚫 𑚤𑚭 𑚂𑚙𑚮𑚩𑚭𑚨 𑚔𑚭𑚊𑚤𑚯 𑚢𑚫𑚑 𑚞𑚚𑚴 𑚙𑚲 𑚨𑚮𑚋𑚴।
                </span>
              ) : scriptMode === 'bilingual' ? (
                <span>
                  हिमाचल प्रदेश की प्राचीन <strong className="text-[#c5a059] font-medium font-serif italic">टाकरी लिपि</strong> की आध्यात्मिक दुनिया में प्रवेश करें। पहाड़ों के पवित्र स्थलों का इतिहास पढ़ें, वर्णमाला सीखें और चौपाल पर संवाद करें।
                </span>
              ) : (
                <span>
                  Step into the mystical world of Himachal Pradesh&apos;s indigenous <strong className="text-[#c5a059] font-medium font-serif italic">Takri script</strong>. Read rich cultural stories of Himachal&apos;s valleys, learn each historic character step-by-step, and practice conversing in pure Takri on our community board.
                </span>
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-start-learning-btn"
                onClick={() => {
                  onLearnClick();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs uppercase tracking-tight shadow-xl shadow-black/40 transition-all hover:scale-102 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold">𑚪𑚤𑚘𑚢𑚭𑚥𑚭 𑚨𑚮𑚋𑚴</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>वर्णमाला सीखें (𑚨𑚮𑚋𑚴)</span>
                ) : (
                  <span>Start Learning (वर्णमाला)</span>
                )}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-places-btn"
                onClick={() => {
                  onExplorePlacesClick();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all hover:border-[#c5a059]/40 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#c5a059]" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥 𑚛𑚤𑚧𑚝</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>स्थान दर्शन (𑚛𑚤𑚧𑚝)</span>
                ) : (
                  <span>Places in Himachal</span>
                )}
              </button>

              <button
                id="hero-community-btn"
                onClick={() => {
                  onCommunityClick();
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs uppercase tracking-wider border border-white/10 backdrop-blur-md transition-all cursor-pointer"
              >
                <Feather className="w-4 h-4 text-[#c5a059]" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>चौपाल (𑚏𑚵𑚞𑚭𑚥)</span>
                ) : (
                  <span>चौपाल (Sangam Board)</span>
                )}
              </button>
            </div>

            {/* Micro rating / proof block */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[#c5a059]">
                <Star className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                <span className="text-white font-bold text-sm">4.9</span>
              </div>
              <span className="text-xs text-white/60 font-light">
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-xs text-[#dfbe7b]">𑛁,𑛆𑛀𑛀+ 𑚔𑚭𑚊𑚤𑚯 𑚥𑚲𑚋𑚊 𑚙𑚲 𑚂𑚙𑚮𑚩𑚭𑚨𑚊𑚭𑚤</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>1,800+ टाकरी लेखक, इतिहासकार और हिमाचली युवा</span>
                ) : (
                  <span>from 1,800+ Takri scribes, historians, and Himachali youth</span>
                )}
              </span>
              <div className="hidden sm:flex items-center gap-2 ml-auto text-[11px] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Unicode 6.0 Standard</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Frosted Interactive Card (Natural Tones Card Style) */}
          <div className="lg:col-span-5">
            <div
              id="hero-floating-takri-card"
              className="relative rounded-3xl p-6 sm:p-7 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                  <span className="text-xs font-serif text-[#c5a059] uppercase tracking-wider">
                    {scriptMode === 'takri-only' ? (
                      <span className="font-takri normal-case text-sm text-[#dfbe7b]">𑚀𑚑 𑚤𑚭 𑚀𑚊𑚋𑚤</span>
                    ) : scriptMode === 'bilingual' ? (
                      <span>आज का शब्द (𑚔𑚭𑚊𑚤𑚯)</span>
                    ) : (
                      <span>आज का अक्षर / WORD OF THE DAY</span>
                    )}
                  </span>
                </div>
                <button
                  onClick={nextWord}
                  className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-white/50 hover:text-[#c5a059] transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                  title="Next featured Takri word"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{scriptMode === 'takri-only' ? '𑚀𑚌𑚥𑚭' : 'Next'}</span>
                </button>
              </div>

              {/* Word Display Box */}
              <div className="py-5 text-center space-y-3">
                <div className="aspect-video sm:aspect-[4/3] bg-black/30 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                  <span className="font-takri text-5xl sm:text-6xl text-[#dfbe7b] font-bold tracking-wider text-glow-gold select-all">
                    {heroConverted.takri || activeWord.takri}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 text-white/80">
                  {scriptMode === 'takri-only' ? (
                    <button
                      onClick={() => handleSpeak(heroConverted.devanagari || activeWord.hindi)}
                      className="p-1.5 rounded-lg bg-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059]/30 transition-all cursor-pointer"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  ) : scriptMode === 'bilingual' ? (
                    <>
                      <span className="text-xl font-serif italic text-white font-bold">{heroConverted.devanagari || activeWord.hindi}</span>
                      <button
                        onClick={() => handleSpeak(heroConverted.devanagari || activeWord.hindi)}
                        className="p-1.5 rounded-lg bg-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059]/30 transition-all ml-1 cursor-pointer"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-serif italic text-white">{heroConverted.devanagari || activeWord.hindi}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-xs font-sans text-[#c5a059] uppercase tracking-wider">{heroConverted.englishPhonetic || activeWord.english}</span>
                      <button
                        onClick={() => handleSpeak(heroConverted.devanagari || activeWord.hindi)}
                        className="p-1.5 rounded-lg bg-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059]/30 transition-all ml-1 cursor-pointer"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {scriptMode !== 'takri-only' && (
                  <p className="text-xs text-white/60 font-light italic">
                    {heroInput ? `Live transliterated output: "${heroInput}"` : activeWord.meaning}
                  </p>
                )}
              </div>

              {/* Instant Type & Transliterate Bar */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="block text-[11px] uppercase tracking-wider text-white/70 text-left">
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri normal-case text-xs text-[#dfbe7b]">𑚔𑚭𑚊𑚤𑚯 𑚢𑚫𑚑 𑚥𑚮𑚋𑚴:</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>टाकरी में लिखने हेतु टाइप करें:</span>
                  ) : (
                    <span>Type any Hindi or English word to see Takri script:</span>
                  )}
                </label>
                <div className="flex items-center gap-2 bg-black/30 rounded-xl p-1.5 border border-white/10 focus-within:border-[#c5a059] transition-all">
                  <input
                    type="text"
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    placeholder="e.g. Namaste, Chamba, Mandi, Spiti..."
                    className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none"
                  />
                  {heroInput && (
                    <button
                      onClick={() => setHeroInput('')}
                      className="text-xs text-white/40 hover:text-white px-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Card Bottom Quick Action */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                    {scriptMode === 'takri-only' ? (
                      <span className="font-takri text-xs text-[#dfbe7b]">𑚀𑚝𑚰𑚪𑚭𑚛</span>
                    ) : scriptMode === 'bilingual' ? (
                      <span>टाकरी अनुवादक</span>
                    ) : (
                      <span>Daily Takri Lesson</span>
                    )}
                  </span>
                  <span className="text-sm font-bold text-[#c5a059] font-serif">
                    {scriptMode === 'takri-only' ? (
                      <span className="font-takri text-base font-bold">𑚔𑚭𑚊𑚤𑚯 𑚨𑚮𑚋𑚴</span>
                    ) : (
                      <span>टाकरी सीखो</span>
                    )}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onStudioClick();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs uppercase tracking-tight shadow-md transition-all cursor-pointer"
                >
                  <span>
                    {scriptMode === 'takri-only' ? (
                      <span className="font-takri text-xs font-bold">𑚀𑚝𑚰𑚪𑚭𑚛𑚊</span>
                    ) : scriptMode === 'bilingual' ? (
                      <span>अनुवादक खोलें</span>
                    ) : (
                      <span>Open Translator</span>
                    )}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
