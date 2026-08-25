import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import type { Project } from '../types/projects';
import { getCategoryIcon, getStatusColor } from '../utils/utils';
import { useLanguage } from './LanguageContext';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  const { t } = useLanguage();

  const title = t(`${project.translationKey}.title`);
  const detailedDescription = t(`${project.translationKey}.detailedDescription`);
  const features = (t(`${project.translationKey}.features`) as unknown as string[]) || [];

  const statusLabel = t(`projects.statuses.${project.status}`);
  const categoryLabel = t(`projects.categories.${project.category}`);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: [1, 1, 0],
        transition: { duration: 1.3, times: [0, 0.85, 1], ease: 'easeOut' }
      }}
      onClick={onClose}
    >
      {/* Окно модалки с эффектом ЭЛТ и однородной светящейся точкой при схлопывании */}
      <motion.div
        className="cyber-border bg-[#050508] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto cyber-scroll relative flex flex-col origin-center"
        initial={{ y: 30, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{
          scaleX: [1, 1.05, 0.012, 0.012, 0],
          scaleY: [1, 0.004, 0.012, 0.012, 0],
          borderRadius: ['12px', '4px', '50%', '50%', '50%'],
          backgroundColor: ['#050508', '#050508', '#00E0FF', '#00E0FF', '#00E0FF'],
          opacity: [1, 1, 1, 0.7, 0],
          filter: [
            'brightness(1) contrast(100%) blur(0px)',
            'brightness(2.5) contrast(200%) blur(0.5px)',
            'brightness(6) contrast(200%) blur(0px)',
            'brightness(3) contrast(150%) blur(2px)',
            'brightness(0) contrast(100%) blur(8px)'
          ],
          boxShadow: [
            '0 0 15px rgba(15, 244, 248, 0.2)',
            '0 0 40px rgba(255, 255, 255, 0.9), 0 0 80px rgba(15, 244, 248, 0.8)',
            '0 0 50px #00E0FF, 0 0 100px #00E0FF',
            '0 0 30px #00E0FF, 0 0 60px #00E0FF',
            '0 0 0px rgba(0,0,0,0)'
          ],
          transition: {
            duration: 1.25,
            times: [0, 0.28, 0.48, 0.8, 1],
            ease: 'easeInOut'
          }
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#0FF4F8] hover:text-[#FF3366] bg-black/50 rounded-full transition-colors duration-300"
          aria-label={t('modal.close')}
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
              {title}
            </h2>
            <div className="flex items-center space-x-3 mt-2">
              <span
                className="px-2 py-1 rounded text-xs jetbrains border border-current backdrop-blur-sm"
                style={{ color: getStatusColor(project.status) }}
              >
                {statusLabel}
              </span>
              <span className="text-xs jetbrains text-[#0FF4F8] bg-black/50 px-2 py-1 rounded">
                {project.year}
              </span>
              <span className="text-xs jetbrains text-[#00E0FF] bg-black/50 px-2 py-1 rounded">
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 flex-1">
          <section>
            <h4 className="orbitron text-[#A020F0] text-lg mb-3">
              {t('modal.systemDescription')}
            </h4>
            <p className="jetbrains text-sm md:text-base text-[#00E0FF] leading-relaxed">
              {detailedDescription}
            </p>
          </section>

          <section>
            <h4 className="orbitron text-[#A020F0] text-lg mb-3">
              {t('modal.techStack')}
            </h4>
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
            <h4 className="orbitron text-[#A020F0] text-lg mb-3">
              {t('modal.keyFeatures')}
            </h4>
            <ul className="space-y-2">
              {Array.isArray(features) && features.map((feature, i) => (
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
              <span className="jetbrains text-[#00E0FF] group-hover:text-white transition-colors">
                {t('modal.viewSource')}
              </span>
            </button>
            <button
              onClick={() => window.open(project.demo, '_blank')}
              className="flex items-center space-x-2 cyber-border px-6 py-3 rounded hover:bg-[#0FF4F8]/20 transition-all duration-300 group"
            >
              <ExternalLink size={20} className="text-[#0FF4F8] group-hover:text-white transition-colors" />
              <span className="jetbrains text-[#0FF4F8] group-hover:text-white transition-colors">
                {t('modal.launchApp')}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProjectModal.displayName = 'ProjectModal';