// Web Audio API Sound Effects & Calming Ambient Music Synthesizer

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private currentTrackIndex: number = 0;
  private volume: number = 0.5;
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic 3D Paper Flip Sound Effect
  public playPageFlipSound() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // White noise buffer for paper friction sound
      const bufferSize = this.ctx.sampleRate * 0.18; // 180ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Soft pink/brownish filtered noise for paper texture
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Bandpass filter to mimic paper whoosh
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.18);
      filter.Q.setValueAtTime(1.8, now);

      // Gain envelope
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.35 * this.volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.18);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Pre-configured Calming Wedding Melody tracks
  public readonly tracks = [
    {
      id: 'velvet-piano',
      title: 'Velvet Piano · Forever Romance',
      genre: 'Acoustic Piano',
      artist: 'A1 Soundscapes',
      duration: 'Ambient Loop',
      baseFreq: 261.63, // C4
      notes: [261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63, 293.66],
      chords: [[261.63, 329.63, 392.00], [220.00, 261.63, 329.63], [174.61, 220.00, 261.63], [196.00, 246.94, 293.66]],
    },
    {
      id: 'acoustic-sunset',
      title: 'Acoustic Sunset · Sacred Vows',
      genre: 'Warm Acoustic',
      artist: 'A1 Soundscapes',
      duration: 'Ambient Loop',
      baseFreq: 293.66, // D4
      notes: [293.66, 369.99, 440.00, 554.37, 587.33, 440.00, 369.99, 329.63],
      chords: [[293.66, 369.99, 440.00], [246.94, 293.66, 369.99], [196.00, 246.94, 293.66], [220.00, 277.18, 329.63]],
    },
    {
      id: 'ethereal-strings',
      title: 'Ethereal Strings · Royal Heritage',
      genre: 'Cinematic Ambient',
      artist: 'A1 Soundscapes',
      duration: 'Ambient Loop',
      baseFreq: 220.00, // A3
      notes: [220.00, 277.18, 329.63, 440.00, 493.88, 440.00, 329.63, 277.18],
      chords: [[220.00, 277.18, 329.63], [174.61, 220.00, 261.63], [261.63, 329.63, 392.00], [196.00, 246.94, 293.66]],
    },
    {
      id: 'morning-light',
      title: 'Morning Light · Joyful Celebration',
      genre: 'Serene Melodic',
      artist: 'A1 Soundscapes',
      duration: 'Ambient Loop',
      baseFreq: 349.23, // F4
      notes: [349.23, 440.00, 523.25, 659.25, 698.46, 523.25, 440.00, 392.00],
      chords: [[349.23, 440.00, 523.25], [261.63, 329.63, 392.00], [293.66, 349.23, 440.00], [220.00, 261.63, 329.63]],
    },
  ];

  // Play synthesized calming ambient wedding chord
  private playCalmNote(freq: number, duration: number = 2.4, isChord: boolean = false) {
    if (!this.ctx || !this.isMusicPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isChord ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle lowpass filter for velvety wedding tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isChord ? 450 : 850, now);

      // Very soft envelope
      const peakVol = (isChord ? 0.04 : 0.06) * this.volume;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakVol, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignore
    }
  }

  public playMusic(trackId?: string, customUrl?: string) {
    this.initContext();
    this.stopMusic();

    if (customUrl) {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(customUrl);
          this.customAudio.loop = true;
        } else {
          this.customAudio.src = customUrl;
        }
        this.customAudio.volume = this.volume;
        this.customAudio.play();
        this.isMusicPlaying = true;
        return;
      } catch {
        // Fallback to synth if custom fails
      }
    }

    const trackIndex = Math.max(0, this.tracks.findIndex((t) => t.id === trackId));
    this.currentTrackIndex = trackIndex !== -1 ? trackIndex : 0;
    const track = this.tracks[this.currentTrackIndex];

    this.isMusicPlaying = true;

    let step = 0;
    const playStep = () => {
      if (!this.isMusicPlaying) return;
      const chordIndex = Math.floor(step / 4) % track.chords.length;
      const currentChord = track.chords[chordIndex];

      // Play soft harmonic pad chord on beat 0
      if (step % 4 === 0) {
        currentChord.forEach((note) => this.playCalmNote(note * 0.5, 4.5, true));
      }

      // Play gentle melodic bell note
      const note = track.notes[step % track.notes.length];
      this.playCalmNote(note, 2.2, false);

      step++;
    };

    playStep();
    this.musicInterval = setInterval(playStep, 1400);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMusic(trackId?: string, customUrl?: string): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.playMusic(trackId, customUrl);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const audioEngine = new AudioEngine();
