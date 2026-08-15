// Audio & Pronunciation utility for Takri Script Learning

// Global sound preference (defaults to unmuted / enabled)
let isMuted = false;
try {
  const savedMute = localStorage.getItem('takri_audio_muted');
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

export function setIsMuted(muted: boolean): boolean {
  isMuted = muted;
  try {
    localStorage.setItem('takri_audio_muted', String(muted));
  } catch {}

  if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
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
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // clean, steady pace for clear script pronunciation learning
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}



