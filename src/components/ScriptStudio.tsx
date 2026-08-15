import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Volume2,
  Share2,
  RotateCcw,
  BookOpen,
  Keyboard,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { universalConvert } from '../utils/takriTransliterator';
import { speakPhonetic } from '../utils/audioAmbience';
import { TAKRI_CONSONANTS, TAKRI_VOWELS, TAKRI_MATRAS, TAKRI_NUMERALS } from '../data/takriAlphabet';

interface ScriptStudioProps {
  prefilledText?: string;
}

interface CommonPhrase {
  english: string;
  hindi: string;
  category: 'greetings' | 'places' | 'culture' | 'blessings' | 'slangs' | 'gaddi';
  meaning?: string;
}

const COMMON_PHRASES: CommonPhrase[] = [
  // 10 Iconic Himachali Slangs & Dialect Expressions
  { english: 'Ara (Friend / Yaar)', hindi: 'अरा', category: 'slangs', meaning: 'Himachali expression for close friend/yaar' },
  { english: 'Bhaiji (Brother / Universal Friend)', hindi: 'भाईजी', category: 'slangs', meaning: 'Universal respectful kinship term for any brother or stranger' },
  { english: 'Thus Reh (Stay Calm / Quiet)', hindi: 'थुस रह', category: 'slangs', meaning: 'Mountain slang to stay calm, quiet and peaceful' },
  { english: 'Belma La De (Bring Herbs / Grass)', hindi: 'बेलमा ला दे', category: 'slangs', meaning: 'Famous youth dialect phrase for mountain herbs' },
  { english: 'Merko Terko (Me & You)', hindi: 'मेरको तेरको', category: 'slangs', meaning: 'Affectionate local pronoun style replacing mujhe/tujhe' },
  { english: 'Boom Shankar (Salute to Lord Shiva)', hindi: 'बूम शंकर', category: 'slangs', meaning: 'Devout Himalayan salutation to Lord Shiva' },
  { english: 'Ladi Hai Meri (She is My Wife / Partner)', hindi: 'लाड़ी है मेरी', category: 'slangs', meaning: 'Ladi signifies wife/partner in indigenous dialect' },
  { english: 'Ghussi Na Mar (Don\'t Lie / Blabber)', hindi: 'घुस्सी ना मार', category: 'slangs', meaning: 'Don\'t fabricate untrue stories to impress someone' },
  { english: 'Khapp Ho Gyi (Chaos Occurred)', hindi: 'खप्प हो गई', category: 'slangs', meaning: 'Unexpected or chaotic event took place' },
  { english: 'Ter Machi Hai (Tipsy Mountain Cheer)', hindi: 'तर मची है', category: 'slangs', meaning: 'High spirits and celebratory mountain vibe' },

  // Authentic Gaddi Language (from A Grammar of Gaddi)
  { english: 'Gaddi Language is Beautiful', hindi: 'गड्डी बोली छैल हा', category: 'gaddi', meaning: 'Chhail (छैल) = Beautiful, Ha (हा) = Is' },
  { english: 'Dhauladhar Snowy Peaks', hindi: 'धौलाधार रे पहाड़ बरफ री चादर ओढ़ी खड़े ने', category: 'gaddi', meaning: 'Majestic Dhauladhar peaks draped in white snow' },
  { english: 'Ghomtu (Migratory Mountain Spirit)', hindi: 'घोमतु', category: 'gaddi', meaning: 'Ghomtus: Nomadic people born with moving feet' },
  { english: 'Walk Swiftly (Taule-Taule)', hindi: 'तौंळै तौंळै चला', category: 'gaddi', meaning: 'Taule-taule = fast / swiftly' },
  { english: 'Walk Gently (Bale-Bale)', hindi: 'बलै बलै चला', category: 'gaddi', meaning: 'Bale-bale = slowly and steadily' },
  { english: 'Rain in the Evening (Sandzere)', hindi: 'संझरे बरखा आयी', category: 'gaddi', meaning: 'Evening rainfall in the high valley' },
  { english: 'Gobru Te Kudi (Boy and Girl)', hindi: 'गोबरू ते कुड़ी', category: 'gaddi', meaning: 'Gobru = young man, Kudi = young lady' },
  { english: 'Tomorrow Travel to Town', hindi: 'दुत्ते सेरा-जो गाणा', category: 'gaddi', meaning: 'Dutte = tomorrow, Shera-dzo = to the town' },

  // Standard Himalayan Heritage Phrases
  { english: 'Welcome to Himachal', hindi: 'हिमाचल में आपका स्वागत है', category: 'greetings' },
  { english: 'Greetings of peace', hindi: 'नमस्ते शांति', category: 'greetings' },
  { english: 'Thank you very much', hindi: 'बहुत बहुत धन्यवाद', category: 'greetings' },
  { english: 'Chamba Kingdom', hindi: 'चम्बा रियासत', category: 'places' },
  { english: 'Kangra Valley Fort', hindi: 'कांगड़ा किला', category: 'places' },
  { english: 'Mandi Shivratri Fair', hindi: 'मंडी शिवरात्रि मेला', category: 'places' },
  { english: 'Spiti Snow Valley', hindi: 'स्पीति घाटी', category: 'places' },
  { english: 'Sacred Hill Temple', hindi: 'पहाड़ी मंदिर', category: 'culture' },
  { english: 'Royal Copper Plate', hindi: 'ताम्रपत्र अभिलेख', category: 'culture' },
  { english: 'Pahari Folk Song', hindi: 'पहाड़ी लोकगीत', category: 'culture' },
  { english: 'Peace to the mountains', hindi: 'पहाड़ों में शांति', category: 'blessings' },
];

