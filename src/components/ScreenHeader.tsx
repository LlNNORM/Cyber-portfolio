import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';
import type { Screen } from '../types/screens';

interface ScreenHeaderProps {
  onBack: () => void;
  backText: string;
  title: string;

  // Остаётся исключительно desktop-элементом
  rightElement?: ReactNode;

  // Текущий экран для MobileMenu
  currentScreen: Screen;

  // Общая навигация приложения
  onNavigate: (screen: Screen) => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  onBack,
  backText,
  title,
  rightElement,
  currentScreen,
  onNavigate,
}) => {
  return (
    <motion.div
      className="w-full mb-3 md:mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* DESKTOP */}
      <div className="hidden md:grid md:grid-cols-3 md:items-center w-full gap-4">
        <div className="justify-self-start">
          <button
            onClick={onBack}
            className="group cyber-border rounded-lg px-4 py-2 jetbrains text-sm text-[#00E0FF] hover:bg-[#A020F0]/20 transition-all duration-300 whitespace-nowrap active:scale-95 flex items-center gap-2"
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1 font-bold">
              &lt;&lt;
            </span>

            <span>{backText}</span>
          </button>
        </div>

        <h1 className="justify-self-center text-center orbitron text-2xl lg:text-3xl text-[#A020F0] cyber-text-glow tracking-wider whitespace-nowrap">
          {title}
        </h1>

        {/* Desktop-specific right element */}
        <div className="justify-self-end">
          {rightElement}
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden items-center justify-between gap-2 w-full min-h-[40px]">
        <button
          onClick={onBack}
          className="group cyber-border rounded-lg px-3 py-1.5 jetbrains text-xs text-[#00E0FF] hover:bg-[#A020F0]/20 transition-all duration-300 shrink-0 active:scale-95 flex items-center justify-center gap-1.5 min-w-[36px]"
          aria-label={backText}
        >
          <span className="inline-block text-xs font-bold transition-transform duration-300 ease-out group-hover:-translate-x-1">
            &lt;&lt;
          </span>

          <span className="hidden sm:inline">
            {backText}
          </span>
        </button>

        <h1 className="orbitron text-base sm:text-xl text-[#A020F0] cyber-text-glow tracking-wider text-center truncate px-1 flex-1 min-w-0">
          {title}
        </h1>

        {/* Common mobile navigation */}
        <MobileMenu
          currentScreen={currentScreen}
          onNavigate={onNavigate}
        />
      </div>
    </motion.div>
  );
};