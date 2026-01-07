import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [welcomeText, setWelcomeText] = useState("Initializing...")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        return 100;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Progress onujayi dynamic message change
  useEffect(() => {
    if (progress < 30) setWelcomeText("Loading Assets...");
    else if (progress < 60) setWelcomeText("Building Portfolio...");
    else if (progress < 90) setWelcomeText("Metropolitan University CSE Student...");
    else setWelcomeText("Welcome to Emon's World");
  }, [progress]);

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden px-4"
    >
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        
        {/* Welcome Message Above Name */}
        <motion.p
          key={welcomeText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500/60 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 text-center"
        >
          {welcomeText}
        </motion.p>

        {/* Name Section */}
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="flex flex-wrap justify-center gap-x-1 md:gap-x-2 overflow-hidden text-center">
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
                className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[0.1em] md:tracking-[0.2em] text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] italic mt-2"
          >
            {nickName}
          </motion.span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-64 md:w-72 h-[3px] bg-white/5 overflow-hidden rounded-full border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute h-full bg-gradient-to-r from-blue-500 via-green-500 to-emerald-400"
            style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)' }}
          />
        </div>

        {/* Progress % & Dynamic Subtext */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-green-500/50" />
            <span className="text-green-500 font-mono text-lg font-bold tracking-widest">
              {progress}%
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-green-500/50" />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-medium text-center"
          >
             System Ready — <span className="text-green-500/50">MAHASAN-2026.SYS</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen