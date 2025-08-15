import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Boot Screen
      boot: {
        'initializing': 'INITIALIZING NEURAL INTERFACE...',
        'loading': 'Loading core systems',
        'establishing': 'Establishing quantum link',
        'calibrating': 'Calibrating neural pathways',
        'activating': 'Activating cybernetic protocols',
        'ready': 'SYSTEM READY',
        'welcome': 'Welcome to the Matrix',
        'progressBar_loading': 'LOADING...',
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
      bannerLine1: '║                    PersonalityOS v1.0                         ║',
      bannerLine2: '║                  Neural Interface Active                      ║',
      initSuccess: '◉ System initialized successfully',
      neuralEstablished: '◉ Neural pathways established',
      helpHint: '◉ Type "help" or use TAB for autocomplete',
      notFound: '◉ Command not found: "{{cmd}}"',
      didYouMean: '◉ Did you mean: {{cmds}}?',
      typeHelp: '◉ Type "help" for available commands',
      inputPlaceholder: 'Enter command... (TAB for autocomplete)',
      commandReference: 'Command Reference'
    },
    commands: {
      help: {
        description: 'Display available commands and usage information',
        action: 'Available commands: help, profile, skills, projects, contact, whoami, status, clear, exit'
      },
      profile: { description: 'View personal profile and neural data' },
      skills: { description: 'Access skill matrix and abilities overview' },
      projects: { description: 'Browse project archive and portfolio' },
      contact: { description: 'Access communication channels and contact info' },
      clear: { description: 'Clear terminal history and reset display' },
      exit: { description: 'Return to boot sequence' },
      whoami: {
        description: 'Display current user information',
        action: 'User: Linnorm | Role: Frontend Developer | Status: Available'
      },
      status: {
        description: 'Show system status and metrics',
        action: 'System Status: ONLINE | CPU: 45% | Memory: 67% | Neural Load: 23%'
      }
    },

    // Profile Screen
    'profile.title': 'NEURAL PROFILE',
    'profile.back': '< BACK TO TERMINAL',
    'profile.status': 'Status',
    'profile.online': 'ONLINE',
    'profile.personal_data': 'PERSONAL DATA',
    'profile.name': 'Name',
    'profile.role': 'Role',
    'profile.location': 'Location',
    'profile.available': 'Available',
    'profile.skills_title': 'SKILL MATRIX v2.1',
    'profile.total_skills': 'Total Skills',
    'profile.category': 'Category',
    'profile.filter_all': 'All',
    'profile.expert': 'Expert',
    'profile.advanced': 'Advanced',
    'profile.proficient': 'Proficient',
    'profile.average': 'Average',
    'profile.experience': 'Experience',
    'profile.usage': 'Usage',
    'profile.daily': 'Daily',
    'profile.regular': 'Regular',
    'profile.often': 'Often',
    'profile.sometimes': 'Sometimes',
    'profile.years_experience': 'Years of Experience',
    'profile.projects_completed': 'Projects Completed',
    'profile.coffee_consumed': 'Coffee Consumed',
    'profile.bugs_fixed': 'Bugs Fixed',
    'profile.achievements': 'ACHIEVEMENTS & SPECIALIZATIONS',
    'profile.matrix_version': 'Matrix Version',
    'profile.last_updated': 'Last Updated',
    'profile.system_online': '● SYSTEM ONLINE',

    // Projects Screen
    'projects.title': 'PROJECT PORTFOLIO',
    'projects.back': '< BACK TO TERMINAL',
    'projects.filter_all': 'All Projects',
    'projects.status.completed': 'COMPLETED',
    'projects.status.active': 'ACTIVE',
    'projects.status.archived': 'ARCHIVED',
    'projects.tech_stack': 'Tech Stack',
    'projects.live_demo': 'Live Demo',
    'projects.source_code': 'Source Code',
    'projects.total_projects': 'Total Projects',
    'projects.completed_projects': 'Completed',
    'projects.active_projects': 'Active',
    'projects.archived_projects': 'Archived',

    // Contacts Screen
    'contacts.title': 'CONTACT INTERFACE',
    'contacts.back': '< BACK TO TERMINAL',
    'contacts.get_in_touch': 'GET IN TOUCH',
    'contacts.ready_to_connect': 'Ready to connect and build something amazing together',
    'contacts.scan_qr': 'Scan QR Code',
    'contacts.direct_contact': 'Direct Contact',
    'contacts.social_networks': 'Social Networks',
    'contacts.status_available': 'Available for new projects',
    'contacts.response_time': 'Response Time',
    'contacts.within_24h': 'Within 24 hours',
    'contacts.location': 'Location',
    'contacts.timezone': 'Timezone',

    // Language Switcher
    'lang.switch_language': 'Switch Language',
    'lang.english': 'English',
    'lang.russian': 'Русский',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
  },
  ru: {
    // Boot Screen
    boot: {
    'initializing': 'ИНИЦИАЛИЗАЦИЯ НЕЙРОИНТЕРФЕЙСА...',
    'loading': 'Загрузка основных систем',
    'establishing': 'Установка квантовой связи',
    'calibrating': 'Калибровка нейронных путей',
    'activating': 'Активация киберпротоколов',
    'ready': 'СИСТЕМА ГОТОВА',
    'welcome': 'Добро пожаловать в Матрицу',
    'progressBar_loading': 'ЗАГРУЗКА...',
    },
    

    // Terminal Screen
    terminal: {
      bannerLine1: '║                    PersonalityOS v1.0                         ║',
      bannerLine2: '║                  Нейронный интерфейс активен                     ║',
      initSuccess: '◉ Система успешно инициализирована',
      neuralEstablished: '◉ Нейронные связи установлены',
      helpHint: '◉ Введите "help" или используйте TAB для автодополнения',
      notFound: '◉ Команда не найдена: "{{cmd}}"',
      didYouMean: '◉ Возможно, вы имели в виду: {{cmds}}?',
      typeHelp: '◉ Введите "help" для списка команд',
      inputPlaceholder: 'Введите команду... (TAB для автодополнения)',
      commandReference: 'Справочник команд'
    },
    commands: {
      help: {
        description: 'Показать доступные команды и информацию по использованию',
        action: 'Доступные команды: help, profile, skills, projects, contact, whoami, status, clear, exit'
      },
      profile: { description: 'Просмотр личного профиля и нейроданных' },
      skills: { description: 'Доступ к матрице навыков и обзору способностей' },
      projects: { description: 'Просмотр архива проектов и портфолио' },
      contact: { description: 'Доступ к каналам связи и контактной информации' },
      clear: { description: 'Очистить историю терминала и сбросить вывод' },
      exit: { description: 'Вернуться к последовательности загрузки' },
      whoami: {
        description: 'Показать информацию о текущем пользователе',
        action: 'Пользователь: Linnorm | Роль: Frontend Developer | Статус: Доступен'
      },
      status: {
        description: 'Показать состояние системы и метрики',
        action: 'Состояние системы: ONLINE | CPU: 45% | Память: 67% | Нейронная нагрузка: 23%'
      }
    },

    // Profile Screen
    'profile.title': 'НЕЙРОПРОФИЛЬ',
    'profile.back': '< НАЗАД В ТЕРМИНАЛ',
    'profile.status': 'Статус',
    'profile.online': 'В СЕТИ',
    'profile.personal_data': 'ПЕРСОНАЛЬНЫЕ ДАННЫЕ',
    'profile.name': 'Имя',
    'profile.role': 'Роль',
    'profile.location': 'Локация',
    'profile.available': 'Доступен',
    'profile.skills_title': 'МАТРИЦА НАВЫКОВ v2.1',
    'profile.total_skills': 'Всего навыков',
    'profile.category': 'Категория',
    'profile.filter_all': 'Все',
    'profile.expert': 'Эксперт',
    'profile.advanced': 'Продвинутый',
    'profile.proficient': 'Опытный',
    'profile.average': 'Средний',
    'profile.experience': 'Опыт',
    'profile.usage': 'Использование',
    'profile.daily': 'Ежедневно',
    'profile.regular': 'Регулярно',
    'profile.often': 'Часто',
    'profile.sometimes': 'Иногда',
    'profile.years_experience': 'Лет опыта',
    'profile.projects_completed': 'Проектов завершено',
    'profile.coffee_consumed': 'Кофе выпито',
    'profile.bugs_fixed': 'Багов исправлено',
    'profile.achievements': 'ДОСТИЖЕНИЯ И СПЕЦИАЛИЗАЦИИ',
    'profile.matrix_version': 'Версия матрицы',
    'profile.last_updated': 'Последнее обновление',
    'profile.system_online': '● СИСТЕМА В СЕТИ',

    // Projects Screen
    'projects.title': 'ПОРТФОЛИО ПРОЕКТОВ',
    'projects.back': '< НАЗАД В ТЕРМИНАЛ',
    'projects.filter_all': 'Все проекты',
    'projects.status.completed': 'ЗАВЕРШЕН',
    'projects.status.active': 'АКТИВЕН',
    'projects.status.archived': 'АРХИВ',
    'projects.tech_stack': 'Технологии',
    'projects.live_demo': 'Демо',
    'projects.source_code': 'Исходный код',
    'projects.total_projects': 'Всего проектов',
    'projects.completed_projects': 'Завершено',
    'projects.active_projects': 'Активно',
    'projects.archived_projects': 'Архив',

    // Contacts Screen
    'contacts.title': 'ИНТЕРФЕЙС СВЯЗИ',
    'contacts.back': '< НАЗАД В ТЕРМИНАЛ',
    'contacts.get_in_touch': 'СВЯЗАТЬСЯ СО МНОЙ',
    'contacts.ready_to_connect': 'Готов к сотрудничеству и созданию чего-то удивительного',
    'contacts.scan_qr': 'Сканировать QR код',
    'contacts.direct_contact': 'Прямой контакт',
    'contacts.social_networks': 'Социальные сети',
    'contacts.status_available': 'Доступен для новых проектов',
    'contacts.response_time': 'Время ответа',
    'contacts.within_24h': 'В течение 24 часов',
    'contacts.location': 'Локация',
    'contacts.timezone': 'Часовой пояс',

    // Language Switcher
    'lang.switch_language': 'Сменить язык',
    'lang.english': 'English',
    'lang.russian': 'Русский',

    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успешно',
    'common.cancel': 'Отмена',
    'common.confirm': 'Подтвердить',
    'common.close': 'Закрыть',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
  const savedLanguage = localStorage.getItem('cyber-os-language') as Language;
  return savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')
    ? savedLanguage
    : 'en';
});

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('cyber-os-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('cyber-os-language', language);
  }, [language]);

const t = (key: string) => {
  const keys = key.split('.');
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
    t
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};