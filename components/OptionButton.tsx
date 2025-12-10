import React from 'react';
import { motion } from 'framer-motion';

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ text, isSelected, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        w-full py-3 px-8 rounded-lg text-lg font-semibold text-center transition-all duration-300
        border shadow-sm backdrop-blur-sm
        ${isSelected 
          ? 'bg-[#bae6fd] border-[#7dd3fc] text-[#0c4a6e] shadow-md' 
          : 'bg-[#f0f9ff] border-[#bae6fd] text-[#334155] hover:bg-[#dcf3fc] hover:border-[#bae6fd] hover:text-[#1e293b] hover:shadow-sm'}
      `}
      aria-pressed={isSelected}
    >
      {text}
    </motion.button>
  );
};