import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  suffix = "%", 
  decimals = 1,
  className = ""
}: AnimatedCounterProps) => {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => v.toFixed(decimals));
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
};
