import React from 'react';
import { motion } from 'framer-motion';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10">
      <div className="flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[3rem] sm:text-[4.5rem] leading-tight font-serif font-thin italic mb-8 tracking-tight text-[#1e293b]"
        >
          Welcome to <br />
          <span className="font-serif font-extrabold bg-gradient-to-r from-[#0e4b75] via-[#1e5c8a] to-[#0ea5e9] bg-clip-text text-transparent italic">
            Quiz
          </span>
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 0.8,
            delay: 0.8,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-gradient-to-r from-[#0e4b75] to-[#0ea5e9] text-white font-bold text-xl py-4 px-16 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300"
        >
          Start Quiz
        </motion.button>
      </div>
    </div>
  );
};
