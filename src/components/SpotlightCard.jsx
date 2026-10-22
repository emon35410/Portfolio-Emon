import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(34, 197, 94, 0.15)',
  spotlightSize = 350,
  enableTilt = true,
  ...props
}) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position inside card for spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Motion values for 3D tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [7, -7]), springConfig)
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-7, 7]), springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseX.set(x)
    mouseY.set(y)

    if (enableTilt) {
      const normalizedX = (x / rect.width) - 0.5
      const normalizedY = (y / rect.height) - 0.5
      tiltX.set(normalizedX)
      tiltY.set(normalizedY)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={enableTilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]/40 backdrop-blur-xl transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
          ),
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}

export default SpotlightCard
