import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import type {Language}  from './LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Languages className="w-4 h-4 text-[#A020F0]" />
      <div className="flex space-x-1 cyber-border rounded bg-[#050508] p-1">
        <motion.button
          className={`px-2 py-1 rounded jetbrains text-xs transition-all duration-300 ${
            language === 'en'
              ? 'bg-[#A020F0] text-white cyber-glow'
              : 'text-[#0FF4F8] hover:bg-[#A020F0] hover:bg-opacity-20'
          }`}
          onClick={() => handleLanguageChange('en')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
        <motion.button
          className={`px-2 py-1 rounded jetbrains text-xs transition-all duration-300 ${
            language === 'ru'
              ? 'bg-[#A020F0] text-white cyber-glow'
              : 'text-[#0FF4F8] hover:bg-[#A020F0] hover:bg-opacity-20'
          }`}
          onClick={() => handleLanguageChange('ru')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          РУ
        </motion.button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;