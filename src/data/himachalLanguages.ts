export interface HimachalLanguage {
  id: string;
  name: string;
  nameHindi: string;
  nameTakri: string;
  family: string;
  region: string;
  district: string;
  speakersCount: string;
  description: string;
  scriptHistory: string;
  subDialects: string[];
  folkGenres: string[];
  proverbs: {
    native: string;
    takri?: string;
    meaning: string;
    culturalContext: string;
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
    region: 'Kangra Valley, Hamirpur, Una & Lower Mandi',
    district: 'Kangra, Hamirpur, Una',
    speakersCount: 'approx. 1.7 Million',
    description: 'The most widely spoken Western Pahari language in Himachal Pradesh, celebrated for its melodic cadence, nuanced tone pitches, and rich repertoire of oral ballads (Kahanis).',
    scriptHistory: 'Recorded across hundreds of royal land charters (Sasana patra), temple copper plates, and Kangra miniature paintings in the classical Kangra Takri script.',
    subDialects: ['Standard Kangri', 'Palampuri', 'Hamirpuri', 'Unavi', 'Nurpuria'],
    folkGenres: ['Jhinjhoti ballads', 'Chhanjhoti', 'Barsati songs', 'Bishan-pate'],
    proverbs: [
      {
        native: 'आपणे घरे कुत्ता वी शेर हुंदा ऐ।',
        takri: '𑚁𑚞𑚘𑚲 𑚍𑚤𑚲 𑚊𑚰𑚙𑚙𑚭 𑚦𑚯 𑚧𑚲𑚤 𑚩𑚰𑚫𑚛𑚭 𑚐𑚶𑚚𑚴',
        meaning: 'Even a modest soul finds strength within the sanctity of their own home.',
        culturalContext: 'Ancient Western Pahari adage celebrating domestic sovereignty and self-reliance.'
      },
      {
        native: 'धौलाधार री छां मां ठंडा पाणी, सोहणा कांगड़ा।',
        meaning: 'Under the shelter of Dhauladhar lies sweet cold water and enchanting Kangra.',
        culturalContext: 'A devotional line evoking the snowline springs of the Dhauladhar range.'
      }
    ],
    uniqueFeatures: [
      'Auxiliary verb system uses "हा / ही / हे" (haa/hee) replacing standard Hindi "था/थी"',
      'Distinction of high and low tonal pitches derived from historical voiced aspirates',
      'Rich vocabulary for terraced agriculture, snowmelt canals (Kuhl), and monsoon cloud forms'
    ]
  },
  {
    id: 'mandeali',
    name: 'Mandeali / Mandiyali',
    nameHindi: 'मंडियाली',
    nameTakri: '𑚢𑚉𑚫𑚖𑚮𑚣𑚭𑚥𑚯',
    family: 'Indo-Aryan (Western Pahari - Central)',
    region: 'Mandi Valley, Suket, Sarkaghat, Jogindernagar & Balh',
    district: 'Mandi',
    speakersCount: 'approx. 950,000',
    description: 'The sonorous speech of the central Beas basin and Chhoti Kashi, celebrated for its rhythmic nasalization, lively theatrical folk dialogues (Bantha), and deep devotion to Lord Bhootnath and village devtas.',
    scriptHistory: 'Mandeali Takri was one of the most standardized forms of the script, preserved in extensive royal court records, temple decrees, and land registers.',
    subDialects: ['Standard Mandeali', 'Suketi (Sundernagar)', 'Sarkaghati', 'Balhi', 'Chuhari'],
    folkGenres: ['Bantha folk theatre', 'Shivratri devta hymns', 'Chhinj wrestling songs', 'Nati verses'],
    proverbs: [
      {
        native: 'ज्याडा बीजणा त्याडा ही कट्टणा।',
        takri: '𑚑𑚶𑚣𑚭𑚖𑚭 𑚠𑚯𑚑𑚘𑚭 𑚙𑚶𑚣𑚭𑚖𑚭 𑚩𑚯 𑚊𑚔𑚔𑚘𑚭',
        meaning: 'As you sow in the high fields, so shall you harvest.',
        culturalContext: 'Core Himalayan moral teaching emphasizing karma and integrity.'
      },
      {
        native: 'देवते री छांव मां सारया सुख।',
        meaning: 'Under the divine umbrella of the Devta, all peace resides.',
        culturalContext: 'Reflecting the Devta institution central to Mandi culture.'
      }
    ],
    uniqueFeatures: [
      'Frequent nasalization and liquid vowel combinations producing a distinctive musical lilt',
      'Special honorific verbal suffixes when speaking of Devtas, Gur oracles, and elders',
      'Preservation of archaic Sanskrit case endings lost in modern plains Indo-Aryan'
    ]
  },
  {
    id: 'kulvi',
    name: 'Kulvi / Kulluvi',
    nameHindi: 'कुल्लवी',
    nameTakri: '𑚊𑚰𑚥𑚥𑚦𑚯',
    family: 'Indo-Aryan (Western Pahari - Northern)',
    region: 'Kullu Valley, Manali, Parvati Valley, Sainj & Inner Seraj',
    district: 'Kullu',
    speakersCount: 'approx. 420,000',
    description: 'The expressive dialect of the "Valley of Gods", deeply intertwined with the sacred verses sung during historic Kullu Nati circle dances and traditional Devta invocations.',
    scriptHistory: 'Written in Kulvi Takri in temple logs, astrologer horoscopes (Tewa), and royal treaties between Kullu rajas and neighboring Tibetan chieftains.',
    subDialects: ['Inner Seraji', 'Outer Seraji', 'Parvatiya (Manikaran)', 'Ujhi (Upper Beas)'],
    folkGenres: ['Kullu Nati epics', 'Laman love couplets', 'Deo-khel oracular chants', 'Kahika tales'],
    proverbs: [
      {
        native: 'रुखे री छाया ते देवते री दया सबनी बराबर।',
        takri: '𑚤𑚰𑚋𑚲 𑚤𑚯 𑚕𑚭𑚣𑚭 𑚙𑚲 𑚛𑚲𑚦𑚙𑚲 𑚤𑚯 𑚛𑚣𑚭 𑚨𑚠𑚝𑚯 𑚠𑚤𑚭𑚠𑚤',
        meaning: 'The shade of the pine tree and the grace of the Devta fall equally upon all.',
        culturalContext: 'A revered Kullu proverb reminding villagers of egalitarian harmony.'
      }
    ],
    uniqueFeatures: [
      'Rich vocabulary for alpine passes (Jot), high meadows (Thach), and sacred groves (Deo-van)',
      'Subtle gender concordance rules for mountain deities and celestial spirits',
      'The foundational poetic meter of international Kullu Dussehra celebrations'
    ]
  },
  {
    id: 'chambeali',
    name: 'Chambeali',
    nameHindi: 'चंबयाली',
    nameTakri: '𑚏𑚢𑚠𑚣𑚭𑚥𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Chamba Valley, Ravi Basin, Chowari & Mehla',
    district: 'Chamba',
    speakersCount: 'approx. 480,000',
    description: 'The regal language of the historic kingdom of Chamba, world-renowned as the primary linguistic cradle of classical Takri epigraphy and royal copper-plate literature.',
    scriptHistory: 'Home to the world’s largest collection of authentic Takri inscriptions, royal charters, and coin dies preserved in the Bhuri Singh Museum.',
    subDialects: ['Khas Chambeali', 'Bhattiyali', 'Rajnagari', 'Saho'],
    folkGenres: ['Sukrat Minjar songs', 'Ainchali religious ballads', 'Ghurei female choir verses', 'Kunjadi-Chanchalo epics'],
    proverbs: [
      {
        native: 'रावी किनारे चम्बा सोहणा, धारे-धारे देवते।',
        meaning: 'Chamba sparkles beside the Ravi river, with deities gracing every high ridge.',
        culturalContext: 'Sung during Minjar Mela to praise the natural and spiritual grace of the Ravi basin.'
      }
    ],
    uniqueFeatures: [
      'Direct preservation of classical Sanskrit consonant clusters (e.g. "प्रा", "भ्र")',
      'Detailed terminology for Chamba Rumal needlework and timber Kath-Kuni carvings',
      'The most formally documented epigraphic grammar among all Western Pahari idioms'
    ]
  },
  {
    id: 'gaddi',
    name: 'Gaddi / Bharmauri',
    nameHindi: 'गद्दी / भरमौरी',
    nameTakri: '𑚍𑚛𑚛𑚯 𑚡𑚤𑚢𑚵𑚤𑚯',
    family: 'Indo-Aryan (Western Pahari - Gaddi-Pahari)',
    region: 'Bharmour (Brahmapura), Dhauladhar slopes, Kugti & Kangra hills',
    district: 'Chamba & Kangra',
    speakersCount: 'approx. 180,000',
    description: 'The poetic transhumance language of the semi-nomadic Gaddi shepherds, chronicling the high-altitude trails, Lord Shiva’s abode at Mani Mahesh, and alpine pastoral life.',
    scriptHistory: 'Carved on ancient 7th-century deodar wood temple pillars at Chhatrari and inscribed in Takri copper plates by King Meru Varman.',
    subDialects: ['Bharmauri', 'Gadderan', 'Chhatrari'],
    folkGenres: ['Ainchali Shiva hymns', 'Kunjadi romantic ballads', 'Trath shepherd songs'],
    proverbs: [
      {
        native: 'गद्दी मित्रा भोलुआ, दिल दा साचा सच्चा।',
        meaning: 'The Gaddi friend may be simple in manner, but pure of heart and word.',
        culturalContext: 'A tribute to the unblemished honesty of the Himalayan nomadic tribes.'
      }
    ],
    uniqueFeatures: [
      'Over 200 distinct terms describing sheep wool types, high glaciers, and snow bridges',
      'Specialized pastoral verbs describing nomadic migration over 4,500m passes',
      'Devotional hymn meters dedicated to Lord Shiva as "Mani Maheshwar"'
    ]
  },
  {
    id: 'pangwali',
    name: 'Pangwali',
    nameHindi: 'पंगवाली',
    nameTakri: '𑚞𑚫𑚍𑚦𑚭𑚥𑚯',
    family: 'Indo-Aryan (Western Pahari - High Himalayan)',
    region: 'Pangi Valley (Killar, Dharwas, Sach Pass, Hudan, Sural & Sechu Tuan)',
    district: 'Chamba (Pangi Sub-Division)',
    speakersCount: 'approx. 28,000',
    description: 'An ancient, isolated high-mountain language spoken in the deep canyon valley of Pangi along the upper Chandrabhaga river, preserving archaic phonetic features found nowhere else in South Asia.',
    scriptHistory: 'Historically recorded in Pangi Takri on birch bark scrolls and temple wood plaques in Mindhal Mata and Trilokinath shrines.',
    subDialects: ['Killar Pangwali', 'Sural dialect', 'Hudan', 'Sach'],
    folkGenres: ['Jukaru festival songs', 'Mindhal Mata devotional hymns', 'Shephard snow verses'],
    proverbs: [
      {
        native: 'साच जोत टपी ते पांगी रा राज, बर्फा मां सुख साचा।',
        meaning: 'Crossing Sach Pass leads to Pangi’s realm, where deep snow cradles authentic peace.',
        culturalContext: 'Reflecting the high-pass winter isolation where solidarity is life.'
      }
    ],
    uniqueFeatures: [
      'Retention of archaic Vedic phonetic sibilants and unique dental-alveolar stops',
      'Complex pronominal system reflecting high-elevation communal solidarity',
      'Unbroken oral lexicon for deep winter snowed-in festivities (Jukaru)'
    ]
  },
  {
    id: 'churahi',
    name: 'Churahi',
    nameHindi: 'चुराही',
    nameTakri: '𑚏𑚰𑚤𑚭𑚩𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Churah Valley (Tissa, Bairagarh, Devi Kothi & Nakror)',
    district: 'Chamba (Churah)',
    speakersCount: 'approx. 140,000',
    description: 'The vibrant dialect of the Churah Valley, famous for the Devi Kothi temple murals, energetic Musada ballads, and intricate woodcraft traditions.',
    scriptHistory: 'Documented in the 17th-century Chamunda temple and Devi Kothi shrine records in Churahi Takri.',
    subDialects: ['Tissa Churahi', 'Bairagarhi', 'Kharoti'],
    folkGenres: ['Musada heroic epics', 'Devi Kothi praise songs', 'Churahi Nati'],
    proverbs: [
      {
        native: 'चुराह री धारा ते देवी रा ध्यान, सब दुख दूर।',
        meaning: 'Gazing at Churah’s ridges and meditating on the Goddess dispels all sorrows.',
        culturalContext: 'Commemorating the protective presence of regional Shakti shrines.'
      }
    ],
    uniqueFeatures: [
      'Bridge language combining grammatical traits of Chambeali and Kashmiri Pahari',
      'Lyrical vowel stretching during community circle singing'
    ]
  },
  {
    id: 'mahasui',
    name: 'Mahasui (Kiunthali & Kochi)',
    nameHindi: 'महासुई (क्युंथली / कोची)',
    nameTakri: '𑚢𑚩𑚭𑚨𑚰𑚃',
    family: 'Indo-Aryan (Western Pahari - Southern)',
    region: 'Shimla Hills, Jubbal, Kotgarh, Rohru, Bushahr & Rampur',
    district: 'Shimla & Kullu border',
    speakersCount: 'approx. 1.05 Million',
    description: 'The rhythmic speech of the upper and lower Shimla hills named in honor of Lord Mahasu, renowned for its brisk cadence, Thoda martial archery ballads, and apple orchard folk songs.',
    scriptHistory: 'Written in Mahasu Takri (Kochi variety) across royal Bushahr state treaties, judicial records, and local temple endowments.',
    subDialects: ['Kiunthali (Lower Shimla)', 'Kochi (Upper Shimla / Sutlej)', 'Soracholi', 'Rohruwi', 'Chhoti Koti'],
    folkGenres: ['Thoda archery verses', 'Birshu festive songs', 'Mahasu Devta oracular stanzas', 'Laman couplets'],
    proverbs: [
      {
        native: 'महाशू री छाया मां भय नी हुंदा।',
        meaning: 'Under the protection of Mahasu Devta, no fear touches the soul.',
        culturalContext: 'A bedrock affirmation of spiritual trust across the Shimla and Bushahr hills.'
      }
    ],
    uniqueFeatures: [
      'Crisp, snappy sentence terminations with compound dynamic verbs',
      'Distinctive tone distinction between high-elevation Kochi and lower-valley Kiunthali',
      'Vast terminology for temperate horticulture and traditional stone-wood architecture'
    ]
  },
  {
    id: 'sirmauri',
    name: 'Sirmauri / Giripari',
    nameHindi: 'सिरमौरी (गिरिपारी / गिरिआर)',
    nameTakri: '𑚨𑚮𑚤𑚢𑚵𑚤𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Giri-Par (Trans-Giri), Giri-Aar, Haripurdhar, Sangrah & Nahan',
    district: 'Sirmaur',
    speakersCount: 'approx. 450,000',
    description: 'The spirited language of the Shivalik foothills and high Churdhar peak, celebrated for the heroic legend of Shirgul Maharaj, Bisu spring festivals, and traditional Haat folk councils.',
    scriptHistory: 'Preserved in Sirmauri Takri in the Nahan royal state archives, Renuka temple charters, and copper-plate grants.',
    subDialects: ['Giri-Par (Trans-Giri)', 'Giri-Aar (Cis-Giri)', 'Dharthi (Plain borders)'],
    folkGenres: ['Haripurdhar ballads', 'Bisu archery songs', 'Shirgul Maharaj epics', 'Ghooghati children lore'],
    proverbs: [
      {
        native: 'चूड़धार रा शिखर ऊंचा, शिरगुल महाराज री कृपा सच्ची।',
        meaning: 'Churdhar peak reaches the heavens, and Lord Shirgul’s grace is ever true.',
        culturalContext: 'Pious invocation honoring the highest peak in the Outer Himalayas.'
      }
    ],
    uniqueFeatures: [
      'Giri-Par dialect preserves archaic phonetic glides and consonant clusters',
      'Expressive communal participatory responses during village council gatherings'
    ]
  },
  {
    id: 'kinnauri',
    name: 'Kinnauri / Homskad',
    nameHindi: 'किन्नौरी (होमस्कद)',
    nameTakri: '𑚊𑚮𑚝𑚝𑚵𑚤𑚯',
    family: 'Sino-Tibetan / Tibeto-Burman (Himalayish)',
    region: 'Kinnaur (Sutlej & Baspa / Sangla Valleys, Kalpa, Nichar, Pooh)',
    district: 'Kinnaur',
    speakersCount: 'approx. 90,000',
    description: 'An ancient, intricate language of the legendary Kinnaras, featuring a complex pronominal verb system, poly-synthetic morphology, and deep connections to sacred Kinner Kailash lore.',
    scriptHistory: 'Recorded in Tibetan Uchen script in Gompas, and in Takri / Tankri script in royal Bushahr administrative records.',
    subDialects: ['Lower Kinnauri (Sangla/Kalpa)', 'Upper Kinnauri (Pooh)', 'Chhitkul-Rakchham', 'Sunnam'],
    folkGenres: ['Phulaich flower festival songs', 'Badani royal stanzas', 'Devi Chandika praise chants'],
    proverbs: [
      {
        native: 'फूलैच री सुगन्ध मां देवता नाचे।',
        meaning: 'In the sweet perfume of the Phulaich blossoms, the gods themselves dance.',
        culturalContext: 'Sung when high-altitude Brahma Kamal and wild alpine flowers are offered to village deities.'
      }
    ],
    uniqueFeatures: [
      'Dual and plural grammatical number distinctions with inclusive/exclusive pronoun forms',
      'Complex verb morphology indicating direct witness vs. hearsay experience',
      'Seamless fusion of Western Pahari and Tibeto-Burman vocabulary'
    ]
  },
  {
    id: 'bhoti',
    name: 'Bhoti / Spitian',
    nameHindi: 'भोटी / स्पीतियन',
    nameTakri: '𑚡𑚴𑚔𑚯 𑚨𑚞𑚮𑚙𑚮𑚣𑚝',
    family: 'Tibeto-Burman (Bodish Branch)',
    region: 'Spiti Valley, Pin Valley, Tabo, Kaza, Ki, Mudh & Upper Lahaul',
    district: 'Lahaul & Spiti',
    speakersCount: 'approx. 36,000',
    description: 'The ancient high-altitude language of the cold desert monasteries, holding a thousand years of Buddhist philosophy, winter fireside chronicles, and classical monastic chanting.',
    scriptHistory: 'Written in classical Tibetan script for Buddhist sacred Kangyur & Tengyur manuscripts preserved in Tabo and Ki monasteries.',
    subDialects: ['Spiti Central (Kaza)', 'Pin Valley', 'Gya (Upper Spiti)'],
    folkGenres: ['Monastic Chham chanting', 'Losar new year songs', 'Buchen theatrical morality tales'],
    proverbs: [
      {
        native: 'ताशी देलेक! ॐ मणि पद्मे हूँ।',
        meaning: 'May auspicious peace and compassionate wisdom prevail across all valleys.',
        culturalContext: 'Universal Buddhist greeting welcoming travelers across high mountain passes.'
      }
    ],
    uniqueFeatures: [
      'Tonal subtleties developed to carry voice clearly across windy cold-desert valleys',
      'Deep ritual vocabulary dedicated to Tibetan Buddhist monastic arts and thangka painting'
    ]
  },
  {
    id: 'lahauli',
    name: 'Lahauli / Pattani / Tod',
    nameHindi: 'लाहौली (पट्टनी / स्तौद)',
    nameTakri: '𑚥𑚭𑚩𑚵𑚥𑚯 𑚞𑚔𑚔𑚝𑚯',
    family: 'Sino-Tibetan (West Himalayish & Bodish)',
    region: 'Lahaul Valley (Pattan Valley, Keylong, Chandra-Bhaga confluence, Tod, Tinan)',
    district: 'Lahaul & Spiti',
    speakersCount: 'approx. 32,000',
    description: 'A fascinating group of dialects spoken along the Chandrabhaga river, demonstrating a vibrant blend of Indo-Aryan and Sino-Tibetan roots, famous for Halda winter festival verses.',
    scriptHistory: 'Inscribed in stone tablets and monastery murals across Trilokinath and Guru Ghantal shrines.',
    subDialects: ['Pattani (Manchad)', 'Tod (Upper Bhaga)', 'Tinani (Gondhla)', 'Gahri (Bunan)'],
    folkGenres: ['Halda torchlight festival songs', 'Fagli spring welcoming dances', 'Kaza-Keylong trade ballads'],
    proverbs: [
      {
        native: 'हाल्दा री ज्वाला मां सारा अंधेरा दूर।',
        meaning: 'In the cedar torches of the Halda festival, all darkness and hardship dissolve.',
        culturalContext: 'Celebrated during the peak of winter to usher in prosperity and light.'
      }
    ],
    uniqueFeatures: [
      'Pronominalization system with unique subject-agreement prefixes and suffixes',
      'Rich vocabulary for snow survival, willow plantations, and glacier water management'
    ]
  },
  {
    id: 'bilaspuri',
    name: 'Bilaspuri / Kahluri',
    nameHindi: 'बिलासपुरी (कहलूरी)',
    nameTakri: '𑚠𑚮𑚥𑚭𑚨𑚞𑚰𑚤𑚯 𑚊𑚩𑚥𑚱𑚤𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Bilaspur, Gobind Sagar basin, Ghumarwin, Jhandutta & Naina Devi',
    district: 'Bilaspur',
    speakersCount: 'approx. 380,000',
    description: 'The melodious language of the erstwhile Kahlur princely state along the Sutlej river, noted for its sweet tone and legendary folklore surrounding Guru Drona and Naina Devi.',
    scriptHistory: 'Documented in Kahluri Takri on royal sanads, judicial treaties, and Naina Devi temple endowments.',
    subDialects: ['Kahluri Central', 'Sutlej Valley', 'Ghumarwini'],
    folkGenres: ['Gugga Jaharpir ballads', 'Nalwari fair songs', 'Mohana folk epics'],
    proverbs: [
      {
        native: 'सतलुज रा पाणी मीठा, कहलूर री माटी सोहणी।',
        meaning: 'Sweet is the water of the Sutlej, and graceful is the sacred soil of Kahlur.',
        culturalContext: 'A traditional tribute to the fertile basin of historical Bilaspur.'
      }
    ],
    uniqueFeatures: [
      'Smooth transition between Western Pahari and sub-Himalayan Punjabi dialects',
      'Rich heroic poetry celebrating historical warrior legends like Gambhira and Mohana'
    ]
  },
  {
    id: 'baghati',
    name: 'Baghati & Hinduri',
    nameHindi: 'बाघाटी एवं हिण्डूरी',
    nameTakri: '𑚠𑚭𑚍𑚭𑚔𑚯 𑚙𑚲 𑚩𑚮𑚘𑚶𑚖𑚱𑚤𑚯',
    family: 'Indo-Aryan (Western Pahari)',
    region: 'Solan, Arki, Nalagarh, Kunihar & Kandaghat',
    district: 'Solan',
    speakersCount: 'approx. 240,000',
    description: 'The spoken dialects of the historic Baghal and Nalagarh princely states in the Shivalik transition zone, famous for Shoolini Mela celebrations and Arki palace fresco culture.',
    scriptHistory: 'Recorded in Baghati Takri on royal wall murals in Arki Fort and revenue ledgers.',
    subDialects: ['Baghati (Solan/Arki)', 'Hinduri (Nalagarh)', 'Kunihari'],
    folkGenres: ['Shoolini Devi hymns', 'Arki fortress ballads', 'Sair festival couplets'],
    proverbs: [
      {
        native: 'शूलिनी माता रा आशीष, सोलन मां सुख-शांति।',
        meaning: 'With the blessings of Goddess Shoolini, prosperity and harmony fill the hills.',
        culturalContext: 'Commemorating the annual Shoolini fair in Solan.'
      }
    ],
    uniqueFeatures: [
      'Unique blend of lower Shivalik and middle Himalayan syntax',
      'Distinct past tense conjugation combining "-था" and "-हा" markers'
    ]
  }
];
