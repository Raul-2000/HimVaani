import React, { useState, useEffect } from 'react';
import {
  Landmark,
  Utensils,
  Music,
  ScrollText,
  Mountain,
  MapPin,
  CheckCircle2,
  Circle,
  Plus,
  Search,
  Sparkles,
  Volume2,
  X,
  Share2,
  BookOpen,
  Layers,
  Calendar,
  Feather,
  ChefHat,
  Filter,
} from 'lucide-react';
import { HeritagePillarId, HeritageTraditionItem, ScriptMode } from '../types';
import { HERITAGE_PILLARS_META, INITIAL_HERITAGE_ITEMS } from '../data/heritageTraditions';
import { HIMACHAL_PLACES } from '../data/himachalPlaces';
import { universalConvert } from '../utils/takriTransliterator';
import { speakPhonetic } from '../utils/audioAmbience';

interface TraditionsSectionProps {
  scriptMode: ScriptMode;
  initialPillarId?: HeritagePillarId;
  onExplorePlacesClick?: () => void;
}

export const TraditionsSection: React.FC<TraditionsSectionProps> = ({
  scriptMode,
  initialPillarId = 'architecture',
  onExplorePlacesClick,
}) => {
  const [activePillarId, setActivePillarId] = useState<HeritagePillarId>(initialPillarId);
  const [items, setItems] = useState<HeritageTraditionItem[]>(() => {
    const saved = localStorage.getItem('himvaani_custom_traditions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...INITIAL_HERITAGE_ITEMS, ...parsed];
      } catch (e) {
        console.error('Failed to load saved traditions', e);
      }
    }
    return INITIAL_HERITAGE_ITEMS;
  });

  // Track checked items ("Choose to Check")
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('himvaani_checked_traditions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse checked traditions', e);
      }
    }
    return ['arch-1', 'dham-1', 'fair-1'];
  });

  const [selectedItem, setSelectedItem] = useState<HeritageTraditionItem | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'checked' | 'unchecked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // New Content Form State
  const [newTitleEng, setNewTitleEng] = useState('');
  const [newTitleHindi, setNewTitleHindi] = useState('');
  const [newPillarId, setNewPillarId] = useState<HeritagePillarId>(activePillarId);
  const [newRegion, setNewRegion] = useState('Chamba');
  const [newValley, setNewValley] = useState('Ravi Valley');
  const [newCategory, setNewCategory] = useState('Temple Architecture');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFullStory, setNewFullStory] = useState('');
  const [newCulturalSignificance, setNewCulturalSignificance] = useState('');
  const [newKeyFeature, setNewKeyFeature] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Live transliteration
  const convertedTitle = universalConvert(newTitleHindi || newTitleEng);

  useEffect(() => {
    localStorage.setItem('himvaani_checked_traditions', JSON.stringify(checkedItemIds));
  }, [checkedItemIds]);

  const toggleCheck = (itemId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCheckedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleCreateTradition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEng.trim()) return;

    const takriTitle = convertedTitle.takri || '𑚜𑚤𑚴𑚩𑚤 𑚞𑚤𑚫𑚞𑚤𑚭';
    const finalHindi = newTitleHindi || convertedTitle.devanagari || newTitleEng;

    const newItem: HeritageTraditionItem = {
      id: `tradition-custom-${Date.now()}`,
      pillarId: newPillarId,
      nameEnglish: newTitleEng.trim(),
      nameHindi: finalHindi.trim(),
      nameTakri: takriTitle,
      region: newRegion,
      valley: newValley,
      imageUrl:
        newImageUrl.trim() ||
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      category: newCategory,
      shortDescriptionEnglish: newShortDesc.trim() || newTitleEng,
      shortDescriptionHindi: newShortDesc.trim() || finalHindi,
      shortDescriptionTakri: takriTitle,
      fullStoryEnglish: newFullStory.trim() || newShortDesc.trim() || newTitleEng,
      fullStoryHindi: newFullStory.trim() || finalHindi,
      fullStoryTakri: takriTitle,
      keyFeatures: newKeyFeature
        ? [newKeyFeature, 'Indigenous community contribution', 'Living heritage record']
        : ['Traditional preservation record', 'Authentic Himachali craftsmanship'],
      culturalSignificance:
        newCulturalSignificance.trim() || 'Preserving indigenous knowledge for future generations.',
      isUserAdded: true,
    };

    const updated = [newItem, ...items];
    setItems(updated);

    // Save only user added to localStorage
    const userAddedOnly = updated.filter((it) => it.isUserAdded);
    localStorage.setItem('himvaani_custom_traditions', JSON.stringify(userAddedOnly));

    // Reset Form
    setNewTitleEng('');
    setNewTitleHindi('');
    setNewShortDesc('');
    setNewFullStory('');
    setNewCulturalSignificance('');
    setNewKeyFeature('');
    setNewImageUrl('');
    setShowAddModal(false);
    setActivePillarId(newPillarId);
  };

  const handleShare = (item: HeritageTraditionItem) => {
    const text = `${item.nameEnglish} (${item.nameHindi}) - ${item.region}, Himachal Pradesh • ${item.shortDescriptionEnglish}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const currentPillarMeta =
    HERITAGE_PILLARS_META.find((p) => p.id === activePillarId) || HERITAGE_PILLARS_META[0];

  // Filter items
  const currentPillarItems = items.filter((item) => item.pillarId === activePillarId);

  const displayItems = currentPillarItems.filter((item) => {
    const isChecked = checkedItemIds.includes(item.id);
    if (filterMode === 'checked' && !isChecked) return false;
    if (filterMode === 'unchecked' && isChecked) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName =
        item.nameEnglish.toLowerCase().includes(q) ||
        item.nameHindi.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.shortDescriptionEnglish.toLowerCase().includes(q) ||
        item.shortDescriptionHindi.toLowerCase().includes(q);
      if (!matchName) return false;
    }
    return true;
  });

  const checkedCountInPillar = currentPillarItems.filter((it) =>
    checkedItemIds.includes(it.id)
  ).length;

  return (
    <section id="traditions-pillars-explorer" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-season-badge-bg border border-season-badge-border text-season-badge-text text-[11px] uppercase tracking-[0.25em] font-semibold">
          <span className="w-2 h-2 rounded-full bg-season-accent"></span>
          <span>HIMACHAL HERITAGE PILLARS • 6 LIVING TRADITIONS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-season-heading font-bold tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>६ प्रमुख धरोहर स्तम्भ एवं सजीव परंपराएं</span>
          ) : (
            <span>The 6 Pillars of Himachali Heritage</span>
          )}
        </h2>

        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          {scriptMode === 'bilingual' ? (
            <span>
              काष्ठ-कुणी व पैगोडा स्थापत्य, पारंपरिक मेले व देव समागम, पहाड़ी धाम व व्यंजन, लिपि व पांडुलिपियां, और लोक गाथाओं का संग्रह।
            </span>
          ) : (
            <span>
              Explore in-depth documentation of earthquake-resistant temples, sacred devta melas, authentic royal cuisine, ancient manuscripts, and pastoral legends. Mark what you have experienced or choose to explore!
            </span>
          )}
        </p>
      </div>

      {/* 6 Tradition Subpage Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {HERITAGE_PILLARS_META.map((pillar) => {
          const isActive = activePillarId === pillar.id;
          const IconComp =
            pillar.id === 'locations'
              ? MapPin
              : pillar.id === 'architecture'
              ? Landmark
              : pillar.id === 'celebrations'
              ? Music
              : pillar.id === 'cuisine'
              ? Utensils
              : pillar.id === 'script'
              ? ScrollText
              : Mountain;

          return (
            <button
              key={pillar.id}
              id={`pillar-tab-${pillar.id}`}
              onClick={() => {
                if (pillar.id === 'locations' && onExplorePlacesClick) {
                  onExplorePlacesClick();
                } else {
                  setActivePillarId(pillar.id);
                }
              }}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-season-badge-bg border-season-accent shadow-md scale-102'
                  : 'bg-white border-[#e5d8c7] hover:bg-[#faf6f0] text-[#5c4a3b]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-2 rounded-xl border ${
                    isActive
                      ? 'bg-season-accent text-white border-season-accent'
                      : 'bg-[#faf6f0] text-season-accent border-[#e5d8c7]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-white/80 border border-[#e5d8c7] text-[#7a695a]">
                  {pillar.countBadge.split(' ')[0]}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-serif font-bold text-[#2c1d11] line-clamp-1">
                  {pillar.title}
                </h4>
                <span className="text-[11px] font-serif font-medium text-season-accent block pt-0.5">
                  {pillar.titleHindi}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subpage Banner */}
      <div
        className="rounded-3xl p-6 sm:p-8 border-2 border-season-badge-border shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: `linear-gradient(135deg, var(--season-bg-start, #fffbeb), var(--season-bg-mid, #fef3c7))`,
        }}
      >
        <div className="space-y-3 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Tradition Focus</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c1d11] flex flex-wrap items-baseline gap-2">
              <span>{currentPillarMeta.title}</span>
              <span className="text-lg sm:text-xl font-serif font-normal text-season-accent">
                ({currentPillarMeta.titleHindi})
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5c4a3b] leading-relaxed">
              {currentPillarMeta.desc}
            </p>
          </div>

          {/* Checklist Status & Progress */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2 bg-white/90 px-3.5 py-1.5 rounded-full border border-season-badge-border text-xs text-[#2c1d11] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-season-accent" />
              <span>
                <strong>{checkedCountInPillar}</strong> of <strong>{currentPillarItems.length}</strong> items marked as explored / checked
              </span>
            </div>

            <div className="w-32 sm:w-40 bg-white/80 rounded-full h-2.5 overflow-hidden border border-season-badge-border">
              <div
                className="h-full bg-season-accent transition-all duration-500 rounded-full"
                style={{
                  width: `${
                    currentPillarItems.length > 0
                      ? Math.round((checkedCountInPillar / currentPillarItems.length) * 100)
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Button: Add Content / Tradition */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            id="open-add-tradition-btn"
            onClick={() => {
              setNewPillarId(activePillarId);
              setShowAddModal(true);
            }}
            className="px-5 py-3 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>Add Content / New Entry</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e5d8c7] shadow-sm">
        {/* Checklist Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-season-accent text-white shadow-xs font-bold'
                : 'bg-[#faf6f0] text-[#5c4a3b] hover:text-[#2c1d11] border border-[#e5d8c7]'
            }`}
          >
            All Items ({currentPillarItems.length})
          </button>
          <button
            onClick={() => setFilterMode('checked')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              filterMode === 'checked'
                ? 'bg-season-accent text-white shadow-xs font-bold'
                : 'bg-[#faf6f0] text-[#5c4a3b] hover:text-[#2c1d11] border border-[#e5d8c7]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Checked ({checkedCountInPillar})</span>
          </button>
          <button
            onClick={() => setFilterMode('unchecked')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filterMode === 'unchecked'
                ? 'bg-season-accent text-white shadow-xs font-bold'
                : 'bg-[#faf6f0] text-[#5c4a3b] hover:text-[#2c1d11] border border-[#e5d8c7]'
            }`}
          >
            Unchecked ({currentPillarItems.length - checkedCountInPillar})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#7a695a] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, regions, lore..."
            className="w-full bg-[#faf6f0] border border-[#d5be9d] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
          />
        </div>
      </div>

      {/* Grid of Heritage Items for Active Pillar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => {
          const isChecked = checkedItemIds.includes(item.id);

          return (
            <div
              key={item.id}
              id={`tradition-card-${item.id}`}
              className="group rounded-3xl overflow-hidden bg-white border-2 border-[#e5d8c7] hover:border-season-accent shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden bg-[#f4ebe1]">
                <img
                  src={item.imageUrl}
                  alt={item.nameEnglish}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c1d11]/85 via-transparent to-transparent" />

                {/* Region & Category Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-season-accent border border-[#e5d8c7] shadow-xs">
                    {item.region}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#5c4a3b] border border-[#e5d8c7] shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Interactive "Check / Choose to Check" Button */}
                <button
                  id={`toggle-check-${item.id}`}
                  onClick={(e) => toggleCheck(item.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                    isChecked
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                      : 'bg-white/90 hover:bg-white text-[#5c4a3b] hover:text-[#2c1d11] border-[#e5d8c7]'
                  }`}
                  title={isChecked ? 'Marked as Explored / Checked. Click to Uncheck' : 'Click to Mark as Explored / Checked'}
                >
                  {isChecked ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span className="text-[10px] uppercase font-bold tracking-wide pr-0.5">Checked</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-[#7a695a]" />
                      <span className="text-[10px] uppercase font-semibold tracking-wide pr-0.5">Check</span>
                    </>
                  )}
                </button>

                {/* Title overlay on Image in English & Hindi */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xl font-serif text-white font-bold tracking-tight drop-shadow-md">
                    {item.nameEnglish}
                  </div>
                  <div className="text-sm font-serif text-[#f4d19b] font-medium drop-shadow-xs">
                    {item.nameHindi}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#2c1d11] group-hover:text-season-accent transition-colors leading-snug">
                        {item.nameEnglish}
                      </h3>
                      <div className="text-xs text-season-accent font-serif font-semibold pt-0.5">
                        {item.nameHindi}
                      </div>
                    </div>

                    <button
                      onClick={() => speakPhonetic(item.nameHindi)}
                      className="p-1.5 rounded-lg text-[#8a7b6e] hover:text-season-accent hover:bg-[#faf6f0] transition-colors cursor-pointer shrink-0"
                      title="Pronounce Hindi Name"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#5c4a3b] leading-relaxed line-clamp-3">
                    {item.shortDescriptionEnglish}
                  </p>

                  {/* Highlights Pill */}
                  {item.keyFeatures && item.keyFeatures.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1">
                      {item.keyFeatures.slice(0, 2).map((kf, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#faf6f0] border border-[#ebd8c5] text-[#7a695a] font-medium"
                        >
                          ✦ {kf}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-[#f0e6da] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#7a695a] font-medium">
                    {item.valley}
                  </span>

                  <button
                    id={`view-details-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-season-accent hover:opacity-90 text-white text-xs font-bold uppercase tracking-tight shadow-sm transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Know More • विस्तृत विवरण</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {displayItems.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-[#d5be9d] space-y-4 max-w-lg mx-auto">
          <Sparkles className="w-8 h-8 text-season-accent mx-auto" />
          <h4 className="font-serif font-bold text-base text-[#2c1d11]">No Traditions Found</h4>
          <p className="text-xs text-[#7a695a]">
            Try adjusting your search keywords or filter options.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterMode('all');
            }}
            className="px-4 py-2 rounded-xl bg-season-accent text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ================= MODAL: ADD NEW CONTENT / TRADITION ================= */}
      {showAddModal && (
        <div
          id="add-tradition-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#fdfcf9] border-2 border-season-accent shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-[#2c1d11]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c7]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-season-accent rounded-full"></span>
                <h3 className="text-base font-serif font-bold text-season-accent">
                  Contribute New Himachali Heritage Entry (नई प्रविष्टि जोड़ें)
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-[#faf6f0] text-[#7a695a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTradition} className="space-y-4">
              {/* Select Tradition Pillar */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold">
                  Heritage Pillar Category (स्तम्भ चुनें)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HERITAGE_PILLARS_META.filter((p) => p.id !== 'locations').map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setNewPillarId(p.id)}
                      className={`p-2 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                        newPillarId === p.id
                          ? 'bg-season-accent text-white border-season-accent font-bold'
                          : 'bg-white text-[#5c4a3b] border-[#e5d8c7]'
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                    Name in English:
                  </label>
                  <input
                    type="text"
                    value={newTitleEng}
                    onChange={(e) => setNewTitleEng(e.target.value)}
                    placeholder="e.g. Bijli Mahadev Temple, Sepu Badi..."
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                    Name in Hindi (नाम हिंदी में):
                  </label>
                  <input
                    type="text"
                    value={newTitleHindi}
                    onChange={(e) => setNewTitleHindi(e.target.value)}
                    placeholder="e.g. बिजली महादेव, सेपू बड़ी..."
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>
              </div>

              {/* Region & Valley */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                    District / Region (जिला):
                  </label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  >
                    <option value="Chamba">Chamba (चम्बा)</option>
                    <option value="Kangra">Kangra (कांगड़ा)</option>
                    <option value="Kullu">Kullu (कुल्लू)</option>
                    <option value="Mandi">Mandi (मंडी)</option>
                    <option value="Shimla">Shimla (शिमला)</option>
                    <option value="Lahaul-Spiti">Lahaul-Spiti (लाहौल-स्पीति)</option>
                    <option value="Kinnaur">Kinnaur (किन्नौर)</option>
                    <option value="Sirmaur">Sirmaur (सिरमौर)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                    Specific Valley / Sub-region:
                  </label>
                  <input
                    type="text"
                    value={newValley}
                    onChange={(e) => setNewValley(e.target.value)}
                    placeholder="e.g. Parvati Valley, Sangla Valley, Uhl Valley..."
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  Short Summary (संक्षिप्त विवरण):
                </label>
                <textarea
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  rows={2}
                  placeholder="A concise description of the tradition, temple, dish, or legend..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl p-3 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  required
                />
              </div>

              {/* Detailed Narrative */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  Detailed History / Lore / Cultural Context (विस्तृत इतिहास व संदर्भ):
                </label>
                <textarea
                  value={newFullStory}
                  onChange={(e) => setNewFullStory(e.target.value)}
                  rows={3}
                  placeholder="Share the full story, ancient origins, preparation steps, or community practices..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl p-3 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                />
              </div>

              {/* Key Features & Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                    Key Highlight / Unique Feature:
                  </label>
                  <input
                    type="text"
                    value={newKeyFeature}
                    onChange={(e) => setNewKeyFeature(e.target.value)}
                    placeholder="e.g. Timber deodar tie beams, slow curd reduction..."
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                    Photo Image URL (Optional):
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#e5d8c7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider text-[#7a695a] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Add to Heritage Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DETAILED TRADITION DOSSIER ================= */}
      {selectedItem && (
        <div
          id="tradition-details-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#fdfcf9] border-2 border-season-accent shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-[#2c1d11]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c7]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-season-accent rounded-full"></span>
                <span className="text-xs font-serif uppercase tracking-widest font-bold text-season-accent">
                  Himachal Living Heritage Archive
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedItem)}
                  className="p-2 rounded-xl bg-[#faf6f0] hover:bg-[#f5ece2] text-[#5c4a3b] cursor-pointer"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-xl bg-[#faf6f0] hover:bg-[#f5ece2] text-[#5c4a3b] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {copiedShare && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 text-center font-medium">
                ✓ Copied tradition details to clipboard!
              </div>
            )}

            {/* Hero Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner bg-[#f0e6da]">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.nameEnglish}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1d11]/90 via-[#2c1d11]/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div className="text-2xl sm:text-3xl font-serif text-white font-bold drop-shadow-md">
                  {selectedItem.nameEnglish}
                </div>
                <div className="text-lg font-serif text-[#f4d19b] flex flex-wrap items-center gap-2">
                  <span>{selectedItem.nameHindi}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs text-white backdrop-blur-sm border border-white/20">
                    {selectedItem.region} • {selectedItem.valley}
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Toggle inside Modal */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e5d8c7] shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-season-badge-bg text-season-accent border border-season-badge-border">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c1d11]">
                    Experience & Exploration Tracker
                  </h4>
                  <p className="text-[11px] text-[#7a695a]">
                    {checkedItemIds.includes(selectedItem.id)
                      ? 'You have marked this heritage item as experienced / explored!'
                      : 'Choose to check this item to track your exploration journey across Himachal.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCheck(selectedItem.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  checkedItemIds.includes(selectedItem.id)
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-white text-season-accent border-season-accent hover:bg-season-badge-bg'
                }`}
              >
                {checkedItemIds.includes(selectedItem.id) ? '✓ Checked' : '+ Check Item'}
              </button>
            </div>

            {/* History & Story Section */}
            <div className="space-y-4 text-left">
              <div className="p-5 rounded-2xl bg-white border border-[#e5d8c7] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-season-accent">
                    Historical Record & Overview
                  </span>
                  <button
                    onClick={() => speakPhonetic(selectedItem.nameEnglish)}
                    className="p-1 rounded bg-[#faf6f0] text-season-accent cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm text-[#423223] leading-relaxed">
                  {selectedItem.fullStoryEnglish}
                </p>
              </div>

              {/* Hindi Chronicle */}
              <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#ebd8c5] space-y-2">
                <div className="flex items-center justify-between text-xs text-season-accent font-serif font-bold">
                  <span>हिंदी ऐतिहासिक वृत्तांत (Hindi Chronicle)</span>
                  <button
                    onClick={() => speakPhonetic(selectedItem.fullStoryHindi)}
                    className="p-1 rounded bg-white text-season-accent cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-serif text-[#3e2e20] leading-relaxed">
                  {selectedItem.fullStoryHindi}
                </p>
              </div>

              {/* Recipe / Culinary Specific Details */}
              {selectedItem.recipeIngredients && selectedItem.recipeIngredients.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-[#e5d8c7] space-y-3">
                  <div className="flex items-center gap-2 text-season-accent font-serif font-bold text-sm">
                    <ChefHat className="w-4 h-4" />
                    <span>Traditional Cooking & Ingredients:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5c4a3b]">
                    {selectedItem.recipeIngredients.map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-season-accent"></span>
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Construction Details */}
              {selectedItem.constructionDetails && (
                <div className="p-5 rounded-2xl bg-white border border-[#e5d8c7] space-y-2">
                  <div className="flex items-center gap-2 text-season-accent font-serif font-bold text-sm">
                    <Layers className="w-4 h-4" />
                    <span>Architectural Engineering:</span>
                  </div>
                  <p className="text-xs text-[#423223] leading-relaxed">
                    {selectedItem.constructionDetails}
                  </p>
                </div>
              )}

              {/* Key Features List */}
              {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-season-accent block">
                    Distinguishing Heritage Features:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.keyFeatures.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-season-badge-bg border border-season-badge-border text-season-badge-text text-xs font-semibold"
                      >
                        ✦ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#e5d8c7] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 rounded-xl bg-season-accent text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
