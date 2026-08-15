# Takri Heritage & Learning Platform (𑚔𑚭𑚊𑚤𑚯)

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-gold)](LICENSE)
[![Created by](https://img.shields.io/badge/Created%20by-Raul--2000-dfbe7b?logo=github)](https://github.com/Raul-2000)

> **Dedicated to the preservation and revitalization of the ancient Takri script of Devbhumi Himachal Pradesh.**

An interactive, trilingual cultural and learning web application designed to preserve, teach, and celebrate the historical **Takri (𑚔𑚭𑚊𑚤𑚯)** script of the Western Himalayas.

---

## 🌟 Key Features

### 1. 🔤 Interactive Varnamala (वर्णमाला / 𑚪𑚤𑚘𑚢𑚭𑚥𑚭)
- Complete catalog of **Vowels (𑚨𑚯𑚤)**, **Consonants (𑚠𑚫𑚑𑚝)**, **Diacritical Matras (𑚢𑚭𑚙𑚤𑚭)**, and **Numerals (𑚀𑚫𑚊)**.
- **Stroke-by-Stroke Animated Tracing Canvas**: Practice writing Takri characters with real-time stroke guidance.
- **On-Demand Pronunciation**: Crystal-clear speech pronunciation for each glyph and phonetic sound upon tapping the speaker icon.
- **Transliteration Matrix**: Instant cross-mapping across Latin / English, Devanagari (Hindi), and Takri Unicode glyphs.

### 2. ✒️ Script Studio & Calligraphy Card Generator (अनुवाद / 𑚀𑚝𑚰𑚪𑚭𑚛)
- Real-time bidirectional converter: **English (Latin) ⇋ Hindi (Devanagari) ⇋ Takri (𑚔𑚭𑚊𑚤𑚯)**.
- **Parchment Calligraphy Card Exporter**: Generate and download handcrafted royal Himachal parchment PNG cards with traditional border artwork, wax seals, and Takri calligraphy.
- Integrated virtual Takri keyboard with phonetic insertion.

### 3. 🏔️ Himachal Cultural Atlas (दर्शन / 𑚛𑚤𑚧𑚝)
- Trilingual district and heritage exploration across Himachal Pradesh (Chamba, Kangra, Kullu, Mandi, Shimla, Kinnaur, Spiti, Sirmaur, and more).
- Detailed regional history, architectural significance, script connections, and local dialects.

### 4. 📜 Heritage & Historical Manuscripts (इतिहास / 𑚂𑚙𑚮𑚩𑚭𑚨)
- Historical timeline tracing Takri's evolution from the Sharada script (10th–20th Century).
- Regional variant analysis: **Chamba (Chambyali)**, **Kangra**, **Kullu**, **Mandi**, **Jaunsari**, and **Dogri** variations.
- High-resolution digital manuscript archive with paleographic breakdowns.

### 5. 💬 Sangam Community Chaupal (चौपाल / 𑚏𑚵𑚞𑚭𑚥)
- Community practice board for sharing Takri poetry, epigraphs, and calligraphy.
- Filter by categories: Learning, Inscriptions, Poetry, Manuscripts, and Calligraphy.
- Built-in Takri virtual keyboard for direct typing into posts and comments.

### 6. 🌐 Dynamic Multi-Script System
- **Trilingual Mode**: English + Devanagari (Hindi) + Takri (𑚔𑚭𑚊𑚤𑚯).
- **Bilingual Mode (हिंदी + 𑚔𑚭𑚊𑚤𑚯)**: Traditional dual Indian script immersion.
- **Pure Takri Mode (𑚔𑚭𑚊𑚤𑚯)**: Complete immersion in historical Takri glyphs.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, custom vintage Himalayan color palette
- **Animations & Interactivity**: Motion (`motion/react`), HTML5 Canvas
- **Typography**: Google Noto Sans Takri font integration
- **Icons**: Lucide React
- **Audio Engine**: Web Speech Synthesis API for clean on-demand phonetic pronunciation

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Raul-2000/takri-heritage.git
   cd takri-heritage
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to explore the platform.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/               # Static assets & sample manuscript artwork
├── src/
│   ├── components/       # Core UI components (Header, ScriptStudio, Varnamala, etc.)
│   ├── data/             # Takri alphabet, Himachal places, and manuscript lore
│   ├── utils/            # Transliteration engine & audio pronunciation utility
│   ├── types.ts          # Global TypeScript interfaces and script modes
│   ├── App.tsx           # Main application root
│   ├── main.tsx          # React DOM entry point
│   └── index.css         # Tailwind CSS imports and custom Takri font-face rules
├── server.ts             # Express & Vite SSR/dev server
├── package.json          # Dependencies & build scripts
└── vite.config.ts        # Vite configuration
```

---

## 🤝 Contributing

Contributions to expand the Takri lexicon, manuscript archive, and transliteration dictionary are warmly welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewTakriManuscript`)
3. Commit your Changes (`git commit -m 'Add historical inscription data'`)
4. Push to the Branch (`git push origin feature/NewTakriManuscript`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ✍️ Author & Credits

- **Crafted with care for Devbhumi Himachal Pradesh by [Raul-2000](https://github.com/Raul-2000)**.
- Unicode Takri Block: `U+11680`–`U+116CF`.
