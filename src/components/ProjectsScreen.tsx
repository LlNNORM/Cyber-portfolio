import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { projects, categories } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface ProjectsScreenProps {
  onBack: () => void;
}

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      filterCategory === 'All' || project.category === filterCategory
    );
  }, [filterCategory]);

  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="bg-[#0a0a0f] p-4 md:p-8 flex flex-col h-screen overflow-y-auto overflow-x-hidden cyber-scroll relative">
      <motion.div
        className="max-w-7xl mx-auto h-full w-full flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={onBack}
            className="cyber-border rounded-lg px-4 py-2 jetbrains text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
          >
            {'< BACK TO TERMINAL'}
          </button>
          <h1 className="orbitron text-2xl md:text-4xl text-[#A020F0] cyber-text-glow tracking-wider">
            PROJECT ARCHIVE
          </h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#0FF4F8]" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="cyber-border rounded px-3 py-1 bg-[#050508] text-[#00E0FF] jetbrains text-sm outline-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="jetbrains text-[#0FF4F8] text-sm">
              Projects: <span className="text-[#00E0FF]">{filteredProjects.length}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 w-full h-full pb-8">
          {filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="cyber-border rounded-lg p-8 text-center bg-[#050508]">
                <p className="orbitron text-2xl text-[#A020F0] cyber-text-glow">NO PROJECTS FOUND</p>
                <p className="jetbrains text-[#00E0FF] mt-2">Try changing the filter</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={handleOpenProject}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsScreen;