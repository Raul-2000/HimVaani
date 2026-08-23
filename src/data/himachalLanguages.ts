export interface HimachalLanguage {
  id: string;
  name: string;
  nameHindi: string;
  nameTakri: string;
  family: string;
  region: string;
  speakersCount: string;
  description: string;
  scriptHistory: string;
  samplePhrases: {
    phraseEnglish: string;
    phraseNative: string;
    phraseTakri: string;
    meaning: string;
    phonetics: string;
  }[];
  uniqueFeatures: string[];
}

export const HIMACHAL_LANGUAGES: HimachalLanguage[] = [
  {
    id: 'kangri',
    name: 'Kangri',
    nameHindi: 'कांगड़ी',
    nameTakri: '𑚊𑚭𑚫𑚍𑚚𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Kangra, Hamirpur, Una & lower Mandi',
    speakersCount: 'approx. 1.7 Million',
    description: 'The most widely spoken Western Pahari language in Himachal Pradesh, known for its melodic intonations, rich folk proverbs (Kahanis), and classical love songs.',
    scriptHistory: 'Historically written in the Kangra variety of Takri script for royal decrees, land grants, and temple inscriptions prior to Devanagari adoption in the 20th century.',
    samplePhrases: [
      {
        phraseEnglish: 'How are you?',
        phraseNative: 'तुसां के हाल चाले?',
        phraseTakri: '𑚙𑚰𑚨𑚭𑚫 𑚊𑚲 𑚩𑚭𑚥 𑚏𑚭𑚥𑚲?',
        meaning: 'Asking someone about their well-being respectfully.',
        phonetics: 'Tusaan ke haal chaale?'
      },
      {
        phraseEnglish: 'I am fine, thank you.',
        phraseNative: 'हां ठीक हां, तुहाड़ी कृपा ऐ।',
        phraseTakri: '𑚩𑚭𑚫 𑚕𑚯𑚊 𑚩𑚭𑚫, 𑚙𑚰𑚩𑚭𑚪𑚯 𑚊ƒ𑚞𑚭 𑚐𑚶𑚚𑚴।',
        meaning: 'Affirming good health and expressing gratitude.',
        phonetics: 'Haa theek haa, tuhaadi kripa ae.'
      },
      {
        phraseEnglish: 'Welcome to our home.',
        phraseNative: 'साढ़े घरे तुसांदा सुआगत ऐ।',
        phraseTakri: '𑚨𑚭𑚪𑚲 𑚍𑚤𑚲 𑚙𑚰𑚨𑚭𑚫𑚛𑚭 𑚨𑚰𑚁𑚍𑚙 𑚐𑚶𑚚𑚴।',
        meaning: 'Warm traditional Kangri hospitality greeting.',
        phonetics: 'Saadhe ghare tusaanda suaagat ae.'
      }
    ],
    uniqueFeatures: [
      'Distinct past-tense auxiliary "था/थी" replaced with "हा/ही/हे"',
      'Rich vocabulary for agricultural seasons and mountain topography',
      'Extensive oral repertoire in Kangri miniature painting descriptions'
    ]
  },
  {
    id: 'mandeali',
    name: 'Mandeali',
    nameHindi: 'मंडियाली',
    nameTakri: '𑚢𑚉𑚫𑚖𑚮𑚣𑚭𑚥𑚯',
    family: 'Indo-Aryan (Western Pahari - Central)',
    region: 'Mandi Valley, Suket, Sarkaghat & Jogindernagar',
    speakersCount: 'approx. 900,000',
    description: 'The sonorous speech of the central Beas basin and Chhoti Kashi, celebrated for its unique postpositions, musical folk theatre (Bantha), and devotion to local devtas.',
    scriptHistory: 'Mandeali Takri was one of the most standardized forms of the script, preserved on hundreds of copper plates in the Mandi palace archives.',
    samplePhrases: [
      {
        phraseEnglish: 'Where are you going?',
        phraseNative: 'तुसे काहां चल्ली रे?',
        phraseTakri: '𑚙𑚰𑚨𑚲 𑚊𑚭𑚩𑚭𑚫 𑚏𑚥𑚥𑚯 𑚤𑚲?',
        meaning: 'Asking destination or journey plan.',
        phonetics: 'Tuse kaahan challi re?'
      },
      {
        phraseEnglish: 'Come, let us eat food together.',
        phraseNative: 'आवा, सारया रली-मिली रोटी खाई लेवां।',
        phraseTakri: '𑚁𑚦𑚭, 𑚨𑚭𑚤𑚣𑚭 𑚤𑚥𑚯-𑚢𑚮𑚥𑚯 𑚤𑚴𑚔𑚯 𑚋𑚭𑚃 𑚥𑚲𑚦𑚭𑚫।',
        meaning: 'Inviting family or guests to enjoy a meal.',
        phonetics: 'Aava, saarya rali-mili roti khaai lewaan.'
      }
    ],
    uniqueFeatures: [
      'Frequent nasalization and diphthongs giving a smooth rhythmic tone',
      'Dual noun endings differentiating high-pasture livestock from valley animals',
      'Ritual language of the devta oracles (Gurs) in the Mandi devta court'
    ]
  },
  {
    id: 'kulvi',
    name: 'Kulvi',
    nameHindi: 'कुल्लवी',
    nameTakri: '𑚊𑚰𑚥𑚥𑚦𑚯',
    family: 'Indo-Aryan (Western Pahari - Northern)',
    region: 'Kullu, Manali, Parvati Valley, Sainj & Tirthan',
    speakersCount: 'approx. 380,000',
    description: 'The melodic dialect of the "Valley of Gods", deeply intertwined with the ancient verses sung during Nati circle dances and the invocations of Raghunath Ji.',
    scriptHistory: 'Written in Kulvi Takri in temple logs, astrologer horoscopes (Tewa), and royal treaties between Kullu kings and neighboring Tibetan chieftains.',
    samplePhrases: [
      {
        phraseEnglish: 'Greetings (May the Gods bless you).',
        phraseNative: 'नमस्ते, देवते रा आशीर्वाद राओ।',
        phraseTakri: '𑚝𑚢𑚨𑚙𑚲, 𑚛𑚲𑚦𑚙𑚲 𑚤𑚭 𑚁𑚧𑚯𑚤𑚦𑚭𑚛 𑚤𑚭𑚪𑚴।',
        meaning: 'Pious greeting invoking village devta.',
        phonetics: 'Namaste, Devte ra aashirwaad rao.'
      },
      {
        phraseEnglish: 'The apple orchard looks radiant this year.',
        phraseNative: 'एस साल सेबू रे बगाचे खूब सोभणे लायी रे।',
        phraseTakri: '𑚊𑚨 𑚨𑚭𑚥 𑚨𑚲𑚠𑚱 𑚤𑚲 𑚠𑚍𑚭𑚏𑚲 𑚋𑚱𑚠 𑚨𑚴𑚡𑚘𑚲 𑚥𑚭𑚣𑚯 𑚤𑚲।',
        meaning: 'Expressing joy over apple harvest season.',
        phonetics: 'Es saal sebu re bagaache khoob sobhane laayi re.'
      }
    ],
    uniqueFeatures: [
      'Distinctive vocabulary for high Himalayan flora, glades (thach), and passes (jot)',
      'Specific verb conjugations when addressing deities and sacred elders',
      'The lyrical foundation of Kullu Nati folk epics'
    ]
  },
  {
    id: 'chambeali',
    name: 'Chambeali & Gaddi',
    nameHindi: 'चंबयाली एवं गद्दी',
    nameTakri: '𑚏𑚢𑚠𑚣𑚭𑚥𑚯 𑚙𑚲 𑚍𑚛𑚛𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Chamba, Bharmour, Pangi & Dhauladhar slopes',
    speakersCount: 'approx. 450,000',
    description: 'The regal language of Chamba Valley and the shepherd verses of the nomadic Gaddi tribes traversing the Pir Panjal and Dhauladhar passes.',
    scriptHistory: 'Chamba is the world epicenter of Takri scholarship, with the largest preserved corpus of dated Takri copper plates, coin dies, and stone tablets.',
    samplePhrases: [
      {
        phraseEnglish: 'O wanderer of the snows, where do your herds go?',
        phraseNative: 'ओ गद्दिया धारे रे, भेड़-बकरियां कुत्थी लेई चलेया?',
        phraseTakri: '𑚈 𑚍𑚛𑚛𑚮𑚣𑚭 𑚜𑚭𑚤𑚲 𑚤𑚲, 𑚡𑚲𑚪-𑚠𑚊𑚤𑚮𑚣𑚭𑚫 𑚊𑚰𑚙𑚚𑚯 𑚥𑚲𑚃 𑚏𑚥𑚲𑚣𑚭?',
        meaning: 'Traditional Gaddi shepherd folk verse.',
        phonetics: 'O Gaddiya dhaare re, bhed-bakriyan kutthi leyi chaleya?'
      }
    ],
    uniqueFeatures: [
      'Preservation of archaic Sanskrit consonant clusters replaced in modern Hindi',
      'Rich lexicon for snow bridges, alpine grasses, and seasonal transhumance',
      'Direct link to classical Takri epigraphy found in Bhuri Singh Museum'
    ]
  },
  {
    id: 'mahasui',
    name: 'Mahasui (Kochi / Kiunthali)',
    nameHindi: 'महासुई (कोची / क्युंथली)',
    nameTakri: '𑚢𑚩𑚭𑚨𑚰𑚃',
    family: 'Indo-Aryan (Western Pahari - Southern)',
    region: 'Shimla hills, Bushahr, Kotgarh, Jubbal & Rohru',
    speakersCount: 'approx. 1.0 Million',
    description: 'The rhythmic speech of the upper and lower Shimla hills, named after Lord Mahasu. Famous for Birshu songs, Thoda martial ballads, and apple harvest lore.',
    scriptHistory: 'Written in Mahasu Takri (also called Kochi script) for judicial accounts, temple endowments, and royal letters across Bushahr and Keonthal states.',
    samplePhrases: [
      {
        phraseEnglish: 'Let us celebrate the festival with full devotion.',
        phraseNative: 'महाशू महराज रे मेले मां सारे राच्छे नाचगे।',
        phraseTakri: '𑚢𑚩𑚭𑚧𑚱 𑚢𑚩𑚤𑚭𑚑 𑚤𑚲 𑚢𑚲𑚥𑚲 𑚢𑚭𑚫 𑚨𑚭𑚤𑚲 𑚤𑚭𑚏𑚏𑚲 𑚝𑚭𑚏𑚍𑚲।',
        meaning: 'Gathering to celebrate Mahasu Devta festival.',
        phonetics: 'Mahashu Maharaj re mele maa saare raachhe naachge.'
      }
    ],
    uniqueFeatures: [
      'High cadence with sharp sentence endings and expressive compound verbs',
      'Distinction between high-elevation village speech (Kochi) and lower valley forms'
    ]
  },
  {
    id: 'kinnauri',
    name: 'Kinnauri (Kanauri / Bhoti)',
    nameHindi: 'किन्नौरी (कनौरी)',
    nameTakri: '𑚊𑚮𑚝𑚝𑚵𑚤𑚯',
    family: 'Tibeto-Burman (Himalayish Branch)',
    region: 'Kinnaur (Sutlej & Baspa Valleys)',
    speakersCount: 'approx. 85,000',
    description: 'A fascinating Sino-Tibetan language with intricate pronominal verb systems, carrying the ancient oral myths of the Kinnaras and Buddhist folklore.',
    scriptHistory: 'Traditionally recorded in Tibetan Uchen/Umê script in monasteries and Takri script in administrative court records.',
    samplePhrases: [
      {
        phraseEnglish: 'Peace and auspicious blessings to you.',
        phraseNative: 'जूलय! (Julley) / ङा गा तुमांग माया (Warm greeting)',
        phraseTakri: '𑚑𑚱𑚥𑚲𑚣!',
        meaning: 'Auspicious greeting of friendship across trans-Himalayan passes.',
        phonetics: 'Julley / Ngaa gaa tumaang maaya.'
      }
    ],
    uniqueFeatures: [
      'Dual and plural grammatical number distinctions',
      'Agglutinative verb morphology with honorific particle systems',
      'Rich oral poetry sung during the Phulaich flower festival'
    ]
  },
  {
    id: 'spitian',
    name: 'Bhoti / Spitian',
    nameHindi: 'भोटी / स्पीतियन',
    nameTakri: '𑚡𑚴𑚔𑚯 𑚨𑚞𑚮𑚙𑚮𑚣𑚝',
    family: 'Tibeto-Burman (Bodish Branch)',
    region: 'Spiti Valley, Pin Valley & Lahaul upper belts',
    speakersCount: 'approx. 32,000',
    description: 'The ancient high-altitude dialect of the cold desert monasteries, preserving classical Buddhist terms, winter snow tales, and monastic chanting.',
    scriptHistory: 'Written in classical Tibetan script for Buddhist Kangyur & Tengyur manuscripts and historical chortens.',
    samplePhrases: [
      {
        phraseEnglish: 'Tashi Delek (Auspicious Good Fortune).',
        phraseNative: 'ताशी देलेक (Tashi Delek)',
        phraseTakri: '𑚙𑚭𑚧𑚯 𑚛𑚲𑚥𑚲𑚊',
        meaning: 'Auspicious greeting wishing good fortune and happiness.',
        phonetics: 'Tashi Delek'
      }
    ],
    uniqueFeatures: [
      'Tonal nuances adapting to high alpine desert environments',
      'Sacred monastic chanting metrics unchanged for ten centuries'
    ]
  },
  {
    id: 'sirmauri',
    name: 'Sirmauri',
    nameHindi: 'सिरमौरी',
    nameTakri: '𑚨𑚮𑚤𑚢𑚵𑚤𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Giri-Par and Giri-Aar belts of Sirmaur',
    speakersCount: 'approx. 400,000',
    description: 'The spirited language of the Shivalik foothills, noted for its deep connection to the legend of Shirgul Maharaj and the Haripurdhar ballads.',
    scriptHistory: 'Historically documented in Sirmauri Takri in the Nahan royal court and copper endowments at Renuka Ji.',
    samplePhrases: [
      {
        phraseEnglish: 'Praise to Lord Shirgul Maharaj.',
        phraseNative: 'जय शिरगुल महाराज री!',
        phraseTakri: '𑚑𑚣 𑚧𑚮𑚤𑚍𑚰𑚥 𑚢𑚩𑚤𑚭𑚑 𑚤𑚯!',
        meaning: 'Pious invocation of the mountain deity of Churdhar.',
        phonetics: 'Jai Shirgul Maharaj ri!'
      }
    ],
    uniqueFeatures: [
      'Giri-Par (Trans-Giri) dialect preserving unique phonetic glides',
      'Folk songs for Bisu archery tournaments (Thoda)'
    ]
  }
];
