import type { Locale } from "./constants";

/**
 * Двуязычное значение.
 *
 * Правовые данные лежат в lib/data/ сразу на двух языках: пропущенный
 * перевод — ошибка типизации, а не находка на демонстрации.
 */
export interface LText {
  ru: string;
  en: string;
}

/** Короткая запись двуязычного значения: l("Кража", "Theft"). */
export function l(ru: string, en: string): LText {
  return { ru, en };
}

/** Значение на выбранном языке. */
export function tr(value: LText, locale: Locale): string {
  return value[locale];
}

export function trAll(values: LText[], locale: Locale): string[] {
  return values.map((item) => item[locale]);
}
