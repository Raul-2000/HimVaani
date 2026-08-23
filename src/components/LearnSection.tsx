import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  PenTool,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Download,
  Eraser,
  Trophy,
  Info,
  Flame,
  Zap,
  ArrowRight,
} from 'lucide-react';
import {
  TAKRI_VOWELS,
  TAKRI_CONSONANTS,
  TAKRI_MATRAS,
  TAKRI_NUMERALS,
  TAKRI_QUIZ_QUESTIONS,
  generateInfiniteQuizQuestion,
} from '../data/takriAlphabet';
import { TakriChar, ScriptMode, QuizQuestion } from '../types';
import { speakPhonetic } from '../utils/audioAmbience';

interface LearnSectionProps {
  scriptMode?: ScriptMode;
  onOpenStudio?: () => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({ scriptMode = 'all', onOpenStudio }) => {
  const [activeCategory, setActiveCategory] = useState<'vowels' | 'consonants' | 'matras' | 'numerals' | 'quiz' | 'practice'>('consonants');
  const [selectedChar, setSelectedChar] = useState<TakriChar>(TAKRI_CONSONANTS[0]);
  
  // Practice Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#c5a059');
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Unstoppable Endless Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion>(() => generateInfiniteQuizQuestion(0));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('takri_quiz_best_streak');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Update question when quizIdx changes
  useEffect(() => {
    setCurrentQuiz(generateInfiniteQuizQuestion(quizIdx));
    setSelectedOption(null);
  }, [quizIdx]);

  // Save best streak
  useEffect(() => {
    try {
      localStorage.setItem('takri_quiz_best_streak', String(bestStreak));
    } catch {}
  }, [bestStreak]);

  // Initialize Canvas
  useEffect(() => {
    if (activeCategory === 'practice' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        clearCanvas();
      }
    }
  }, [activeCategory, selectedChar]);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#1a2a2c' : strokeColor;
    ctx.lineWidth = isEraser ? strokeWidth * 2 : strokeWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Create composite canvas with dark natural tones background + watermark
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) return;

    // Background
    expCtx.fillStyle = '#1a2a2c';
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Guide text watermark
    expCtx.font = 'bold 180px "Noto Sans Takri", serif';
    expCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    expCtx.textAlign = 'center';
    expCtx.textBaseline = 'middle';
    expCtx.fillText(selectedChar.char, exportCanvas.width / 2, exportCanvas.height / 2 - 20);

    // Draw user strokes
    expCtx.drawImage(canvas, 0, 0);

    // Label
    expCtx.font = '16px "Plus Jakarta Sans", sans-serif';
    expCtx.fillStyle = '#c5a059';
    expCtx.fillText(`Takri Character: ${selectedChar.char} (${selectedChar.devanagari} / ${selectedChar.iast}) • HimVani Takri Heritage`, exportCanvas.width / 2, exportCanvas.height - 25);

    const link = document.createElement('a');
    link.download = `takri-practice-${selectedChar.devanagari}.png`;
    link.href = exportCanvas.toDataURL();
    link.click();
  };

  const handleSelectQuizOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === currentQuiz.correctIndex;
    
    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      setTotalCorrect((prev) => prev + 1);
      setStreak((prev) => {
        const nextStreak = prev + 1;
        if (nextStreak > bestStreak) {
          setBestStreak(nextStreak);
        }
        return nextStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedOption(null);
    setQuizIdx((prev) => prev + 1);
  };

  const resetStreakAndScore = () => {
    setStreak(0);
    setTotalAnswered(0);
    setTotalCorrect(0);
    setQuizIdx(0);
    setSelectedOption(null);
  };

  const handleSpeakChar = (item: TakriChar) => {
    speakPhonetic(item.devanagari);
  };

  const renderCharGrid = (list: TakriChar[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
      {list.map((item) => {
        const isSelected = selectedChar.unicode === item.unicode;
        return (
          <div
            key={item.unicode}
            id={`char-card-${item.unicode}`}
            onClick={() => {
              setSelectedChar(item);
            }}
            className={`group relative p-4 rounded-2xl transition-all cursor-pointer border ${
              isSelected
                ? 'border-season-accent bg-season-badge-bg shadow-md scale-[1.02]'
                : 'border-season-badge-border bg-white hover:border-season-accent hover:bg-season-badge-bg/50 shadow-xs'
            }`}
          >
            <div className="text-center space-y-2">
              <div className="font-takri text-4xl sm:text-5xl text-season-accent font-bold group-hover:scale-110 transition-transform select-none">
                {item.char}
              </div>

              {scriptMode === 'takri-only' ? (
                item.exampleWord ? (
                  <div className="font-takri text-sm text-season-accent font-semibold select-none">
                    {item.exampleWord.takri}
                  </div>
                ) : (
                  <div className="font-takri text-xs text-[#7a695a]">𑚔𑚭𑚊𑚤𑚯</div>
                )
              ) : scriptMode === 'bilingual' ? (
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#2c1d11]">
                  <span className="font-bold text-[#2c1d11] text-base font-serif">{item.devanagari}</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#2c1d11]">
                    <span className="font-bold text-[#2c1d11] text-sm font-serif">{item.devanagari}</span>
                    <span className="text-[#a89a8c]">•</span>
                    <span className="font-mono font-semibold text-season-accent">{item.iast}</span>
                  </div>
                  <div className="text-[10px] text-[#7a695a] line-clamp-1 uppercase tracking-wider font-medium">
                    {item.english}
                  </div>
                </>
              )}
            </div>

            {/* Audio Button - only plays when clicking this speaker icon */}
            <button
              id={`speaker-btn-${item.unicode}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSpeakChar(item);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg text-season-accent hover:text-season-accent/80 bg-season-badge-bg/70 hover:bg-season-badge-bg transition-all cursor-pointer border border-season-badge-border"
              title={`Listen pronunciation for ${item.devanagari} (${item.iast})`}
              aria-label={`Pronounce ${item.devanagari}`}
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="learn-takri-section" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-season-badge-bg border border-season-badge-border text-season-badge-text text-[11px] font-bold uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 bg-season-accent rounded-full"></span>
          {scriptMode === 'takri-only' ? (
            <span className="font-takri normal-case text-xs text-season-accent">𑚔𑚭𑚊𑚤𑚯 𑚪𑚤𑚘𑚢𑚭𑚥𑚭</span>
          ) : scriptMode === 'bilingual' ? (
            <span>टाकरी वर्णमाला (𑚔𑚭𑚊𑚤𑚯)</span>
          ) : (
            <span>TAKRI VARNAMALA • वर्णमाला</span>
          )}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-season-heading tracking-tight font-bold">
          {scriptMode === 'takri-only' ? (
            <span className="font-takri font-bold text-4xl text-season-accent">𑚩𑚮𑚢𑚭𑚏𑚥 𑚤𑚯 𑚞𑚤𑚭𑚏𑚯𑚝 𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮 𑚨𑚮𑚋𑚴</span>
          ) : scriptMode === 'bilingual' ? (
            <span>हिमाचल की प्राचीन टाकरी लिपि सीखें</span>
          ) : (
            <span>Learn Himachal&apos;s Ancient Script</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] font-light leading-relaxed">
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-base text-season-accent">𑚨𑚢𑚨𑚙 𑚔𑚭𑚊𑚤𑚯 𑚀𑚊𑚋𑚤, 𑚨𑚪𑚤, 𑚢𑚭𑚙𑚤𑚭𑚊𑚫 𑚙𑚲 𑚀𑚫𑚊 𑚡𑚣𑚭𑚨 𑚊𑚤𑚴</span>
          ) : scriptMode === 'bilingual' ? (
            <span>टाकरी वर्णमाला, स्वर, मात्राएं, अंक और स्ट्रोक क्रम का अध्ययन और अभ्यास करें।</span>
          ) : (
            <span>Master the complete Takri alphabet, stroke orders, matras, and numbers with interactive sound guides and tracing canvas.</span>
          )}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-season-badge-border pb-4">
        {[
          {
            id: 'consonants',
            label: scriptMode === 'takri-only' ? '𑚪𑚣𑚫𑚑𑚝' : scriptMode === 'bilingual' ? 'व्यंजन (𑚪𑚣𑚫𑚑𑚝)' : 'Consonants (व्यंजन)',
            takri: '𑚊𑚋𑚌',
            count: TAKRI_CONSONANTS.length,
          },
          {
            id: 'vowels',
            label: scriptMode === 'takri-only' ? '𑚨𑚪𑚤' : scriptMode === 'bilingual' ? 'स्वर (𑚨𑚪𑚤)' : 'Vowels (स्वर)',
            takri: '𑚀𑚁𑚂',
            count: TAKRI_VOWELS.length,
          },
          {
            id: 'matras',
            label: scriptMode === 'takri-only' ? '𑚢𑚭𑚙𑚤𑚭𑚊𑚫' : scriptMode === 'bilingual' ? 'मात्राएं (𑚢𑚭𑚙𑚤𑚭𑚊𑚫)' : 'Matras (मात्राएं)',
            takri: '𑚭𑚮𑚯',
            count: TAKRI_MATRAS.length,
          },
          {
            id: 'numerals',
            label: scriptMode === 'takri-only' ? '𑚀𑚫𑚊' : scriptMode === 'bilingual' ? 'अंक (𑚀𑚫𑚊)' : 'Numerals (अंक)',
            takri: '𑛀𑛁𑛂',
            count: TAKRI_NUMERALS.length,
          },
          {
            id: 'practice',
            label: scriptMode === 'takri-only' ? '𑚀𑚡𑚣𑚭𑚨' : scriptMode === 'bilingual' ? 'चित्रांकन (अभ्यास)' : 'Stroke Canvas (अभ्यास)',
            takri: '✍️',
          },
          {
            id: 'quiz',
            label: scriptMode === 'takri-only' ? '𑚞𑚤𑚯𑚊𑚋𑚭' : scriptMode === 'bilingual' ? 'प्रश्नोत्तरी (परीक्षा)' : 'Quiz & Flashcards (परीक्षा)',
            takri: '🏆',
          },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`learn-tab-${tab.id}`}
            onClick={() => {
              setActiveCategory(tab.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer font-semibold ${
              activeCategory === tab.id
                ? 'bg-season-accent text-white font-bold shadow-md scale-102'
                : 'bg-white text-[#5c4a3b] hover:text-[#2c1d11] hover:bg-season-badge-bg border border-season-badge-border'
            }`}
          >
            <span className="font-takri font-bold text-base">{tab.takri}</span>
            <span className="uppercase tracking-wider text-[11px]">{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                activeCategory === tab.id ? 'bg-black/20 text-white' : 'bg-season-badge-bg text-season-accent'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Learning Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Main Column: Alphabet Grids or Practice or Quiz */}
        <div className="lg:col-span-8 space-y-6">
          {activeCategory === 'consonants' && renderCharGrid(TAKRI_CONSONANTS)}
          {activeCategory === 'vowels' && renderCharGrid(TAKRI_VOWELS)}
          {activeCategory === 'matras' && renderCharGrid(TAKRI_MATRAS)}
          {activeCategory === 'numerals' && renderCharGrid(TAKRI_NUMERALS)}

          {/* Stroke Practice Canvas Mode */}
          {activeCategory === 'practice' && (
            <div className="bg-white rounded-3xl p-6 border-2 border-season-badge-border space-y-4 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-season-badge-border">
                <div>
                  <h3 className="text-lg font-serif text-season-accent font-bold flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-season-accent" />
                    <span>Takri Calligraphy & Tracing Canvas</span>
                  </h3>
                  <p className="text-xs text-[#5c4a3b]">
                    Trace or write <strong className="text-season-accent font-takri text-base">{selectedChar.char}</strong> ({selectedChar.devanagari} / {selectedChar.iast})
                  </p>
                </div>

                {/* Canvas Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowGuide(!showGuide)}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider border transition-all cursor-pointer font-bold ${
                      showGuide ? 'bg-season-badge-bg text-season-accent border-season-badge-border' : 'bg-white text-[#5c4a3b] border-season-badge-border'
                    }`}
                  >
                    {showGuide ? 'Guide On' : 'Guide Off'}
                  </button>

                  <button
                    onClick={() => setIsEraser(!isEraser)}
                    className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                      isEraser ? 'bg-rose-100 text-rose-800 border-rose-300 font-bold' : 'bg-white text-[#5c4a3b] border-season-badge-border hover:bg-season-badge-bg'
                    }`}
                    title="Toggle eraser"
                  >
                    <Eraser className="w-4 h-4" />
                  </button>

                  <button
                    onClick={clearCanvas}
                    className="p-2 rounded-lg bg-white text-[#5c4a3b] hover:text-[#2c1d11] hover:bg-season-badge-bg border border-season-badge-border text-xs cursor-pointer"
                    title="Clear canvas"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={downloadCanvas}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-season-accent text-white text-xs font-bold uppercase tracking-tight hover:opacity-90 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Drawing Area Container */}
              <div className="relative w-full h-[360px] bg-[#fdfcf9] rounded-2xl border-2 border-season-badge-border overflow-hidden shadow-inner flex items-center justify-center">
                {/* Background Tracing Guide */}
                {showGuide && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="font-takri text-[200px] text-season-badge-border font-bold opacity-60">
                      {selectedChar.char}
                    </span>
                  </div>
                )}

                {/* Interactive Canvas */}
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={360}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair relative z-10 touch-none"
                />
              </div>

              {/* Color & Stroke Width Pickers */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-season-badge-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5c4a3b] uppercase tracking-wider font-semibold">Ink:</span>
                  {['#8a4b17', '#1c1917', '#be123c', '#166534', '#0369a1'].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setStrokeColor(color);
                        setIsEraser(false);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer shadow-xs ${
                        strokeColor === color && !isEraser ? 'scale-125 border-[#2c1d11]' : 'border-white'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5c4a3b] uppercase tracking-wider font-semibold">Brush Size:</span>
                  <input
                    type="range"
                    min={2}
                    max={16}
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-24 accent-season-accent"
                  />
                  <span className="text-xs text-[#2c1d11] font-bold w-6">{strokeWidth}px</span>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Mode (Unstoppable Endless Quiz) */}
          {activeCategory === 'quiz' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-season-badge-border space-y-6 shadow-lg">
              <div className="space-y-6">
                {/* Quiz Header & Live Streak Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c4a3b] border-b border-season-badge-border pb-4">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-season-badge-bg text-season-accent border border-season-badge-border flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                      <Zap className="w-3 h-3 text-season-accent fill-current" />
                      <span>
                        {scriptMode === 'takri-only' ? '𑚀𑚝𑚫𑚙 𑚀𑚡𑚣𑚭𑚨' : 'Takri Knowledge Quiz'}
                      </span>
                    </div>
                    <span className="font-mono text-[#7a695a] font-bold text-[11px]">
                      #{quizIdx + 1}
                    </span>
                  </div>

                  {/* Live Stats */}
                  <div className="flex items-center gap-3">
                    {/* Current Streak */}
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all ${
                      streak > 0
                        ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                        : 'bg-[#faf6f0] text-[#7a695a] border-season-badge-border'
                    }`}>
                      <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-amber-600 fill-amber-600' : 'text-[#7a695a]'}`} />
                      <span className="text-[11px] font-bold">
                        {scriptMode === 'takri-only' ? `𑚥𑚍𑚭𑚙𑚭𑚤: ${streak}` : `Streak: ${streak}`}
                      </span>
                    </div>

                    {/* Best Streak */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-season-badge-bg text-season-accent border border-season-badge-border text-[11px] font-bold">
                      <Trophy className="w-3.5 h-3.5 text-season-accent" />
                      <span>Best: {bestStreak}</span>
                    </div>

                    {/* Total Solved */}
                    {totalAnswered > 0 && (
                      <span className="hidden sm:inline-block text-[11px] text-[#5c4a3b] font-mono font-bold">
                        {totalCorrect}/{totalAnswered} ({Math.round((totalCorrect / totalAnswered) * 100)}%)
                      </span>
                    )}

                    {/* Reset Stats */}
                    <button
                      onClick={resetStreakAndScore}
                      className="p-1.5 rounded-lg bg-white hover:bg-season-badge-bg text-[#5c4a3b] hover:text-[#2c1d11] border border-season-badge-border transition-colors cursor-pointer"
                      title="Reset Streak Counter"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Question Box */}
                <div className="text-center py-4 space-y-3">
                  <div className="inline-block px-8 py-4 rounded-2xl bg-season-badge-bg border-2 border-season-badge-border shadow-sm">
                    <span className="text-4xl sm:text-5xl font-serif text-[#2c1d11] font-bold">{currentQuiz.promptChar}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-[#2c1d11] max-w-xl mx-auto leading-snug font-bold">
                    {currentQuiz.question}
                  </h3>
                </div>

                {/* Options in Pure Takri Script */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentQuiz.options.map((opt, oIdx) => {
                    const isChosen = selectedOption === oIdx;
                    const isCorrect = oIdx === currentQuiz.correctIndex;
                    let btnStyle = 'border-season-badge-border hover:border-season-accent bg-[#fdfcf9] hover:bg-season-badge-bg/50 text-[#2c1d11] shadow-xs';

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md font-bold scale-[1.01]';
                      } else if (isChosen) {
                        btnStyle = 'border-rose-600 bg-rose-50 text-rose-950';
                      } else {
                        btnStyle = 'border-season-badge-border bg-[#faf6f0] text-[#7a695a] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizOption(oIdx)}
                        disabled={selectedOption !== null}
                        className={`p-5 sm:p-6 rounded-2xl border-2 text-center flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="w-full flex items-center justify-center gap-3">
                          <span className="font-takri text-4xl sm:text-5xl font-bold text-season-accent tracking-wider py-1 select-none">
                            {opt.takri}
                          </span>
                        </div>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation and Endless Next Question Button */}
                {selectedOption !== null && (
                  <div className="p-4 rounded-2xl bg-season-badge-bg border border-season-badge-border space-y-3 animate-fadeIn">
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-season-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-[#3e2e20] leading-relaxed font-medium">
                        {currentQuiz.explanation}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-season-badge-border">
                      <span className="text-[11px] text-[#7a695a] font-bold uppercase tracking-wider">
                        {selectedOption === currentQuiz.correctIndex ? '✨ Correct Answer!' : 'Keep practicing!'}
                      </span>
                      <button
                        onClick={nextQuizQuestion}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-tight shadow-md transition-all hover:scale-102 cursor-pointer"
                      >
                        <span>{scriptMode === 'takri-only' ? '𑚀𑚌𑚥𑚭 𑚞𑚤𑚧𑚝' : 'Next Question'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Character Inspector Sheet (Natural Tones Card) */}
        <div className="lg:col-span-4">
          <div
            id="char-inspector-card"
            className="sticky top-24 bg-white rounded-3xl p-6 border-2 border-season-badge-border shadow-lg space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-season-badge-border">
              <span className="text-xs font-serif text-season-accent font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-season-accent rounded-full"></span>
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm text-season-accent">𑚀𑚊𑚋𑚤 𑚛𑚤𑚧𑚝</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>आज का अक्षर (निरीक्षक)</span>
                ) : (
                  <span>आज का अक्षर (Inspector)</span>
                )}
              </span>
              <span className="text-[11px] font-mono font-bold text-season-accent bg-season-badge-bg px-2 py-0.5 rounded border border-season-badge-border">
                {selectedChar.unicode}
              </span>
            </div>

            {/* Massive Display Box */}
            <div className="text-center py-5 space-y-2 bg-season-badge-bg/50 rounded-2xl border border-season-badge-border">
              <div className="font-takri text-7xl text-season-accent font-bold select-all">
                {selectedChar.char}
              </div>

              {scriptMode === 'takri-only' ? (
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => handleSpeakChar(selectedChar)}
                    className="p-1.5 rounded-lg bg-season-badge-bg text-season-accent hover:opacity-80 transition-colors cursor-pointer border border-season-badge-border"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ) : scriptMode === 'bilingual' ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-serif text-[#2c1d11] font-bold">{selectedChar.devanagari}</span>
                  <button
                    onClick={() => handleSpeakChar(selectedChar)}
                    className="p-1.5 rounded-lg bg-season-badge-bg text-season-accent hover:opacity-80 transition-colors ml-1 cursor-pointer border border-season-badge-border"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-serif text-[#2c1d11] font-bold">{selectedChar.devanagari}</span>
                    <span className="text-[#a89a8c]">•</span>
                    <span className="text-sm text-season-accent font-mono font-bold">{selectedChar.iast}</span>
                    <button
                      onClick={() => handleSpeakChar(selectedChar)}
                      className="p-1.5 rounded-lg bg-season-badge-bg text-season-accent hover:opacity-80 transition-colors ml-1 cursor-pointer border border-season-badge-border"
                      title="Pronounce"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#5c4a3b] font-medium">{selectedChar.english}</p>
                </>
              )}
            </div>

            {/* Example Word */}
            {selectedChar.exampleWord && (
              <div className="space-y-2 p-3.5 rounded-2xl bg-season-badge-bg/50 border border-season-badge-border text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#7a695a] font-bold block">
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri normal-case text-xs text-season-accent">𑚔𑚭𑚊𑚤𑚯 𑚱𑚛𑚭𑚩𑚤𑚘</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>टाकरी उदाहरण शब्द</span>
                  ) : (
                    <span>Example Word in Takri</span>
                  )}
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-takri text-2xl text-season-accent font-bold">
                      {selectedChar.exampleWord.takri}
                    </div>
                    {scriptMode === 'takri-only' ? null : scriptMode === 'bilingual' ? (
                      <div className="text-xs text-[#2c1d11] font-serif font-bold">
                        {selectedChar.exampleWord.devanagari}
                      </div>
                    ) : (
                      <div className="text-xs text-[#2c1d11] font-serif font-bold">
                        {selectedChar.exampleWord.devanagari} ({selectedChar.exampleWord.english})
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => speakPhonetic(selectedChar.exampleWord?.devanagari || '')}
                    className="p-1.5 rounded-lg bg-season-badge-bg text-season-accent hover:opacity-80 cursor-pointer border border-season-badge-border"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {scriptMode !== 'takri-only' && (
                  <p className="text-xs text-[#5c4a3b] italic pt-1">
                    &quot;{selectedChar.exampleWord.meaning}&quot;
                  </p>
                )}
              </div>
            )}

            {/* Stroke Order Hint */}
            {selectedChar.strokeHint && (
              <div className="space-y-1 text-left text-xs text-[#3e2e20] bg-season-badge-bg p-3.5 rounded-2xl border border-season-badge-border">
                <span className="font-serif text-season-accent uppercase tracking-wider text-[11px] font-bold block">
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri normal-case text-xs text-season-accent">𑚀𑚊𑚋𑚤 𑚤𑚲𑚋𑚭 𑚢𑚭𑚤𑚌</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>स्ट्रोक क्रम मार्गदर्शक:</span>
                  ) : (
                    <span>Stroke Guide:</span>
                  )}
                </span>
                <p className="text-[#423223] leading-relaxed font-normal">{selectedChar.strokeHint}</p>
              </div>
            )}

            {/* Practice Character Button */}
            <button
              onClick={() => {
                setActiveCategory('practice');
              }}
              className="w-full py-3 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-tight shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri normal-case text-sm font-bold">𑚀𑚡𑚣𑚭𑚨 𑚊𑚤𑚴</span>
                ) : scriptMode === 'bilingual' ? (
                  <span>चित्रांकन अभ्यास करें</span>
                ) : (
                  <span>Practice Drawing This Character</span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

