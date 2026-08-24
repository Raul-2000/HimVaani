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
  private rainHighFilter: BiquadFilterNode | null = null;
  private thunderTimer: number | null = null;
  private birdTimer: number | null = null;
  private currentSeason: HimachalSeason = 'monsoon';
  public isAmbiencePlaying = false;
  private isUnlocked = false;

  constructor() {
    // Register auto-unlock on first user gesture
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.unlockContext();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
    }
  }

  public unlockContext() {
    if (this.isUnlocked) return;
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
        if (!isMuted && !this.isAmbiencePlaying) {
          this.startAmbience();
        }
      }).catch(() => {});
    } else {
      this.isUnlocked = true;
      if (!isMuted && !this.isAmbiencePlaying) {
        this.startAmbience();
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  // Generate buffer for nature white/pink/brown noise for authentic rain and thunder
  private createNoiseBuffer(duration = 6): AudioBuffer | null {
    this.initContext();
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    const leftData = buffer.getChannelData(0);
    const rightData = buffer.getChannelData(1);
    
    let lastOutL = 0.0;
    let lastOutR = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;
      
      // Dual-channel pink/brown noise filter with gentle stereo variance
      lastOutL = lastOutL * 0.86 + whiteL * 0.14;
      lastOutR = lastOutR * 0.86 + whiteR * 0.14;
      
      leftData[i] = lastOutL;
      rightData[i] = lastOutR;
    }
    return buffer;
  }

  public setSeason(season: HimachalSeason) {
    this.currentSeason = season;
    if (this.isAmbiencePlaying && !isMuted) {
      this.updateSeasonAmbience();
      this.scheduleRandomSounds();
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
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isAmbiencePlaying) {
        this.updateSeasonAmbience();
        return;
      }

      this.stopAmbience();

      const noiseBuffer = this.createNoiseBuffer(8);
      if (!noiseBuffer) return;

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.rainHighFilter = this.ctx.createBiquadFilter();
      this.rainGain = this.ctx.createGain();

      this.updateSeasonAmbience();

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.rainHighFilter);
      this.rainHighFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      this.noiseNode.start(0);
      this.isAmbiencePlaying = true;

      this.scheduleRandomSounds();
      
      // If monsoon, trigger an audible distant welcoming mountain thunder
      if (this.currentSeason === 'monsoon') {
        setTimeout(() => this.triggerDistantThunder(1.1), 400);
      }
    } catch {
      // Ignore initial user-gesture constraints
    }
  }

  private updateSeasonAmbience() {
    if (!this.ctx || !this.filterNode || !this.rainGain || !this.rainHighFilter) return;
    const now = this.ctx.currentTime;

    if (this.currentSeason === 'monsoon') {
      // Rich, soothing mountain monsoon rain patter
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setTargetAtTime(2400, now, 0.3);
      this.filterNode.Q.setTargetAtTime(1.1, now, 0.3);

      this.rainHighFilter.type = 'highpass';
      this.rainHighFilter.frequency.setTargetAtTime(220, now, 0.3);

      this.rainGain.gain.setTargetAtTime(0.42, now, 0.3);
    } else if (this.currentSeason === 'winter') {
      // Whispering mountain wind
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setTargetAtTime(450, now, 0.5);
      this.filterNode.Q.setTargetAtTime(3.0, now, 0.5);

      this.rainHighFilter.type = 'allpass';
      this.rainGain.gain.setTargetAtTime(0.18, now, 0.5);
    } else if (this.currentSeason === 'spring' || this.currentSeason === 'summer') {
      // Pine forest creek & gentle breeze
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setTargetAtTime(950, now, 0.5);
      this.rainHighFilter.type = 'highpass';
      this.rainHighFilter.frequency.setTargetAtTime(180, now, 0.5);
      this.rainGain.gain.setTargetAtTime(0.20, now, 0.5);
    } else {
      // Autumn whispering leaves
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setTargetAtTime(600, now, 0.5);
      this.rainHighFilter.type = 'allpass';
      this.rainGain.gain.setTargetAtTime(0.18, now, 0.5);
    }
  }

  private scheduleRandomSounds() {
    if (this.thunderTimer) clearInterval(this.thunderTimer);
    if (this.birdTimer) clearInterval(this.birdTimer);

    // Periodic rolling thunder in monsoon (every 7 to 11 seconds)
    if (this.currentSeason === 'monsoon') {
      this.thunderTimer = window.setInterval(() => {
        if (!isMuted && this.isAmbiencePlaying) {
          const intensity = Math.random() * 0.5 + 0.8;
          this.triggerDistantThunder(intensity);
        }
      }, 8500);
    } else if (this.currentSeason === 'spring' || this.currentSeason === 'summer') {
      // Himalayan bird chirps
      this.birdTimer = window.setInterval(() => {
        if (!isMuted && this.isAmbiencePlaying && Math.random() > 0.3) {
          this.triggerMountainBirdChirp();
        }
      }, 7000);
    }
  }

  /**
   * Realistic Himalayan Rolling Mountain Thunder
   * Synthesizes:
   * 1. Initial lightning impact crackle
   * 2. Heavy sub-bass mountain valley rumble (35Hz-75Hz)
   * 3. Long rolling reverberant echoes across pine ridges
   */
  public triggerDistantThunder(intensity = 1.0) {
    if (isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      
      // Layer 1: Sub-bass resonance rumble oscillator
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const oscFilter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      const startFreq = 62 + Math.random() * 25;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(26, now + 4.2);

      oscFilter.type = 'lowpass';
      oscFilter.frequency.setValueAtTime(130, now);
      oscFilter.Q.setValueAtTime(2.8, now);

      const baseGain = 0.28 * intensity;
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(baseGain, now + 0.35);
      oscGain.gain.linearRampToValueAtTime(baseGain * 0.75, now + 1.8);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.2);

      osc.connect(oscFilter);
      oscFilter.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 5.4);

      // Layer 2: Secondary detuned oscillator for acoustic phase beating (mountain echo feel)
      const osc2 = this.ctx.createOscillator();
      const oscGain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(startFreq * 0.85, now);
      osc2.frequency.exponentialRampToValueAtTime(32, now + 3.5);

      oscGain2.gain.setValueAtTime(0.001, now);
      oscGain2.gain.linearRampToValueAtTime(baseGain * 0.6, now + 0.5);
      oscGain2.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc2.connect(oscFilter);
      osc2.start(now + 0.05);
      osc2.stop(now + 4.6);

      // Layer 3: Mountain valley reverberating noise rumble crack
      const noiseBuffer = this.createNoiseBuffer(6);
      if (noiseBuffer) {
        const thunderNoise = this.ctx.createBufferSource();
        thunderNoise.buffer = noiseBuffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(110, now);
        noiseFilter.Q.setValueAtTime(1.8, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.001, now);
        // Sudden crack attack followed by rolling decay
        noiseGain.gain.linearRampToValueAtTime(0.38 * intensity, now + 0.2);
        noiseGain.gain.linearRampToValueAtTime(0.24 * intensity, now + 1.2);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

        thunderNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        thunderNoise.start(now);
        thunderNoise.stop(now + 5.2);
      }
    } catch {
      // Audio safety
    }
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
    natureAudio.unlockContext();
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

