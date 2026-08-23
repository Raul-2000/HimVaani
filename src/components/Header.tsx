import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Feather, MapPin, BookOpen, MessageSquare, History, Sparkles, Mountain } from 'lucide-react';
import { ScriptMode } from '../types';
import { HimachalSeason, HIMACHAL_SEASONS } from '../utils/seasons';
import { SeasonThemeSelector } from './SeasonThemeSelector';
import {
  toggleGlobalMute,
  getIsMuted,
  subscribeAudioState,
} from '../utils/audioAmbience';

interface HeaderProps {
  activeTab: 'places' | 'traditions' | 'learn' | 'community' | 'history';
  setActiveTab: (tab: 'places' | 'traditions' | 'learn' | 'community' | 'history') => void;
  scriptMode: ScriptMode;
  setScriptMode: (mode: ScriptMode) => void;
  onOpenQuickPost?: () => void;
  currentSeason?: HimachalSeason;
  onSelectSeason?: (season: HimachalSeason, isAuto: boolean) => void;
  isAutoMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  scriptMode,
  setScriptMode,
  onOpenQuickPost,
  currentSeason = 'monsoon',
  onSelectSeason = () => {},
  isAutoMode = false,
}) => {
  const [isMuted, setIsMutedState] = useState(getIsMuted());
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAudioFeedback, setShowAudioFeedback] = useState<string | null>(null);

  const activeSeasonData = HIMACHAL_SEASONS[currentSeason] || HIMACHAL_SEASONS.monsoon;

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
          ? 'py-2 sm:py-2.5 bg-[#fdfbf7]/80 backdrop-blur-xl border-b border-[#e5d8c7]/60 shadow-xs'
          : 'py-2.5 sm:py-3.5 bg-[#fdfbf7]/65 backdrop-blur-xl border-b border-[#ebd8c5]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Brand Logo */}
        <div
          id="brand-logo-button"
          onClick={() => setActiveTab('places')}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group shrink-0 min-w-0"
        >
          <div
            className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform border border-season-badge-border shrink-0"
            style={{
              background: `linear-gradient(135deg, ${activeSeasonData.accentColor}, ${activeSeasonData.accentDark})`,
            }}
          >
            <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <h1 className="text-base sm:text-xl font-serif font-bold tracking-tight text-[#2c1d11] transition-colors leading-none truncate">
                {scriptMode === 'bilingual' ? (
                  <span>हिमवाणी <span className="text-season-accent font-light text-xs sm:text-base font-sans hidden min-[360px]:inline">HimVaani</span></span>
                ) : (
                  <span>HimVaani</span>
                )}
              </h1>
              <span
                className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full border font-bold shrink-0 hidden min-[440px]:inline"
                style={{
                  backgroundColor: activeSeasonData.badgeBg,
                  borderColor: activeSeasonData.badgeBorder,
                  color: activeSeasonData.badgeText,
                }}
              >
                धरोहर
              </span>
            </div>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.1em] text-[#7a695a] font-sans hidden 2xl:block pt-0.5 truncate">
              {scriptMode === 'bilingual' ? (
                <span>हिमाचल दर्शन एवं संस्कृति संरक्षण</span>
              ) : (
                <span>Explore Himachal, Conserve Its Traditions</span>
              )}
            </p>
          </div>
        </div>

        {/* Central Nav Links (Desktop) */}
        <nav id="desktop-navigation" className="hidden xl:flex items-center gap-1 bg-white/45 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-season-badge-border/80 shadow-xs shrink-0">
          <button
            id="nav-tab-places"
            onClick={() => setActiveTab('places')}
            className={`text-xs transition-all px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
              activeTab === 'places'
                ? 'bg-season-badge-bg font-bold text-season-accent shadow-xs border border-season-badge-border/60'
                : 'text-[#6e5d4e] hover:text-[#2c1d11] hover:bg-white/40'
            }`}
          >
            {scriptMode === 'bilingual' ? 'स्थान व घाटियां' : 'Places & Valleys'}
          </button>

          <button
            id="nav-tab-traditions"
            onClick={() => setActiveTab('traditions')}
            className={`text-xs transition-all px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
              activeTab === 'traditions'
                ? 'bg-season-badge-bg font-bold text-season-accent shadow-xs border border-season-badge-border/60'
                : 'text-[#6e5d4e] hover:text-[#2c1d11] hover:bg-white/40'
            }`}
          >
            {scriptMode === 'bilingual' ? '६ धरोहर स्तम्भ' : '6 Heritage Pillars'}
          </button>

          <button
            id="nav-tab-learn"
            onClick={() => setActiveTab('learn')}
            className={`text-xs transition-all px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
              activeTab === 'learn'
                ? 'bg-season-badge-bg font-bold text-season-accent shadow-xs border border-season-badge-border/60'
                : 'text-[#6e5d4e] hover:text-[#2c1d11] hover:bg-white/40'
            }`}
          >
            {scriptMode === 'bilingual' ? 'अक्षर व लिपि' : 'Script & Inscriptions'}
          </button>

          <button
            id="nav-tab-community"
            onClick={() => setActiveTab('community')}
            className={`text-xs transition-all px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'community'
                ? 'bg-season-badge-bg font-bold text-season-accent shadow-xs border border-season-badge-border/60'
                : 'text-[#6e5d4e] hover:text-[#2c1d11] hover:bg-white/40'
            }`}
          >
            <span>{scriptMode === 'bilingual' ? 'सामुदायिक संवाद' : 'Community'}</span>
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-season-accent"></span>
          </button>

          <button
            id="nav-tab-history"
            onClick={() => setActiveTab('history')}
            className={`text-xs transition-all px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-season-badge-bg font-bold text-season-accent shadow-xs border border-season-badge-border/60'
                : 'text-[#6e5d4e] hover:text-[#2c1d11] hover:bg-white/40'
            }`}
          >
            {scriptMode === 'bilingual' ? 'इतिहास व वृत्तांत' : 'History & Chronicles'}
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Seasonal Theme Switcher */}
          <SeasonThemeSelector
            currentSeason={currentSeason}
            onSelectSeason={onSelectSeason}
            isAutoMode={isAutoMode}
          />

          {/* Language / View Mode Toggle */}
          <div id="script-mode-selector" className="flex items-center bg-white/40 backdrop-blur-md rounded-xl p-0.5 border border-[#e5d8c7]/70 text-[10px] sm:text-xs">
            <button
              id="lang-select-english"
              onClick={() => setScriptMode('all')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer font-semibold uppercase ${
                scriptMode === 'all' || scriptMode === 'trilingual'
                  ? 'bg-season-accent text-white shadow font-bold'
                  : 'text-[#6e5d4e] hover:text-[#2c1d11]'
              }`}
              title="English presentation"
            >
              <span className="hidden sm:inline">English</span>
              <span className="sm:hidden">EN</span>
            </button>
            <button
              id="lang-select-hindi"
              onClick={() => setScriptMode('bilingual')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs transition-all cursor-pointer flex items-center gap-0.5 font-medium ${
                scriptMode === 'bilingual'
                  ? 'bg-season-accent text-white font-bold shadow'
                  : 'text-[#6e5d4e] hover:text-[#2c1d11]'
              }`}
              title="हिंदी (Hindi) presentation"
            >
              <span className="hidden sm:inline">हिंदी</span>
              <span className="sm:hidden">हिं</span>
            </button>
          </div>

          {/* Pronunciation Mute Toggle */}
          <div className="flex items-center relative">
            {showAudioFeedback && (
              <div
                className="absolute -bottom-8 right-0 bg-[#2c1d11]/90 backdrop-blur-md text-white text-[10px] font-sans px-2.5 py-1 rounded-lg border border-[#e5d8c7] shadow-xl whitespace-nowrap z-50 animate-fadeIn pointer-events-none"
              >
                {showAudioFeedback}
              </div>
            )}

            <button
              id="global-sound-mute-toggle-btn"
              onClick={handleToggleMute}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center backdrop-blur-md ${
                isMuted
                  ? 'bg-rose-50/80 text-rose-700 border-rose-300'
                  : 'bg-white/50 border-[#e5d8c7]/80 hover:bg-white/80 text-season-accent'
              }`}
              title={isMuted ? 'Pronunciation is MUTED. Click to Unmute' : 'Pronunciation is ON. Click to Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-season-accent" />
              )}
            </button>
          </div>

          {/* Quick Post CTA */}
          <button
            id="quick-write-button"
            onClick={() => {
              if (onOpenQuickPost) {
                onOpenQuickPost();
              } else {
                setActiveTab('community');
              }
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-102 cursor-pointer shrink-0"
          >
            <Feather className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{scriptMode === 'bilingual' ? 'कहानी साझा करें' : 'Share Story'}</span>
            <span className="xl:hidden">{scriptMode === 'bilingual' ? 'साझा' : 'Post'}</span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Tab Bar (visible below xl or when zoomed in) */}
      <div className="flex xl:hidden items-center justify-around px-1 pt-1 pb-0.5 border-t border-season-badge-border/50 mt-1 bg-[#fdfbf7]/70 backdrop-blur-xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('places')}
          className={`flex flex-col items-center gap-0.5 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-xl transition-all cursor-pointer shrink-0 ${
            activeTab === 'places'
              ? 'font-bold text-season-accent bg-season-badge-bg/90 shadow-xs border border-season-badge-border/70 scale-102'
              : 'text-[#7a695a] hover:text-[#2c1d11]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{scriptMode === 'bilingual' ? 'स्थान' : 'Places'}</span>
        </button>

        <button
          onClick={() => setActiveTab('traditions')}
          className={`flex flex-col items-center gap-0.5 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-xl transition-all cursor-pointer shrink-0 ${
            activeTab === 'traditions'
              ? 'font-bold text-season-accent bg-season-badge-bg/90 shadow-xs border border-season-badge-border/70 scale-102'
              : 'text-[#7a695a] hover:text-[#2c1d11]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{scriptMode === 'bilingual' ? 'धरोहर' : 'Traditions'}</span>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center gap-0.5 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-xl transition-all cursor-pointer shrink-0 ${
            activeTab === 'learn'
              ? 'font-bold text-season-accent bg-season-badge-bg/90 shadow-xs border border-season-badge-border/70 scale-102'
              : 'text-[#7a695a] hover:text-[#2c1d11]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{scriptMode === 'bilingual' ? 'टाकरी लिपि' : 'Script'}</span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex flex-col items-center gap-0.5 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-xl transition-all cursor-pointer shrink-0 ${
            activeTab === 'community'
              ? 'font-bold text-season-accent bg-season-badge-bg/90 shadow-xs border border-season-badge-border/70 scale-102'
              : 'text-[#7a695a] hover:text-[#2c1d11]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{scriptMode === 'bilingual' ? 'संवाद' : 'Community'}</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-0.5 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-xl transition-all cursor-pointer shrink-0 ${
            activeTab === 'history'
              ? 'font-bold text-season-accent bg-season-badge-bg/90 shadow-xs border border-season-badge-border/70 scale-102'
              : 'text-[#7a695a] hover:text-[#2c1d11]'
          }`}
        >
          <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{scriptMode === 'bilingual' ? 'इतिहास' : 'History'}</span>
        </button>
      </div>
    </header>
  );
};

