import React, { useEffect, useRef, useState } from 'react';
import { HimachalSeason, HIMACHAL_SEASONS } from '../utils/seasons';
import { Sparkles, CloudRain, Snowflake, Sun, Flower, Wind, Volume2, VolumeX } from 'lucide-react';
import { natureAudio, getIsMuted, toggleGlobalMute, subscribeAudioState } from '../utils/audioAmbience';

interface SeasonalAtmosphereProps {
  currentSeason: HimachalSeason;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  length?: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  char?: string;
  color?: string;
  splashAge?: number;
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

export const SeasonalAtmosphere: React.FC<SeasonalAtmosphereProps> = ({ currentSeason }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [density, setDensity] = useState<'normal' | 'heavy'>('heavy');
  const [isAudioMuted, setIsAudioMuted] = useState(getIsMuted());
  const particlesRef = useRef<Particle[]>([]);
  const splashesRef = useRef<Splash[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lightningRef = useRef<number>(0);

  // Sync with audio state
  useEffect(() => {
    const unsub = subscribeAudioState((muted) => {
      setIsAudioMuted(muted);
    });
    return unsub;
  }, []);

  // Update audio season
  useEffect(() => {
    natureAudio.setSeason(currentSeason);
  }, [currentSeason]);

  useEffect(() => {
    if (!animationsEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle density count
    let count = 45;
    if (currentSeason === 'monsoon') count = density === 'heavy' ? 140 : 80;
    else if (currentSeason === 'winter') count = density === 'heavy' ? 90 : 50;
    else if (currentSeason === 'autumn') count = density === 'heavy' ? 55 : 35;
    else if (currentSeason === 'spring') count = density === 'heavy' ? 60 : 35;
    else count = density === 'heavy' ? 45 : 25;

    const particles: Particle[] = [];
    const springItems = ['🌸', '🌺', '🍃', '✨', '•'];
    const autumnItems = ['🍁', '🍂', '🍃', '🌾', '•'];
    const summerItems = ['✨', '🔆', '•', '⋆', '☀️'];
    const winterItems = ['❄', '❅', '❆', '•', '⋆'];

    for (let i = 0; i < count; i++) {
      let char = '';
      if (currentSeason === 'spring') char = springItems[Math.floor(Math.random() * springItems.length)];
      else if (currentSeason === 'autumn') char = autumnItems[Math.floor(Math.random() * autumnItems.length)];
      else if (currentSeason === 'summer') char = summerItems[Math.floor(Math.random() * summerItems.length)];
      else if (currentSeason === 'winter') char = winterItems[Math.floor(Math.random() * winterItems.length)];

      const isDeepLayer = Math.random() > 0.6;

      particles.push({
        x: Math.random() * (width + 200) - 100,
        y: Math.random() * height,
        radius: isDeepLayer ? Math.random() * 1.5 + 0.8 : Math.random() * 3 + 1.5,
        length: currentSeason === 'monsoon' ? Math.random() * 22 + 16 : 0,
        speedY: currentSeason === 'monsoon' 
          ? (isDeepLayer ? Math.random() * 6 + 9 : Math.random() * 10 + 14)
          : currentSeason === 'winter'
          ? Math.random() * 1.4 + 0.6
          : Math.random() * 1.0 + 0.4,
        speedX: currentSeason === 'monsoon' 
          ? (isDeepLayer ? -1.8 : -3.2) + (Math.random() * 0.6 - 0.3)
          : (Math.random() - 0.5) * 1.2,
        opacity: currentSeason === 'monsoon'
          ? (isDeepLayer ? Math.random() * 0.35 + 0.2 : Math.random() * 0.55 + 0.35)
          : Math.random() * 0.55 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        char: char,
      });
    }
    particlesRef.current = particles;
    splashesRef.current = [];

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Occasional gentle monsoon lightning ambient flash
      if (currentSeason === 'monsoon') {
        if (Math.random() < 0.0015 && lightningRef.current <= 0) {
          lightningRef.current = 1.0;
        }
        if (lightningRef.current > 0) {
          ctx.fillStyle = `rgba(224, 242, 254, ${lightningRef.current * 0.15})`;
          ctx.fillRect(0, 0, width, height);
          lightningRef.current -= 0.04;
        }
      }

      // Render & Update Rain Splashes
      if (currentSeason === 'monsoon') {
        for (let i = splashesRef.current.length - 1; i >= 0; i--) {
          const s = splashesRef.current[i];
          s.radius += 0.8;
          s.opacity -= 0.04;

          if (s.opacity <= 0 || s.radius >= s.maxRadius) {
            splashesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(s.x, s.y, s.radius * 1.6, s.radius * 0.6, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(186, 230, 253, ${s.opacity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Render & Update Atmospheric Particles
      particlesRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + (currentSeason !== 'monsoon' ? Math.sin(tick * 0.015 + p.radius) * 0.5 : 0);
        p.rotation += p.rotationSpeed;

        // Reset if reached bottom
        if (p.y > height) {
          // Trigger rain splash when monsoon drops hit ground
          if (currentSeason === 'monsoon' && splashesRef.current.length < 30 && Math.random() > 0.4) {
            splashesRef.current.push({
              x: p.x,
              y: height - Math.random() * 20,
              radius: 1,
              opacity: 0.6,
              maxRadius: Math.random() * 8 + 4,
            });
          }

          p.y = -30;
          p.x = Math.random() * (width + 200) - 50;
        }
        if (p.x > width + 100) p.x = -50;
        if (p.x < -100) p.x = width + 50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (currentSeason === 'monsoon') {
          // High quality slanting mountain rain streaks
          const dropLen = p.length || 20;
          const grad = ctx.createLinearGradient(0, 0, p.speedX * 1.5, dropLen);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          grad.addColorStop(0.5, 'rgba(125, 211, 252, 0.7)');
          grad.addColorStop(1, 'rgba(2, 132, 199, 0.9)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = p.radius > 2 ? 1.6 : 1.0;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.speedX * 1.5, dropLen);
          ctx.stroke();
        } else if (p.char && p.char !== '•') {
          // Falling autumn leaves, snowflakes, spring petals
          ctx.font = `${p.radius * 6 + 10}px "Apple Color Emoji", "Segoe UI Emoji", serif`;
          ctx.fillText(p.char, -8, 8);
        } else {
          // Soft glowing spore / orb / snowflake dust
          ctx.fillStyle = currentSeason === 'winter'
            ? '#e0f2fe'
            : currentSeason === 'summer'
            ? '#f59e0b'
            : '#b45309';
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentSeason, animationsEnabled, density]);

  const seasonLabels = {
    monsoon: 'Monsoon Rain & Mist',
    winter: 'Winter Snow & Frost',
    spring: 'Spring Petals & Blossoms',
    summer: 'Summer Sun & Light',
    autumn: 'Autumn Golden Foliage'
  };

  const seasonIcons = {
    monsoon: CloudRain,
    winter: Snowflake,
    spring: Flower,
    summer: Sun,
    autumn: Wind
  };

  const SeasonIcon = seasonIcons[currentSeason] || Sparkles;

  return (
    <>
      {/* Background Atmosphere Canvas */}
      {animationsEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10"
          style={{ mixBlendMode: 'normal' }}
        />
      )}

      {/* Floating Bottom Atmosphere & Sound Status Badge */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {/* Toggle Sound Cue */}
        <button
          onClick={() => toggleGlobalMute()}
          className={`p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
            !isAudioMuted
              ? 'bg-season-badge-bg text-season-accent border-season-badge-border scale-102 ring-2 ring-season-accent/20'
              : 'bg-white/85 text-gray-500 border-gray-200 hover:bg-white'
          }`}
          title={!isAudioMuted ? 'Nature soundscapes playing. Click to mute' : 'Muted. Click to listen to nature sound effects'}
        >
          {!isAudioMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-season-accent animate-pulse" />
              <span className="hidden md:inline text-[11px] font-bold text-season-accent">Nature Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400" />
              <span className="hidden md:inline text-[11px] text-gray-500">Muted</span>
            </>
          )}
        </button>

        {/* Toggle Atmosphere Visuals Button */}
        <button
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-season-badge-border text-season-accent hover:scale-105 shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          title={animationsEnabled ? 'Pause atmospheric animation' : 'Resume atmospheric animation'}
        >
          <SeasonIcon className={`w-4 h-4 ${animationsEnabled ? 'animate-bounce text-season-accent' : 'text-gray-400'}`} style={{ animationDuration: '3s' }} />
          <span className="hidden sm:inline text-[11px] text-[#5c4a3b] font-medium">
            {animationsEnabled ? seasonLabels[currentSeason] : 'Atmosphere Paused'}
          </span>
        </button>
      </div>
    </>
  );
};
