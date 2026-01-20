import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [welcomeText, setWelcomeText] = useState("Initializing...")

  useEffect(() => {
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const increment = prev > 80 ? 0.5 : 1; 
          return prev + increment;
        }
        return 100;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setWelcomeText("Fetching Assets...");
    else if (progress < 50) setWelcomeText("Building Neural Interface...");
    else if (progress < 75) setWelcomeText("Metropolitan University CSE Sync...");
    else if (progress < 100) setWelcomeText("Establishing Secure Connection...");
    else setWelcomeText("Access Granted");
  }, [progress]);

  const firstName = "MAHMUDUL"
  const lastName = "HASAN"
  const nickName = "EMON"

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100vh",
        transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden px-4"
    >
      {/* Dynamic Ambient Light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        
        {/* Top Status Label */}
        <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <AnimatePresence mode="wait">
                <motion.p
                    key={welcomeText}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-green-500/50 font-mono text-[10px] uppercase tracking-[0.4em]"
                >
                    {welcomeText}
                </motion.p>
            </AnimatePresence>
        </div>

        {/* Name Section - Refined Typography */}
        <div className="flex flex-col items-center mb-10 w-full">
          <div className="flex flex-wrap justify-center overflow-hidden">
            {`${firstName} ${lastName}`.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "110%", rotateX: -90, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-2xl sm:text-3xl md:text-5xl font-black text-white/90 tracking-tighter inline-block perspective-1000"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          
          <motion.span
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-widest text-green-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)] italic -mt-2"
          >
            {nickName}
          </motion.span>
        </div>

        {/* Modern Progress Bar */}
        <div className="w-64 md:w-80 group">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Loading Engine</span>
            <span className="text-green-500 font-mono text-sm font-bold tracking-tighter">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="relative h-[4px] bg-white/[0.03] overflow-hidden rounded-full border border-white/[0.05]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-blue-600 via-green-500 to-emerald-400"
              style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}
            />
          </div>
        </div>

        {/* Bottom Technical Tag */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 py-1 px-4 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-sm"
        >
            <p className="text-white/20 text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-medium">
                Core Version: <span className="text-white/40">2026.1.0-STABLE</span>
            </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen