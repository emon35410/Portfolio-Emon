import { useRef, useLayoutEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)

  // useLayoutEffect prevents "jumps" before the first paint
  useLayoutEffect(() => {
    // 1. Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.4, // Slightly faster for responsiveness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.9, // Gentle movement for eye comfort
      smoothTouch: false,
      touchMultiplier: 1.5,
      lerp: 0.07, // Smoother transition between scroll stops
    })

    lenisRef.current = lenis

    // 2. Optimized Animation Frame
    let rafId;
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // 3. Handle Resize (Crucial for length calculation)
    const resizeObserver = new ResizeObserver(() => {
      lenis.update()
    })
    resizeObserver.observe(document.body)

    // 4. Cleanup
    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll