import type {
  Check,
  Sanction,
  SanctionOption,
  ScaleLimit,
  Term,
} from "./types";
import { FORMAT, type Format } from "./format";
import { l, type LText } from "./i18n/text";
import type { Locale } from "./i18n/constants";
import { GENERAL_MINIMUMS } from "./data/uk-sanctions";

/**
 * Живая проверка пределов наказания.
 *
 * В отличие от заранее подготовленных проверок в lib/data/cases/, эта
 * считается прямо в браузере из справочника санкций. Она нужна для того, чтобы
 * правка размера наказания на вкладке «Параметры дела» немедленно меняла
 * вердикт: именно так система и должна вести себя при работе судьи с проектом.
 *
 * Строки собираются сразу на двух языках: проверка попадает в те же поля
 * модели, что и подготовленные, и не может быть привязана к одному языку.
 */

/** Собирает двуязычное значение, повторяя шаблон для каждого языка. */
function both(make: (f: Format, locale: Locale) => string): LText {
  return { ru: make(FORMAT.ru, "ru"), en: make(FORMAT.en, "en") };
}

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
    min: explicit ? (option.min as number) : option.generalMin ?? 0,
    max: option.max,
    minFromGeneralPart: !explicit,
  };
}

/** Проверка соответствия основного наказания пределам санкции. */
export function checkSanctionBounds(sanction: Sanction, term: Term): Check {
  const option = findOption(sanction, term.kind);

  if (!option) {
    return {
      id: "live-sanction",
      group: "sanction",
      title: l(
        "Вид наказания санкцией не предусмотрен",
        "The sanction does not provide for this type of punishment",
      ),
      norm: sanction.label,
      verdict: "violation",
      summary: both((f, loc) =>
        loc === "ru"
          ? `Санкция не предусматривает такой вид наказания, как ${f.kind(
              term.kind,
            )}.`
          : `The sanction does not provide for ${f.kind(term.kind)}.`,
      ),
      calculation: [
        both((f, loc) =>
          loc === "ru"
            ? `Виды наказаний в санкции: ${sanction.main
                .map((o) => f.kind(o.kind))
                .join(", ")}.`
            : `Types of punishment in the sanction: ${sanction.main
                .map((o) => f.kind(o.kind))
                .join(", ")}.`,
        ),
        both((f, loc) =>
          loc === "ru"
            ? `Назначено: ${f.kind(term.kind)}.`
            : `Imposed: ${f.kind(term.kind)}.`,
        ),
      ],
      detail: l(
        "Более мягкий вид наказания, не предусмотренный санкцией, может быть назначен только при применении ст. 64 УК РФ.",
        "A milder type of punishment not provided by the sanction may be imposed only under Art. 64 CC RF.",
      ),
      practiceRefs: ["plenum-58-below-min"],
    };
  }

  const { min, max, minFromGeneralPart } = optionBounds(option);
  const unit = option.unit;

  const calculation: LText[] = [
    both((f, loc) => {
      const amount = f.amount(max, unit);
      const kind = f.kind(term.kind);
      if (loc === "ru") {
        return unit === "rub"
          ? `Санкция предусматривает ${kind} в размере до ${amount}.`
          : `Санкция предусматривает ${kind} на срок до ${amount}.`;
      }
      return `The sanction provides for ${kind} of up to ${amount}.`;
    }),
    both((f, loc) => {
      if (minFromGeneralPart) {
        const general =
          GENERAL_MINIMUMS[term.kind]?.[loc] ?? f.amount(min, unit);
        return loc === "ru"
          ? `Нижний предел санкцией не установлен, применяется минимум Общей части — ${general}.`
          : `The sanction sets no lower limit, so the General Part minimum applies — ${general}.`;
      }
      return loc === "ru"
        ? `Нижний предел санкции — ${f.amount(min, unit)}.`
        : `Lower limit of the sanction: ${f.amount(min, unit)}.`;
    }),
    both((f, loc) =>
      loc === "ru"
        ? `Допустимый диапазон: ${f.amount(min, unit)} — ${f.amount(
            max,
            unit,
          )}.`
        : `Permissible range: ${f.amount(min, unit)} — ${f.amount(max, unit)}.`,
    ),
    both((f, loc) =>
      loc === "ru"
        ? `Назначено: ${f.amount(term.amount, unit)}.`
        : `Imposed: ${f.amount(term.amount, unit)}.`,
    ),
  ];

  if (term.amount < min) {
    return {
      id: "live-sanction",
      group: "sanction",
      title: l(
        "Наказание назначено ниже низшего предела",
        "The punishment is below the lower limit",
      ),
      norm: both((f, loc) =>
        loc === "ru"
          ? `${sanction.label.ru}, ст. 64 УК РФ`
          : `${sanction.label.en}, Art. 64 CC RF`,
      ),
      verdict: "violation",
      summary: both((f, loc) =>
        loc === "ru"
          ? `Назначено ${f.amount(
              term.amount,
              unit,
            )} при нижнем пределе ${f.amount(min, unit)}.`
          : `Imposed: ${f.amount(
              term.amount,
              unit,
            )}, while the lower limit is ${f.amount(min, unit)}.`,
      ),
      calculation: [
        ...calculation,
        both((f, loc) =>
          loc === "ru"
            ? `Отклонение: ${f.amount(
                min - term.amount,
                unit,
              )} ниже допустимого.`
            : `Shortfall: ${f.amount(
                min - term.amount,
                unit,
              )} below the permissible minimum.`,
        ),
      ],
      detail: l(
        "Выход за нижний предел допустим только при применении ст. 64 УК РФ с указанием исключительных обстоятельств и ссылкой на эту норму в приговоре.",
        "Going below the lower limit is permissible only under Art. 64 CC RF, stating the exceptional circumstances and referring to that provision in the judgment.",
      ),
      practiceRefs: ["plenum-58-below-min"],
    };
  }

  if (term.amount > max) {
    return {
      id: "live-sanction",
      group: "sanction",
      title: l(
        "Наказание превышает верхний предел санкции",
        "The punishment exceeds the upper limit of the sanction",
      ),
      norm: sanction.label,
      verdict: "violation",
      summary: both((f, loc) =>
        loc === "ru"
          ? `Назначено ${f.amount(
              term.amount,
              unit,
            )} при верхнем пределе ${f.amount(max, unit)}.`
          : `Imposed: ${f.amount(
              term.amount,
              unit,
            )}, while the upper limit is ${f.amount(max, unit)}.`,
      ),
      calculation: [
        ...calculation,
        both((f, loc) =>
          loc === "ru"
            ? `Превышение: ${f.amount(term.amount - max, unit)}.`
            : `Excess: ${f.amount(term.amount - max, unit)}.`,
        ),
      ],
      detail: l(
        "Выход за верхний предел санкции возможен только по правилам ст. 69 и 70 УК РФ при назначении наказания по совокупности преступлений или приговоров.",
        "The upper limit of the sanction may be exceeded only under Arts. 69 and 70 CC RF, when sentencing for multiple offences or judgments.",
      ),
      practiceRefs: ["plenum-58"],
    };
  }

  return {
    id: "live-sanction",
    group: "sanction",
    title: l(
      "Наказание находится в пределах санкции статьи",
      "The punishment is within the limits of the sanction",
    ),
    norm: sanction.label,
    verdict: "ok",
    summary: both((f, loc) =>
      loc === "ru"
        ? `${f.amount(term.amount, unit)} — внутри допустимого диапазона.`
        : `${f.amount(term.amount, unit)} — within the permissible range.`,
    ),
    calculation,
    detail: l(
      "Вид наказания входит в перечень, предусмотренный санкцией, размер не выходит за её пределы и за минимум, установленный Общей частью УК РФ.",
      "The type of punishment is among those listed in the sanction, and the amount stays within its limits and above the minimum set by the General Part of the Criminal Code.",
    ),
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
      id: `live-limit-${limit.norm.ru}`,
      group: "special_rules",
      title: both((f, loc) => {
        if (loc === "ru") {
          return exceeded
            ? `Превышен предел, установленный ${limit.norm.ru}`
            : `Предел, установленный ${limit.norm.ru}, соблюдён`;
        }
        return exceeded
          ? `The ceiling set by ${limit.norm.en} is exceeded`
          : `The ceiling set by ${limit.norm.en} is observed`;
      }),
      norm: limit.norm,
      verdict: exceeded ? "violation" : "ok",
      summary: both((f, loc) =>
        loc === "ru"
          ? `Предел ${f.amount(limit.value, unit)}, назначено ${f.amount(
              term.amount,
              unit,
            )}.`
          : `Ceiling: ${f.amount(limit.value, unit)}; imposed: ${f.amount(
              term.amount,
              unit,
            )}.`,
      ),
      calculation: [
        both(
          (f, loc) =>
            `${loc === "ru" ? limit.label.ru : limit.label.en}: ${f.amount(
              limit.value,
              unit,
            )}.`,
        ),
        both((f, loc) =>
          loc === "ru"
            ? `Назначено: ${f.amount(term.amount, unit)}.`
            : `Imposed: ${f.amount(term.amount, unit)}.`,
        ),
        both((f, loc) => {
          if (!exceeded)
            return loc === "ru"
              ? "Предел соблюдён."
              : "The ceiling is observed.";
          return loc === "ru"
            ? `Превышение: ${f.amount(term.amount - limit.value, unit)}.`
            : `Excess: ${f.amount(term.amount - limit.value, unit)}.`;
        }),
      ],
      detail: exceeded
        ? l(
            "Правило Общей части является императивным: назначенное наказание не может превышать рассчитанный предел. Требуется снижение наказания либо иная квалификация оснований применения правила.",
            "The General Part rule is mandatory: the punishment imposed may not exceed the calculated ceiling. Either the punishment must be reduced or the grounds for applying the rule reassessed.",
          )
        : l(
            "Рассчитанный предел не превышен.",
            "The calculated ceiling is not exceeded.",
          ),
      practiceRefs: ["plenum-58-art62"],
    };
  });
}
