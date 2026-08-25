import React, { useState, useEffect } from 'react';
import type { LightningBranch } from '../types/skills';
import { generateDetailedLightning } from '../utils/sphereUtils';

export const EnergyCore: React.FC = () => {
  const [sparks, setSparks] = useState<{ branches: LightningBranch[]; color: string }[]>([]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let clearId: ReturnType<typeof setTimeout>;

    const triggerLightning = () => {
      const lightningCount = 2 + Math.floor(Math.random() * 3);

      const newSparks = Array.from({ length: lightningCount }).map(() => ({
        branches: generateDetailedLightning(130 + Math.random() * 110),
        color: Math.random() > 0.4 ? '#0FF4F8' : '#A020F0',
      }));

      setSparks(newSparks);

      clearId = setTimeout(() => {
        setSparks([]);
      }, 70);

      const nextDelay = 1500 + Math.random() * 1700;
      timeoutId = setTimeout(triggerLightning, nextDelay);
    };

    triggerLightning();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(clearId);
    };
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[150] flex items-center justify-center">
      <svg
        viewBox="-300 -300 600 600"
        className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px] transition-all duration-300"
      >
        <defs>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {sparks.map((spark, i) => (
          <g key={i}>
            {spark.branches.map((branch, j) => (
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
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};