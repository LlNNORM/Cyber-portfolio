import type { StatItem, AchievementItem } from "../types/achievements";

export const STATS_CONFIG: readonly StatItem[] = [
  { key: "exp", value: "1+", icon: "⚡" },
  { key: "projects", value: "10+", icon: "🚀" },
  { key: "coffee", value: "999+", icon: "☕" },
  { key: "bugs", value: "999+", icon: "🐛" }
] as const;

export const ACHIEVEMENTS_CONFIG: readonly AchievementItem[] = [
  { key: "react", icon: "⚛️", color: "#0FF4F8" },
  { key: "ts", icon: "🔷", color: "#00E0FF" },
  { key: "perf", icon: "⚡", color: "#FFD700" },
  { key: "uiux", icon: "🎨", color: "#A020F0" },
  { key: "solver", icon: "🧠", color: "#00ff41" },
  { key: "team", icon: "🤝", color: "#FF6B35" }
] as const;