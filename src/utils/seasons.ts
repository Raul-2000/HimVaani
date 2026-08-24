export type HimachalSeason = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';

export interface SeasonTheme {
  id: HimachalSeason;
  nameEnglish: string;
  nameHindi: string;
  nameTakri: string;
  pahariMonths: string;
  calendarMonths: string;
  description: string;
  accentColor: string;
  accentLight: string;
  accentDark: string;
  accentGlow: string;
  bodyBg: string;
  bgGradientStart: string;
  bgGradientMid: string;
  bgGradientEnd: string;
  headerBg: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  buttonBg: string;
  buttonHover: string;
  buttonGradient: string;
  cardHighlight: string;
  headingColor: string;
  motifs: string;
  icon: string;
}

export const HIMACHAL_SEASONS: Record<HimachalSeason, SeasonTheme> = {
  spring: {
    id: 'spring',
    nameEnglish: 'Spring Bloom (Basant)',
    nameHindi: 'बसंत ऋतु (चेत-बैसाख)',
    nameTakri: '𑚠𑚨𑚫𑚙 𑚤𑚮𑚙𑚰',
    pahariMonths: 'Chet – Baisakh (चेत - बैसाख)',
    calendarMonths: 'March – April',
    description: 'Wild Rhododendron (Buransh) blooms in crimson across Kangra and Shimla hillsides while apple blossoms open in mountain orchards.',
    accentColor: '#be123c', // Deep Rose Crimson
    accentLight: '#e11d48',
    accentDark: '#881337',
    accentGlow: 'rgba(190, 18, 60, 0.18)',
    bodyBg: '#fdf2f4',
    bgGradientStart: '#fff1f3',
    bgGradientMid: '#fdf4f5',
    bgGradientEnd: '#fbf5f7',
    headerBg: 'rgba(255, 241, 243, 0.94)',
    cardBg: '#ffffff',
    cardBorder: '#fecdd3',
    badgeBg: '#ffe4e6',
    badgeBorder: '#fda4af',
    badgeText: '#881337',
    buttonBg: '#be123c',
    buttonHover: '#9f1239',
    buttonGradient: 'linear-gradient(135deg, #be123c, #9f1239)',
    cardHighlight: 'rgba(225, 29, 72, 0.05)',
    headingColor: '#4c0519',
    motifs: '🌸 Rhododendron Buransh & Apple Blossoms',
    icon: '🌸',
  },
  summer: {
    id: 'summer',
    nameEnglish: 'Summer Sun (Grishma)',
    nameHindi: 'ग्रीष्म ऋतु (जेठ-आषाढ़)',
    nameTakri: '𑚌𑚤𑚯𑚋𑚢 𑚤𑚮𑚙𑚰',
    pahariMonths: 'Jeth – Ashadh (जेठ - आषाढ़)',
    calendarMonths: 'May – June',
    description: 'Golden sunshine bathes the alpine passes of Rohtang and Kunzum; warm deodar pine fragrances drift across gentle mountain breezes.',
    accentColor: '#92400e', // Warm Cedar Amber Gold
    accentLight: '#b45309',
    accentDark: '#78350f',
    accentGlow: 'rgba(146, 64, 14, 0.18)',
    bodyBg: '#fdf8ee',
    bgGradientStart: '#fffbeb',
    bgGradientMid: '#fef3c7',
    bgGradientEnd: '#fcf8f0',
    headerBg: 'rgba(255, 251, 235, 0.94)',
    cardBg: '#ffffff',
    cardBorder: '#fde68a',
    badgeBg: '#fef3c7',
    badgeBorder: '#fcd34d',
    badgeText: '#78350f',
    buttonBg: '#92400e',
    buttonHover: '#78350f',
    buttonGradient: 'linear-gradient(135deg, #92400e, #78350f)',
    cardHighlight: 'rgba(180, 83, 9, 0.05)',
    headingColor: '#451a03',
    motifs: '☀️ Golden Deodar Cedar & Alpine Sunshine',
    icon: '☀️',
  },
  monsoon: {
    id: 'monsoon',
    nameEnglish: 'Monsoon Rain & Thunder (Varsha)',
    nameHindi: 'वर्षा व मेघ ऋतु (सावन-भादों)',
    nameTakri: '𑚦𑚤𑚋𑚭 𑚤𑚮𑚙𑚰',
    pahariMonths: 'Sawan – Bhadon (सावन - भादों)',
    calendarMonths: 'July – August',
    description: 'Dark rolling thunderclouds over misty Himalayan pine valleys, gushing Beas and Ravi rivers, and torrential mountain rain with distant thunder.',
    accentColor: '#0f766e', // Deep Alpine Teal & Pine Emerald
    accentLight: '#0d9488',
    accentDark: '#115e59',
    accentGlow: 'rgba(15, 118, 110, 0.22)',
    bodyBg: '#f1f5f9',
    bgGradientStart: '#e2e8f0',
    bgGradientMid: '#cbd5e1',
    bgGradientEnd: '#f8fafc',
    headerBg: 'rgba(241, 245, 249, 0.94)',
    cardBg: '#ffffff',
    cardBorder: '#cbd5e1',
    badgeBg: '#e2e8f0',
    badgeBorder: '#94a3b8',
    badgeText: '#0f172a',
    buttonBg: '#0f766e',
    buttonHover: '#115e59',
    buttonGradient: 'linear-gradient(135deg, #0f766e, #0f172a)',
    cardHighlight: 'rgba(15, 118, 110, 0.06)',
    headingColor: '#0f172a',
    motifs: '⛈️ Rolling Thunderclouds, Pine Forests & Mountain Torrents',
    icon: '⛈️',
  },
  autumn: {
    id: 'autumn',
    nameEnglish: 'Autumn Harvest (Sharad)',
    nameHindi: 'शरद ऋतु (असूज-कातिक)',
    nameTakri: '𑚧𑚤𑚛 𑚤𑚮𑚙𑚰',
    pahariMonths: 'Asuj – Katik (असूज - कातिक)',
    calendarMonths: 'September – November',
    description: 'Golden Chinar foliage and harvest-ready Kinnauri apples under crystal-clear azure skies with pristine views of snowy Himalayan ranges.',
    accentColor: '#c2410c', // Saffron / Chinar Ochre
    accentLight: '#ea580c',
    accentDark: '#9a3412',
    accentGlow: 'rgba(194, 65, 12, 0.18)',
    bodyBg: '#fff7ed',
    bgGradientStart: '#fff7ed',
    bgGradientMid: '#ffedd5',
    bgGradientEnd: '#fcf8f2',
    headerBg: 'rgba(255, 247, 237, 0.94)',
    cardBg: '#ffffff',
    cardBorder: '#fed7aa',
    badgeBg: '#ffedd5',
    badgeBorder: '#fdba74',
    badgeText: '#9a3412',
    buttonBg: '#c2410c',
    buttonHover: '#9a3412',
    buttonGradient: 'linear-gradient(135deg, #c2410c, #9a3412)',
    cardHighlight: 'rgba(194, 65, 12, 0.05)',
    headingColor: '#7c2d12',
    motifs: '🍂 Golden Chinar Leaves & Kinnauri Apples',
    icon: '🍂',
  },
  winter: {
    id: 'winter',
    nameEnglish: 'Winter Frost (Shishir / Hyund)',
    nameHindi: 'ह्यूंद / शीत ऋतु (पोह-माघ)',
    nameTakri: '𑚩𑚮𑚄𑚫𑚛 𑚤𑚮𑚙𑚰',
    pahariMonths: 'Poush – Magh – Phagun (पोह - माघ)',
    calendarMonths: 'December – February',
    description: 'Glacial snows blanket the Kinner Kailash, Spiti and Dhauladhar ranges; cozy mountain homes glow with warm Bukhari hearths.',
    accentColor: '#0284c7', // Glacial Sky Blue
    accentLight: '#38bdf8',
    accentDark: '#0369a1',
    accentGlow: 'rgba(2, 132, 199, 0.18)',
    bodyBg: '#f0f9ff',
    bgGradientStart: '#f0f9ff',
    bgGradientMid: '#e0f2fe',
    bgGradientEnd: '#f8fafc',
    headerBg: 'rgba(240, 249, 255, 0.94)',
    cardBg: '#ffffff',
    cardBorder: '#bae6fd',
    badgeBg: '#e0f2fe',
    badgeBorder: '#7dd3fc',
    badgeText: '#0369a1',
    buttonBg: '#0284c7',
    buttonHover: '#0369a1',
    buttonGradient: 'linear-gradient(135deg, #0284c7, #0369a1)',
    cardHighlight: 'rgba(2, 132, 199, 0.05)',
    headingColor: '#0c4a6e',
    motifs: '❄️ Sacred Himalayan Snows & Glacial Frost',
    icon: '❄️',
  },
};

