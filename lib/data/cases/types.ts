import type { CaseParams, Check, Conclusion, ScaleLimit } from "@/lib/types";

/**
 * Демонстрационный материал: один проект судебного акта.
 *
 * Здесь лежат только исходные данные дела, набор проверок и текст
 * заключения. Выборка аналогичных приговоров и статистика не хранятся: они
 * считаются в lib/api/analysis.ts по базе решений, поэтому правка
 * распределений в lib/data/sentences.ts сразу отражается на выводах.
 */
export interface CaseSeed {
  id: string;
  number: string;
  fileName: string;
  fileSize: number;
  pages: number;
  uploadedAt: string;
  sanctionKey: string;
  params: CaseParams;
  checks: Check[];
  scaleLimits: ScaleLimit[];
  conclusion: Conclusion;
}
