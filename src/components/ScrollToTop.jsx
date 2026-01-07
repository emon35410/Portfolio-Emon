import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 400px scroll hole button ashbe
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    // Lenis thakle window.scrollTo-te behavior 'smooth' deya jabe na
    // Eta sorasori top-e niye jabe ar Lenis nijei smooth handle korbe
    window.scrollTo({
      top: 0
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: '#22c55e', 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-[100] shadow-2xl transition-colors group"
          aria-label="Scroll to top"
        >
          <ArrowUp 
            size={24} 
            className="text-black group-hover:-translate-y-1 transition-transform duration-300" 
          />
          
          <span className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop