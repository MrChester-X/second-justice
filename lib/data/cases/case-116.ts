import { l } from "@/lib/i18n/text";
import type { CaseSeed } from "./types";

/* ------------------------------------------------------------------ */
/* Дело 4. ст. 116.1 УК РФ — не рассмотрены основания раздела IV       */
/* ------------------------------------------------------------------ */

export const CASE_116: CaseSeed = {
  id: "1-312-2026",
  number: "1-312/2026",
  fileName: "Приговор_116-1_Пестова_проект.docx",
  fileSize: 38_912,
  pages: 5,
  uploadedAt: "2026-08-21T16:12:00",
  sanctionKey: "116.1-1",
  params: {
    qualification: {
      confidence: "high",
      quote:
        "…виновной в совершении преступления, предусмотренного частью 1 статьи 116.1 Уголовного кодекса Российской Федерации…",
      value: {
        article: "116.1",
        part: "1",
        title: l(
          "Нанесение побоев лицом, подвергнутым административному наказанию за аналогичное деяние",
          "Battery committed by a person previously subjected to an administrative penalty for a similar act",
        ),
        category: "small",
        commitDate: "2026-01-09",
      },
    },
    defendant: {
      confidence: "high",
      quote:
        "Пестова Елена Сергеевна, родившаяся 17 мая 1990 года, замужем, имеет несовершеннолетнего ребёнка, работает, ранее не судима.",
      value: {
        fio: l("Пестова Елена Сергеевна", "Pestova Elena Sergeevna"),
        birthDate: "1990-05-17",
        age: 36,
        citizenship: l("Российская Федерация", "Russian Federation"),
        registration: l("г. Киров", "Kirov"),
        maritalStatus: l("замужем", "married"),
        dependents: 1,
        employment: l(
          "продавец, ООО «Торговый дом Вятка»",
          "sales assistant, Torgovy Dom Vyatka LLC",
        ),
        education: l("среднее общее", "general secondary"),
        priorConvictions: "none",
        priorConvictionsNote: l(
          "судимостей не имеет; привлекалась к административной ответственности по ст. 6.1.1 КоАП РФ, что образует признак состава",
          "has no prior convictions; was held administratively liable under Art. 6.1.1 of the Code of Administrative Offences, which forms an element of the offence",
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
        text: l("наличие несовершеннолетнего ребёнка", "a minor child"),
        recognized: true,
      },
      {
        norm: l("п. «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(k) CC RF"),
        text: l(
          "добровольное возмещение вреда: принесены извинения, выплачено 20 000 рублей",
          "voluntary redress: an apology was made and 20,000 roubles paid",
        ),
        recognized: true,
      },
      {
        norm: l("ч. 2 ст. 61 УК РФ", "Art. 61(2) CC RF"),
        text: l(
          "признание вины и раскаяние в содеянном",
          "admission of guilt and remorse",
        ),
        recognized: true,
      },
    ],
    aggravating: [],
    procedure: {
      specialOrder: true,
      preTrialAgreement: false,
      juryVerdict: false,
      incomplete: "none",
      activeCooperation: false,
      damageCompensated: true,
      reconciled: true,
      firstOffence: true,
    },
    punishment: {
      confidence: "high",
      quote:
        "…назначить наказание в виде обязательных работ на срок 120 (сто двадцать) часов.",
      value: {
        main: {
          kind: "mandatory_works",
          unit: "hours",
          amount: 120,
        },
        additional: [],
      },
    },
  },
  scaleLimits: [],
  checks: [
    {
      id: "116-sanction",
      group: "sanction",
      title: l(
        "Наказание находится в пределах санкции статьи",
        "The punishment is within the limits of the sanction",
      ),
      norm: l(
        "ч. 1 ст. 116.1 УК РФ, ч. 2 ст. 49 УК РФ",
        "Art. 116.1(1), Art. 49(2) CC RF",
      ),
      verdict: "ok",
      summary: l(
        "120 часов обязательных работ соответствуют пределам санкции и Общей части.",
        "120 hours of community service comply with the limits of the sanction and of the General Part.",
      ),
      calculation: [
        l(
          "Санкция предусматривает обязательные работы на срок до 240 часов.",
          "The sanction provides for community service of up to 240 hours.",
        ),
        l(
          "Нижний предел санкцией не установлен, применяется минимум Общей части — 60 часов (ч. 2 ст. 49 УК РФ).",
          "The sanction sets no lower limit, so the General Part minimum applies — 60 hours (Art. 49(2) CC RF).",
        ),
        l(
          "Допустимый диапазон: от 60 до 240 часов.",
          "Permissible range: from 60 to 240 hours.",
        ),
        l(
          "Назначено: 120 часов — внутри диапазона.",
          "Imposed: 120 hours — within the range.",
        ),
      ],
      detail: l(
        "Вид наказания входит в перечень санкции, ограничений по ч. 4 ст. 49 УК РФ применительно к подсудимой не установлено.",
        "The type of punishment is among those listed in the sanction, and none of the restrictions under Art. 49(4) CC RF apply to the defendant.",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "116-art62",
      group: "special_rules",
      title: l(
        "Ограничение по ч. 5 ст. 62 УК РФ соблюдено",
        "The cap under Art. 62(5) CC RF is observed",
      ),
      norm: l(
        "ч. 5 ст. 62 УК РФ, гл. 40 УПК РФ",
        "Art. 62(5) CC RF, Ch. 40 CCP RF",
      ),
      verdict: "ok",
      summary: l(
        "Ограничение относится к аресту как наиболее строгому виду наказания и назначенного наказания не затрагивает.",
        "The cap applies to arrest as the most severe type of punishment and does not affect the punishment imposed.",
      ),
      calculation: [
        l(
          "Дело рассмотрено в особом порядке: применяется ч. 5 ст. 62 УК РФ — не более 2/3 максимума.",
          "The case was tried under the special procedure, so Art. 62(5) CC RF applies — no more than 2/3 of the maximum.",
        ),
        l(
          "Наиболее строгий вид наказания в санкции — арест до 3 месяцев.",
          "The most severe punishment in the sanction is arrest for up to 3 months.",
        ),
        l(
          "3 × 2/3 = 2 месяца — предел для ареста.",
          "3 × 2/3 = 2 months — the ceiling for arrest.",
        ),
        l(
          "Назначен более мягкий вид наказания, ограничение соблюдено.",
          "A milder type of punishment was imposed, so the cap is observed.",
        ),
      ],
      detail: l(
        "Правило применимо к наиболее строгому виду наказания, предусмотренному санкцией. Обязательные работы к нему не относятся.",
        "The rule applies to the most severe type of punishment provided by the sanction. Community service is not that type.",
      ),
      practiceRefs: ["plenum-60-special", "plenum-58-art62"],
    },
    {
      id: "116-additional",
      group: "additional",
      title: l(
        "Дополнительное наказание санкцией не предусмотрено",
        "The sanction provides for no additional punishment",
      ),
      norm: l("ч. 1 ст. 116.1 УК РФ", "Art. 116.1(1) CC RF"),
      verdict: "info",
      summary: l(
        "Вопрос о дополнительном наказании не возникает.",
        "The question of an additional punishment does not arise.",
      ),
      detail: l(
        "Санкция ч. 1 ст. 116.1 УК РФ дополнительных видов наказания не содержит.",
        "The sanction of Art. 116.1(1) CC RF contains no additional types of punishment.",
      ),
    },
    {
      id: "116-release-76",
      group: "release",
      title: l(
        "Не рассмотрено основание освобождения по ст. 76 УК РФ",
        "The ground for release under Art. 76 CC RF was not considered",
      ),
      norm: l("ст. 76 УК РФ, ст. 25 УПК РФ", "Art. 76 CC RF, Art. 25 CCP RF"),
      verdict: "violation",
      summary: l(
        "Потерпевшая заявила о примирении, условия ст. 76 УК РФ соблюдены, однако вопрос в проекте не обсуждён.",
        "The victim declared reconciliation and the conditions of Art. 76 CC RF are met, yet the draft does not address the question.",
      ),
      calculation: [
        l(
          "Преступление небольшой тяжести — условие соблюдено.",
          "A minor offence — the condition is met.",
        ),
        l(
          "Преступление совершено впервые — условие соблюдено.",
          "The offence was committed for the first time — the condition is met.",
        ),
        l(
          "Вред заглажен: принесены извинения, выплачено 20 000 рублей — условие соблюдено.",
          "The harm was made good: an apology was made and 20,000 roubles paid — the condition is met.",
        ),
        l(
          "Потерпевшая заявила о примирении — условие соблюдено.",
          "The victim declared reconciliation — the condition is met.",
        ),
        l(
          "Все условия ст. 76 УК РФ имеются, обсуждение вопроса в проекте отсутствует.",
          "All conditions of Art. 76 CC RF are present, but the draft contains no discussion of the question.",
        ),
      ],
      detail: l(
        "При наличии всех условий, предусмотренных ст. 76 УК РФ, суд обязан обсудить вопрос о прекращении уголовного дела в порядке ст. 25 УПК РФ и привести в судебном акте мотивы принятого решения. Освобождение от уголовной ответственности является правом, а не обязанностью суда, однако оставление вопроса без рассмотрения при заявленном примирении — существенное упущение, влекущее риск отмены или изменения судебного акта.",
        "Where all the conditions of Art. 76 CC RF are present, the court must address discontinuing the case under Art. 25 CCP RF and state the reasons for its decision in the judgment. Release from criminal liability is a power of the court rather than a duty, but leaving the question unaddressed when reconciliation has been declared is a material omission that risks the judgment being quashed or varied.",
      ),
      practiceRefs: ["plenum-19", "plenum-55"],
    },
    {
      id: "116-release-76-2",
      group: "release",
      title: l(
        "Не рассмотрено основание освобождения по ст. 76.2 УК РФ",
        "The ground for release under Art. 76.2 CC RF was not considered",
      ),
      norm: l(
        "ст. 76.2 УК РФ, ст. 25.1 УПК РФ, ст. 104.4 УК РФ",
        "Art. 76.2 CC RF, Art. 25.1 CCP RF, Art. 104.4 CC RF",
      ),
      verdict: "warning",
      summary: l(
        "Условия для назначения судебного штрафа соблюдены, обсуждение в проекте отсутствует.",
        "The conditions for a court fine are met, but the draft contains no discussion of it.",
      ),
      calculation: [
        l(
          "Преступление небольшой тяжести, совершено впервые — условия соблюдены.",
          "A minor offence committed for the first time — the conditions are met.",
        ),
        l(
          "Вред заглажен — условие соблюдено.",
          "The harm was made good — the condition is met.",
        ),
        l(
          "Основание ст. 76.2 УК РФ применимо и подлежит обсуждению.",
          "The ground under Art. 76.2 CC RF is available and must be addressed.",
        ),
      ],
      detail: l(
        "Обзор судебной практики, утверждённый Президиумом Верховного Суда РФ 10 июля 2019 года, указывает на недопустимость оставления вопроса о применении ст. 76.2 УК РФ без рассмотрения при наличии установленных условий. Отказ должен быть мотивирован ссылкой на конкретные обстоятельства дела.",
        "The practice review approved by the Presidium of the Supreme Court on 10 July 2019 states that the application of Art. 76.2 CC RF may not be left unaddressed where the required conditions are established. A refusal must be reasoned by reference to the specific circumstances of the case.",
      ),
      practiceRefs: ["plenum-19-fine", "presidium-review-76-2"],
    },
    {
      id: "116-general",
      group: "general",
      title: l(
        "Общие начала назначения наказания соблюдены",
        "The general principles of sentencing are observed",
      ),
      norm: l("ст. 6, 43, 60 УК РФ", "Arts. 6, 43, 60 CC RF"),
      verdict: "ok",
      summary: l(
        "Вид и размер наказания мотивированы, учтены смягчающие обстоятельства.",
        "The type and amount of punishment are reasoned and the mitigating circumstances were taken into account.",
      ),
      detail: l(
        "Замечания относятся не к выбору наказания, а к нерассмотренным основаниям освобождения от уголовной ответственности.",
        "The findings concern not the choice of punishment but the grounds for release from criminal liability that were left unaddressed.",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "116-edition",
      group: "edition",
      title: l(
        "Применена редакция закона, действовавшая на момент деяния",
        "The wording of the law in force at the time of the act was applied",
      ),
      norm: l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      verdict: "ok",
      summary: l(
        "На 09.01.2026 действовала редакция ст. 116.1 УК РФ, применённая в проекте.",
        "As at 09.01.2026 the wording of Art. 116.1 CC RF applied in the draft was in force.",
      ),
      calculation: [
        l(
          "Дата совершения деяния: 09.01.2026.",
          "Date of the act: 09.01.2026.",
        ),
        l(
          "Применена редакция Федерального закона от 28.06.2022 № 203-ФЗ.",
          "The wording introduced by Federal Law No. 203-FZ of 28 June 2022 was applied.",
        ),
        l(
          "Часть 1 статьи применена верно: установлен факт привлечения к административной ответственности, а не наличие судимости.",
          "Part 1 of the article was applied correctly: what was established was administrative liability, not a prior conviction.",
        ),
      ],
      detail: l(
        "Разграничение частей 1 и 2 ст. 116.1 УК РФ проведено правильно: признаком состава указано административное наказание за аналогичное деяние.",
        "Parts 1 and 2 of Art. 116.1 CC RF were distinguished correctly: the element relied on is an administrative penalty for a similar act.",
      ),
      practiceRefs: ["presidium-art-10"],
    },
    {
      id: "116-practice",
      group: "practice",
      title: l(
        "Выявлено расхождение с разъяснениями и обзором практики",
        "A divergence from the guidance and the practice review was found",
      ),
      norm: l(
        "Постановление Пленума ВС РФ от 27.06.2013 № 19; обзор, утверждённый Президиумом ВС РФ 10.07.2019",
        "Plenum Resolution No. 19 of 27 June 2013; review approved by the Presidium on 10 July 2019",
      ),
      verdict: "violation",
      summary: l(
        "Оставление без рассмотрения оснований освобождения от уголовной ответственности противоречит разъяснениям.",
        "Leaving the grounds for release from criminal liability unaddressed contradicts the guidance.",
      ),
      detail: l(
        "Разъяснения прямо требуют обсуждать вопрос об освобождении от уголовной ответственности при наличии установленных условий и мотивировать принятое решение. Проект такого обсуждения не содержит.",
        "The guidance expressly requires the question of release from criminal liability to be addressed where the conditions are established, and the decision to be reasoned. The draft contains no such discussion.",
      ),
      practiceRefs: ["plenum-19", "plenum-19-fine", "presidium-review-76-2"],
    },
  ],
  conclusion: {
    annotation: l(
      "Проект приговора по уголовному делу № 1-312/2026 в отношении Пестовой Е. С., обвиняемой в нанесении побоев лицом, подвергнутым административному наказанию за аналогичное деяние, 9 января 2026 года. Дело рассмотрено в особом порядке. Признаны три смягчающих обстоятельства, отягчающие отсутствуют. Вред заглажен, потерпевшая заявила о примирении. Назначено наказание в виде обязательных работ на срок 120 часов.",
      "Draft judgment in criminal case No. 1-312/2026 concerning E. S. Pestova, charged with battery committed by a person previously subjected to an administrative penalty for a similar act, on 9 January 2026. The case was tried under the special procedure. Three mitigating circumstances were recognised; there are no aggravating ones. The harm was made good and the victim declared reconciliation. The punishment imposed is 120 hours of community service.",
    ),
    formalResult: l(
      "Вид и размер наказания соответствуют санкции ч. 1 ст. 116.1 УК РФ и минимуму, установленному ч. 2 ст. 49 УК РФ. Ограничение ч. 5 ст. 62 УК РФ соблюдено. Вместе с тем выявлено нарушение, не связанное с размером наказания: при наличии всех условий, предусмотренных ст. 76 УК РФ, включая заявленное потерпевшей примирение, вопрос о прекращении уголовного дела в порядке ст. 25 УПК РФ в проекте не обсуждён. Не рассмотрено также основание, предусмотренное ст. 76.2 УК РФ.",
      "The type and amount of punishment comply with the sanction of Art. 116.1(1) CC RF and the minimum set by Art. 49(2) CC RF. The cap under Art. 62(5) CC RF is observed. However, a breach unrelated to the amount of punishment was found: although all the conditions of Art. 76 CC RF are present, including the reconciliation declared by the victim, the draft does not address discontinuing the case under Art. 25 CCP RF. The ground under Art. 76.2 CC RF was likewise left unconsidered.",
    ),
    practiceResult: l(
      "Установлено расхождение с постановлением Пленума Верховного Суда РФ от 27.06.2013 № 19 и обзором судебной практики, утверждённым Президиумом Верховного Суда РФ 10 июля 2019 года: вопрос об освобождении от уголовной ответственности при наличии установленных условий подлежит обсуждению, а отказ — мотивировке.",
      "A divergence was established from Plenum Resolution No. 19 of 27 June 2013 and the practice review approved by the Presidium of the Supreme Court on 10 July 2019: where the conditions are established, release from criminal liability must be addressed and any refusal reasoned.",
    ),
    attentionAreas: [
      {
        title: l(
          "Не обсуждено примирение с потерпевшей",
          "Reconciliation with the victim was not addressed",
        ),
        text: l(
          "Все условия ст. 76 УК РФ соблюдены, потерпевшая заявила о примирении. Проект следует дополнить обсуждением вопроса о прекращении уголовного дела в порядке ст. 25 УПК РФ и мотивами принятого решения.",
          "All the conditions of Art. 76 CC RF are met and the victim declared reconciliation. The draft should be supplemented with a discussion of discontinuing the case under Art. 25 CCP RF and the reasons for the decision taken.",
        ),
        severity: "violation",
      },
      {
        title: l(
          "Не обсуждено назначение судебного штрафа",
          "The court fine was not addressed",
        ),
        text: l(
          "Условия ст. 76.2 УК РФ соблюдены. Требуется обсуждение вопроса о прекращении уголовного дела с назначением судебного штрафа в порядке ст. 25.1 УПК РФ либо мотивированный отказ.",
          "The conditions of Art. 76.2 CC RF are met. Discontinuing the case with the imposition of a court fine under Art. 25.1 CCP RF must be addressed, or a reasoned refusal given.",
        ),
        severity: "warning",
      },
    ],
    statisticalNote: l(
      "По схожим делам об обязательных работах, назначенных по ч. 1 ст. 116.1 УК РФ, медиана составляет 140 часов. Назначенный срок находится в пределах обычного разброса; статистических отклонений не выявлено. Отдельно отмечается, что по части схожих дел уголовное преследование прекращалось по основаниям раздела IV УК РФ, что подтверждает необходимость обсуждения этого вопроса.",
      "In comparable cases of community service imposed under Art. 116.1(1) CC RF the median is 140 hours. The term imposed is within the usual spread; no statistical deviation was found. It is separately noted that in some comparable cases the prosecution was discontinued on grounds under Section IV CC RF, which confirms that this question needs to be addressed.",
    ),
    normsUsed: [
      l("ч. 1 ст. 116.1 УК РФ", "Art. 116.1(1) CC RF"),
      l("ст. 6 УК РФ", "Art. 6 CC RF"),
      l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      l("ст. 43 УК РФ", "Art. 43 CC RF"),
      l("ч. 2, 4 ст. 49 УК РФ", "Art. 49(2), (4) CC RF"),
      l("ст. 60 УК РФ", "Art. 60 CC RF"),
      l("п. «г», «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(g), (k) CC RF"),
      l("ч. 5 ст. 62 УК РФ", "Art. 62(5) CC RF"),
      l("ст. 76 УК РФ", "Art. 76 CC RF"),
      l("ст. 76.2 УК РФ", "Art. 76.2 CC RF"),
      l("ст. 104.4 УК РФ", "Art. 104.4 CC RF"),
      l("ст. 25, 25.1 УПК РФ", "Arts. 25, 25.1 CCP RF"),
      l("гл. 40 УПК РФ", "Ch. 40 CCP RF"),
    ],
  },
};
