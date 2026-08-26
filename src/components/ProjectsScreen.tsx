import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories } from '../data/projects';
import type { Project, ProjectCategory } from '../types/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { ScreenHeader } from './ScreenHeader';
import { ProjectFilter } from './ProjectFilter';
import { useLanguage } from './LanguageContext';
import type { Screen } from '../types/screens';

interface ProjectsScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onBack, onNavigate }) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) => filterCategory === 'All' || project.category === filterCategory
    );
  }, [filterCategory]);

  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="bg-[#0a0a0f] p-4 md:p-8 flex flex-col h-dvh overflow-hidden relative">
      <motion.div
        className="max-w-7xl mx-auto h-full w-full flex flex-col overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Добавлены px-3 md:px-6 для точной горизонтальной соосности с блоком ниже */}
        <div className="flex-shrink-0 mb-2 px-3 md:px-6">
          <ScreenHeader
            onBack={onBack}
            backText={t('projects.back')}
            title={t('projects.title')}
            currentScreen="projects"
            onNavigate={onNavigate}
            rightElement={
              <ProjectFilter
                categories={categories}
                selectedCategory={filterCategory}
                onSelectCategory={(cat) => setFilterCategory(cat as ProjectCategory)}
                totalProjects={filteredProjects.length}
              />
            }
          />
        </div>

        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden cyber-scroll pt-4 md:pt-6 pb-8 px-3 md:px-6">
          {filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="cyber-border rounded-lg p-8 text-center bg-[#050508]">
                <p className="orbitron text-2xl text-[#A020F0] cyber-text-glow">
                  {t('projects.notFoundTitle')}
                </p>
                <p className="jetbrains text-[#00E0FF] mt-2">
                  {t('projects.notFoundSub')}
                </p>
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