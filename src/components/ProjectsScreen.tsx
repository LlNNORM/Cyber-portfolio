import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Star, 
  Eye, 
  Filter, 
  Calendar,
  Users,
  Code,
  Globe,
  Palette,
  Zap,
  Terminal,
  Layers
} from 'lucide-react';

interface ProjectsScreenProps {
  onBack: () => void;
}

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  tech: string[];
  github: string;
  demo: string;
  stars: number;
  views: number;
  status: string;
  category: string;
  year: string;
  features: string[];
  primaryColor: string;
}

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Stellar Burger',
      description: 'Интерактивный конструктор космических бургеров с drag-and-drop интерфейсом',
      detailedDescription: 'Полнофункциональное React приложение для создания и заказа космических бургеров. Реализован современный UI/UX с использованием Redux для управления состоянием, React DnD для интерактивного перетаскивания ингредиентов.',
      tech: ['React', 'Redux Toolkit', 'TypeScript', 'React DnD', 'WebSocket', 'Jest'],
      github: 'https://github.com/LlNNORM/stellar-burger',
      demo: 'https://stellar-burger-demo.vercel.app',
      stars: 47,
      views: 312,
      status: 'Production',
      category: 'Web Application',
      year: '2024',
      features: [
        'Drag & Drop конструктор бургеров',
        'Авторизация и регистрация пользователей',
        'История заказов в реальном времени',
        'Адаптивный дизайн для всех устройств',
        'Интеграция с API для заказов'
      ],
      primaryColor: '#FF6B35'
    },
    {
      id: 2,
      title: 'SkillSwap Platform',
      description: 'Социальная платформа для обмена навыками между разработчиками',
      detailedDescription: 'Комплексная социальная платформа, объединяющая разработчиков для взаимного обучения и обмена навыками. Включает систему матчинга, видеозвонки, чат и систему рейтингов.',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC', 'Prisma'],
      github: 'https://github.com/LlNNORM/skillswap',
      demo: 'https://skillswap-platform.vercel.app',
      stars: 63,
      views: 428,
      status: 'Beta',
      category: 'Social Platform',
      year: '2024',
      features: [
        'Интеллектуальный матчинг пользователей',
        'Видеозвонки и экранная демонстрация',
        'Система рейтингов и отзывов',
        'Геймификация с достижениями',
        'Планировщик сессий обучения'
      ],
      primaryColor: '#00D9FF'
    },
    {
      id: 3,
      title: 'MestoProject Gallery',
      description: 'Интерактивная фотогалерея с социальными функциями',
      detailedDescription: 'Современная фотогалерея с функциями социальной сети. Пользователи могут загружать фотографии, ставить лайки, комментировать и создавать коллекции.',
      tech: ['React', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Redis'],
      github: 'https://github.com/LlNNORM/mesto-project',
      demo: 'https://mesto-gallery.herokuapp.com',
      stars: 85,
      views: 567,
      status: 'Complete',
      category: 'Gallery',
      year: '2023',
      features: [
        'Загрузка и оптимизация изображений',
        'Система лайков и комментариев',
        'Создание и управление коллекциями',
        'Продвинутый поиск и фильтрация',
        'Responsive галерея с lazy loading'
      ],
      primaryColor: '#A020F0'
    },
    {
      id: 4,
      title: 'CyberDash Analytics',
      description: 'Real-time дашборд для мониторинга и аналитики данных',
      detailedDescription: 'Продвинутая система аналитики с real-time визуализацией данных. Включает настраиваемые виджеты, интерактивные графики, систему алертов и экспорт отчетов.',
      tech: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'FastAPI', 'PostgreSQL'],
      github: 'https://github.com/LlNNORM/cyber-dash',
      demo: 'https://cyberdash-analytics.netlify.app',
      stars: 92,
      views: 743,
      status: 'Production',
      category: 'Analytics',
      year: '2024',
      features: [
        'Real-time визуализация данных',
        'Настраиваемые интерактивные дашборды',
        'Система умных алертов',
        'Экспорт в PDF/Excel',
        'API для интеграции с внешними системами'
      ],
      primaryColor: '#00FF88'
    },
    {
      id: 5,
      title: 'Neural Code Assistant',
      description: 'AI-помощник для анализа и оптимизации кода',
      detailedDescription: 'Интеллектуальный инструмент для анализа кода с использованием машинного обучения. Предоставляет рекомендации по оптимизации, находит потенциальные баги.',
      tech: ['Python', 'TensorFlow', 'React', 'Flask', 'Docker', 'OpenAI API'],
      github: 'https://github.com/LlNNORM/neural-code-assistant',
      demo: 'https://neural-code-assistant.vercel.app',
      stars: 156,
      views: 892,
      status: 'Development',
      category: 'AI Tools',
      year: '2024',
      features: [
        'Анализ качества кода с ML',
        'Автоматическое обнаружение багов',
        'Предложения по рефакторингу',
        'Генерация документации',
        'Интеграция с VS Code'
      ],
      primaryColor: '#FF3366'
    },
    {
      id: 6,
      title: 'BlockChain Tracker',
      description: 'Система мониторинга и анализа блокчейн транзакций',
      detailedDescription: 'Комплексная система для отслеживания и анализа блокчейн транзакций в реальном времени. Поддерживает множественные сети и предоставляет детальную аналитику.',
      tech: ['Svelte', 'Web3.js', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/LlNNORM/blockchain-tracker',
      demo: 'https://blockchain-tracker-demo.vercel.app',
      stars: 73,
      views: 445,
      status: 'Beta',
      category: 'Blockchain',
      year: '2024',
      features: [
        'Мониторинг множественных блокчейн сетей',
        'Real-time отслеживание транзакций',
        'Детальная аналитика и статистика',
        'Система алертов и уведомлений',
        'Визуализация потоков транзакций'
      ],
      primaryColor: '#FFD700'
    }
  ];

  const categories = ['All', 'Web Application', 'Social Platform', 'Gallery', 'Analytics', 'AI Tools', 'Blockchain'];

  const filteredProjects = projects.filter(project => 
    filterCategory === 'All' || project.category === filterCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production': return '#00ff41';
      case 'Beta': return '#00E0FF';
      case 'Complete': return '#A020F0';
      case 'Development': return '#FF6B35';
      default: return '#0FF4F8';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Application': return <Globe className="w-4 h-4" />;
      case 'Social Platform': return <Users className="w-4 h-4" />;
      case 'Gallery': return <Palette className="w-4 h-4" />;
      case 'Analytics': return <Zap className="w-4 h-4" />;
      case 'AI Tools': return <Terminal className="w-4 h-4" />;
      case 'Blockchain': return <Layers className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] p-4 md:p-8 flex flex-col min-h-screen">
      <div className="scanline"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto h-full flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
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

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#0FF4F8]" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="cyber-border rounded px-3 py-1 bg-[#050508] text-[#00E0FF] jetbrains text-sm outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="jetbrains text-[#0FF4F8] text-sm">
              Projects: <span className="text-[#00E0FF]">{filteredProjects.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`cyber-border rounded-lg bg-[#050508] overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedProject === project.id ? 'cyber-glow scale-105' : 'hover:cyber-glow'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                {/* Project Header */}
                <div 
                  className="relative h-48 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.primaryColor}20, ${project.primaryColor}40)`
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div 
                      className="text-6xl opacity-50"
                      style={{ color: project.primaryColor }}
                    >
                      {getCategoryIcon(project.category)}
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div 
                      className="px-2 py-1 rounded text-xs jetbrains cyber-border backdrop-blur-sm"
                      style={{ color: getStatusColor(project.status) }}
                    >
                      {project.status}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {getCategoryIcon(project.category)}
                      <span className="text-xs jetbrains text-[#0FF4F8]">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="orbitron text-xl text-white cyber-text-glow">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <p className="jetbrains text-sm text-[#00E0FF] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="cyber-border rounded px-2 py-1 text-xs jetbrains text-[#0FF4F8] bg-[#0a0a0f]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs jetbrains text-[#A020F0] px-2 py-1">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 jetbrains text-xs">
                      <div className="flex items-center space-x-1 text-[#A020F0]">
                        <Star size={12} />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[#00E0FF]">
                        <Eye size={12} />
                        <span>{project.views}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                        className="cyber-border rounded p-2 hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
                      >
                        <Github size={16} className="text-[#00E0FF]" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demo, '_blank');
                        }}
                        className="cyber-border rounded p-2 hover:bg-[#0FF4F8] hover:bg-opacity-20 transition-all duration-300"
                      >
                        <ExternalLink size={16} className="text-[#0FF4F8]" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        className="pt-4 border-t border-[#A020F0] border-opacity-30 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Detailed Description */}
                        <div>
                          <h4 className="orbitron text-[#A020F0] mb-2">About Project</h4>
                          <p className="jetbrains text-sm text-[#00E0FF] leading-relaxed">
                            {project.detailedDescription}
                          </p>
                        </div>

                        {/* Full Tech Stack */}
                        <div>
                          <h4 className="orbitron text-[#A020F0] mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="cyber-border rounded-full px-3 py-1 text-xs jetbrains text-[#0FF4F8] bg-[#0a0a0f]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h4 className="orbitron text-[#A020F0] mb-2">Key Features</h4>
                          <ul className="space-y-1">
                            {project.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start space-x-2 jetbrains text-sm text-[#00E0FF]"
                              >
                                <span className="text-[#0FF4F8] mt-1">▸</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Project Info */}
                        <div className="grid grid-cols-2 gap-4 jetbrains text-sm">
                          <div>
                            <span className="text-[#0FF4F8]">Year:</span>
                            <span className="text-[#00E0FF] ml-2">{project.year}</span>
                          </div>
                          <div>
                            <span className="text-[#0FF4F8]">Status:</span>
                            <span className="text-[#00E0FF] ml-2">{project.status}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsScreen;