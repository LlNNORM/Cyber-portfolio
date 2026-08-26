import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

export type MobileMenuScreen =
  | 'boot'
  | 'terminal'
  | 'profile'
  | 'skills'
  | 'projects'
  | 'contacts';

interface MobileMenuProps {
  currentScreen?: MobileMenuScreen;
  onNavigate: (screen: MobileMenuScreen) => void;
}

interface MenuItem {
  id: MobileMenuScreen;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    id: 'terminal',
    label: 'TERMINAL',
    description: 'System console',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 5.5C4 4.672 4.672 4 5.5 4h13C19.328 4 20 4.672 20 5.5v13c0 .828-.672 1.5-1.5 1.5h-13C4.672 20 4 19.328 4 18.5v-13Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m8 9 3 3-3 3M13 15h3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    id: 'profile',
    label: 'PROFILE',
    description: 'Identity data',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          cx="12"
          cy="8"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.5 19c.8-3.1 3.1-5 6.5-5s5.7 1.9 6.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    id: 'skills',
    label: 'SKILLS',
    description: 'Technical modules',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 17.5 8.5 13 12 16.5 19.5 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9h3.5v3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    id: 'projects',
    label: 'PROJECTS',
    description: 'Selected works',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4.5 6.5h6l1.7 2h7.3v9.8c0 .66-.54 1.2-1.2 1.2H5.7c-.66 0-1.2-.54-1.2-1.2V6.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 10h15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },

  {
    id: 'contacts',
    label: 'CONTACTS',
    description: 'Communication links',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="m6.5 8 5.5 4 5.5-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigate = (screen: MobileMenuScreen) => {
    closeMenu();

    if (screen === currentScreen) return;

    onNavigate(screen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative md:hidden">
      {/* Burger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className={`
          group
          relative
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          transition-all
          duration-300
          cyber-border
          ${
            isOpen
              ? 'border-[#A020F0] bg-[#A020F0]/15 text-[#A020F0] cyber-text-glow'
              : 'text-[#00E0FF] hover:bg-[#A020F0]/10'
          }
        `}
      >
        <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#00E0FF]/5" />

        <span className="relative flex flex-col gap-[4px]">
          <span
            className={`block h-[1.5px] w-4 bg-current transition-all duration-300 ${
              isOpen ? 'translate-y-[5.5px] rotate-45' : ''
            }`}
          />

          <span
            className={`block h-[1.5px] w-4 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />

          <span
            className={`block h-[1.5px] w-4 bg-current transition-all duration-300 ${
              isOpen ? '-translate-y-[5.5px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Menu panel */}
            <motion.div
              className="
                fixed
                right-3
                top-[4.25rem]
                z-[80]
                w-[min(88vw,360px)]
                overflow-hidden
                rounded-xl
                border
                border-[#A020F0]/50
                bg-[#09090f]/95
                shadow-[0_0_30px_rgba(160,32,240,0.18)]
                backdrop-blur-xl
              "
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.96,
                transformOrigin: 'top right',
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.97,
              }}
              transition={{
                duration: 0.22,
                ease: 'easeOut',
              }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Top line */}
              <div className="relative px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="jetbrains text-[10px] uppercase tracking-[0.28em] text-[#00E0FF]/60">
                      SYSTEM MENU
                    </div>

                    <div className="mt-1 orbitron text-sm tracking-[0.18em] text-[#A020F0] cyber-text-glow">
                      NAVIGATION
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00E0FF] shadow-[0_0_8px_#00E0FF]" />
                    <span className="jetbrains text-[9px] uppercase tracking-widest text-[#00E0FF]/70">
                      ONLINE
                    </span>
                  </div>
                </div>

                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#A020F0]/60 via-[#00E0FF]/20 to-transparent" />
              </div>

              {/* Navigation */}
              <nav className="px-3 pb-3">
                <div className="space-y-1.5">
                  {menuItems.map((item, index) => {
                    const isActive = item.id === currentScreen;

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
                          rounded-lg
                          border
                          px-3
                          py-3
                          text-left
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? 'border-[#A020F0]/60 bg-[#A020F0]/10'
                              : 'border-transparent hover:border-[#00E0FF]/20 hover:bg-[#00E0FF]/5'
                          }
                        `}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.03 * index,
                          duration: 0.2,
                        }}
                      >
                        {/* Active indicator */}
                        <div
                          className={`
                            absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2
                            transition-all duration-300
                            ${
                              isActive
                                ? 'bg-[#A020F0] shadow-[0_0_10px_#A020F0]'
                                : 'bg-transparent'
                            }
                          `}
                        />

                        {/* Hover glow */}
                        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#A020F0]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div
                          className={`
                            relative z-10
                            flex h-9 w-9 shrink-0 items-center justify-center rounded-md border
                            transition-all duration-300
                            ${
                              isActive
                                ? 'border-[#A020F0]/40 bg-[#A020F0]/10 text-[#A020F0] shadow-[0_0_12px_rgba(160,32,240,0.12)]'
                                : 'border-[#00E0FF]/15 bg-[#00E0FF]/5 text-[#00E0FF]/80 group-hover:border-[#00E0FF]/30 group-hover:text-[#00E0FF]'
                            }
                          `}
                        >
                          <div className="h-4.5 w-4.5">
                            {item.icon}
                          </div>
                        </div>

                        <div className="relative z-10 min-w-0 flex-1">
                          <div
                            className={`
                              jetbrains text-xs font-bold tracking-[0.12em] transition-colors duration-300
                              ${
                                isActive
                                  ? 'text-[#A020F0] cyber-text-glow'
                                  : 'text-[#00E0FF] group-hover:text-[#A020F0]'
                              }
                            `}
                          >
                            {item.label}
                          </div>

                          <div className="mt-0.5 jetbrains text-[9px] tracking-wide text-gray-500">
                            {item.description}
                          </div>
                        </div>

                        <div
                          className={`
                            relative z-10 text-xs transition-all duration-300
                            ${
                              isActive
                                ? 'translate-x-0 text-[#A020F0]'
                                : '-translate-x-1 text-gray-600 opacity-0 group-hover:translate-x-0 group-hover:text-[#00E0FF] group-hover:opacity-100'
                            }
                          `}
                        >
                          →
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Language */}
              <div className="border-t border-[#A020F0]/15 px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="jetbrains text-[9px] uppercase tracking-[0.2em] text-gray-500">
                    Interface language
                  </span>

                  <span className="jetbrains text-[9px] text-[#00E0FF]/50">
                    LANG
                  </span>
                </div>

                <div className="rounded-lg border border-[#00E0FF]/10 bg-[#00E0FF]/5 p-1">
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Decorative footer */}
              <div className="relative h-5 overflow-hidden border-t border-[#00E0FF]/10">
                <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_5px,#00E0FF_5px,#00E0FF_6px)]" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;