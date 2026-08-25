import type { Project, ProjectCategory } from '../types/projects';

export const projects: Project[] = [
  {
    id: 1,
    translationKey: 'projects.items.1',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/LlNNORM/zakrivayuschiy-teg-f',
    demo: 'https://llnnorm.github.io/zakrivayuschiy-teg-f/',
    stars: 0,
    views: 0,
    status: 'Complete',
    category: 'Landing',
    year: '2024',
    primaryColor: '#FF6B35'
  },
  {
    id: 2,
    translationKey: 'projects.items.2',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC', 'Prisma'],
    github: 'https://github.com/LlNNORM/skillswap',
    demo: 'https://skillswap-platform.vercel.app',
    stars: 63,
    views: 428,
    status: 'Beta',
    category: 'Social Platform',
    year: '2024',
    primaryColor: '#00D9FF'
  },
  {
    id: 3,
    translationKey: 'projects.items.3',
    tech: ['React', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Redis'],
    github: 'https://github.com/LlNNORM/mesto-project',
    demo: 'https://mesto-gallery.herokuapp.com',
    stars: 85,
    views: 567,
    status: 'Complete',
    category: 'Gallery',
    year: '2023',
    primaryColor: '#A020F0'
  },
  {
    id: 4,
    translationKey: 'projects.items.4',
    tech: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/LlNNORM/cyber-dash',
    demo: 'https://cyberdash-analytics.netlify.app',
    stars: 92,
    views: 743,
    status: 'Production',
    category: 'Analytics',
    year: '2024',
    primaryColor: '#00FF88'
  },
  {
    id: 5,
    translationKey: 'projects.items.5',
    tech: ['Python', 'TensorFlow', 'React', 'Flask', 'Docker', 'OpenAI API'],
    github: 'https://github.com/LlNNORM/posmotri_v_okno',
    demo: 'https://llnnorm.github.io/posmotri_v_okno/',
    stars: 156,
    views: 892,
    status: 'Development',
    category: 'AI Tools',
    year: '2024',
    primaryColor: '#FF3366'
  },
  {
    id: 6,
    translationKey: 'projects.items.6',
    tech: ['Svelte', 'Web3.js', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/LlNNORM/ono-tebe-nado',
    demo: 'https://llnnorm.github.io/ono-tebe-nado',
    stars: 73,
    views: 445,
    status: 'Complete',
    category: 'Landing',
    year: '2024',
    primaryColor: '#FFD700'
  }
];

export const categories: ProjectCategory[] = [
  'All',
  'Web Application',
  'Social Platform',
  'Gallery',
  'Analytics',
  'AI Tools',
  'Landing',
  'Blockchain'
];