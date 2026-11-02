// High-Definition Superhero Audio Engine
// Combines authentic MCU Thor thunder & weapons (Pure SFX - NO voice lines),
// Spider-Man web SFX, & DC Batman cinematic movie scene audio (Nolan Batman Begins & Reeves The Batman).

class SuperheroAudio {
  constructor() {
    this.enabled = typeof window !== 'undefined' ? (localStorage.getItem('emon_hero_sound') !== 'false') : true
    this.audioPool = {
      thor: ['/sounds/thor-thunder-summons.mp3', '/sounds/thor-hammer.mp3'],
      spiderman: ['/sounds/spiderman-thwip.mp3'],
      batman: ['/sounds/batman-im-batman.mp3', '/sounds/batman-im-vengeance.mp3']
    }
    this.preloadedAudio = {}
    this.initPool()
  }

  initPool() {
    if (typeof window === 'undefined') return
    try {
      Object.values(this.audioPool).flat().forEach(src => {
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

  // Play Pure Thor Lightning & Hammer Thunder Strike (Zero voice lines, pure epic SFX)
  playThunder(weaponType = null) {
    if (!this.enabled) return

    let thorSound
    if (weaponType === 'mjolnir') {
      thorSound = '/sounds/thor-hammer.mp3'
    } else if (weaponType === 'stormbreaker') {
      thorSound = '/sounds/thor-thunder-summons.mp3'
    } else {
      thorSound = Math.random() > 0.4
        ? '/sounds/thor-thunder-summons.mp3'
        : '/sounds/thor-hammer.mp3'
    }

    const played = this.playAudioFile(thorSound, 0.95)

    // Fallback synthesizer if file fails
    if (!played) {
      this.playSynthThunder(weaponType)
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

  // Play Authentic Cinematic Batman Movie Scene Audio
  // 1st click: Christopher Nolan's Batman Begins (Christian Bale - Carmine Falcone scene & "I'm Batman!")
  // 2nd click: Matt Reeves' The Batman (Robert Pattinson - Subway confrontation & "I'm Vengeance")
  playBatman(quoteIndex = 0) {
    if (!this.enabled) return

    const isFirstClick = (quoteIndex % 2 === 0)
    const movieFile = isFirstClick
      ? '/sounds/batman-im-batman.mp3'
      : '/sounds/batman-im-vengeance.mp3'

    const played = this.playAudioFile(movieFile, 1.0)

    if (!played) {
      this.playSynthBatman(quoteIndex)
    }
  }

  // Web Audio API Synthesizer Fallbacks
  playSynthThunder(weaponType = null) {
    if (typeof window === 'undefined') return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = weaponType === 'stormbreaker' ? 'triangle' : 'sawtooth'
    osc.frequency.setValueAtTime(weaponType === 'stormbreaker' ? 450 : 650, now)
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.35)
    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.45)
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

  playSynthBatman(quoteIndex = 0) {
    if (typeof window === 'undefined') return

    // 1. Web Audio sub-bass whoosh / bat strike
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        const ctx = new AudioCtx()
        const now = ctx.currentTime

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(quoteIndex % 2 === 0 ? 110 : 80, now)
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.6)
        gain.gain.setValueAtTime(0.4, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.6)
      }
    } catch {
      // ignore
    }

    // 2. Speech Synthesis fallback
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const phrase = quoteIndex % 2 === 0 ? "I'm Batman." : "I'm Vengeance."
        const utterance = new SpeechSynthesisUtterance(phrase)
        utterance.rate = 0.85
        utterance.pitch = 0.45
        utterance.volume = 1.0
        window.speechSynthesis.speak(utterance)
      }
    } catch {
      // ignore
    }
  }
}

export const superheroAudio = new SuperheroAudio()
