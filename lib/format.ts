import type {
  Category,
  Confidence,
  PriorConvictions,
  PunishmentKind,
  Term,
  Unit,
  Verdict,
} from "./types";

/** Выбирает форму слова по числу: 1 год, 2 года, 5 лет. */
export function plural(n: number, one: string, few: string, many: string) {
  const mod100 = Math.abs(n) % 100;
  const mod10 = mod100 % 10;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

/** «30 мес.» → «2 года 6 месяцев» */
export function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0)
    parts.push(`${years} ${plural(years, "год", "года", "лет")}`);
  if (rest > 0)
    parts.push(`${rest} ${plural(rest, "месяц", "месяца", "месяцев")}`);
  return parts.length > 0 ? parts.join(" ") : "0 месяцев";
}

/** Краткая запись срока для таблиц: «2 г. 6 мес.» */
export function formatMonthsShort(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} г.`);
  if (rest > 0) parts.push(`${rest} мес.`);
  return parts.length > 0 ? parts.join(" ") : "—";
}

export function formatHours(hours: number): string {
  return `${hours} ${plural(hours, "час", "часа", "часов")}`;
}

export function formatRub(rub: number): string {
  return `${rub.toLocaleString("ru-RU")} руб.`;
}

export function formatAmount(amount: number, unit: Unit): string {
  if (unit === "months") return formatMonths(amount);
  if (unit === "hours") return formatHours(amount);
  return formatRub(amount);
}

export function formatAmountShort(amount: number, unit: Unit): string {
  if (unit === "months") return formatMonthsShort(amount);
  if (unit === "hours") return `${amount} ч.`;
  return `${(amount / 1000).toLocaleString("ru-RU")} тыс. руб.`;
}

const KIND_NAMES: Record<PunishmentKind, string> = {
  fine: "штраф",
  deprivation_right:
    "лишение права занимать определённые должности или заниматься определённой деятельностью",
  mandatory_works: "обязательные работы",
  corrective_works: "исправительные работы",
  restriction_freedom: "ограничение свободы",
  forced_labor: "принудительные работы",
  arrest: "арест",
  imprisonment: "лишение свободы",
};

const KIND_NAMES_SHORT: Record<PunishmentKind, string> = {
  fine: "штраф",
  deprivation_right: "лишение права",
  mandatory_works: "обязат. работы",
  corrective_works: "исправит. работы",
  restriction_freedom: "огранич. свободы",
  forced_labor: "принудит. работы",
  arrest: "арест",
  imprisonment: "лишение свободы",
};

export function kindName(kind: PunishmentKind): string {
  return KIND_NAMES[kind];
}

export function kindNameShort(kind: PunishmentKind): string {
  return KIND_NAMES_SHORT[kind];
}

/** «лишение свободы 2 года 6 месяцев условно с испытательным сроком 2 года» */
export function formatTerm(term: Term): string {
  const base = `${kindName(term.kind)} ${formatAmount(term.amount, term.unit)}`;
  if (term.suspendedMonths) {
    return `${base} условно с испытательным сроком ${formatMonths(
      term.suspendedMonths,
    )}`;
  }
  return base;
}

export const CATEGORY_NAMES: Record<Category, string> = {
  small: "небольшой тяжести",
  medium: "средней тяжести",
  grave: "тяжкое",
  especially_grave: "особо тяжкое",
};

export const CONFIDENCE_NAMES: Record<Confidence, string> = {
  high: "высокая",
  medium: "средняя",
  low: "низкая",
  none: "не извлечено",
};

export const VERDICT_NAMES: Record<Verdict, string> = {
  ok: "соответствует",
  warning: "замечание",
  violation: "нарушение",
  info: "справка",
};

const VERDICT_COUNT_FORMS: Record<Verdict, [string, string, string]> = {
  ok: [
    "проверка без замечаний",
    "проверки без замечаний",
    "проверок без замечаний",
  ],
  warning: ["замечание", "замечания", "замечаний"],
  violation: ["нарушение", "нарушения", "нарушений"],
  info: ["справка", "справки", "справок"],
};

/** Подпись к числу проверок с нужной формой слова: «2 нарушения», «1 замечание». */
export function verdictCountLabel(verdict: Verdict, count: number): string {
  return plural(count, ...VERDICT_COUNT_FORMS[verdict]);
}

export const PRIOR_CONVICTION_NAMES: Record<PriorConvictions, string> = {
  none: "не судим",
  expunged: "судимости погашены",
  present: "судим",
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

/** «2026-04-18» → «18.04.2026» */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}.${m}.${y}`;
}

const MONTH_GENITIVE = [
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
];

/** «2026-04-18» → «18 апреля 2026 года» */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTH_GENITIVE[Number(m) - 1]} ${y} года`;
}

export function formatDateTime(iso: string): string {
  const date = formatDate(iso);
  const time = iso.slice(11, 16);
  return time ? `${date}, ${time}` : date;
}

/** «158», «2» → «ч. 2 ст. 158 УК РФ» */
export function articleLabel(article: string, part: string): string {
  return part ? `ч. ${part} ст. ${article} УК РФ` : `ст. ${article} УК РФ`;
}

export function formatPercent(share: number, digits = 0): string {
  return `${(share * 100).toFixed(digits)} %`;
}

export function formatSigma(sigma: number): string {
  const sign = sigma > 0 ? "+" : sigma < 0 ? "−" : "";
  return `${sign}${Math.abs(sigma).toFixed(2)} σ`;
}
