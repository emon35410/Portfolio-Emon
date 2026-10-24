// High-Definition Superhero Audio Engine
// Combines authentic MCU Thor thunder & Spider-Man web SFX with Web Audio fallbacks

class SuperheroAudio {
  constructor() {
    this.enabled = typeof window !== 'undefined' ? (localStorage.getItem('emon_hero_sound') !== 'false') : true
    this.audioPool = {
      thor: ['/sounds/thor-thunder-summons.mp3', '/sounds/thor-hammer.mp3'],
      spiderman: ['/sounds/spiderman-thwip.mp3']
    }
    this.preloadedAudio = {}
    this.initPool()
  }

  initPool() {
    if (typeof window === 'undefined') return
    try {
      this.audioPool.thor.forEach(src => {
        const audio = new Audio(src)
        audio.preload = 'auto'
        this.preloadedAudio[src] = audio
      })
      this.audioPool.spiderman.forEach(src => {
        const audio = new Audio(src)
        audio.preload = 'auto'
        this.preloadedAudio[src] = audio
      })
    } catch {
      // Audio preloading fallback handled gracefully
    }
  }

  toggleSound() {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('emon_hero_sound', this.enabled ? 'true' : 'false')
    }
    return this.enabled
  }

  enableSound() {
    this.enabled = true
    if (typeof window !== 'undefined') {
      localStorage.setItem('emon_hero_sound', 'true')
    }
  }

  playAudioFile(src, volume = 0.85) {
    if (!this.enabled || typeof window === 'undefined') return false
    try {
      const sound = new Audio(src)
      sound.volume = volume
      sound.currentTime = 0
      sound.play().catch(() => {
        // Autoplay policy or user hasn't interacted yet
      })
      return true
    } catch {
      return false
    }
  }

  // Play Authentic MCU Thor Lightning & Mjolnir Thunder Strike
  playThunder() {
    if (!this.enabled) return

    // Pick between full epic strike & sharp hammer impact
    const thorSound = Math.random() > 0.35
      ? '/sounds/thor-thunder-summons.mp3'
      : '/sounds/thor-hammer.mp3'

    const played = this.playAudioFile(thorSound, 0.9)

    // Fallback synthesizer if file fails
    if (!played) {
      this.playSynthThunder()
    }
  }

  // Play Authentic Spider-Man Web Shooter "Thwip" Sound
  playWebThwip() {
    if (!this.enabled) return
    const played = this.playAudioFile('/sounds/spiderman-thwip.mp3', 0.85)
    if (!played) {
      this.playSynthWebThwip()
    }
  }

  // Web Audio API Synthesizer Fallbacks
  playSynthThunder() {
    if (typeof window === 'undefined') return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(600, now)
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.3)
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.4)
  }

  playSynthWebThwip() {
    if (typeof window === 'undefined') return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(2200, now)
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.1)
    gain.gain.setValueAtTime(0.25, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.1)
  }
}

export const superheroAudio = new SuperheroAudio()
