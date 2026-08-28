import type { ReactNode } from 'react';

export interface StatItem {
  key: 'exp' | 'projects' | 'coffee' | 'bugs';
  value: string;
  icon: ReactNode;
}

export interface AchievementItem {
  key: 'react' | 'ts' | 'perf' | 'uiux' | 'solver' | 'team';
  icon: ReactNode;
  color: string;
}