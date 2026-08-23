import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PlacesSection } from './components/PlacesSection';
import { TraditionsSection } from './components/TraditionsSection';
import { LearnSection } from './components/LearnSection';
import { CommunitySection } from './components/CommunitySection';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import { SeasonalAtmosphere } from './components/SeasonalAtmosphere';
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
      className="min-h-screen text-[#2c1d11] selection:bg-[#f5e6d3] selection:text-[#78350f] flex flex-col font-sans relative overflow-x-hidden transition-colors duration-500"
      style={{ background: 'radial-gradient(circle at top, var(--season-bg-start, #fbf7ef) 0%, #f7f2ea 100%)' }}
    >
      {/* Majestic Himalayan Mountain Real Landscape Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Real Mountain Panorama Image */}
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85"
          alt="Himalayan Mountain Peaks"
          className="w-full h-full object-cover object-center opacity-30 saturate-85 brightness-95 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Layered mountain mist & atmospheric lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--season-body-bg,#fcfaf7)]/60 to-[var(--season-body-bg,#fcfaf7)]/90" />
        <div className="absolute -top-24 left-0 right-0 h-96 bg-gradient-to-b from-[var(--season-bg-start,#fbf7ef)]/70 to-transparent" />
        {/* Drifting Himalayan Clouds */}
        <div className="absolute top-1/4 -left-1/3 w-[160%] h-80 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-3xl animate-mist pointer-events-none" />
      </div>

      {/* Seasonal Atmospheric Particles & Weather Canvas */}
      <SeasonalAtmosphere currentSeason={currentSeason} />

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
      <main className={`relative z-10 flex-1 ${activeTab !== 'places' ? 'pt-32 sm:pt-36 xl:pt-24' : ''}`}>
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
