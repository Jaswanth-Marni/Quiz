import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  total: number;
  current: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  return (
    <div className="flex gap-2 w-full mx-auto items-center">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="relative flex-1">
          {/* Base thin line */}
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 rounded-full -translate-y-1/2" />
          {/* Progress thick line */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: index <= current ? "100%" : "0%" }}
            transition={{ duration: 0.4 }}
            className={`relative h-[8px] rounded-full ${index <= current ? 'bg-[#1e293b]' : 'bg-transparent'}`}
            style={{ zIndex: 2 }}
          />
        </div>
      ))}
    </div>
  );
};