import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Database, Settings, Palette, Cpu, Terminal, Zap, Filter } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

interface SkillsSphereProps {
  skills: Skill[];
}

const SkillsSphere: React.FC<SkillsSphereProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming': return <Code className="w-5 h-5" />;
      case 'Frontend': return <Globe className="w-5 h-5" />;
      case 'Backend': return <Database className="w-5 h-5" />;
      case 'DevOps': return <Settings className="w-5 h-5" />;
      case 'Styling': return <Palette className="w-5 h-5" />;
      case '3D Graphics': return <Cpu className="w-5 h-5" />;
      case 'Testing': return <Terminal className="w-5 h-5" />;
      case 'State Management': return <Zap className="w-5 h-5" />;
      case 'Build Tools': return <Settings className="w-5 h-5" />;
      case 'Framework': return <Code className="w-5 h-5" />;
      case 'Animation': return <Palette className="w-5 h-5" />;
      case 'Real-time': return <Zap className="w-5 h-5" />;
      case 'API': return <Database className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];

  // Filter skills by category
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Get skill level status
  const getSkillStatus = (level: number) => {
    if (level >= 90) return { status: 'EXPERT', color: '#00ff41' };
    if (level >= 80) return { status: 'ADVANCED', color: '#00E0FF' };
    if (level >= 70) return { status: 'PROFICIENT', color: '#0FF4F8' };
    return { status: 'INTERMEDIATE', color: '#A020F0' };
  };

  return (
    <div className="w-full h-full cyber-border rounded-lg bg-[#050508] p-6 cyber-grid">
      <div className="scanline"></div>
      
      {/* Header with category filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="orbitron text-2xl text-[#A020F0] cyber-text-glow tracking-wider mb-2">
            SKILL MATRIX v2.1
          </h2>
          <div className="jetbrains text-sm text-[#0FF4F8]">
            Total Skills: <span className="text-[#00E0FF] cyber-text-glow">{filteredSkills.length}</span>
            {selectedCategory !== 'All' && (
              <span className="ml-4">
                Category: <span className="text-[#00E0FF] cyber-text-glow">{selectedCategory}</span>
              </span>
            )}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#A020F0]" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-3 py-1 rounded jetbrains text-xs cyber-border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#A020F0] text-white cyber-glow'
                    : 'bg-[#0a0a0f] text-[#0FF4F8] hover:bg-[#A020F0] hover:bg-opacity-20'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            const skillStatus = getSkillStatus(skill.level);
            const isHovered = hoveredSkill === skill.name;
            
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                className={`cyber-border rounded-lg bg-[#0a0a0f] p-4 cursor-pointer transition-all duration-300 ${
                  isHovered ? 'cyber-glow' : ''
                }`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 0 20px ${skill.color}60`
                }}
              >
                {/* Skill header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div style={{ color: skill.color }}>
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="orbitron text-sm text-[#A020F0] cyber-text-glow">
                        {skill.name}
                      </h3>
                      <div className="jetbrains text-xs text-[#0FF4F8]">
                        {skill.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className="jetbrains text-sm cyber-text-glow"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </div>
                    <div 
                      className="jetbrains text-xs"
                      style={{ color: skillStatus.color }}
                    >
                      {skillStatus.status}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="cyber-border rounded-full bg-[#050508] h-2 overflow-hidden">
                    <motion.div
                      className="h-full relative"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1 + 0.3,
                        ease: "easeOut" 
                      }}
                    >
                      {/* Glow effect */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                          filter: 'blur(2px)',
                          opacity: 0.6
                        }}
                      />
                      {/* Scanning line */}
                      <motion.div
                        className="absolute top-0 right-0 w-1 h-full bg-white opacity-80"
                        animate={{ opacity: [0.8, 0.3, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Additional skill info on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pt-2 border-t border-[#A020F0] border-opacity-30"
                      >
                        <div className="grid grid-cols-2 gap-2 jetbrains text-xs">
                          <div>
                            <span className="text-[#0FF4F8]">Experience:</span>
                            <div className="text-[#00E0FF]">
                              {skill.level >= 90 ? '3+ years' : 
                               skill.level >= 80 ? '2+ years' : 
                               skill.level >= 70 ? '1+ year' : '< 1 year'}
                            </div>
                          </div>
                          <div>
                            <span className="text-[#0FF4F8]">Usage:</span>
                            <div className="text-[#00E0FF]">
                              {skill.level >= 90 ? 'Daily' : 
                               skill.level >= 80 ? 'Regular' : 
                               skill.level >= 70 ? 'Often' : 'Sometimes'}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Statistics summary */}
      <div className="mt-6 pt-4 border-t border-[#A020F0] border-opacity-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="orbitron text-lg text-[#00ff41] cyber-text-glow">
              {skills.filter(s => s.level >= 90).length}
            </div>
            <div className="jetbrains text-xs text-[#0FF4F8]">Expert</div>
          </div>
          <div className="text-center">
            <div className="orbitron text-lg text-[#00E0FF] cyber-text-glow">
              {skills.filter(s => s.level >= 80 && s.level < 90).length}
            </div>
            <div className="jetbrains text-xs text-[#0FF4F8]">Advanced</div>
          </div>
          <div className="text-center">
            <div className="orbitron text-lg text-[#0FF4F8] cyber-text-glow">
              {skills.filter(s => s.level >= 70 && s.level < 80).length}
            </div>
            <div className="jetbrains text-xs text-[#0FF4F8]">Proficient</div>
          </div>
          <div className="text-center">
            <div className="orbitron text-lg text-[#A020F0] cyber-text-glow">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </div>
            <div className="jetbrains text-xs text-[#0FF4F8]">Average</div>
          </div>
        </div>
      </div>

      {/* System info footer */}
      <div className="mt-4 pt-3 border-t border-[#A020F0] border-opacity-20 flex justify-between items-center jetbrains text-xs text-[#0FF4F8] opacity-70">
        <div>Matrix Version: 2.1.0</div>
        <div>Last Updated: 2024</div>
        <div className="text-[#00ff41] cyber-flicker">● SYSTEM ONLINE</div>
      </div>
    </div>
  );
};

export default SkillsSphere;