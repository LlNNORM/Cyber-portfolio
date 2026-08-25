import { Github, Linkedin, MessageCircle, Mail } from 'lucide-react';
import type { ContactItem } from '../types/contacts';



export const CONTACTS_DATA: ContactItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    value: '@LlNNORM',
    url: 'https://github.com/LlNNORM',
    icon: Github,
    color: '#A020F0',
    descriptionKey: 'contacts.github.description',
    copyableText: 'https://github.com/LlNNORM',
    qrValue: 'https://github.com/LlNNORM',
    qrLabelKey: 'contacts.qr.github'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    value: 'Linnorm Dev',
    url: 'https://www.linkedin.com/in/ivan-ershov-898b02217/',
    icon: Linkedin,
    color: '#00E0FF',
    descriptionKey: 'contacts.linkedin.description',
    copyableText: 'https://www.linkedin.com/in/ivan-ershov-898b02217/',
    qrValue: 'https://www.linkedin.com/in/ivan-ershov-898b02217/',
    qrLabelKey: 'contacts.qr.linkedin'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    value: '@LINN0RM',
    url: 'https://t.me/LINN0RM',
    icon: MessageCircle,
    color: '#0FF4F8',
    descriptionKey: 'contacts.telegram.description',
    copyableText: '@LINN0RM',
    qrValue: 'https://t.me/LINN0RM',
    qrLabelKey: 'contacts.qr.telegram'
  },
  {
    id: 'email',
    name: 'Email',
    value: 'dev@linnorm.cyber',
    url: 'mailto:linnorm@ya.ru',
    icon: Mail,
    color: '#A020F0',
    descriptionKey: 'contacts.email.description',
    copyableText: 'linnorm@ya.ru',
    qrValue: 'mailto:linnorm@ya.ru',
    qrLabelKey: 'contacts.qr.email'
  }
];