export type ProjectCategory =
  | 'All'
  | 'Web Application'
  | 'Social Platform'
  | 'Gallery'
  | 'Analytics'
  | 'AI Tools'
  | 'Landing'
  | 'Blockchain';

export type ProjectStatus = 'Production' | 'Beta' | 'Complete' | 'Development';

export interface Project {
  id: number;
  translationKey: string;
  tech: string[];
  github: string;
  demo: string;
  stars: number;
  views: number;
  status: ProjectStatus;
  category: ProjectCategory;
  year: string;
  primaryColor: string;
}