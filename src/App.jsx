import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Education from './components/Education'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative bg-[#020617] text-white font-body overflow-x-hidden min-h-screen">
      
      {/* 1. Custom Animated Cursor */}
      <CustomCursor />
      
      {/* 2. Fixed Navbar (Scale Logic er baire rakha hoyeche jeno fixed thake) */}
      {!isLoading && <Navbar />}
      
      {/* 3. Animated Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/20 blur-[100px] rounded-full"
        />
        
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"
        />

        <motion.div 
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5"
        />
      </div>

      {/* 4. Welcome Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* 5. Main Website Content */}
      <div 
        className={`relative z-10 transition-all duration-1000 ${
          isLoading ? 'h-screen overflow-hidden scale-95 opacity-0 blur-lg' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        <main className="relative pt-16">
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="education"><Education /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default App