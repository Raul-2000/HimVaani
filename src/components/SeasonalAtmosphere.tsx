import React, { useEffect, useRef, useState } from 'react';
import { HimachalSeason, HIMACHAL_SEASONS } from '../utils/seasons';
import { Sparkles, Eye, EyeOff } from 'lucide-react';

interface SeasonalAtmosphereProps {
  currentSeason: HimachalSeason;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  char?: string;
  color?: string;
}

export const SeasonalAtmosphere: React.FC<SeasonalAtmosphereProps> = ({ currentSeason }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

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

    // Initialize particle pool based on season
    const count = currentSeason === 'monsoon' ? 45 : currentSeason === 'winter' ? 35 : 25;
    const particles: Particle[] = [];

    const springItems = ['🌸', '🍃', '✨', '•'];
    const autumnItems = ['🍁', '🍂', '🍃', '•'];
    const summerItems = ['✨', '🔆', '•', '⋆'];
    const winterItems = ['❄', '❅', '•', '⋆'];

    for (let i = 0; i < count; i++) {
      let char = '';
      if (currentSeason === 'spring') char = springItems[Math.floor(Math.random() * springItems.length)];
      else if (currentSeason === 'autumn') char = autumnItems[Math.floor(Math.random() * autumnItems.length)];
      else if (currentSeason === 'summer') char = summerItems[Math.floor(Math.random() * summerItems.length)];
      else if (currentSeason === 'winter') char = winterItems[Math.floor(Math.random() * winterItems.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speedY: currentSeason === 'monsoon' ? Math.random() * 4 + 3 : Math.random() * 0.8 + 0.3,
        speedX: currentSeason === 'monsoon' ? Math.random() * 0.8 - 0.4 : (Math.random() - 0.5) * 0.7,
        opacity: Math.random() * 0.45 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        char: char,
      });
    }
    particlesRef.current = particles;

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      particlesRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * 0.01 + p.radius) * 0.2;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (currentSeason === 'monsoon') {
          // Subtle elegant rain streaks
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.speedX * 3, 14);
          ctx.stroke();
        } else if (p.char && p.char !== '•') {
          ctx.font = '14px serif';
          ctx.fillText(p.char, -7, 7);
        } else {
          // Soft glowing spore/orb
          ctx.fillStyle = currentSeason === 'summer' ? '#f59e0b' : '#b45309';
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
  }, [currentSeason, animationsEnabled]);

  return (
    <>
      {/* Background Animated Canvas */}
      {animationsEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10 opacity-70"
          style={{ mixBlendMode: 'multiply' }}
        />
      )}

      {/* Floating Animated Controls Button */}
      <button
        onClick={() => setAnimationsEnabled(!animationsEnabled)}
        className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-season-badge-border text-season-accent hover:scale-105 shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        title={animationsEnabled ? 'Pause atmospheric animation' : 'Resume atmospheric animation'}
      >
        <Sparkles className={`w-3.5 h-3.5 ${animationsEnabled ? 'animate-spin text-season-accent' : 'text-gray-400'}`} style={{ animationDuration: '6s' }} />
        <span className="hidden sm:inline text-[11px] text-[#5c4a3b]">
          {animationsEnabled ? 'Atmosphere Live' : 'Atmosphere Paused'}
        </span>
      </button>
    </>
  );
};
