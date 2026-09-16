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
import { FORMAT } from "@/lib/format";
import { l, type LText } from "@/lib/i18n/text";

/**
 * Мок-слой. Здесь и только здесь прототип «делает вид», что за интерфейсом
 * есть сервер: функции асинхронные и отвечают с задержкой. Замена мока на
 * реальные вызовы затрагивает этот файл, а не компоненты.
 */

/** Стадии обработки документа, показываемые при загрузке. */
export const ANALYSIS_STAGES: Stage[] = [
  {
    id: "upload",
    label: l("Приём документа", "Receiving the document"),
    detail: l(
      "Проверка формата и извлечение текстового слоя",
      "Checking the format and extracting the text layer",
    ),
    duration: 500,
  },
  {
    id: "structure",
    label: l("Разбор структуры акта", "Parsing the structure of the judgment"),
    detail: l(
      "Выделение вводной, описательно-мотивировочной и резолютивной частей",
      "Identifying the introductory, reasoning and operative parts",
    ),
    duration: 600,
  },
  {
    id: "qualification",
    label: l("Извлечение квалификации", "Extracting the legal classification"),
    detail: l(
      "Определение статьи, части и даты совершения деяния",
      "Determining the article, the part and the date of the act",
    ),
    duration: 550,
  },
  {
    id: "person",
    label: l("Извлечение сведений о личности", "Extracting personal details"),
    detail: l(
      "Возраст, семейное положение, занятость, судимости",
      "Age, marital status, employment, prior convictions",
    ),
    duration: 500,
  },
  {
    id: "circumstances",
    label: l("Извлечение обстоятельств", "Extracting the circumstances"),
    detail: l(
      "Смягчающие по ст. 61 УК РФ и отягчающие по ст. 63 УК РФ",
      "Mitigating under Art. 61 CC RF and aggravating under Art. 63 CC RF",
    ),
    duration: 600,
  },
  {
    id: "punishment",
    label: l(
      "Извлечение назначенного наказания",
      "Extracting the punishment imposed",
    ),
    detail: l(
      "Вид, размер, дополнительное наказание, условное осуждение",
      "Type, amount, additional punishment, suspended sentence",
    ),
    duration: 450,
  },
  {
    id: "checks",
    label: l(
      "Проверка по нормам и практике",
      "Checking against the law and practice",
    ),
    detail: l(
      "Санкция, правила Общей части, раздел IV УК РФ, разъяснения ВС РФ",
      "The sanction, the General Part rules, Section IV CC RF, Supreme Court guidance",
    ),
    duration: 750,
  },
  {
    id: "similar",
    label: l(
      "Сопоставление с базой судебных решений",
      "Matching against the database of judgments",
    ),
    detail: l(
      "Подбор аналогичных приговоров и расчёт отклонений",
      "Selecting comparable judgments and computing deviations",
    ),
    duration: 650,
  },
  {
    id: "conclusion",
    label: l("Формирование заключения", "Preparing the opinion"),
    detail: l(
      "Аннотация, результаты проверки, статистическая справка",
      "Summary, check results, statistical note",
    ),
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

export const STATUS_NAMES: Record<CaseStatus, LText> = {
  draft: l("черновик", "draft"),
  analyzing: l("анализируется", "in analysis"),
  ok: l("замечаний нет", "no findings"),
  warnings: l("есть замечания", "caveats found"),
  violations: l("выявлены нарушения", "violations found"),
};

const EM_DASH = l("—", "—");

/** Подбор аналогичных приговоров по ключевым параметрам дела. */
export function findSimilar(seed: CaseSeed): SimilarSentence[] {
  const qualification = seed.params.qualification.value;
  const punishment = seed.params.punishment.value;
  if (!qualification || !punishment) return [];

  const target = {
    /* Русская запись статьи служит ключом сопоставления: она не зависит
       от выбранного языка интерфейса. */
    article: FORMAT.ru.article(qualification.article, qualification.part),
    kind: punishment.main.kind,
    mitigating: seed.params.mitigating.length,
    aggravating: seed.params.aggravating.length,
    priorConvictions:
      seed.params.defendant.value?.priorConvictions === "present",
    specialOrder: seed.params.procedure.specialOrder,
  };

  return SENTENCES.filter((s) => s.article.ru === target.article)
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
    number: l(seed.number, seed.number),
    fileName: seed.fileName,
    fileSize: seed.fileSize,
    pages: seed.pages,
    uploadedAt: seed.uploadedAt,
    status: statusFromChecks(seed.checks),
    defendantShort: defendant ? shortenFio(defendant.fio) : EM_DASH,
    articleShort: qualification
      ? l(
          FORMAT.ru.article(qualification.article, qualification.part),
          FORMAT.en.article(qualification.article, qualification.part),
        )
      : EM_DASH,
    demo: true,
    analysis,
  };
}

function shortenOne(fio: string): string {
  const [last, first, patronymic] = fio.split(" ");
  const initials = [first, patronymic]
    .filter(Boolean)
    .map((part) => `${part[0]}.`)
    .join(" ");
  return initials ? `${last} ${initials}` : last;
}

/** «Соколов Артём Владимирович» → «Соколов А. В.» */
export function shortenFio(fio: LText): LText {
  return l(shortenOne(fio.ru), shortenOne(fio.en));
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
  const day = `${now.slice(8, 10)}.${now.slice(5, 7)}.${now.slice(0, 4)}`;

  return {
    ...base,
    id: `upload-${Date.now()}`,
    number: l(`б/н от ${day}`, `unnumbered, ${day}`),
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
