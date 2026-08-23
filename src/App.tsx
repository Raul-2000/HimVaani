import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PlacesSection } from './components/PlacesSection';
import { TraditionsSection } from './components/TraditionsSection';
import { LearnSection } from './components/LearnSection';
import { CommunitySection } from './components/CommunitySection';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import { ScriptMode, HimachalSeason, HeritagePillarId } from './types';
import { getCurrentHimachalSeason, applySeasonalTheme } from './utils/seasons';

export default function App() {
  const [activeTab, setActiveTab] = useState<'places' | 'traditions' | 'learn' | 'community' | 'history'>('places');
  const [selectedPillarId, setSelectedPillarId] = useState<HeritagePillarId>('architecture');
  const [scriptMode, setScriptMode] = useState<ScriptMode>('all');
  const [openCommunityComposer, setOpenCommunityComposer] = useState(false);

  // Himachal Seasonal Theme state
  const [currentSeason, setCurrentSeason] = useState<HimachalSeason>(() => {
    const saved = localStorage.getItem('himachal_season');
    if (saved === 'spring' || saved === 'summer' || saved === 'monsoon' || saved === 'autumn' || saved === 'winter') {
      return saved as HimachalSeason;
    }
    return getCurrentHimachalSeason();
  });
  const [isAutoSeason, setIsAutoSeason] = useState<boolean>(() => {
    return localStorage.getItem('himachal_season_auto') !== 'false';
  });

  useEffect(() => {
    applySeasonalTheme(currentSeason);
  }, [currentSeason]);

  const handleSelectSeason = (season: HimachalSeason, isAuto: boolean) => {
    setCurrentSeason(season);
    setIsAutoSeason(isAuto);
    localStorage.setItem('himachal_season', season);
    localStorage.setItem('himachal_season_auto', String(isAuto));
    applySeasonalTheme(season);
  };

  const handleOpenLearn = () => {
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTradition = (pillarId: HeritagePillarId) => {
    if (pillarId === 'locations') {
      setActiveTab('places');
      setTimeout(() => {
        const el = document.getElementById('himachal-places-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setSelectedPillarId(pillarId);
      setActiveTab('traditions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenQuickPost = () => {
    setActiveTab('community');
    setOpenCommunityComposer(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-[#fcfaf7] text-[#2c1d11] selection:bg-[#f5e6d3] selection:text-[#78350f] flex flex-col font-sans relative overflow-x-hidden transition-colors duration-500"
      style={{ background: 'radial-gradient(circle at top, var(--season-bg-start, #fbf7ef) 0%, #fcfaf7 100%)' }}
    >
      {/* Subtle Himalayan Mountain Pattern Motif */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 w-full h-[420px] pointer-events-none opacity-5 mountain-natural-texture" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcfaf7]/40 to-[#fcfaf7] pointer-events-none" />
      </div>

      {/* Floating Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        scriptMode={scriptMode}
        setScriptMode={setScriptMode}
        onOpenQuickPost={handleOpenQuickPost}
        currentSeason={currentSeason}
        onSelectSeason={handleSelectSeason}
        isAutoMode={isAutoSeason}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">
        {/* Hero Banner on Places tab */}
        {activeTab === 'places' && (
          <HeroBanner
            scriptMode={scriptMode}
            currentSeason={currentSeason}
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
            onSelectTradition={handleSelectTradition}
          />
        )}

        {/* Tab 1: Himachal Places & Peaks Section */}
        {activeTab === 'places' && (
          <PlacesSection
            scriptMode={scriptMode}
            onOpenStudioWithText={handleOpenLearn}
          />
        )}

        {/* Tab 2: Living Traditions Explorer */}
        {activeTab === 'traditions' && (
          <TraditionsSection
            scriptMode={scriptMode}
            initialPillarId={selectedPillarId}
            onExplorePlacesClick={() => {
              setActiveTab('places');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 3: Learn Takri Aksharmala */}
        {activeTab === 'learn' && (
          <LearnSection
            scriptMode={scriptMode}
            onOpenStudio={handleOpenLearn}
          />
        )}

        {/* Tab 4: Community Board */}
        {activeTab === 'community' && (
          <CommunitySection
            scriptMode={scriptMode}
            initialOpenComposer={openCommunityComposer}
          />
        )}

        {/* Tab 5: History & Chronicles */}
        {activeTab === 'history' && (
          <HistorySection scriptMode={scriptMode} />
        )}
      </main>

      {/* Footer */}
      <Footer
        scriptMode={scriptMode}
        onNavigate={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
