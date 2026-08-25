import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Skill } from './types';
import { getIconForCategory } from '../utils/sphereUtils';
import { DEFAULT_SKILLS } from '../data/skills';
import { useSphereAnimation } from './useSphereAnimation';
import { EnergyCore } from './EnergyCore';
import { ScreenHeader } from './ScreenHeader';

export interface SkillsScreenProps {
  skills?: Skill[];
  onBack: () => void;
}

const SkillsScreen: React.FC<SkillsScreenProps> = ({ skills, onBack }) => {
  const safeSkills = useMemo(() => {
    return Array.isArray(skills) && skills.length > 0 ? skills : DEFAULT_SKILLS;
  }, [skills]);

  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Кастомный хук для 3D-анимации, физики и адаптивного радиуса
  const { containerRef, setNodeRef } = useSphereAnimation(safeSkills, hoveredSkill);

  // Переключение выбранного навыка по клику/тапу (для мобильных и клавиатуры)
  const handleSelectSkill = useCallback((skill: Skill) => {
    setHoveredSkill((prev) => (prev?.name === skill.name ? null : skill));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, skill: Skill) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelectSkill(skill);
      }
    },
    [handleSelectSkill]
  );

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#0a0a0f] cyber-grid p-4 md:p-6 z-[100] overflow-hidden flex flex-col">
      <motion.div
        className="w-full h-full max-w-7xl mx-auto flex flex-col gap-3 md:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ХЕДЕР */}
        <ScreenHeader
          onBack={onBack}
          backText="< BACK TO TERMINAL"
          title="SKILLS CORE"
          rightElement={
            <div className="jetbrains text-[#0FF4F8] text-sm">
              Status: <span className="text-[#00ff41] cyber-flicker">ACTIVE</span>
            </div>
          }
        />

        {/* ГЛАВНЫЙ КОНТЕЙНЕР */}
        <div className="flex-1 w-full bg-[#050508] cyber-border rounded-lg relative overflow-hidden flex flex-col">
          
          {/* INFO PANEL (DESKTOP) */}
          <div className="absolute top-6 right-6 z-[200] min-h-[100px] w-56 pointer-events-none hidden md:block">
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0a0a0f]/90 border border-[#A020F0] p-4 rounded shadow-[0_0_15px_#A020F040] backdrop-blur-sm"
              >
                <div
                  className="orbitron text-xl mb-1"
                  style={{
                    color: hoveredSkill.color,
                    textShadow: `0 0 8px ${hoveredSkill.color}`,
                  }}
                >
                  {hoveredSkill.name}
                </div>

                <div className="jetbrains text-sm text-[#0FF4F8] mb-3">
                  {hoveredSkill.category}
                </div>

                <div className="w-full bg-[#050508] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${hoveredSkill.level}%`,
                      backgroundColor: hoveredSkill.color,
                    }}
                  />
                </div>

                <div className="jetbrains text-xs text-right mt-2 text-[#00E0FF]">
                  Proficiency: {hoveredSkill.level}%
                </div>
              </motion.div>
            )}
          </div>

          {/* VIEWPORT СФЕРЫ */}
          <div
            ref={containerRef}
            className="flex-1 w-full relative cursor-grab active:cursor-grabbing overflow-hidden touch-none select-none"
            style={{ perspective: '1200px' }}
            onClick={(e) => {
              if (e.target === containerRef.current) {
                setHoveredSkill(null);
              }
            }}
          >
            <EnergyCore />

            {/* ЭЛЕМЕНТЫ СФЕРЫ */}
            {safeSkills.map((skill) => {
              const Icon = getIconForCategory(skill.category);
              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  ref={(el) => setNodeRef(skill.name, el)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Skill: ${skill.name}, Level: ${skill.level}%`}
                  className={`
                    absolute left-1/2 top-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full 
                    transition-colors duration-200 pointer-events-auto cursor-pointer select-none
                    focus:outline-none focus:ring-2 focus:ring-[#0FF4F8]
                    ${isHovered ? 'bg-[#1a1a24] border border-[#A020F0]' : ''}
                  `}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => handleSelectSkill(skill)}
                  onKeyDown={(e) => handleKeyDown(e, skill)}
                >
                  <div style={{ color: skill.color }}>
                    <Icon size={isHovered ? 26 : 18} />
                  </div>

                  <span
                    className={`
                      jetbrains text-sm md:text-base whitespace-nowrap
                      ${isHovered ? 'opacity-100 font-bold' : 'opacity-80'}
                    `}
                    style={{
                      color: isHovered ? skill.color : '#00E0FF',
                      textShadow: isHovered ? `0 0 10px ${skill.color}` : 'none',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              );
            })}

            {/* ДЕКОРАТИВНЫЕ ОРБИТЫ */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] md:w-[440px] h-[280px] sm:h-[360px] md:h-[440px] rounded-full border border-[#0FF4F8] opacity-40 pointer-events-none transition-all" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[240px] md:w-[300px] h-[180px] sm:h-[240px] md:h-[300px] rounded-full border border-[#A020F0] opacity-40 pointer-events-none transition-all" />
          </div>

          {/* МОБИЛЬНАЯ ИНФО-ПАНЕЛЬ */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[49px] left-0 right-0 p-3 border-t border-[#A020F0]/40 bg-[#0a0a0f]/95 backdrop-blur-md md:hidden z-[200]"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="orbitron font-bold" style={{ color: hoveredSkill.color }}>
                  {hoveredSkill.name}
                </span>
                <span className="jetbrains text-xs text-[#0FF4F8]">
                  {hoveredSkill.category} — {hoveredSkill.level}%
                </span>
              </div>
              <div className="w-full bg-[#050508] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${hoveredSkill.level}%`,
                    backgroundColor: hoveredSkill.color,
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* ФУТЕР */}
          <div className="p-3 md:p-4 border-t border-[#A020F0]/20 flex justify-between items-center jetbrains text-xs text-[#0FF4F8] opacity-70 bg-[#050508] shrink-0 z-[200]">
            <div>Sphere Engine v4.7</div>
            <div>Total Nodes: {safeSkills.length}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsScreen;