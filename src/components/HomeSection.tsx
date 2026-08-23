import React from 'react';
import { HeroBanner } from './HeroBanner';
import { ScriptMode, HimachalSeason, NavigationTab, HeritagePillarId } from '../types';
import { HIMACHAL_DISTRICTS } from '../data/himachalDistricts';
import { HIMACHAL_LANGUAGES } from '../data/himachalLanguages';
import { HIMACHAL_FESTIVALS } from '../data/himachalFestivals';
import { HIMACHAL_GALLERY } from '../data/himachalGallery';
import { 
  Compass, 
  MapPin, 
  Award, 
  Calendar, 
  Languages, 
  BookOpen, 
  Feather, 
  Image as ImageIcon, 
  ArrowRight, 
  Sparkles,
  Mountain,
  Music,
  Home as HomeIcon,
  Utensils
} from 'lucide-react';

interface HomeSectionProps {
  scriptMode: ScriptMode;
  currentSeason: HimachalSeason;
  onNavigate: (tab: NavigationTab) => void;
  onSelectPillar: (pillarId: HeritagePillarId) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  scriptMode,
  currentSeason,
  onNavigate,
  onSelectPillar
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <HeroBanner
        scriptMode={scriptMode}
        currentSeason={currentSeason}
        onExploreClick={() => onNavigate('explore')}
        onPillarSelect={(pillarId) => {
          onSelectPillar(pillarId);
          onNavigate('culture');
        }}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-20">
        {/* 2. Explore Himachal Preview Banner */}
        <section id="home-explore-himachal" className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-2xl border border-[#e5d8c7]/90 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-season-badge-bg/90 text-season-accent text-xs font-bold uppercase tracking-wider border border-season-badge-border/80">
                <Compass className="w-3.5 h-3.5" />
                <span>५० स्थल व शिखर • 50 Iconic Destinations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c1d11] tracking-tight">
                {scriptMode === 'bilingual' ? (
                  <span>हिमाचल दर्शन: घाटियां, शिखर व तीर्थ <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">Explore Landscapes & Sacred Valleys</span></span>
                ) : (
                  <span>Explore Himachal: Valleys, Peaks & Shrines</span>
                )}
              </h2>
              <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
                Journey through the rugged Pir Panjal ridges, sacred glacial tarns like Chandratal and Manimahesh, and ancient thousand-year-old rock temples of Masroor.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-5 py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-transform hover:scale-102 cursor-pointer shadow-md"
                >
                  <span>Explore All 50 Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden shadow-md relative h-36 bg-[#f4ebe1]">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt="Kangra Valley"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                  <span className="text-white text-xs font-bold">Dhauladhar & Kangra</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md relative h-36 bg-[#f4ebe1]">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80"
                  alt="Spiti Valley"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                  <span className="text-white text-xs font-bold">Spiti & Chandratal</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md relative h-36 bg-[#f4ebe1]">
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
                  alt="Kullu Valley"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                  <span className="text-white text-xs font-bold">Kullu & Tirthan</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md relative h-36 bg-[#f4ebe1]">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
                  alt="Kinnaur Kailash"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2.5">
                  <span className="text-white text-xs font-bold">Kinnaur & Sangla</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Districts Preview */}
        <section id="home-featured-districts" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-wider shadow-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>१२ जिले • 12 Sovereignties</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c1d11]">
                Featured Districts of Himachal Pradesh
              </h2>
            </div>
            <button
              onClick={() => onNavigate('districts')}
              className="text-xs font-bold text-season-accent hover:underline flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>View All 12 Districts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIMACHAL_DISTRICTS.slice(0, 4).map((district) => (
              <div
                key={district.id}
                onClick={() => onNavigate('districts')}
                className="group relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-[#e5d8c7]/80 p-4 hover:shadow-xl hover:border-season-accent transition-all cursor-pointer space-y-3 flex flex-col justify-between"
              >
                <div className="relative h-32 rounded-xl overflow-hidden bg-[#f4ebe1]">
                  <img
                    src={district.imageUrl}
                    alt={district.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white flex items-center justify-between">
                    <span className="font-serif text-sm font-bold">{district.name}</span>
                    <span className="text-xs font-serif opacity-80">{district.nameTakri}</span>
                  </div>
                </div>
                <p className="text-xs text-[#5c4a3b] line-clamp-2">
                  {district.tagline}
                </p>
                <div className="text-[11px] font-bold text-season-accent flex items-center gap-1 pt-1 border-t border-[#e5d8c7]/60">
                  <span>Explore {district.name} Lore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Cultural Heritage (6 Living Traditions) Spotlight */}
        <section id="home-living-traditions" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-wider shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>६ धरोहर स्तम्भ • 6 Living Pillars</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c1d11]">
                Living Cultural Traditions of Himachal
              </h2>
            </div>
            <button
              onClick={() => onNavigate('culture')}
              className="text-xs font-bold text-season-accent hover:underline flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All 6 Pillars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                id: 'architecture' as HeritagePillarId,
                title: 'Kath-Kuni & Timber Architecture',
                hindi: 'काष्ठ-कुणी वास्तुकला',
                icon: HomeIcon,
                desc: 'Ancient earthquake-resilient interlocking timber and stone structures standing for centuries.'
              },
              {
                id: 'celebrations' as HeritagePillarId,
                title: 'Devta Fairs & Divine Assemblies',
                hindi: 'देव समागम व मेले',
                icon: Calendar,
                desc: 'Over 365 village devtas traveling on palanquins for historic celestial summits.'
              },
              {
                id: 'cuisine' as HeritagePillarId,
                title: 'Himachali Dham & Culinary Lore',
                hindi: 'धाम व पारंपरिक व्यंजन',
                icon: Utensils,
                desc: 'Centuries-old slow-cooked copper pot feasts served on fresh leaf platters (Pattal).'
              },
              {
                id: 'folklore' as HeritagePillarId,
                title: 'Nati, Chham & Folk Epics',
                hindi: 'नाटी, छम व लोकगाथाएं',
                icon: Music,
                desc: 'Hypnotic circular Nati dances and monastic masked laments echoing through mountain passes.'
              },
              {
                id: 'script' as HeritagePillarId,
                title: 'Takri Script & Inscriptions',
                hindi: 'टांकरी लिपि व ताम्रपत्र',
                icon: Feather,
                desc: 'The historic writing system of the Western Himalayas preserved in royal copper plates.'
              },
              {
                id: 'locations' as HeritagePillarId,
                title: 'Sacred Mountains & Shrines',
                hindi: 'पवित्र पर्वत व शक्तिपीठ',
                icon: Mountain,
                desc: 'Kinnaur Kailash, Churdhar, and ancient Nagara shivalayas guarding sacred passes.'
              }
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    onSelectPillar(pillar.id);
                    onNavigate('culture');
                  }}
                  className="group p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-[#e5d8c7]/80 hover:border-season-accent hover:shadow-lg transition-all cursor-pointer space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-season-badge-bg text-season-accent border border-season-badge-border group-hover:bg-season-accent group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#2c1d11] group-hover:text-season-accent transition-colors">
                        {pillar.title}
                      </h3>
                      <span className="text-[11px] text-[#7a695a]">{pillar.hindi}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5c4a3b] leading-relaxed">
                    {pillar.desc}
                  </p>
                  <span className="text-xs font-bold text-season-accent flex items-center gap-1">
                    Explore Pillar <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Languages & Takri Script Section Spotlight */}
        <section id="home-languages-takri" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Languages of Himachal */}
          <div className="lg:col-span-6 bg-white/70 backdrop-blur-2xl rounded-3xl border border-[#e5d8c7]/90 p-6 sm:p-8 space-y-5 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-season-accent text-xs font-bold uppercase tracking-wider border border-season-badge-border">
                <Languages className="w-3.5 h-3.5" />
                <span>भाषाएं व बोलियां • Western Pahari</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2c1d11]">
                Languages & Dialects of Himachal
              </h3>
              <p className="text-xs sm:text-sm text-[#5c4a3b] leading-relaxed">
                Discover the rich spoken diversity across valleys—from Kangri and Mandeali to Kulvi, Mahasui, Sirmauri, and trans-Himalayan Kinnauri and Bhoti.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {HIMACHAL_LANGUAGES.slice(0, 5).map(lang => (
                  <span key={lang.id} className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#e5d8c7] text-[#4a392b] font-medium">
                    {lang.name} ({lang.nameHindi})
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('languages')}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#e5d8c7] hover:bg-season-badge-bg text-season-accent font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer shadow-xs"
            >
              <span>Explore Dialects & Listen to Audio Phrases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Takri Script Spotlight */}
          <div className="lg:col-span-6 bg-white/70 backdrop-blur-2xl rounded-3xl border border-[#e5d8c7]/90 p-6 sm:p-8 space-y-5 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-season-badge-bg text-season-accent text-xs font-bold uppercase tracking-wider border border-season-badge-border">
                <Feather className="w-3.5 h-3.5" />
                <span>टांकरी लिपि • Ancient Himalayan Script</span>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-serif font-bold text-[#2c1d11]">
                  Takri Script & Royal Epigraphy
                </h3>
                <span className="text-2xl font-serif text-season-accent">𑚔𑚭𑚫𑚊𑚤𑚯</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5c4a3b] leading-relaxed">
                Discover the ancient writing system once used across the western Himalayas. Learn its history, characters, stroke orders, pronunciation, and role in preserving Himachal's cultural identity.
              </p>

              <div className="p-3 bg-white/60 rounded-xl border border-[#e5d8c7]/70 flex items-center justify-around text-center">
                <div>
                  <span className="text-2xl font-serif text-season-accent block">𑚀 𑚁 𑚂 𑚃</span>
                  <span className="text-[10px] text-[#7a695a]">Unicode Verified</span>
                </div>
                <div className="w-px h-8 bg-[#e5d8c7]" />
                <div>
                  <span className="text-2xl font-serif text-[#2c1d11] block">𑚊 𑚋 𑚌 𑚍</span>
                  <span className="text-[10px] text-[#7a695a]">Stroke Practice & Quiz</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('takri')}
              className="px-4 py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-transform hover:scale-102 cursor-pointer shadow-md"
            >
              <span>Explore Takri Studio & Inscriptions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 6. Festivals & Gallery Highlights */}
        <section id="home-festivals-gallery" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Festivals */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-wider shadow-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>मेले एवं उत्सव • Fairs of the Gods</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c1d11]">
              Sacred Fairs & Seasonal Celebrations
            </h2>
            <p className="text-xs sm:text-sm text-[#5c4a3b] leading-relaxed">
              Experience the international fairs of Kullu Dussehra, Mandi Shivratri, Chamba Minjar Mela, and high-altitude Buddhist Losar & Halda torch rituals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {HIMACHAL_FESTIVALS.slice(0, 3).map(fest => (
                <div key={fest.id} onClick={() => onNavigate('festivals')} className="p-3 rounded-xl bg-white/60 border border-[#e5d8c7] hover:border-season-accent cursor-pointer transition-all space-y-1">
                  <span className="text-[10px] font-bold text-season-accent block">📍 {fest.district}</span>
                  <h4 className="text-xs font-serif font-bold text-[#2c1d11]">{fest.name}</h4>
                  <span className="text-[10px] text-[#7a695a] block">{fest.monthRange}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('festivals')}
              className="text-xs font-bold text-season-accent hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Full Himachal Festival Calendar →</span>
            </button>
          </div>

          {/* Visual Gallery Link */}
          <div className="lg:col-span-5 bg-white/70 backdrop-blur-2xl rounded-3xl border border-[#e5d8c7]/90 p-6 space-y-4 shadow-lg text-center">
            <div className="w-12 h-12 rounded-2xl bg-season-badge-bg text-season-accent border border-season-badge-border mx-auto flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2c1d11]">
              Himalayan Heritage Gallery
            </h3>
            <p className="text-xs text-[#5c4a3b]">
              High-definition photographic archives of high alpine passes, traditional Kath-Kuni castles, Chamba needlework, and rare Takri manuscripts.
            </p>
            <button
              onClick={() => onNavigate('gallery')}
              className="w-full py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-transform hover:scale-102"
            >
              Open Image Archives ({HIMACHAL_GALLERY.length}+ Photos)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
