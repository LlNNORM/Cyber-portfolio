import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Globe,
  Database,
  Settings,
  Palette,
  Cpu,
  Terminal,
  Zap,
  Layers,
  Server,
  Shield,
} from 'lucide-react';

// --- ИНТЕРФЕЙСЫ ---

export interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

interface SkillsSphereProps {
  skills?: Skill[];
  onBack: () => void;
}

interface LightningBranch {
  path: string;
  opacity: number;
  width: number;
}

// --- ДЕФОЛТНЫЙ МАССИВ ---

const DEFAULT_SKILLS: Skill[] = [
  {
    name: 'JavaScript',
    level: 90,
    color: '#FFD700',
    category: 'Programming',
  },
  {
    name: 'TypeScript',
    level: 85,
    color: '#00E0FF',
    category: 'Programming',
  },
  {
    name: 'React',
    level: 95,
    color: '#0FF4F8',
    category: 'Frontend',
  },
  {
    name: 'Redux',
    level: 80,
    color: '#A020F0',
    category: 'State Management',
  },
  {
    name: 'REST API',
    level: 88,
    color: '#00ff41',
    category: 'Backend',
  },
  {
    name: 'Git',
    level: 92,
    color: '#FF6B35',
    category: 'DevOps',
  },
  {
    name: 'CSS/SCSS',
    level: 87,
    color: '#FF3366',
    category: 'Styling',
  },
  {
    name: 'Node.js',
    level: 83,
    color: '#00D9FF',
    category: 'Backend',
  },
  {
    name: 'MongoDB',
    level: 75,
    color: '#A020F0',
    category: 'Database',
  },
  {
    name: 'Webpack',
    level: 78,
    color: '#0FF4F8',
    category: 'Build Tools',
  },
  {
    name: 'Jest',
    level: 82,
    color: '#00ff41',
    category: 'Testing',
  },
  {
    name: 'Docker',
    level: 70,
    color: '#00E0FF',
    category: 'DevOps',
  },

  {
    name: 'GraphQL',
    level: 76,
    color: '#FF6B35',
    category: 'API',
  },
  {
    name: 'Next.js',
    level: 85,
    color: '#FF3366',
    category: 'Framework',
  },
  {
    name: 'Tailwind',
    level: 90,
    color: '#00D9FF',
    category: 'Styling',
  },
  {
    name: 'Framer Motion',
    level: 84,
    color: '#A020F0',
    category: 'Animation',
  },
  {
    name: 'WebSocket',
    level: 79,
    color: '#0FF4F8',
    category: 'Real-time',
  },
];

// --- СЛОВАРЬ ИКОНОК ---

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Programming':
      return Code;
    case 'Frontend':
      return Globe;
    case 'Backend':
      return Server;
    case 'Database':
      return Database;
    case 'DevOps':
      return Settings;
    case 'Styling':
      return Palette;
    case '3D Graphics':
      return Cpu;
    case 'Testing':
      return Terminal;
    case 'Cloud':
      return Layers;
    case 'Cyber':
      return Shield;
    default:
      return Zap;
  }
};

// --- ВЫСОКОДЕТАЛИЗИРОВАННЫЙ ФРАКТАЛЬНЫЙ ГЕНЕРАТОР МОЛНИЙ ---

const generateDetailedLightning = (
  maxRadius: number
): LightningBranch[] => {
  const angle = Math.random() * Math.PI * 2;
  const segments = 8 + Math.floor(Math.random() * 5);
  const branches: LightningBranch[] = [];

  let trunkPath = 'M 0 0';

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const r = maxRadius * t;

    const baseX = Math.cos(angle) * r;
    const baseY = Math.sin(angle) * r;

    const jitter =
      (Math.random() - 0.5) * 22 * (1 - t * 0.2);

    const nx =
      baseX +
      Math.cos(angle + Math.PI / 2) * jitter;

    const ny =
      baseY +
      Math.sin(angle + Math.PI / 2) * jitter;

    trunkPath += ` L ${nx} ${ny}`;

    if (
      i > 1 &&
      i < segments - 1 &&
      Math.random() < 0.45
    ) {
      const branchAngle =
        angle + (Math.random() - 0.5) * 1.1;

      const branchSegments =
        3 + Math.floor(Math.random() * 3);

      const branchLen =
        25 + Math.random() * 35;

      let branchPath = `M ${nx} ${ny}`;

      let currBx = nx;
      let currBy = ny;

      for (
        let b = 1;
        b <= branchSegments;
        b++
      ) {
        const bt = b / branchSegments;
        const br = branchLen * bt;

        const bBaseX =
          nx + Math.cos(branchAngle) * br;

        const bBaseY =
          ny + Math.sin(branchAngle) * br;

        const bJitter =
          (Math.random() - 0.5) * 10;

        currBx =
          bBaseX +
          Math.cos(branchAngle + Math.PI / 2) *
            bJitter;

        currBy =
          bBaseY +
          Math.sin(branchAngle + Math.PI / 2) *
            bJitter;

        branchPath += ` L ${currBx} ${currBy}`;

        if (
          b === 2 &&
          Math.random() < 0.35
        ) {
          const microAngle =
            branchAngle +
            (Math.random() - 0.5) * 1.2;

          const microLen =
            10 + Math.random() * 15;

          const mx =
            currBx +
            Math.cos(microAngle) * microLen;

          const my =
            currBy +
            Math.sin(microAngle) * microLen;

          branches.push({
            path: `M ${currBx} ${currBy} L ${mx} ${my}`,
            opacity: 0.2,
            width: 0.5,
          });
        }
      }

      branches.push({
        path: branchPath,
        opacity: 0.35,
        width: 0.8,
      });
    }
  }

  branches.unshift({
    path: trunkPath,
    opacity: 0.65,
    width: 1.4,
  });

  return branches;
};

// --- КОМПОНЕНТ МОЛНИЙ ---

