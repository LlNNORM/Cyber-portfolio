import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

import BootScreen from './components/BootScreen';
import TerminalScreen from './components/TerminalScreen';
import ProfileScreen from './components/ProfileScreen';
import ProjectsScreen from './components/ProjectsScreen';
import ContactsScreen from './components/ContactsScreen';
import SkillsScreen from './components/SkillsScreen';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './components/LanguageContext';

import { DEFAULT_SKILLS } from './data/skills';
import type { Screen } from './types/screens';

export function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('boot');

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const [isGlitching, setIsGlitching] = useState(false);

  /* =========================================================
     RESPONSIVE DEVICE DETECTION
     
     < 1024px  -> mobile / tablet
     >= 1024px -> desktop
  ========================================================= */

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  /* =========================================================
     FORCE DARK MODE
  ========================================================= */

  useEffect(() => {
    document.documentElement.classList.add('dark');

    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  /* =========================================================
     SCREEN NAVIGATION
  ========================================================= */

  const handleScreenChange = (newScreen: Screen) => {
    if (newScreen === currentScreen) {
      return;
    }

    setIsGlitching(true);

    setTimeout(() => {
      setCurrentScreen(newScreen);
      setIsGlitching(false);
    }, 200);
  };

  /* =========================================================
     BOOT COMPLETE
     
     Desktop:
       Boot -> Terminal
     
     Mobile / Tablet:
       Boot -> Profile
  ========================================================= */

  const handleBootComplete = () => {
    const nextScreen: Screen = isMobileOrTablet
      ? 'profile'
      : 'terminal';

    handleScreenChange(nextScreen);
  };

  /* =========================================================
     SCREEN TRANSITIONS
  ========================================================= */

  const screenVariants = {
    enter: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    },

    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },

    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
    },
  };

  /* =========================================================
     GLOBAL GLITCH
  ========================================================= */

  const glitchVariants: Variants = {
    normal: {
      transform: 'translate(0px, 0px)',
      filter: 'none',
    },

    glitch: {
      transform: [
        'translate(0px, 0px)',
        'translate(2px, -2px)',
        'translate(-2px, 2px)',
        'translate(0px, 0px)',
      ],

      filter: [
        'none',
        'hue-rotate(90deg)',
        'none',
        'hue-rotate(-90deg)',
      ],

      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.6],
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="relative w-full h-screen bg-[#050508] overflow-hidden">

      {/* =====================================================
          LANGUAGE SWITCHER
          Desktop / Terminal only
      ===================================================== */}

      {currentScreen === 'terminal' && (
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
      )}

      {/* =====================================================
          GLOBAL GLITCH OVERLAY
      ===================================================== */}

      {isGlitching && (
        <div className="fixed inset-0 z-50 pointer-events-none">

          <div className="absolute inset-0 bg-[#A020F0] opacity-10 animate-pulse" />

          <div className="absolute inset-0 bg-[#00E0FF] opacity-5 animate-ping" />

        </div>
      )}

      {/* =====================================================
          MAIN APPLICATION
      ===================================================== */}

      <motion.div
        className="w-full h-full"
        variants={glitchVariants}
        animate={isGlitching ? 'glitch' : 'normal'}
      >

        <AnimatePresence mode="wait">

          {/* =================================================
              BOOT SCREEN
              ALL DEVICES
          ================================================= */}

          {currentScreen === 'boot' && (
            <motion.div
              key="boot"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <BootScreen
                onComplete={handleBootComplete}
              />
            </motion.div>
          )}

          {/* =================================================
              TERMINAL
              DESKTOP
          ================================================= */}

          {currentScreen === 'terminal' && (
            <motion.div
              key="terminal"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <TerminalScreen
                onNavigate={handleScreenChange}
              />
            </motion.div>
          )}

          {/* =================================================
              PROFILE
              ALL DEVICES
          ================================================= */}

          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <ProfileScreen
                onBack={() =>
                  handleScreenChange('terminal')
                }
                onNavigate={handleScreenChange}
              />
            </motion.div>
          )}

          {/* =================================================
              SKILLS
          ================================================= */}

          {currentScreen === 'skills' && (
            <motion.div
              key="skills"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <SkillsScreen
                onBack={() =>
                  handleScreenChange('terminal')
                }
                onNavigate={handleScreenChange}
                skills={DEFAULT_SKILLS}
              />
            </motion.div>
          )}

          {/* =================================================
              PROJECTS
          ================================================= */}

          {currentScreen === 'projects' && (
            <motion.div
              key="projects"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <ProjectsScreen
                onBack={() =>
                  handleScreenChange('terminal')
                }
                onNavigate={handleScreenChange}
              />
            </motion.div>
          )}

          {/* =================================================
              CONTACTS
          ================================================= */}

          {currentScreen === 'contacts' && (
            <motion.div
              key="contacts"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <ContactsScreen
                onBack={() =>
                  handleScreenChange('terminal')
                }
                onNavigate={handleScreenChange}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}