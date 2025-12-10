import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export const PawDecor: React.FC = () => {
  return (
    <div className="relative group cursor-default">
      {/* Speech Bubble */}
      <motion.div 
        initial={{ opacity: 0, y: 10, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute -top-16 -left-6 bg-white px-5 py-3 rounded-2xl rounded-bl-none shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 z-10"
      >
        <span className="font-handwriting font-bold text-2xl text-slate-700 whitespace-nowrap tracking-wide">
          Best of Luck !
        </span>
        {/* Triangle tail for speech bubble */}
        <div className="absolute -bottom-2 left-0 w-0 h-0 
          border-l-[12px] border-l-transparent
          border-t-[12px] border-t-white
          border-r-[12px] border-r-transparent">
        </div>
      </motion.div>

      {/* Cat Paw Video Decor */}
      <video
        src="/catpaw.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-24 h-24 object-contain mt-12"
      />
    </div>
  );
};