/**
 * Detect the current natural season in Himachal Pradesh based on Gregorian month (0-11)
 */
export function getCurrentHimachalSeason(date = new Date()): HimachalSeason {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  if (month === 2 || month === 3) {
    return 'spring'; // March, April
  } else if (month === 4 || month === 5) {
    return 'summer'; // May, June
  } else if (month === 6 || month === 7) {
    return 'monsoon'; // July, August
  } else if (month === 8 || month === 9 || month === 10) {
    return 'autumn'; // Sept, Oct, Nov
  } else {
    return 'winter'; // Dec, Jan, Feb
  }
}

/**
 * Apply seasonal CSS variables to root document element
 */
export function applySeasonalTheme(seasonId: HimachalSeason) {
  if (typeof document === 'undefined') return;
  const theme = HIMACHAL_SEASONS[seasonId] || HIMACHAL_SEASONS.summer;
  const root = document.documentElement;

  root.style.setProperty('--color-natural-gold', theme.accentColor);
  root.style.setProperty('--color-natural-gold-light', theme.accentLight);
  root.style.setProperty('--color-natural-gold-dark', theme.accentDark);
  root.style.setProperty('--season-accent', theme.accentColor);
  root.style.setProperty('--season-accent-light', theme.accentLight);
  root.style.setProperty('--season-accent-dark', theme.accentDark);
  root.style.setProperty('--season-accent-glow', theme.accentGlow);
  root.style.setProperty('--season-body-bg', theme.bodyBg);
  root.style.setProperty('--season-bg-start', theme.bgGradientStart);
  root.style.setProperty('--season-bg-mid', theme.bgGradientMid);
  root.style.setProperty('--season-bg-end', theme.bgGradientEnd);
  root.style.setProperty('--season-header-bg', theme.headerBg);
  root.style.setProperty('--season-card-bg', theme.cardBg);
  root.style.setProperty('--season-card-border', theme.cardBorder);
  root.style.setProperty('--season-badge-bg', theme.badgeBg);
  root.style.setProperty('--season-badge-border', theme.badgeBorder);
  root.style.setProperty('--season-badge-text', theme.badgeText);
  root.style.setProperty('--season-button-bg', theme.buttonBg);
  root.style.setProperty('--season-button-hover', theme.buttonHover);
  root.style.setProperty('--season-card-highlight', theme.cardHighlight);
  root.style.setProperty('--season-heading-color', theme.headingColor);
  root.setAttribute('data-himachal-season', seasonId);

  // Directly set body background for immediate visual impact
  document.body.style.backgroundColor = theme.bodyBg;
}
