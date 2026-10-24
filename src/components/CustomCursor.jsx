import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [heroMode, setHeroMode] = useState(() => {
    return localStorage.getItem('emon_hero_mode') || 'cyber';
  });
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleHeroMode = (e) => {
      setHeroMode(e.detail);
    };
    window.addEventListener('hero-mode-changed', handleHeroMode);
    return () => window.removeEventListener('hero-mode-changed', handleHeroMode);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.classList.contains('cursor-pointer') ||
        target.closest('.group')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  // Color theme mapping
  const colors = {
    cyber: {
      dot: 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]',
      glowHover: 'bg-green-500/15',
      glowNormal: 'bg-green-500/5',
      ring: 'border-green-500/30'
    },
    thor: {
      dot: 'bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.9)]',
      glowHover: 'bg-sky-400/25',
      glowNormal: 'bg-sky-400/10',
      ring: 'border-sky-400/40'
    },
    spiderman: {
      dot: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)]',
      glowHover: 'bg-red-500/25',
      glowNormal: 'bg-red-500/10',
      ring: 'border-red-500/40'
    }
  };

  const currentTheme = colors[heroMode] || colors.cyber;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 2.5 : 1,
        }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out"
      >
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentTheme.dot}`} />
        
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px] transition-all duration-700 
          ${isHovered ? `w-40 h-40 ${currentTheme.glowHover}` : `w-24 h-24 ${currentTheme.glowNormal}`}`} 
        />
      </motion.div>

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className={`absolute top-0 left-0 w-4 h-4 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-all duration-300
        ${currentTheme.ring} ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default CustomCursor;