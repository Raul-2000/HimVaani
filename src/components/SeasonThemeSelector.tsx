import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Check, ChevronDown, Compass, Flower2, Sun, CloudRain, Leaf, Snowflake } from 'lucide-react';
import { HimachalSeason, HIMACHAL_SEASONS, getCurrentHimachalSeason } from '../utils/seasons';

interface SeasonThemeSelectorProps {
  currentSeason: HimachalSeason;
  onSelectSeason: (season: HimachalSeason, isAuto: boolean) => void;
  isAutoMode: boolean;
}

export const SeasonThemeSelector: React.FC<SeasonThemeSelectorProps> = ({
  currentSeason,
  onSelectSeason,
  isAutoMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeSeasonData = HIMACHAL_SEASONS[currentSeason] || HIMACHAL_SEASONS.summer;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const seasonsList: HimachalSeason[] = ['spring', 'summer', 'monsoon', 'autumn', 'winter'];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left" id="himachal-season-theme-switcher">
      {/* Trigger Button */}
      <button
        id="season-switcher-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer text-xs font-semibold backdrop-blur-md shadow-sm hover:scale-[1.02]"
        style={{
          backgroundColor: activeSeasonData.badgeBg,
          borderColor: activeSeasonData.badgeBorder,
          color: activeSeasonData.badgeText,
        }}
        title={`Himachal Seasonal Theme: ${activeSeasonData.nameEnglish} (${activeSeasonData.nameTakri})`}
      >
        <span className="text-base leading-none">{activeSeasonData.icon}</span>
        <span className="font-bold">
          {activeSeasonData.nameEnglish.split(' ')[0]}
        </span>
        <span className="font-takri text-xs font-bold sm:ml-0.5 opacity-90 hidden min-[400px]:inline">
          {activeSeasonData.nameTakri.split(' ')[0]}
        </span>
        {isAutoMode && (
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-widest font-mono font-bold hidden md:inline border"
            style={{
              backgroundColor: activeSeasonData.badgeBorder,
              borderColor: activeSeasonData.badgeText,
              color: activeSeasonData.badgeText,
            }}
          >
            Auto
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="season-switcher-dropdown-menu"
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#fdfcf9] border border-[#e5d8c7] p-3 shadow-xl z-50 animate-fadeIn space-y-2"
          style={{
            boxShadow: `0 16px 36px -8px rgba(44, 29, 17, 0.18), 0 0 20px -4px ${activeSeasonData.accentGlow}`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#e5d8c7]">
            <div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4" style={{ color: activeSeasonData.accentColor }} />
                <h4 className="text-xs font-bold text-[#2c1d11] uppercase tracking-wider">Himachal Seasons (ऋतु)</h4>
              </div>
              <p className="text-[11px] text-[#7a695a]">Choose aesthetic Himalayan theme</p>
            </div>
            <button
              id="season-auto-detect-btn"
              onClick={() => {
                const autoSeason = getCurrentHimachalSeason();
                onSelectSeason(autoSeason, true);
                setIsOpen(false);
              }}
              className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-semibold ${
                isAutoMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                  : 'bg-white text-[#5c4a3b] hover:text-[#2c1d11] border-[#e5d8c7] hover:bg-[#f5ece2]'
              }`}
              title="Synchronize with current live calendar month in Himachal Pradesh"
            >
              {isAutoMode ? '✓ Auto Live' : 'Auto Month'}
            </button>
          </div>

          {/* Season Options */}
          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {seasonsList.map((sKey) => {
              const season = HIMACHAL_SEASONS[sKey];
              const isSelected = currentSeason === sKey;

              return (
                <button
                  key={sKey}
                  id={`season-option-${sKey}`}
                  onClick={() => {
                    onSelectSeason(sKey, false);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-white shadow-sm border-2'
                      : 'hover:bg-[#f7f2ea] border-[#ebd8c5]/50 bg-white/70'
                  }`}
                  style={{
                    borderColor: isSelected ? season.accentColor : '#ebd8c5',
                    backgroundColor: isSelected ? season.badgeBg : '#ffffff',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base shadow-xs"
                    style={{
                      backgroundColor: season.badgeBg,
                      border: `1px solid ${season.badgeBorder}`,
                    }}
                  >
                    {season.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-[#2c1d11] flex items-center gap-1.5">
                        {season.nameEnglish}
                      </span>
                      <span className="font-takri text-sm font-bold" style={{ color: season.accentColor }}>
                        {season.nameTakri}
                      </span>
                    </div>

                    <div className="text-[10px] text-[#7a695a] flex items-center gap-2 mt-0.5">
                      <span className="font-medium text-[#2c1d11]">{season.nameHindi}</span>
                      <span>•</span>
                      <span>{season.calendarMonths}</span>
                    </div>

                    <p className="text-[10px] text-[#5c4a3b] line-clamp-1 mt-0.5">
                      {season.motifs}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="shrink-0 pt-1">
                      <Check className="w-4 h-4" style={{ color: season.accentColor }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="pt-2 border-t border-[#e5d8c7] px-2 flex items-center justify-between text-[10px] text-[#7a695a]">
            <span>Harmonious Palette</span>
            <span className="font-takri font-bold" style={{ color: activeSeasonData.accentColor }}>𑚩𑚮𑚢𑚭𑚏𑚥 𑚜𑚤𑚴𑚩𑚤</span>
          </div>
        </div>
      )}
    </div>
  );
};
