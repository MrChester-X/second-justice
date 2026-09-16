import { l } from "@/lib/i18n/text";
import type { CaseSeed } from "./types";

/* ------------------------------------------------------------------ */
/* Дело 2. ч. 2 ст. 228 УК РФ — ниже низшего предела без ст. 64        */
/* ------------------------------------------------------------------ */

export const CASE_228: CaseSeed = {
  id: "1-198-2026",
  number: "1-198/2026",
  fileName: "Приговор_228ч2_Гареев_проект.docx",
  fileSize: 63_488,
  pages: 9,
  uploadedAt: "2026-08-19T14:05:00",
  sanctionKey: "228-2",
  params: {
    qualification: {
      confidence: "high",
      quote:
        "…виновным в совершении преступления, предусмотренного частью 2 статьи 228 Уголовного кодекса Российской Федерации…",
      value: {
        article: "228",
        part: "2",
        title: l(
          "Незаконное хранение без цели сбыта наркотических средств в крупном размере",
          "Unlawful possession of narcotic drugs on a large scale without intent to supply",
        ),
        category: "grave",
        commitDate: "2025-08-03",
      },
    },
    defendant: {
      confidence: "high",
      quote:
        "Гареев Руслан Ильдарович, родившийся 22 июля 1994 года, гражданин Российской Федерации, холост, иждивенцев не имеет, работает, ранее не судим.",
      value: {
        fio: l("Гареев Руслан Ильдарович", "Gareev Ruslan Ildarovich"),
        birthDate: "1994-07-22",
        age: 31,
        citizenship: l("Российская Федерация", "Russian Federation"),
        registration: l("г. Киров", "Kirov"),
        maritalStatus: l("холост", "single"),
        dependents: 0,
        employment: l(
          "монтажник, ИП Валеев Р. Т.",
          "installer, sole trader R. T. Valeev",
        ),
        education: l("среднее общее", "general secondary"),
        priorConvictions: "none",
        priorConvictionsNote: l(
          "судимостей не имеет",
          "has no prior convictions",
        ),
        health: l(
          "состоит на учёте с хроническим заболеванием",
          "registered with a chronic medical condition",
        ),
        recidivism: false,
      },
    },
    mitigating: [
      {
        norm: l("п. «и» ч. 1 ст. 61 УК РФ", "Art. 61(1)(i) CC RF"),
        text: l(
          "активное способствование раскрытию и расследованию преступления",
          "active assistance in detecting and investigating the offence",
        ),
        recognized: true,
      },
      {
        norm: l("ч. 2 ст. 61 УК РФ", "Art. 61(2) CC RF"),
        text: l(
          "признание вины, состояние здоровья подсудимого",
          "admission of guilt, the defendant's state of health",
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
      activeCooperation: true,
      damageCompensated: false,
      reconciled: false,
      firstOffence: true,
    },
    punishment: {
      confidence: "high",
      quote:
        "…назначить наказание в виде лишения свободы на срок 2 (два) года 6 (шесть) месяцев с отбыванием в исправительной колонии общего режима.",
      value: {
        main: {
          kind: "imprisonment",
          unit: "months",
          amount: 30,
          note: l(
            "исправительная колония общего режима",
            "general-regime correctional colony",
          ),
        },
        additional: [],
      },
    },
  },
  scaleLimits: [
    {
      value: 80,
      norm: l("ч. 1 ст. 62 УК РФ", "Art. 62(1) CC RF"),
      label: l("предел 2/3 максимума", "2/3 of the maximum"),
    },
  ],
  checks: [
    {
      id: "228-sanction",
      group: "sanction",
      title: l(
        "Наказание назначено ниже низшего предела санкции",
        "The punishment is below the lower limit of the sanction",
      ),
      norm: l("ч. 2 ст. 228 УК РФ, ст. 64 УК РФ", "Art. 228(2), Art. 64 CC RF"),
      verdict: "violation",
      summary: l(
        "Назначено 2 года 6 месяцев лишения свободы при нижнем пределе санкции 3 года; ст. 64 УК РФ в проекте не применена.",
        "Two years and six months of deprivation of liberty were imposed where the lower limit of the sanction is three years; Art. 64 CC RF was not applied in the draft.",
      ),
      calculation: [
        l(
          "Санкция предусматривает лишение свободы на срок от 3 до 10 лет (от 36 до 120 месяцев).",
          "The sanction provides for deprivation of liberty from 3 to 10 years (from 36 to 120 months).",
        ),
        l("Назначено: 30 месяцев.", "Imposed: 30 months."),
        l(
          "30 < 36 — выход за нижний предел санкции на 6 месяцев.",
          "30 < 36 — the lower limit of the sanction is undercut by 6 months.",
        ),
        l(
          "Ссылка на ст. 64 УК РФ и вывод о наличии исключительных обстоятельств в проекте отсутствуют.",
          "The draft contains no reference to Art. 64 CC RF and no finding of exceptional circumstances.",
        ),
      ],
      detail: l(
        "Выход за нижний предел санкции допустим только при применении ст. 64 УК РФ с указанием исключительных обстоятельств. Совокупность смягчающих обстоятельств сама по себе таким основанием не является. Требуется либо привести наказание в соответствие с санкцией, либо мотивировать применение ст. 64 УК РФ со ссылкой на эту норму в описательно-мотивировочной и резолютивной частях.",
        "Going below the lower limit of the sanction is permissible only under Art. 64 CC RF with exceptional circumstances stated. The sum of mitigating circumstances is not itself such a ground. Either the punishment must be brought within the sanction, or the application of Art. 64 CC RF must be reasoned with a reference to that provision in the reasoning and operative parts.",
      ),
      practiceRefs: ["plenum-58-below-min", "plenum-58"],
    },
    {
      id: "228-art62",
      group: "special_rules",
      title: l(
        "Правило ч. 1 ст. 62 УК РФ снижает максимум, а не минимум",
        "Art. 62(1) CC RF lowers the maximum, not the minimum",
      ),
      norm: l("ч. 1 ст. 62 УК РФ", "Art. 62(1) CC RF"),
      verdict: "info",
      summary: l(
        "Применение ч. 1 ст. 62 УК РФ даёт предел 6 лет 8 месяцев и не позволяет выйти ниже 3 лет.",
        "Applying Art. 62(1) CC RF yields a ceiling of 6 years 8 months and does not allow going below 3 years.",
      ),
      calculation: [
        l(
          "Признано п. «и» ч. 1 ст. 61 УК РФ, отягчающих обстоятельств нет — ч. 1 ст. 62 УК РФ применима.",
          "Art. 61(1)(i) CC RF is recognised and there are no aggravating circumstances — Art. 62(1) CC RF applies.",
        ),
        l(
          "Максимум санкции: 120 месяцев.",
          "Maximum of the sanction: 120 months.",
        ),
        l(
          "120 × 2/3 = 80 месяцев (6 лет 8 месяцев) — верхний предел.",
          "120 × 2/3 = 80 months (6 years 8 months) — the ceiling.",
        ),
        l(
          "Нижний предел санкции при этом не изменяется и составляет 36 месяцев.",
          "The lower limit of the sanction is unaffected and remains 36 months.",
        ),
      ],
      detail: l(
        "Правила ст. 62 УК РФ ограничивают верхний предел наиболее строгого вида наказания. Ссылка на них не может обосновать назначение наказания ниже низшего предела санкции: для этого требуется ст. 64 УК РФ.",
        "The rules of Art. 62 CC RF cap the upper limit of the most severe type of punishment. They cannot justify a punishment below the lower limit of the sanction: that requires Art. 64 CC RF.",
      ),
      practiceRefs: ["plenum-58-art62"],
    },
    {
      id: "228-additional",
      group: "additional",
      title: l(
        "Вопрос о дополнительном наказании не обсуждён",
        "The additional punishment was not addressed",
      ),
      norm: l("ч. 2 ст. 228 УК РФ, ст. 45 УК РФ", "Art. 228(2), Art. 45 CC RF"),
      verdict: "warning",
      summary: l(
        "Санкция предусматривает штраф до 500 000 рублей как возможное дополнительное наказание; мотивы его неназначения не приведены.",
        "The sanction provides for a fine of up to 500,000 roubles as an optional additional punishment; no reasons for omitting it are given.",
      ),
      calculation: [
        l(
          "Санкция: со штрафом в размере до 500 000 рублей либо без такового.",
          "The sanction: with a fine of up to 500,000 roubles or without it.",
        ),
        l(
          "Дополнительное наказание не является обязательным.",
          "The additional punishment is not mandatory.",
        ),
        l(
          "В проекте не приведены мотивы решения о его неназначении.",
          "The draft gives no reasons for the decision not to impose it.",
        ),
      ],
      detail: l(
        "Когда дополнительное наказание предусмотрено санкцией как возможное, суд обязан обсудить вопрос о его назначении и привести мотивы принятого решения. Отсутствие такой мотивировки может быть расценено как неполнота судебного акта.",
        "Where the sanction makes an additional punishment optional, the court must address the question of imposing it and state the reasons for its decision. The absence of such reasoning may be treated as an incomplete judgment.",
      ),
      practiceRefs: ["plenum-58-additional", "plenum-55"],
    },
    {
      id: "228-general",
      group: "general",
      title: l(
        "Мотивировка вида наказания приведена",
        "The choice of the type of punishment is reasoned",
      ),
      norm: l("ст. 6, 43, 60 УК РФ", "Arts. 6, 43, 60 CC RF"),
      verdict: "ok",
      summary: l(
        "Характер деяния, данные о личности и смягчающие обстоятельства в проекте учтены.",
        "The nature of the act, the personal details and the mitigating circumstances are taken into account in the draft.",
      ),
      detail: l(
        "В проекте отражены сведения о личности подсудимого, состоянии здоровья и активном способствовании расследованию. Замечание касается не мотивировки, а размера наказания относительно санкции.",
        "The draft reflects the defendant's personal details, state of health and active assistance to the investigation. The finding concerns not the reasoning but the amount of punishment relative to the sanction.",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "228-edition",
      group: "edition",
      title: l(
        "Применена редакция закона, действовавшая на момент деяния",
        "The wording of the law in force at the time of the act was applied",
      ),
      norm: l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      verdict: "ok",
      summary: l(
        "На 03.08.2025 действовала редакция ч. 2 ст. 228 УК РФ, применённая в проекте.",
        "As at 03.08.2025 the wording of Art. 228(2) CC RF applied in the draft was in force.",
      ),
      calculation: [
        l(
          "Дата совершения деяния: 03.08.2025.",
          "Date of the act: 03.08.2025.",
        ),
        l(
          "Применена редакция Федерального закона от 01.03.2012 № 18-ФЗ.",
          "The wording introduced by Federal Law No. 18-FZ of 1 March 2012 was applied.",
        ),
        l(
          "Изменений, улучшающих положение подсудимого, после этой даты не вносилось.",
          "No amendments improving the defendant's position were made after that date.",
        ),
      ],
      detail: l(
        "Основания для применения обратной силы уголовного закона отсутствуют.",
        "There are no grounds for retroactive application of the criminal law.",
      ),
      practiceRefs: ["presidium-art-10"],
    },
    {
      id: "228-release",
      group: "release",
      title: l(
        "Основания раздела IV УК РФ отсутствуют",
        "No grounds under Section IV CC RF are available",
      ),
      norm: l("ст. 75, 76, 76.2, 78 УК РФ", "Arts. 75, 76, 76.2, 78 CC RF"),
      verdict: "info",
      summary: l(
        "Преступление относится к тяжким, освобождение от уголовной ответственности по указанным основаниям невозможно.",
        "The offence is a grave one, so release from criminal liability on those grounds is not available.",
      ),
      calculation: [
        l(
          "Категория преступления — тяжкое (ч. 4 ст. 15 УК РФ).",
          "Category of the offence — grave (Art. 15(4) CC RF).",
        ),
        l(
          "Ст. 75, 76 и 76.2 УК РФ применяются к преступлениям небольшой и средней тяжести.",
          "Arts. 75, 76 and 76.2 CC RF apply to minor offences and offences of medium gravity.",
        ),
        l(
          "Сроки давности по ст. 78 УК РФ не истекли.",
          "The limitation periods under Art. 78 CC RF have not expired.",
        ),
      ],
      detail: l(
        "Оснований для прекращения уголовного дела в порядке ст. 25, 25.1 или 28 УПК РФ не установлено.",
        "No grounds were found for discontinuing the case under Arts. 25, 25.1 or 28 CCP RF.",
      ),
      practiceRefs: ["plenum-19"],
    },
    {
      id: "228-practice",
      group: "practice",
      title: l(
        "Выявлено расхождение с разъяснениями Пленума ВС РФ",
        "A divergence from the Plenum's guidance was found",
      ),
      norm: l(
        "Постановление Пленума ВС РФ от 22.12.2015 № 58",
        "Plenum Resolution No. 58 of 22 December 2015",
      ),
      verdict: "violation",
      summary: l(
        "Назначение наказания ниже низшего предела без ссылки на ст. 64 УК РФ противоречит разъяснениям.",
        "Imposing a punishment below the lower limit without a reference to Art. 64 CC RF contradicts the guidance.",
      ),
      detail: l(
        "Согласно разъяснениям, выход за нижний предел санкции требует установления исключительных обстоятельств и прямой ссылки на ст. 64 УК РФ в приговоре. Проект таких выводов не содержит, что является типичным основанием для изменения приговора судом апелляционной инстанции.",
        "According to the guidance, going below the lower limit of the sanction requires exceptional circumstances to be established and an express reference to Art. 64 CC RF in the judgment. The draft contains no such findings, which is a typical ground for the appellate court to vary the judgment.",
      ),
      practiceRefs: ["plenum-58-below-min", "plenum-55"],
    },
  ],
  conclusion: {
    annotation: l(
      "Проект приговора по уголовному делу № 1-198/2026 в отношении Гареева Р. И., обвиняемого в незаконном хранении без цели сбыта наркотических средств в крупном размере, совершённом 3 августа 2025 года. Дело рассмотрено в общем порядке. Признаны два смягчающих обстоятельства, отягчающие отсутствуют. Назначено наказание в виде лишения свободы на срок 2 года 6 месяцев с отбыванием в исправительной колонии общего режима.",
      "Draft judgment in criminal case No. 1-198/2026 concerning R. I. Gareev, charged with the unlawful possession of narcotic drugs on a large scale without intent to supply, committed on 3 August 2025. The case was tried under the ordinary procedure. Two mitigating circumstances were recognised; there are no aggravating ones. The punishment imposed is deprivation of liberty for 2 years 6 months in a general-regime correctional colony.",
    ),
    formalResult: l(
      "Выявлено нарушение требований закона. Назначенный срок лишения свободы — 30 месяцев — ниже низшего предела санкции ч. 2 ст. 228 УК РФ, составляющего 36 месяцев, при отсутствии в проекте ссылки на ст. 64 УК РФ и вывода о наличии исключительных обстоятельств. Ссылка на ч. 1 ст. 62 УК РФ такой выход обосновать не может: это правило снижает верхний, а не нижний предел. Дополнительно отмечается, что вопрос о назначении предусмотренного санкцией штрафа в проекте не обсуждён.",
      "A breach of statutory requirements was found. The term of deprivation of liberty imposed — 30 months — is below the lower limit of the sanction of Art. 228(2) CC RF, which is 36 months, while the draft contains no reference to Art. 64 CC RF and no finding of exceptional circumstances. A reference to Art. 62(1) CC RF cannot justify this: that rule lowers the upper limit, not the lower one. It is further noted that the draft does not address the fine provided by the sanction.",
    ),
    practiceResult: l(
      "Установлено расхождение с разъяснениями постановления Пленума Верховного Суда РФ от 22.12.2015 № 58 о порядке назначения более мягкого наказания, чем предусмотрено за данное преступление, и с требованиями постановления от 29.11.2016 № 55 о мотивировке решений по вопросам наказания.",
      "A divergence was established from Plenum Resolution No. 58 of 22 December 2015 on imposing a punishment milder than that prescribed for the offence, and from the requirements of Resolution No. 55 of 29 November 2016 on reasoning sentencing decisions.",
    ),
    attentionAreas: [
      {
        title: l(
          "Размер основного наказания ниже низшего предела санкции",
          "The principal punishment is below the lower limit of the sanction",
        ),
        text: l(
          "Требуется либо привести наказание в соответствие с санкцией (не менее 3 лет лишения свободы), либо мотивировать применение ст. 64 УК РФ с указанием исключительных обстоятельств и ссылкой на эту норму в описательно-мотивировочной и резолютивной частях приговора.",
          "Either the punishment must be brought within the sanction (at least 3 years of deprivation of liberty), or the application of Art. 64 CC RF must be reasoned, stating the exceptional circumstances and referring to that provision in the reasoning and operative parts of the judgment.",
        ),
        severity: "violation",
      },
      {
        title: l(
          "Не обсуждён вопрос о дополнительном наказании",
          "The additional punishment was not addressed",
        ),
        text: l(
          "Санкция предусматривает штраф до 500 000 рублей как возможное дополнительное наказание. В проекте отсутствуют мотивы решения о его неназначении.",
          "The sanction provides for a fine of up to 500,000 roubles as an optional additional punishment. The draft gives no reasons for the decision not to impose it.",
        ),
        severity: "warning",
      },
      {
        title: l("Соотношение с практикой", "Comparison with practice"),
        text: l(
          "Назначенный срок ниже минимального срока, встречающегося по схожим делам в базе решений, что дополнительно указывает на необходимость проверки расчёта наказания.",
          "The term imposed is below the shortest term found in comparable cases in the database, which is a further indication that the sentencing calculation should be checked.",
        ),
        severity: "warning",
      },
    ],
    statisticalNote: l(
      "По схожим делам о лишении свободы, назначенном по ч. 2 ст. 228 УК РФ, медиана составляет 4 года 6 месяцев, нижняя граница выборки — 3 года. Назначенный срок находится ниже всей выборки.",
      "In comparable cases of deprivation of liberty imposed under Art. 228(2) CC RF the median is 4 years 6 months and the lowest value in the sample is 3 years. The term imposed lies below the entire sample.",
    ),
    normsUsed: [
      l("ч. 2 ст. 228 УК РФ", "Art. 228(2) CC RF"),
      l("ст. 6 УК РФ", "Art. 6 CC RF"),
      l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      l("ч. 4 ст. 15 УК РФ", "Art. 15(4) CC RF"),
      l("ст. 43 УК РФ", "Art. 43 CC RF"),
      l("ст. 45 УК РФ", "Art. 45 CC RF"),
      l("ч. 2 ст. 56 УК РФ", "Art. 56(2) CC RF"),
      l("ст. 60 УК РФ", "Art. 60 CC RF"),
      l("п. «и» ч. 1 ст. 61 УК РФ", "Art. 61(1)(i) CC RF"),
      l("ч. 1 ст. 62 УК РФ", "Art. 62(1) CC RF"),
      l("ст. 64 УК РФ", "Art. 64 CC RF"),
      l("ст. 307, 308 УПК РФ", "Arts. 307, 308 CCP RF"),
    ],
  },
};
