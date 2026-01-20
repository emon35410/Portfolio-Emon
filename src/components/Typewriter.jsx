import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const Typewriter = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => 
    texts[index].slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, texts[index].length, {
      type: "tween",
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1.5,
      onUpdate: (latest) => {
        if (latest === 0) {
          setIndex((prev) => (prev + 1) % texts.length);
        }
      },
    });

    return controls.stop;
  }, [index, texts, count]);

  return (
    <span className="inline-flex items-baseline">
      <motion.span className="text-green-500 font-bold">
        {displayText}
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[1em] bg-green-500 ml-1 shadow-[0_0_10px_#22c55e] translate-y-[10%]"
      />
    </span>
  );
};

export default Typewriter;