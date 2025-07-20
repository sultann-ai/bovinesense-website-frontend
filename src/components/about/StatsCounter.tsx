import { useInView, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";
interface StatsCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}



const StatsCounter: React.FC<StatsCounterProps> = ({ value, label, prefix = "", suffix = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const count = useSpring(0, { duration: 2000 });

  React.useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <motion.div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2">
        {prefix}<motion.span>{count}</motion.span>{suffix}
      </motion.div>
      <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">{label}</div>
    </motion.div>
  );
};

export default StatsCounter;