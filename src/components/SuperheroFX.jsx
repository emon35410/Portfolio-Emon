import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Volume2, VolumeX, Shield, Sparkles, X, ChevronRight } from 'lucide-react'
import { superheroAudio } from '../utils/superheroAudio'

export const SuperheroFX = () => {
  // Modes: 'cyber' (default / clean), 'thor', 'spiderman'
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('emon_hero_mode') || 'cyber'
  })
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('emon_hero_sound') !== 'false'
  })
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [flash, setFlash] = useState(null) // screen flash for lightning
  const [spiderSenseActive, setSpiderSenseActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })

  const canvasRef = useRef(null)
  const activeEffectsRef = useRef({
    lightnings: [],
    sparks: [],
    webs: [],
    particles: []
  })
  const animFrameId = useRef(null)

  // Sync mode changes to localStorage and dispatch event
  const switchMode = (newMode) => {
    setMode(newMode)
    localStorage.setItem('emon_hero_mode', newMode)
    window.dispatchEvent(new CustomEvent('hero-mode-changed', { detail: newMode }))
    if (newMode !== 'cyber') {
      superheroAudio.enableSound()
      setSoundEnabled(true)
    }
  }

  // Toggle Sound
  const handleToggleSound = (e) => {
    e?.stopPropagation()
    const isNowOn = superheroAudio.toggleSound()
    setSoundEnabled(isNowOn)
  }

  // Global event listener for external triggers (e.g., TerminalModal commands)
  useEffect(() => {
    const handleSetHeroMode = (e) => {
      if (['cyber', 'thor', 'spiderman'].includes(e.detail)) {
        switchMode(e.detail)
      }
    }

    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in input, textarea, or terminal
      const activeTag = document.activeElement?.tagName
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return

      if (e.key === 't' || e.key === 'T') {
        switchMode('thor')
      } else if (e.key === 's' || e.key === 'S') {
        switchMode('spiderman')
      } else if (e.key === 'm' || e.key === 'M') {
        switchMode('cyber')
      }
    }

    window.addEventListener('set-hero-mode', handleSetHeroMode)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('set-hero-mode', handleSetHeroMode)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Track mouse coordinates & hover detection for Spider-Sense
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      if (mode === 'spiderman') {
        const target = e.target
        const isInteractive =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer')

        setSpiderSenseActive(!!isInteractive)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mode])

  // Canvas Resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Procedural Lightning Generator (Thor)
  const createLightningBolt = useCallback((startX, startY, endX, endY, branches = 2) => {
    const segments = []
    const totalDist = Math.hypot(endX - startX, endY - startY)
    const steps = Math.max(8, Math.floor(totalDist / 25))

    let currentX = startX
    let currentY = startY

    for (let i = 0; i < steps; i++) {
      const progress = (i + 1) / steps
      const targetX = startX + (endX - startX) * progress
      const targetY = startY + (endY - startY) * progress

      // Perpendicular jitter
      const jitter = (Math.random() - 0.5) * 45 * (1 - progress * 0.5)
      const nextX = i === steps - 1 ? endX : targetX + jitter
      const nextY = i === steps - 1 ? endY : targetY + (Math.random() - 0.5) * 25

      segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY })
      currentX = nextX
      currentY = nextY

      // Random branch off
      if (branches > 0 && Math.random() < 0.25 && i > 2 && i < steps - 2) {
        const branchAngle = (Math.random() - 0.5) * 1.2
        const branchLen = totalDist * 0.3 * Math.random()
        const bx2 = currentX + Math.sin(branchAngle) * branchLen
        const by2 = currentY + Math.cos(branchAngle) * branchLen
        createLightningBolt(currentX, currentY, bx2, by2, branches - 1)
      }
    }

    activeEffectsRef.current.lightnings.push({
      segments,
      alpha: 1,
      decay: 0.05 + Math.random() * 0.03,
      color: '#38bdf8'
    })

    // Generate electric sparks around end point
    for (let s = 0; s < 18; s++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 7
      activeEffectsRef.current.sparks.push({
        x: endX,
        y: endY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        life: 0.03 + Math.random() * 0.04,
        size: 1.5 + Math.random() * 2,
        color: Math.random() > 0.3 ? '#67e8f9' : '#ffffff'
      })
    }
  }, [])

  // Procedural Web Generator (Spider-Man)
  const createWebStrike = useCallback((targetX, targetY) => {
    const anchors = [
      { x: 0, y: 0 },
      { x: window.innerWidth, y: 0 },
      { x: window.innerWidth / 2, y: 0 },
      { x: targetX > window.innerWidth / 2 ? window.innerWidth : 0, y: targetY * 0.5 }
    ]

    // Choose the 2 closest anchors
    const sortedAnchors = [...anchors].sort((a, b) => {
      const distA = Math.hypot(a.x - targetX, a.y - targetY)
      const distB = Math.hypot(b.x - targetX, b.y - targetY)
      return distA - distB
    }).slice(0, 2)

    // Generate radial web spokes & spiral web rings around target point
    const spokes = []
    const rings = []
    const spokeCount = 8
    const maxRadius = Math.min(180, Math.max(90, Math.hypot(targetX - sortedAnchors[0].x, targetY - sortedAnchors[0].y) * 0.35))

    for (let i = 0; i < spokeCount; i++) {
      const angle = (i / spokeCount) * Math.PI * 2
      spokes.push({
        x2: targetX + Math.cos(angle) * maxRadius,
        y2: targetY + Math.sin(angle) * maxRadius
      })
    }

    const ringCount = 4
    for (let r = 1; r <= ringCount; r++) {
      const radius = (r / ringCount) * maxRadius
      const ringPoints = []
      for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * Math.PI * 2
        // Add subtle droop/sag
        const sag = 0.92
        ringPoints.push({
          x: targetX + Math.cos(angle) * radius * sag,
          y: targetY + Math.sin(angle) * radius * sag
        })
      }
      rings.push(ringPoints)
    }

    activeEffectsRef.current.webs.push({
      targetX,
      targetY,
      anchors: sortedAnchors,
      spokes,
      rings,
      alpha: 1,
      decay: 0.015, // lasts ~1.5 - 2s
      sagOffset: Math.random() * 8
    })

    // Web micro-droplets
    for (let i = 0; i < 12; i++) {
      activeEffectsRef.current.sparks.push({
        x: targetX,
        y: targetY,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 0.9,
        life: 0.03,
        size: 1.5,
        color: '#f8fafc'
      })
    }
  }, [])

  // Canvas Click Handler
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't trigger if clicked on the hero widget itself
      if (e.target.closest('#hero-mode-widget')) return

      const clickX = e.clientX
      const clickY = e.clientY

      if (mode === 'thor') {
        // Trigger Thor thunder & lightning
        superheroAudio.playThunder()
        setFlash('thor')
        setTimeout(() => setFlash(null), 70)

        // Bolt origin: cloud from top
        const startX = clickX + (Math.random() - 0.5) * 300
        const startY = 0
        createLightningBolt(startX, startY, clickX, clickY, 2)
      } else if (mode === 'spiderman') {
        // Trigger Spider-Man web thwip
        superheroAudio.playWebThwip()
        createWebStrike(clickX, clickY)
      }
    }

    window.addEventListener('mousedown', handleGlobalClick)
    return () => window.removeEventListener('mousedown', handleGlobalClick)
  }, [mode, createLightningBolt, createWebStrike])

  // Continuous Canvas Animation Loop (60FPS)
  useEffect(() => {
    if (mode === 'cyber') {
      // Clear canvas and cancel loop if in standard cyber mode
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx?.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let isRunning = true

    const render = () => {
      if (!isRunning) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const fx = activeEffectsRef.current

      // 1. RENDER THOR LIGHTNING BOLTS
      if (mode === 'thor') {
        for (let i = fx.lightnings.length - 1; i >= 0; i--) {
          const bolt = fx.lightnings[i]
          bolt.alpha -= bolt.decay

          if (bolt.alpha <= 0) {
            fx.lightnings.splice(i, 1)
            continue
          }

          ctx.save()
          ctx.strokeStyle = `rgba(186, 230, 253, ${bolt.alpha})`
          ctx.shadowColor = '#0284c7'
          ctx.shadowBlur = 18
          ctx.lineWidth = 2.5
          ctx.lineCap = 'round'
          ctx.lineJoin = 'bevel'

          ctx.beginPath()
          bolt.segments.forEach(seg => {
            ctx.moveTo(seg.x1, seg.y1)
            ctx.lineTo(seg.x2, seg.y2)
          })
          ctx.stroke()

          // Inner white hot core
          ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.alpha})`
          ctx.shadowBlur = 6
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.restore()
        }
      }

      // 2. RENDER SPIDER-MAN WEBS
      if (mode === 'spiderman') {
        for (let i = fx.webs.length - 1; i >= 0; i--) {
          const web = fx.webs[i]
          web.alpha -= web.decay

          if (web.alpha <= 0) {
            fx.webs.splice(i, 1)
            continue
          }

          ctx.save()
          ctx.strokeStyle = `rgba(255, 255, 255, ${web.alpha * 0.75})`
          ctx.shadowColor = 'rgba(239, 68, 68, 0.4)'
          ctx.shadowBlur = 8
          ctx.lineWidth = 1.2

          // Anchor main cables
          web.anchors.forEach(anc => {
            ctx.beginPath()
            ctx.moveTo(anc.x, anc.y)
            const cpx = (anc.x + web.targetX) / 2
            const cpy = (anc.y + web.targetY) / 2 + web.sagOffset
            ctx.quadraticCurveTo(cpx, cpy, web.targetX, web.targetY)
            ctx.stroke()
          })

          // Web Radial Spokes
          web.spokes.forEach(spoke => {
            ctx.beginPath()
            ctx.moveTo(web.targetX, web.targetY)
            ctx.lineTo(spoke.x2, spoke.y2)
            ctx.stroke()
          })

          // Web Spiral Cross Rings
          web.rings.forEach(ring => {
            if (ring.length === 0) return
            ctx.beginPath()
            ctx.moveTo(ring[0].x, ring[0].y)
            for (let p = 1; p < ring.length; p++) {
              ctx.lineTo(ring[p].x, ring[p].y)
            }
            ctx.closePath()
            ctx.stroke()
          })

          // Center silk knot node
          ctx.fillStyle = `rgba(255, 255, 255, ${web.alpha})`
          ctx.beginPath()
          ctx.arc(web.targetX, web.targetY, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }

      // 3. RENDER SPARKS & PARTICLES
      for (let i = fx.sparks.length - 1; i >= 0; i--) {
        const spark = fx.sparks[i]
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vy += 0.15 // gravity
        spark.vx *= 0.96 // drag
        spark.alpha -= spark.life

        if (spark.alpha <= 0) {
          fx.sparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.fillStyle = spark.color
        ctx.globalAlpha = spark.alpha
        ctx.shadowColor = spark.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animFrameId.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      isRunning = false
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [mode])

  return (
    <>
      {/* 1. Fullscreen FX Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[80] overflow-hidden"
      />

      {/* 2. Thor Lightning Screen Flash Overlay */}
      <AnimatePresence>
        {flash === 'thor' && (
          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 pointer-events-none z-[75] bg-sky-400/20"
          />
        )}
      </AnimatePresence>

      {/* 3. Spider-Sense Tingle Radar Around Cursor */}
      <AnimatePresence>
        {mode === 'spiderman' && spiderSenseActive && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.9, 0.5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeOut' }}
            style={{
              left: mousePos.x,
              top: mousePos.y
            }}
            className="fixed pointer-events-none z-[85] -translate-x-1/2 -translate-y-1/2"
          >
            {/* Comic style sense lines */}
            <div className="w-16 h-16 rounded-full border-2 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
            <div className="absolute inset-[-6px] rounded-full border border-yellow-400/60 animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Ambient Atmospheric Background Glow according to Hero Mode */}
      <div className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000">
        {mode === 'thor' && (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/15 via-transparent to-blue-900/10" />
        )}
        {mode === 'spiderman' && (
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/15 via-transparent to-blue-950/15" />
        )}
      </div>

      {/* 5. Floating Hero Controller Widget */}
      <div
        id="hero-mode-widget"
        className="fixed bottom-20 left-6 z-[9990] flex items-center select-none"
      >
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.button
              key="collapsed-btn"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsCollapsed(false)}
              className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-2xl text-xs font-mono text-white/90 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
              title="Open Hero Mode Selector (Press T for Thor, S for Spider-Man, M for Matrix)"
            >
              <Sparkles className="w-4 h-4 text-green-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-semibold uppercase tracking-wider">
                {mode === 'cyber' ? 'CYBER' : mode === 'thor' ? '⚡ THOR' : '🕷️ SPIDER'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded-widget"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 border border-white/10 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] text-xs"
            >
              {/* Cyber Mode (Default Clean) */}
              <button
                onClick={() => switchMode('cyber')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  mode === 'cyber'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title="Default Clean Cyber Matrix (Shortcut: M)"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Cyber</span>
              </button>

              {/* Thor Mode */}
              <button
                onClick={() => switchMode('thor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  mode === 'thor'
                    ? 'bg-sky-500/25 text-sky-300 border border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.4)] font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title="Thor: God of Thunder Mode (Shortcut: T). Click anywhere for lightning strikes!"
              >
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                <span>Thor</span>
              </button>

              {/* Spider-Man Mode */}
              <button
                onClick={() => switchMode('spiderman')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  mode === 'spiderman'
                    ? 'bg-red-500/25 text-rose-300 border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.4)] font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title="Spider-Man: Web-Slinger Mode (Shortcut: S). Click anywhere to shoot webs!"
              >
                <span className="text-sm leading-none">🕷️</span>
                <span>Spidey</span>
              </button>

              <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

              {/* Sound FX Toggle (Muted by default) */}
              <button
                onClick={handleToggleSound}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.3)]'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
                title={soundEnabled ? 'Sound FX: ON (Click to mute)' : 'Sound FX: Muted (Click to enable audio synthesis)'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Minimize Widget */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 text-white/30 hover:text-white/80 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                title="Minimize hero selector"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