export const ScriptStudio: React.FC<ScriptStudioProps> = ({ prefilledText = '' }) => {
  const [inputText, setInputText] = useState(prefilledText || 'Himachal Pradesh Chamba');
  const [copied, setCopied] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadTab, setKeypadTab] = useState<'consonants' | 'vowels' | 'matras' | 'numerals'>('consonants');
  const [cardTheme, setCardTheme] = useState<'slate' | 'copper' | 'bhojpatra'>('slate');
  const [phraseCategory, setPhraseCategory] = useState<'all' | 'slangs' | 'gaddi' | 'greetings' | 'places' | 'culture' | 'blessings'>('all');

  const converted = universalConvert(inputText);

  const handleCopy = (mode: 'takri' | 'all' = 'takri') => {
    if (!converted.takri || !navigator.clipboard) return;

    let textToCopy = converted.takri;
    if (mode === 'all') {
      textToCopy = `${converted.takri}\n${converted.devanagari} (${converted.englishPhonetic})\n— Translated via HimVani Takri`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertChar = (char: string) => {
    setInputText((prev) => prev + char);
  };

  const handleClear = () => {
    setInputText('');
  };

  // Export Calligraphy Parchment Card
  const handleExportCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 560;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Theme backgrounds
    if (cardTheme === 'copper') {
      // Royal Copper Plate Theme
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#2e1c16');
      grad.addColorStop(0.5, '#3b241c');
      grad.addColorStop(1, '#241410');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#d49b6a';
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      ctx.strokeStyle = 'rgba(212, 155, 106, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);
    } else if (cardTheme === 'bhojpatra') {
      // Golden Bhojpatra Parchment
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#2b241a');
      grad.addColorStop(0.5, '#362d20');
      grad.addColorStop(1, '#201a12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#e5c07b';
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      ctx.strokeStyle = 'rgba(229, 192, 123, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);
    } else {
      // Slate Night (Natural Tones)
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#152325');
      grad.addColorStop(0.5, '#1d3033');
      grad.addColorStop(1, '#111c1e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);
    }

    // Top Header Seal
    ctx.font = 'bold 14px "Cinzel", "Plus Jakarta Sans", serif';
    ctx.fillStyle = cardTheme === 'copper' ? '#d49b6a' : '#c5a059';
    ctx.textAlign = 'center';
    ctx.fillText('✦ HIMALAYAN SACRED SCRIPT ARCHIVE • HIMVANI TAKRI ✦', canvas.width / 2, 85);
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('DEVBHUMI HIMACHAL PRADESH • INDIGENOUS TAKRI EPIGRAPHY', canvas.width / 2, 110);

    // Main Takri Calligraphy
    ctx.font = 'bold 76px "Noto Sans Takri", serif';
    ctx.fillStyle = cardTheme === 'copper' ? '#f5c99e' : '#dfbe7b';
    ctx.fillText(converted.takri || '𑚔𑚭𑚊𑚤𑚯', canvas.width / 2, 260);

    // Devanagari translation
    ctx.font = 'italic 28px "Plus Jakarta Sans", serif';
    ctx.fillStyle = '#f0f4f4';
    ctx.fillText(converted.devanagari || inputText, canvas.width / 2, 340);

    // English IAST phonetic
    ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#9fb3b5';
    ctx.fillText(`Phonetic: ${converted.englishPhonetic || inputText}`, canvas.width / 2, 385);

    // Bottom Decorative Divider
    ctx.strokeStyle = cardTheme === 'copper' ? 'rgba(212, 155, 106, 0.4)' : 'rgba(197, 160, 89, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 180, 430);
    ctx.lineTo(canvas.width / 2 + 180, 430);
    ctx.stroke();

    // Footer Seal
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = cardTheme === 'copper' ? '#d49b6a' : '#c5a059';
    ctx.fillText('𑚔𑚭𑚊𑚤𑚯 𑚞𑚤𑚢𑚭𑚘𑚮𑚙 • Unicode 6.0 U+11680–U+116CF', canvas.width / 2, 470);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText('Preserved via HimVani Takri Heritage Initiative', canvas.width / 2, 495);

    const link = document.createElement('a');
    link.download = `takri-calligraphy-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Inspect individual Takri characters present in output
  const inspectCharacters = () => {
    if (!converted.takri) return [];
    const chars = Array.from(converted.takri);
    const seen = new Set<string>();
    const result: Array<{ char: string; hex: string; name: string }> = [];

    for (const ch of chars) {
      if (ch === ' ' || seen.has(ch)) continue;
      seen.add(ch);
      const codePoint = ch.codePointAt(0);
      if (!codePoint) continue;
      const hex = `U+${codePoint.toString(16).toUpperCase()}`;

      // Match in alphabet
      const match =
        TAKRI_CONSONANTS.find((c) => c.char === ch) ||
        TAKRI_VOWELS.find((v) => v.char === ch) ||
        TAKRI_MATRAS.find((m) => m.char === ch) ||
        TAKRI_NUMERALS.find((n) => n.char === ch);

      result.push({
        char: ch,
        hex,
        name: match ? `${match.devanagari} (${match.english})` : hex,
      });
    }

    return result;
  };

  const inspectedList = inspectCharacters();

  const filteredPhrases = COMMON_PHRASES.filter((p) => {
    if (phraseCategory === 'all') return true;
    return p.category === phraseCategory;
  });

  return (
    <section id="script-translator-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full"></span>
          <span>लिप्यांतरण एवं सुलेख • TAKRI SCRIPT TRANSLATOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Universal Takri Script Transliterator
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-light italic">
          Convert words and sentences between English, Hindi, and historic Takri Unicode script with syllable breakdown, virtual on-screen keypad, and exportable calligraphy artwork.
        </p>
      </div>

      {/* Main Two-Column Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Text Editor & Keypad */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-5">
            {/* Box Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                <h3 className="text-sm font-serif text-white uppercase tracking-wider">
                  Source Text (स्रोत लेख)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKeypad(!showKeypad)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    showKeypad
                      ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow'
                      : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                  }`}
                  title="Toggle Virtual Takri Keyboard"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{showKeypad ? 'Hide Keypad' : 'Takri Keypad'}</span>
                </button>
                {inputText && (
                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                    title="Clear input text"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Input Text Area */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider text-white/70">
                Type in English, Hindi (Devanagari), or Takri:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                placeholder="Type your text here (e.g., Chamba ki rani, Namaste Himachal, Mandi town, Kangra)..."
                className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059] transition-all resize-y leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-white/40">
                <span>Supports Unicode U+11680–U+116CF</span>
                <span>{inputText.length} chars • {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
              </div>
            </div>

            {/* Virtual Keypad (Toggleable) */}
            {showKeypad && (
              <div className="p-4 rounded-2xl bg-black/40 border border-[#c5a059]/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-serif text-[#c5a059]">On-Screen Takri Keys:</span>
                  <div className="flex items-center gap-1">
                    {(['consonants', 'vowels', 'matras', 'numerals'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setKeypadTab(tab)}
                        className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                          keypadTab === tab
                            ? 'bg-[#c5a059] text-[#1a2a2c] font-bold'
                            : 'bg-white/5 text-white/60 hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Character Matrix */}
                <div className="max-h-48 overflow-y-auto scrollbar-thin">
                  {keypadTab === 'consonants' && (
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                      {TAKRI_CONSONANTS.map((c) => (
                        <button
                          key={c.unicode}
                          onClick={() => handleInsertChar(c.char)}
                          className="h-10 rounded-xl bg-white/5 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-[#dfbe7b] font-takri text-xl font-bold border border-white/10 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                          title={`${c.devanagari} (${c.iast})`}
                        >
                          {c.char}
                        </button>
                      ))}
                    </div>
                  )}

                  {keypadTab === 'vowels' && (
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                      {TAKRI_VOWELS.map((v) => (
                        <button
                          key={v.unicode}
                          onClick={() => handleInsertChar(v.char)}
                          className="h-10 rounded-xl bg-white/5 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-white font-takri text-xl font-bold border border-white/10 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                          title={`${v.devanagari}`}
                        >
                          {v.char}
                        </button>
                      ))}
                    </div>
                  )}

                  {keypadTab === 'matras' && (
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                      {TAKRI_MATRAS.map((m) => (
                        <button
                          key={m.unicode}
                          onClick={() => handleInsertChar(m.char)}
                          className="h-10 rounded-xl bg-[#c5a059]/15 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-[#dfbe7b] font-takri text-xl font-bold border border-[#c5a059]/30 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                          title={`${m.devanagari} matra`}
                        >
                          {m.char}
                        </button>
                      ))}
                    </div>
                  )}

                  {keypadTab === 'numerals' && (
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                      {TAKRI_NUMERALS.map((n) => (
                        <button
                          key={n.unicode}
                          onClick={() => handleInsertChar(n.char)}
                          className="h-10 rounded-xl bg-white/5 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-white font-takri text-xl font-bold border border-white/10 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                          title={`${n.devanagari} (${n.english})`}
                        >
                          {n.char}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Preset Words */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                Quick Historical Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Himachal Pradesh', val: 'Himachal Pradesh' },
                  { label: 'Chamba Kingdom', val: 'Chamba Maharaj' },
                  { label: 'Kangra Valley', val: 'Kangra Valley' },
                  { label: 'Mandi Shivratri', val: 'Mandi Shivratri' },
                  { label: 'Spiti Gompa', val: 'Spiti Gompa' },
                  { label: 'Namaste', val: 'Namaste' },
                  { label: 'Shanti', val: 'Shanti' },
                ].map((sample) => (
                  <button
                    key={sample.val}
                    onClick={() => {
                      setInputText(sample.val);
                    }}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#c5a059]/20 hover:text-[#dfbe7b] text-xs text-white/70 border border-white/10 hover:border-[#c5a059]/40 transition-all cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Takri Rendered Output, Analysis & Export */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Translated Output Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#c5a059]/40 shadow-2xl space-y-5">
            {/* Box Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm font-serif text-[#c5a059] uppercase tracking-wider">
                  Takri Script Output (टाकरी लिपि)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakPhonetic(converted.devanagari || inputText)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopy('takri')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs uppercase tracking-tight shadow transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Takri'}</span>
                </button>
              </div>
            </div>

            {/* Display Area for Large Takri Glyphs */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/35 border border-white/5 shadow-inner text-center space-y-4">
              <div className="font-takri text-4xl sm:text-6xl text-[#dfbe7b] font-bold tracking-wide select-all leading-tight text-glow-gold py-2">
                {converted.takri || '𑚔𑚭𑚊𑚤𑚯'}
              </div>

              {/* Trilingual Annotations */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/80">
                <span className="font-serif italic text-white text-sm">
                  <strong>Hindi:</strong> {converted.devanagari || inputText}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-white/60">
                  <strong>Phonetic:</strong> {converted.englishPhonetic}
                </span>
              </div>
            </div>

            {/* Syllable & Character Breakdown Badges */}
            {inspectedList.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10 text-left">
                <span className="text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                  Script Glyph Breakdown:
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectedList.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 flex items-center gap-2"
                    >
                      <span className="font-takri text-xl text-[#dfbe7b] font-bold">{item.char}</span>
                      <div className="text-[10px] leading-tight">
                        <div className="text-white/80 font-medium">{item.name}</div>
                        <div className="text-white/40 font-mono">{item.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calligraphy Export Customizer */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif text-white/80 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Calligraphy Artwork Theme:</span>
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'slate', label: 'Slate Night' },
                    { id: 'copper', label: 'Copper Plate' },
                    { id: 'bhojpatra', label: 'Bhojpatra' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCardTheme(t.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                        cardTheme === t.id
                          ? 'bg-[#c5a059] text-[#1a2a2c] font-bold'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleCopy('all')}
                  className="text-xs text-white/60 hover:text-[#c5a059] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Full Transliteration</span>
                </button>

                <button
                  onClick={handleExportCard}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs uppercase tracking-tight shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Calligraphy PNG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Pahari Phrases & Expressions Dictionary */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c5a059]" />
              <h3 className="text-lg font-serif text-white">Himachali Expressions & Phrases Dictionary</h3>
            </div>
            <p className="text-xs text-white/60 font-light italic">
              Click any phrase below to load it into the translator and generate Takri inscriptions instantly.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1">
            {[
              { id: 'all', label: 'All Expressions' },
              { id: 'slangs', label: 'Himachali Slangs (लोक बोल)' },
              { id: 'gaddi', label: 'Gaddi Heritage (गड्डी)' },
              { id: 'greetings', label: 'Greetings' },
              { id: 'places', label: 'Places' },
              { id: 'culture', label: 'Culture' },
              { id: 'blessings', label: 'Blessings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPhraseCategory(tab.id as any)}
                className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  phraseCategory === tab.id
                    ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Phrases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhrases.map((phrase, idx) => {
            const phraseConv = universalConvert(phrase.hindi);
            return (
              <div
                key={idx}
                onClick={() => {
                  setInputText(phrase.hindi);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="group p-4 rounded-2xl bg-black/25 hover:bg-black/40 border border-white/5 hover:border-[#c5a059]/40 transition-all cursor-pointer space-y-2 text-left"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white group-hover:text-[#c5a059] transition-colors">
                    {phrase.english}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
                </div>

                <div className="font-takri text-2xl text-[#dfbe7b] font-bold select-all">
                  {phraseConv.takri}
                </div>

                <div className="text-xs text-white/70 font-serif italic">
                  {phrase.hindi}
                </div>

                {phrase.meaning && (
                  <div className="text-[10px] text-[#c5a059]/80 font-light border-t border-white/5 pt-1.5">
                    {phrase.meaning}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
