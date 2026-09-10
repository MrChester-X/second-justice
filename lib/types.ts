// Модель данных прототипа «Второе мнение».
// Все правовые формулировки живут в lib/data/*, здесь только их форма.

/** Достоверность автоматического извлечения параметра из текста акта. */
export type Confidence = "high" | "medium" | "low" | "none";

/** Значение, извлечённое из документа, вместе с оценкой достоверности. */
export interface Extracted<T> {
  value: T | null;
  confidence: Confidence;
  /** Фрагмент исходного текста, на котором основано извлечение. */
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
  title: string;
  category: Category;
  /** Дата совершения деяния — нужна для ст. 9 и 10 УК РФ. */
  commitDate: string;
}

export type PriorConvictions = "none" | "expunged" | "present";

export interface Defendant {
  fio: string;
  birthDate: string;
  age: number;
  citizenship: string;
  registration: string;
  maritalStatus: string;
  dependents: number;
  employment: string;
  education: string;
  priorConvictions: PriorConvictions;
  priorConvictionsNote: string;
  health: string;
  /** Рецидив по ст. 18 УК РФ. */
  recidivism: boolean;
}

export interface Circumstance {
  /** Норма-основание, например «п. «и» ч. 1 ст. 61 УК РФ». */
  norm: string;
  text: string;
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
  note?: string;
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
  label: string;
  title: string;
  category: Category;
  /** Текст санкции в редакции, применимой к деянию. */
  text: string;
  edition: string;
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
  title: string;
  /** Норма-основание проверки. */
  norm: string;
  verdict: Verdict;
  /** Вывод одной фразой. */
  summary: string;
  /** Пошаговый расчёт, каждая строка — один шаг. */
  calculation?: string[];
  detail: string;
  /** Идентификаторы позиций из lib/data/practice.ts. */
  practiceRefs?: string[];
}

export interface PracticeItem {
  id: string;
  kind: "plenum" | "presidium" | "review";
  /** «Постановление Пленума ВС РФ от 22.12.2015 № 58» */
  title: string;
  date: string;
  /** Пункт или раздел. */
  clause: string;
  articles: string[];
  excerpt: string;
}

export interface SimilarSentence {
  id: string;
  court: string;
  region: string;
  date: string;
  /** «ч. 2 ст. 228 УК РФ» */
  article: string;
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
  label: string;
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
  title: string;
  text: string;
  severity: Verdict;
}

export interface Conclusion {
  annotation: string;
  formalResult: string;
  practiceResult: string;
  attentionAreas: AttentionArea[];
  statisticalNote: string;
  normsUsed: string[];
}

/** Предел, наложенный правилом Общей части: используется шкалой санкции. */
export interface ScaleLimit {
  /** Значение предела в единицах шкалы. */
  value: number;
  norm: string;
  label: string;
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
  number: string;
  fileName: string;
  fileSize: number;
  pages: number;
  uploadedAt: string;
  status: CaseStatus;
  defendantShort: string;
  articleShort: string;
  /** Демонстрационный материал, а не загруженный пользователем файл. */
  demo: boolean;
  analysis: AnalysisResult;
}

export interface Judge {
  fio: string;
  shortFio: string;
  position: string;
  court: string;
  region: string;
  chamber: string;
  experienceYears: number;
  appointedAt: string;
}

/** Стадия имитируемой обработки документа. */
export interface Stage {
  id: string;
  label: string;
  detail: string;
  /** Длительность стадии в миллисекундах. */
  duration: number;
}