const EnergyCore = () => {
  const [
    sparks,
    setSparks,
  ] = useState<
    {
      branches: LightningBranch[];
      color: string;
    }[]
  >([]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let clearId: ReturnType<typeof setTimeout>;

    const triggerLightning = () => {
      const lightningCount =
        2 + Math.floor(Math.random() * 3);

      const newSparks = Array.from({
        length: lightningCount,
      }).map(() => ({
        branches: generateDetailedLightning(
          130 + Math.random() * 110
        ),
        color:
          Math.random() > 0.4
            ? '#0FF4F8'
            : '#A020F0',
      }));

      setSparks(newSparks);

      clearId = setTimeout(() => {
        setSparks([]);
      }, 70);

      const nextDelay =
        1500 + Math.random() * 1700;

      timeoutId = setTimeout(
        triggerLightning,
        nextDelay
      );
    };

    triggerLightning();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(clearId);
    };
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[150]">
      <svg
        width="600"
        height="600"
        viewBox="-300 -300 600 600"
      >
        <defs>
          <filter
            id="soft-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="2"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {sparks.map((spark, i) => (
          <g key={i}>
            {spark.branches.map(
              (branch, j) => (
                <path
                  key={j}
                  d={branch.path}
                  stroke={spark.color}
                  strokeWidth={branch.width}
                  fill="none"
                  filter="url(#soft-glow)"
                  opacity={branch.opacity}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ СФЕРЫ ---

const SkillsSphere: React.FC<
  SkillsSphereProps
> = ({ skills, onBack }) => {
  const safeSkills = useMemo(() => {
    return Array.isArray(skills) &&
      skills.length > 0
      ? skills
      : DEFAULT_SKILLS;
  }, [skills]);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const nodesRef = useRef<
    Map<string, HTMLDivElement>
  >(new Map());

  const setNodeRef = (
    name: string,
    el: HTMLDivElement | null
  ) => {
    if (el) {
      nodesRef.current.set(name, el);
    } else {
      nodesRef.current.delete(name);
    }
  };

  const [
    hoveredSkill,
    setHoveredSkill,
  ] = useState<Skill | null>(null);

  // =========================
  // ROTATION
  // =========================

  const rotationRef = useRef({
    x: 0,
    y: 0,
  });

  // =========================
  // DRAG STATE
  // =========================

  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  // =========================
  // INERTIA
  // =========================

  const velocityRef = useRef({
    x: 0,
    y: 0,
  });

  const hoveredSkillRef =
    useRef<Skill | null>(null);

  useEffect(() => {
    hoveredSkillRef.current =
      hoveredSkill;
  }, [hoveredSkill]);

  const radius = 220;

  const baseSpeed = 0.003;

  // =========================
  // ТОЧКИ НА СФЕРЕ
  // =========================

  const points = useMemo(() => {
    const pts: {
      x: number;
      y: number;
      z: number;
    }[] = [];

    const len = safeSkills.length;

    const divisor =
      len > 1 ? len - 1 : 1;

    const phi =
      Math.PI * (3 - Math.sqrt(5));

    for (
      let i = 0;
      i < len;
      i++
    ) {
      const y =
        1 -
        (i / divisor) * 2;

      const radiusAtY =
        Math.sqrt(
          Math.max(
            0,
            1 - y * y
          )
        );

      const theta = phi * i;

      const x =
        Math.cos(theta) *
        radiusAtY;

      const z =
        Math.sin(theta) *
        radiusAtY;

      pts.push({
        x,
        y,
        z,
      });
    }

    return pts;
  }, [safeSkills.length]);

  // =========================
  // ROTATION ENGINE
  // =========================

  useEffect(() => {
    let animationFrameId: number;

    const container =
      containerRef.current;

    if (!container) return;

    // =========================
    // POINTER DOWN
    // =========================

    const handlePointerDown = (
      e: PointerEvent
    ) => {
      // На ПК разрешаем только левую кнопку мыши
      if (
        e.pointerType === 'mouse' &&
        e.button !== 0
      ) {
        return;
      }

      dragRef.current.active = true;

      dragRef.current.startX =
        e.clientX;

      dragRef.current.startY =
        e.clientY;

      dragRef.current.lastX =
        e.clientX;

      dragRef.current.lastY =
        e.clientY;

      // Останавливаем инерцию
      velocityRef.current.x = 0;
      velocityRef.current.y = 0;

      container.setPointerCapture(
        e.pointerId
      );
    };

    // =========================
    // POINTER MOVE
    // =========================

    const handlePointerMove = (
      e: PointerEvent
    ) => {
      if (!dragRef.current.active) {
        return;
      }

      const deltaX =
        e.clientX -
        dragRef.current.lastX;

      const deltaY =
        e.clientY -
        dragRef.current.lastY;

      dragRef.current.lastX =
        e.clientX;

      dragRef.current.lastY =
        e.clientY;

      // Чувствительность вращения
      const sensitivity = 0.008;

      // Горизонтальное движение
      // вращает сферу вокруг Y
      rotationRef.current.y +=
        deltaX * sensitivity;

      // Вертикальное движение
      // вращает сферу вокруг X
      rotationRef.current.x +=
        deltaY * sensitivity;

      // Ограничиваем вертикальное вращение
      const maxRotationX =
        Math.PI / 2;

      rotationRef.current.x =
        Math.max(
          -maxRotationX,
          Math.min(
            maxRotationX,
            rotationRef.current.x
          )
        );

      // Сохраняем скорость для инерции
      velocityRef.current.y =
        deltaX * sensitivity;

      velocityRef.current.x =
        deltaY * sensitivity;
    };

    // =========================
    // POINTER UP
    // =========================

    const handlePointerUp = (
      e: PointerEvent
    ) => {
      if (!dragRef.current.active) {
        return;
      }

      dragRef.current.active = false;

      try {
        container.releasePointerCapture(
          e.pointerId
        );
      } catch {
        // Pointer capture уже мог быть освобождён
      }
    };

    // =========================
    // ANIMATION
    // =========================

    const updatePositions = () => {
      const isDragging =
        dragRef.current.active;

      // Если пользователь не тащит сферу,
      // включаем автоматическое вращение
      // и инерцию.
      if (!isDragging) {
        const currentSpeed =
          hoveredSkillRef.current
            ? baseSpeed * 0.1
            : baseSpeed;

        // Автоматическое вращение
        rotationRef.current.y +=
          currentSpeed;

        // Плавно уменьшаем инерцию
        velocityRef.current.x *=
          0.94;

        velocityRef.current.y *=
          0.94;

        // Добавляем остаточное движение
        rotationRef.current.x +=
          velocityRef.current.x;

        rotationRef.current.y +=
          velocityRef.current.y;
      }

      const cosX =
        Math.cos(
          rotationRef.current.x
        );

      const sinX =
        Math.sin(
          rotationRef.current.x
        );

      const cosY =
        Math.cos(
          rotationRef.current.y
        );

      const sinY =
        Math.sin(
          rotationRef.current.y
        );

      safeSkills.forEach(
        (skill, i) => {
          const item =
            nodesRef.current.get(
              skill.name
            );

          if (
            !item ||
            !points[i]
          ) {
            return;
          }

          const p = points[i];

          // =========================
          // ROTATION Y
          // =========================

          const x1 =
            p.x * cosY +
            p.z * sinY;

          const z1 =
            -p.x * sinY +
            p.z * cosY;

          // =========================
          // ROTATION X
          // =========================

          const y2 =
            p.y * cosX -
            z1 * sinX;

          const z2 =
            p.y * sinX +
            z1 * cosX;

          const x2 = x1;

          // =========================
          // DEPTH
          // =========================

          const distance = z2;

          const scale =
            (distance + 2) /
            2.5;

          const opacity =
            (distance + 1.5) /
            2.5;

          const left =
            x2 * radius;

          const top =
            y2 * radius;

          const zIndex =
            Math.round(
              (distance + 2) *
                100
            );

          item.style.transform =
            `translate(-50%, -50%) ` +
            `translate3d(${left}px, ${top}px, 0) ` +
            `scale(${scale})`;

          item.style.opacity =
            opacity.toString();

          item.style.zIndex =
            zIndex.toString();
        }
      );

      animationFrameId =
        requestAnimationFrame(
          updatePositions
        );
    };

    // =========================
    // EVENTS
    // =========================

    container.addEventListener(
      'pointerdown',
      handlePointerDown
    );

    container.addEventListener(
      'pointermove',
      handlePointerMove
    );

    container.addEventListener(
      'pointerup',
      handlePointerUp
    );

    container.addEventListener(
      'pointercancel',
      handlePointerUp
    );

    updatePositions();

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      container.removeEventListener(
        'pointerdown',
        handlePointerDown
      );

      container.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      container.removeEventListener(
        'pointerup',
        handlePointerUp
      );

      container.removeEventListener(
        'pointercancel',
        handlePointerUp
      );
    };
  }, [points, safeSkills]);

  // =========================
  // RENDER
  // =========================

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#0a0a0f] cyber-grid p-4 md:p-6 z-[100] overflow-hidden flex flex-col">
      <motion.div
        className="w-full h-full max-w-7xl mx-auto flex flex-col gap-3 md:gap-4"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {/* =========================
            ХЕДЕР
        ========================= */}

        <div className="flex items-center justify-between shrink-0">
          <button
            onClick={onBack}
            className="cyber-border rounded-lg px-4 py-2 jetbrains text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
          >
            {'< BACK TO TERMINAL'}
          </button>

          <h1 className="orbitron text-2xl md:text-4xl text-[#A020F0] cyber-text-glow tracking-wider text-center flex-1">
            NEURAL SPHERE
          </h1>

          <div className="jetbrains text-[#0FF4F8] text-sm hidden md:block">
            Status:{' '}
            <span className="text-[#00ff41] cyber-flicker">
              ACTIVE
            </span>
          </div>
        </div>

        {/* =========================
            ГЛАВНЫЙ КОНТЕЙНЕР
        ========================= */}

        <div className="flex-1 w-full bg-[#050508] cyber-border rounded-lg relative overflow-hidden flex flex-col">
          {/* =========================
              INFO PANEL
          ========================= */}

          <div className="absolute top-6 right-6 z-[200] min-h-[100px] w-56 pointer-events-none hidden md:block">
            {hoveredSkill && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="bg-[#0a0a0f]/90 border border-[#A020F0] p-4 rounded shadow-[0_0_15px_#A020F040] backdrop-blur-sm"
              >
                <div
                  className="orbitron text-xl mb-1"
                  style={{
                    color:
                      hoveredSkill.color,
                    textShadow: `0 0 8px ${hoveredSkill.color}`,
                  }}
                >
                  {hoveredSkill.name}
                </div>

                <div className="jetbrains text-sm text-[#0FF4F8] mb-3">
                  {hoveredSkill.category}
                </div>

                <div className="w-full bg-[#050508] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${hoveredSkill.level}%`,
                      backgroundColor:
                        hoveredSkill.color,
                    }}
                  />
                </div>

                <div className="jetbrains text-xs text-right mt-2 text-[#00E0FF]">
                  Proficiency:{' '}
                  {hoveredSkill.level}%
                </div>
              </motion.div>
            )}
          </div>

          {/* =========================
              VIEWPORT СФЕРЫ
          ========================= */}

          <div
            ref={containerRef}
            className="flex-1 w-full relative cursor-grab active:cursor-grabbing overflow-hidden touch-none select-none"
            style={{
              perspective: '1200px',
            }}
          >
            {/* МОЛНИИ */}

            <EnergyCore />

            {/* =========================
                ЭЛЕМЕНТЫ СФЕРЫ
            ========================= */}

            {safeSkills.map((skill) => {
              const Icon =
                getIconForCategory(
                  skill.category
                );

              const isHovered =
                hoveredSkill?.name ===
                skill.name;

              return (
                <div
                  key={skill.name}
                  ref={(el) =>
                    setNodeRef(
                      skill.name,
                      el
                    )
                  }
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    transition-colors
                    duration-200
                    pointer-events-auto
                    cursor-pointer
                    select-none
                    ${
                      isHovered
                        ? 'bg-[#1a1a24] border border-[#A020F0]'
                        : ''
                    }
                  `}
                  onMouseEnter={() =>
                    setHoveredSkill(
                      skill
                    )
                  }
                  onMouseLeave={() =>
                    setHoveredSkill(
                      null
                    )
                  }
                >
                  <div
                    style={{
                      color:
                        skill.color,
                    }}
                  >
                    <Icon
                      size={
                        isHovered
                          ? 26
                          : 18
                      }
                    />
                  </div>

                  <span
                    className={`
                      jetbrains
                      text-sm
                      md:text-base
                      whitespace-nowrap
                      ${
                        isHovered
                          ? 'opacity-100 font-bold'
                          : 'opacity-80'
                      }
                    `}
                    style={{
                      color: isHovered
                        ? skill.color
                        : '#00E0FF',

                      textShadow:
                        isHovered
                          ? `0 0 10px ${skill.color}`
                          : 'none',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              );
            })}

            {/* =========================
                ДЕКОРАТИВНЫЕ ОРБИТЫ
            ========================= */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-[#0FF4F8] opacity-40 pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#A020F0] opacity-40 pointer-events-none" />
          </div>

          {/* =========================
              ФУТЕР
          ========================= */}

          <div className="p-3 md:p-4 border-t border-[#A020F0]/20 flex justify-between items-center jetbrains text-xs text-[#0FF4F8] opacity-70 bg-[#050508] shrink-0 z-[200]">
            <div>
              Sphere Engine v4.7
            </div>

            <div>
              Total Nodes:{' '}
              {safeSkills.length}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSphere;