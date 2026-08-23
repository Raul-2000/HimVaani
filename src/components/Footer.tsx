import React from 'react';
import { Heart, Compass, BookOpen, MessageSquare, History, Github } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'places' | 'learn' | 'community' | 'history') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer id="main-app-footer" className="relative border-t border-[#e2d5c3] bg-[#22160d] pt-16 pb-12 overflow-hidden text-white">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#8a4b17]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8a4b17] border border-[#a8652d] flex items-center justify-center shadow-lg">
                <span className="font-takri text-2xl text-white font-bold">𑚔</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-wider block">
                  HIMVAANI
                </span>
                <span className="text-xs text-[#d5be9d] font-takri font-bold">𑚩𑚮𑚢𑚭𑚏𑚥 𑚜𑚤𑚴𑚩𑚤</span>
              </div>
            </div>

            <p className="text-xs text-white/70 font-light italic leading-relaxed">
              Explore Himachal, Conserve Its Traditions. Dedicated to preserving, sharing, and revitalizing the living cultural heritage, architecture, folklore, and indigenous Takri script of Himachal Pradesh.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5be9d]">
              HimVaani Hubs
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => setActiveTab('places')}
                  className="hover:text-[#e8a36e] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#d5be9d]" />
                  <span>50 Himachal Places & Traditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="hover:text-[#e8a36e] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#d5be9d]" />
                  <span>Learn Section (वर्णमाला)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('community')}
                  className="hover:text-[#e8a36e] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#d5be9d]" />
                  <span>चौपाल (Community Board)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('history')}
                  className="hover:text-[#e8a36e] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <History className="w-3.5 h-3.5 text-[#d5be9d]" />
                  <span>Heritage Chronicles (इतिहास)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Valleys */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5be9d]">
              Himachal Valleys & Traditions
            </h4>
            <ul className="space-y-1.5 text-xs text-white/70">
              <li className="flex items-center justify-between">
                <span>Chamba (Ravi Valley)</span>
                <span className="font-takri text-[#e8a36e] font-bold">𑚏𑚢𑚠𑚭</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kangra (Trigarta Valley)</span>
                <span className="font-takri text-[#e8a36e] font-bold">𑚊𑚭𑚫𑚍𑚚𑚭</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mandi (Zahir / Suket)</span>
                <span className="font-takri text-[#e8a36e] font-bold">𑚢𑚉𑚫𑚖𑚯</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kullu (Kulanthpitha)</span>
                <span className="font-takri text-[#e8a36e] font-bold">𑚊𑚰𑚥𑚥𑚰</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Spiti & Kinnaur</span>
                <span className="font-takri text-[#e8a36e] font-bold">𑚨𑚞𑚮𑚙𑚯</span>
              </li>
            </ul>
          </div>

          {/* Script Unicode Info */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5be9d]">
              Cultural Conservation
            </h4>
            <div className="p-4 rounded-2xl bg-[#2e1f14] border border-[#443021] space-y-2">
              <div className="text-xs text-[#d5be9d] font-mono">
                Preserving Himachal Legacy
              </div>
              <div className="font-takri text-xl text-[#e8a36e] font-bold">
                𑚀𑚁𑚂𑚃𑚄𑚅 • 𑚊𑚋𑚌𑚍
              </div>
              <p className="text-[10px] text-white/60 font-light">
                Documenting Kath-Kuni temples, authentic folklore, pahari dham cuisines & sacred shrines.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and developer credits */}
        <div className="pt-8 border-t border-[#443021] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>Preserved with</span>
            <Heart className="w-3.5 h-3.5 fill-[#d5be9d] text-[#d5be9d] inline" />
            <span>for Devbhumi Himachal Pradesh</span>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 bg-[#2e1f14] px-2.5 py-1 rounded-lg border border-[#443021]">
              <Github className="w-3.5 h-3.5 text-[#d5be9d]" />
              <span>Created by</span>
              <a
                id="github-developer-link"
                href="https://github.com/Raul-2000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8a36e] hover:text-[#f3c29b] underline underline-offset-2 transition-colors font-semibold"
              >
                Raul-2000
              </a>
            </div>
          </div>

          <div className="font-takri text-sm text-[#e8a36e] font-bold">
            𑚩𑚮𑚢𑚭𑚏𑚥 𑚞𑚤𑚛𑚲𑚧 𑚜𑚤𑚴𑚩𑚤 • 𑚩𑚮𑚢𑚪𑚭𑚘𑚯
          </div>
        </div>
      </div>
    </footer>
  );
};

