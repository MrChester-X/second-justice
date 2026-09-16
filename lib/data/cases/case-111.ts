import { l } from "@/lib/i18n/text";
import type { CaseSeed } from "./types";

/* ------------------------------------------------------------------ */
/* Дело 3. ч. 4 ст. 111 УК РФ — отклонение от практики                 */
/* ------------------------------------------------------------------ */

export const CASE_111: CaseSeed = {
  id: "1-77-2026",
  number: "1-77/2026",
  fileName: "Приговор_111ч4_Дементьев_проект.pdf",
  fileSize: 214_016,
  pages: 14,
  uploadedAt: "2026-08-20T11:41:00",
  sanctionKey: "111-4",
  params: {
    qualification: {
      confidence: "high",
      quote:
        "…виновным в совершении преступления, предусмотренного частью 4 статьи 111 Уголовного кодекса Российской Федерации…",
      value: {
        article: "111",
        part: "4",
        title: l(
          "Умышленное причинение тяжкого вреда здоровью, повлёкшее по неосторожности смерть потерпевшего",
          "Intentional infliction of grievous bodily harm causing the victim's death by negligence",
        ),
        category: "especially_grave",
        commitDate: "2025-02-21",
      },
    },
    defendant: {
      confidence: "high",
      quote:
        "Дементьев Олег Николаевич, родившийся 3 сентября 1987 года, женат, имеет двоих несовершеннолетних детей, работает, судимость погашена.",
      value: {
        fio: l("Дементьев Олег Николаевич", "Dementyev Oleg Nikolaevich"),
        birthDate: "1987-09-03",
        age: 38,
        citizenship: l("Российская Федерация", "Russian Federation"),
        registration: l(
          "г. Слободской, Кировская область",
          "Slobodskoy, Kirov Region",
        ),
        maritalStatus: l("женат", "married"),
        dependents: 2,
        employment: l("водитель, МУП «Гортранс»", "driver, Gortrans MUE"),
        education: l("среднее профессиональное", "vocational secondary"),
        priorConvictions: "expunged",
        priorConvictionsNote: l(
          "судимость 2014 года погашена, юридических последствий не влечёт",
          "the 2014 conviction is expunged and carries no legal consequences",
        ),
        health: l(
          "хронических заболеваний не заявлено",
          "no chronic conditions reported",
        ),
        recidivism: false,
      },
    },
    mitigating: [
      {
        norm: l("п. «г» ч. 1 ст. 61 УК РФ", "Art. 61(1)(g) CC RF"),
        text: l("наличие двоих несовершеннолетних детей", "two minor children"),
        recognized: true,
      },
      {
        norm: l("п. «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(k) CC RF"),
        text: l(
          "добровольная компенсация морального вреда потерпевшей стороне в размере 150 000 рублей",
          "voluntary compensation of non-pecuniary harm to the victim's family in the amount of 150,000 roubles",
        ),
        recognized: true,
      },
      {
        norm: l("ч. 2 ст. 61 УК РФ", "Art. 61(2) CC RF"),
        text: l(
          "признание вины, положительные характеристики по месту работы",
          "admission of guilt, positive references from the workplace",
        ),
        recognized: true,
      },
    ],
    aggravating: [],
    procedure: {
      specialOrder: false,
      preTrialAgreement: false,
      juryVerdict: false,
      incomplete: "none",
      activeCooperation: false,
      damageCompensated: true,
      reconciled: false,
      firstOffence: true,
    },
    punishment: {
      confidence: "high",
      quote:
        "…назначить наказание в виде лишения свободы на срок 5 (пять) лет с отбыванием в исправительной колонии строгого режима.",
      value: {
        main: {
          kind: "imprisonment",
          unit: "months",
          amount: 60,
          note: l(
            "исправительная колония строгого режима",
            "strict-regime correctional colony",
          ),
        },
        additional: [],
      },
    },
  },
  scaleLimits: [
    {
      value: 120,
      norm: l("ч. 1 ст. 62 УК РФ", "Art. 62(1) CC RF"),
      label: l("предел 2/3 максимума", "2/3 of the maximum"),
    },
  ],
  checks: [
    {
      id: "111-sanction",
      group: "sanction",
      title: l(
        "Наказание находится в пределах санкции статьи",
        "The punishment is within the limits of the sanction",
      ),
      norm: l(
        "ч. 4 ст. 111 УК РФ, ч. 2 ст. 56 УК РФ",
        "Art. 111(4), Art. 56(2) CC RF",
      ),
      verdict: "ok",
      summary: l(
        "5 лет лишения свободы соответствуют пределам санкции и Общей части.",
        "Five years of deprivation of liberty comply with the limits of the sanction and of the General Part.",
      ),
      calculation: [
        l(
          "Санкция предусматривает лишение свободы на срок до 15 лет (180 месяцев).",
          "The sanction provides for deprivation of liberty for up to 15 years (180 months).",
        ),
        l(
          "Нижний предел санкцией не установлен, применяется минимум Общей части — 2 месяца (ч. 2 ст. 56 УК РФ).",
          "The sanction sets no lower limit, so the General Part minimum applies — 2 months (Art. 56(2) CC RF).",
        ),
        l(
          "Допустимый диапазон: от 2 до 180 месяцев.",
          "Permissible range: from 2 to 180 months.",
        ),
        l(
          "Назначено: 60 месяцев — внутри диапазона.",
          "Imposed: 60 months — within the range.",
        ),
      ],
      detail: l(
        "Формальных препятствий к назначенному сроку санкция не создаёт: нижний предел в ней отсутствует. Проверка соразмерности вынесена в отдельный пункт.",
        "The sanction creates no formal obstacle to the term imposed: it sets no lower limit. Proportionality is assessed in a separate check.",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "111-art62",
      group: "special_rules",
      title: l(
        "Ограничение верхнего предела по ч. 1 ст. 62 УК РФ соблюдено",
        "The ceiling under Art. 62(1) CC RF is observed",
      ),
      norm: l("ч. 1 ст. 62 УК РФ", "Art. 62(1) CC RF"),
      verdict: "ok",
      summary: l(
        "Расчётный предел — 10 лет, назначено 5 лет.",
        "The calculated ceiling is 10 years; 5 years were imposed.",
      ),
      calculation: [
        l(
          "Признано п. «к» ч. 1 ст. 61 УК РФ, отягчающих обстоятельств нет — ч. 1 ст. 62 УК РФ применима.",
          "Art. 61(1)(k) CC RF is recognised and there are no aggravating circumstances — Art. 62(1) CC RF applies.",
        ),
        l(
          "Максимум санкции: 180 месяцев.",
          "Maximum of the sanction: 180 months.",
        ),
        l(
          "180 × 2/3 = 120 месяцев (10 лет) — верхний предел.",
          "180 × 2/3 = 120 months (10 years) — the ceiling.",
        ),
        l(
          "Назначено 60 месяцев — предел соблюдён.",
          "Imposed: 60 months — the ceiling is observed.",
        ),
      ],
      detail: l(
        "Правило применено верно. Назначенный срок вдвое ниже расчётного предела, что само по себе допустимо, но требует мотивировки соразмерности.",
        "The rule is applied correctly. The term imposed is half the calculated ceiling, which is permissible in itself but calls for reasoning on proportionality.",
      ),
      practiceRefs: ["plenum-58-art62"],
    },
    {
      id: "111-additional",
      group: "additional",
      title: l(
        "Решение о дополнительном наказании мотивировано",
        "The decision on the additional punishment is reasoned",
      ),
      norm: l("ч. 4 ст. 111 УК РФ, ст. 53 УК РФ", "Art. 111(4), Art. 53 CC RF"),
      verdict: "ok",
      summary: l(
        "Ограничение свободы предусмотрено как возможное; мотивы его неназначения в проекте приведены.",
        "Restriction of liberty is provided as optional; the draft states the reasons for not imposing it.",
      ),
      calculation: [
        l(
          "Санкция: с ограничением свободы на срок до 2 лет либо без такового.",
          "The sanction: with restriction of liberty for up to 2 years or without it.",
        ),
        l(
          "Дополнительное наказание не является обязательным.",
          "The additional punishment is not mandatory.",
        ),
        l(
          "В проекте приведены мотивы решения о его неназначении.",
          "The draft states the reasons for the decision not to impose it.",
        ),
      ],
      detail: l(
        "Требование об обсуждении вопроса о дополнительном наказании выполнено.",
        "The requirement to address the additional punishment is satisfied.",
      ),
      practiceRefs: ["plenum-58-additional"],
    },
    {
      id: "111-proportionality",
      group: "general",
      title: l(
        "Соразмерность наказания требует дополнительной мотивировки",
        "Proportionality of the punishment needs further reasoning",
      ),
      norm: l("ст. 6, 60 УК РФ", "Arts. 6, 60 CC RF"),
      verdict: "warning",
      summary: l(
        "Назначенный срок существенно ниже медианы по схожим делам; мотивы такого снижения в проекте раскрыты не полностью.",
        "The term imposed is materially below the median for comparable cases, and the draft does not fully explain the reduction.",
      ),
      calculation: [
        l(
          "Медиана по схожим делам: 7 лет 6 месяцев (90 месяцев).",
          "Median for comparable cases: 7 years 6 months (90 months).",
        ),
        l("Назначено: 5 лет (60 месяцев).", "Imposed: 5 years (60 months)."),
        l(
          "Отклонение от медианы: −30 месяцев, около −1,8 стандартного разброса.",
          "Deviation from the median: −30 months, about −1.8 standard deviations.",
        ),
        l(
          "Назначенный срок ниже первого квартиля выборки.",
          "The term imposed is below the first quartile of the sample.",
        ),
      ],
      detail: l(
        "Формально наказание находится в пределах санкции, и суд вправе назначить его в любой точке диапазона. Однако существенное отклонение от практики по схожим делам при отсутствии развёрнутых мотивов создаёт риск изменения приговора по мотиву несправедливости назначенного наказания. Рекомендуется раскрыть, какие именно обстоятельства обусловили снижение: степень вины, поведение потерпевшего, размер и добровольность компенсации.",
        "Formally the punishment is within the sanction, and the court may set it anywhere in that range. However, a material departure from practice in comparable cases without detailed reasoning creates a risk that the judgment will be varied on the ground that the punishment is unjust. It is advisable to set out exactly which circumstances justified the reduction: the degree of guilt, the victim's conduct, and the amount and voluntariness of the compensation.",
      ),
      practiceRefs: ["plenum-58", "plenum-55"],
    },
    {
      id: "111-category",
      group: "general",
      title: l(
        "Изменение категории преступления невозможно",
        "Reclassifying the category of the offence is not available",
      ),
      norm: l("ч. 6 ст. 15 УК РФ", "Art. 15(6) CC RF"),
      verdict: "info",
      summary: l(
        "Условия ч. 6 ст. 15 УК РФ не соблюдены: назначено более 7 лет не требуется, но категория особо тяжкая.",
        "The conditions of Art. 15(6) CC RF are not met: the term does not exceed 7 years, but the category is especially grave.",
      ),
      calculation: [
        l(
          "Категория преступления — особо тяжкое.",
          "Category of the offence — especially grave.",
        ),
        l(
          "Изменение категории особо тяжкого преступления возможно только на тяжкое при наказании не свыше 7 лет лишения свободы.",
          "An especially grave offence may be reclassified only as grave, and only where the punishment does not exceed 7 years of deprivation of liberty.",
        ),
        l(
          "Назначено 5 лет — формальное условие соблюдено.",
          "Imposed: 5 years — the formal condition is met.",
        ),
        l(
          "Вопрос подлежит обсуждению в проекте акта.",
          "The question must be addressed in the draft judgment.",
        ),
      ],
      detail: l(
        "При назначении особо тяжкому преступлению наказания, не превышающего 7 лет лишения свободы, вопрос об изменении категории на тяжкое подлежит обсуждению. В проекте такое обсуждение отсутствует; это не нарушение, но упущение, которое стоит устранить.",
        "Where an especially grave offence attracts a punishment not exceeding 7 years of deprivation of liberty, the question of reclassifying it as grave must be addressed. The draft contains no such discussion; this is not a breach, but an omission worth correcting.",
      ),
      practiceRefs: ["plenum-10-category"],
    },
    {
      id: "111-edition",
      group: "edition",
      title: l(
        "Применена редакция закона, действовавшая на момент деяния",
        "The wording of the law in force at the time of the act was applied",
      ),
      norm: l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      verdict: "ok",
      summary: l(
        "На 21.02.2025 действовала редакция ч. 4 ст. 111 УК РФ, применённая в проекте.",
        "As at 21.02.2025 the wording of Art. 111(4) CC RF applied in the draft was in force.",
      ),
      calculation: [
        l(
          "Дата совершения деяния: 21.02.2025.",
          "Date of the act: 21.02.2025.",
        ),
        l(
          "Применена редакция Федерального закона от 07.12.2011 № 420-ФЗ.",
          "The wording introduced by Federal Law No. 420-FZ of 7 December 2011 was applied.",
        ),
        l(
          "Изменений санкции после этой даты не вносилось.",
          "The sanction has not been amended since that date.",
        ),
      ],
      detail: l(
        "Оснований для применения ст. 10 УК РФ не установлено.",
        "No grounds for applying Art. 10 CC RF were found.",
      ),
      practiceRefs: ["presidium-art-10"],
    },
    {
      id: "111-release",
      group: "release",
      title: l(
        "Основания раздела IV УК РФ отсутствуют",
        "No grounds under Section IV CC RF are available",
      ),
      norm: l("ст. 75, 76, 76.2, 78 УК РФ", "Arts. 75, 76, 76.2, 78 CC RF"),
      verdict: "info",
      summary: l(
        "Преступление особо тяжкое, освобождение от уголовной ответственности по этим основаниям невозможно.",
        "The offence is especially grave, so release from criminal liability on these grounds is not available.",
      ),
      detail: l(
        "Статьи 75, 76 и 76.2 УК РФ применяются к преступлениям небольшой и средней тяжести. Сроки давности не истекли.",
        "Articles 75, 76 and 76.2 CC RF apply to minor offences and offences of medium gravity. The limitation periods have not expired.",
      ),
      practiceRefs: ["plenum-19"],
    },
    {
      id: "111-practice",
      group: "practice",
      title: l(
        "Требуется усилить мотивировку в части наказания",
        "The reasoning on the sentence needs strengthening",
      ),
      norm: l(
        "Постановления Пленума ВС РФ № 58 и № 55",
        "Plenum Resolutions No. 58 and No. 55",
      ),
      verdict: "warning",
      summary: l(
        "Разъяснения требуют мотивировать решения по вопросам наказания с указанием конкретных обстоятельств.",
        "The guidance requires sentencing decisions to be reasoned with reference to specific circumstances.",
      ),
      detail: l(
        "Прямого противоречия разъяснениям не выявлено. Замечание связано с полнотой мотивировки: при значительном отступлении от типичной практики требуется раскрыть конкретные обстоятельства, определившие размер наказания.",
        "No direct contradiction of the guidance was found. The caveat concerns the completeness of the reasoning: where the sentence departs substantially from typical practice, the specific circumstances behind it must be set out.",
      ),
      practiceRefs: ["plenum-58", "plenum-55", "plenum-10-category"],
    },
  ],
  conclusion: {
    annotation: l(
      "Проект приговора по уголовному делу № 1-77/2026 в отношении Дементьева О. Н., обвиняемого в умышленном причинении тяжкого вреда здоровью, повлёкшем по неосторожности смерть потерпевшего, 21 февраля 2025 года. Дело рассмотрено в общем порядке. Признаны три смягчающих обстоятельства, отягчающие отсутствуют. Добровольно компенсирован моральный вред в размере 150 000 рублей. Назначено наказание в виде лишения свободы на срок 5 лет с отбыванием в исправительной колонии строгого режима.",
      "Draft judgment in criminal case No. 1-77/2026 concerning O. N. Dementyev, charged with the intentional infliction of grievous bodily harm causing the victim's death by negligence on 21 February 2025. The case was tried under the ordinary procedure. Three mitigating circumstances were recognised; there are no aggravating ones. Non-pecuniary harm of 150,000 roubles was compensated voluntarily. The punishment imposed is deprivation of liberty for 5 years in a strict-regime correctional colony.",
    ),
    formalResult: l(
      "Нарушений требований закона не выявлено. Назначенный срок находится в пределах санкции ч. 4 ст. 111 УК РФ, нижний предел которой санкцией не установлен, и не превышает расчётный предел ч. 1 ст. 62 УК РФ, составляющий 10 лет. Решение о неназначении дополнительного наказания в виде ограничения свободы мотивировано.",
      "No breaches of statutory requirements were found. The term imposed is within the sanction of Art. 111(4) CC RF, which sets no lower limit, and does not exceed the ceiling of 10 years calculated under Art. 62(1) CC RF. The decision not to impose restriction of liberty as an additional punishment is reasoned.",
    ),
    practiceResult: l(
      "Прямых расхождений с разъяснениями Пленума Верховного Суда РФ не установлено. Отмечаются два вопроса полноты судебного акта: мотивировка размера наказания при существенном отступлении от практики и отсутствие обсуждения вопроса об изменении категории преступления в порядке ч. 6 ст. 15 УК РФ.",
      "No direct divergence from the guidance of the Plenum of the Supreme Court was established. Two completeness issues are noted: the reasoning on the amount of punishment given the substantial departure from practice, and the absence of any discussion of reclassifying the offence under Art. 15(6) CC RF.",
    ),
    attentionAreas: [
      {
        title: l(
          "Отклонение от практики по схожим делам",
          "Departure from practice in comparable cases",
        ),
        text: l(
          "Назначенный срок ниже медианы по схожим делам на 2 года 6 месяцев, что составляет около 1,8 стандартного разброса, и ниже первого квартиля выборки. Рекомендуется раскрыть в проекте конкретные обстоятельства, обусловившие такой размер наказания.",
          "The term imposed is 2 years 6 months below the median for comparable cases — about 1.8 standard deviations — and below the first quartile of the sample. It is advisable to set out in the draft the specific circumstances behind this sentence.",
        ),
        severity: "warning",
      },
      {
        title: l(
          "Не обсуждён вопрос об изменении категории преступления",
          "Reclassification of the offence was not addressed",
        ),
        text: l(
          "При назначении особо тяжкому преступлению наказания, не превышающего 7 лет лишения свободы, вопрос о применении ч. 6 ст. 15 УК РФ подлежит обсуждению независимо от итогового вывода.",
          "Where an especially grave offence attracts a punishment not exceeding 7 years of deprivation of liberty, the application of Art. 15(6) CC RF must be addressed whatever the final conclusion.",
        ),
        severity: "warning",
      },
    ],
    statisticalNote: l(
      "По схожим делам о лишении свободы, назначенном по ч. 4 ст. 111 УК РФ, медиана составляет 7 лет 6 месяцев, межквартильный диапазон — от 7 лет до 8 лет. Назначенный срок находится ниже первого квартиля.",
      "In comparable cases of deprivation of liberty imposed under Art. 111(4) CC RF the median is 7 years 6 months and the interquartile range runs from 7 to 8 years. The term imposed is below the first quartile.",
    ),
    normsUsed: [
      l("ч. 4 ст. 111 УК РФ", "Art. 111(4) CC RF"),
      l("ст. 6 УК РФ", "Art. 6 CC RF"),
      l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      l("ч. 6 ст. 15 УК РФ", "Art. 15(6) CC RF"),
      l("ст. 43 УК РФ", "Art. 43 CC RF"),
      l("ст. 53 УК РФ", "Art. 53 CC RF"),
      l("ч. 2 ст. 56 УК РФ", "Art. 56(2) CC RF"),
      l("ст. 60 УК РФ", "Art. 60 CC RF"),
      l("п. «г», «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(g), (k) CC RF"),
      l("ч. 1 ст. 62 УК РФ", "Art. 62(1) CC RF"),
      l("ст. 307, 308 УПК РФ", "Arts. 307, 308 CCP RF"),
    ],
  },
};
