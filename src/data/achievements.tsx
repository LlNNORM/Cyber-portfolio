import React from 'react';

import {
  ExperienceIcon,
  ProjectsIcon,
  EnergyIcon,
  BugsIcon,
  ReactIcon,
  TypeScriptIcon,
  PerformanceIcon,
  UIUXIcon,
  SolverIcon,
  TeamIcon,
} from '../components/CyberIcons';

export interface StatItem {
  key: 'exp' | 'projects' | 'coffee' | 'bugs';
  value: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    isHovered?: boolean;
  }>;
}

export interface AchievementItem {
  key: 'react' | 'ts' | 'perf' | 'uiux' | 'solver' | 'team';
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    isHovered?: boolean;
  }>;
  color: string;
}

export const STATS_CONFIG: StatItem[] = [
  {
    key: 'exp',
    value: '1+',
    icon: ExperienceIcon,
  },
  {
    key: 'projects',
    value: '3+',
    icon: ProjectsIcon,
  },
  {
    key: 'coffee',
    value: '999+',
    icon: EnergyIcon,
  },
  {
    key: 'bugs',
    value: '666+',
    icon: BugsIcon,
  },
];

export const ACHIEVEMENTS_CONFIG: AchievementItem[] = [
  {
    key: 'react',
    icon: ReactIcon,
    color: '#61DAFB',
  },
  {
    key: 'ts',
    icon: TypeScriptIcon,
    color: '#3178C6',
  },
  {
    key: 'perf',
    icon: PerformanceIcon,
    color: '#00FF41',
  },
  {
    key: 'uiux',
    icon: UIUXIcon,
    color: '#FF2BD6',
  },
  {
    key: 'solver',
    icon: SolverIcon,
    color: '#A020F0',
  },
  {
    key: 'team',
    icon: TeamIcon,
    color: '#00E0FF',
  },
];