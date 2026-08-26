export interface StatItem {
  key: 'exp' | 'projects' | 'coffee' | 'bugs'; // Строгая типизация ключей
  value: string;
  icon: string;
}

export interface AchievementItem {
  key: 'react' | 'ts' | 'perf' | 'uiux' | 'solver' | 'team';
  icon: string;
  color: string;
}