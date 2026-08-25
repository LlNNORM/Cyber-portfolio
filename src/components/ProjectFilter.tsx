import React from 'react';
import { Filter } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ProjectFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalProjects: number;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  totalProjects,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2 sm:gap-1">
      {/* Селект: на мобильных слева, на ПК снизу */}
      <div className="flex items-center space-x-2 order-1 sm:order-2">
        <Filter className="w-4 h-4 text-[#0FF4F8] shrink-0" />
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          aria-label="Фильтр по категориям"
          className="cyber-border rounded px-2.5 py-1 bg-[#050508] text-[#00E0FF] jetbrains text-xs sm:text-sm outline-none cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {t(`projects.categories.${category}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Счётчик: на мобильных справа в ту же строку, на ПК сверху */}
      <div className="jetbrains text-xs text-[#0FF4F8] tracking-wider order-2 sm:order-1 shrink-0">
        {t('projects.total')}:{' '}
        <span className="text-[#00ff41] font-bold cyber-text-glow">
          {totalProjects}
        </span>
      </div>
    </div>
  );
};