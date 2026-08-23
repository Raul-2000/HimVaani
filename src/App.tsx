import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { PlacesSection } from './components/PlacesSection';
import { DistrictsSection } from './components/DistrictsSection';
import { TraditionsSection } from './components/TraditionsSection';
import { LanguagesSection } from './components/LanguagesSection';
import { FestivalsSection } from './components/FestivalsSection';
import { GallerySection } from './components/GallerySection';
import { LearnSection } from './components/LearnSection';
import { CommunitySection } from './components/CommunitySection';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import { SeasonalAtmosphere } from './components/SeasonalAtmosphere';
import { ScriptMode, HimachalSeason, HeritagePillarId, NavigationTab } from './types';
import { getCurrentHimachalSeason, applySeasonalTheme } from './utils/seasons';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
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

  const handleOpenTakri = () => {
    setActiveTab('takri');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPillar = (pillarId: HeritagePillarId) => {
    if (pillarId === 'locations') {
      setActiveTab('explore');
    } else {
      setSelectedPillarId(pillarId);
      setActiveTab('culture');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickPost = () => {
    setActiveTab('community');
    setOpenCommunityComposer(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen text-[#2c1d11] selection:bg-[#f5e6d3] selection:text-[#78350f] flex flex-col font-sans relative overflow-x-hidden transition-colors duration-500"
      style={{ background: 'radial-gradient(circle at top, var(--season-bg-start, #fbf7ef) 0%, #f7f2ea 100%)' }}
    >
      {/* Majestic Himalayan Mountain 3D Aesthetic Real Panorama Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Real Mountain Panorama Image */}
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85"
          alt="Himalayan Mountain Peaks"
          className="w-full h-full object-cover object-center opacity-35 saturate-90 brightness-95 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Layered mountain mist & atmospheric lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--season-body-bg,#fcfaf7)]/55 to-[var(--season-body-bg,#fcfaf7)]/90" />
        <div className="absolute -top-24 left-0 right-0 h-96 bg-gradient-to-b from-[var(--season-bg-start,#fbf7ef)]/70 to-transparent" />
        {/* Drifting Himalayan Clouds */}
        <div className="absolute top-1/4 -left-1/3 w-[160%] h-80 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-3xl animate-mist pointer-events-none" />
      </div>

      {/* Seasonal Atmospheric Particles & Weather Canvas */}
      <SeasonalAtmosphere currentSeason={currentSeason} />

      {/* Floating Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        scriptMode={scriptMode}
        setScriptMode={setScriptMode}
        onOpenQuickPost={handleOpenQuickPost}
        currentSeason={currentSeason}
        onSelectSeason={handleSelectSeason}
        isAutoMode={isAutoSeason}
      />

      {/* Main Content Area */}
      <main className={`relative z-10 flex-1 ${activeTab !== 'home' ? 'pt-28 sm:pt-32 xl:pt-24' : ''}`}>
        {/* 1. Home Section */}
        {activeTab === 'home' && (
          <HomeSection
            scriptMode={scriptMode}
            currentSeason={currentSeason}
            onNavigate={handleNavigate}
            onSelectPillar={handleSelectPillar}
          />
        )}

        {/* 2. Explore Himachal (50 Places & Peaks) */}
        {activeTab === 'explore' && (
          <PlacesSection
            scriptMode={scriptMode}
            onOpenStudioWithText={handleOpenTakri}
          />
        )}

        {/* 3. Featured 12 Districts */}
        {activeTab === 'districts' && (
          <DistrictsSection
            scriptMode={scriptMode}
            onExplorePlacesClick={() => handleNavigate('explore')}
          />
        )}

        {/* 4. Culture / Living Traditions (6 Pillars) */}
        {activeTab === 'culture' && (
          <TraditionsSection
            scriptMode={scriptMode}
            initialPillarId={selectedPillarId}
            onExplorePlacesClick={() => handleNavigate('explore')}
          />
        )}

        {/* 5. Languages of Himachal */}
        {activeTab === 'languages' && (
          <LanguagesSection
            scriptMode={scriptMode}
            onOpenTakriScript={() => handleNavigate('takri')}
          />
        )}

        {/* 6. Heritage (Architecture & Sacred Shrines) */}
        {activeTab === 'heritage' && (
          <TraditionsSection
            scriptMode={scriptMode}
            initialPillarId="architecture"
            onExplorePlacesClick={() => handleNavigate('explore')}
          />
        )}

        {/* 7. History & Chronicles Timeline */}
        {activeTab === 'history' && (
          <HistorySection scriptMode={scriptMode} />
        )}

        {/* 8. Fairs & Festivals */}
        {activeTab === 'festivals' && (
          <FestivalsSection scriptMode={scriptMode} />
        )}

        {/* 9. Visual Heritage Gallery */}
        {activeTab === 'gallery' && (
          <GallerySection scriptMode={scriptMode} />
        )}

        {/* 10. Community Stories & Folklore Chaupal */}
        {activeTab === 'community' && (
          <CommunitySection
            scriptMode={scriptMode}
            initialOpenComposer={openCommunityComposer}
          />
        )}

        {/* 11. Takri Script Section */}
        {activeTab === 'takri' && (
          <LearnSection
            scriptMode={scriptMode}
            onOpenStudio={handleOpenTakri}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        scriptMode={scriptMode}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
