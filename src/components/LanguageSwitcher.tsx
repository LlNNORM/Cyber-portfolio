import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'mobile-menu';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'default',
}) => {
  const { language, setLanguage } = useLanguage();

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const lastProgressRef = useRef(0);

  const targetLanguage = language === 'en' ? 'ru' : 'en';

  const currentLabel = language === 'en' ? 'EN' : 'РУ';
  const targetLabel = targetLanguage === 'en' ? 'EN' : 'РУ';

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track) return;

    setIsDragging(true);

    startXRef.current = event.clientX;
    lastProgressRef.current = progress;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const track = trackRef.current;

    if (!track) return;

    const rect = track.getBoundingClientRect();
    const deltaX = event.clientX - startXRef.current;

    const maxDistance = rect.width * 0.72;

    const nextProgress =
      lastProgressRef.current + (deltaX / maxDistance) * 100;

    const clampedProgress = Math.max(
      0,
      Math.min(100, nextProgress),
    );

    setProgress(clampedProgress);
  };

  const finishSwipe = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (progress >= 72) {
      setLanguage(targetLanguage);

      // Небольшая задержка делает исчезновение прогресс-бара
      // визуально более приятным.
      requestAnimationFrame(() => {
        setProgress(0);
      });
    } else {
      setProgress(0);
    }
  };

  if (variant === 'mobile-menu') {
    return (
      <div className={`w-full ${className}`}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages
              size={15}
              className="text-[#A020F0]"
            />

            <span className="jetbrains text-[10px] uppercase tracking-[0.2em] text-[#00E0FF]/70">
              Interface language
            </span>
          </div>

          <span className="jetbrains text-[9px] uppercase tracking-widest text-[#A020F0]/60">
            SWIPE
          </span>
        </div>

        <div
          ref={trackRef}
          className="
            relative
            h-16
            w-full
            select-none
            touch-none
            overflow-hidden
            rounded-xl
            border
            border-[#A020F0]/25
            bg-[#050508]
            cursor-grab
            active:cursor-grabbing
          "
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishSwipe}
          onPointerCancel={finishSwipe}
          onPointerLeave={(event) => {
            if (isDragging && event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
        >
          {/* Progress background */}
          <motion.div
            className="
              absolute
              inset-y-0
              left-0
              bg-gradient-to-r
              from-[#A020F0]/20
              via-[#A020F0]/10
              to-[#00E0FF]/20
            "
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: isDragging ? 0 : 0.25,
              ease: 'easeOut',
            }}
          />

          {/* Progress scan line */}
          {progress > 0 && (
            <motion.div
              className="
                absolute
                inset-y-0
                w-[2px]
                bg-[#00E0FF]
                shadow-[0_0_12px_#00E0FF]
              "
              animate={{
                left: `${progress}%`,
              }}
            />
          )}

          {/* Current language */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <div className="relative flex items-center gap-2">
              <motion.div
                className="
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#A020F0]
                  bg-[#A020F0]/10
                  text-[#A020F0]
                  shadow-[0_0_12px_rgba(160,32,240,0.45)]
                "
                animate={{
                  scale: isDragging ? 1.08 : [1, 1.06, 1],
                  boxShadow: isDragging
                    ? '0 0 22px rgba(160,32,240,0.75)'
                    : [
                        '0 0 8px rgba(160,32,240,0.35)',
                        '0 0 18px rgba(160,32,240,0.7)',
                        '0 0 8px rgba(160,32,240,0.35)',
                      ],
                }}
                transition={{
                  duration: 1.4,
                  repeat: isDragging ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="h-2 w-2 rounded-full bg-[#A020F0]" />
              </motion.div>

              <div>
                <div className="jetbrains text-[8px] uppercase tracking-[0.18em] text-gray-500">
                  CURRENT
                </div>

                <div className="jetbrains text-sm font-bold tracking-widest text-[#A020F0]">
                  {currentLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Target language */}
          <div className="absolute inset-y-0 right-4 flex items-center">
            <div className="text-right">
              <div className="jetbrains text-[8px] uppercase tracking-[0.18em] text-gray-500">
                SWITCH TO
              </div>

              <div className="flex items-center justify-end gap-2">
                <span className="jetbrains text-sm font-bold tracking-widest text-[#00E0FF]">
                  {targetLabel}
                </span>

                <motion.div
                  animate={{
                    x: progress > 15 ? 4 : [0, 3, 0],
                    opacity: progress > 15 ? 1 : [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: progress > 15 ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight
                    size={15}
                    className="text-[#00E0FF]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Center hint */}
          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
            animate={{
              opacity: progress > 15 ? 0 : 0.7,
            }}
          >
            <span className="jetbrains text-[8px] uppercase tracking-[0.28em] text-gray-600">
              swipe →
            </span>
          </motion.div>

          {/* Progress percentage */}
          <motion.div
            className="
              pointer-events-none
              absolute
              bottom-1
              left-1/2
              -translate-x-1/2
              jetbrains
              text-[7px]
              tracking-widest
              text-[#00E0FF]/50
            "
            animate={{
              opacity: progress > 5 ? 1 : 0,
            }}
          >
            {Math.round(progress)}%
          </motion.div>
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