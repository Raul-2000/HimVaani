// Comprehensive transliteration mapping between Devanagari / IAST / English and Takri Unicode (U+11680 - U+116CF)

export const DEVANAGARI_TO_TAKRI_VOWELS: Record<string, string> = {
  'अ': '𑚀',
  'आ': '𑚁',
  'इ': '𑚂',
  'ई': '𑚃',
  'उ': '𑚄',
  'ऊ': '𑚅',
  'ए': '𑚆',
  'ऐ': '𑚇',
  'ओ': '𑚈',
  'औ': '𑚉',
};

export const DEVANAGARI_TO_TAKRI_CONSONANTS: Record<string, string> = {
  'क': '𑚊',
  'ख': '𑚋',
  'ग': '𑚌',
  'घ': '𑚍',
  'ङ': '𑚎',
  'च': '𑚏',
  'छ': '𑚐',
  'ज': '𑚑',
  'झ': '𑚒',
  'ञ': '𑚓',
  'ट': '𑚔',
  'ठ': '𑚕',
  'ड': '𑚖',
  'ढ': '𑚗',
  'ण': '𑚘',
  'त': '𑚙',
  'थ': '𑚚',
  'द': '𑚛',
  'ध': '𑚜',
  'न': '𑚝',
  'प': '𑚞',
  'फ': '𑚟',
  'ब': '𑚠',
  'भ': '𑚡',
  'म': '𑚢',
  'य': '𑚣',
  'र': '𑚤',
  'ल': '𑚥',
  'व': '𑚦',
  'श': '𑚧',
  'ष': '𑚧', // Takri traditionally merged sha and sha or uses 𑚧
  'स': '𑚨',
  'ह': '𑚩',
  'ड़': '𑚪',
  'ढ़': '𑚗',
  'क़': '𑚊',
  'ख़': '𑚋',
  'ग़': '𑚌',
  'ज़': '𑚑',
  'फ़': '𑚟',
};

export const DEVANAGARI_TO_TAKRI_MATRAS: Record<string, string> = {
  'ा': '𑚭', // AA
  'ि': '𑚮', // I
  'ी': '𑚯', // II
  'ु': '𑚰', // U
  'ू': '𑚱', // UU
  'े': '𑚲', // E
  'ै': '𑚳', // AI
  'ो': '𑚴', // O
  'ौ': '𑚵', // AU
  '्': '', // VIRAMA
  'ं': '𑚫', // ANUSVARA
  'ँ': '𑚫', // ANUNASIKA -> ANUSVARA
  'ः': '𑚬', // VISARGA
  '़': '', // NUKTA
};

export const DEVANAGARI_TO_TAKRI_NUMERALS: Record<string, string> = {
  '०': '𑛀', '0': '𑛀',
  '१': '𑛁', '1': '𑛁',
  '२': '𑛂', '2': '𑛂',
  '३': '𑛃', '3': '𑛃',
  '४': '𑛄', '4': '𑛄',
  '५': '𑛅', '5': '𑛅',
  '६': '𑛆', '6': '𑛆',
  '७': '𑛇', '7': '𑛇',
  '८': '𑛈', '8': '𑛈',
  '९': '𑛉', '9': '𑛉',
};

// Reverse mappings for Takri -> Devanagari
export const TAKRI_TO_DEVANAGARI: Record<string, string> = {};
Object.entries(DEVANAGARI_TO_TAKRI_VOWELS).forEach(([dev, tak]) => { TAKRI_TO_DEVANAGARI[tak] = dev; });
Object.entries(DEVANAGARI_TO_TAKRI_CONSONANTS).forEach(([dev, tak]) => { if (!TAKRI_TO_DEVANAGARI[tak]) TAKRI_TO_DEVANAGARI[tak] = dev; });
Object.entries(DEVANAGARI_TO_TAKRI_MATRAS).forEach(([dev, tak]) => { if (!TAKRI_TO_DEVANAGARI[tak]) TAKRI_TO_DEVANAGARI[tak] = dev; });
Object.entries(DEVANAGARI_TO_TAKRI_NUMERALS).forEach(([dev, tak]) => { if (/[0-9]/.test(dev)) TAKRI_TO_DEVANAGARI[tak] = dev; });

