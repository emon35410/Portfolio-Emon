import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    // Jodi window.lenis thake (App.jsx theke), tobe oita use korbe
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 }) // 1.5 second dhore smooth glide korbe
    } else {
      // Fallback: Jodi kono karone lenis na pay
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center z-[99999] shadow-2xl transition-all group"
        >
          <ArrowUp size={22} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform duration-300" />
          <span className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping opacity-30" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop