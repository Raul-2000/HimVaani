import React from 'react';
import { Heart, Compass, BookOpen, MessageSquare, PenTool, History, Github } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'places' | 'learn' | 'community' | 'studio' | 'history') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer id="main-app-footer" className="relative border-t border-white/10 bg-[#142223] pt-16 pb-12 overflow-hidden text-white">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#c5a059]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8a6d35] flex items-center justify-center shadow-lg">
                <span className="font-takri text-2xl text-[#1a2a2c] font-bold">𑚔</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-wider block">
                  HIMVANI TAKRI
                </span>
                <span className="text-xs text-[#c5a059] font-takri">𑚩𑚮𑚢𑚭𑚏𑚥 𑚜𑚤𑚴𑚩𑚤</span>
              </div>
            </div>

            <p className="text-xs text-white/60 font-light italic leading-relaxed">
              Dedicated to preserving, teaching, and reviving the historic indigenous Takri script of Himachal Pradesh for future generations.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Platform Hubs
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button
                  onClick={() => setActiveTab('places')}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Himachal Places in Takri</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Alphabet & Stroke Practice</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('community')}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>चौपाल Community Board</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Takri Script Translator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('history')}
                  className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <History className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>1,200-Year History</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Valleys */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Hill State Kingdoms
            </h4>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li className="flex items-center justify-between">
                <span>Chamba (Ravi Valley)</span>
                <span className="font-takri text-[#dfbe7b]">𑚏𑚢𑚠𑚭</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kangra (Trigarta)</span>
                <span className="font-takri text-[#dfbe7b]">𑚊𑚭𑚫𑚍𑚚𑚭</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mandi (Zahir)</span>
                <span className="font-takri text-[#dfbe7b]">𑚢𑚉𑚫𑚖𑚯</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kullu (Kulanthpitha)</span>
                <span className="font-takri text-[#dfbe7b]">𑚊𑚰𑚥𑚥𑚰</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Spiti & Lahaul</span>
                <span className="font-takri text-[#dfbe7b]">𑚨𑚞𑚮𑚙𑚯</span>
              </li>
            </ul>
          </div>

          {/* Script Unicode Info */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Unicode Standard
            </h4>
            <div className="p-4 rounded-2xl bg-black/20 border border-white/10 space-y-2">
              <div className="text-xs text-white/70 font-mono">
                Block: U+11680–U+116CF
              </div>
              <div className="font-takri text-xl text-[#dfbe7b] font-bold">
                𑚀𑚁𑚂𑚃𑚄𑚅 • 𑚊𑚋𑚌𑚍
              </div>
              <p className="text-[10px] text-white/50 font-light">
                Rendered with Noto Sans Takri font & Himachal typography.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and developer credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>Preserved with</span>
            <Heart className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059] inline" />
            <span>for Devbhumi Himachal Pradesh</span>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              <Github className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Created by</span>
              <a
                id="github-developer-link"
                href="https://github.com/Raul-2000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c5a059] hover:text-[#dfbe7b] underline underline-offset-2 transition-colors font-semibold"
              >
                Raul-2000
              </a>
            </div>
          </div>

          <div className="font-takri text-sm text-[#dfbe7b]">
            𑚩𑚮𑚢𑚭𑚏𑚥 𑚞𑚤𑚛𑚲𑚧 𑚜𑚤𑚴𑚩𑚤 • 𑚔𑚭𑚊𑚤𑚯
          </div>
        </div>
      </div>
    </footer>
  );
};
