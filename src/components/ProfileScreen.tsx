import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/dragon-logo.svg?react';
import profileImg from '../assets/profile.webp';
import profileImg3 from '../assets/profile3.webp';
import { useLanguage } from './LanguageContext';
import { ScreenHeader } from './ScreenHeader';
import { STATS_CONFIG, ACHIEVEMENTS_CONFIG } from '../data/achievements';
import type { Screen } from '../types/screens';
import { useState} from 'react';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onNavigate }) => {
  const { t } = useLanguage();
  const [hoveredAchievement, setHoveredAchievement] =
  useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <div className="h-screen w-full bg-[#0a0a0f] cyber-grid p-4 md:p-8 overflow-y-auto overflow-x-hidden cyber-scroll">
      
      <motion.div 
        className="max-w-7xl mx-auto h-full flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <ScreenHeader
          onBack={onBack}
          backText={t('profile.back')}
          title={t('profile.title')}
          currentScreen="profile"
          onNavigate={onNavigate}
          rightElement={
            <div className="jetbrains text-[#0FF4F8] text-sm hidden sm:block">
              {t('profile.status')}:{' '}
              <span className="text-[#00ff41] cyber-flicker">
                {t('profile.online')}
              </span>
            </div>
          }
        />

        {/* 
          Main Content Grid
          На мобильных - 1 колонка, на больших экранах (xl) - 3 колонки.
        */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 xl:items-stretch">
          
          {/* Left Column - Первое фото */}
          <img 
            className="cyber-border rounded-lg w-full h-full min-h-0" 
            src={profileImg} 
            alt="Profile" 
          />

          {/* Center Column - Информация и статистика */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Avatar Section */}
            <div className="cyber-border rounded-lg bg-[#050508] p-4 sm:p-5.5 flex flex-col items-center space-y-6">
              <div className="relative w-33 h-33 sm:w-35 sm:h-35 mx-auto">
                <div className="absolute inset-0 cyber-border rounded-full bg-gradient-to-br from-[#A020F0] to-[#00E0FF] p-2">
                  <div className="w-full h-full bg-[#050508] rounded-full flex items-center justify-center relative">
                    <Logo width={90} height={90} className="glowing-logo sm:w-[95px] sm:h-[95px]" />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="w-full space-y-2 sm:space-y-1 jetbrains text-center">
                <h2 className="orbitron text-2xl sm:text-xl text-[#A020F0] cyber-text-glow">
                  {t("profile.name")}
                </h2>
                <div className="text-[#00E0FF] text-xl sm:text-lg cyber-text-glow">{t("profile.role")}</div>
                {/* <div className="text-[#0FF4F8] text-lg sm:text-lg">{t("profile.location")}</div> */}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS_CONFIG.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.key}
                      className="cyber-border rounded bg-[#050508] p-3 sm:p-4 text-center cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{
                        scale: 1.03,
                      }}
                      onMouseEnter={() => setHoveredStat(stat.key)}
                      onMouseLeave={() => setHoveredStat(null)}
                      transition={{
                        delay: 0.1 + index * 0.1,
                        duration: 0.2,
                      }}
                    >
                      <div className="flex justify-center items-center mt-1 sm:mt-2">
                        <Icon
                          size={48}
                          isHovered={hoveredStat === stat.key}
                        />
                      </div>

                      <div className="jetbrains mt-2 sm:mt-1 text-lg sm:text-sm text-[#0FF4F8]">
                        {t(`profile.stats.${stat.key}`)}
                      </div>

                      <div className="jetbrains text-2xl sm:text-lg text-[#00E0FF] cyber-text-glow">
                        {stat.value}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>

          {/* Right Column - Второе фото (Скрыто на мобильных устройствах) */}
          <img 
            className="cyber-border rounded-lg w-full h-full min-h-0 hidden xl:block" 
            src={profileImg3} 
            alt="Profile secondary" 
          />
        </div>

        {/* Bottom Section - Achievements */}
        <motion.div 
          className="mt-6 md:mt-8 pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="cyber-border rounded-lg bg-[#050508] p-4 sm:p-6">
            <h2 className="orbitron text-2xl sm:text-xl text-[#A020F0] cyber-text-glow mb-4 tracking-wider text-center md:text-left">
              {t("profile.achievements")}
            </h2>
            {/* На мобилках 1 колонка, на планшетах 2-3, на десктопе 6 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {ACHIEVEMENTS_CONFIG.map((a, index) => {
                  const Icon = a.icon;

                  return (
                    <motion.div
                      key={a.key}
                      className="cyber-border rounded bg-[#0a0a0f] p-3 text-center hover:cyber-glow transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      onMouseEnter={() => setHoveredAchievement(a.key)}
                      onMouseLeave={() => setHoveredAchievement(null)}
                      transition={{
                        opacity: {
                          delay: 1.2 + index * 0.1,
                          duration: 0.3,
                        },
                        y: {
                          delay: 1.2 + index * 0.1,
                          duration: 0.3,
                        },
                        scale: {
                          duration: 0.12,
                        },
                      }}
                    >
                      <div className="flex justify-center items-center mb-2">
                        <Icon
                          size={48}
                          color={a.color}
                          isHovered={hoveredAchievement === a.key}
                        />
                      </div>

                      <div
                        className="jetbrains text-xl sm:text-sm cyber-text-glow mb-1"
                        style={{ color: a.color }}
                      >
                        {t(`profile.achievements_list.${a.key}.title`)}
                      </div>

                      <div className="jetbrains text-lg sm:text-sm text-[#0FF4F8] opacity-80">
                        {t(`profile.achievements_list.${a.key}.description`)}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileScreen;