import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Feather,
  MapPin,
  BookOpen,
  MessageSquare,
  History,
  Sparkles,
  Mountain,
  Calendar,
  Languages,
  Image as ImageIcon,
  Compass,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ScriptMode, NavigationTab } from '../types';
import { HimachalSeason, HIMACHAL_SEASONS } from '../utils/seasons';
import { SeasonThemeSelector } from './SeasonThemeSelector';
import {
  toggleGlobalMute,
  getIsMuted,
  subscribeAudioState,
  natureAudio,
} from '../utils/audioAmbience';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
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

  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

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
      natureAudio.playTempleBell();
      setShowAudioFeedback('Nature Sound & Audio ON 🏔️ 🔊');
      setTimeout(() => setShowAudioFeedback(null), 2500);
    } else {
      setShowAudioFeedback('Sound Muted 🔇');
      setTimeout(() => setShowAudioFeedback(null), 2000);
    }
  };

  const scrollDesktopNav = (direction: 'left' | 'right') => {
    if (desktopNavRef.current) {
      desktopNavRef.current.scrollBy({
        left: direction === 'left' ? -180 : 180,
        behavior: 'smooth',
      });
    }
  };

  const scrollMobileNav = (direction: 'left' | 'right') => {
    if (mobileNavRef.current) {
      mobileNavRef.current.scrollBy({
        left: direction === 'left' ? -150 : 150,
        behavior: 'smooth',
      });
    }
  };

  const navItems: { id: NavigationTab; labelEn: string; labelHi: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य', icon: HomeIcon },
    { id: 'explore', labelEn: 'Explore', labelHi: 'स्थल', icon: Compass },
    { id: 'districts', labelEn: 'Districts', labelHi: 'जिले', icon: MapPin },
    { id: 'culture', labelEn: 'Culture', labelHi: 'धरोहर', icon: Sparkles },
    { id: 'languages', labelEn: 'Languages', labelHi: 'भाषाएं', icon: Languages },
    { id: 'heritage', labelEn: 'Heritage', labelHi: 'वास्तु', icon: BookOpen },
    { id: 'history', labelEn: 'History', labelHi: 'इतिहास', icon: History },
    { id: 'festivals', labelEn: 'Festivals', labelHi: 'मेले', icon: Calendar },
    { id: 'gallery', labelEn: 'Gallery', labelHi: 'दीर्घा', icon: ImageIcon },
    { id: 'community', labelEn: 'Chaupal', labelHi: 'चौपाल', icon: MessageSquare },
    { id: 'takri', labelEn: 'Takri', labelHi: 'टांकरी', icon: Feather },
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-[#fdfbf7]/85 backdrop-blur-xl border-b border-[#e5d8c7]/70 shadow-xs'
          : 'py-2.5 bg-[#fdfbf7]/75 backdrop-blur-xl border-b border-[#ebd8c5]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 flex items-center justify-between gap-1.5 sm:gap-2 w-full">
        {/* Brand Logo */}
        <div
          id="brand-logo-button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
        >
          <div
            className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform border border-season-badge-border shrink-0"
            style={{
              background: `linear-gradient(135deg, ${activeSeasonData.accentColor}, ${activeSeasonData.accentDark})`,
            }}
          >
            <Mountain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <h1 className="text-sm sm:text-base xl:text-lg font-serif font-bold tracking-tight text-[#2c1d11] transition-colors leading-none whitespace-nowrap">
                {scriptMode === 'bilingual' ? (
                  <span>हिमवाणी <span className="text-season-accent font-light text-xs sm:text-sm font-sans hidden min-[600px]:inline">HimVaani</span></span>
                ) : (
                  <span>HimVaani</span>
                )}
              </h1>
              <span
                className="text-[9px] px-1.5 py-0.2 rounded-full border font-bold shrink-0 hidden 2xl:inline"
                style={{
                  backgroundColor: activeSeasonData.badgeBg,
                  borderColor: activeSeasonData.badgeBorder,
                  color: activeSeasonData.badgeText,
                }}
              >
                धरोहर
              </span>
            </div>
          </div>
        </div>

        {/* Central Nav Links (Desktop) with responsive flexing and scroll arrows */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 min-w-0 max-w-sm xl:max-w-lg 2xl:max-w-xl mx-1 xl:mx-2">
          <button
            onClick={() => scrollDesktopNav('left')}
            className="p-1 rounded-full text-[#7a695a] hover:text-[#2c1d11] hover:bg-white/80 transition-all cursor-pointer shrink-0"
            title="Scroll navigation left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <nav
            ref={desktopNavRef}
            id="desktop-navigation"
            className="flex-1 flex items-center gap-1 bg-white/60 backdrop-blur-md px-1.5 py-1 rounded-full border border-season-badge-border/80 shadow-xs overflow-x-auto scrollbar-none scroll-smooth min-w-0"
          >
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-[11px] xl:text-xs transition-all px-2 xl:px-2.5 py-0.5 xl:py-1 rounded-full cursor-pointer whitespace-nowrap font-medium shrink-0 ${
                    isSelected
                      ? 'bg-season-badge-bg font-bold text-season-accent shadow-xs border border-season-badge-border/80'
                      : 'text-[#6e5d4e] hover:text-[#2c1d11] hover:bg-white/50'
                  }`}
                >
                  {scriptMode === 'bilingual' ? item.labelHi : item.labelEn}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => scrollDesktopNav('right')}
            className="p-1 rounded-full text-[#7a695a] hover:text-[#2c1d11] hover:bg-white/80 transition-all cursor-pointer shrink-0"
            title="Scroll navigation right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 shrink-0">
          {/* Seasonal Theme Switcher */}
          <SeasonThemeSelector
            currentSeason={currentSeason}
            onSelectSeason={onSelectSeason}
            isAutoMode={isAutoMode}
          />

          {/* Language / View Mode Toggle */}
          <div id="script-mode-selector" className="flex items-center bg-white/60 backdrop-blur-md rounded-full p-0.5 border border-[#e5d8c7]/80 text-[10px] sm:text-xs shrink-0">
            <button
              id="lang-select-english"
              onClick={() => setScriptMode('all')}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer font-semibold uppercase ${
                scriptMode === 'all' || scriptMode === 'trilingual'
                  ? 'bg-season-accent text-white shadow-xs font-bold'
                  : 'text-[#6e5d4e] hover:text-[#2c1d11]'
              }`}
              title="English presentation"
            >
              <span className="hidden xl:inline">English</span>
              <span className="xl:hidden">EN</span>
            </button>
            <button
              id="lang-select-hindi"
              onClick={() => setScriptMode('bilingual')}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs transition-all cursor-pointer flex items-center gap-0.5 font-medium ${
                scriptMode === 'bilingual'
                  ? 'bg-season-accent text-white font-bold shadow-xs'
                  : 'text-[#6e5d4e] hover:text-[#2c1d11]'
              }`}
              title="हिंदी (Hindi) presentation"
            >
              <span>हिंदी</span>
            </button>
          </div>

          {/* Pronunciation & Nature Sound Toggle */}
          <div className="flex items-center relative shrink-0">
            {showAudioFeedback && (
              <div
                className="absolute -bottom-8 right-0 bg-[#2c1d11]/90 backdrop-blur-md text-white text-[10px] font-sans px-2.5 py-1 rounded-full border border-[#e5d8c7] shadow-xl whitespace-nowrap z-50 animate-fadeIn pointer-events-none"
              >
                {showAudioFeedback}
              </div>
            )}

            <button
              id="global-sound-mute-toggle-btn"
              onClick={handleToggleMute}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center backdrop-blur-md shrink-0 ${
                isMuted
                  ? 'bg-rose-50/80 text-rose-700 border-rose-300'
                  : 'bg-white/70 border-season-badge-border hover:bg-white text-season-accent ring-2 ring-season-accent/20'
              }`}
              title={isMuted ? 'Sound effects & voice are MUTED. Click to Unmute' : 'Sound effects & voice are ON. Click to Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-season-accent animate-pulse" />
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
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-102 cursor-pointer shrink-0"
          >
            <Feather className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xl:inline">{scriptMode === 'bilingual' ? 'कहानी साझा करें' : 'Share Story'}</span>
            <span className="hidden sm:inline xl:hidden">{scriptMode === 'bilingual' ? 'साझा' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Header Horizontal Tab Scrollbar for Mobile & Tablet with Left & Right scroll buttons */}
      <div className="flex lg:hidden items-center gap-1 px-2 pt-1.5 pb-0.5 border-t border-season-badge-border/50 mt-1.5 bg-[#fdfbf7]/80 backdrop-blur-xl">
        <button
          onClick={() => scrollMobileNav('left')}
          className="p-1 rounded-full text-[#7a695a] hover:text-[#2c1d11] hover:bg-white/80 transition-all shrink-0 cursor-pointer"
          title="Scroll tabs left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div
          ref={mobileNavRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-none scroll-smooth"
        >
          {navItems.map((item) => {
            const isSelected = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 text-[11px] px-3 py-1 rounded-full transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  isSelected
                    ? 'font-bold text-season-accent bg-season-badge-bg shadow-xs border border-season-badge-border'
                    : 'text-[#7a695a] hover:text-[#2c1d11]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{scriptMode === 'bilingual' ? item.labelHi : item.labelEn}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollMobileNav('right')}
          className="p-1 rounded-full text-[#7a695a] hover:text-[#2c1d11] hover:bg-white/80 transition-all shrink-0 cursor-pointer"
          title="Scroll tabs right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
