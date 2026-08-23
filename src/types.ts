export type ScriptMode = 'trilingual' | 'bilingual' | 'takri-only' | 'all';
export type HimachalSeason = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';
export type HeritagePillarId = 'locations' | 'architecture' | 'celebrations' | 'cuisine' | 'script' | 'folklore';

export type NavigationTab = 
  | 'home'
  | 'explore'
  | 'districts'
  | 'culture'
  | 'languages'
  | 'heritage'
  | 'history'
  | 'festivals'
  | 'gallery'
  | 'community'
  | 'takri';

export interface HeritageTraditionItem {
  id: string;
  pillarId: HeritagePillarId;
  nameEnglish: string;
  nameHindi: string;
  nameTakri: string;
  region: string;
  valley: string;
  imageUrl: string;
  category: string;
  shortDescriptionEnglish: string;
  shortDescriptionHindi: string;
  shortDescriptionTakri: string;
  fullStoryEnglish: string;
  fullStoryHindi: string;
  fullStoryTakri: string;
  keyFeatures: string[];
  culturalSignificance: string;
  practicalTips?: string;
  recipeIngredients?: string[];
  recipeSteps?: string[];
  architectureStyle?: string;
  constructionDetails?: string;
  lunarTiming?: string;
  period?: string;
  audioPrompt?: string;
  isUserAdded?: boolean;
}

export interface TakriChar {
  unicode: string;
  char: string;
  devanagari: string;
  iast: string;
  english: string;
  category: 'vowel' | 'consonant' | 'matra' | 'numeral' | 'special';
  audioPrompt?: string;
  exampleWord?: {
    takri: string;
    devanagari: string;
    english: string;
    meaning: string;
  };
  strokeHint?: string;
}

export interface InscriptionRecord {
  title: string;
  originalTakri: string;
  devanagari: string;
  english: string;
  period: string;
  type: string; // 'Copper Plate (Tamra-Patra)' | 'Rock Inscription (Shilalekh)' | 'Temple Lintel' | 'Royal Sanad'
}

export interface HimachalPlace {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  nameTakri: string;
  region: string;
  altitude: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  shortDescriptionEnglish: string;
  shortDescriptionHindi: string;
  shortDescriptionTakri: string;
  fullStoryEnglish: string;
  fullStoryHindi: string;
  fullStoryTakri: string;
  takriHistoricalContext: string;
  highlights: string[];
  famousInscriptions?: string;
  inscriptionsRecord?: InscriptionRecord[];
  architectureStyle?: string;
  architectureDetails?: string;
  localDialect?: string;
  folkloreLore?: string;
  historicalSources?: string[];
  nearestAccess?: string;
  bestSeason: string;
  valley: string;
  category?: 'place' | 'peak' | 'pass' | 'lake';
  coordinates?: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorLocation: string;
  avatarSeed: string;
  takriText: string;
  devanagariText: string;
  englishText: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorLocation: string;
  avatarSeed: string;
  titleTakri: string;
  titleDevanagari: string;
  titleEnglish: string;
  contentTakri: string;
  contentDevanagari: string;
  contentEnglish: string;
  tags: string[];
  timestamp: string;
  likes: number;
  userLiked?: boolean;
  comments: CommunityComment[];
  category: 'practice' | 'poetry' | 'folklore' | 'manuscript' | 'general';
}

export interface QuizQuestion {
  id: string;
  question: string;
  promptChar: string;
  options: {
    takri: string;
    devanagari: string;
    iast: string;
  }[];
  correctIndex: number;
  explanation: string;
}
