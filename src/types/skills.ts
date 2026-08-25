export type SkillCategory =
  | 'Programming'
  | 'Frontend'
  | 'Backend'
  | 'State Management'
  | 'Database'
  | 'DevOps'
  | 'Styling'
  | 'Build Tools'
  | 'Testing'
  | 'API'
  | 'Framework'
  | 'Animation'
  | 'Real-time'
  | '3D Graphics'
  | 'Cloud'
  | 'Cyber';

export interface Skill {
  name: string;
  level: number;
  color: string;
  category: SkillCategory | string;
}

export interface LightningBranch {
  path: string;
  opacity: number;
  width: number;
}