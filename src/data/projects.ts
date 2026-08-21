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
  | 'Landing'
  | 'Blockchain';

export type ProjectStatus = 'Production' | 'Beta' | 'Complete' | 'Development';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Закрывающий тег',
    description: 'Рефлексивный дневник-тренажёр для начинающих веб-разработчиков, посвящённый эмоциональным и психологическим этапам обучения вёрстке.',
    detailedDescription: 'Сайт структурирован как хроника обучения вёрстке, разбитая на тематические блоки — от «нулевого спринта» до финальной точки. Каждый раздел описывает типичные состояния новичка. В конце каждого блока находится приглашение «Место для ваших воспоминаний о начале обучения», превращающее страницу в интерактивный журнал личного опыта.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/LlNNORM/zakrivayuschiy-teg-f',
    demo: 'https://llnnorm.github.io/zakrivayuschiy-teg-f/',
    stars: 0,
    views: 0,
    status: 'Complete',
    category: 'Landing',
    year: '2024',
    features: [
      'Тематическая навигация по спринтам — от подготовки до текущего момента',
      'Рефлексивные триггеры — описание типичных эмоций и состояний',
      'Интерактивные поля — места для личных записей',
      'Мотивационный нарратив',
      'Философское завершение'
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
    title: 'Multuverse Window',
    description: 'AI-помощник для анализа и оптимизации кода',
    detailedDescription: 'Интеллектуальный инструмент для анализа кода с использованием машинного обучения. Предоставляет рекомендации по оптимизации, находит потенциальные баги.',
    tech: ['Python', 'TensorFlow', 'React', 'Flask', 'Docker', 'OpenAI API'],
    github: 'https://github.com/LlNNORM/posmotri_v_okno',
    demo: 'https://llnnorm.github.io/posmotri_v_okno/',
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
    github: 'https://github.com/LlNNORM/ono-tebe-nado',
    demo: 'https://llnnorm.github.io/ono-tebe-nado',
    stars: 73,
    views: 445,
    status: 'Complete',
    category: 'Landing',
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

export const categories = ['All', 'Web Application', 'Social Platform', 'Gallery', 'Analytics', 'AI Tools', 'Blockchain'];