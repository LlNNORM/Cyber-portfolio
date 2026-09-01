import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";

export type Language = "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Boot Screen
    boot: {
      initializing: "INITIALIZING NEURAL INTERFACE...",
      loading: "Loading core systems",
      establishing: "Establishing quantum link",
      calibrating: "Calibrating neural pathways",
      activating: "Activating cybernetic protocols",
      ready: "SYSTEM READY",
      welcome: "Welcome to the Matrix",
      progressBar_loading: "LOADING...",
    },

    // Terminal Screen
    // 'terminal.welcome': 'Welcome to CYBER-OS Terminal v2.1',
    // 'terminal.type_help': 'Type "help" for available commands',
    // 'terminal.commands': 'Available Commands:',
    // 'terminal.help.profile': 'profile - View neural profile and skills matrix',
    // 'terminal.help.projects': 'projects - Access project portfolio',
    // 'terminal.help.contacts': 'contacts - Display contact information',
    // 'terminal.help.clear': 'clear - Clear terminal output',
    // 'terminal.help.help': 'help - Show this help menu',
    // 'terminal.help.lang': 'lang [en|ru] - Change language',
    // 'terminal.command_not_found': 'Command not found. Type "help" for available commands.',
    // 'terminal.language_changed': 'Language changed to',
    // 'terminal.invalid_language': 'Invalid language. Use: lang en | lang ru',
    terminal: {
      bannerLine1:
        "║                    PersonalityOS v1.0....................║",
      bannerLine2:
        "║                  Neural Interface Active...............║",
      initSuccess: "◉ System initialized successfully",
      neuralEstablished: "◉ Neural pathways established",
      helpHint: '◉ Type "help" or use TAB for autocomplete',
      notFound: '◉ Command not found: "{{cmd}}"',
      didYouMean: "◉ Did you mean: {{cmds}}?",
      typeHelp: '◉ Type "help" for available commands',
      inputPlaceholder: "Enter command... (TAB for autocomplete)",
      commandReference: "Command Reference",
    },
    commands: {
      name: {
        help: "help",
        profile: "profile",
        skills: "skills",
        projects: "projects",
        contact: "contact",
        whoami: "whoami",
        status: "status",
        clear: "clear",
        exit: "exit",
      },
      category: {
        navigation: "navigation",
        info: "information",
        help: "help",
        system: "system",
      },
      help: {
        description: "Display available commands and usage information",
        action:
          "Available commands: help, profile, skills, projects, contact, whoami, status, clear, exit",
      },
      profile: { description: "View personal profile and neural data" },
      skills: { description: "Access skill sphere and abilities overview" },
      projects: { description: "Browse project archive and portfolio" },
      contact: {
        description: "Access communication channels and contact info",
      },
      clear: { description: "Clear terminal history and reset display" },
      exit: { description: "Return to boot sequence" },
      whoami: {
        description: "Display current user information",
        action: "User: Linnorm | Role: Frontend Developer | Status: Available",
      },
      status: {
        description: "Show system status and metrics",
        action:
          "System Status: ONLINE | CPU: 45% | Memory: 67% | Neural Load: 23%",
      },
    },

    // Profile Screen
    profile: {
        title: "NEURAL PROFILE",
        back: "BACK TO TERMINAL",
        status: "Status",
        online: "ONLINE",
        name: "IVAN ERSHOV",
        role: "Frontend Developer",
        location: "Neural Interface Specialist",
        years_experience: "Years of experience",
        projects_completed: "Completed projects",
        coffee_consumed: "Coffee consumed",
        bugs_fixed: "Bugs fixed",

        achievements: "ACHIEVEMENTS & SPECIALIZATIONS",

        hover_to_interact: "HOVER TO INTERACT",
        tap_to_interact: "TAP TO INTERACT",
      stats: {
        exp: "Years of Experience",
        projects: "Projects Completed",
        coffee: "Coffee Consumed",
        bugs: "Bugs Fixed"
      },
      achievements_list: {
        react: { title: "React Specialist", description: "Expert in React ecosystem" },
        ts: { title: "TypeScript Advocate", description: "Strong typing enthusiast" },
        perf: { title: "Performance Optimizer", description: "Application speed guru" },
        uiux: { title: "UI/UX Designer", description: "Beautiful interfaces creator" },
        solver: { title: "Problem Solver", description: "Complex challenges resolver" },
        team: { title: "Team Player", description: "Collaborative development" }
      }
    },
    

    // Projects Screen
      projects: {
          back: "BACK TO TERMINAL",
          title: "PROJECT ARCHIVE",
          notFoundTitle: "NO PROJECTS FOUND",
          notFoundSub: "Try changing the selected filter",
          total:"Total projects",
          categories: {
            All: "All",
            "Web Application": "Web Application",
            "Social Platform": "Social Platform",
            Gallery: "Gallery",
            Analytics: "Analytics",
            "AI Tools": "AI Tools",
            Landing: "Landing",
            Blockchain: "Blockchain"
          },
          statuses: {
            Production: "Production",
            Beta: "Beta",
            Complete: "Complete",
            Development: "In Development"
          },
          items: {
            1: {
              title: "Closing Tag",
              description: "Reflective diary-trainer for beginner web developers, covering emotional and psychological stages of learning.",
              detailedDescription: "Structured as a learning chronicle divided into thematic blocks — from sprint zero to the finish line. Includes interactive areas for personal notes.",
              features: [
                "Thematic sprint navigation",
                "Reflective emotional triggers",
                "Interactive text areas",
                "Motivational narrative",
                "Philosophical ending"
              ]
            },
            2: {
              title: "SkillSwap Platform",
              description: "Social skill-sharing platform for software developers",
              detailedDescription: "Comprehensive social platform connecting developers for peer learning, video calls, live chats, and rating systems.",
              features: [
                "Smart user matching",
                "Video calls & screen sharing",
                "Ratings & review system",
                "Gamification with achievements",
                "Learning session scheduler"
              ]
            },
            3: {
              title: "MestoProject Gallery",
              description: "Interactive photo gallery with social features",
              detailedDescription: "Modern image gallery featuring photo uploads, likes, comments, and custom collection management.",
              features: [
                "Image upload & optimization",
                "Likes and comment threads",
                "Custom collection management",
                "Advanced search & filters",
                "Responsive lazy-loading layout"
              ]
            },
            4: {
              title: "CyberDash Analytics",
              description: "Real-time analytics & data monitoring dashboard",
              detailedDescription: "Advanced analytics dashboard featuring real-time data visualization, customizable widgets, smart alerts, and reporting.",
              features: [
                "Real-time data visualization",
                "Custom interactive widgets",
                "Smart alert system",
                "PDF/Excel export",
                "External API integrations"
              ]
            },
            5: {
              title: "Multuverse Window",
              description: "AI assistant for code analysis and optimization",
              detailedDescription: "ML-powered code inspection tool offering refactoring suggestions and automated bug detection.",
              features: [
                "ML code quality analysis",
                "Automated bug detection",
                "Refactoring recommendations",
                "Documentation generator",
                "VS Code integration"
              ]
            },
            6: {
              title: "BlockChain Tracker",
              description: "Blockchain transaction monitoring and analytics system",
              detailedDescription: "Comprehensive system for tracking multi-chain transactions in real time with visual analytics.",
              features: [
                "Multi-chain network tracking",
                "Real-time transaction stream",
                "Detailed analytics & stats",
                "Custom alert triggers",
                "Visual transaction flow"
              ]
            }
          }
        },

    // Project Details Screen 
        card: {
          openDetails: "Open details",
        },
        modal: {
          systemDescription: "System Description",
          techStack: "Tech Stack",
          keyFeatures: "Key Features",
          viewSource: "View Source",
          launchApp: "Launch App",
        },
    // Contacts Screen
        contacts: {
          back: 'BACK TO TERMINAL',
          title: 'NEURAL INTERFACE',
          available: 'Available 24/7',
          quick_access: 'QUICK ACCESS',
          scan_github: 'Scan to access GitHub profile',
          location_status: 'LOCATION & STATUS',
          location: 'Remote • Global',
          available_projects: 'Available for projects',
          response_time: 'Response time: ~2 hours',
          channels: 'COMMUNICATION CHANNELS',
          github: { name: 'GitHub', description: 'Open source contributions' },
          linkedin: { name: 'LinkedIn', description: 'Professional network' },
          telegram: { name: 'Telegram', description: 'Direct messaging' },
          email: { name: 'Email', description: 'Professional inquiries' }
      },

    // Language Switcher
    "lang.switch_language": "Switch Language",
    "lang.english": "English",
    "lang.russian": "Русский",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.close": "Close",
  },
  ru: {
    // Boot Screen
    boot: {
      initializing: "ИНИЦИАЛИЗАЦИЯ НЕЙРОИНТЕРФЕЙСА...",
      loading: "Загрузка основных систем",
      establishing: "Установка квантовой связи",
      calibrating: "Калибровка нейронных путей",
      activating: "Активация киберпротоколов",
      ready: "СИСТЕМА ГОТОВА",
      welcome: "Добро пожаловать в Матрицу",
      progressBar_loading: "ЗАГРУЗКА...",
    },

    // Terminal Screen
    terminal: {
      bannerLine1:
        "║                    PersonalityOS v1.0                         ║",
      bannerLine2:
        "║                  Нейронный интерфейс активен                     ║",
      initSuccess: "◉ Система успешно инициализирована",
      neuralEstablished: "◉ Нейронные связи установлены",
      helpHint: '◉ Введите "help" или используйте TAB для автодополнения',
      notFound: '◉ Команда не найдена: "{{cmd}}"',
      didYouMean: "◉ Возможно, вы имели в виду: {{cmds}}?",
      typeHelp: '◉ Введите "help" для списка команд',
      inputPlaceholder: "Введите команду... (TAB для автодополнения)",
      commandReference: "Справочник команд",
    },
    commands: {
      name: {
        help: "помощь",
        profile: "профиль",
        skills: "навыки",
        projects: "проекты",
        contact: "контакты",
        whoami: "кто я",
        status: "статус",
        clear: "очистить",
        exit: "выход",
      },
      category: {
        navigation: "навигация",
        info: "информация",
        help: "помощь",
        system: "система",
      },

      help: {
        description: "Показать доступные команды и информацию по использованию",
        action:
          "Доступные команды: help, profile, skills, projects, contact, whoami, status, clear, exit",
      },
      profile: { description: "Просмотр личного профиля и нейроданных" },
      skills: { description: "Доступ к сфере навыков и обзору способностей" },
      projects: { description: "Просмотр архива проектов и портфолио" },
      contact: {
        description: "Доступ к каналам связи и контактной информации",
      },
      clear: { description: "Очистить историю терминала и сбросить вывод" },
      exit: { description: "Вернуться к последовательности загрузки" },
      whoami: {
        description: "Показать информацию о текущем пользователе",
        action:
          "Пользователь: Linnorm | Роль: Frontend Developer | Статус: Доступен",
      },
      status: {
        description: "Показать состояние системы и метрики",
        action:
          "Состояние системы: ONLINE | CPU: 45% | Память: 67% | Нейронная нагрузка: 23%",
      },
    },

    // Profile Screen
        profile: {
            title: "НЕЙРОПРОФИЛЬ",
            back: "НАЗАД К ТЕРМИНАЛУ",
            status: "Статус",
            online: "ОНЛАЙН",
            name: "ИВАН ЕРШОВ",
            role: "Фронтенд-разработчик",
            location: "Специалист по нейроинтерфейсам",
            years_experience: "Лет опыта",
            projects_completed: "Завершенных проектов",
            coffee_consumed: "Выпито кофе",
            bugs_fixed: "Исправлено багов",

            achievements: "ДОСТИЖЕНИЯ И СПЕЦИАЛИЗАЦИИ",

            hover_to_interact: "НАВЕДИТЕ ДЛЯ ВЗАИМОДЕЙСТВИЯ",
            tap_to_interact: "НАЖМИТЕ ДЛЯ ВЗАИМОДЕЙСТВИЯ",
            stats: {
              exp: "Лет опыта",
              projects: "Завершенных проектов",
              coffee: "Выпито кофе",
              bugs: "Исправлено багов"
        },
            achievements_list: {
              react: {
                title: "Специалист по React",
                description: "Эксперт в экосистеме React"
              },
              ts: {
                title: "Сторонник TypeScript",
                description: "Энтузиаст строгой типизации"
              },
              perf: {
                title: "Оптимизатор производительности",
                description: "Гуру скорости приложений"
              },
              uiux: {
                title: "UI/UX дизайнер",
                description: "Создатель красивых интерфейсов"
              },
              solver: {
                title: "Решатель проблем",
                description: "Разрешитель сложных задач"
              },
              team: {
                title: "Командный игрок",
                description: "Сторонник совместной разработки"
              }
      }
      },
    // Projects Screen
      projects: {
          back: "НАЗАД В ТЕРМИНАЛ",
          title: "АРХИВ ПРОЕКТОВ",
          notFoundTitle: "ПРОЕКТЫ НЕ НАЙДЕНЫ",
          notFoundSub: "Попробуйте изменить выбранный фильтр",
          total:"Всего проектов",
          categories: {
            All: "Все",
            "Web Application": "Веб-приложение",
            "Social Platform": "Социальная платформа",
            Gallery: "Галерея",
            Analytics: "Аналитика",
            "AI Tools": "ИИ-инструменты",
            Landing: "Лендинг",
            Blockchain: "Блокчейн"
          },
          statuses: {
            Production: "Продакшн",
            Beta: "Бета",
            Complete: "Завершён",
            Development: "В разработке"
          },
          items: {
            1: {
              title: "Закрывающий тег",
              description: "Рефлексивный дневник-тренажёр для начинающих веб-разработчиков, посвящённый эмоциональным и психологическим этапам обучения вёрстке.",
              detailedDescription: "Сайт структурирован как хроника обучения вёрстке, разбитая на тематические блоки — от «нулевого спринта» до финальной точки. Каждый раздел описывает типичные состояния новичка. В конце каждого блока находится приглашение «Место для ваших воспоминаний о начале обучения», превращающее страницу в интерактивный журнал личного опыта.",
              features: [
                "Тематическая навигация по спринтам — от подготовки до текущего момента",
                "Рефлексивные триггеры — описание типичных эмоций и состояний",
                "Интерактивные поля — места для личных записей",
                "Мотивационный нарратив",
                "Философское завершение"
              ]
            },
            2: {
              title: "SkillSwap Platform",
              description: "Социальная платформа для обмена навыками между разработчиками",
              detailedDescription: "Комплексная социальная платформа, объединяющая разработчиков для взаимного обучения и обмена навыками. Включает систему матчинга, видеозвонки, чат и систему рейтингов.",
              features: [
                "Интеллектуальный матчинг пользователей",
                "Видеозвонки и экранная демонстрация",
                "Система рейтингов и отзывов",
                "Геймификация с достижениями",
                "Планировщик сессий обучения"
              ]
            },
            3: {
              title: "MestoProject Gallery",
              description: "Интерактивная фотогалерея с социальными функциями",
              detailedDescription: "Современная фотогалерея с функциями социальной сети. Пользователи могут загружать фотографии, ставить лайки, комментировать и создавать коллекции.",
              features: [
                "Загрузка и оптимизация изображений",
                "Система лайков и комментариев",
                "Создание и управление коллекциями",
                "Продвинутый поиск и фильтрация",
                "Responsive галерея с lazy loading"
              ]
            },
            4: {
              title: "CyberDash Analytics",
              description: "Real-time дашборд для мониторинга и аналитики данных",
              detailedDescription: "Продвинутая система аналитики с real-time визуализацией данных. Включает настраиваемые виджеты, интерактивные графики, систему алертов и экспорт отчетов.",
              features: [
                "Real-time визуализация данных",
                "Настраиваемые интерактивные дашборды",
                "Система умных алертов",
                "Экспорт в PDF/Excel",
                "API для интеграции с внешними системами"
              ]
            },
            5: {
              title: "Multuverse Window",
              description: "AI-помощник для анализа и оптимизации кода",
              detailedDescription: "Интеллектуальный инструмент для анализа кода с использованием машинного обучения. Предоставляет рекомендации по оптимизации, находит потенциальные баги.",
              features: [
                "Анализ качества кода с ML",
                "Автоматическое обнаружение багов",
                "Предложения по рефакторингу",
                "Генерация документации",
                "Интеграция с VS Code"
              ]
            },
            6: {
              title: "BlockChain Tracker",
              description: "Система мониторинга и анализа блокчейн транзакций",
              detailedDescription: "Комплексная система для отслеживания и анализа блокчейн транзакций в реальном времени. Поддерживает множественные сети и предоставляет детальную аналитику.",
              features: [
                "Мониторинг множественных блокчейн сетей",
                "Real-time отслеживание транзакций",
                "Детальная аналитика и статистика",
                "Система алертов и уведомлений",
                "Визуализация потоков транзакций"
              ]
            }
          }
        },
        // projectCard
        card: {
          openDetails: "Подробнее",
        },
        modal: {
          systemDescription: "Описание системы",
          techStack: "Технологический стек",
          keyFeatures: "Ключевые особенности",
          viewSource: "Исходный код",
          launchApp: "Запустить проект",
        },
    // Contacts Screen
     contacts: {
      back: 'НАЗАД В ТЕРМИНАЛ',
      title: 'НЕЙРОИНТЕРФЕЙС',
      available: 'На связи 24/7',
      quick_access: 'БЫСТРЫЙ ДОСТУП',
      scan_github: 'Сканируйте для доступа к GitHub',
      location_status: 'ЛОКАЦИЯ И СТАТУС',
      location: 'Удалённо • Глобально',
      available_projects: 'Доступен для проектов',
      response_time: 'Время ответа: ~2 часа',
      channels: 'КАНАЛЫ СВЯЗИ',
      github: { name: 'GitHub', description: 'Вклад в open-source' },
      linkedin: { name: 'LinkedIn', description: 'Профессиональная сеть' },
      telegram: { name: 'Telegram', description: 'Прямые сообщения' },
      email: { name: 'Email', description: 'Профессиональные запросы' }
    },
    // "contacts.title": "ИНТЕРФЕЙС СВЯЗИ",
    // "contacts.back": "< НАЗАД В ТЕРМИНАЛ",
    // "contacts.get_in_touch": "СВЯЗАТЬСЯ СО МНОЙ",
    // "contacts.ready_to_connect":
    //   "Готов к сотрудничеству и созданию чего-то удивительного",
    // "contacts.scan_qr": "Сканировать QR код",
    // "contacts.direct_contact": "Прямой контакт",
    // "contacts.social_networks": "Социальные сети",
    // "contacts.status_available": "Доступен для новых проектов",
    // "contacts.response_time": "Время ответа",
    // "contacts.within_24h": "В течение 24 часов",
    // "contacts.location": "Локация",
    // "contacts.timezone": "Часовой пояс",

    // Language Switcher
    "lang.switch_language": "Сменить язык",
    "lang.english": "English",
    "lang.russian": "Русский",

    // Common
    "common.loading": "Загрузка...",
    "common.error": "Ошибка",
    "common.success": "Успешно",
    "common.cancel": "Отмена",
    "common.confirm": "Подтвердить",
    "common.close": "Закрыть",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("cyber-os-language") as Language;
    return savedLanguage && (savedLanguage === "en" || savedLanguage === "ru")
      ? savedLanguage
      : "en";
  });

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("cyber-os-language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem("cyber-os-language", language);
  }, [language]);

  const t = (key: string) => {
    const keys = key.split(".");
    let result: any = translations[language];

    for (const k of keys) {
      if (result[k] === undefined) return key; // fallback на сам ключ
      result = result[k];
    }

    return result;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
