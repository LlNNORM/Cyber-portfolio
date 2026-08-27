import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Terminal,
  User,
  Zap,
  Briefcase,
  Mail,
  X,
  ChevronRight,
} from 'lucide-react';

import type { Screen } from '../types/screens';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

interface MenuItem {
  id: Exclude<Screen, 'boot'>;
  label: string;
  description: string;
  icon: React.ElementType;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'terminal',
    label: 'TERMINAL',
    description: 'SYSTEM CONSOLE',
    icon: Terminal,
  },
  {
    id: 'profile',
    label: 'PROFILE',
    description: 'IDENTITY DATA',
    icon: User,
  },
  {
    id: 'skills',
    label: 'SKILLS',
    description: 'TECHNICAL MODULES',
    icon: Zap,
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    description: 'SELECTED WORKS',
    icon: Briefcase,
  },
  {
    id: 'contacts',
    label: 'CONTACTS',
    description: 'COMMUNICATION LINKS',
    icon: Mail,
  },
];

const MobileMenu: React.FC<MobileMenuProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigate = (screen: Exclude<Screen, 'boot'>) => {
    closeMenu();

    if (screen === currentScreen) {
      return;
    }

    onNavigate(screen);
  };

  /*
   * Закрытие по Escape.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  /*
   * Блокируем прокрутку страницы,
   * пока открыт fullscreen menu.
   */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Burger */}
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="
          relative
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-lg
          cyber-border
          text-[#00E0FF]
          transition-all
          duration-300
          hover:bg-[#A020F0]/10
          active:scale-95
        "
      >
        <span className="flex flex-col gap-[5px]">
          <span className="h-[1.75px] w-7 bg-current" />
          <span className="h-[1.75px] w-7 bg-current" />
          <span className="h-[1.75px] w-7 bg-current" />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="
              fixed
              inset-0
              z-[9999]
              flex
              h-[100dvh]
              w-screen
              flex-col
              overflow-hidden
              bg-[#050508]
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 cyber-grid opacity-60" />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-30
                bg-[radial-gradient(circle_at_top_right,rgba(160,32,240,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(0,224,255,0.10),transparent_35%)]
              "
            />

            {/* Content */}
            <div
              className="
                relative
                z-10
                flex
                h-full
                flex-col
                px-4
                pb-5
                pt-4
                sm:px-6
              "
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between">
                <div>
                  <div className="jetbrains text-[9px] uppercase tracking-[0.28em] text-[#00E0FF]/60">
                    PERSONALITY OS
                  </div>

                  <div className="mt-1 orbitron text-lg tracking-[0.16em] text-[#A020F0] cyber-text-glow">
                    SYSTEM MENU
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#A020F0]/50
                    bg-[#A020F0]/10
                    text-[#A020F0]
                    shadow-[0_0_18px_rgba(160,32,240,0.12)]
                    transition-all
                    duration-300
                    hover:bg-[#A020F0]/20
                    hover:text-[#00E0FF]
                    active:scale-95
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* System status */}
              <div className="mt-4 flex items-center justify-between border-y border-[#00E0FF]/10 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />

                  <span className="jetbrains text-[9px] tracking-[0.18em] text-[#00E0FF]">
                    NAVIGATION ONLINE
                  </span>
                </div>

                <span className="jetbrains text-[9px] tracking-widest text-[#A020F0]/70">
                  v1.0
                </span>
              </div>

              {/* Navigation */}
              <nav className="mt-4 overflow-y-auto overflow-x-hidden pr-1">
                <div className="space-y-2">
                  {MENU_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const active = item.id === currentScreen;

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigate(item.id)}
                        className={`
                          group
                          relative
                          flex
                          w-full
                          items-center
                          gap-3
                          overflow-hidden
                          rounded-xl
                          border
                          px-3
                          py-3.5
                          text-left
                          transition-all
                          duration-300
                          ${
                            active
                              ? 'border-[#A020F0]/70 bg-[#A020F0]/10'
                              : 'border-[#00E0FF]/10 bg-[#00E0FF]/[0.025] hover:border-[#00E0FF]/30 hover:bg-[#00E0FF]/5'
                          }
                        `}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.05 + index * 0.055,
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                      >
                        {active && (
                          <motion.div
                            layoutId="mobile-menu-active"
                            className="
                              absolute
                              left-0
                              top-1/2
                              h-10
                              w-[2px]
                              -translate-y-1/2
                              bg-[#A020F0]
                              shadow-[0_0_12px_#A020F0]
                            "
                          />
                        )}

                        <div
                          className={`
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            transition-all
                            duration-300
                            ${
                              active
                                ? 'border-[#A020F0]/50 bg-[#A020F0]/10 text-[#A020F0]'
                                : 'border-[#00E0FF]/15 bg-[#00E0FF]/5 text-[#00E0FF] group-hover:border-[#00E0FF]/30'
                            }
                          `}
                        >
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div
                            className={`
                              orbitron
                              text-xs
                              tracking-[0.14em]
                              transition-colors
                              ${
                                active
                                  ? 'text-[#A020F0] cyber-text-glow'
                                  : 'text-[#00E0FF]'
                              }
                            `}
                          >
                            {item.label}
                          </div>

                          <div className="mt-1 jetbrains text-[9px] tracking-[0.12em] text-gray-500">
                            {item.description}
                          </div>
                        </div>

                        <ChevronRight
                          size={17}
                          className={`
                            shrink-0
                            transition-all
                            duration-300
                            ${
                              active
                                ? 'translate-x-0 text-[#A020F0]'
                                : '-translate-x-1 text-[#00E0FF]/30 group-hover:translate-x-0 group-hover:text-[#00E0FF]'
                            }
                          `}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Language section */}
              <div className="mt-4 shrink-0">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="jetbrains text-[9px] uppercase tracking-[0.2em] text-gray-500">
                      INTERFACE LANGUAGE
                    </div>

                    <div className="mt-1 jetbrains text-[8px] uppercase tracking-[0.18em] text-[#00E0FF]/50">
                      Swipe to change
                    </div>
                  </div>
                </div>

                <div className="
                  rounded-xl
                  border
                  border-[#A020F0]/30
                  bg-[#0a0a14]
                  p-1
                  shadow-[0_0_20px_rgba(160,32,240,0.08)]
                ">
                  {/* <LanguageSwitcher /> */}
                                <motion.div
                className="shrink-0 border-t border-[#A020F0]/20 pt-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.3,
                }}
              >
                <LanguageSwitcher variant="mobile-menu" />
              </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;