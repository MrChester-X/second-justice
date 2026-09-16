import { l } from "@/lib/i18n/text";
import type { CaseSeed } from "./types";

/* ------------------------------------------------------------------ */
/* Дело 5. ч. 3 ст. 264 УК РФ — превышен предел ч. 2 ст. 62 УК РФ      */
/* ------------------------------------------------------------------ */

export const CASE_264: CaseSeed = {
  id: "1-155-2026",
  number: "1-155/2026",
  fileName: "Приговор_264ч3_Лапшин_проект.docx",
  fileSize: 96_256,
  pages: 11,
  uploadedAt: "2026-08-21T18:47:00",
  sanctionKey: "264-3",
  params: {
    qualification: {
      confidence: "high",
      quote:
        "…виновным в совершении преступления, предусмотренного частью 3 статьи 264 Уголовного кодекса Российской Федерации…",
      value: {
        article: "264",
        part: "3",
        title: l(
          "Нарушение правил дорожного движения, повлёкшее по неосторожности смерть человека",
          "Breach of traffic rules causing a person's death by negligence",
        ),
        category: "medium",
        commitDate: "2025-05-12",
      },
    },
    defendant: {
      confidence: "high",
      quote:
        "Лапшин Виктор Петрович, родившийся 4 февраля 1978 года, женат, имеет двоих детей, работает водителем, ранее не судим.",
      value: {
        fio: l("Лапшин Виктор Петрович", "Lapshin Viktor Petrovich"),
        birthDate: "1978-02-04",
        age: 48,
        citizenship: l("Российская Федерация", "Russian Federation"),
        registration: l("г. Киров", "Kirov"),
        maritalStatus: l("женат", "married"),
        dependents: 2,
        employment: l(
          "водитель, ООО «Транссервис-Киров»",
          "driver, Transservice-Kirov LLC",
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
        norm: l("п. «и» ч. 1 ст. 61 УК РФ", "Art. 61(1)(i) CC RF"),
        text: l(
          "активное способствование раскрытию и расследованию преступления в рамках досудебного соглашения",
          "active assistance in detecting and investigating the offence under a pre-trial cooperation agreement",
        ),
        recognized: true,
      },
      {
        norm: l("п. «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(k) CC RF"),
        text: l(
          "добровольное возмещение вреда потерпевшей стороне в размере 500 000 рублей",
          "voluntary compensation of harm to the victim's family in the amount of 500,000 roubles",
        ),
        recognized: true,
      },
      {
        norm: l("ч. 2 ст. 61 УК РФ", "Art. 61(2) CC RF"),
        text: l(
          "признание вины, положительные характеристики, наличие двоих детей",
          "admission of guilt, positive references, two children",
        ),
        recognized: true,
      },
    ],
    aggravating: [],
    procedure: {
      specialOrder: false,
      preTrialAgreement: true,
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
        "…назначить наказание в виде лишения свободы на срок 3 (три) года с отбыванием в колонии-поселении.",
      value: {
        main: {
          kind: "imprisonment",
          unit: "months",
          amount: 36,
          note: l("колония-поселение", "open correctional settlement"),
        },
        additional: [],
      },
    },
  },
  scaleLimits: [
    {
      value: 30,
      norm: l("ч. 2 ст. 62 УК РФ", "Art. 62(2) CC RF"),
      label: l(
        "предел 1/2 максимума при досудебном соглашении",
        "1/2 of the maximum under a cooperation agreement",
      ),
    },
  ],
  checks: [
    {
      id: "264-sanction",
      group: "sanction",
      title: l(
        "Наказание находится в пределах санкции статьи",
        "The punishment is within the limits of the sanction",
      ),
      norm: l(
        "ч. 3 ст. 264 УК РФ, ч. 2 ст. 56 УК РФ",
        "Art. 264(3), Art. 56(2) CC RF",
      ),
      verdict: "ok",
      summary: l(
        "3 года лишения свободы формально соответствуют санкции.",
        "Three years of deprivation of liberty formally comply with the sanction.",
      ),
      calculation: [
        l(
          "Санкция предусматривает лишение свободы на срок до 5 лет (60 месяцев).",
          "The sanction provides for deprivation of liberty for up to 5 years (60 months).",
        ),
        l(
          "Нижний предел санкцией не установлен, применяется минимум Общей части — 2 месяца (ч. 2 ст. 56 УК РФ).",
          "The sanction sets no lower limit, so the General Part minimum applies — 2 months (Art. 56(2) CC RF).",
        ),
        l(
          "Допустимый диапазон по санкции: от 2 до 60 месяцев.",
          "Permissible range under the sanction: from 2 to 60 months.",
        ),
        l(
          "Назначено: 36 месяцев — внутри диапазона санкции.",
          "Imposed: 36 months — within the range of the sanction.",
        ),
      ],
      detail: l(
        "Пределы санкции соблюдены. Ограничение, установленное Общей частью в связи с досудебным соглашением, проверяется отдельно и является более строгим.",
        "The limits of the sanction are observed. The cap imposed by the General Part on account of the cooperation agreement is checked separately and is stricter.",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "264-art62",
      group: "special_rules",
      title: l(
        "Превышен предел, установленный ч. 2 ст. 62 УК РФ",
        "The ceiling set by Art. 62(2) CC RF is exceeded",
      ),
      norm: l(
        "ч. 2 ст. 62 УК РФ, гл. 40.1 УПК РФ",
        "Art. 62(2) CC RF, Ch. 40.1 CCP RF",
      ),
      verdict: "violation",
      summary: l(
        "При досудебном соглашении о сотрудничестве предел составляет 2 года 6 месяцев; назначено 3 года.",
        "Under a pre-trial cooperation agreement the ceiling is 2 years 6 months; 3 years were imposed.",
      ),
      calculation: [
        l(
          "Заключено досудебное соглашение о сотрудничестве (гл. 40.1 УПК РФ) — применяется ч. 2 ст. 62 УК РФ.",
          "A pre-trial cooperation agreement was concluded (Ch. 40.1 CCP RF), so Art. 62(2) CC RF applies.",
        ),
        l(
          "Наиболее строгий вид наказания в санкции — лишение свободы до 60 месяцев.",
          "The most severe punishment in the sanction is deprivation of liberty for up to 60 months.",
        ),
        l(
          "60 × 1/2 = 30 месяцев (2 года 6 месяцев) — предельный срок.",
          "60 × 1/2 = 30 months (2 years 6 months) — the maximum term.",
        ),
        l("Назначено: 36 месяцев.", "Imposed: 36 months."),
        l(
          "36 > 30 — превышение предела на 6 месяцев.",
          "36 > 30 — the ceiling is exceeded by 6 months.",
        ),
      ],
      detail: l(
        "Правило ч. 2 ст. 62 УК РФ является императивным: при заключении досудебного соглашения о сотрудничестве срок наказания не может превышать половины максимального срока наиболее строгого вида наказания, предусмотренного санкцией. Ограничение вычисляется от максимума санкции и не зависит от того, какой срок суд счёл справедливым. Требуется снизить наказание до 2 лет 6 месяцев либо ниже.",
        "The rule of Art. 62(2) CC RF is mandatory: where a pre-trial cooperation agreement has been concluded, the term may not exceed one half of the maximum term of the most severe punishment provided by the sanction. The cap is calculated from the maximum of the sanction and does not depend on the term the court considered just. The punishment must be reduced to 2 years 6 months or less.",
      ),
      practiceRefs: ["plenum-58-art62", "plenum-58"],
    },
    {
      id: "264-additional",
      group: "additional",
      title: l(
        "Не назначено дополнительное наказание, предусмотренное санкцией",
        "The additional punishment provided by the sanction was not imposed",
      ),
      norm: l("ч. 3 ст. 264 УК РФ, ст. 47 УК РФ", "Art. 264(3), Art. 47 CC RF"),
      verdict: "violation",
      summary: l(
        "Санкция предусматривает лишение права заниматься деятельностью, связанной с управлением транспортным средством; в проекте оно не назначено, мотивы не приведены.",
        "The sanction provides for deprivation of the right to engage in activities involving the operation of a vehicle; the draft neither imposes it nor gives reasons.",
      ),
      calculation: [
        l(
          "Санкция: лишением свободы на срок до 5 лет с лишением права занимать определённые должности или заниматься определённой деятельностью на срок до 3 лет.",
          "The sanction: deprivation of liberty for up to 5 years with deprivation of the right to hold certain positions or engage in certain activities for up to 3 years.",
        ),
        l(
          "Оговорка «либо без такового» в тексте санкции, внесённом в справочник прототипа, отсутствует — дополнительное наказание обязательно.",
          "The wording of the sanction entered into the prototype's reference contains no “or without it” qualifier, so the additional punishment is mandatory.",
        ),
        l(
          "В проекте дополнительное наказание не назначено.",
          "The draft does not impose the additional punishment.",
        ),
        l(
          "Ссылка на ст. 64 УК РФ, позволяющая не применять обязательное дополнительное наказание, отсутствует.",
          "There is no reference to Art. 64 CC RF, which would allow a mandatory additional punishment to be omitted.",
        ),
      ],
      detail: l(
        "Если санкция предусматривает дополнительное наказание без оговорки «либо без такового», его назначение обязательно; неназначение допускается только при применении ст. 64 УК РФ с приведением мотивов. Обратите внимание: вывод опирается на формулировку санкции, внесённую в справочник прототипа, и подлежит сверке с действующей редакцией ч. 3 ст. 264 УК РФ.",
        "Where the sanction provides for an additional punishment without the “or without it” qualifier, imposing it is mandatory; omitting it is permissible only under Art. 64 CC RF with reasons given. Note: this conclusion rests on the wording of the sanction entered into the prototype's reference and must be checked against the current wording of Art. 264(3) CC RF.",
      ),
      practiceRefs: ["plenum-58-additional", "plenum-25-traffic", "plenum-55"],
    },
    {
      id: "264-release",
      group: "release",
      title: l(
        "Основание ст. 76.2 УК РФ формально применимо",
        "The ground under Art. 76.2 CC RF is formally available",
      ),
      norm: l(
        "ст. 76.2 УК РФ, ст. 25.1 УПК РФ",
        "Art. 76.2 CC RF, Art. 25.1 CCP RF",
      ),
      verdict: "warning",
      summary: l(
        "Формальные условия судебного штрафа соблюдены; вопрос требует обсуждения с учётом наступления смерти человека.",
        "The formal conditions for a court fine are met; the question needs to be addressed in view of the death that resulted.",
      ),
      calculation: [
        l(
          "Категория преступления — средней тяжести (ч. 3 ст. 15 УК РФ).",
          "Category of the offence — of medium gravity (Art. 15(3) CC RF).",
        ),
        l(
          "Преступление совершено впервые — условие соблюдено.",
          "The offence was committed for the first time — the condition is met.",
        ),
        l(
          "Вред возмещён в размере 500 000 рублей — условие соблюдено.",
          "Harm of 500,000 roubles was compensated — the condition is met.",
        ),
        l(
          "Формальные условия ст. 76.2 УК РФ имеются.",
          "The formal conditions of Art. 76.2 CC RF are present.",
        ),
      ],
      detail: l(
        "Наступление смерти человека не исключает формального применения ст. 76.2 УК РФ, однако практика исходит из того, что заглаживание вреда в таких случаях должно оцениваться с особой тщательностью, а отказ — быть мотивированным. Проект обсуждения этого вопроса не содержит. Рекомендуется дополнить судебный акт мотивированным выводом.",
        "The death of a person does not formally preclude the application of Art. 76.2 CC RF, but practice holds that making good the harm in such cases must be assessed with particular care and any refusal reasoned. The draft contains no discussion of this. It is advisable to supplement the judgment with a reasoned conclusion.",
      ),
      practiceRefs: ["plenum-19-fine", "presidium-review-76-2"],
    },
    {
      id: "264-general",
      group: "general",
      title: l(
        "Общие начала назначения наказания соблюдены",
        "The general principles of sentencing are observed",
      ),
      norm: l("ст. 6, 43, 60 УК РФ", "Arts. 6, 43, 60 CC RF"),
      verdict: "ok",
      summary: l(
        "Учтены характер деяния, данные о личности и совокупность смягчающих обстоятельств.",
        "The nature of the act, the personal details and the set of mitigating circumstances were taken into account.",
      ),
      detail: l(
        "Мотивировка выбора вида наказания и вида исправительного учреждения в проекте приведена. Замечания касаются пределов наказания и дополнительного наказания.",
        "The draft states the reasons for the type of punishment and the type of correctional facility. The findings concern the sentencing limits and the additional punishment.",
      ),
      practiceRefs: ["plenum-58"],
    },
    {
      id: "264-edition",
      group: "edition",
      title: l(
        "Применена редакция закона, действовавшая на момент деяния",
        "The wording of the law in force at the time of the act was applied",
      ),
      norm: l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      verdict: "ok",
      summary: l(
        "На 12.05.2025 действовала редакция ч. 3 ст. 264 УК РФ, применённая в проекте.",
        "As at 12.05.2025 the wording of Art. 264(3) CC RF applied in the draft was in force.",
      ),
      calculation: [
        l(
          "Дата совершения деяния: 12.05.2025.",
          "Date of the act: 12.05.2025.",
        ),
        l(
          "Применена редакция Федерального закона от 17.06.2019 № 146-ФЗ.",
          "The wording introduced by Federal Law No. 146-FZ of 17 June 2019 was applied.",
        ),
        l(
          "Часть 3 применена верно: состояние опьянения и оставление места происшествия не установлены, признаки ч. 4 отсутствуют.",
          "Part 3 was applied correctly: intoxication and leaving the scene were not established, so the elements of Part 4 are absent.",
        ),
      ],
      detail: l(
        "Разграничение частей 3 и 4 ст. 264 УК РФ проведено правильно, что существенно: часть 4 предусматривает лишение свободы от 5 до 12 лет.",
        "Parts 3 and 4 of Art. 264 CC RF were distinguished correctly, which matters: Part 4 provides for deprivation of liberty from 5 to 12 years.",
      ),
      practiceRefs: ["presidium-art-10", "plenum-25-traffic"],
    },
    {
      id: "264-practice",
      group: "practice",
      title: l(
        "Выявлены расхождения с разъяснениями Пленума ВС РФ",
        "Divergences from the Plenum's guidance were found",
      ),
      norm: l(
        "Постановления Пленума ВС РФ № 58, № 25 и № 55",
        "Plenum Resolutions No. 58, No. 25 and No. 55",
      ),
      verdict: "violation",
      summary: l(
        "Нарушены разъяснения о пределах наказания при досудебном соглашении и о дополнительном наказании по ст. 264 УК РФ.",
        "The guidance on sentencing limits under a cooperation agreement and on the additional punishment under Art. 264 CC RF was not followed.",
      ),
      detail: l(
        "Разъяснения указывают, что ограничение ч. 2 ст. 62 УК РФ применяется к максимуму санкции, а вопрос о лишении права управления транспортным средством по делам о ст. 264 УК РФ подлежит обязательному обсуждению с приведением мотивов. Оба требования в проекте не выполнены.",
        "The guidance states that the cap in Art. 62(2) CC RF applies to the maximum of the sanction, and that in cases under Art. 264 CC RF the deprivation of the right to drive must be addressed with reasons given. Neither requirement is met in the draft.",
      ),
      practiceRefs: ["plenum-58-art62", "plenum-25-traffic", "plenum-55"],
    },
  ],
  conclusion: {
    annotation: l(
      "Проект приговора по уголовному делу № 1-155/2026 в отношении Лапшина В. П., обвиняемого в нарушении правил дорожного движения, повлёкшем по неосторожности смерть человека, 12 мая 2025 года. С подсудимым заключено досудебное соглашение о сотрудничестве. Признаны три смягчающих обстоятельства, отягчающие отсутствуют. Возмещён вред в размере 500 000 рублей. Назначено наказание в виде лишения свободы на срок 3 года с отбыванием в колонии-поселении; дополнительное наказание не назначено.",
      "Draft judgment in criminal case No. 1-155/2026 concerning V. P. Lapshin, charged with a breach of traffic rules causing a person's death by negligence on 12 May 2025. A pre-trial cooperation agreement was concluded with the defendant. Three mitigating circumstances were recognised; there are no aggravating ones. Harm of 500,000 roubles was compensated. The punishment imposed is deprivation of liberty for 3 years in an open correctional settlement; no additional punishment was imposed.",
    ),
    formalResult: l(
      "Выявлены два нарушения требований закона. Во-первых, превышен предел, установленный ч. 2 ст. 62 УК РФ: при заключении досудебного соглашения о сотрудничестве наказание не может превышать половины максимального срока наиболее строгого вида наказания, то есть 2 лет 6 месяцев, тогда как назначено 3 года. Во-вторых, не назначено дополнительное наказание в виде лишения права заниматься деятельностью, связанной с управлением транспортным средством, которое, согласно внесённой в справочник формулировке санкции, является обязательным; мотивы неназначения и ссылка на ст. 64 УК РФ отсутствуют.",
      "Two breaches of statutory requirements were found. First, the ceiling set by Art. 62(2) CC RF is exceeded: where a pre-trial cooperation agreement has been concluded, the punishment may not exceed one half of the maximum term of the most severe type of punishment, that is 2 years 6 months, whereas 3 years were imposed. Second, no additional punishment in the form of deprivation of the right to engage in activities involving the operation of a vehicle was imposed, although under the wording of the sanction entered into the reference it is mandatory; no reasons for the omission and no reference to Art. 64 CC RF are given.",
    ),
    practiceResult: l(
      "Установлены расхождения с постановлением Пленума Верховного Суда РФ от 22.12.2015 № 58 в части порядка применения ч. 2 ст. 62 УК РФ и с постановлением от 09.12.2008 № 25 в части обсуждения дополнительного наказания по делам о преступлениях, связанных с нарушением правил дорожного движения. Не выполнено требование постановления от 29.11.2016 № 55 о мотивировке решений по вопросам наказания.",
      "Divergences were established from Plenum Resolution No. 58 of 22 December 2015 as to the application of Art. 62(2) CC RF, and from Resolution No. 25 of 9 December 2008 as to addressing the additional punishment in cases involving breaches of traffic rules. The requirement of Resolution No. 55 of 29 November 2016 to reason sentencing decisions was not met.",
    ),
    attentionAreas: [
      {
        title: l(
          "Превышен предел ч. 2 ст. 62 УК РФ",
          "The ceiling of Art. 62(2) CC RF is exceeded",
        ),
        text: l(
          "Расчётный предел — 2 года 6 месяцев лишения свободы (половина максимума санкции). Назначено 3 года. Требуется снижение наказания.",
          "The calculated ceiling is 2 years 6 months of deprivation of liberty (one half of the maximum of the sanction). Three years were imposed. The punishment must be reduced.",
        ),
        severity: "violation",
      },
      {
        title: l(
          "Не назначено дополнительное наказание",
          "The additional punishment was not imposed",
        ),
        text: l(
          "Санкция предусматривает лишение права заниматься определённой деятельностью на срок до 3 лет. Требуется его назначение либо мотивированное применение ст. 64 УК РФ. Формулировка санкции подлежит сверке с действующей редакцией.",
          "The sanction provides for deprivation of the right to engage in certain activities for up to 3 years. It must be imposed, or Art. 64 CC RF applied with reasons. The wording of the sanction must be checked against the current version.",
        ),
        severity: "violation",
      },
      {
        title: l(
          "Не обсуждено основание ст. 76.2 УК РФ",
          "The ground under Art. 76.2 CC RF was not addressed",
        ),
        text: l(
          "Формальные условия судебного штрафа соблюдены. Требуется мотивированный вывод по этому вопросу с учётом наступивших последствий.",
          "The formal conditions for a court fine are met. A reasoned conclusion on this question is required, taking the consequences into account.",
        ),
        severity: "warning",
      },
    ],
    statisticalNote: l(
      "По схожим делам о лишении свободы, назначенном по ч. 3 ст. 264 УК РФ, медиана составляет 3 года. Назначенный срок совпадает с медианой практики — статистических отклонений не выявлено. Этот случай показателен: соответствие практике не устраняет нарушения императивной нормы о пределах наказания.",
      "In comparable cases of deprivation of liberty imposed under Art. 264(3) CC RF the median is 3 years. The term imposed equals the median of practice — no statistical deviation was found. This case is instructive: conformity with practice does not cure a breach of a mandatory rule on sentencing limits.",
    ),
    normsUsed: [
      l("ч. 3 ст. 264 УК РФ", "Art. 264(3) CC RF"),
      l("ст. 6 УК РФ", "Art. 6 CC RF"),
      l("ст. 9, 10 УК РФ", "Arts. 9, 10 CC RF"),
      l("ч. 3 ст. 15 УК РФ", "Art. 15(3) CC RF"),
      l("ст. 43 УК РФ", "Art. 43 CC RF"),
      l("ст. 47 УК РФ", "Art. 47 CC RF"),
      l("ч. 2 ст. 56 УК РФ", "Art. 56(2) CC RF"),
      l("ст. 60 УК РФ", "Art. 60 CC RF"),
      l("п. «и», «к» ч. 1 ст. 61 УК РФ", "Art. 61(1)(i), (k) CC RF"),
      l("ч. 2 ст. 62 УК РФ", "Art. 62(2) CC RF"),
      l("ст. 64 УК РФ", "Art. 64 CC RF"),
      l("ст. 76.2 УК РФ", "Art. 76.2 CC RF"),
      l("гл. 40.1 УПК РФ", "Ch. 40.1 CCP RF"),
      l("ст. 307, 308 УПК РФ", "Arts. 307, 308 CCP RF"),
    ],
  },
};
