/**
 * Общие константы темы.
 *
 * Файл намеренно без директивы "use client": его читает и серверный
 * app/layout.tsx, а значения, экспортированные из клиентского модуля,
 * приходят в серверный компонент как ссылки на клиентские сущности, а не как
 * сами значения — ключ хранилища подставился бы в inline-скрипт как undefined.
 */

export type ThemeName = "classic" | "arena";

/** Ключ в localStorage. Тот же ключ читает inline-скрипт в app/layout.tsx. */
export const THEME_STORAGE_KEY = "second-justice-theme";

export const DEFAULT_THEME: ThemeName = "classic";
