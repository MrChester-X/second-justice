import type {
  AnalysisResult,
  CaseFile,
  CaseStatus,
  Check,
  SimilarSentence,
  Stage,
} from "@/lib/types";
import { CASE_SEEDS, CASE_SEEDS_BY_ID, type CaseSeed } from "@/lib/data/cases";
import { SENTENCES } from "@/lib/data/sentences";
import { getSanction } from "@/lib/data/uk-sanctions";
import { computeStatistics, scoreSimilarity } from "@/lib/stats";
import { articleLabel } from "@/lib/format";

/**
 * Мок-слой. Здесь и только здесь прототип «делает вид», что за интерфейсом
 * есть сервер: функции асинхронные и отвечают с задержкой. Замена мока на
 * реальные вызовы затрагивает этот файл, а не компоненты.
 */

/** Стадии обработки документа, показываемые при загрузке. */
export const ANALYSIS_STAGES: Stage[] = [
  {
    id: "upload",
    label: "Приём документа",
    detail: "Проверка формата и извлечение текстового слоя",
    duration: 500,
  },
  {
    id: "structure",
    label: "Разбор структуры акта",
    detail: "Выделение вводной, описательно-мотивировочной и резолютивной частей",
    duration: 600,
  },
  {
    id: "qualification",
    label: "Извлечение квалификации",
    detail: "Определение статьи, части и даты совершения деяния",
    duration: 550,
  },
  {
    id: "person",
    label: "Извлечение сведений о личности",
    detail: "Возраст, семейное положение, занятость, судимости",
    duration: 500,
  },
  {
    id: "circumstances",
    label: "Извлечение обстоятельств",
    detail: "Смягчающие по ст. 61 УК РФ и отягчающие по ст. 63 УК РФ",
    duration: 600,
  },
  {
    id: "punishment",
    label: "Извлечение назначенного наказания",
    detail: "Вид, размер, дополнительное наказание, условное осуждение",
    duration: 450,
  },
  {
    id: "checks",
    label: "Проверка по нормам и практике",
    detail: "Санкция, правила Общей части, раздел IV УК РФ, разъяснения ВС РФ",
    duration: 750,
  },
  {
    id: "similar",
    label: "Сопоставление с базой судебных решений",
    detail: "Подбор аналогичных приговоров и расчёт отклонений",
    duration: 650,
  },
  {
    id: "conclusion",
    label: "Формирование заключения",
    detail: "Аннотация, результаты проверки, статистическая справка",
    duration: 500,
  },
];

export const TOTAL_ANALYSIS_MS = ANALYSIS_STAGES.reduce(
  (sum, stage) => sum + stage.duration,
  0,
);

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Местное время в формате «2026-08-22T19:18».
 * toISOString даёт UTC, и время загрузки отображалось бы со сдвигом.
 */
