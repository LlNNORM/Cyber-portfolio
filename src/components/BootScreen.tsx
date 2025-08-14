import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import logo from '../assets/dragon-logo.svg';
import Logo from '../assets/dragon-logo.svg?react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const bootSteps = [
    "Booting PersonalityOS v1.0...",
    "Initializing Neural Networks...",
    "Loading Creativity Core...",
    "Establishing Git Connections...",
    "Calibrating JavaScript Engine...",
    "Mounting React Components...",
    "System Ready."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < bootSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen  flex items-center justify-center cyber-grid overflow-hidden">
      <div className="scanline"></div>
      
      <motion.div 
        className="text-center space-y-8 max-w-2xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dragon Logo */}
        <motion.div 
          className="mx-auto w-32 h-32 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <div className="absolute inset-0 cyber-border rounded-full bg-gradient-to-br from-[#A020F0] to-[#00E0FF] p-1">
            <div className="w-full h-full bg-[#050508] rounded-full flex items-center justify-center">
              <Logo   width={100} height={100} className="glowing-logo" />
            </div>
          </div>
          <div className="absolute inset-0 cyber-glow rounded-full"></div>
        </motion.div>

        {/* Logo Text */}
        <motion.h1 
          className="text-4xl md:text-6xl orbitron uppercase tracking-wider cyber-text-glow text-[#A020F0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          LINNORM
        </motion.h1>

        {/* Boot Steps */}
        <motion.div 
          className="h-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.p
            key={currentStep} // триггер анимации при смене текста
            className="jetbrains text-[#00E0FF] text-lg cyber-flicker terminal-cursor"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1], // фликер эффект
            }}
            transition={{
              duration: 0.3,
              repeat: 1,
            }}
          >
            {bootSteps[currentStep]}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="w-[320px] mx-auto space-y-2 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="cyber-border rounded-full bg-[#0a0a0f] h-4 overflow-hidden relative">
            {/* Pulsing Bar */}
            <motion.div 
              className="h-full bg-gradient-to-r from-[#A020F0] to-[#00E0FF] cyber-glow"
              style={{ width: `${progress}%` }}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div className="flex justify-between jetbrains text-sm text-[#0FF4F8]">
            <span className="w-[90px]">LOADING...</span>
            <span className="w-[40px] text-right">{progress}%</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BootScreen;
