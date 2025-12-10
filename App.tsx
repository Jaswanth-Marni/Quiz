import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QUIZ_QUESTIONS } from './constants';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LandingScreen } from './components/LandingScreen';
import { QuizState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    isFinished: false,
    hasStarted: false,
  });

  const handleStart = useCallback(() => {
    setGameState((prev) => ({ ...prev, hasStarted: true }));
  }, []);

  const handleAnswer = useCallback((optionId: string) => {
    setGameState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [QUIZ_QUESTIONS[prev.currentQuestionIndex].id]: optionId,
      },
    }));
  }, []);

  const handleNext = useCallback(() => {
    setGameState((prev) => {
      const isLastQuestion = prev.currentQuestionIndex === QUIZ_QUESTIONS.length - 1;
      if (isLastQuestion) {
        return { ...prev, isFinished: true };
      }
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
    });
  }, []);

  const handlePrev = useCallback(() => {
    setGameState((prev) => {
      if (prev.currentQuestionIndex === 0) return prev;
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
    });
  }, []);

  const handleRestart = useCallback(() => {
    setGameState({
      currentQuestionIndex: 0,
      answers: {},
      isFinished: false,
      hasStarted: true,
    });
  }, []);

  const calculateScore = useCallback(() => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (gameState.answers[q.id] === q.correctOptionId) {
        score++;
      }
    });
    return score;
  }, [gameState.answers]);

  return (
    <div className={`min-h-screen w-full bg-[#dbeafe] relative flex items-center justify-center overflow-hidden transition-all duration-700 ${gameState.isFinished ? 'p-0' : 'p-4 md:p-8 lg:p-12'}`}>
      {/* Background Gradients - Only visible when not finished or if we want them to fade out */}
      <div className={`absolute top-[-10%] left-[55%] -translate-x-1/2 w-[90%] h-[70%] bg-[#37a8d3] opacity-60 blur-[90px] rounded-full pointer-events-none transition-opacity duration-700 ${gameState.isFinished ? 'opacity-0' : 'opacity-60'}`} />
      <div className={`absolute bottom-[-10%] left-[-10%] w-[70%] h-[80%] bg-[#37a8d3] opacity-60 blur-[70px] rounded-full pointer-events-none transition-opacity duration-700 ${gameState.isFinished ? 'opacity-0' : 'opacity-60'}`} />

      {/* Main Container that expands */}
      <motion.div
        layout
        className={`relative z-10 flex flex-col overflow-hidden transition-all duration-700 ease-in-out ${
          gameState.isFinished 
            ? 'w-full h-screen bg-white rounded-none border-0 shadow-none' 
            : 'w-[96%] md:w-[92%] lg:w-[90%] max-w-[1920px] h-[92vh] md:h-[88vh] min-h-[600px] bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 shadow-2xl p-4 sm:p-6 md:p-8'
        }`}
      >
        <AnimatePresence mode="wait">
          {!gameState.hasStarted ? (
            <motion.div
              key="landing-content"
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              {/* Inner White Card Structure for Landing */}
              <div className="w-full h-full bg-white rounded-[32px] shadow-inner overflow-hidden relative flex flex-col p-6 sm:p-10 md:p-12 lg:p-10">
                
                {/* Subtle decorative gradients inside the white card */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                {/* Content Area */}
                <div className="relative z-10 w-full h-full flex flex-col">
                  <LandingScreen onStart={handleStart} />
                </div>
              </div>
            </motion.div>
          ) : !gameState.isFinished ? (
            <motion.div
              key="quiz-content"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              {/* Inner White Card Structure for Quiz */}
              <div className="w-full h-full bg-white rounded-[32px] shadow-inner overflow-hidden relative flex flex-col p-6 sm:p-10 md:p-12 lg:p-10">
                
                {/* Subtle decorative gradients inside the white card */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                {/* Content Area */}
                <div className="relative z-10 w-full h-full flex flex-col">
                  <QuizScreen
                    question={QUIZ_QUESTIONS[gameState.currentQuestionIndex]}
                    currentIndex={gameState.currentQuestionIndex}
                    totalQuestions={QUIZ_QUESTIONS.length}
                    selectedOptionId={gameState.answers[QUIZ_QUESTIONS[gameState.currentQuestionIndex].id]}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                    onPrev={handlePrev}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-content"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <ResultScreen
                score={calculateScore()}
                total={QUIZ_QUESTIONS.length}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;