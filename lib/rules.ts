import type {
  Check,
  Sanction,
  SanctionOption,
  ScaleLimit,
  Term,
} from "./types";
import { formatAmount, kindName } from "./format";
import { GENERAL_MINIMUMS } from "./data/uk-sanctions";

/**
 * Живая проверка пределов наказания.
 *
 * В отличие от заранее подготовленных проверок в lib/data/cases.ts, эта
 * считается прямо в браузере из справочника санкций. Она нужна для того, чтобы
 * правка размера наказания на вкладке «Параметры дела» немедленно меняла
 * вердикт: именно так система и должна вести себя при работе судьи с проектом.
 */

export function findOption(
  sanction: Sanction,
  kind: Term["kind"],
): SanctionOption | undefined {
  return sanction.main.find((option) => option.kind === kind);
}

/** Пределы вида наказания: из санкции либо из Общей части. */
export function optionBounds(option: SanctionOption): {
  min: number;
  max: number;
  minFromGeneralPart: boolean;
} {
  const explicit = option.min !== undefined;
  return {
    min: explicit ? (option.min as number) : (option.generalMin ?? 0),
    max: option.max,
    minFromGeneralPart: !explicit,
  };
}

/** Проверка соответствия основного наказания пределам санкции. */
export function checkSanctionBounds(
  sanction: Sanction,
  term: Term,
): Check {
  const option = findOption(sanction, term.kind);

  if (!option) {
    return {
      id: "live-sanction",
      group: "sanction",
      title: "Вид наказания санкцией не предусмотрен",
      norm: sanction.label,
      verdict: "violation",
      summary: `Санкция не предусматривает такой вид наказания, как ${kindName(term.kind)}.`,
      calculation: [
        `Виды наказаний в санкции: ${sanction.main.map((o) => kindName(o.kind)).join(", ")}.`,
        `Назначено: ${kindName(term.kind)}.`,
      ],
      detail:
        "Более мягкий вид наказания, не предусмотренный санкцией, может быть назначен только при применении ст. 64 УК РФ.",
      practiceRefs: ["plenum-58-below-min"],
    };
  }

  const { min, max, minFromGeneralPart } = optionBounds(option);
  const unit = option.unit;
  const calculation = [
    unit === "rub"
      ? `Санкция предусматривает ${kindName(term.kind)} в размере до ${formatAmount(max, unit)}.`
      : `Санкция предусматривает ${kindName(term.kind)} на срок до ${formatAmount(max, unit)}.`,
    minFromGeneralPart
      ? `Нижний предел санкцией не установлен, применяется минимум Общей части — ${GENERAL_MINIMUMS[term.kind] ?? formatAmount(min, unit)}.`
      : `Нижний предел санкции — ${formatAmount(min, unit)}.`,
    `Допустимый диапазон: ${formatAmount(min, unit)} — ${formatAmount(max, unit)}.`,
    `Назначено: ${formatAmount(term.amount, unit)}.`,
  ];

  if (term.amount < min) {
    return {
      id: "live-sanction",
      group: "sanction",
      title: "Наказание назначено ниже низшего предела",
      norm: `${sanction.label}, ст. 64 УК РФ`,
      verdict: "violation",
      summary: `Назначено ${formatAmount(term.amount, unit)} при нижнем пределе ${formatAmount(min, unit)}.`,
      calculation: [
        ...calculation,
        `Отклонение: ${formatAmount(min - term.amount, unit)} ниже допустимого.`,
      ],
      detail:
        "Выход за нижний предел допустим только при применении ст. 64 УК РФ с указанием исключительных обстоятельств и ссылкой на эту норму в приговоре.",
      practiceRefs: ["plenum-58-below-min"],
    };
  }

  if (term.amount > max) {
    return {
      id: "live-sanction",
      group: "sanction",
      title: "Наказание превышает верхний предел санкции",
      norm: sanction.label,
      verdict: "violation",
      summary: `Назначено ${formatAmount(term.amount, unit)} при верхнем пределе ${formatAmount(max, unit)}.`,
      calculation: [
        ...calculation,
        `Превышение: ${formatAmount(term.amount - max, unit)}.`,
      ],
      detail:
        "Выход за верхний предел санкции возможен только по правилам ст. 69 и 70 УК РФ при назначении наказания по совокупности преступлений или приговоров.",
      practiceRefs: ["plenum-58"],
    };
  }

  return {
    id: "live-sanction",
    group: "sanction",
    title: "Наказание находится в пределах санкции статьи",
    norm: sanction.label,
    verdict: "ok",
    summary: `${formatAmount(term.amount, unit)} — внутри допустимого диапазона.`,
    calculation,
    detail:
      "Вид наказания входит в перечень, предусмотренный санкцией, размер не выходит за её пределы и за минимум, установленный Общей частью УК РФ.",
    practiceRefs: ["plenum-58"],
  };
}

/** Проверка пределов, наложенных правилами Общей части (ст. 62, 65, 66, 68 УК РФ). */
export function checkScaleLimits(
  sanction: Sanction,
  term: Term,
  limits: ScaleLimit[],
): Check[] {
  const option = findOption(sanction, term.kind);
  if (!option || limits.length === 0) return [];
  const unit = option.unit;

  return limits.map((limit) => {
    const exceeded = term.amount > limit.value;
    return {
      id: `live-limit-${limit.norm}`,
      group: "special_rules",
      title: exceeded
        ? `Превышен предел, установленный ${limit.norm}`
        : `Предел, установленный ${limit.norm}, соблюдён`,
      norm: limit.norm,
      verdict: exceeded ? "violation" : "ok",
      summary: `Предел ${formatAmount(limit.value, unit)}, назначено ${formatAmount(term.amount, unit)}.`,
      calculation: [
        `${limit.label}: ${formatAmount(limit.value, unit)}.`,
        `Назначено: ${formatAmount(term.amount, unit)}.`,
        exceeded
          ? `Превышение: ${formatAmount(term.amount - limit.value, unit)}.`
          : "Предел соблюдён.",
      ],
      detail: exceeded
        ? "Правило Общей части является императивным: назначенное наказание не может превышать рассчитанный предел. Требуется снижение наказания либо иная квалификация оснований применения правила."
        : "Рассчитанный предел не превышен.",
      practiceRefs: ["plenum-58-art62"],
    };
  });
}
