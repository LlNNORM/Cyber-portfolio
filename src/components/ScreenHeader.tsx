import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScreenHeaderProps {
  onBack: () => void;
  backText: string;
  title: string;
  rightElement?: ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  onBack,
  backText,
  title,
  rightElement,
}) => {
  return (
    <motion.div
      className="w-full mb-2 md:mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Десктопная версия (md+): Grid из 3 колонок для точной центровки заголовка */}
      <div className="hidden md:grid md:grid-cols-3 md:items-center w-full gap-4">
        <div className="justify-self-start">
          <button
            onClick={onBack}
            className="cyber-border rounded-lg px-4 py-2 jetbrains text-sm text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300 whitespace-nowrap"
          >
            {backText}
          </button>
        </div>

        <h1 className="justify-self-center text-center orbitron text-2xl lg:text-3xl text-[#A020F0] cyber-text-glow tracking-wider whitespace-nowrap">
          {title}
        </h1>

        <div className="justify-self-end">
          {rightElement}
        </div>
      </div>

      {/* Мобильная версия (< md): компактный стек */}
      <div className="flex md:hidden flex-col gap-3 w-full">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onBack}
            className="cyber-border rounded-lg px-3 py-1.5 jetbrains text-xs text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
          >
            {backText}
          </button>
        </div>

        <h1 className="orbitron text-xl sm:text-2xl text-[#A020F0] cyber-text-glow tracking-wider text-center">
          {title}
        </h1>

        {rightElement && (
          <div className="w-full pt-1">
            {rightElement}
          </div>
        )}
      </div>
    </motion.div>
  );
};