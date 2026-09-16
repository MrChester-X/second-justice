import { l } from "@/lib/i18n/text";
import type { CaseSeed } from "./types";

/* ------------------------------------------------------------------ */
/* Дело 1. ч. 1 ст. 158 УК РФ — наказание соответствует требованиям    */
/* ------------------------------------------------------------------ */

export const CASE_158: CaseSeed = {
  id: "1-241-2026",
  number: "1-241/2026",
  fileName: "Приговор_158ч1_Соколов_проект.docx",
  fileSize: 47_104,
  pages: 6,
  uploadedAt: "2026-08-18T09:24:00",
  sanctionKey: "158-1",
  params: {
    qualification: {
      confidence: "high",
      quote:
        "…признать Соколова А. В. виновным в совершении преступления, предусмотренного частью 1 статьи 158 Уголовного кодекса Российской Федерации…",
      value: {
        article: "158",
        part: "1",
        title: l("Кража", "Theft"),
        category: "small",
        commitDate: "2025-11-14",
      },
    },
    defendant: {
      confidence: "high",
      quote:
        "Соколов Артём Владимирович, родившийся 6 марта 1998 года, гражданин Российской Федерации, женат, имеет малолетнего ребёнка, работает, ранее не судим.",
      value: {
        fio: l("Соколов Артём Владимирович", "Sokolov Artyom Vladimirovich"),
        birthDate: "1998-03-06",
        age: 27,
        citizenship: l("Российская Федерация", "Russian Federation"),
        registration: l("г. Киров", "Kirov"),
        maritalStatus: l("женат", "married"),
        dependents: 1,
        employment: l(
          "слесарь-ремонтник, ООО «Вяткастрой»",
          "maintenance fitter, Vyatkastroy LLC",
        ),
        education: l("среднее профессиональное", "vocational secondary"),
        priorConvictions: "none",
        priorConvictionsNote: l(
          "судимостей не имеет",
          "has no prior convictions",
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
        text: l(
          "наличие малолетнего ребёнка у виновного",
          "the offender has a young child",
        ),
        recognized: true,
      },
      {
        norm: l("п. «и» ч. 1 ст. 61 УК РФ", "Art. 61(1)(i) CC RF"),
        text: l(
          "активное способствование раскрытию и расследованию преступления",
          "active assistance in detecting and investigating the offence",
        ),
        recognized: true,
      },
      {
        norm: l("п. «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(k) CC RF"),
        text: l(
          "добровольное возмещение имущественного ущерба в полном объёме",
          "voluntary compensation of the pecuniary damage in full",
        ),
        recognized: true,
      },
      {
        norm: l("ч. 2 ст. 61 УК РФ", "Art. 61(2) CC RF"),
        text: l(
          "полное признание вины и раскаяние в содеянном",
          "full admission of guilt and remorse",
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
      activeCooperation: true,
      damageCompensated: true,
      reconciled: false,
      firstOffence: true,
    },
    punishment: {
      confidence: "high",
      quote:
        "…назначить наказание в виде исправительных работ на срок 8 (восемь) месяцев с удержанием 10 % заработной платы в доход государства.",
      value: {
        main: {
          kind: "corrective_works",
          unit: "months",
          amount: 8,
          note: l(
            "с удержанием 10 % заработной платы",
            "with 10% of wages withheld",
          ),
        },
        additional: [],
      },
    },
  },
  scaleLimits: [],
  checks: [
    {
      id: "158-sanction",
      group: "sanction",
      title: l(
        "Наказание находится в пределах санкции статьи",
        "The punishment is within the limits of the sanction",
      ),
      norm: l(
        "ч. 1 ст. 158 УК РФ, ч. 2 ст. 50 УК РФ",
        "Art. 158(1), Art. 50(2) CC RF",
      ),
      verdict: "ok",
      summary: l(
        "Исправительные работы на 8 месяцев соответствуют пределам санкции и Общей части.",
        "Eight months of corrective labour comply with the limits of the sanction and of the General Part.",
      ),
      calculation: [
        l(
          "Санкция предусматривает исправительные работы на срок до 1 года.",
          "The sanction provides for corrective labour for up to 1 year.",
        ),
        l(
          "Нижний предел санкцией не установлен, применяется минимум Общей части — 2 месяца (ч. 2 ст. 50 УК РФ).",
          "The sanction sets no lower limit, so the General Part minimum applies — 2 months (Art. 50(2) CC RF).",
        ),
        l(
          "Допустимый диапазон: от 2 до 12 месяцев.",
          "Permissible range: from 2 to 12 months.",
        ),
        l(
          "Назначено: 8 месяцев — внутри диапазона.",
          "Imposed: 8 months — within the range.",
        ),
      ],
      detail: l(
        "Вид наказания входит в перечень, предусмотренный санкцией. Размер удержания 10 % не выходит за пределы, установленные ч. 3 ст. 50 УК РФ (от 5 до 20 %).",
        "The type of punishment is among those listed in the sanction. The 10% withholding rate stays within the limits set by Art. 50(3) CC RF (from 5% to 20%).",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "158-art62",
      group: "special_rules",
      title: l(
        "Ограничение верхнего предела по ст. 62 УК РФ соблюдено",
        "The ceiling under Art. 62 CC RF is observed",
      ),
      norm: l("ч. 1 и ч. 5 ст. 62 УК РФ", "Art. 62(1) and 62(5) CC RF"),
      verdict: "ok",
      summary: l(
        "Ограничения применимы, но не затрагивают назначенное наказание: избран более мягкий вид.",
        "The caps apply but do not affect the punishment imposed: a milder type was chosen.",
      ),
      calculation: [
        l(
          "Наиболее строгий вид наказания в санкции — лишение свободы до 2 лет (24 месяца).",
          "The most severe punishment in the sanction is deprivation of liberty for up to 2 years (24 months).",
        ),
        l(
          "Признаны п. «и» и п. «к» ч. 1 ст. 61 УК РФ, отягчающих нет: применяется ч. 1 ст. 62 УК РФ — не более 2/3 максимума.",
          "Art. 61(1)(i) and (k) CC RF are recognised and there are no aggravating circumstances: Art. 62(1) CC RF applies — no more than 2/3 of the maximum.",
        ),
        l("24 × 2/3 = 16 месяцев.", "24 × 2/3 = 16 months."),
        l(
          "Дело рассмотрено в особом порядке: дополнительно применяется ч. 5 ст. 62 УК РФ — не более 2/3.",
          "The case was tried under the special procedure, so Art. 62(5) CC RF also applies — no more than 2/3.",
        ),
        l(
          "16 × 2/3 = 10 месяцев 20 дней — предел для лишения свободы.",
          "16 × 2/3 = 10 months 20 days — the ceiling for deprivation of liberty.",
        ),
        l(
          "Назначен более мягкий вид наказания, ограничение соблюдено.",
          "A milder type of punishment was imposed, so the cap is observed.",
        ),
      ],
      detail: l(
        "Правила ст. 62 УК РФ ограничивают верхний предел наиболее строгого вида наказания, предусмотренного санкцией. Поскольку суд избрал исправительные работы, расчётный предел лишения свободы носит справочный характер.",
        "The rules of Art. 62 CC RF cap the upper limit of the most severe punishment provided by the sanction. Since the court chose corrective labour, the calculated ceiling for deprivation of liberty is informational only.",
      ),
      practiceRefs: ["plenum-58-art62", "plenum-60-special"],
    },
    {
      id: "158-additional",
      group: "additional",
      title: l(
        "Дополнительное наказание санкцией не предусмотрено",
        "The sanction provides for no additional punishment",
      ),
      norm: l("ч. 1 ст. 158 УК РФ", "Art. 158(1) CC RF"),
      verdict: "info",
      summary: l(
        "Вопрос о дополнительном наказании не возникает.",
        "The question of an additional punishment does not arise.",
      ),
      detail: l(
        "Санкция ч. 1 ст. 158 УК РФ дополнительных видов наказания не содержит, обсуждение их назначения не требуется.",
        "The sanction of Art. 158(1) CC RF contains no additional types of punishment, so no discussion of imposing one is required.",
      ),
    },
    {
      id: "158-general",
      group: "general",
      title: l(
        "Общие начала назначения наказания соблюдены",
        "The general principles of sentencing are observed",
      ),
      norm: l("ст. 6, 43, 60 УК РФ", "Arts. 6, 43, 60 CC RF"),
      verdict: "ok",
      summary: l(
        "Учтены характер деяния, личность виновного и совокупность смягчающих обстоятельств.",
        "The nature of the act, the offender's personality and the set of mitigating circumstances were taken into account.",
      ),
      detail: l(
        "В проекте приведены мотивы выбора вида наказания: указано, что менее строгий вид не обеспечит достижение целей наказания, а более строгий не требуется с учётом возмещения ущерба и наличия иждивенца.",
        "The draft states the reasons for choosing the type of punishment: a milder type would not achieve the aims of punishment, while a more severe one is unnecessary given the compensation of damage and the dependent child.",
      ),
      practiceRefs: ["plenum-58", "plenum-55"],
    },
    {
      id: "158-edition",
      group: "edition",
      title: l(
        "Применена редакция закона, действовавшая на момент деяния",
        "The wording of the law in force at the time of the act was applied",
      ),
      norm: l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      verdict: "ok",
      summary: l(
        "На 14.11.2025 действовала редакция ч. 1 ст. 158 УК РФ, применённая в проекте.",
        "As at 14.11.2025 the wording of Art. 158(1) CC RF applied in the draft was in force.",
      ),
      calculation: [
        l(
          "Дата совершения деяния: 14.11.2025.",
          "Date of the act: 14.11.2025.",
        ),
        l(
          "Применена редакция Федерального закона от 03.07.2016 № 323-ФЗ.",
          "The wording introduced by Federal Law No. 323-FZ of 3 July 2016 was applied.",
        ),
        l(
          "Между датой деяния и рассмотрением дела санкция не изменялась.",
          "The sanction did not change between the date of the act and the trial.",
        ),
      ],
      detail: l(
        "Оснований для применения обратной силы уголовного закона не установлено: изменений, улучшающих положение подсудимого, после совершения деяния не вносилось.",
        "No grounds for retroactive application of the criminal law were found: no amendments improving the defendant's position were made after the act.",
      ),
      practiceRefs: ["presidium-art-10"],
    },
    {
      id: "158-release",
      group: "release",
      title: l(
        "Основания раздела IV УК РФ рассмотрены",
        "The grounds under Section IV CC RF were considered",
      ),
      norm: l(
        "ст. 75, 76, 76.2 УК РФ, ст. 25, 25.1, 28 УПК РФ",
        "Arts. 75, 76, 76.2 CC RF; Arts. 25, 25.1, 28 CCP RF",
      ),
      verdict: "ok",
      summary: l(
        "Условия ст. 76.2 УК РФ имеются, отказ мотивирован в проекте акта.",
        "The conditions of Art. 76.2 CC RF are met and the refusal is reasoned in the draft.",
      ),
      calculation: [
        l(
          "Преступление небольшой тяжести, совершено впервые — условия ст. 76.2 УК РФ соблюдены.",
          "A minor offence committed for the first time — the conditions of Art. 76.2 CC RF are met.",
        ),
        l(
          "Ущерб возмещён в полном объёме — условие о заглаживании вреда выполнено.",
          "The damage was compensated in full — the condition on making good the harm is satisfied.",
        ),
        l(
          "Ст. 76 УК РФ не применима: потерпевший о примирении не заявлял.",
          "Art. 76 CC RF does not apply: the victim did not declare reconciliation.",
        ),
        l(
          "В проекте приведены мотивы отказа в применении ст. 76.2 УК РФ.",
          "The draft states the reasons for not applying Art. 76.2 CC RF.",
        ),
      ],
      detail: l(
        "Проект содержит обсуждение вопроса о прекращении уголовного дела с назначением судебного штрафа и мотивированный вывод об отсутствии оснований с учётом обстоятельств содеянного. Требование о рассмотрении вопроса выполнено.",
        "The draft discusses discontinuing the case with the imposition of a court fine and gives a reasoned conclusion that there are no grounds, given the circumstances of the act. The requirement to consider the question is satisfied.",
      ),
      practiceRefs: ["plenum-19-fine", "presidium-review-76-2"],
    },
    {
      id: "158-practice",
      group: "practice",
      title: l(
        "Разъяснения Пленума и позиции Президиума ВС РФ соблюдены",
        "The Plenum's guidance and the Presidium's positions are observed",
      ),
      norm: l(
        "Постановление Пленума ВС РФ от 22.12.2015 № 58",
        "Plenum Resolution No. 58 of 22 December 2015",
      ),
      verdict: "ok",
      summary: l(
        "Расхождений с изученными разъяснениями не выявлено.",
        "No divergence from the guidance reviewed was found.",
      ),
      detail: l(
        "Мотивировка вида и размера наказания, обсуждение оснований освобождения от уголовной ответственности и указание применённой редакции закона соответствуют разъяснениям, включённым в справочник практики.",
        "The reasoning on the type and amount of punishment, the discussion of grounds for release from criminal liability and the statement of the wording of the law applied all conform to the guidance included in the practice reference.",
      ),
      practiceRefs: ["plenum-58", "plenum-55", "plenum-60-special"],
    },
  ],
  conclusion: {
    annotation: l(
      "Проект приговора по уголовному делу № 1-241/2026 в отношении Соколова А. В., обвиняемого в тайном хищении чужого имущества стоимостью 21 400 рублей, совершённом 14 ноября 2025 года. Дело рассмотрено в особом порядке. Признаны четыре смягчающих обстоятельства, отягчающие отсутствуют. Ущерб возмещён в полном объёме. Назначено наказание в виде исправительных работ на срок 8 месяцев с удержанием 10 % заработной платы.",
      "Draft judgment in criminal case No. 1-241/2026 concerning A. V. Sokolov, charged with the covert theft of property worth 21,400 roubles committed on 14 November 2025. The case was tried under the special procedure. Four mitigating circumstances were recognised; there are no aggravating ones. The damage was compensated in full. The punishment imposed is corrective labour for 8 months with 10% of wages withheld.",
    ),
    formalResult: l(
      "Нарушений требований закона не выявлено. Вид и размер наказания находятся в пределах санкции ч. 1 ст. 158 УК РФ и минимума, установленного ч. 2 ст. 50 УК РФ. Правила ч. 1 и ч. 5 ст. 62 УК РФ применимы к наиболее строгому виду наказания и назначенного наказания не затрагивают. Применена редакция закона, действовавшая на момент совершения деяния.",
      "No breaches of statutory requirements were found. The type and amount of punishment are within the sanction of Art. 158(1) CC RF and above the minimum set by Art. 50(2) CC RF. The rules of Art. 62(1) and 62(5) CC RF apply to the most severe type of punishment and do not affect the punishment imposed. The wording of the law in force at the time of the act was applied.",
    ),
    practiceResult: l(
      "Расхождений с разъяснениями Пленума Верховного Суда РФ и позициями Президиума Верховного Суда РФ, включёнными в справочник, не установлено. Вопрос о применении ст. 76.2 УК РФ обсуждён, отказ мотивирован, что соответствует требованиям постановления Пленума от 27.06.2013 № 19 и обзора практики, утверждённого Президиумом 10.07.2019.",
      "No divergence was found from the guidance of the Plenum of the Supreme Court or the positions of its Presidium included in the reference. The application of Art. 76.2 CC RF was discussed and the refusal reasoned, which meets the requirements of Plenum Resolution No. 19 of 27 June 2013 and the practice review approved by the Presidium on 10 July 2019.",
    ),
    attentionAreas: [],
    statisticalNote: l(
      "По схожим делам об исправительных работах, назначенных по ч. 1 ст. 158 УК РФ, медиана составляет 9 месяцев. Назначенный срок незначительно ниже медианы и находится в пределах обычного разброса; отклонений, требующих дополнительной мотивировки, не выявлено.",
      "In comparable cases of corrective labour imposed under Art. 158(1) CC RF the median is 9 months. The term imposed is slightly below the median and within the usual spread; no deviation requiring additional reasoning was found.",
    ),
    normsUsed: [
      l("ч. 1 ст. 158 УК РФ", "Art. 158(1) CC RF"),
      l("ст. 6 УК РФ", "Art. 6 CC RF"),
      l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      l("ст. 43 УК РФ", "Art. 43 CC RF"),
      l("ч. 2, 3 ст. 50 УК РФ", "Art. 50(2), (3) CC RF"),
      l("ст. 60 УК РФ", "Art. 60 CC RF"),
      l("ч. 1 ст. 61 УК РФ", "Art. 61(1) CC RF"),
      l("ч. 1, 5 ст. 62 УК РФ", "Art. 62(1), (5) CC RF"),
      l("ст. 76.2 УК РФ", "Art. 76.2 CC RF"),
      l("гл. 40 УПК РФ", "Ch. 40 CCP RF"),
      l("ст. 307, 308 УПК РФ", "Arts. 307, 308 CCP RF"),
    ],
  },
};
