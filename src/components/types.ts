export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  tech: string[];
  github: string;
  demo: string;
  stars: number;
  views: number;
  status: ProjectStatus;
  category: ProjectCategory;
  year: string;
  features: string[];
  primaryColor: string;
}

export type ProjectCategory =
  | 'Web Application'
  | 'Social Platform'
  | 'Gallery'
  | 'Analytics'
  | 'AI Tools'
  | 'Blockchain';

export type ProjectStatus = 'Production' | 'Beta' | 'Complete' | 'Development';
