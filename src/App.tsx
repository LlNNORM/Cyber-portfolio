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


type Screen = 'boot' | 'terminal' | 'profile' |'skills'| 'projects' | 'contacts';

export function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('boot');
  const [isGlitching, setIsGlitching] = useState(false);
  const skills = []
  // Force dark mode for cyberpunk theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleScreenChange = (newScreen: Screen) => {
    if (newScreen === currentScreen) return;
    
    // Add glitch effect during transition
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentScreen(newScreen);
      setIsGlitching(false);
    }, 200);
  };

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

const glitchVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px)',
    filter: 'none',
  },
  glitch: {
    // Move keyframes to the variant's main body
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
      ease: 'easeInOut', // Valid easing string
      times: [0, 0.2, 0.4, 0.6], // Match the number of keyframes
      repeat: Infinity, // Continuous glitch effect
    },
  },
};

  return (
    <div className="relative w-full h-screen bg-[#050508] overflow-hidden">
      {/* Language switcher - visible on all screens except boot */}
      {currentScreen !== 'boot' && (
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
      )}
      {/* Global glitch overlay */}
      {isGlitching && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-[#A020F0] opacity-10 animate-pulse"></div>
          <div className="absolute inset-0 bg-[#00E0FF] opacity-5 animate-ping"></div>
        </div>
      )}

      <motion.div
        className="w-full h-full"
        variants={glitchVariants}
        animate={isGlitching ? 'glitch' : 'normal'}
      >
        <AnimatePresence mode="wait">
          {currentScreen === 'boot' && (
            <motion.div
              key="boot"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <BootScreen onComplete={() => handleScreenChange('terminal')} />
            </motion.div>
          )}

          {currentScreen === 'terminal' && (
            <motion.div
              key="terminal"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <TerminalScreen onNavigate={handleScreenChange} />
            </motion.div>
          )}

          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProfileScreen onBack={() => handleScreenChange('terminal')} />
            </motion.div>
          )}

          {currentScreen === 'skills' && (
            <motion.div
              key="skills"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* <SkillsScreen onBack={() => handleScreenChange('terminal')}  skills={ skills} /> */}
            </motion.div>
          )}

          {currentScreen === 'projects' && (
            <motion.div
              key="projects"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProjectsScreen onBack={() => handleScreenChange('terminal')} />
            </motion.div>
          )}

          {currentScreen === 'contacts' && (
            <motion.div
              key="contacts"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ContactsScreen onBack={() => handleScreenChange('terminal')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

{/* Debug navigation (remove in production) */}
      {/* {(
        <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
          {(['boot', 'terminal', 'profile', 'projects', 'contacts'] as Screen[]).map((screen) => (
            <button
              key={screen}
              onClick={() => handleScreenChange(screen)}
              className={`px-2 py-1 text-xs rounded jetbrains transition-all duration-300 ${
                currentScreen === screen
                  ? 'bg-[#A020F0] text-white'
                  : 'bg-[#050508] text-[#00E0FF] border border-[#A020F0]'
              }`}
            >
              {screen}
            </button>
          ))}
        </div>
      )} */}
      
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