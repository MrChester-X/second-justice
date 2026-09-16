import type { Locale } from "./i18n/constants";
import type {
  Category,
  Confidence,
  PriorConvictions,
  PunishmentKind,
  Term,
  Unit,
  Verdict,
} from "./types";

/* ------------------------------------------------------------------ */
/* Форматирование зависит от языка сильнее всего остального: русский    */
/* требует трёх форм множественного числа и родительного падежа        */
/* месяца, английский — двух форм и другого порядка слов. Поэтому все   */
/* функции собраны в createFormat(locale), а компоненты получают        */
/* готовый набор через useI18n().f                                     */
/* ------------------------------------------------------------------ */

/** Выбирает русскую форму слова по числу: 1 год, 2 года, 5 лет. */
export function plural(n: number, one: string, few: string, many: string) {
  const mod100 = Math.abs(n) % 100;
  const mod10 = mod100 % 10;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

/** Английская форма: единственное число только при 1. */
export function pluralEn(n: number, one: string, many: string) {
  return Math.abs(n) === 1 ? one : many;
}

const KIND_NAMES: Record<Locale, Record<PunishmentKind, string>> = {
  ru: {
    fine: "штраф",
    deprivation_right:
      "лишение права занимать определённые должности или заниматься определённой деятельностью",
    mandatory_works: "обязательные работы",
    corrective_works: "исправительные работы",
    restriction_freedom: "ограничение свободы",
    forced_labor: "принудительные работы",
    arrest: "арест",
    imprisonment: "лишение свободы",
  },
  en: {
    fine: "fine",
    deprivation_right:
      "deprivation of the right to hold certain positions or engage in certain activities",
    mandatory_works: "compulsory community service",
    corrective_works: "corrective labour",
    restriction_freedom: "restriction of liberty",
    forced_labor: "forced labour",
    arrest: "arrest",
    imprisonment: "deprivation of liberty",
  },
};

const KIND_NAMES_SHORT: Record<Locale, Record<PunishmentKind, string>> = {
  ru: {
    fine: "штраф",
    deprivation_right: "лишение права",
    mandatory_works: "обязат. работы",
    corrective_works: "исправит. работы",
    restriction_freedom: "огранич. свободы",
    forced_labor: "принудит. работы",
    arrest: "арест",
    imprisonment: "лишение свободы",
  },
  en: {
    fine: "fine",
    deprivation_right: "disqualification",
    mandatory_works: "community service",
    corrective_works: "corrective labour",
    restriction_freedom: "restricted liberty",
    forced_labor: "forced labour",
    arrest: "arrest",
    imprisonment: "imprisonment",
  },
};

const CATEGORY_NAMES: Record<Locale, Record<Category, string>> = {
  ru: {
    small: "небольшой тяжести",
    medium: "средней тяжести",
    grave: "тяжкое",
    especially_grave: "особо тяжкое",
  },
  en: {
    small: "minor",
    medium: "of medium gravity",
    grave: "grave",
    especially_grave: "especially grave",
  },
};

const CONFIDENCE_NAMES: Record<Locale, Record<Confidence, string>> = {
  ru: {
    high: "высокая",
    medium: "средняя",
    low: "низкая",
    none: "не извлечено",
  },
  en: {
    high: "high",
    medium: "medium",
    low: "low",
    none: "not extracted",
  },
};

const VERDICT_NAMES: Record<Locale, Record<Verdict, string>> = {
  ru: {
    ok: "соответствует",
    warning: "замечание",
    violation: "нарушение",
    info: "справка",
  },
  en: {
    ok: "compliant",
    warning: "caveat",
    violation: "violation",
    info: "note",
  },
};

const VERDICT_COUNT_RU: Record<Verdict, [string, string, string]> = {
  ok: [
    "проверка без замечаний",
    "проверки без замечаний",
    "проверок без замечаний",
  ],
  warning: ["замечание", "замечания", "замечаний"],
  violation: ["нарушение", "нарушения", "нарушений"],
  info: ["справка", "справки", "справок"],
};

const VERDICT_COUNT_EN: Record<Verdict, [string, string]> = {
  ok: ["check without caveats", "checks without caveats"],
  warning: ["caveat", "caveats"],
  violation: ["violation", "violations"],
  info: ["note", "notes"],
};

const PRIOR_CONVICTION_NAMES: Record<
  Locale,
  Record<PriorConvictions, string>
> = {
  ru: {
    none: "не судим",
    expunged: "судимости погашены",
    present: "судим",
  },
  en: {
    none: "no prior convictions",
    expunged: "prior convictions expunged",
    present: "has prior convictions",
  },
};

/* Родительный падеж для русской даты: «18 апреля 2026 года». */
const MONTH_NAMES: Record<Locale, string[]> = {
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const GROUPING: Record<Locale, string> = { ru: "ru-RU", en: "en-US" };

export function createFormat(locale: Locale) {
  const ru = locale === "ru";

  /** «30 мес.» → «2 года 6 месяцев» / «2 years 6 months» */
  function months(value: number): string {
    const years = Math.floor(value / 12);
    const rest = value % 12;
    const parts: string[] = [];
    if (years > 0) {
      parts.push(
        ru
          ? `${years} ${plural(years, "год", "года", "лет")}`
          : `${years} ${pluralEn(years, "year", "years")}`,
      );
    }
    if (rest > 0) {
      parts.push(
        ru
          ? `${rest} ${plural(rest, "месяц", "месяца", "месяцев")}`
          : `${rest} ${pluralEn(rest, "month", "months")}`,
      );
    }
    if (parts.length > 0) return parts.join(" ");
    return ru ? "0 месяцев" : "0 months";
  }

  /** Краткая запись срока для таблиц: «2 г. 6 мес.» / «2y 6m» */
  function monthsShort(value: number): string {
    const years = Math.floor(value / 12);
    const rest = value % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(ru ? `${years} г.` : `${years}y`);
    if (rest > 0) parts.push(ru ? `${rest} мес.` : `${rest}m`);
    return parts.length > 0 ? parts.join(" ") : "—";
  }

  function hours(value: number): string {
    return ru
      ? `${value} ${plural(value, "час", "часа", "часов")}`
      : `${value} ${pluralEn(value, "hour", "hours")}`;
  }

  function rub(value: number): string {
    const grouped = value.toLocaleString(GROUPING[locale]);
    return ru ? `${grouped} руб.` : `RUB ${grouped}`;
  }

  function amount(value: number, unit: Unit): string {
    if (unit === "months") return months(value);
    if (unit === "hours") return hours(value);
    return rub(value);
  }

  function amountShort(value: number, unit: Unit): string {
    if (unit === "months") return monthsShort(value);
    if (unit === "hours") return ru ? `${value} ч.` : `${value}h`;
    const thousands = (value / 1000).toLocaleString(GROUPING[locale]);
    return ru ? `${thousands} тыс. руб.` : `RUB ${thousands}k`;
  }

  function kind(value: PunishmentKind): string {
    return KIND_NAMES[locale][value];
  }

  function kindShort(value: PunishmentKind): string {
    return KIND_NAMES_SHORT[locale][value];
  }

  /** «лишение свободы 2 года условно с испытательным сроком 2 года» */
  function term(value: Term): string {
    const base = `${kind(value.kind)} ${amount(value.amount, value.unit)}`;
    if (!value.suspendedMonths) return base;
    return ru
      ? `${base} условно с испытательным сроком ${months(
          value.suspendedMonths,
        )}`
      : `${base}, suspended with a probation period of ${months(
          value.suspendedMonths,
        )}`;
  }

  function category(value: Category): string {
    return CATEGORY_NAMES[locale][value];
  }

  function confidence(value: Confidence): string {
    return CONFIDENCE_NAMES[locale][value];
  }

  function verdict(value: Verdict): string {
    return VERDICT_NAMES[locale][value];
  }

  /** Подпись к числу проверок: «2 нарушения» / «2 violations». */
  function verdictCount(value: Verdict, count: number): string {
    return ru
      ? plural(count, ...VERDICT_COUNT_RU[value])
      : pluralEn(count, ...VERDICT_COUNT_EN[value]);
  }

  function priorConvictions(value: PriorConvictions): string {
    return PRIOR_CONVICTION_NAMES[locale][value];
  }

  function fileSize(bytes: number): string {
    if (bytes < 1024) return ru ? `${bytes} Б` : `${bytes} B`;
    if (bytes < 1024 * 1024) {
      const kb = Math.round(bytes / 1024);
      return ru ? `${kb} КБ` : `${kb} KB`;
    }
    const mb = (bytes / (1024 * 1024)).toFixed(1);
    return ru ? `${mb} МБ` : `${mb} MB`;
  }

  /** «2026-04-18» → «18.04.2026» */
  function date(iso: string): string {
    const [y, m, d] = iso.slice(0, 10).split("-");
    return `${d}.${m}.${y}`;
  }

  /** «2026-04-18» → «18 апреля 2026 года» / «18 April 2026» */
  function dateLong(iso: string): string {
    const [y, m, d] = iso.slice(0, 10).split("-");
    const month = MONTH_NAMES[locale][Number(m) - 1];
    return ru
      ? `${Number(d)} ${month} ${y} года`
      : `${Number(d)} ${month} ${y}`;
  }

  function dateTime(iso: string): string {
    const day = date(iso);
    const time = iso.slice(11, 16);
    return time ? `${day}, ${time}` : day;
  }

  /** «158», «2» → «ч. 2 ст. 158 УК РФ» / «Art. 158(2) CC RF» */
  function article(articleNumber: string, part: string): string {
    if (ru) {
      return part
        ? `ч. ${part} ст. ${articleNumber} УК РФ`
        : `ст. ${articleNumber} УК РФ`;
    }
    return part
      ? `Art. ${articleNumber}(${part}) CC RF`
      : `Art. ${articleNumber} CC RF`;
  }

  function percent(share: number, digits = 0): string {
    const value = (share * 100).toFixed(digits);
    return ru ? `${value} %` : `${value}%`;
  }

  function sigma(value: number): string {
    const sign = value > 0 ? "+" : value < 0 ? "−" : "";
    return `${sign}${Math.abs(value).toFixed(2)} σ`;
  }

  return {
    locale,
    months,
    monthsShort,
    hours,
    rub,
    amount,
    amountShort,
    kind,
    kindShort,
    term,
    category,
    confidence,
    verdict,
    verdictCount,
    priorConvictions,
    fileSize,
    date,
    dateLong,
    dateTime,
    article,
    percent,
    sigma,
  };
}

export type Format = ReturnType<typeof createFormat>;

/** Готовые наборы: нужны там, где строка собирается сразу на двух языках. */
export const FORMAT: Record<Locale, Format> = {
  ru: createFormat("ru"),
  en: createFormat("en"),
};
