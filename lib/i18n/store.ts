"use client";

import { create } from "zustand";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "./constants";

export type { Locale };
export { LOCALE_STORAGE_KEY };

interface LocaleState {
  locale: Locale;
  /**
   * Выбор восстановлен из localStorage. До этого рендерится язык по
   * умолчанию: статическая сборка отдаёт одну и ту же русскую разметку
   * всем, и расходиться с ней при гидратации нельзя.
   */
  hydrated: boolean;
  setLocale: (locale: Locale) => void;
  /** Подхватывает язык, уже выставленный на <html> inline-скриптом. */
  syncFromDocument: () => void;
}

function applyLang(locale: Locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
}

export const useLocale = create<LocaleState>((set) => ({
  locale: DEFAULT_LOCALE,
  hydrated: false,
  setLocale: (locale) => {
    applyLang(locale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Приватный режим или запрет на хранение — выбор просто не запомнится.
    }
    set({ locale });
  },
  syncFromDocument: () => {
    const fromDocument =
      typeof document !== "undefined" && document.documentElement.lang === "en"
        ? "en"
        : DEFAULT_LOCALE;
    applyLang(fromDocument);
    set({ locale: fromDocument, hydrated: true });
  },
}));
