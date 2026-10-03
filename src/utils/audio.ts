// Web Audio API Synthesizer and Web Speech API helper

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound(muted: boolean = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio context autoplay limitations
  }
}

export function playCorrectSound(muted: boolean = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Cheerful chime: C5 -> E5 -> G5
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.23);
    });
  } catch (e) {}
}

export function playWrongSound(muted: boolean = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Gentle warm bump (not scary): A3 -> F3
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(174.61, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {}
}

export function playPopSound(muted: boolean = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.09);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

export function playUnlockSound(muted: boolean = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Magic bell chime
    [659.25, 783.99, 987.77, 1318.51].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.32);
    });
  } catch (e) {}
}

export function playWinSound(muted: boolean = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Victory fanfare: C5, E5, G5, C6 (longer)
    const melody = [
      { f: 523.25, t: 0.0, d: 0.12 },
      { f: 659.25, t: 0.12, d: 0.12 },
      { f: 783.99, t: 0.24, d: 0.12 },
      { f: 1046.5, t: 0.38, d: 0.45 }
    ];
    melody.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0, now + t);
      gain.gain.linearRampToValueAtTime(0.2, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  } catch (e) {}
}

export function speakText(text: string, lang: 'uz' | 'ru' | 'en' = 'uz') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // Slightly gentle, clear pace for children
    utterance.pitch = 1.05; // Friendly warm pitch

    if (lang === 'uz') {
      // Find uz or fallback to tr (Turkish is close phonetically) or default
      const voices = window.speechSynthesis.getVoices();
      const uzVoice = voices.find(v => v.lang.startsWith('uz'));
      const trVoice = voices.find(v => v.lang.startsWith('tr'));
      if (uzVoice) {
        utterance.voice = uzVoice;
        utterance.lang = 'uz-UZ';
      } else if (trVoice) {
        utterance.voice = trVoice;
        utterance.lang = 'tr-TR';
      } else {
        utterance.lang = 'uz';
      }
    } else if (lang === 'ru') {
      utterance.lang = 'ru-RU';
    } else {
      utterance.lang = 'en-US';
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    // Speech synthesis gracefully ignores if unsupported
  }
}
