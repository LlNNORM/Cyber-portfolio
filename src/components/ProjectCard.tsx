import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, Eye } from 'lucide-react';
import type { Project } from './types';
import { getStatusColor, getCategoryIcon } from '../utils/utils';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isSelected,
  onSelect,
}) => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
  return (
    <motion.div
      key={project.id}
      className={`cyber-border rounded-lg bg-[#050508] overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'cyber-glow scale-105' : 'hover:cyber-glow'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => onSelect(project.id)}
    >
      <div 
        className="relative h-48 overflow-hidden"
        style={{
            background: `linear-gradient(135deg, ${project.primaryColor}20, ${project.primaryColor}40)`
        }}
        >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div 
            className="text-6xl opacity-50"
            style={{ color: project.primaryColor }}
            >
            {getCategoryIcon(project.category)}
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
        
        <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 mb-2">
            {getCategoryIcon(project.category)}
            <span className="text-xs jetbrains text-[#0FF4F8]">
                {project.category}
            </span>
            </div>
            <h3 className="orbitron text-xl text-white cyber-text-glow">
            {project.title}
            </h3>
        </div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4">
        <p className="jetbrains text-sm text-[#00E0FF] leading-relaxed">
            {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tech) => (
            <span
                key={tech}
                className="cyber-border rounded px-2 py-1 text-xs jetbrains text-[#0FF4F8] bg-[#0a0a0f]"
            >
                {tech}
            </span>
            ))}
            {project.tech.length > 4 && (
            <span className="text-xs jetbrains text-[#A020F0] px-2 py-1">
                +{project.tech.length - 4}
            </span>
            )}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
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
            
            <div className="flex space-x-2">
            <button 
                onClick={(e) => {
                e.stopPropagation();
                window.open(project.github, '_blank');
                }}
                className="cyber-border rounded p-2 hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
            >
                <Github size={16} className="text-[#00E0FF]" />
            </button>
            <button 
                onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo, '_blank');
                }}
                className="cyber-border rounded p-2 hover:bg-[#0FF4F8] hover:bg-opacity-20 transition-all duration-300"
            >
                <ExternalLink size={16} className="text-[#0FF4F8]" />
            </button>
            </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
            {selectedProject === project.id && (
            <motion.div
                className="pt-4 border-t border-[#A020F0] border-opacity-30 space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Detailed Description */}
                <div>
                <h4 className="orbitron text-[#A020F0] mb-2">About Project</h4>
                <p className="jetbrains text-sm text-[#00E0FF] leading-relaxed">
                    {project.detailedDescription}
                </p>
                </div>

                {/* Full Tech Stack */}
                <div>
                <h4 className="orbitron text-[#A020F0] mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                    <span
                        key={tech}
                        className="cyber-border rounded-full px-3 py-1 text-xs jetbrains text-[#0FF4F8] bg-[#0a0a0f]"
                    >
                        {tech}
                    </span>
                    ))}
                </div>
                </div>

                {/* Key Features */}
                <div>
                <h4 className="orbitron text-[#A020F0] mb-2">Key Features</h4>
                <ul className="space-y-1">
                    {project.features.map((feature, i) => (
                    <li
                        key={i}
                        className="flex items-start space-x-2 jetbrains text-sm text-[#00E0FF]"
                    >
                        <span className="text-[#0FF4F8] mt-1">▸</span>
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 jetbrains text-sm">
                <div>
                    <span className="text-[#0FF4F8]">Year:</span>
                    <span className="text-[#00E0FF] ml-2">{project.year}</span>
                </div>
                <div>
                    <span className="text-[#0FF4F8]">Status:</span>
                    <span className="text-[#00E0FF] ml-2">{project.status}</span>
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    </motion.div>
  );
};

export default ProjectCard;
