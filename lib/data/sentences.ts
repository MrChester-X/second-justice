import { l, type LText } from "@/lib/i18n/text";
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

const COURTS: Array<[LText, LText]> = [
  [
    l("Ленинский районный суд г. Кирова", "Leninsky District Court of Kirov"),
    l("Кировская область", "Kirov Region"),
  ],
  [
    l(
      "Октябрьский районный суд г. Кирова",
      "Oktyabrsky District Court of Kirov",
    ),
    l("Кировская область", "Kirov Region"),
  ],
  [
    l(
      "Первомайский районный суд г. Кирова",
      "Pervomaysky District Court of Kirov",
    ),
    l("Кировская область", "Kirov Region"),
  ],
  [
    l("Слободской районный суд", "Slobodskoy District Court"),
    l("Кировская область", "Kirov Region"),
  ],
  [
    l(
      "Ленинский районный суд г. Нижнего Новгорода",
      "Leninsky District Court of Nizhny Novgorod",
    ),
    l("Нижегородская область", "Nizhny Novgorod Region"),
  ],
  [
    l(
      "Автозаводский районный суд г. Нижнего Новгорода",
      "Avtozavodsky District Court of Nizhny Novgorod",
    ),
    l("Нижегородская область", "Nizhny Novgorod Region"),
  ],
  [
    l("Дзержинский городской суд", "Dzerzhinsk City Court"),
    l("Нижегородская область", "Nizhny Novgorod Region"),
  ],
  [
    l("Кировский районный суд г. Казани", "Kirovsky District Court of Kazan"),
    l("Республика Татарстан", "Republic of Tatarstan"),
  ],
  [
    l(
      "Вахитовский районный суд г. Казани",
      "Vakhitovsky District Court of Kazan",
    ),
    l("Республика Татарстан", "Republic of Tatarstan"),
  ],
  [
    l(
      "Индустриальный районный суд г. Перми",
      "Industrialny District Court of Perm",
    ),
    l("Пермский край", "Perm Krai"),
  ],
  [
    l(
      "Свердловский районный суд г. Перми",
      "Sverdlovsky District Court of Perm",
    ),
    l("Пермский край", "Perm Krai"),
  ],
  [
    l(
      "Октябрьский районный суд г. Екатеринбурга",
      "Oktyabrsky District Court of Yekaterinburg",
    ),
    l("Свердловская область", "Sverdlovsk Region"),
  ],
  [
    l(
      "Верх-Исетский районный суд г. Екатеринбурга",
      "Verkh-Isetsky District Court of Yekaterinburg",
    ),
    l("Свердловская область", "Sverdlovsk Region"),
  ],
  [
    l("Заводоуковский городской суд", "Zavodoukovsk City Court"),
    l("Тюменская область", "Tyumen Region"),
  ],
  [
    l("Кировский районный суд г. Уфы", "Kirovsky District Court of Ufa"),
    l("Республика Башкортостан", "Republic of Bashkortostan"),
  ],
  [
    l(
      "Советский районный суд г. Челябинска",
      "Sovetsky District Court of Chelyabinsk",
    ),
    l("Челябинская область", "Chelyabinsk Region"),
  ],
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
  article: LText;
  kind: PunishmentKind;
  unit: Unit;
  amounts: number[];
  /** Доля условного осуждения в этой группе. */
  suspendedShare: number;
}

const ART_158_1 = l("ч. 1 ст. 158 УК РФ", "Art. 158(1) CC RF");
const ART_228_2 = l("ч. 2 ст. 228 УК РФ", "Art. 228(2) CC RF");
const ART_111_4 = l("ч. 4 ст. 111 УК РФ", "Art. 111(4) CC RF");
const ART_116_1 = l("ч. 1 ст. 116.1 УК РФ", "Art. 116.1(1) CC RF");
const ART_264_3 = l("ч. 3 ст. 264 УК РФ", "Art. 264(3) CC RF");

/**
 * Распределения назначенных наказаний по статьям. Значения подобраны так,
 * чтобы демонстрационные дела давали разные статистические выводы.
 */
const DISTRIBUTIONS: Distribution[] = [
  {
    article: ART_158_1,
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
    article: ART_158_1,
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
    article: ART_158_1,
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
    article: ART_158_1,
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
    article: ART_228_2,
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
    article: ART_111_4,
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
    article: ART_116_1,
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
    article: ART_116_1,
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
    article: ART_264_3,
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
    article: ART_264_3,
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
        date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
          2,
          "0",
        )}`,
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

/**
 * Значения фильтров базы решений. Русская строка служит ключом — он не
 * зависит от выбранного языка, поэтому выбранный фильтр переживает
 * переключение языка.
 */
function uniqueBy(values: LText[]): LText[] {
  const seen = new Map<string, LText>();
  for (const value of values) {
    if (!seen.has(value.ru)) seen.set(value.ru, value);
  }
  return [...seen.values()];
}

export const ARTICLES_IN_BASE: LText[] = uniqueBy(
  SENTENCES.map((s) => s.article),
).sort((a, b) => a.ru.localeCompare(b.ru, "ru"));

export const REGIONS_IN_BASE: LText[] = uniqueBy(
  SENTENCES.map((s) => s.region),
).sort((a, b) => a.ru.localeCompare(b.ru, "ru"));

export const YEARS_IN_BASE: number[] = Array.from(
  new Set(SENTENCES.map((s) => Number(s.date.slice(0, 4)))),
).sort();