// Common English words to Takri & Hindi phonetic dictionary for instant friendly transliteration
export const COMMON_WORDS_MAP: Record<string, { takri: string; hindi: string }> = {
  'namaste': { takri: '𑚝𑚢𑚨𑚙𑚲', hindi: 'नमस्ते' },
  'namaskar': { takri: '𑚝𑚢𑚨𑚊𑚭𑚤', hindi: 'नमस्कार' },
  'himachal': { takri: '𑚩𑚮𑚢𑚭𑚏𑚥', hindi: 'हिमाचल' },
  'takri': { takri: '𑚔𑚭𑚊𑚤𑚯', hindi: 'टाकरी' },
  'pahari': { takri: '𑚞𑚩𑚭𑚚𑚯', hindi: 'पहाड़ी' },
  'gaddi': { takri: '𑚌𑚛𑚛𑚯', hindi: 'गड्डी' },
  'chamba': { takri: '𑚏𑚢𑚠𑚭', hindi: 'चम्बा' },
  'kangra': { takri: '𑚊𑚭𑚫𑚌𑚚𑚭', hindi: 'कांगड़ा' },
  'mandi': { takri: '𑚢𑚫𑚚𑚯', hindi: 'मंडी' },
  'kullu': { takri: '𑚊𑚰𑚥𑚥𑚱', hindi: 'कुल्लू' },
  'spiti': { takri: '𑚨𑚞𑚮𑚙𑚯', hindi: 'स्पीति' },
  'kinnaur': { takri: '𑚊𑚮𑚝𑚝𑚵𑚤', hindi: 'किन्नौर' },
  'shimla': { takri: '𑚧𑚮𑚢𑚥𑚭', hindi: 'शिमला' },
  'dharamshala': { takri: '𑚜𑚤𑚢𑚧𑚭𑚥𑚭', hindi: 'धर्मशाला' },
  'manali': { takri: '𑚢𑚝𑚭𑚥𑚯', hindi: 'मनाली' },
  'sarahan': { takri: '𑚨𑚤𑚭𑚩𑚭𑚝', hindi: 'सराहन' },
  'prashar': { takri: '𑚞𑚤𑚧𑚭𑚤', hindi: 'पराशर' },
  'hello': { takri: '𑚝𑚢𑚨𑚙𑚲', hindi: 'नमस्ते' },
  'welcome': { takri: '𑚨𑚦𑚭𑚌𑚙', hindi: 'स्वागत' },
  'love': { takri: '𑚞𑚤𑚲𑚢', hindi: 'प्रेम' },
  'peace': { takri: '𑚧𑚭𑚫𑚙𑚮', hindi: 'शांति' },
  'mountain': { takri: '𑚞𑚩𑚭𑚚', hindi: 'पहाड़' },
  'mountains': { takri: '𑚞𑚩𑚭𑚚', hindi: 'पहाड़' },
  'river': { takri: '𑚝𑚛𑚯', hindi: 'नदी' },
  'temple': { takri: '𑚢𑚫𑚛𑚮𑚤', hindi: 'मंदिर' },
  'script': { takri: '𑚥𑚮𑚞𑚮', hindi: 'लिपि' },
  'heritage': { takri: '𑚜𑚤𑚴𑚩𑚤', hindi: 'धरोहर' },
  'king': { takri: '𑚤𑚭𑚑𑚭', hindi: 'राजा' },
  'valley': { takri: '𑚄𑚞𑚙𑚣𑚊𑚭', hindi: 'घाटी' },
  // Himachali Slangs & Dialect Expressions
  'ara': { takri: '𑚀𑚤𑚭', hindi: 'अरा' },
  'bhaiji': { takri: '𑚡𑚭𑚃𑚑𑚯', hindi: 'भाईजी' },
  'thus': { takri: '𑚚𑚰𑚨', hindi: 'थुस' },
  'thus reh': { takri: '𑚚𑚰𑚨 𑚤𑚩', hindi: 'थुस रह' },
  'belma': { takri: '𑚠𑚲𑚥𑚢𑚭', hindi: 'बेलमा' },
  'merko': { takri: '𑚢𑚲𑚤𑚊𑚴', hindi: 'मेरको' },
  'terko': { takri: '𑚙𑚲𑚤𑚊𑚴', hindi: 'तेरको' },
  'boom shankar': { takri: '𑚠𑚰𑚢 𑚧𑚫𑚊𑚤', hindi: 'बूम शंकर' },
  'ladi': { takri: '𑚥𑚭𑚚𑚯', hindi: 'लाड़ी' },
  'ghussi': { takri: '𑚍𑚰𑚨𑚨𑚯', hindi: 'घुस्सी' },
  'khapp': { takri: '𑚋𑚞𑚞', hindi: 'खप्प' },
  'ter': { takri: '𑚙𑚤', hindi: 'तर' },
  // Gaddi Lexicon from Grammar of Gaddi
  'chhail': { takri: '𑚐𑚳𑚥', hindi: 'छैल' },
  'ghomtu': { takri: '𑚍𑚴𑚢𑚙𑚰', hindi: 'घोमतु' },
  'gobru': { takri: '𑚌𑚴𑚠𑚤𑚱', hindi: 'गोबरू' },
  'hiun': { takri: '𑚩𑚮𑚅𑚫', hindi: 'हिऊं' },
  'barkha': { takri: '𑚠𑚤𑚋𑚭', hindi: 'बरखा' },
};

