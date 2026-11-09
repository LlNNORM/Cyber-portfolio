import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from './useLanguage';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'mobile-menu';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'default',
}) => {
  const { language, setLanguage } = useLanguage();

  const { t } = useLanguage();

  if (variant === 'mobile-menu') {
    const options = [
      { code: 'en', label: 'EN' },
      { code: 'ru', label: 'РУ' },
    ] as const;

    return (
      <div className={`w-full ${className}`}>
        <div className="mb-2 flex items-center gap-2">
          <Languages size={15} className="text-[#A020F0]" />
          <span className="jetbrains text-[10px] uppercase tracking-[0.2em] text-[#00E0FF]/70">
            {t('menu.interfaceLanguage')}
          </span>
        </div>

        <div className="inline-flex gap-1 cyber-border rounded bg-[#050508] p-1.5">
          {options.map(({ code, label }) => (
            <motion.button
              key={code}
              type="button"
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
              whileTap={{ scale: 0.95 }}
              className={`rounded px-4 py-2 jetbrains text-sm transition-all duration-300 ${
                language === code
                  ? 'bg-[#A020F0] text-white cyber-glow'
                  : 'text-[#0FF4F8] hover:bg-[#A020F0]/20'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * DESKTOP / DEFAULT VERSION
   * НИЧЕГО НЕ МЕНЯЕМ
   * ============================================================
   */

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Мобильная версия старого переключателя */}
      <motion.button
        onClick={toggleLanguage}
        className="sm:hidden cyber-border rounded bg-[#050508] px-2.5 py-1.5 jetbrains text-xs text-[#0FF4F8] flex items-center gap-1.5 active:scale-95"
        whileTap={{ scale: 0.95 }}
      >
        <Languages className="w-3.5 h-3.5 text-[#A020F0]" />

        <span className="font-bold text-[#00E0FF] uppercase">
          {language}
        </span>
      </motion.button>

      {/* Desktop version */}
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