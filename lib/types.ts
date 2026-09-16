// Модель данных прототипа «Второе мнение».
// Все правовые формулировки живут в lib/data/*, здесь только их форма.
//
// Текстовые поля имеют тип LText: значение хранится сразу на русском и
// английском (см. lib/i18n/text.ts). Обычный string остаётся только там,
// где текст не переводится — это дословная цитата из проверяемого акта и
// текст санкции статьи УК РФ.

import type { LText } from "./i18n/text";

/** Достоверность автоматического извлечения параметра из текста акта. */
export type Confidence = "high" | "medium" | "low" | "none";

/** Значение, извлечённое из документа, вместе с оценкой достоверности. */
export interface Extracted<T> {
  value: T | null;
  confidence: Confidence;
  /**
   * Фрагмент исходного текста, на котором основано извлечение.
   * Приводится на языке документа и не переводится.
   */
  quote?: string;
}

/** Категория преступления по ст. 15 УК РФ. */
export type Category = "small" | "medium" | "grave" | "especially_grave";

/** Вид наказания по ст. 44 УК РФ (используемое подмножество). */
export type PunishmentKind =
  | "fine"
  | "deprivation_right"
  | "mandatory_works"
  | "corrective_works"
  | "restriction_freedom"
  | "forced_labor"
  | "arrest"
  | "imprisonment";

/** Единица измерения размера наказания. */
export type Unit = "months" | "hours" | "rub";

export interface Qualification {
  /** Номер статьи, например «158» или «116.1». */
  article: string;
  /** Номер части; пустая строка, если статья без частей. */
  part: string;
  title: LText;
  category: Category;
  /** Дата совершения деяния — нужна для ст. 9 и 10 УК РФ. */
  commitDate: string;
}

export type PriorConvictions = "none" | "expunged" | "present";

export interface Defendant {
  fio: LText;
  birthDate: string;
  age: number;
  citizenship: LText;
  registration: LText;
  maritalStatus: LText;
  dependents: number;
  employment: LText;
  education: LText;
  priorConvictions: PriorConvictions;
  priorConvictionsNote: LText;
  health: LText;
  /** Рецидив по ст. 18 УК РФ. */
  recidivism: boolean;
}

export interface Circumstance {
  /** Норма-основание, например «п. «и» ч. 1 ст. 61 УК РФ». */
  norm: LText;
  text: LText;
  /** Признано судом в проекте акта. */
  recognized: boolean;
}

export interface Procedure {
  /** Особый порядок, гл. 40 УПК РФ. */
  specialOrder: boolean;
  /** Досудебное соглашение о сотрудничестве, гл. 40.1 УПК РФ. */
  preTrialAgreement: boolean;
  /** Вердикт присяжных — ст. 65 УК РФ. */
  juryVerdict: boolean;
  /** Неоконченное преступление — ст. 66 УК РФ. */
  incomplete: "none" | "preparation" | "attempt";
  /** Активное содействие раскрытию — п. «и» ч. 1 ст. 61, ч. 1 ст. 62 УК РФ. */
  activeCooperation: boolean;
  /** Вред возмещён — п. «к» ч. 1 ст. 61, ст. 76.2 УК РФ. */
  damageCompensated: boolean;
  /** Примирение с потерпевшим — ст. 76 УК РФ. */
  reconciled: boolean;
  /** Преступление совершено впервые. */
  firstOffence: boolean;
}

export interface Term {
  kind: PunishmentKind;
  unit: Unit;
  /** Размер в единицах unit: месяцы, часы или рубли. */
  amount: number;
  /** Условное осуждение по ст. 73 УК РФ: испытательный срок в месяцах. */
  suspendedMonths?: number;
  note?: LText;
}

export interface Punishment {
  main: Term;
  additional: Term[];
}

export interface CaseParams {
  qualification: Extracted<Qualification>;
  defendant: Extracted<Defendant>;
  mitigating: Circumstance[];
  aggravating: Circumstance[];
  procedure: Procedure;
  punishment: Extracted<Punishment>;
}

/** Один вариант наказания в санкции статьи. */
export interface SanctionOption {
  kind: PunishmentKind;
  unit: Unit;
  /** Нижний предел санкции. Если не указан — действует минимум из Общей части. */
  min?: number;
  max: number;
  /** Минимум по Общей части УК РФ, когда санкция его не устанавливает. */
  generalMin?: number;
  /** Обязательное дополнительное наказание. */
  mandatory?: boolean;
}

