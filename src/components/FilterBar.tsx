import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import type { ProjectCategory } from './types';

interface FilterBarProps {
  onBack: () => void;
  categories: (ProjectCategory | 'All')[];
  filterCategory: ProjectCategory | 'All';
  setFilterCategory: (value: ProjectCategory | 'All') => void;
  total: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onBack,
  categories,
  filterCategory,
  setFilterCategory,
  total,
}) => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="cyber-border rounded-lg px-4 py-2 jetbrains text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
        >
          {'< BACK'}
        </button>
        <h1 className="orbitron text-2xl md:text-4xl text-[#A020F0] cyber-text-glow tracking-wider">
          PROJECT ARCHIVE
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#0FF4F8]" />
          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value as ProjectCategory | 'All')
            }
            className="cyber-border rounded px-3 py-1 bg-[#050508] text-[#00E0FF] jetbrains text-sm outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="jetbrains text-[#0FF4F8] text-sm">
          Projects: <span className="text-[#00E0FF]">{total}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