function localIsoMinutes(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/** Итоговый статус дела определяется самым тяжёлым вердиктом среди проверок. */
export function statusFromChecks(checks: Check[]): CaseStatus {
  if (checks.some((c) => c.verdict === "violation")) return "violations";
  if (checks.some((c) => c.verdict === "warning")) return "warnings";
  return "ok";
}

export const STATUS_NAMES: Record<CaseStatus, string> = {
  draft: "черновик",
  analyzing: "анализируется",
  ok: "замечаний нет",
  warnings: "есть замечания",
  violations: "выявлены нарушения",
};

/** Подбор аналогичных приговоров по ключевым параметрам дела. */
export function findSimilar(seed: CaseSeed): SimilarSentence[] {
  const qualification = seed.params.qualification.value;
  const punishment = seed.params.punishment.value;
  if (!qualification || !punishment) return [];

  const target = {
    article: articleLabel(qualification.article, qualification.part),
    kind: punishment.main.kind,
    mitigating: seed.params.mitigating.length,
    aggravating: seed.params.aggravating.length,
    priorConvictions:
      seed.params.defendant.value?.priorConvictions === "present",
    specialOrder: seed.params.procedure.specialOrder,
  };

  return SENTENCES.filter((s) => s.article === target.article)
    .map((s) => ({ ...s, similarity: scoreSimilarity(s, target) }))
    .sort((a, b) => b.similarity - a.similarity || a.amount - b.amount);
}

function buildAnalysis(seed: CaseSeed): AnalysisResult {
  const punishment = seed.params.punishment.value;
  const similar = findSimilar(seed);
  const statistics = computeStatistics(
    similar,
    punishment?.main.amount ?? 0,
    punishment?.main.kind ?? "imprisonment",
    punishment?.main.unit ?? "months",
  );

  return {
    sanctionKey: seed.sanctionKey,
    params: seed.params,
    checks: seed.checks,
    similar,
    statistics,
    conclusion: seed.conclusion,
    scaleLimits: seed.scaleLimits,
  };
}

function buildCase(seed: CaseSeed): CaseFile {
  const qualification = seed.params.qualification.value;
  const defendant = seed.params.defendant.value;
  const analysis = buildAnalysis(seed);

  return {
    id: seed.id,
    number: seed.number,
    fileName: seed.fileName,
    fileSize: seed.fileSize,
    pages: seed.pages,
    uploadedAt: seed.uploadedAt,
    status: statusFromChecks(seed.checks),
    defendantShort: defendant ? shortenFio(defendant.fio) : "—",
    articleShort: qualification
      ? articleLabel(qualification.article, qualification.part)
      : "—",
    demo: true,
    analysis,
  };
}

/** «Соколов Артём Владимирович» → «Соколов А. В.» */
export function shortenFio(fio: string): string {
  const [last, first, patronymic] = fio.split(" ");
  const initials = [first, patronymic]
    .filter(Boolean)
    .map((part) => `${part[0]}.`)
    .join(" ");
  return initials ? `${last} ${initials}` : last;
}

/** Реестр демонстрационных дел. */
export const DEMO_CASES: CaseFile[] = CASE_SEEDS.map(buildCase);

export const DEMO_CASES_BY_ID: Record<string, CaseFile> = Object.fromEntries(
  DEMO_CASES.map((item) => [item.id, item]),
);

export function getCase(id: string): CaseFile | undefined {
  return DEMO_CASES_BY_ID[id];
}

export function getSanctionForCase(caseFile: CaseFile) {
  return getSanction(caseFile.analysis.sanctionKey);
}

export interface UploadedFileInfo {
  name: string;
  size: number;
}

/**
 * Имитация разбора загруженного документа.
 *
 * Прототип не извлекает данные из произвольного файла: результат берётся из
 * демонстрационных материалов. Настоящими остаются имя, размер и время
 * загрузки файла — они переносятся в карточку дела, чтобы на демонстрации
 * было видно, какой именно документ обрабатывался.
 */
export async function analyzeDocument(
  file: UploadedFileInfo,
  onStage?: (stageIndex: number) => void,
): Promise<CaseFile> {
  for (let i = 0; i < ANALYSIS_STAGES.length; i += 1) {
    onStage?.(i);
    await delay(ANALYSIS_STAGES[i].duration);
  }

  const base = DEMO_CASES[0];
  const now = localIsoMinutes(new Date());

  return {
    ...base,
    id: `upload-${Date.now()}`,
    number: `б/н от ${now.slice(8, 10)}.${now.slice(5, 7)}.${now.slice(0, 4)}`,
    fileName: file.name,
    fileSize: file.size,
    pages: Math.max(1, Math.round(file.size / 7500)),
    uploadedAt: now,
    demo: false,
  };
}

/** Загрузка демонстрационного материала: те же стадии, готовое дело. */
export async function analyzeDemoCase(
  caseId: string,
  onStage?: (stageIndex: number) => void,
): Promise<CaseFile> {
  for (let i = 0; i < ANALYSIS_STAGES.length; i += 1) {
    onStage?.(i);
    await delay(ANALYSIS_STAGES[i].duration);
  }
  const found = getCase(caseId);
  if (!found) throw new Error(`Демонстрационное дело не найдено: ${caseId}`);
  return found;
}

/** Пересчёт проверок после ручной правки параметров — заглушка. */
export async function recheck(caseFile: CaseFile): Promise<CaseFile> {
  await delay(700);
  return caseFile;
}

export { CASE_SEEDS_BY_ID };
