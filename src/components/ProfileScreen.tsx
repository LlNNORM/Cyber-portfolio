import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/dragon-logo.svg?react';
import profileImg from '../assets/profile.webp';
import profileImg3 from '../assets/profile3.webp';
import { useLanguage } from './LanguageContext';
import { ScreenHeader } from './ScreenHeader';

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const stats = [
    { key: "exp", value: "1+", icon: "⚡" },
    { key: "projects", value: "10+", icon: "🚀" },
    { key: "coffee", value: "999+", icon: "☕" },
    { key: "bugs", value: "999+", icon: "🐛" }
  ];

  const achievements = [
    { key: "react", icon: "⚛️", color: "#0FF4F8" },
    { key: "ts", icon: "🔷", color: "#00E0FF" },
    { key: "perf", icon: "⚡", color: "#FFD700" },
    { key: "uiux", icon: "🎨", color: "#A020F0" },
    { key: "solver", icon: "🧠", color: "#00ff41" },
    { key: "team", icon: "🤝", color: "#FF6B35" }
  ];

  return (
    <div className="h-screen w-full  bg-[#0a0a0f] cyber-grid p-4 md:p-8 overflow-y-auto overflow-x-hidden cyber-scroll" >
      
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
          rightElement={
            <div className="jetbrains text-[#0FF4F8] text-sm">
              {t('profile.status')}:{' '}
              <span className="text-[#00ff41] cyber-flicker">
                {t('profile.online')}
              </span>
            </div>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Avatar & Stats */}
          <img className="cyber-border rounded-lg" src={profileImg} alt="Profile" />

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Avatar Section */}
            <div className="cyber-border rounded-lg bg-[#050508] p-6 flex flex-col items-center space-y-6">
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 cyber-border rounded-full bg-gradient-to-br from-[#A020F0] to-[#00E0FF] p-2">
                  <div className="w-full h-full bg-[#050508] rounded-full flex items-center justify-center relative">
                    <Logo width={110} height={110} className="glowing-logo" />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="w-full space-y-3 jetbrains text-center">
                <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow">
                  {t("profile.name")}
                </h2>
                <div className="text-[#00E0FF]">{t("profile.role")}</div>
                <div className="text-[#0FF4F8] text-sm">{t("profile.location")}</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  className="cyber-border rounded bg-[#050508] p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <div className="text-2xl mt-2">{stat.icon}</div>
                  <div className="jetbrains text-lg text-[#00E0FF] cyber-text-glow">{stat.value}</div>
                  <div className="jetbrains text-xs text-[#0FF4F8]">{t(`profile.stats.${stat.key}`)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column - Image / Skills */}
          <img className="cyber-border rounded-lg" src={profileImg3} alt="Profile secondary" />
        </div>

        {/* Bottom Section - Achievements */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="cyber-border rounded-lg bg-[#050508] p-6">
            <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow mb-4 tracking-wider">
              {t("profile.achievements")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((a, index) => (
                <motion.div
                  key={a.key}
                  className="cyber-border rounded bg-[#0a0a0f] p-3 text-center hover:cyber-glow transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}                // <- явно задаём scale в обычном состоянии
                  whileHover={{ scale: 1.05 }}                             // <- hover-цель
                  transition={{
                    // Появление — с задержкой
                    opacity: {  delay: 1.2 + index * 0.1, duration: 0.3 },
                    y:       {  delay: 1.2 + index * 0.1, duration: 0.3 },
                    // Hover in/out для scale — быстро и БЕЗ задержки
                    scale:   { duration: 0.12 }
                  }}
                >
                  <div className="text-2xl mb-2">{a.icon}</div>
                  <div 
                    className="jetbrains text-sm cyber-text-glow mb-1"
                    style={{ color: a.color }}
                  >
                    {t(`profile.achievements_list.${a.key}.title`)}
                  </div>
                  <div className="jetbrains text-xs text-[#0FF4F8] opacity-80">
                    {t(`profile.achievements_list.${a.key}.description`)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileScreen;
