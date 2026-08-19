import { useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingBackgroundProps {
  count?: number; // сколько элементов генерировать
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({
  count = 6,
}) => {
  const elements = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      size: random(80, 200),
      x: `${random(5, 90)}%`,
      y: `${random(5, 90)}%`,
      color: [
        "bg-pink-400/20",
        "bg-blue-400/25",
        "bg-purple-400/20",
        "bg-cyan-400/20",
        "bg-emerald-400/15",
      ][random(0, 4)],
      floatRange: random(20, 60),
      duration: random(8, 15),
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${el.color}`}
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
          }}
          animate={{
            y: [-el.floatRange, el.floatRange, -el.floatRange],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
