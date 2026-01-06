import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 25)
    return () => clearInterval(interval)
  }, [])

  const firstName = "MAHMUDUL"
  const lastName = "HASAN"
  const nickName = "EMON"

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100vh",
        transition: { duration: 1, ease: [0.9, 0, 0.1, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
    >
      {/* Dynamic Colorful Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Name with Gradient Effect */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex space-x-2 overflow-hidden">
            {`${firstName} ${lastName}`.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.04,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-[0.2em] text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] italic mt-2"
          >
            {nickName}
          </motion.span>
        </div>

        {/* Professional Colorful Progress Bar */}
        <div className="relative w-72 h-[3px] bg-white/5 overflow-hidden rounded-full border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute h-full bg-gradient-to-r from-blue-500 via-primary to-emerald-400"
            style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)' }}
          />
        </div>

        {/* Stats & Status */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-primary font-mono text-lg font-bold tracking-widest">
              {progress}%
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-medium"
          >
            Setting up your experience
          </motion.p>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </motion.div>
  )
}

export default LoadingScreen