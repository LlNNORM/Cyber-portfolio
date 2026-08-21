import { memo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Star } from 'lucide-react';
import type { Project } from '../data/projects';
import { getCategoryIcon, getStatusColor } from '../utils/utils';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export const ProjectCard = memo(({ project, onOpen, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="cyber-border rounded-lg bg-[#050508] overflow-hidden cursor-pointer hover:cyber-glow transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => onOpen(project)}
    >
      <div
        className="relative h-48 overflow-hidden shrink-0"
        style={{ background: `linear-gradient(135deg, ${project.primaryColor}20, ${project.primaryColor}40)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-6xl" style={{ color: project.primaryColor }}>
            {getCategoryIcon(project.category, 'background')}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div
            className="px-2 py-1 rounded text-xs jetbrains cyber-border backdrop-blur-sm"
            style={{ color: getStatusColor(project.status) }}
          >
            {project.status}
          </div>
        </div>
        <div className="absolute bottom-2 left-4 right-2 bg-black/50 p-1 rounded">
          <div className="flex items-center space-x-2 mb-1">
            {getCategoryIcon(project.category, 'label')}
            <span className="text-xs jetbrains text-[#0FF4F8]">{project.category}</span>
          </div>
          <h3 className="orbitron text-xl text-white cyber-text-glow truncate">{project.title}</h3>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="jetbrains text-sm text-[#00E0FF] leading-relaxed line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        <div className="space-y-4 shrink-0">
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech} className="cyber-border rounded px-2 py-1 text-xs jetbrains text-[#0FF4F8] bg-[#0a0a0f]">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs jetbrains text-[#A020F0] px-2 py-1">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#A020F0]/30 pt-4">
            <div className="flex items-center space-x-4 jetbrains text-xs">
              <div className="flex items-center space-x-1 text-[#A020F0]">
                <Star size={12} />
                <span>{project.stars}</span>
              </div>
              <div className="flex items-center space-x-1 text-[#00E0FF]">
                <Eye size={12} />
                <span>{project.views}</span>
              </div>
            </div>

            <span className="jetbrains text-xs text-[#0FF4F8] uppercase animate-pulse">
              Open details {'>'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});