import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

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
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
        
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px] transition-all duration-700 
          ${isHovered ? 'w-40 h-40 bg-green-500/15' : 'w-24 h-24 bg-green-500/5'}`} 
        />
      </motion.div>

      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className={`absolute top-0 left-0 w-4 h-4 rounded-full border border-green-500/30 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default CustomCursor;