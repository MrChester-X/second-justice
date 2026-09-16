import type {
  HistogramBin,
  PunishmentKind,
  SimilarSentence,
  Statistics,
  Unit,
} from "./types";
import { l, type LText } from "./i18n/text";

/** Квантиль по методу линейной интерполяции на отсортированном массиве. */
function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];
  const pos = (sorted.length - 1) * p;
  const low = Math.floor(pos);
  const high = Math.ceil(pos);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (pos - low);
}

/**
 * Округление статистики до целых единиц наказания: дробные месяцы и часы
 * лишены смысла в судебном акте, а «6 г. 10.5 мес.» нечитаемо.
 */
function roundUnit(value: number, unit: Unit): number {
  return unit === "rub" ? Math.round(value / 1000) * 1000 : Math.round(value);
}

/** Ширина корзины гистограммы, кратная «круглому» шагу для этой единицы. */
function binWidth(unit: Unit, span: number): number {
  const raw = span / 8;
  const steps =
    unit === "months"
      ? [1, 2, 3, 6, 12, 24, 36]
      : unit === "hours"
      ? [10, 20, 40, 60, 120]
      : [5000, 10000, 25000, 50000, 100000];
  return steps.find((step) => step >= raw) ?? steps[steps.length - 1];
}

/** Числовая подпись корзины: одинакова на обоих языках. */
function numericLabel(value: number): LText {
  const text = String(value);
  return l(text, text);
}

function buildHistogram(
  amounts: number[],
  assigned: number,
  unit: Unit,
): HistogramBin[] {
  const lo = Math.min(...amounts, assigned);
  const hi = Math.max(...amounts, assigned);
  const width = binWidth(unit, hi - lo || 1);
  const start = Math.floor(lo / width) * width;
  const binCount = Math.max(1, Math.ceil((hi - start + 1) / width));

  const bins: HistogramBin[] = [];
  for (let i = 0; i < binCount; i += 1) {
    const from = start + i * width;
    const to = from + width;
    const isLast = i === binCount - 1;
    bins.push({
      // Подписи корзин числовые, поэтому одинаковы на обоих языках; единица
      // измерения названа в подписи под графиком.
      label: numericLabel(unit === "rub" ? from / 1000 : from),
      from,
      to,
      count: amounts.filter((a) => a >= from && (isLast ? a <= to : a < to))
        .length,
      assigned: assigned >= from && (isLast ? assigned <= to : assigned < to),
    });
  }
  return bins;
}

/**
 * Статистическая справка по выборке аналогичных приговоров.
 * Считается только по приговорам с тем же видом наказания: сравнивать месяцы
 * лишения свободы с рублями штрафа бессмысленно.
 */
export function computeStatistics(
  sentences: SimilarSentence[],
  assigned: number,
  kind: PunishmentKind,
  unit: Unit,
): Statistics {
  const sample = sentences.filter((s) => s.kind === kind);
  const amounts = sample.map((s) => s.amount).sort((a, b) => a - b);

  if (amounts.length === 0) {
    return {
      total: 0,
      unit,
      kind,
      min: assigned,
      q1: assigned,
      median: assigned,
      q3: assigned,
      max: assigned,
      mean: assigned,
      stdDev: 0,
      assigned,
      deviationSigma: 0,
      percentile: 0,
      suspendedShare: 0,
      histogram: [],
    };
  }

  const mean = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  const variance =
    amounts.reduce((sum, a) => sum + (a - mean) ** 2, 0) / amounts.length;
  const stdDev = Math.sqrt(variance);
  const median = quantile(amounts, 0.5);
  const below = amounts.filter((a) => a < assigned).length;
  const equal = amounts.filter((a) => a === assigned).length;

  return {
    total: amounts.length,
    unit,
    kind,
    min: amounts[0],
    // Квантили округляются для отображения; отклонение считается по точной медиане.
    q1: roundUnit(quantile(amounts, 0.25), unit),
    median: roundUnit(median, unit),
    q3: roundUnit(quantile(amounts, 0.75), unit),
    max: amounts[amounts.length - 1],
    mean: roundUnit(mean, unit),
    stdDev,
    assigned,
    deviationSigma: stdDev === 0 ? 0 : (assigned - median) / stdDev,
    percentile: Math.round(((below + equal / 2) / amounts.length) * 100),
    suspendedShare:
      sample.filter((s) => s.suspended).length / Math.max(1, sample.length),
    histogram: buildHistogram(amounts, assigned, unit),
  };
}

export interface SimilarityInput {
  article: string;
  kind: PunishmentKind;
  mitigating: number;
  aggravating: number;
  priorConvictions: boolean;
  specialOrder: boolean;
}

/**
 * Оценка близости приговора к проверяемому делу: совпадение статьи и вида
 * наказания весит больше, чем совпадение обстоятельств.
 */
export function scoreSimilarity(
  sentence: SimilarSentence,
  target: SimilarityInput,
): number {
  let score = 0;
  if (sentence.article.ru === target.article) score += 0.4;
  if (sentence.kind === target.kind) score += 0.2;
  score +=
    0.15 *
    (1 - Math.min(3, Math.abs(sentence.mitigating - target.mitigating)) / 3);
  score += sentence.aggravating === target.aggravating ? 0.1 : 0;
  score += sentence.priorConvictions === target.priorConvictions ? 0.1 : 0;
  score += sentence.specialOrder === target.specialOrder ? 0.05 : 0;
  return Math.round(Math.min(1, score) * 100) / 100;
}

/** Словесная оценка отклонения от медианы практики. */
export function describeDeviation(sigma: number): {
  level: "typical" | "notable" | "strong";
  text: LText;
} {
  const abs = Math.abs(sigma);
  const milder = sigma < 0;

  if (abs < 0.75) {
    return {
      level: "typical",
      text: l(
        "Назначенное наказание находится в пределах обычного разброса по схожим делам.",
        "The punishment imposed lies within the usual spread for comparable cases.",
      ),
    };
  }

  if (abs < 1.5) {
    return {
      level: "notable",
      text: l(
        `Назначенное наказание заметно ${
          milder ? "мягче" : "строже"
        } медианы по схожим делам.`,
        `The punishment imposed is noticeably ${
          milder ? "milder" : "more severe"
        } than the median for comparable cases.`,
      ),
    };
  }

  return {
    level: "strong",
    text: l(
      `Назначенное наказание существенно ${
        milder ? "мягче" : "строже"
      } медианы по схожим делам; отклонение выходит за один стандартный разброс.`,
      `The punishment imposed is substantially ${
        milder ? "milder" : "more severe"
      } than the median for comparable cases; the deviation exceeds one standard deviation.`,
    ),
  };
}
