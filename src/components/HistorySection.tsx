import React, { useState } from 'react';
import {
  History,
  BookOpen,
  Sparkles,
  Scroll,
  Layers,
} from 'lucide-react';

export const HistorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'variants' | 'manuscripts'>('timeline');

  const timelineEvents = [
    {
      century: '8th - 10th Century CE',
      title: 'Descent from Sharada Script',
      description:
        'Takri evolved in the Western Himalayas as a specialized cursive sister to the Sharada script of Kashmir, adopted quickly by hill rulers for official state records, commerce, and copper plate grants.',
      tag: 'Origins',
      takri: '𑚧𑚭𑚤𑚛𑚭 𑚙𑚲 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      century: '11th - 16th Century CE',
      title: 'The Golden Age of Hill State Royal Charters',
      description:
        'Chamba, Kangra, Mandi, and Bushahr kingdoms made Takri their official administrative script. The famous Chamba copper plates (Tamra-shasana) documented temple donations and royal genealogies in Chameali Takri.',
      tag: 'Royal Epigraphy',
      takri: '𑚏𑚢𑚠𑚭 𑚙𑚭𑚢𑚤𑚞𑚙𑚤',
    },
    {
      century: '17th - 19th Century CE',
      title: 'Pahari Miniature Paintings & Land Deeds',
      description:
        'Master artists of Kangra and Basohli inscribed their world-renowned Radha-Krishna paintings and Pahari folk poetry with Takri annotations. Village patwaris maintained all land deeds in Takri.',
      tag: 'Art & Literature',
      takri: '𑚊𑚭𑚫𑚍𑚚𑚭 𑚏𑚮𑚙𑚤𑚊𑚥𑚭',
    },
    {
      century: '20th Century',
      title: 'Decline in the Modern Bureaucracy',
      description:
        'With the standardization of Devanagari and English for Indian state administration post-independence, Takri fell out of daily public use, preserved primarily by elder scribes and temple pandits.',
      tag: 'Decline',
      takri: '𑚀𑚡𑚮𑚥𑚲𑚋 𑚨𑚫𑚤𑚊𑚋𑚘',
    },
    {
      century: '2012 - Present',
      title: 'Unicode 6.0 Standardization & Digital Renaissance',
      description:
        'In 2012, Takri was formally encoded in the Unicode Standard (U+11680–U+116CF). Today, passionate Himachali scholars, cultural preservationists, and digital communities are reviving Takri as a living script of pride.',
      tag: 'Renaissance',
      takri: '𑚔𑚭𑚊𑚤𑚯 𑚞𑚰𑚝𑚤𑚰𑚙𑚚𑚭𑚝',
    },
  ];

  const variants = [
    {
      name: 'Chameali Takri (Chamba)',
      region: 'Chamba Valley (Ravi River basin)',
      features: 'The most standardized and calligraphically ornate variant, seen on 150+ royal copper plates in Bhuri Singh Museum.',
      sample: '𑚏𑚢𑚠𑚭 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Kangri Takri (Kangra & Hamirpur)',
      region: 'Kangra, Beas Valley, Jwalamukhi',
      features: 'Widely used on Pahari miniature paintings and land registries across the Katoch dynasty.',
      sample: '𑚊𑚭𑚫𑚍𑚚𑚭 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Mandyali Takri (Mandi & Suket)',
      region: 'Mandi town, Rewalsar, Suket',
      features: 'Distinct angular strokes, preserved in royal decrees from the Sen dynasty rulers.',
      sample: '𑚢𑚉𑚫𑚖𑚯 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Kulluvi Takri (Kullu Valley)',
      region: 'Naggar, Manali, Manikaran',
      features: 'Rich temple registry script used by the priests of Lord Raghunath and Hadimba Temple.',
      sample: '𑚊𑚰𑚥𑚥𑚰 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Jaunsari & Sirmauri Takri',
      region: 'Sirmaur, Giri River, Jaunsar-Bawar',
      features: 'Unique Southern Pahari ligatures, preserving folklore and Mahabharata traditions.',
      sample: '𑚨𑚮𑚤𑚢𑚵𑚤𑚯 𑚔𑚭𑚊𑚤𑚯',
    },
  ];

  return (
    <section id="takri-history-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full"></span>
          <span>इतिहास • 1,200 YEARS OF HIMALAYAN HERITAGE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          The Chronicles of Takri Script
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-light italic">
          From ancient Sharada origins and royal copper plates of Chamba to Unicode 6.0 recognition and modern community revival.
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'timeline', label: 'Historical Timeline (कालक्रम)' },
          { id: 'variants', label: 'Regional Dialect Variations (क्षेत्रीय भेद)' },
          { id: 'manuscripts', label: 'Copper Plates & Scribes (अभिलेख)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow-lg shadow-black/30'
                : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#c5a059]/40 transition-all flex flex-col sm:flex-row items-start gap-6 shadow-2xl"
            >
              <div className="sm:w-48 shrink-0 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059]">
                  {evt.century}
                </span>
                <div className="font-takri text-2xl text-[#dfbe7b] font-bold">
                  {evt.takri}
                </div>
                <span className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                  {evt.tag}
                </span>
              </div>

              <div className="flex-1 space-y-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <h3 className="text-base font-serif text-white">{evt.title}</h3>
                <p className="text-xs sm:text-sm text-white/80 font-light italic leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Regional Variants */}
      {activeTab === 'variants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variants.map((v, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 space-y-3 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif text-white">{v.name}</h3>
                <span className="font-takri text-2xl text-[#dfbe7b] font-bold">{v.sample}</span>
              </div>
              <div className="text-xs text-[#c5a059] font-serif">{v.region}</div>
              <p className="text-xs text-white/80 font-light italic leading-relaxed">{v.features}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Manuscripts */}
      {activeTab === 'manuscripts' && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-xl font-serif text-white">Bhuri Singh Museum & Chamba Royal Charters</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light italic">
              The Bhuri Singh Museum in Chamba houses the world&apos;s largest collection of Takri copper plate inscriptions (ताम्रपत्र), fountain stone slabs, and royal sanads. These documents were inscribed by royal scribes known as <em>Takruris</em> or <em>Kaisths</em> with goose quill reeds on handmade Pahari paper.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-center space-y-1">
              <span className="font-takri text-3xl text-[#dfbe7b] font-bold">𑚙𑚭𑚢𑚤𑚞𑚙𑚤</span>
              <div className="text-xs font-serif text-white">150+ Copper Plates</div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Preserved in Chamba archives</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-center space-y-1">
              <span className="font-takri text-3xl text-[#dfbe7b] font-bold">𑚞𑚴𑚚𑚯</span>
              <div className="text-xs font-serif text-white">Religious Pothis</div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Pahari Mahabharata & Puranas</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-center space-y-1">
              <span className="font-takri text-3xl text-[#dfbe7b] font-bold">𑚥𑚮𑚋𑚭𑚤𑚯</span>
              <div className="text-xs font-serif text-white">Hereditary Scribes</div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Trained in royal calligraphy</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
