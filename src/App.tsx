import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PlacesSection } from './components/PlacesSection';
import { LearnSection } from './components/LearnSection';
import { CommunitySection } from './components/CommunitySection';
import { ScriptStudio } from './components/ScriptStudio';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import { ScriptMode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'places' | 'learn' | 'community' | 'studio' | 'history'>('places');
  const [scriptMode, setScriptMode] = useState<ScriptMode>('all');
  const [studioPrefilledText, setStudioPrefilledText] = useState<string>('');
  const [openCommunityComposer, setOpenCommunityComposer] = useState(false);

  const handleOpenStudioWithText = (text: string) => {
    setStudioPrefilledText(text);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickPost = () => {
    setActiveTab('community');
    setOpenCommunityComposer(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#1a2a2c] text-[#f0f4f4] selection:bg-[#c5a059] selection:text-[#1a2a2c] flex flex-col font-sans relative overflow-x-hidden" style={{ background: 'radial-gradient(circle at top, #2d4548 0%, #1a2a2c 100%)' }}>
      {/* Natural Tones Mountain Geometry Motif from design */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 w-full h-[420px] pointer-events-none opacity-15 mountain-natural-texture" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a2a2c]/30 to-[#1a2a2c]/80 pointer-events-none" />
      </div>

      {/* Floating Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        scriptMode={scriptMode}
        setScriptMode={setScriptMode}
        onOpenQuickPost={handleOpenQuickPost}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">
        {/* Hero Banner (Always visible on Places & Learn for strong visual identity) */}
        {activeTab === 'places' && (
          <HeroBanner
            scriptMode={scriptMode}
            onLearnClick={() => {
              setActiveTab('learn');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExplorePlacesClick={() => {
              const el = document.getElementById('himachal-places-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onCommunityClick={() => {
              setActiveTab('community');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStudioClick={() => {
              setActiveTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab Sections */}
        {activeTab === 'places' && (
          <PlacesSection
            scriptMode={scriptMode}
            onOpenStudioWithText={handleOpenStudioWithText}
          />
        )}

        {activeTab === 'learn' && (
          <div className="pt-24">
            <LearnSection
              scriptMode={scriptMode}
              onOpenStudio={() => {
                setActiveTab('studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="pt-24">
            <CommunitySection
              scriptMode={scriptMode}
              initialOpenComposer={openCommunityComposer}
            />
          </div>
        )}

        {activeTab === 'studio' && (
          <div className="pt-24">
            <ScriptStudio prefilledText={studioPrefilledText} />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="pt-24">
            <HistorySection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