// Roman / English phonetic chunks to Devanagari for fallback parsing
const ROMAN_TO_DEV_MAP: [RegExp, string][] = [
  [/ksha/gi, 'क्ष'], [/gya/gi, 'ज्ञ'], [/tra/gi, 'त्र'], [/shri/gi, 'श्री'],
  [/kh/gi, 'ख'], [/gh/gi, 'घ'], [/ch/gi, 'च'], [/chh/gi, 'छ'], [/jh/gi, 'झ'],
  [/th/gi, 'थ'], [/dh/gi, 'ध'], [/ph/gi, 'फ'], [/bh/gi, 'भ'], [/sh/gi, 'श'],
  [/aa/gi, 'ा'], [/ee/gi, 'ी'], [/oo/gi, 'ू'], [/ai/gi, 'ै'], [/au/gi, 'ौ'],
  [/a/gi, ''], [/i/gi, 'ि'], [/u/gi, 'ु'], [/e/gi, 'े'], [/o/gi, 'ो'],
  [/k/gi, 'क'], [/g/gi, 'ग'], [/j/gi, 'ज'], [/t/gi, 'त'], [/d/gi, 'द'],
  [/n/gi, 'न'], [/p/gi, 'प'], [/b/gi, 'ब'], [/m/gi, 'म'], [/y/gi, 'य'],
  [/r/gi, 'र'], [/l/gi, 'ल'], [/v/gi, 'व'], [/w/gi, 'व'], [/s/gi, 'स'],
  [/h/gi, 'ह'], [/z/gi, 'ज़'], [/f/gi, 'फ़'],
];

/**
 * Transliterate Devanagari text to Takri script
 */
