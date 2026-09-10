import type { PunishmentKind, SimilarSentence, Unit } from "@/lib/types";

/**
 * Демонстрационная база судебных решений.
 *
 * ВНИМАНИЕ. Выборка синтетическая. Реальные приговоры не использованы: суды,
 * даты и размеры наказаний сгенерированы детерминированно из заданных
 * распределений, чтобы статистика была устойчивой и воспроизводимой. Именно
 * поэтому распределения заданы явными массивами размеров — их видно и можно
 * заменить на выгрузку из реальной базы, не меняя остальной код.
 *
 * Генерация детерминированная (без Math.random), иначе сервер и клиент дали бы
 * разные значения и React сообщил бы о расхождении разметки.
 */

const COURTS: Array<[string, string]> = [
  ["Ленинский районный суд г. Кирова", "Кировская область"],
  ["Октябрьский районный суд г. Кирова", "Кировская область"],
  ["Первомайский районный суд г. Кирова", "Кировская область"],
  ["Слободской районный суд", "Кировская область"],
  ["Ленинский районный суд г. Нижнего Новгорода", "Нижегородская область"],
  ["Автозаводский районный суд г. Нижнего Новгорода", "Нижегородская область"],
  ["Дзержинский городской суд", "Нижегородская область"],
  ["Кировский районный суд г. Казани", "Республика Татарстан"],
  ["Вахитовский районный суд г. Казани", "Республика Татарстан"],
  ["Индустриальный районный суд г. Перми", "Пермский край"],
  ["Свердловский районный суд г. Перми", "Пермский край"],
  ["Октябрьский районный суд г. Екатеринбурга", "Свердловская область"],
  ["Верх-Исетский районный суд г. Екатеринбурга", "Свердловская область"],
  ["Заводоуковский городской суд", "Тюменская область"],
  ["Кировский районный суд г. Уфы", "Республика Башкортостан"],
  ["Советский районный суд г. Челябинска", "Челябинская область"],
];

/** Линейный конгруэнтный генератор: одинаковые числа на сервере и в браузере. */
function makeRandom(seed: number) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

/** Разворачивает [[значение, количество], …] в плоский массив размеров. */
function expand(spec: Array<[number, number]>): number[] {
  const out: number[] = [];
  for (const [value, count] of spec) {
    for (let i = 0; i < count; i += 1) out.push(value);
  }
  return out;
}

interface Distribution {
  article: string;
  kind: PunishmentKind;
  unit: Unit;
  amounts: number[];
  /** Доля условного осуждения в этой группе. */
  suspendedShare: number;
}

/**
 * Распределения назначенных наказаний по статьям. Значения подобраны так,
 * чтобы демонстрационные дела давали разные статистические выводы.
 */
const DISTRIBUTIONS: Distribution[] = [
  {
    article: "ч. 1 ст. 158 УК РФ",
    kind: "corrective_works",
    unit: "months",
    amounts: expand([
      [4, 2],
      [6, 4],
      [8, 8],
      [9, 3],
      [10, 6],
      [12, 5],
    ]),
    suspendedShare: 0,
  },
  {
    article: "ч. 1 ст. 158 УК РФ",
    kind: "fine",
    unit: "rub",
    amounts: expand([
      [15000, 2],
      [20000, 4],
      [25000, 3],
      [30000, 2],
      [40000, 1],
    ]),
    suspendedShare: 0,
  },
  {
    article: "ч. 1 ст. 158 УК РФ",
    kind: "mandatory_works",
    unit: "hours",
    amounts: expand([
      [120, 2],
      [160, 3],
      [200, 2],
      [240, 1],
    ]),
    suspendedShare: 0,
  },
  {
    article: "ч. 1 ст. 158 УК РФ",
    kind: "imprisonment",
    unit: "months",
    amounts: expand([
      [6, 2],
      [8, 2],
      [12, 2],
    ]),
    suspendedShare: 1,
  },
  {
    article: "ч. 2 ст. 228 УК РФ",
    kind: "imprisonment",
    unit: "months",
    amounts: expand([
      [36, 6],
      [42, 5],
      [48, 8],
      [54, 5],
      [60, 6],
      [66, 3],
      [72, 3],
      [84, 2],
      [96, 1],
      [120, 1],
    ]),
    suspendedShare: 0.15,
  },
  {
    article: "ч. 4 ст. 111 УК РФ",
    kind: "imprisonment",
    unit: "months",
    amounts: expand([
      [60, 2],
      [72, 4],
      [78, 3],
      [84, 6],
      [90, 7],
      [96, 5],
      [102, 3],
      [108, 3],
      [120, 2],
      [144, 1],
    ]),
    suspendedShare: 0,
  },
  {
    article: "ч. 1 ст. 116.1 УК РФ",
    kind: "mandatory_works",
    unit: "hours",
    amounts: expand([
      [60, 2],
      [80, 3],
      [100, 4],
      [120, 6],
      [140, 4],
      [160, 5],
      [180, 4],
      [200, 3],
      [240, 2],
    ]),
    suspendedShare: 0,
  },
  {
    article: "ч. 1 ст. 116.1 УК РФ",
    kind: "fine",
    unit: "rub",
    amounts: expand([
      [8000, 3],
      [10000, 4],
      [15000, 3],
      [20000, 2],
      [30000, 1],
    ]),
    suspendedShare: 0,
  },
  {
    article: "ч. 3 ст. 264 УК РФ",
    kind: "imprisonment",
    unit: "months",
    amounts: expand([
      [12, 2],
      [18, 3],
      [24, 6],
      [30, 7],
      [36, 8],
      [42, 4],
      [48, 3],
      [54, 2],
      [60, 2],
    ]),
    suspendedShare: 0.35,
  },
  {
    article: "ч. 3 ст. 264 УК РФ",
    kind: "forced_labor",
    unit: "months",
    amounts: expand([
      [24, 2],
      [30, 3],
      [36, 3],
      [42, 1],
    ]),
    suspendedShare: 0,
  },
];

function buildCorpus(): SimilarSentence[] {
  const random = makeRandom(20260822);
  const out: SimilarSentence[] = [];
  let counter = 0;

  for (const dist of DISTRIBUTIONS) {
    for (const amount of dist.amounts) {
      counter += 1;
      const [court, region] = COURTS[Math.floor(random() * COURTS.length)];
      const year = 2023 + Math.floor(random() * 3);
      const month = 1 + Math.floor(random() * 12);
      const day = 1 + Math.floor(random() * 28);
      out.push({
        id: `S-${String(counter).padStart(4, "0")}`,
        court,
        region,
        date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        article: dist.article,
        kind: dist.kind,
        unit: dist.unit,
        amount,
        suspended: dist.suspendedShare > 0 && random() < dist.suspendedShare,
        mitigating: 1 + Math.floor(random() * 4),
        aggravating: random() < 0.22 ? 1 : 0,
        priorConvictions: random() < 0.3,
        specialOrder: random() < 0.55,
        similarity: 0,
      });
    }
  }

  return out;
}

export const SENTENCES: SimilarSentence[] = buildCorpus();

export const ARTICLES_IN_BASE: string[] = Array.from(
  new Set(SENTENCES.map((s) => s.article)),
).sort();

export const REGIONS_IN_BASE: string[] = Array.from(
  new Set(SENTENCES.map((s) => s.region)),
).sort((a, b) => a.localeCompare(b, "ru"));

export const YEARS_IN_BASE: number[] = Array.from(
  new Set(SENTENCES.map((s) => Number(s.date.slice(0, 4)))),
).sort();
