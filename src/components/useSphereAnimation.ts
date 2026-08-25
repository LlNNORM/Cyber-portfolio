import { useEffect, useRef, useMemo, useCallback } from 'react';
import type { Skill } from './types';

export const useSphereAnimation = (skills: Skill[], hoveredSkill: Skill | null) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const hoveredSkillRef = useRef<Skill | null>(null);
  useEffect(() => {
    hoveredSkillRef.current = hoveredSkill;
  }, [hoveredSkill]);

  // Корректное добавление и удаление узлов из Map без очистки во время рендера
  const setNodeRef = useCallback((name: string, el: HTMLDivElement | null) => {
    if (el) {
      nodesRef.current.set(name, el);
    } else {
      nodesRef.current.delete(name);
    }
  }, []);

  // Точки на сфере (Спираль Фибоначчи)
  const points = useMemo(() => {
    const pts: { x: number; y: number; z: number }[] = [];
    const len = skills.length;
    const divisor = len > 1 ? len - 1 : 1;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < len; i++) {
      const y = 1 - (i / divisor) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      pts.push({ x, y, z });
    }
    return pts;
  }, [skills.length]);

  useEffect(() => {
    let animationFrameId: number;
    const container = containerRef.current;
    if (!container) return;

    // Кэширование радиуса сферы, чтобы вызывать перерасчет только при resize
    let dynamicRadius = 180;
    const updateRadius = () => {
      const rect = container.getBoundingClientRect();
      const minDimension = Math.min(rect.width, rect.height);
      dynamicRadius = Math.max(100, Math.min(220, minDimension * 0.35));
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);

    const baseSpeed = 0.003;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      dragRef.current.active = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;

      velocityRef.current.x = 0;
      velocityRef.current.y = 0;

      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;

      const deltaX = e.clientX - dragRef.current.lastX;
      const deltaY = e.clientY - dragRef.current.lastY;

      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;

      const sensitivity = 0.008;

      rotationRef.current.y += deltaX * sensitivity;
      rotationRef.current.x += deltaY * sensitivity;

      const maxRotationX = Math.PI / 2;
      rotationRef.current.x = Math.max(
        -maxRotationX,
        Math.min(maxRotationX, rotationRef.current.x)
      );

      velocityRef.current.x = deltaY * sensitivity;
      velocityRef.current.y = deltaX * sensitivity;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;

      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture уже освобожден
      }
    };

    const updatePositions = () => {
      const isDragging = dragRef.current.active;

      if (!isDragging) {
        const currentSpeed = hoveredSkillRef.current ? baseSpeed * 0.1 : baseSpeed;

        rotationRef.current.y += currentSpeed;
        velocityRef.current.x *= 0.94;
        velocityRef.current.y *= 0.94;

        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.y += velocityRef.current.y;
      }

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      skills.forEach((skill, i) => {
        const item = nodesRef.current.get(skill.name);
        const p = points[i];

        if (!item || !p) return;

        // Вращение Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Вращение X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const x2 = x1;

        // Глубина и масштаб
        const distance = z2;
        const scale = (distance + 2) / 2.5;
        const opacity = (distance + 1.5) / 2.5;

        const left = x2 * dynamicRadius;
        const top = y2 * dynamicRadius;
        const zIndex = Math.round((distance + 2) * 100);

        item.style.transform = `translate(-50%, -50%) translate3d(${left}px, ${top}px, 0) scale(${scale})`;
        item.style.opacity = opacity.toString();
        item.style.zIndex = zIndex.toString();
      });

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    updatePositions();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateRadius);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [points, skills]);

  return { containerRef, setNodeRef };
};