export interface GalleryItem {
  id: string;
  title: string;
  titleHindi: string;
  category: 'architecture' | 'landscape' | 'culture' | 'manuscripts' | 'crafts' | 'festivals';
  location: string;
  imageUrl: string;
  description: string;
  aspectRatio?: string;
  tags: string[];
}

export const HIMACHAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Majestic Dhauladhar Range above Kangra Valley',
    titleHindi: 'कांगड़ा घाटी के ऊपर धौलाधार पर्वतमाला',
    category: 'landscape',
    location: 'Dharamshala, Kangra',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    description: 'The towering granite walls of the Dhauladhar (White Ranges) rising dramatically 4,000 meters straight from the lush tea gardens of Kangra Valley.',
    tags: ['Mountains', 'Dhauladhar', 'Landscape']
  },
  {
    id: 'g2',
    title: 'Ancient Kath-Kuni Timber Castle of Naggar',
    titleHindi: 'नग्गर का प्राचीन काष्ठ-कुणी काष्ठ महल',
    category: 'architecture',
    location: 'Naggar, Kullu Valley',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    description: 'Built over 500 years ago using alternating layers of deodar timber and hand-cut stone without mortar, capable of withstanding massive Himalayan earthquakes.',
    tags: ['Kath-Kuni', 'Architecture', 'Heritage']
  },
  {
    id: 'g3',
    title: 'Key Monastery on the Cliffs of Spiti',
    titleHindi: 'स्पीति की चट्टानों पर की गोम्पा',
    category: 'architecture',
    location: 'Key Village, Spiti Valley',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85',
    description: 'Perched at 4,166 meters above sea level, this 11th-century Tibetan Buddhist fortress monastery houses ancient thangkas and sacred manuscripts.',
    tags: ['Spiti', 'Monastery', 'Tibetan Art']
  },
  {
    id: 'g4',
    title: 'Chamba Rumal Needlework (GI Tag)',
    titleHindi: 'चंबा का प्रसिद्ध रुमाल कशीदाकारी',
    category: 'crafts',
    location: 'Chamba Valley',
    imageUrl: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1600&q=85',
    description: 'Known as "Do-Rukha" (double-sided embroidery) created with untwisted silk floss (Patt) where the design appears identical on both sides.',
    tags: ['Chamba Rumal', 'Embroidery', 'GI Tag']
  },
  {
    id: 'g5',
    title: 'Sacred Emerald Waters of Chandratal (Moon Lake)',
    titleHindi: 'पवित्र चंद्रताल (चांद की झील)',
    category: 'landscape',
    location: 'Samudra Tapu Plateau, Lahaul & Spiti',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
    description: 'A crescent-shaped glacial alpine lake at 4,300 meters, glowing in shades of emerald and deep turquoise under starry Himalayan skies.',
    tags: ['Lakes', 'Glacial', 'Sacred']
  },
  {
    id: 'g6',
    title: 'Kullu Dussehra Deity Procession at Dhalpur',
    titleHindi: 'ढालपुर मैदान में कुल्लू दशहरा देव समागम',
    category: 'festivals',
    location: 'Kullu',
    imageUrl: 'https://images.unsplash.com/photo-1609137144820-22129525c567?auto=format&fit=crop&w=1600&q=85',
    description: 'Village deities arriving on wooden palanquins draped in bright silks, flowers, and silver umbrellas to pay homage to Lord Raghunath.',
    tags: ['Dussehra', 'Festivals', 'Devtas']
  },
  {
    id: 'g7',
    title: 'Ancient Royal Takri Copper Plate (Tamra-Patra)',
    titleHindi: 'प्राचीन शाही टांकरी ताम्रपत्र अभिलेख',
    category: 'manuscripts',
    location: 'Bhuri Singh Museum, Chamba',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1600&q=85',
    description: 'An authenticated 16th-century royal endowment inscribed in classical Chamba Takri script with royal seals and astronomical chronograms.',
    tags: ['Takri', 'Epigraphy', 'Manuscripts']
  },
  {
    id: 'g8',
    title: 'Gaddi Shepherd with Traditional Chola and Dora',
    titleHindi: 'पारंपरिक चोला व डोरा में गद्दी चरवाहा',
    category: 'culture',
    location: 'Bharmour & Dhauladhar Passes',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    description: 'A Gaddi tribesman wearing the handspun sheep-wool Chola fastened by a long black woolen rope (Dora) carrying up to 60 meters of chord.',
    tags: ['Gaddi', 'Attire', 'Tribal']
  },
  {
    id: 'g9',
    title: 'Pine Ridges and Apple Orchards of Kinnaur',
    titleHindi: 'किन्नौर के देवदार वन व सेब के बागान',
    category: 'landscape',
    location: 'Sangla Valley, Kinnaur',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    description: 'Golden sunlight striking the jagged peaks of Kinnaur Kailash overlooking the lush green apple orchards of the Baspa River.',
    tags: ['Kinnaur', 'Baspa', 'Nature']
  }
];
