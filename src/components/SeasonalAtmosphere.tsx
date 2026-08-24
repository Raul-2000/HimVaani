import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HimachalSeason } from '../utils/seasons';
import { Sparkles, CloudRain, Snowflake, Sun, Flower, Wind, Volume2, VolumeX, Zap } from 'lucide-react';
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
  layer?: number; // 0 = mist drizzle, 1 = midground, 2 = heavy foreground
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

interface LightningBolt {
  segments: Array<{ x1: number; y1: number; x2: number; y2: number }>;
  branches: Array<Array<{ x1: number; y1: number; x2: number; y2: number }>>;
  alpha: number;
  flashPhase: number;
}

export const SeasonalAtmosphere: React.FC<SeasonalAtmosphereProps> = ({ currentSeason }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [density, setDensity] = useState<'normal' | 'heavy'>('heavy');
  const [isAudioMuted, setIsAudioMuted] = useState(getIsMuted());
  const [thunderActive, setThunderActive] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const splashesRef = useRef<Splash[]>([]);
  const lightningRef = useRef<LightningBolt | null>(null);
  const lightningFlashOpacityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Sync with audio state
  useEffect(() => {
    const unsub = subscribeAudioState((muted) => {
      setIsAudioMuted(muted);
    });
    return unsub;
  }, []);

  // Update audio season and start ambience if unmuted
  useEffect(() => {
    natureAudio.setSeason(currentSeason);
    if (!isAudioMuted) {
      natureAudio.startAmbience();
    }
  }, [currentSeason, isAudioMuted]);

  // Generate realistic jagged lightning bolt
  const triggerLightningStrike = useCallback((intensity = 1.0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;

    const startX = Math.random() * (width * 0.7) + width * 0.15;
    const endX = startX + (Math.random() * 200 - 100);
    const endY = height * (0.6 + Math.random() * 0.35);

    const segments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    const branches: Array<Array<{ x1: number; y1: number; x2: number; y2: number }>> = [];

    let currX = startX;
    let currY = 0;
    const steps = 14 + Math.floor(Math.random() * 8);
    const stepY = endY / steps;

    for (let i = 0; i < steps; i++) {
      const nextX = currX + (Math.random() * 40 - 20) + (endX - currX) * 0.08;
      const nextY = currY + stepY + (Math.random() * 10 - 5);
      segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });

      // Generate child branch
      if (Math.random() > 0.65 && branches.length < 3) {
        const branchSegments = [];
        let bX = nextX;
        let bY = nextY;
        const branchSteps = 4 + Math.floor(Math.random() * 4);
        const branchAngle = Math.random() > 0.5 ? 0.6 : -0.6;
        for (let b = 0; b < branchSteps; b++) {
          const nbX = bX + Math.sin(branchAngle) * (20 + Math.random() * 15);
          const nbY = bY + Math.cos(branchAngle) * (20 + Math.random() * 10);
          branchSegments.push({ x1: bX, y1: bY, x2: nbX, y2: nbY });
          bX = nbX;
          bY = nbY;
        }
        branches.push(branchSegments);
      }

      currX = nextX;
      currY = nextY;
    }

    lightningRef.current = {
      segments,
      branches,
      alpha: 1.0,
      flashPhase: 0,
    };
    lightningFlashOpacityRef.current = 0.95;

    // Trigger visual notification & audio thunder
    setThunderActive(true);
    setTimeout(() => setThunderActive(false), 900);

    // Audio thunder synchronized with lightning
    setTimeout(() => {
      natureAudio.triggerDistantThunder(intensity);
    }, 100);
  }, []);

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

    // Multi-layered particle count
    let count = 45;
    if (currentSeason === 'monsoon') count = density === 'heavy' ? 180 : 110;
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

      // 3 Layers for realistic depth of rain:
      // 0: background fine mist / drizzle
      // 1: midground steady rain
      // 2: foreground heavy torrential rain streaks
      const layerRoll = Math.random();
      const layer = layerRoll > 0.65 ? 2 : layerRoll > 0.3 ? 1 : 0;

      let speedY = Math.random() * 1.0 + 0.4;
      let speedX = (Math.random() - 0.5) * 1.2;
      let dropLen = 0;
      let opacity = Math.random() * 0.55 + 0.25;

      if (currentSeason === 'monsoon') {
        if (layer === 2) {
          // Foreground heavy drops
          speedY = Math.random() * 10 + 26;
          speedX = -2.8 + (Math.random() * 0.6 - 0.3); // Natural wind slant from top-left
          dropLen = Math.random() * 25 + 35;
          opacity = Math.random() * 0.3 + 0.65;
        } else if (layer === 1) {
          // Midground rain
          speedY = Math.random() * 8 + 18;
          speedX = -2.2 + (Math.random() * 0.5 - 0.25);
          dropLen = Math.random() * 16 + 22;
          opacity = Math.random() * 0.3 + 0.45;
        } else {
          // Background mist / fine drizzle
          speedY = Math.random() * 6 + 11;
          speedX = -1.5 + (Math.random() * 0.4 - 0.2);
          dropLen = Math.random() * 10 + 12;
          opacity = Math.random() * 0.25 + 0.2;
        }
      } else if (currentSeason === 'winter') {
        speedY = Math.random() * 1.5 + 0.6;
        speedX = (Math.random() - 0.5) * 1.0;
      }

      particles.push({
        x: Math.random() * (width + 300) - 100,
        y: Math.random() * (height + 100) - 50,
        radius: layer === 2 ? 1.8 : layer === 1 ? 1.2 : 0.8,
        length: dropLen,
        speedY,
        speedX,
        opacity,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        char,
        layer,
      });
    }

    particlesRef.current = particles;
    splashesRef.current = [];

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Periodic natural random lightning strikes in monsoon
      if (currentSeason === 'monsoon' && Math.random() < 0.002 && !lightningRef.current) {
        triggerLightningStrike(0.9 + Math.random() * 0.3);
      }

      // ==================== 1. LIGHTNING FLASH & BOLT RENDERING ====================
      if (lightningFlashOpacityRef.current > 0) {
        // Full-screen lightning illumination
        ctx.fillStyle = `rgba(224, 242, 254, ${lightningFlashOpacityRef.current * 0.28})`;
        ctx.fillRect(0, 0, width, height);
        lightningFlashOpacityRef.current -= 0.05;
      }

      if (lightningRef.current) {
        const bolt = lightningRef.current;
        bolt.flashPhase++;

        // Multi-flash pulsing cadence
        if (bolt.flashPhase < 3) {
          bolt.alpha = 1.0;
        } else if (bolt.flashPhase === 3) {
          bolt.alpha = 0.3; // brief micro dip
        } else if (bolt.flashPhase === 4) {
          bolt.alpha = 0.9; // secondary flash surge
        } else {
          bolt.alpha -= 0.09;
        }

        if (bolt.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, bolt.alpha);

          // Outer Glow
          ctx.strokeStyle = 'rgba(186, 230, 253, 0.8)';
          ctx.lineWidth = 4.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = '#67e8f9';
          ctx.shadowBlur = 16;

          ctx.beginPath();
          bolt.segments.forEach((seg, idx) => {
            if (idx === 0) ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          });
          ctx.stroke();

          // Render Child Branches
          bolt.branches.forEach((br) => {
            ctx.beginPath();
            br.forEach((bseg, bidx) => {
              if (bidx === 0) ctx.moveTo(bseg.x1, bseg.y1);
              ctx.lineTo(bseg.x2, bseg.y2);
            });
            ctx.stroke();
          });

          // Inner Core Hot-White Filament
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.0;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          bolt.segments.forEach((seg, idx) => {
            if (idx === 0) ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          });
          ctx.stroke();

          ctx.restore();
        } else {
          lightningRef.current = null;
        }
      }

      // ==================== 3. GROUND RAIN SPLASHES ====================
      if (currentSeason === 'monsoon') {
        for (let i = splashesRef.current.length - 1; i >= 0; i--) {
          const s = splashesRef.current[i];
          s.radius += 0.9;
          s.opacity -= 0.045;

          if (s.opacity <= 0 || s.radius >= s.maxRadius) {
            splashesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(s.x, s.y, s.radius * 1.8, s.radius * 0.5, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(186, 230, 253, ${s.opacity * 0.75})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ==================== 4. PARTICLES & REAL DIRECTIONAL RAIN ====================
      // Global natural wind oscillation (swaying gently across the mountains)
      const windDrift = currentSeason === 'monsoon' ? Math.sin(tick * 0.006) * 0.4 : 0;

      particlesRef.current.forEach((p) => {
        const effectiveSpeedX = p.speedX + windDrift;
        p.y += p.speedY;
        p.x += effectiveSpeedX + (currentSeason !== 'monsoon' ? Math.sin(tick * 0.015 + p.radius) * 0.5 : 0);

        // Reset if reached bottom
        if (p.y > height + 40) {
          // Trigger water ripple splash when rain strikes ground
          if (currentSeason === 'monsoon' && splashesRef.current.length < 40 && Math.random() > 0.4) {
            splashesRef.current.push({
              x: p.x,
              y: height - Math.random() * 20,
              radius: 1,
              opacity: 0.8,
              maxRadius: Math.random() * 8 + 5,
            });
          }

          p.y = -(p.length || 30) - Math.random() * 50;
          p.x = Math.random() * (width + 300) - 100;
        }
        if (p.x > width + 200) p.x = -100;
        if (p.x < -200) p.x = width + 100;

        // Render particles according to season
        if (currentSeason === 'monsoon') {
          // REALISTIC DIRECTIONAL RAINDROPS:
          // Strictly strictly aligned from top-left to bottom-right (NO RANDOM ROTATION!)
          const dropLen = p.length || 24;
          const slantDx = (effectiveSpeedX / p.speedY) * dropLen;

          ctx.save();
          ctx.globalAlpha = p.opacity;

          const grad = ctx.createLinearGradient(p.x, p.y, p.x + slantDx, p.y + dropLen);
          if (p.layer === 2) {
            // Foreground torrential drop: luminous white head with glowing tail
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
            grad.addColorStop(0.6, 'rgba(186, 230, 253, 0.7)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
            ctx.lineWidth = 1.6;
          } else if (p.layer === 1) {
            // Midground rain drop
            grad.addColorStop(0, 'rgba(224, 242, 254, 0.05)');
            grad.addColorStop(0.7, 'rgba(125, 211, 252, 0.65)');
            grad.addColorStop(1, 'rgba(224, 242, 254, 0.85)');
            ctx.lineWidth = 1.2;
          } else {
            // Background mist drizzle
            grad.addColorStop(0, 'rgba(186, 230, 253, 0.02)');
            grad.addColorStop(1, 'rgba(186, 230, 253, 0.45)');
            ctx.lineWidth = 0.8;
          }

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + slantDx, p.y + dropLen);
          ctx.stroke();

          ctx.restore();
        } else {
          // Other seasonal particles (falling leaves, snowflakes, petals)
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;

          if (p.char && p.char !== '•') {
            ctx.font = `${p.radius * 6 + 10}px "Apple Color Emoji", "Segoe UI Emoji", serif`;
            ctx.fillText(p.char, -8, 8);
          } else {
            ctx.fillStyle =
              currentSeason === 'winter'
                ? '#e0f2fe'
                : currentSeason === 'summer'
                ? '#f59e0b'
                : '#b45309';
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
          p.rotation += p.rotationSpeed;
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentSeason, animationsEnabled, density, triggerLightningStrike]);

  const seasonLabels = {
    monsoon: 'Monsoon Rain & Thunder',
    winter: 'Winter Snow & Frost',
    spring: 'Spring Petals & Blossoms',
    summer: 'Summer Sun & Light',
    autumn: 'Autumn Golden Foliage',
  };

  const seasonIcons = {
    monsoon: CloudRain,
    winter: Snowflake,
    spring: Flower,
    summer: Sun,
    autumn: Wind,
  };

  const SeasonIcon = seasonIcons[currentSeason] || Sparkles;

  return (
    <>
      {/* Photorealistic Dark Monsoon Storm Cloud & Mist Layers */}
      {currentSeason === 'monsoon' && animationsEnabled && (
        <div className="fixed inset-x-0 top-0 h-[45vh] pointer-events-none z-10 overflow-hidden select-none">
          {/* Atmospheric Dark Sky Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/40 to-transparent" />

          {/* Primary High-Altitude Dark Storm Clouds */}
          <div
            className="absolute -top-12 -left-1/4 w-[150%] h-full opacity-60 mix-blend-multiply bg-cover bg-bottom animate-mist"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2560&q=80')`,
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)',
            }}
          />

          {/* Secondary Drifting Mountain Mist & Rain Cloud Vapor */}
          <div
            className="absolute -top-8 -right-1/4 w-[150%] h-full opacity-40 mix-blend-screen bg-cover bg-top animate-mist"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2560&q=80')`,
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
              animationDuration: '26s',
              animationDelay: '-10s',
            }}
          />

          {/* Lightning Flash Cloud Illumination Accent */}
          {thunderActive && (
            <div className="absolute inset-0 bg-cyan-100/25 transition-opacity duration-150 mix-blend-screen" />
          )}
        </div>
      )}

      {/* Background Atmosphere Canvas */}
      {animationsEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-20"
          style={{ mixBlendMode: 'normal' }}
        />
      )}

      {/* Floating Bottom Atmosphere & Sound Status Badge */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        {/* Thunder Strike Button (Monsoon Special) */}
        {currentSeason === 'monsoon' && (
          <button
            id="monsoon-thunder-trigger-btn"
            onClick={() => {
              natureAudio.unlockContext();
              if (isAudioMuted) {
                toggleGlobalMute();
              } else {
                natureAudio.startAmbience();
              }
              triggerLightningStrike(1.4);
              natureAudio.triggerDistantThunder(1.5);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              thunderActive
                ? 'bg-amber-400 text-slate-900 border-amber-300 scale-110 shadow-lg ring-2 ring-amber-300'
                : 'bg-slate-900/90 text-amber-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Trigger Himalayan Lightning & Thunderstorm Rumble"
          >
            <Zap className={`w-4 h-4 ${thunderActive ? 'animate-bounce text-slate-900 fill-slate-900' : 'text-amber-300 fill-amber-300'}`} />
            <span className="hidden sm:inline text-[11px] font-bold">Thunder</span>
          </button>
        )}

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
          <SeasonIcon
            className={`w-4 h-4 ${animationsEnabled ? 'animate-bounce text-season-accent' : 'text-gray-400'}`}
            style={{ animationDuration: '3s' }}
          />
          <span className="hidden sm:inline text-[11px] text-[#5c4a3b] font-medium">
            {animationsEnabled ? seasonLabels[currentSeason] : 'Atmosphere Paused'}
          </span>
        </button>
      </div>
    </>
  );
};

