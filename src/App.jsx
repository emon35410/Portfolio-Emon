import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Experience from './components/Experience'
import Achievements from './components/Achievements'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 1. Optimized Lenis Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      lerp: 0.1, // Eta add koray scroll arektu responsive hobe
      wheelMultiplier: 1,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 2. Loading Timer
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    // Cleanup
    return () => {
      clearTimeout(timer)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative bg-[#020617] text-white font-body selection:bg-green-500/30 selection:text-green-400 min-h-screen">

      {/* 1. Global Utilities */}
      <CustomCursor />
      <ScrollToTop />

      {/* 2. Fixed Navbar */}
      {!isLoading && <Navbar />}

      {/* 3. Global Animated Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-green-500/10 blur-[120px] rounded-full"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full"
        />
      </div>

      {/* 4. Welcome Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* 5. Main Site Layout */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-out ${isLoading
            ? 'h-screen overflow-hidden scale-[0.98] opacity-0 blur-xl'
            : 'opacity-100 scale-100 blur-0'
          }`}
      >
        <main className="relative">
          <section id="home"><Hero /></section>

          {/* Content Wrapper for better spacing */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 md:space-y-32 py-10">
            <section id="about">
              <About />
            </section>

            <section id="experience">
              <Experience />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="projects">
              <Projects />
            </section>

            <section id="education">
              <Education />
            </section>

            <section id="recognitions">
              <Achievements />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App