// Web Audio API Ambient Nature Sound & Pronunciation Engine for HimVaani
// Provides real-time synthesized nature soundscapes (Rain & Thunder, Winter Mountain Breeze, Pine Forest Stream & Birds, Temple Singing Bowl)

import { HimachalSeason } from './seasons';

let isMuted = false;
try {
  const savedMute = localStorage.getItem('himvaani_audio_muted');
  if (savedMute !== null) {
    isMuted = savedMute === 'true';
  }
} catch {
  isMuted = false;
}

const listeners: Array<(muted: boolean) => void> = [];

function notifyListeners() {
  listeners.forEach((fn) => fn(isMuted));
}

export function subscribeAudioState(fn: (muted: boolean) => void) {
  listeners.push(fn);
  fn(isMuted);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getIsMuted(): boolean {
  return isMuted;
}

// Nature Ambience Web Audio Synthesizer
class NatureAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private rainGain: GainNode | null = null;
  private thunderTimer: number | null = null;
  private birdTimer: number | null = null;
  private currentSeason: HimachalSeason = 'monsoon';
  private isAmbiencePlaying = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  // Generate buffer for nature white/pink noise
  private createNoiseBuffer(duration = 5): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink-ish noise filter
      lastOut = lastOut * 0.9 + white * 0.1;
      data[i] = lastOut;
    }
    return buffer;
  }

  public setSeason(season: HimachalSeason) {
    this.currentSeason = season;
    if (this.isAmbiencePlaying && !isMuted) {
      this.updateSeasonAmbience();
    }
  }

  public playTempleBell() {
    this.playChimeSound();
  }

  public playChimeSound() {
    if (isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      
      // Himalayan Singing Bowl / Temple Bell Chime
      const frequencies = [528, 792, 1056, 1584]; // Harmonious Tibetan singing bowl intervals
      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        const initialGain = 0.12 / (idx + 1);
        gain.gain.setValueAtTime(initialGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5 + idx * 0.5);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 3.5);
      });
    } catch {
      // Audio autoplay restrictions gracefully handled
    }
  }

  public startAmbience() {
    if (isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      if (this.isAmbiencePlaying) {
        this.updateSeasonAmbience();
        return;
      }

      this.stopAmbience();

      const noiseBuffer = this.createNoiseBuffer(6);
      if (!noiseBuffer) return;

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.rainGain = this.ctx.createGain();

      this.updateSeasonAmbience();

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      this.noiseNode.start(0);
      this.isAmbiencePlaying = true;

      this.scheduleRandomSounds();
    } catch {
      // Ignore initial user-gesture constraints
    }
  }

  private updateSeasonAmbience() {
    if (!this.ctx || !this.filterNode || !this.rainGain) return;
    const now = this.ctx.currentTime;

    if (this.currentSeason === 'monsoon') {
      // Gentle rhythmic mountain rain
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setTargetAtTime(1400, now, 0.5);
      this.rainGain.gain.setTargetAtTime(0.22, now, 0.5);
    } else if (this.currentSeason === 'winter') {
      // Whispering mountain wind
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setTargetAtTime(450, now, 0.5);
      this.filterNode.Q.setTargetAtTime(3.0, now, 0.5);
      this.rainGain.gain.setTargetAtTime(0.12, now, 0.5);
    } else if (this.currentSeason === 'spring' || this.currentSeason === 'summer') {
      // Pine forest creek & gentle breeze
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setTargetAtTime(900, now, 0.5);
      this.rainGain.gain.setTargetAtTime(0.14, now, 0.5);
    } else {
      // Autumn whispering leaves
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setTargetAtTime(600, now, 0.5);
      this.rainGain.gain.setTargetAtTime(0.13, now, 0.5);
    }
  }

  private scheduleRandomSounds() {
    if (this.thunderTimer) clearInterval(this.thunderTimer);
    if (this.birdTimer) clearInterval(this.birdTimer);

    // Random soft thunder rumble in monsoon
    if (this.currentSeason === 'monsoon') {
      this.thunderTimer = window.setInterval(() => {
        if (!isMuted && this.isAmbiencePlaying && Math.random() > 0.4) {
          this.triggerDistantThunder();
        }
      }, 12000);
    } else if (this.currentSeason === 'spring' || this.currentSeason === 'summer') {
      // Himalayan bird chirps
      this.birdTimer = window.setInterval(() => {
        if (!isMuted && this.isAmbiencePlaying && Math.random() > 0.3) {
          this.triggerMountainBirdChirp();
        }
      }, 7000);
    }
  }

  private triggerDistantThunder() {
    if (!this.ctx || !this.masterGain || isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 3.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.2);
    } catch {}
  }

  private triggerMountainBirdChirp() {
    if (!this.ctx || !this.masterGain || isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 2200 + Math.random() * 600;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.16);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  public stopAmbience() {
    if (this.thunderTimer) clearInterval(this.thunderTimer);
    if (this.birdTimer) clearInterval(this.birdTimer);
    this.thunderTimer = null;
    this.birdTimer = null;

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {}
      this.noiseNode = null;
    }
    this.isAmbiencePlaying = false;
  }
}

export const natureAudio = new NatureAudioEngine();

export function setIsMuted(muted: boolean): boolean {
  isMuted = muted;
  try {
    localStorage.setItem('himvaani_audio_muted', String(muted));
  } catch {}

  if (muted) {
    natureAudio.stopAmbience();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } else {
    natureAudio.playChimeSound();
    natureAudio.startAmbience();
  }

  notifyListeners();
  return isMuted;
}

export function toggleGlobalMute(): boolean {
  return setIsMuted(!isMuted);
}

/**
 * Pronounce word using browser speech synthesis ONLY when user explicitly clicks a sound button
 */
export function speakPhonetic(text: string, lang = 'hi-IN') {
  if (isMuted || !text) return;
  
  // Also play a subtle bell click cue
  natureAudio.playChimeSound();

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}
