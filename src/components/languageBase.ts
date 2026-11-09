import { createContext } from "react";

export type Language = "en" | "ru";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Возвращает строку по ключу вида "a.b.c" (или сам ключ, если перевод не найден). */
  t: (key: string) => string;
  /** Возвращает массив строк по ключу (пустой массив, если перевод не найден). */
  tArray: (key: string) => string[];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
