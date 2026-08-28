import { useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingElement {
  id: number;
  symbol: string;
  x: number;          // % от ширины родителя
  y: number;          // % от высоты родителя
  duration: number;   // секунд на один цикл
  delay: number;      // секунд задержки перед стартом
  fontSize: number;   // в пикселях (или rem)
  color: string;      // цвет (любой валидный CSS)
  opacityBase: number; // базовая прозрачность
  amplitudeY: number; // амплитуда движения по Y (в пикселях)
  amplitudeX: number; // амплитуда движения по X (в пикселях)
  rotate: boolean;    // вращать ли элемент
}

interface FloatingBackgroundProps {
  /** Количество генерируемых элементов (по умолчанию 30) */
  count?: number;
  /** Список символов для выбора (по умолчанию геометрические фигуры) */
  symbols?: string[];
  /** Цвет элементов (можно массив, чтобы случайно выбирать) */
  colors?: string | string[];
  /** Диапазон размера шрифта [min, max] в px */
  fontSizeRange?: [number, number];
  /** Диапазон амплитуды по Y [min, max] в px */
  amplitudeYRange?: [number, number];
  /** Диапазон амплитуды по X [min, max] в px (0 = только по Y) */
  amplitudeXRange?: [number, number];
  /** Диапазон длительности анимации [min, max] в секундах */
  durationRange?: [number, number];
  /** Диапазон задержки [min, max] в секундах */
  delayRange?: [number, number];
  /** Базовая прозрачность (0–1) */
  opacityBase?: number;
  /** Включить вращение (true / false) */
  enableRotation?: boolean;
  /** Дополнительные CSS-классы для контейнера */
  className?: string;
}

/** Вспомогательная функция для случайного числа в диапазоне */
const random = (min: number, max: number) => Math.random() * (max - min) + min;

/** Вспомогательная функция для выбора случайного элемента из массива */
const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({
  count = 30,
  symbols = ["◆", "◇", "▲", "△", "●", "○", "■", "□" , "✧", "✦"],
  colors = "#A020F0",
  fontSizeRange = [20, 40],
  amplitudeYRange = [30, 80],
  amplitudeXRange = [0, 0], // по умолчанию только Y
  durationRange = [10, 30],
  delayRange = [0, 5],
  opacityBase = 0.2,
  enableRotation = true,
  className = "",
}) => {
  // Мемоизируем массив элементов – массив генерируется один раз при монтировании и динамически не меняется
  const elements = useMemo<FloatingElement[]>(() => {
    // Если colors – строка, превращаем в массив из одного элемента
    const colorPalette = Array.isArray(colors) ? colors : [colors];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: pickRandom(symbols),
      x: random(5, 95),          // чтобы не прилипали к краям
      y: random(5, 95),
      fontSize: random(fontSizeRange[0], fontSizeRange[1]),
      color: pickRandom(colorPalette),
      opacityBase: opacityBase,
      amplitudeY: random(amplitudeYRange[0], amplitudeYRange[1]),
      amplitudeX: random(amplitudeXRange[0], amplitudeXRange[1]),
      duration: random(durationRange[0], durationRange[1]),
      delay: random(delayRange[0], delayRange[1]),
      rotate: enableRotation,
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((el) => {
        // Анимация по Y и X (если амплитуда > 0)
        const yMotion = [0, -el.amplitudeY, 0];
        const xMotion = el.amplitudeX > 0 ? [0, el.amplitudeX, 0] : undefined;

        // Анимация прозрачности: плавное изменение
        const opacityMotion = [el.opacityBase, Math.min(el.opacityBase + 0.3, 1), el.opacityBase];

        // Вращение (если включено)
        const rotateMotion = el.rotate ? [0, 180, 360] : undefined;

        return (
          <motion.div
            key={el.id}
            className="absolute will-change-transform"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.fontSize}px`,
              color: el.color,
              opacity: el.opacityBase,
              // Принудительное аппаратное ускорение
              transform: "translateZ(0)",
            }}
            animate={{
              y: yMotion,
              x: xMotion,
              opacity: opacityMotion,
              rotate: rotateMotion,
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {el.symbol}
          </motion.div>
        );
      })}
    </div>
  );
};