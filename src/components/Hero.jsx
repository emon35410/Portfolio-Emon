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
    <section id="home" className="min-h-screen flex items-center py-12 bg-transparent overflow-hidden">
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
            className="text-primary text-sm mb-3 flex items-center gap-2"
          >
            <span className="w-8 h-0.5 bg-primary"></span>
            Frontend Developer
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white"
          >
            Hi, I&apos;m <span className="text-primary">Emon</span>
          </motion.h1>
          
          {/* Animated Typewriter Subtitle - Updated Texts */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-3xl font-semibold mb-6 text-gray-400 min-h-[40px] flex items-center"
          >
            I am a&nbsp;
            <span className="text-primary font-bold">
              <Typewriter texts={[
                "Frontend Developer",
                "React Specialist",
                "JavaScript Expert",
                "Web Enthusiast"
              ]} />
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1 w-1 h-7 md:h-9 bg-primary"
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
            I&apos;m a passionate developer specializing in building fast, scalable, and highly interactive web applications using modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(var(--primary-rgb), 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="bg-primary px-8 py-4 rounded-xl text-black text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2"
            >
              Contact Me
              <ArrowRight size={16} />
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="border border-white/20 text-white px-8 py-4 rounded-xl text-sm font-semibold hover:border-primary hover:bg-primary/10 transition-all flex items-center gap-2"
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
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <div className="relative group">
            <motion.div
              animate={{ 
                background: [
                  'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-72 h-96 md:w-80 md:h-[480px] bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src="https://i.ibb.co.com/JRvKJ8c2/Gemini-Generated-Image-16cb6f16cb6f16cb.png"
                alt="Emon Profile"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-primary px-4 py-2 rounded-lg shadow-xl hidden lg:block"
            >
              <p className="text-[10px] text-black uppercase tracking-widest font-bold">Open for Projects</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero