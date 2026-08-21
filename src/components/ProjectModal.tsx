import  { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { getCategoryIcon, getStatusColor } from '../utils/utils';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  // Закрытие по нажатию на клавишу Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cyber-border bg-[#050508] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto cyber-scroll relative flex flex-col"
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#0FF4F8] hover:text-[#FF3366] bg-black/50 rounded-full transition-colors duration-300"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div
          className="relative h-40 md:h-56 shrink-0 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.primaryColor}30, ${project.primaryColor}10)` }}
        >
          <div className="text-8xl opacity-80" style={{ color: project.primaryColor }}>
            {getCategoryIcon(project.category, 'background')}
          </div>
          <div className="absolute bottom-4 left-6">
            <h2 className="orbitron text-2xl md:text-4xl text-white cyber-text-glow">
              {project.title}
            </h2>
            <div className="flex items-center space-x-3 mt-2">
              <span
                className="px-2 py-1 rounded text-xs jetbrains border border-current backdrop-blur-sm"
                style={{ color: getStatusColor(project.status) }}
              >
                {project.status}
              </span>
              <span className="text-xs jetbrains text-[#0FF4F8] bg-black/50 px-2 py-1 rounded">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 flex-1">
          <section>
            <h4 className="orbitron text-[#A020F0] text-lg mb-3">System Description</h4>
            <p className="jetbrains text-sm md:text-base text-[#00E0FF] leading-relaxed">
              {project.detailedDescription}
            </p>
          </section>

          <section>
            <h4 className="orbitron text-[#A020F0] text-lg mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="cyber-border rounded px-3 py-1.5 text-sm jetbrains text-[#0FF4F8] bg-[#0a0a0f] hover:cyber-glow transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h4 className="orbitron text-[#A020F0] text-lg mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-3 jetbrains text-sm md:text-base text-[#00E0FF]">
                  <span className="text-[#0FF4F8] mt-0.5">▸</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="pt-6 border-t border-[#A020F0]/30 flex flex-wrap gap-4">
            <button
              onClick={() => window.open(project.github, '_blank')}
              className="flex items-center space-x-2 cyber-border px-6 py-3 rounded hover:bg-[#A020F0]/20 transition-all duration-300 group"
            >
              <Github size={20} className="text-[#00E0FF] group-hover:text-white transition-colors" />
              <span className="jetbrains text-[#00E0FF] group-hover:text-white transition-colors">View Source</span>
            </button>
            <button
              onClick={() => window.open(project.demo, '_blank')}
              className="flex items-center space-x-2 cyber-border px-6 py-3 rounded hover:bg-[#0FF4F8]/20 transition-all duration-300 group"
            >
              <ExternalLink size={20} className="text-[#0FF4F8] group-hover:text-white transition-colors" />
              <span className="jetbrains text-[#0FF4F8] group-hover:text-white transition-colors">Launch App</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});