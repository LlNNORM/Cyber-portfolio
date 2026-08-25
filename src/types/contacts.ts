import type { LucideIcon } from 'lucide-react';

export interface ContactItem {
  id: string;
  name: string;
  value: string;
  url: string;
  icon: LucideIcon;
  color: string;
  descriptionKey: string;
  copyableText?: string;
  qrValue: string;
  qrLabelKey: string;
}

export interface GeneralInfo {
  githubUrl: string;
  githubDisplay: string;
}