export function devanagariToTakri(text: string): string {
  if (!text) return '';
  let result = '';
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const char = text[i];
    const nextChar = text[i + 1] || '';

    // Ignore halant / virama and standalone nukta in Takri
    if (char === '्' || char === '़') {
      continue;
    }

    // Check 2-char combinations (like nukta combinations, e.g. ड़ = ड + ़)
    const combined = char + nextChar;
    if (DEVANAGARI_TO_TAKRI_CONSONANTS[combined]) {
      result += DEVANAGARI_TO_TAKRI_CONSONANTS[combined];
      i++;
      continue;
    }

    if (DEVANAGARI_TO_TAKRI_VOWELS[char]) {
      result += DEVANAGARI_TO_TAKRI_VOWELS[char];
    } else if (DEVANAGARI_TO_TAKRI_CONSONANTS[char]) {
      result += DEVANAGARI_TO_TAKRI_CONSONANTS[char];
    } else if (DEVANAGARI_TO_TAKRI_MATRAS[char] !== undefined) {
      result += DEVANAGARI_TO_TAKRI_MATRAS[char];
    } else if (DEVANAGARI_TO_TAKRI_NUMERALS[char]) {
      result += DEVANAGARI_TO_TAKRI_NUMERALS[char];
    } else {
      result += char;
    }
  }

  return sanitizeTakri(result);
}

/**
 * Remove any unassigned or non-rendering characters
 */
export function sanitizeTakri(text: string): string {
  if (!text) return '';
  return text.replace(/[\u{116B6}\u{116B7}\u{116BF}\u{116B8}-\u{116BE}\u094D\u093C]/gu, '');
}

/**
 * Transliterate Takri script to Devanagari
 */
export function takriToDevanagari(text: string): string {
  if (!text) return '';
  let result = '';
  // Takri characters are surrogate pairs / 32-bit unicode code points in JS (surrogates)
  // Use Array.from to correctly iterate code points
  const chars = Array.from(text);

  for (const ch of chars) {
    if (TAKRI_TO_DEVANAGARI[ch]) {
      result += TAKRI_TO_DEVANAGARI[ch];
    } else {
      result += ch;
    }
  }

  return result;
}

/**
 * Convert simple English/Roman phonetic text to Devanagari and Takri
 */
export function englishToTakri(input: string): { takri: string; devanagari: string } {
  if (!input) return { takri: '', devanagari: '' };

  const words = input.toLowerCase().trim().split(/\s+/);
  const takriWords: string[] = [];
  const devWords: string[] = [];

  for (const w of words) {
    const cleanW = w.replace(/[^\w]/g, '');
    if (COMMON_WORDS_MAP[cleanW]) {
      takriWords.push(COMMON_WORDS_MAP[cleanW].takri);
      devWords.push(COMMON_WORDS_MAP[cleanW].hindi);
      continue;
    }

    // Heuristic Roman to Devanagari conversion
    let dev = w;
    for (const [regex, replacement] of ROMAN_TO_DEV_MAP) {
      dev = dev.replace(regex, replacement);
    }

    const tak = devanagariToTakri(dev);
    takriWords.push(tak || w);
    devWords.push(dev || w);
  }

  return {
    takri: takriWords.join(' '),
    devanagari: devWords.join(' '),
  };
}

/**
 * Smart Universal Converter:
 * Determines whether input is Takri, Devanagari, or English, and converts to all formats.
 */
export function universalConvert(input: string): {
  takri: string;
  devanagari: string;
  englishPhonetic: string;
  detectedType: 'takri' | 'devanagari' | 'english';
} {
  if (!input || !input.trim()) {
    return { takri: '', devanagari: '', englishPhonetic: '', detectedType: 'english' };
  }

  const isTakri = /[\u{11680}-\u{116CF}]/u.test(input);
  const isDevanagari = /[\u0900-\u097F]/.test(input);

  if (isTakri) {
    const dev = takriToDevanagari(input);
    return {
      takri: input,
      devanagari: dev,
      englishPhonetic: dev,
      detectedType: 'takri',
    };
  }

  if (isDevanagari) {
    const tak = devanagariToTakri(input);
    return {
      takri: tak,
      devanagari: input,
      englishPhonetic: input,
      detectedType: 'devanagari',
    };
  }

  // English / Roman
  const converted = englishToTakri(input);
  return {
    takri: converted.takri,
    devanagari: converted.devanagari,
    englishPhonetic: input,
    detectedType: 'english',
  };
}
