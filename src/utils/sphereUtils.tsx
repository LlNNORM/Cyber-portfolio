import type { LightningBranch } from '../types/skills';
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
export const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Programming': return Code;
    case 'Frontend': return Globe;
    case 'Backend': return Server;
    case 'Database': return Database;
    case 'DevOps': return Settings;
    case 'Styling': return Palette;
    case '3D Graphics': return Cpu;
    case 'Testing': return Terminal;
    case 'Cloud': return Layers;
    case 'Cyber': return Shield;
    default: return Zap;
  }
};

export const generateDetailedLightning = (maxRadius: number): LightningBranch[] => {
  const angle = Math.random() * Math.PI * 2;
  const segments = 8 + Math.floor(Math.random() * 5);
  const branches: LightningBranch[] = [];

  let trunkPath = 'M 0 0';

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const r = maxRadius * t;

    const baseX = Math.cos(angle) * r;
    const baseY = Math.sin(angle) * r;

    const jitter = (Math.random() - 0.5) * 22 * (1 - t * 0.2);

    const nx = baseX + Math.cos(angle + Math.PI / 2) * jitter;
    const ny = baseY + Math.sin(angle + Math.PI / 2) * jitter;

    trunkPath += ` L ${nx} ${ny}`;

    if (i > 1 && i < segments - 1 && Math.random() < 0.45) {
      const branchAngle = angle + (Math.random() - 0.5) * 1.1;
      const branchSegments = 3 + Math.floor(Math.random() * 3);
      const branchLen = 25 + Math.random() * 35;

      let branchPath = `M ${nx} ${ny}`;
      let currBx = nx;
      let currBy = ny;

      for (let b = 1; b <= branchSegments; b++) {
        const bt = b / branchSegments;
        const br = branchLen * bt;

        const bBaseX = nx + Math.cos(branchAngle) * br;
        const bBaseY = ny + Math.sin(branchAngle) * br;
        const bJitter = (Math.random() - 0.5) * 10;

        currBx = bBaseX + Math.cos(branchAngle + Math.PI / 2) * bJitter;
        currBy = bBaseY + Math.sin(branchAngle + Math.PI / 2) * bJitter;

        branchPath += ` L ${currBx} ${currBy}`;

        if (b === 2 && Math.random() < 0.35) {
          const microAngle = branchAngle + (Math.random() - 0.5) * 1.2;
          const microLen = 10 + Math.random() * 15;
          const mx = currBx + Math.cos(microAngle) * microLen;
          const my = currBy + Math.sin(microAngle) * microLen;

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