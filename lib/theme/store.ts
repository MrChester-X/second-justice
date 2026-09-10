"use client";

import { create } from "zustand";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type ThemeName,
} from "./constants";

export type { ThemeName };
export { THEME_STORAGE_KEY };

export const THEMES: Array<{
  id: ThemeName;
  short: string;
  title: string;
}> = [
  {
    id: "classic",
    short: "Суд",
    title: "Судебное оформление: светлая тема, строгие таблицы",
  },
  {
    id: "arena",
    short: "Арена",
    title: "Игровое оформление: тёмная тема, скошенные панели",
  },
];

interface ThemeState {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  /**
   * Считывает тему, уже выставленную на <html> inline-скриптом.
   * Нужно потому, что серверная разметка всегда рендерится с темой по
   * умолчанию: цвета применяются до первой отрисовки, а состояние React
   * догоняет их после гидратации.
   */
  syncFromDocument: () => void;
}

/** Тема по умолчанию — судебная: именно её видит жюри при первом открытии. */
export const useTheme = create<ThemeState>((set) => ({
  theme: DEFAULT_THEME,
  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Приватный режим или запрет на хранение — тема просто не запомнится.
    }
    set({ theme });
  },
  syncFromDocument: () =>
    set({
      theme:
        typeof document !== "undefined" &&
        document.documentElement.dataset.theme === "arena"
          ? "arena"
          : DEFAULT_THEME,
    }),
}));
