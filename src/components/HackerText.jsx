import { useState, useEffect, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#_~'

export const HackerText = ({
  text,
  className = '',
  speed = 35,
  triggerOnHover = true,
  scrambleOnMount = true,
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef(null)

  const scramble = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    let iteration = 0
    clearInterval(intervalRef.current)

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
        setIsAnimating(false)
      }

      iteration += 1 / 2
    }, speed)
  }, [isAnimating, speed, text])

  useEffect(() => {
    if (scrambleOnMount) {
      scramble()
    }
    return () => clearInterval(intervalRef.current)
  }, [scramble, scrambleOnMount])

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      aria-label={text}
    >
      {displayText}
    </span>
  )
}

export default HackerText
