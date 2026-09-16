/**
 * Общие константы языка.
 *
 * Файл намеренно без директивы "use client": его читает и серверный
 * app/layout.tsx, а значения, экспортированные из клиентского модуля,
 * приходят в серверный компонент как ссылки на клиентские сущности, а не
 * как сами значения — ключ хранилища подставился бы в inline-скрипт как
 * undefined.
 */

export type Locale = "ru" | "en";

/** Ключ в localStorage. Тот же ключ читает inline-скрипт в app/layout.tsx. */
export const LOCALE_STORAGE_KEY = "second-justice-locale";

/** Язык по умолчанию — русский: интерфейс судебной системы. */
export const DEFAULT_LOCALE: Locale = "ru";

export const LOCALES: Array<{ id: Locale; short: string; title: string }> = [
  { id: "ru", short: "RU", title: "Русский язык интерфейса" },
  { id: "en", short: "EN", title: "English interface" },
];
