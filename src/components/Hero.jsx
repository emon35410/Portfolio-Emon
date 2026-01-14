import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'

// --- Typewriter Sub-Component ---
const Typewriter = ({ texts }) => {
  const textIndex = useMotionValue(0)
  const baseText = useTransform(textIndex, (latest) => texts[latest % texts.length] || "")
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest))

  useEffect(() => {
    const controls = animate(count, 60, {
      type: "tween",
      duration: 3,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate: (latest) => {
        if (latest === 0) {
          textIndex.set((textIndex.get() + 1) % texts.length)
        }
      },
    })
    return controls.stop
  }, [count, textIndex, texts])

  return <motion.span>{displayText}</motion.span>
}

// --- Main Hero Component ---
const Hero = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-28 md:pt-25 pb-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-green-500 text-sm mb-3 flex items-center gap-2 font-medium tracking-widest"
          >
            <span className="w-8 h-0.5 bg-green-500"></span>
            MERN STACK DEVELOPER
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white"
          >
            Hi, I&apos;m <span className="text-green-500">Emon</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-3xl font-semibold mb-6 text-gray-400 min-h-[40px] flex items-center"
          >
            I am a&nbsp;
            <span className="text-green-500 font-bold">
              <Typewriter texts={[
                "MERN Stack Developer",
                "React Specialist",
                "CSE Student",
                "Web Enthusiast"
              ]} />
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1 w-1 h-7 md:h-9 bg-green-500"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/70 mb-8 max-w-lg leading-relaxed text-lg"
          >
            Specializing in building modern, interactive, and high-performance web applications. Currently pursuing CSE at Metropolitan University, Batch 58.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="bg-green-500 px-8 py-4 rounded-xl text-black text-sm font-bold hover:bg-green-400 transition-all flex items-center gap-2 shadow-[0_10px_20px_rgba(34,197,94,0.2)]"
            >
              Contact Me
              <ArrowRight size={16} />
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="border border-white/10 text-white px-8 py-4 rounded-xl text-sm font-bold hover:border-green-500/50 hover:bg-green-500/5 transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center md:justify-end order-1 md:order-2 relative"
        >
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-10 rounded-full bg-green-500/10 blur-[100px] pointer-events-none" />

            {/* Image Container */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-80 md:w-80 md:h-[460px] bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl z-10"
            >
              <img
                src="https://i.ibb.co.com/G3JMDvrj/Gemini-Generated-Image-16cb6f16cb6f16cb-1.png"
                alt="Emon Profile"
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-green-500 px-5 py-2.5 rounded-2xl shadow-xl hidden lg:block z-20"
            >
              <p className="text-[10px] text-black uppercase tracking-[0.2em] font-black">Open for Work</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero