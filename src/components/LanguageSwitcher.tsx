import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Мобильная версия: Компактная одиночная кнопка-тоггл */}
      <motion.button
        onClick={toggleLanguage}
        className="sm:hidden cyber-border rounded bg-[#050508] px-2.5 py-1.5 jetbrains text-xs text-[#0FF4F8] flex items-center gap-1.5 active:scale-95"
        whileTap={{ scale: 0.95 }}
      >
        <Languages className="w-3.5 h-3.5 text-[#A020F0]" />
        <span className="font-bold text-[#00E0FF] uppercase">{language}</span>
      </motion.button>

      {/* Десктопная версия (sm+): Полный вид */}
      <div className="hidden sm:flex items-center space-x-2">
        <Languages className="w-4 h-4 text-[#A020F0]" />
        <div className="flex space-x-1 cyber-border rounded bg-[#050508] p-1">
          <motion.button
            className={`px-2 py-1 rounded jetbrains text-xs transition-all duration-300 ${
              language === 'en'
                ? 'bg-[#A020F0] text-white cyber-glow'
                : 'text-[#0FF4F8] hover:bg-[#A020F0]/20'
            }`}
            onClick={() => setLanguage('en')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EN
          </motion.button>
          <motion.button
            className={`px-2 py-1 rounded jetbrains text-xs transition-all duration-300 ${
              language === 'ru'
                ? 'bg-[#A020F0] text-white cyber-glow'
                : 'text-[#0FF4F8] hover:bg-[#A020F0]/20'
            }`}
            onClick={() => setLanguage('ru')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            РУ
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;