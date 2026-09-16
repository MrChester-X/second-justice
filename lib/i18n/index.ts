"use client";

import { useMemo } from "react";
import { createFormat, type Format } from "@/lib/format";
import { useLocale } from "./store";
import { UI, type Dictionary } from "./ui";
import { type LText } from "./text";
import type { Locale } from "./constants";

export type { Locale, Dictionary };

interface I18n {
  locale: Locale;
  /** Словарь интерфейса. */
  t: Dictionary;
  /** Значение из данных на выбранном языке. */
  tr: (value: LText) => string;
  /** Список значений из данных на выбранном языке. */
  trAll: (values: LText[]) => string[];
  /** Форматирование чисел, сроков и дат с учётом языка. */
  f: Format;
}

const FORMATS: Record<Locale, Format> = {
  ru: createFormat("ru"),
  en: createFormat("en"),
};

/**
 * Единая точка доступа к языку в компонентах.
 *
 * Пока состояние не восстановлено из localStorage, возвращается язык по
 * умолчанию: статическая сборка отдаёт русскую разметку всем, и расходиться
 * с ней при гидратации нельзя.
 */
export function useI18n(): I18n {
  const locale = useLocale((state) => state.locale);

  return useMemo(
    () => ({
      locale,
      t: UI[locale],
      tr: (value: LText) => value[locale],
      trAll: (values: LText[]) => values.map((item) => item[locale]),
      f: FORMATS[locale],
    }),
    [locale],
  );
}
