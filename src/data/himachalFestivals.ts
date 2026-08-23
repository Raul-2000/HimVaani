export interface HimachalFestival {
  id: string;
  name: string;
  nameHindi: string;
  nameTakri: string;
  district: string;
  season: 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';
  monthRange: string;
  venue: string;
  highlights: string[];
  deityFocus: string;
  description: string;
  ritualsLore: string;
  imageUrl: string;
  status: 'International' | 'National' | 'State' | 'Sacred Folk';
}

export const HIMACHAL_FESTIVALS: HimachalFestival[] = [
  {
    id: 'kullu-dussehra',
    name: 'International Kullu Dussehra',
    nameHindi: 'अंतर्राष्ट्रीय कुल्लू दशहरा',
    nameTakri: '𑚊𑚰𑚥𑚥𑚱 𑚛𑚨𑚩𑚤𑚭',
    district: 'Kullu',
    season: 'autumn',
    monthRange: 'October (Ashwin / Kartik)',
    venue: 'Dhalpur Maidan, Kullu',
    highlights: ['Assembly of 365+ Village Devtas & Devis', 'Grand Ratha Yatra of Lord Raghunath Ji', 'All-night Nati dance circles', 'Dev-Milan divine embraces'],
    deityFocus: 'Lord Raghunath Ji & Devi Hadimba',
    description: 'Unlike the rest of India where Dussehra ends on Vijayadashami, in Kullu, the festival begins on Vijayadashami and continues for seven days. Hundreds of village deities travel on wooden palanquins accompanied by fanfare to pay homage to Lord Raghunath.',
    ritualsLore: 'Dating back to 1660 CE during the reign of Raja Jagat Singh. Deities arrive with their traditional musicians playing Karnals, Narsinghas, and Dhols. No Ravana effigy is burned; instead, on the final day, a symbolic sacrifice of grass and five animals/substitutes occurs on the banks of the Beas river to destroy evils.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    status: 'International'
  },
  {
    id: 'mandi-shivratri',
    name: 'International Mandi Shivratri Fair',
    nameHindi: 'अंतर्राष्ट्रीय मंडी शिवरात्रि मेला',
    nameTakri: '𑚢𑚉𑚫𑚖𑚯 𑚧𑚮𑚦𑚤𑚭𑚙𑚤𑚯',
    district: 'Mandi',
    season: 'spring',
    monthRange: 'February – March (Phalguna)',
    venue: 'Paddal Ground & Bhootnath Temple, Mandi',
    highlights: ['200+ Hill Deities in Grand Procession (Jaleb)', 'Madho Rai Ji leading the royal procession', 'Kamrunag Devta presiding in the court', 'Cultural folk performances on the Beas bank'],
    deityFocus: 'Lord Shiva (Bhootnath) & Shri Madho Rai Ji',
    description: 'Celebrated for an entire week starting on Maha Shivratri day. The historic town of Mandi (Chhoti Kashi) turns into a divine durbar where rural devtas assemble to meet the titular head of state, Lord Madho Rai.',
    ritualsLore: 'Started in 1527 by Raja Ajbar Sen. The divine oracle of Lord Kamrunag arrives first and resides at the royal palace. Royal processions called "Jalebs" are led by horses, police contingents, and deity palanquins swinging in synchronized rhythm.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    status: 'International'
  },
  {
    id: 'minjar-mela',
    name: 'Minjar Mela of Chamba',
    nameHindi: 'चंबा का ऐतिहासिक मिंजर मेला',
    nameTakri: '𑚢𑚮𑚫𑚑𑚤 𑚢𑚲𑚥𑚭',
    district: 'Chamba',
    season: 'monsoon',
    monthRange: 'July – August (Shravana)',
    venue: 'Chaugan Ground, Chamba',
    highlights: ['Silk and Gold Thread Tassels (Minjar)', 'Procession with Royal Shobha Yatra to Ravi River', 'Immersion of Minjars into the roaring Ravi waters', 'Kunjari-Malhar monsoon folk ballads'],
    deityFocus: 'Raghuvira & Lord Varuna (Water God)',
    description: 'A celebration commemorating both the victory of Raja Sahil Varman over the ruler of Trigarta and the auspicious flowering of maize and paddy crops in the Ravi valley.',
    ritualsLore: 'Citizens wear bright traditional costumes and pin golden silk tassels (Minjar) to their lapels. On the final Sunday, a magnificent procession moves from Akhand Chandi Palace to the Ravi river where the Minjar, coconuts, and betel leaves are offered to Lord Varuna to ensure fertile harvests.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    status: 'International'
  },
  {
    id: 'renukaji-fair',
    name: 'International Renuka Ji Fair',
    nameHindi: 'अंतर्राष्ट्रीय श्री रेणुका जी मेला',
    nameTakri: '𑚤𑚲𑚘𑚰𑚊𑚭 𑚑𑚯 𑚢𑚲𑚥𑚭',
    district: 'Sirmaur',
    season: 'autumn',
    monthRange: 'November (Kartik Shukla Dashami)',
    venue: 'Renuka Lake, Sirmaur',
    highlights: ['Sacred reunion of mother Renuka and son Lord Parashurama', 'Holy dip in the woman-shaped lake', 'Devta palanquins crossing from Jamu Peak', 'Traditional wrestling and folk stalls'],
    deityFocus: 'Goddess Renuka Ji & Bhagwan Parashurama',
    description: 'Marks the eternal mother-son divine reunion. Devotees from all over the Western Himalayas assemble at the sacred lake, which naturally takes the silhouette of a reclining goddess.',
    ritualsLore: 'Silver palanquins carrying Lord Parashurama travel down from the ancient hilltop temple at Jamu Peak to the lake shores with great pageantry. The idols are bathed with sacred water, and devotees participate in deep lamp-lit evening Aarti.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    status: 'International'
  },
  {
    id: 'phulaich-kinnaur',
    name: 'Phulaich (Festival of Flowers)',
    nameHindi: 'फुलाइच (फूलों का उत्सव)',
    nameTakri: '𑚞𑚰𑚥𑚭𑚃𑚏',
    district: 'Kinnaur',
    season: 'autumn',
    monthRange: 'September (Bhadrapada / Ashwin)',
    venue: 'Alpine pastures across Sangla & Kalpa',
    highlights: ['Youth climbing high alpine cliffs for sacred Brahmakamal', 'Garlanding of village deities with rare wildflowers', 'Chham and Kinnauri circular group dances', 'Paying homage to ancestral spirits (Kanda)'],
    deityFocus: 'Goddess Kali & Mountain Spirits (Devtas)',
    description: 'An enchanting celebration where Kinnauri youth hike to jagged 14,000-foot ridges to gather rare alpine blooms, particularly the sacred Brahma Kamal (Ladra), to adorn the deities and village elders.',
    ritualsLore: 'On their descent from the high pastures, the flower gatherers are greeted with trumpets, local wine (Angoori), and drums. The entire village dances in a continuous spiral arm-in-arm through the midnight hours.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    status: 'Sacred Folk'
  },
  {
    id: 'losar-halda',
    name: 'Losar & Halda Festival',
    nameHindi: 'लोसर एवं हालदा उत्सव',
    nameTakri: '𑚥𑚴𑚨𑚤 𑚙𑚲 𑚩𑚭𑚥𑚛𑚭',
    district: 'Lahaul & Spiti',
    season: 'winter',
    monthRange: 'January – February (Tibetan New Year)',
    venue: 'Monasteries of Key, Tabo, Kaza & Ghashal',
    highlights: ['Blazing cedar torchlight processions into snowfields', 'Monastic sacred mask dances (Chham)', 'Butter lamp illuminations in sub-zero cold', 'Traditional Barley flour (Tsampa) offerings'],
    deityFocus: 'Mahakala, Palden Lhamo & Shiskar Apa (Wealth Goddess)',
    description: 'Celebrated in the dead of winter amidst high Himalayan snows, the Halda festival involves every household preparing fragrant cedar torches and uniting in a flaming nocturnal procession to ward off evil spirits.',
    ritualsLore: 'Monks don magnificent silk robes and wrathful deity masks, performing the Chham dance to the resonance of long dungchen horns, cymbals, and drums, welcoming the auspicious Tibetan New Year (Losar).',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    status: 'Sacred Folk'
  }
];
