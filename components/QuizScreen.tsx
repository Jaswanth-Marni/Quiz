import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { OptionButton } from './OptionButton';
import { ProgressBar } from './ProgressBar';
import { PawDecor } from './PawDecor';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId: string | undefined;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onAnswer,
  onNext,
  onPrev,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Centered Content Column */}
      <div className="flex-grow flex flex-col max-w-3xl mx-auto relative z-10 px-4 w-full overflow-hidden">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-center mb-2 lg:mb-4 pt-2 flex-shrink-0"
        >
          <h1 className="text-[3rem] sm:text-[4rem] lg:text-[4rem] leading-tight font-serif font-bold mb-2 italic tracking-tight bg-gradient-to-r from-[#0e4b75] via-[#1e5c8a] to-[#0ea5e9] bg-clip-text text-transparent pb-2">
            Test Your Knowledge
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Answer all questions to see your results
          </p>
          <div className="h-3" />
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mb-4 lg:mb-4 flex-shrink-0 px-8"
        >
          <ProgressBar total={totalQuestions} current={currentIndex} />
        </motion.div>

        {/* Question and Options Container (Scrollable Area) */}
        <div className="relative flex-grow flex flex-col justify-start mt-2 overflow-y-auto lg:overflow-hidden overflow-x-hidden no-scrollbar px-1 pb-2">
          <AnimatePresence mode='wait'>
            <motion.div
              key={question.id}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                  }
                },
                exit: { 
                  opacity: 0,
                  transition: { duration: 0.2 }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {/* Question Box */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: "easeOut" }
                  }
                }}
                className="bg-[#dcf3fc] rounded-xl py-4 lg:py-6 px-5 mb-4 lg:mb-4 text-center shadow-sm border border-[#bae6fd]"
              >
                <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-[#1e293b]">
                  {currentIndex + 1}. {question.text}
                </h2>
              </motion.div>

              {/* Options Stack */}
              <motion.div 
                className="flex flex-col gap-3 lg:gap-4 mb-0"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
              >
                {question.options.map((option) => (
                  <motion.div
                    key={option.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        filter: "blur(0px)",
                        transition: { duration: 0.5, ease: "easeOut" }
                      }
                    }}
                  >
                    <OptionButton
                      text={option.text}
                      isSelected={selectedOptionId === option.id}
                      onClick={() => onAnswer(option.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Area for Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="w-full max-w-3xl mx-auto px-4 py-0 flex justify-end z-20 relative flex-shrink-0 mt-0"
      >
        {currentIndex === totalQuestions - 1 ? (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-[#dcf3fc] to-[#f0f9ff] hover:from-[#ccebf7] hover:to-[#e0f2fe] text-[#266580] font-bold text-lg py-3 px-10 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Submit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center ${
                currentIndex === 0 
                  ? 'bg-[#f8fafc] text-[#cbd5e1] cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#e0f7ff] to-[#bae6fd] text-[#1e293b] shadow-sm hover:shadow-md'
              }`}
              aria-label="Previous Question"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={onNext}
              className="w-12 h-12 rounded-xl bg-gradient-to-l from-[#e0f7ff] to-[#bae6fd] text-[#1e293b] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
              aria-label="Next Question"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Cat Paw Decor - Separate from arrow buttons */}
      {currentIndex === 0 && (
        <div className="absolute bottom-[-40px] left-2 z-20">
          <PawDecor />
        </div>
      )}
    </div>
  );
};