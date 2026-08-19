import { Globe, Users, Palette, Zap, Terminal, Layers, Code } from 'lucide-react';
import type { ProjectCategory, ProjectStatus } from '../components/types';

// 🎨 Цвета статусов
const statusColors: Record<ProjectStatus, string> = {
  Production: '#00ff41',
  Beta: '#00E0FF',
  Complete: '#A020F0',
  Development: '#FF6B35'
};

export const getStatusColor = (status: ProjectStatus) =>
  statusColors[status] ?? '#0FF4F8';

// 🖼️ Иконки категорий
const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  'Web Application': Globe,
  'Social Platform': Users,
  Gallery: Palette,
  Analytics: Zap,
  'AI Tools': Terminal,
  Blockchain: Layers
};

export const getCategoryIcon = (
  category: ProjectCategory,
  className = "w-4 h-4"
) => {
  const Icon = categoryIcons[category] ?? Code;
  return <Icon className={className} />;
};
