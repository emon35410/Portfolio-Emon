import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#_~'

export const HackerText = ({
  text,
  className = '',
  speed = 28,
  triggerOnHover = true,
  triggerInView = true,
}) => {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const hasAnimatedRef = useRef(false)

  // Trigger when heading enters the viewport (amount: 0.2 is mobile friendly)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const startScramble = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    let iteration = 0
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        isAnimatingRef.current = false
        setDisplayText(text) // Always guarantee clean original text
      }

      iteration += 1 / 2
    }, speed)
  }, [speed, text])

  // Trigger once when scrolled into view
  useEffect(() => {
    if (triggerInView && isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      startScramble()
    }
  }, [isInView, startScramble, triggerInView])

  // Sync if text changes, and ensure cleanup on unmount
  useEffect(() => {
    setDisplayText(text)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text])

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      aria-label={text}
    >
      {displayText}
    </span>
  )
}

export default HackerText
