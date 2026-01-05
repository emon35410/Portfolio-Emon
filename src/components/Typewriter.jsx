import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const Typewriter = ({ texts }) => {
  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => texts[latest % texts.length] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));

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
          textIndex.set((textIndex.get() + 1) % texts.length);
        }
      },
    });
    return controls.stop;
  }, []);

  return <motion.span>{displayText}</motion.span>;
};