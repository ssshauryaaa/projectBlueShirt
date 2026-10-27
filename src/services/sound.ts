// Web Audio API Synthesizer for Authentic Retro OS & Arcade Sound Effects

class RetroSoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generic tone generator
  playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.15) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio autoplay restrictions
    }
  }

  // OS Click / Button Press
  playClick() {
    this.playTone(850, 'square', 0.04, 0.08);
  }

  // Floppy / Drive Seek
  playSeek() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [300, 450, 320, 500, 280].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        gain.gain.setValueAtTime(0.04, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.03);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + (idx + 1) * 0.03);
      });
    } catch {}
  }

  // Retro Windows Startup Chime
  playBootChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.18, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.9);
      });
    } catch {}
  }

  // Window Open
  playWindowOpen() {
    if (!this.enabled) return;
    this.playTone(440, 'triangle', 0.08, 0.12);
    setTimeout(() => this.playTone(880, 'triangle', 0.08, 0.12), 60);
  }

  // Window Close
  playWindowClose() {
    if (!this.enabled) return;
    this.playTone(660, 'triangle', 0.06, 0.1);
    setTimeout(() => this.playTone(330, 'triangle', 0.08, 0.1), 50);
  }

  // Electrical Surge / Warble
  playWarble() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.4);
      osc.frequency.linearRampToValueAtTime(200, now + 0.8);
      osc.frequency.linearRampToValueAtTime(900, now + 1.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.3);
    } catch {}
  }

  // Arcade Countdown Beep
  playCountdownBeep(isFinal: boolean = false) {
    if (!this.enabled) return;
    const freq = isFinal ? 1200 : 700;
    this.playTone(freq, 'square', isFinal ? 0.35 : 0.12, 0.2);
  }

  // Glitch static buzz
  playGlitchBuzz() {
    if (!this.enabled) return;
    this.playTone(85, 'sawtooth', 0.08, 0.18);
  }
}

export const soundFX = new RetroSoundFX();
