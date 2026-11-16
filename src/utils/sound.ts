// Web Audio API Synthesizer for high-energy mobile sound effects without external files

class SoundFX {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play party horn / celebration sound
  partyHorn() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
    osc.frequency.setValueAtTime(520, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  // Squeak / boing when clicking running away buttons
  boing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.28);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Sad trombone / "Wah wah wah" on wrong answer
  sadTrombone() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [293.66, 277.18, 261.63, 246.94]; // D4, C#4, C4, B3
    let startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      const dur = idx === notes.length - 1 ? 0.6 : 0.25;
      osc.frequency.setValueAtTime(freq, startTime);

      if (idx === notes.length - 1) {
        // Vibrato on the last note
        osc.frequency.linearRampToValueAtTime(freq - 15, startTime + dur);
      }

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur);
      startTime += dur;
    });
  }

  // Confetti pop
  pop() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Happy Birthday Chime
  playBirthdayTune() {
    const ctx = this.getContext();
    if (!ctx) return;

    // "Happy Birthday to You" notes (C4, C4, D4, C4, F4, E4)
    const melody = [
      { f: 261.63, d: 0.25 }, // Hap-
      { f: 261.63, d: 0.25 }, // py
      { f: 293.66, d: 0.5 },  // Birth-
      { f: 261.63, d: 0.5 },  // day
      { f: 349.23, d: 0.5 },  // to
      { f: 329.63, d: 0.9 },  // you
      { f: 261.63, d: 0.25 }, // Hap-
      { f: 261.63, d: 0.25 }, // py
      { f: 293.66, d: 0.5 },  // Birth-
      { f: 261.63, d: 0.5 },  // day
      { f: 392.00, d: 0.5 },  // to
      { f: 349.23, d: 1.0 },  // you!
    ];

    let t = ctx.currentTime + 0.05;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d - 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);

      t += note.d + 0.06;
    });
  }

  // Airhorn meme sound
  airhorn() {
    const ctx = this.getContext();
    if (!ctx) return;

    const baseFrequencies = [280, 283, 277];
    const bursts = [0, 0.12, 0.24, 0.42];

    bursts.forEach((startOffset) => {
      const now = ctx.currentTime + startOffset;
      const dur = startOffset === 0.42 ? 0.35 : 0.09;

      baseFrequencies.forEach((baseFreq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + dur);
      });
    });
  }
}

export const sound = new SoundFX();
