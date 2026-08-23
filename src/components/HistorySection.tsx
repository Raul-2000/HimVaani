import React, { useState } from 'react';
import {
  History,
  BookOpen,
  Sparkles,
  Scroll,
  Layers,
} from 'lucide-react';
import { ScriptMode } from '../types';

interface HistorySectionProps {
  scriptMode?: ScriptMode;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ scriptMode = 'all' }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'variants' | 'manuscripts'>('timeline');

  const timelineEvents = [
    {
      century: '8th - 10th Century CE',
      centuryHindi: '८वीं - १०वीं शताब्दी ईस्वी',
      title: 'Descent from Sharada Script',
      titleHindi: 'शारदा लिपि से प्रादुर्भाव व उद्भव',
      description:
        'Takri evolved in the Western Himalayas as a specialized cursive sister to the Sharada script of Kashmir, adopted quickly by hill rulers for official state records, commerce, and copper plate grants.',
      descriptionHindi:
        'पश्चिमी हिमालय में टाकरी लिपि कश्मीर की शारदा लिपि की विकसित शाखा के रूप में उभरी। पहाड़ी राजाओं ने इसे राजकाज, व्यापार और ताम्रपत्र अनुदानों की मुख्य लिपि बनाया।',
      tag: 'Origins',
      tagHindi: 'उद्गम',
      takri: '𑚧𑚭𑚤𑚛𑚭 𑚙𑚲 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      century: '11th - 16th Century CE',
      centuryHindi: '११वीं - १६वीं शताब्दी ईस्वी',
      title: 'The Golden Age of Hill State Royal Charters',
      titleHindi: 'पहाड़ी रियासतों का स्वर्ण काल व राज्यादेश',
      description:
        'Chamba, Kangra, Mandi, and Bushahr kingdoms made Takri their official administrative script. The famous Chamba copper plates (Tamra-shasana) documented temple donations and royal genealogies in Chameali Takri.',
      descriptionHindi:
        'चम्बा, कांगड़ा, मंडी और बुशहर रियासतों ने टाकरी को अपनी राजभाषा व आधिकारिक लिपि बनाया। चम्बा के प्रसिद्ध ताम्रपत्रों में चमेयाली टाकरी में मंदिर दान और वंशावलियां उत्कीर्ण हैं।',
      tag: 'Royal Epigraphy',
      tagHindi: 'राजकीय अभिलेख',
      takri: '𑚏𑚢𑚠𑚭 𑚙𑚭𑚢𑚤𑚞𑚙𑚤',
    },
    {
      century: '17th - 19th Century CE',
      centuryHindi: '१७वीं - १९वीं शताब्दी ईस्वी',
      title: 'Pahari Miniature Paintings & Land Deeds',
      titleHindi: 'पहाड़ी लघुचित्र कला एवं भू-राजस्व पट्टे',
      description:
        'Master artists of Kangra and Basohli inscribed their world-renowned Radha-Krishna paintings and Pahari folk poetry with Takri annotations. Village patwaris maintained all land deeds in Takri.',
      descriptionHindi:
        'कांगड़ा और बसोहली शैली के विश्वविख्यात चित्रकारों ने राधा-कृष्ण चित्रों और लोककाव्यों पर टाकरी में टिप्पणियां लिखीं। पटवारियों द्वारा भूमि संबंधी समस्त पट्टे टाकरी में रखे जाते थे।',
      tag: 'Art & Literature',
      tagHindi: 'कला एवं साहित्य',
      takri: '𑚊𑚭𑚫𑚍𑚚𑚭 𑚏𑚮𑚙𑚤𑚊𑚥𑚭',
    },
    {
      century: '20th Century',
      centuryHindi: '२०वीं शताब्दी',
      title: 'Decline in the Modern Bureaucracy',
      titleHindi: 'आधुनिक प्रशासनिक मानकीकरण व क्षय',
      description:
        'With the standardization of Devanagari and English for Indian state administration post-independence, Takri fell out of daily public use, preserved primarily by elder scribes and temple pandits.',
      descriptionHindi:
        'स्वतंत्रता के उपरांत देवनागरी व अंग्रेजी के अनिवार्य मानकीकरण से टाकरी का दैनिक उपयोग कम हुआ, जिसे वरिष्ठ पुजारियों व पुराने लेखकों ने ही सहेज कर रखा।',
      tag: 'Decline',
      tagHindi: 'परिवर्तन काल',
      takri: '𑚀𑚡𑚮𑚥𑚲𑚋 𑚨𑚫𑚤𑚊𑚋𑚘',
    },
    {
      century: '2012 - Present',
      centuryHindi: '२०१२ - वर्तमान',
      title: 'Unicode 6.0 Standardization & Digital Renaissance',
      titleHindi: 'यूनिकोड ६.० मानकीकरण एवं डिजिटल पुनर्जागरण',
      description:
        'In 2012, Takri was formally encoded in the Unicode Standard (U+11680–U+116CF). Today, passionate Himachali scholars, cultural preservationists, and digital communities are reviving Takri as a living script of pride.',
      descriptionHindi:
        'वर्ष २०१२ में टाकरी को अंतरराष्ट्रीय यूनिकोड मानक (U+11680–U+116CF) में शामिल किया गया। आज शोधार्थी, युवा पीढ़ी और HimVaani इसे एक गौरवशाली सजीव लिपि के रूप में पुनर्जीवित कर रहे हैं।',
      tag: 'Renaissance',
      tagHindi: 'पुनरुत्थान',
      takri: '𑚔𑚭𑚊𑚤𑚯 𑚞𑚰𑚝𑚤𑚰𑚙𑚚𑚭𑚝',
    },
  ];

  const variants = [
    {
      name: 'Chameali Takri (Chamba)',
      nameHindi: 'चमेयाली टाकरी (चम्बा घाटी)',
      region: 'Chamba Valley (Ravi River basin)',
      regionHindi: 'रावी नदी घाटी, भरमौर एवं चम्बा नगर',
      features: 'The most standardized and calligraphically ornate variant, seen on 150+ royal copper plates in Bhuri Singh Museum.',
      featuresHindi: 'सर्वाधिक सुव्यवस्थित एवं अलंकृत रूप, जो भूरी सिंह संग्रहालय के १५०+ ताम्रपत्रों और राज-आदेशों में विद्यमान है।',
      sample: '𑚏𑚢𑚠𑚭 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Kangri Takri (Kangra & Hamirpur)',
      nameHindi: 'कांगड़ी टाकरी (कांगड़ा-हमीरपुर)',
      region: 'Kangra, Beas Valley, Jwalamukhi',
      regionHindi: 'ब्यास घाटी, ज्वालामुखी, पालमपुर व कांगड़ा',
      features: 'Widely used on Pahari miniature paintings and land registries across the Katoch dynasty.',
      featuresHindi: 'क कटोच राजवंश के संरक्षण में लघुचित्रों के शीर्षक, भूमि पट्टों और राजस्व अभिलेखों में प्रयुक्त।',
      sample: '𑚊𑚭𑚫𑚍𑚚𑚭 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Mandyali Takri (Mandi & Suket)',
      nameHindi: 'मंडयाली टाकरी (मंडी व सुकेत)',
      region: 'Mandi town, Rewalsar, Suket',
      regionHindi: 'मंडी नगर, रिवालसर व प्राचीन सुकेत',
      features: 'Distinct angular strokes, preserved in royal decrees from the Sen dynasty rulers.',
      featuresHindi: 'सेन राजवंश के सनदों व मंदिरों में संरक्षित, कोणीय व तीव्र स्ट्रोक वाली विशिष्ट शैली।',
      sample: '𑚢𑚉𑚫𑚖𑚯 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Kulluvi Takri (Kullu Valley)',
      nameHindi: 'कुल्लुवी टाकरी (कुल्लू घाटी)',
      region: 'Naggar, Manali, Manikaran',
      regionHindi: 'नग्गर, मनाली, मणिकर्ण व ब्यास उपत्यका',
      features: 'Rich temple registry script used by the priests of Lord Raghunath and Hadimba Temple.',
      featuresHindi: 'भगवान रघुनाथ जी व हिडिम्बा देवी मंदिर के देव-अभिलेखों और पंचांगों में प्रयुक्त।',
      sample: '𑚊𑚰𑚥𑚥𑚰 𑚔𑚭𑚊𑚤𑚯',
    },
    {
      name: 'Jaunsari & Sirmauri Takri',
      nameHindi: 'सिरमौरी व जौनसारी टाकरी',
      region: 'Sirmaur, Giri River, Jaunsar-Bawar',
      regionHindi: 'गिरि नदी घाटी, नाहन व सिरमौर',
      features: 'Unique Southern Pahari ligatures, preserving folklore and Mahabharata traditions.',
      featuresHindi: 'महाभारत कथाओं, लोक-गाथाओं और गिरि-पार के ऐतिहासिक दस्तावेजों की अनूठी लिपि।',
      sample: '𑚨𑚮𑚤𑚢𑚵𑚤𑚯 𑚔𑚭𑚊𑚤𑚯',
    },
  ];

  return (
    <section id="takri-history-section" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-season-badge-bg border border-season-badge-border text-season-badge-text text-[11px] font-bold uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 bg-season-accent rounded-full"></span>
          <span>{scriptMode === 'bilingual' ? 'इतिहास • १२ शताब्दियों की धरोहर' : 'HISTORY • 1,200 YEARS OF HIMALAYAN HERITAGE'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-season-heading font-bold tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>टाकरी लिपि का ऐतिहासिक कालक्रम एवं वृत्तांत</span>
          ) : (
            <span>The Chronicles of Takri Script</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          {scriptMode === 'bilingual' ? (
            <span>प्राचीन शारदा उद्गम, चम्बा के शाही ताम्रपत्रों से लेकर यूनिकोड ६.० मान्यता और आधुनिक सामुदायिक पुनरुत्थान तक।</span>
          ) : (
            <span>From ancient Sharada origins and royal copper plates of Chamba to Unicode 6.0 recognition and modern community revival.</span>
          )}
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-season-badge-border pb-4">
        {[
          { id: 'timeline', label: scriptMode === 'bilingual' ? 'ऐतिहासिक कालक्रम (Timeline)' : 'Historical Timeline (कालक्रम)' },
          { id: 'variants', label: scriptMode === 'bilingual' ? 'क्षेत्रीय शैलियां (Regional Variations)' : 'Regional Variations (क्षेत्रीय भेद)' },
          { id: 'manuscripts', label: scriptMode === 'bilingual' ? 'ताम्रपत्र व अभिलेख (Copper Plates & Scribes)' : 'Copper Plates & Scribes (अभिलेख)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-season-accent text-white shadow-sm font-bold scale-102'
                : 'bg-white text-[#5c4a3b] hover:bg-season-badge-bg border border-season-badge-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-5 sm:space-y-6">
          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-season-badge-border hover:border-season-accent transition-all flex flex-col sm:flex-row items-start gap-6 shadow-sm hover:shadow-md"
            >
              <div className="sm:w-52 shrink-0 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-season-accent block">
                  {scriptMode === 'bilingual' ? evt.centuryHindi : evt.century}
                </span>
                <div className="font-takri text-2xl text-season-accent font-bold">
                  {evt.takri}
                </div>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-season-badge-bg text-season-accent border border-season-badge-border">
                  {scriptMode === 'bilingual' ? evt.tagHindi : evt.tag}
                </span>
              </div>

              <div className="flex-1 space-y-2 border-t sm:border-t-0 sm:border-l border-season-badge-border pt-4 sm:pt-0 sm:pl-6">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#2c1d11]">
                  {scriptMode === 'bilingual' ? evt.titleHindi : evt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#423223] leading-relaxed">
                  {scriptMode === 'bilingual' ? evt.descriptionHindi : evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Regional Variants */}
      {activeTab === 'variants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {variants.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-season-badge-border space-y-3 shadow-sm hover:border-season-accent transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-[#2c1d11]">
                  {scriptMode === 'bilingual' ? v.nameHindi : v.name}
                </h3>
                <span className="font-takri text-2xl text-season-accent font-bold">{v.sample}</span>
              </div>
              <div className="text-xs text-season-accent font-serif font-semibold">
                {scriptMode === 'bilingual' ? v.regionHindi : v.region}
              </div>
              <p className="text-xs text-[#5c4a3b] leading-relaxed">
                {scriptMode === 'bilingual' ? v.featuresHindi : v.features}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Manuscripts */}
      {activeTab === 'manuscripts' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-season-badge-border space-y-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-[#2c1d11]">
              {scriptMode === 'bilingual'
                ? 'भूरी सिंह संग्रहालय (चम्बा) एवं शाही ताम्रपत्र अभिलेखागार'
                : 'Bhuri Singh Museum & Chamba Royal Charters'}
            </h3>
            <p className="text-xs sm:text-sm text-[#423223] leading-relaxed">
              {scriptMode === 'bilingual'
                ? 'चम्बा का भूरी सिंह संग्रहालय टाकरी ताम्रपत्रों, फव्वारा प्रस्तर पट्टिकाओं और शाही सनदों का दुनिया का सबसे बड़ा केंद्र है। इन्हें राज-लेखकों (टाकरुरी/कायस्थ) द्वारा नरकट की कलम और पहाड़ी हस्तनिर्मित कागज पर लिखा जाता था।'
                : 'The Bhuri Singh Museum in Chamba houses the world\'s largest collection of Takri copper plate inscriptions (ताम्रपत्र), fountain stone slabs, and royal sanads. These documents were inscribed by royal scribes known as Takruris or Kaisths with goose quill reeds on handmade Pahari paper.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-season-badge-bg border border-season-badge-border text-center space-y-1">
              <span className="font-takri text-3xl text-season-accent font-bold block">𑚙𑚭𑚢𑚤𑚞𑚙𑚤</span>
              <div className="text-xs font-serif font-bold text-[#2c1d11]">
                {scriptMode === 'bilingual' ? '१५०+ ताम्रपत्र' : '150+ Copper Plates'}
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#7a695a]">
                {scriptMode === 'bilingual' ? 'चम्बा अभिलेखागार' : 'Preserved in Chamba archives'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-season-badge-bg border border-season-badge-border text-center space-y-1">
              <span className="font-takri text-3xl text-season-accent font-bold block">𑚞𑚴𑚚𑚯</span>
              <div className="text-xs font-serif font-bold text-[#2c1d11]">
                {scriptMode === 'bilingual' ? 'धार्मिक पोथियां' : 'Religious Pothis'}
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#7a695a]">
                {scriptMode === 'bilingual' ? 'पहाड़ी महाभारत व पुराण' : 'Pahari Mahabharata & Puranas'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-season-badge-bg border border-season-badge-border text-center space-y-1">
              <span className="font-takri text-3xl text-season-accent font-bold block">𑚥𑚮𑚋𑚭𑚤𑚯</span>
              <div className="text-xs font-serif font-bold text-[#2c1d11]">
                {scriptMode === 'bilingual' ? 'राजकीय सुलेखक' : 'Hereditary Scribes'}
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#7a695a]">
                {scriptMode === 'bilingual' ? 'टाकरुरी व कायस्थ परंपरा' : 'Trained in royal calligraphy'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