export interface Sanction {
  key: string;
  /** «ч. 2 ст. 228 УК РФ» */
  label: LText;
  title: LText;
  category: Category;
  /**
   * Текст санкции в редакции, применимой к деянию. Приводится по
   * официальному тексту УК РФ и не переводится.
   */
  text: string;
  edition: LText;
  main: SanctionOption[];
  additional: SanctionOption[];
}

export type Verdict = "ok" | "warning" | "violation" | "info";

export type CheckGroup =
  | "sanction"
  | "special_rules"
  | "additional"
  | "general"
  | "edition"
  | "release"
  | "practice";

export interface Check {
  id: string;
  group: CheckGroup;
  title: LText;
  /** Норма-основание проверки. */
  norm: LText;
  verdict: Verdict;
  /** Вывод одной фразой. */
  summary: LText;
  /** Пошаговый расчёт, каждая строка — один шаг. */
  calculation?: LText[];
  detail: LText;
  /** Идентификаторы позиций из lib/data/practice.ts. */
  practiceRefs?: string[];
}

export interface PracticeItem {
  id: string;
  kind: "plenum" | "presidium" | "review";
  /** «Постановление Пленума ВС РФ от 22.12.2015 № 58» */
  title: LText;
  date: string;
  /** Пункт или раздел. */
  clause: LText;
  articles: LText[];
  excerpt: LText;
}

export interface SimilarSentence {
  id: string;
  court: LText;
  region: LText;
  date: string;
  /** «ч. 2 ст. 228 УК РФ» */
  article: LText;
  kind: PunishmentKind;
  unit: Unit;
  amount: number;
  suspended: boolean;
  mitigating: number;
  aggravating: number;
  priorConvictions: boolean;
  specialOrder: boolean;
  /** Близость к проверяемому делу, 0…1. */
  similarity: number;
}

export interface HistogramBin {
  label: LText;
  from: number;
  to: number;
  count: number;
  /** Корзина, в которую попало проверяемое решение. */
  assigned: boolean;
}

export interface Statistics {
  total: number;
  unit: Unit;
  kind: PunishmentKind;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  mean: number;
  stdDev: number;
  /** Размер, назначенный в проверяемом акте. */
  assigned: number;
  /** Отклонение назначенного размера от медианы в стандартных отклонениях. */
  deviationSigma: number;
  /** Процентиль назначенного размера в выборке. */
  percentile: number;
  /** Доля условного осуждения в выборке, 0…1. */
  suspendedShare: number;
  histogram: HistogramBin[];
}

export interface AttentionArea {
  title: LText;
  text: LText;
  severity: Verdict;
}

export interface Conclusion {
  annotation: LText;
  formalResult: LText;
  practiceResult: LText;
  attentionAreas: AttentionArea[];
  statisticalNote: LText;
  normsUsed: LText[];
}

/** Предел, наложенный правилом Общей части: используется шкалой санкции. */
export interface ScaleLimit {
  /** Значение предела в единицах шкалы. */
  value: number;
  norm: LText;
  label: LText;
}

export interface AnalysisResult {
  sanctionKey: string;
  params: CaseParams;
  checks: Check[];
  similar: SimilarSentence[];
  statistics: Statistics;
  conclusion: Conclusion;
  /** Дополнительные пределы для шкалы санкции (ст. 62, 65, 66, 68 УК РФ). */
  scaleLimits: ScaleLimit[];
}

export type CaseStatus =
  | "draft"
  | "analyzing"
  | "ok"
  | "warnings"
  | "violations";

export interface CaseFile {
  id: string;
  /** Номер дела, например «1-245/2026». */
  number: LText;
  fileName: string;
  fileSize: number;
  pages: number;
  uploadedAt: string;
  status: CaseStatus;
  defendantShort: LText;
  articleShort: LText;
  /** Демонстрационный материал, а не загруженный пользователем файл. */
  demo: boolean;
  analysis: AnalysisResult;
}

export interface Judge {
  fio: LText;
  shortFio: LText;
  position: LText;
  court: LText;
  region: LText;
  chamber: LText;
  experienceYears: number;
  appointedAt: string;
}

/** Стадия имитируемой обработки документа. */
export interface Stage {
  id: string;
  label: LText;
  detail: LText;
  /** Длительность стадии в миллисекундах. */
  duration: number;
}
