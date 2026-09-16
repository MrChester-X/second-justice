import { CASE_158 } from "./case-158";
import { CASE_228 } from "./case-228";
import { CASE_111 } from "./case-111";
import { CASE_116 } from "./case-116";
import { CASE_264 } from "./case-264";
import type { CaseSeed } from "./types";

export type { CaseSeed };

/**
 * Демонстрационные материалы: пять проектов судебных актов, дающих разные
 * результаты проверки. Каждое дело лежит в своём файле — иначе набор
 * правовых формулировок на двух языках был бы нечитаемым.
 */
export const CASE_SEEDS: CaseSeed[] = [
  CASE_158,
  CASE_228,
  CASE_111,
  CASE_116,
  CASE_264,
];

export const CASE_SEEDS_BY_ID: Record<string, CaseSeed> = Object.fromEntries(
  CASE_SEEDS.map((seed) => [seed.id, seed]),
);
