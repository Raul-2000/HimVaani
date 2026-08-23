import React from 'react';
import {
  Heart,
  Compass,
  BookOpen,
  MessageSquare,
  History,
  Github,
  Sparkles,
  MapPin,
  Flame,
  Landmark,
  Utensils,
  ScrollText,
} from 'lucide-react';
import { ScriptMode, HeritagePillarId } from '../types';

interface FooterProps {
  setActiveTab?: (tab: 'places' | 'traditions' | 'learn' | 'community' | 'history') => void;
  onNavigate?: (tab: string) => void;
  scriptMode?: ScriptMode;
  onSelectPillar?: (pillarId: HeritagePillarId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onNavigate,
  scriptMode = 'all',
}) => {
  const handleNav = (tab: 'places' | 'traditions' | 'learn' | 'community' | 'history') => {
    if (onNavigate) {
      onNavigate(tab);
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  const isBilingual = scriptMode === 'bilingual';

  return (
    <footer
      id="main-app-footer"
      className="relative border-t border-season-badge-border bg-[#1c120c] pt-16 pb-12 overflow-hidden text-white transition-colors duration-500"
    >
      {/* Dynamic Seasonal Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl pointer-events-none opacity-25"
        style={{ backgroundColor: 'var(--season-accent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all"
                style={{ backgroundColor: 'var(--season-accent)' }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-wide block">
                  HIMVAANI
                </span>
                <span
                  className="text-xs font-semibold block"
                  style={{ color: 'var(--season-accent-light, #d5be9d)' }}
                >
                  हिमवाणी • हिमाचल धरोहर
                </span>
              </div>
            </div>

            <p className="text-xs text-white/75 font-normal leading-relaxed">
              {isBilingual
                ? 'हिमाचल दर्शन एवं संस्कृति संरक्षण। देवभूमि के 12 जिलों की पारंपरिक वास्तुकला, धाम, लोकगाथाओं, मेलों और ऐतिहासिक पांडुलिपियों का समग्र डिजिटल संग्रह।'
                : 'Explore Himachal, Conserve Its Traditions. Dedicated to documenting, celebrating, and conserving the living cultural heritage, timber architecture, sacred fairs, cuisines, and historical chronicles of Devbhoomi Himachal Pradesh.'}
            </p>

            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-medium"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'var(--season-accent)',
                color: 'var(--season-accent-light, #f5d0a9)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--season-accent)' }} />
              <span>देवभूमि हिमाचल प्रदेश धरोहर मंच</span>
            </div>
          </div>

          {/* Column 2: Navigation Hubs */}
          <div className="space-y-3.5 text-left">
            <h4
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'var(--season-accent-light, #d5be9d)' }}
            >
              {isBilingual ? 'मुख्य अनुभाग (Navigation)' : 'HimVaani Sections'}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button
                  onClick={() => handleNav('places')}
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left group"
                >
                  <MapPin className="w-3.5 h-3.5 transition-transform group-hover:scale-110" style={{ color: 'var(--season-accent)' }} />
                  <span className="group-hover:underline underline-offset-2">
                    {isBilingual ? 'स्थान व घाटियां (12 Districts)' : '12 Districts & Major Valleys'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('traditions')}
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left group"
                >
                  <Landmark className="w-3.5 h-3.5 transition-transform group-hover:scale-110" style={{ color: 'var(--season-accent)' }} />
                  <span className="group-hover:underline underline-offset-2">
                    {isBilingual ? '६ धरोहर स्तम्भ (Living Traditions)' : '6 Pillars of Living Traditions'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('community')}
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left group"
                >
                  <MessageSquare className="w-3.5 h-3.5 transition-transform group-hover:scale-110" style={{ color: 'var(--season-accent)' }} />
                  <span className="group-hover:underline underline-offset-2">
                    {isBilingual ? 'सामुदायिक संवाद (Community Sangam)' : 'Community Sangam & Chaupal'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('learn')}
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left group"
                >
                  <BookOpen className="w-3.5 h-3.5 transition-transform group-hover:scale-110" style={{ color: 'var(--season-accent)' }} />
                  <span className="group-hover:underline underline-offset-2">
                    {isBilingual ? 'अक्षर व लिपि स्टूडियो (Script & Cards)' : 'Script Studio & Inscriptions'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('history')}
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left group"
                >
                  <History className="w-3.5 h-3.5 transition-transform group-hover:scale-110" style={{ color: 'var(--season-accent)' }} />
                  <span className="group-hover:underline underline-offset-2">
                    {isBilingual ? 'इतिहास व वृत्तांत (Heritage Chronicles)' : 'Historical Chronicles & Timeline'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Regional Valleys of Himachal */}
          <div className="space-y-3.5 text-left">
            <h4
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'var(--season-accent-light, #d5be9d)' }}
            >
              {isBilingual ? 'प्रमुख घाटियां (Valleys)' : 'Himachal Valleys'}
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span>Chamba (Ravi Valley)</span>
                <span className="font-semibold text-[11px]" style={{ color: 'var(--season-accent-light)' }}>
                  चम्बा
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span>Kangra (Trigarta Valley)</span>
                <span className="font-semibold text-[11px]" style={{ color: 'var(--season-accent-light)' }}>
                  कांगड़ा
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span>Kullu & Parvati (Kulanthpitha)</span>
                <span className="font-semibold text-[11px]" style={{ color: 'var(--season-accent-light)' }}>
                  कुल्लू
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span>Mandi & Suket (Beas Basin)</span>
                <span className="font-semibold text-[11px]" style={{ color: 'var(--season-accent-light)' }}>
                  मंडी
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span>Kinnaur & Spiti (Trans-Himalaya)</span>
                <span className="font-semibold text-[11px]" style={{ color: 'var(--season-accent-light)' }}>
                  किन्नौर व स्पीति
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Living Cultural Conservation */}
          <div className="space-y-3.5 text-left">
            <h4
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'var(--season-accent-light, #d5be9d)' }}
            >
              {isBilingual ? 'सांस्कृतिक संरक्षण' : 'Cultural Pillars'}
            </h4>
            <div
              className="p-4 rounded-2xl border space-y-2.5 transition-colors"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
              }}
            >
              <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--season-accent-light, #f5d0a9)' }}>
                <ScrollText className="w-4 h-4" style={{ color: 'var(--season-accent)' }} />
                <span>Living Heritage Archive</span>
              </div>
              <p className="text-[11px] text-white/70 font-light leading-relaxed">
                Documenting Kath-Kuni wooden fortresses, hereditary Boti Dham cuisines, sacred Devta processions, and century-old copper plate charters.
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                {['#KathKuni', '#HimachaliDham', '#Devbhoomi', '#KulluDussehra'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] px-2 py-0.5 rounded-md font-mono"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--season-accent-light, #f5d0a9)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Developer Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>Preserved with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>for Devbhoomi Himachal Pradesh</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <Github className="w-3.5 h-3.5" style={{ color: 'var(--season-accent-light, #d5be9d)' }} />
              <span>Created by</span>
              <a
                id="github-developer-link"
                href="https://github.com/Raul-2000"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors font-semibold"
                style={{ color: 'var(--season-accent-light, #f5d0a9)' }}
              >
                Raul-2000
              </a>
            </div>
          </div>

          <div
            className="text-xs font-serif font-semibold tracking-wide"
            style={{ color: 'var(--season-accent-light, #f5d0a9)' }}
          >
            देवभूमि हिमाचल प्रदेश धरोहर • हिमवाणी (HimVaani)
          </div>
        </div>
      </div>
    </footer>
  );
};


