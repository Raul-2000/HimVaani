import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Feather, MapPin, BookOpen, MessageSquare, PenTool, History } from 'lucide-react';
import { ScriptMode } from '../types';
import {
  toggleGlobalMute,
  getIsMuted,
  subscribeAudioState,
} from '../utils/audioAmbience';

interface HeaderProps {
  activeTab: 'places' | 'learn' | 'community' | 'studio' | 'history';
  setActiveTab: (tab: 'places' | 'learn' | 'community' | 'studio' | 'history') => void;
  scriptMode: ScriptMode;
  setScriptMode: (mode: ScriptMode) => void;
  onOpenQuickPost?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  scriptMode,
  setScriptMode,
  onOpenQuickPost,
}) => {
  const [isMuted, setIsMutedState] = useState(getIsMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAudioFeedback, setShowAudioFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeAudioState((muted) => {
      setIsMutedState(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggleMute = () => {
    const nextMuted = toggleGlobalMute();
    setIsMutedState(nextMuted);
    if (!nextMuted) {
      setShowAudioFeedback('Pronunciation Enabled 🔊');
      setTimeout(() => setShowAudioFeedback(null), 2000);
    } else {
      setShowAudioFeedback('Pronunciation Muted 🔇');
      setTimeout(() => setShowAudioFeedback(null), 2000);
    }
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#1a2a2c]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-gradient-to-b from-[#1a2a2c]/95 via-[#1a2a2c]/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          id="brand-logo-button"
          onClick={() => {
            setActiveTab('places');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8a6d35] flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 transition-transform border border-[#c5a059]/40">
            <span className="font-takri text-2xl text-[#1a2a2c] font-bold tracking-tight">𑚔</span>
          </div>
          <div>
            <div className="flex items-baseline">
              <h1 className="text-xl sm:text-2xl font-serif italic text-[#c5a059] tracking-tight group-hover:text-white transition-colors">
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri text-2xl font-bold not-italic">𑚩𑚮𑚢𑚪𑚭𑚘𑚯</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>हिमवाणी</span>
                ) : (
                  <span>हिमवाणी <span className="text-white font-light text-lg sm:text-xl ml-1 font-sans">Takri</span></span>
                )}
              </h1>
              <span className="text-[11px] px-2 py-0.5 ml-2 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 font-takri">
                𑚔𑚭𑚊𑚤𑚯
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans">
              {scriptMode === 'takri-only' ? (
                <span className="font-takri normal-case tracking-normal text-xs text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥 𑚤𑚯 𑚞𑚤𑚭𑚏𑚯𑚝 𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮</span>
              ) : scriptMode === 'bilingual' ? (
                <span>हिमाचल की प्राचीन टाकरी धरोहर</span>
              ) : (
                <span>Reviving the Takri Script of Himachal</span>
              )}
            </p>
          </div>
        </div>

        {/* Central Nav Links */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-4 lg:gap-5 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-lg">
          <button
            id="nav-tab-places"
            onClick={() => setActiveTab('places')}
            className={`text-xs transition-all pb-0.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'places'
                ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-medium'
                : 'text-white/70 hover:text-white hover:opacity-100'
            }`}
          >
            {scriptMode === 'takri-only' ? (
              <span className="font-takri text-base font-bold text-[#dfbe7b]">𑚛𑚤𑚧𑚝</span>
            ) : scriptMode === 'bilingual' ? (
              <span className="flex items-center gap-1 font-medium">
                <span>दर्शन</span>
                <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚛𑚤𑚧𑚝)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <span>Places</span>
                <span className="normal-case font-takri text-xs text-[#dfbe7b] tracking-normal font-semibold">(𑚛𑚤𑚧𑚝)</span>
              </span>
            )}
          </button>

          <button
            id="nav-tab-learn"
            onClick={() => setActiveTab('learn')}
            className={`text-xs transition-all pb-0.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'learn'
                ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-medium'
                : 'text-white/70 hover:text-white hover:opacity-100'
            }`}
          >
            {scriptMode === 'takri-only' ? (
              <span className="font-takri text-base font-bold text-[#dfbe7b]">𑚪𑚤𑚘𑚢𑚭𑚥𑚭</span>
            ) : scriptMode === 'bilingual' ? (
              <span className="flex items-center gap-1 font-medium">
                <span>वर्णमाला</span>
                <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚪𑚤𑚘𑚢𑚭𑚥𑚭)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <span>Learn</span>
                <span className="normal-case font-takri text-xs text-[#dfbe7b] tracking-normal font-semibold">(𑚪𑚤𑚘𑚢𑚭𑚥𑚭)</span>
              </span>
            )}
          </button>

          <button
            id="nav-tab-community"
            onClick={() => setActiveTab('community')}
            className={`text-xs transition-all pb-0.5 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'community'
                ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-medium'
                : 'text-white/70 hover:text-white hover:opacity-100'
            }`}
          >
            {scriptMode === 'takri-only' ? (
              <span className="font-takri text-base font-bold text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥</span>
            ) : scriptMode === 'bilingual' ? (
              <span className="flex items-center gap-1 font-medium">
                <span>चौपाल</span>
                <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚏𑚵𑚞𑚭𑚥)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <span>Chaupal</span>
                <span className="normal-case font-takri text-xs text-[#dfbe7b] tracking-normal font-semibold">(𑚏𑚵𑚞𑚭𑚥)</span>
              </span>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
          </button>

          <button
            id="nav-tab-studio"
            onClick={() => setActiveTab('studio')}
            className={`text-xs transition-all pb-0.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'studio'
                ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-medium'
                : 'text-white/70 hover:text-white hover:opacity-100'
            }`}
          >
            {scriptMode === 'takri-only' ? (
              <span className="font-takri text-base font-bold text-[#dfbe7b]">𑚀𑚝𑚰𑚪𑚭𑚛</span>
            ) : scriptMode === 'bilingual' ? (
              <span className="flex items-center gap-1 font-medium">
                <span>अनुवाद</span>
                <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚀𑚝𑚰𑚪𑚭𑚛)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <span>Translator</span>
                <span className="normal-case font-takri text-xs text-[#dfbe7b] tracking-normal font-semibold">(𑚀𑚝𑚰𑚪𑚭𑚛)</span>
              </span>
            )}
          </button>

          <button
            id="nav-tab-history"
            onClick={() => setActiveTab('history')}
            className={`text-xs transition-all pb-0.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'history'
                ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-medium'
                : 'text-white/70 hover:text-white hover:opacity-100'
            }`}
          >
            {scriptMode === 'takri-only' ? (
              <span className="font-takri text-base font-bold text-[#dfbe7b]">𑚂𑚙𑚮𑚩𑚭𑚨</span>
            ) : scriptMode === 'bilingual' ? (
              <span className="flex items-center gap-1 font-medium">
                <span>इतिहास</span>
                <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚂𑚙𑚮𑚩𑚭𑚨)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <span>Heritage</span>
                <span className="normal-case font-takri text-xs text-[#dfbe7b] tracking-normal font-semibold">(𑚂𑚙𑚮𑚩𑚭𑚨)</span>
              </span>
            )}
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Script Mode View Toggle */}
          <div id="script-mode-selector" className="flex items-center bg-black/40 rounded-xl p-1 border border-white/10 text-xs">
            <button
              id="lang-select-trilingual"
              onClick={() => setScriptMode('trilingual')}
              className={`px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all cursor-pointer font-semibold uppercase ${
                scriptMode === 'trilingual' || scriptMode === 'all'
                  ? 'bg-[#c5a059] text-[#1a2a2c] shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Trilingual mode: English + Hindi + Takri"
            >
              Trilingual
            </button>
            <button
              id="lang-select-bilingual"
              onClick={() => setScriptMode('bilingual')}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 font-medium ${
                scriptMode === 'bilingual'
                  ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Bilingual mode: Hindi (Devanagari) + Takri"
            >
              <span>हिंदी</span>
              <span className="text-xs opacity-60">+</span>
              <span className={`font-takri text-sm font-bold ${scriptMode === 'bilingual' ? 'text-[#1a2a2c]' : 'text-[#dfbe7b]'}`}>
                𑚔𑚭𑚊𑚤𑚯
              </span>
            </button>
            <button
              id="lang-select-takri-only"
              onClick={() => setScriptMode('takri-only')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center ${
                scriptMode === 'takri-only'
                  ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Pure Takri immersion: only Takri script shown"
            >
              <span className={`font-takri text-sm font-bold ${scriptMode === 'takri-only' ? 'text-[#1a2a2c]' : 'text-[#dfbe7b]'}`}>
                𑚔𑚭𑚊𑚤𑚯
              </span>
            </button>
          </div>

          {/* Pronunciation Mute Toggle & Quick Action */}
          <div className="flex items-center gap-2 relative">
            {/* Audio Feedback Toast */}
            {showAudioFeedback && (
              <div className="absolute -bottom-8 right-0 bg-[#1a2a2c] text-[#dfbe7b] text-[10px] font-sans px-2.5 py-1 rounded-lg border border-[#c5a059]/40 shadow-xl whitespace-nowrap z-50 animate-fadeIn pointer-events-none">
                {showAudioFeedback}
              </div>
            )}

            {/* Global Pronunciation Audio Mute/Unmute */}
            <button
              id="global-sound-mute-toggle-btn"
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-white/5 text-[#dfbe7b] border-white/10 hover:bg-[#c5a059]/20 hover:border-[#c5a059]/40'
              }`}
              title={isMuted ? 'Pronunciation is MUTED. Click to Unmute' : 'Pronunciation is ON. Click to Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#dfbe7b]" />
              )}
            </button>
          </div>

          {/* Write in Takri quick action */}
          <button
            id="quick-write-button"
            onClick={() => {
              if (onOpenQuickPost) {
                onOpenQuickPost();
              } else {
                setActiveTab('community');
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs shadow-lg shadow-black/30 transition-all hover:scale-102 cursor-pointer"
          >
            <Feather className="w-3.5 h-3.5" />
            {scriptMode === 'takri-only' ? (
              <span className="font-takri font-bold text-sm">𑚥𑚮𑚋𑚴</span>
            ) : scriptMode === 'bilingual' ? (
              <span className="flex items-center gap-1">
                <span>लिखें</span>
                <span className="font-takri font-bold text-sm text-[#1a2a2c]">(𑚥𑚮𑚋𑚴)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <span className="hidden sm:inline">Write</span>
                <span className="normal-case font-takri font-bold text-sm text-[#1a2a2c] tracking-normal">𑚥𑚮𑚋𑚴</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden items-center justify-around px-2 pt-2 pb-1 border-t border-white/5 mt-2 bg-[#1a2a2c]/95 backdrop-blur-lg">
        <button
          onClick={() => setActiveTab('places')}
          className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 transition-all cursor-pointer ${
            activeTab === 'places' ? 'text-[#c5a059] font-bold' : 'text-white/60'
          }`}
        >
          <MapPin className="w-4 h-4" />
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-xs font-bold text-[#dfbe7b]">𑚛𑚤𑚧𑚝</span>
          ) : scriptMode === 'bilingual' ? (
            <span className="flex flex-col items-center leading-none">
              <span>दर्शन</span>
              <span className="font-takri text-[10px] text-[#dfbe7b]">𑚛𑚤𑚧𑚝</span>
            </span>
          ) : (
            <span>Places</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 transition-all cursor-pointer ${
            activeTab === 'learn' ? 'text-[#c5a059] font-bold' : 'text-white/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-xs font-bold text-[#dfbe7b]">𑚪𑚤𑚘𑚢𑚭𑚥𑚭</span>
          ) : scriptMode === 'bilingual' ? (
            <span className="flex flex-col items-center leading-none">
              <span>वर्णमाला</span>
              <span className="font-takri text-[10px] text-[#dfbe7b]">𑚪𑚤𑚘𑚢𑚭𑚥𑚭</span>
            </span>
          ) : (
            <span>Learn</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 transition-all cursor-pointer ${
            activeTab === 'community' ? 'text-[#c5a059] font-bold' : 'text-white/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-xs font-bold text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥</span>
          ) : scriptMode === 'bilingual' ? (
            <span className="flex flex-col items-center leading-none">
              <span>चौपाल</span>
              <span className="font-takri text-[10px] text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥</span>
            </span>
          ) : (
            <span>Chaupal</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('studio')}
          className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 transition-all cursor-pointer ${
            activeTab === 'studio' ? 'text-[#c5a059] font-bold' : 'text-white/60'
          }`}
        >
          <PenTool className="w-4 h-4" />
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-xs font-bold text-[#dfbe7b]">𑚀𑚝𑚰𑚪𑚭𑚛</span>
          ) : scriptMode === 'bilingual' ? (
            <span className="flex flex-col items-center leading-none">
              <span>अनुवाद</span>
              <span className="font-takri text-[10px] text-[#dfbe7b]">𑚀𑚝𑚰𑚪𑚭𑚛</span>
            </span>
          ) : (
            <span>Studio</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-0.5 text-[10px] p-1.5 transition-all cursor-pointer ${
            activeTab === 'history' ? 'text-[#c5a059] font-bold' : 'text-white/60'
          }`}
        >
          <History className="w-4 h-4" />
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-xs font-bold text-[#dfbe7b]">𑚂𑚙𑚮𑚩𑚭𑚨</span>
          ) : scriptMode === 'bilingual' ? (
            <span className="flex flex-col items-center leading-none">
              <span>इतिहास</span>
              <span className="font-takri text-[10px] text-[#dfbe7b]">𑚂𑚙𑚮𑚩𑚭𑚨</span>
            </span>
          ) : (
            <span>History</span>
          )}
        </button>
      </div>
    </header>
  );
};
