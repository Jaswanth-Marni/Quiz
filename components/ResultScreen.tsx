import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, percentage, { duration: 2, ease: "circOut" });
    return animation.stop;
  }, [percentage, count]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center pb-10 pt-6 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white px-6 py-2 rounded-full shadow-sm text-slate-600 font-medium text-sm mb-8 border border-slate-100"
      >
        Keep Learning!
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl sm:text-6xl font-serif font-bold mb-4 tracking-tight bg-gradient-to-r from-[#266580] to-[#4aa3c9] bg-clip-text text-transparent pb-1"
      >
        Your <span className="italic">Final</span> score is
      </motion.h2>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 15 }}
        className="text-[120px] sm:text-[150px] leading-none font-serif font-bold text-[#266580] my-4 flex items-start justify-center"
      >
        <motion.span>{rounded}</motion.span>
        <span className="text-4xl sm:text-5xl ml-2 mt-4 bg-gradient-to-r from-[#266580] to-[#4aa3c9] bg-clip-text text-transparent">%</span>
      </motion.div>

      <motion.div
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.6 }}
         className="mt-8"
      >
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-[#dcf3fc] to-[#f0f9ff] hover:from-[#ccebf7] hover:to-[#e0f2fe] text-[#266580] font-bold text-lg py-3 px-10 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Start Again
        </button>
      </motion.div>
    </div>
  );
};