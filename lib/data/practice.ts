import { l, type LText } from "@/lib/i18n/text";
import type { PracticeItem } from "@/lib/types";

/**
 * Справочник разъяснений Пленума, позиций Президиума и обзоров практики
 * Верховного Суда РФ, на которые опираются проверки прототипа.
 *
 * ВНИМАНИЕ. Поле `excerpt` содержит краткое изложение позиции, а не дословную
 * цитату; поле `clause` указывает раздел разъяснения по его содержанию, а не
 * номер пункта. Так сделано намеренно: прототип не должен создавать видимость
 * дословного цитирования непроверенного текста. Перед публичной демонстрацией
 * изложения подлежат сверке с официальными текстами и могут быть заменены на
 * точные цитаты с номерами пунктов.
 *
 * По той же причине изложения переводятся: это пересказ позиции, а не текст
 * официального документа, и английская версия не выдаёт себя за перевод
 * первоисточника.
 */

const PLENUM_58 = l(
  "Постановление Пленума Верховного Суда РФ от 22.12.2015 № 58 «О практике назначения судами Российской Федерации уголовного наказания»",
  "Resolution No. 58 of the Plenum of the Supreme Court of the Russian Federation of 22 December 2015 “On the practice of imposing criminal punishment by the courts of the Russian Federation”",
);

const PLENUM_19 = l(
  "Постановление Пленума Верховного Суда РФ от 27.06.2013 № 19 «О применении судами законодательства, регламентирующего основания и порядок освобождения от уголовной ответственности»",
  "Resolution No. 19 of the Plenum of the Supreme Court of the Russian Federation of 27 June 2013 “On the application by the courts of the legislation governing the grounds and procedure for release from criminal liability”",
);

const ART = {
  a6: l("ст. 6 УК РФ", "Art. 6 CC RF"),
  a43: l("ст. 43 УК РФ", "Art. 43 CC RF"),
  a60: l("ст. 60 УК РФ", "Art. 60 CC RF"),
  a64: l("ст. 64 УК РФ", "Art. 64 CC RF"),
  a62: l("ст. 62 УК РФ", "Art. 62 CC RF"),
  a45: l("ст. 45 УК РФ", "Art. 45 CC RF"),
  a47: l("ст. 47 УК РФ", "Art. 47 CC RF"),
  a73: l("ст. 73 УК РФ", "Art. 73 CC RF"),
  a76: l("ст. 76 УК РФ", "Art. 76 CC RF"),
  a76_2: l("ст. 76.2 УК РФ", "Art. 76.2 CC RF"),
  a104_4: l("ст. 104.4 УК РФ", "Art. 104.4 CC RF"),
  a15_6: l("ч. 6 ст. 15 УК РФ", "Art. 15(6) CC RF"),
  a9: l("ст. 9 УК РФ", "Art. 9 CC RF"),
  a10: l("ст. 10 УК РФ", "Art. 10 CC RF"),
  a228: l("ст. 228 УК РФ", "Art. 228 CC RF"),
  a228_1: l("ст. 228.1 УК РФ", "Art. 228.1 CC RF"),
  a264: l("ст. 264 УК РФ", "Art. 264 CC RF"),
  a62_5: l("ч. 5 ст. 62 УК РФ", "Art. 62(5) CC RF"),
  p25: l("ст. 25 УПК РФ", "Art. 25 CCP RF"),
  p25_1: l("ст. 25.1 УПК РФ", "Art. 25.1 CCP RF"),
  p307: l("ст. 307 УПК РФ", "Art. 307 CCP RF"),
  p308: l("ст. 308 УПК РФ", "Art. 308 CCP RF"),
  ch40: l("гл. 40 УПК РФ", "Ch. 40 CCP RF"),
  ch40_1: l("гл. 40.1 УПК РФ", "Ch. 40.1 CCP RF"),
};

export const PRACTICE: PracticeItem[] = [
  {
    id: "plenum-58",
    kind: "plenum",
    title: PLENUM_58,
    date: "2015-12-22",
    clause: l(
      "об общих началах назначения наказания",
      "on the general principles of sentencing",
    ),
    articles: [ART.a6, ART.a43, ART.a60],
    excerpt: l(
      "Наказание назначается в пределах, предусмотренных санкцией статьи, с учётом характера и степени общественной опасности преступления, личности виновного, обстоятельств, смягчающих и отягчающих наказание, а также влияния назначенного наказания на исправление осуждённого и условия жизни его семьи. Более строгий вид наказания из числа предусмотренных назначается только если менее строгий не сможет обеспечить достижение целей наказания.",
      "Punishment is imposed within the limits set by the sanction of the article, taking into account the nature and degree of public danger of the offence, the personality of the offender, mitigating and aggravating circumstances, and the effect of the punishment on the offender's rehabilitation and on the living conditions of their family. A more severe type of punishment among those available is imposed only where a less severe one cannot achieve the aims of punishment.",
    ),
  },
  {
    id: "plenum-58-below-min",
    kind: "plenum",
    title: PLENUM_58,
    date: "2015-12-22",
    clause: l(
      "о назначении более мягкого наказания, чем предусмотрено за данное преступление",
      "on imposing a punishment milder than that prescribed for the offence",
    ),
    articles: [ART.a64],
    excerpt: l(
      "Назначение наказания ниже низшего предела, предусмотренного санкцией статьи, допускается только при наличии исключительных обстоятельств, которые суд обязан указать в приговоре со ссылкой на статью 64 УК РФ. Само по себе наличие смягчающих обстоятельств основанием для выхода за нижний предел санкции не является.",
      "A punishment below the lower limit of the sanction may be imposed only where exceptional circumstances exist, and the court must state them in the judgment with a reference to Article 64 of the Criminal Code. The presence of mitigating circumstances alone is not a ground for going below the lower limit of the sanction.",
    ),
  },
  {
    id: "plenum-58-art62",
    kind: "plenum",
    title: PLENUM_58,
    date: "2015-12-22",
    clause: l("о правилах статьи 62 УК РФ", "on the rules of Article 62 CC RF"),
    articles: [ART.a62, ART.ch40_1],
    excerpt: l(
      "Правила статьи 62 УК РФ ограничивают верхний предел наиболее строгого вида наказания, предусмотренного санкцией. При заключении досудебного соглашения о сотрудничестве срок или размер наказания не может превышать половины максимального срока или размера наиболее строгого вида наказания. Ограничение применяется к максимуму санкции, а не к наказанию, которое суд счёл справедливым.",
      "The rules of Article 62 of the Criminal Code cap the upper limit of the most severe type of punishment provided by the sanction. Where a pre-trial cooperation agreement has been concluded, the term or amount of punishment may not exceed one half of the maximum term or amount of the most severe type of punishment. The cap applies to the maximum of the sanction, not to the punishment the court considered just.",
    ),
  },
  {
    id: "plenum-58-additional",
    kind: "plenum",
    title: PLENUM_58,
    date: "2015-12-22",
    clause: l(
      "о дополнительных видах наказания",
      "on additional types of punishment",
    ),
    articles: [ART.a45, ART.a47],
    excerpt: l(
      "Если санкция предусматривает дополнительное наказание без оговорки «либо без такового», его назначение обязательно; неназначение допускается только при применении статьи 64 УК РФ с указанием мотивов в приговоре. Когда дополнительное наказание предусмотрено как возможное, суд обязан обсудить вопрос о его назначении и привести мотивы принятого решения.",
      "Where the sanction provides for an additional punishment without the qualifier “or without it”, imposing it is mandatory; omitting it is permissible only under Article 64 of the Criminal Code with reasons stated in the judgment. Where the additional punishment is optional, the court must address the question of imposing it and state the reasons for its decision.",
    ),
  },
  {
    id: "plenum-58-suspended",
    kind: "plenum",
    title: PLENUM_58,
    date: "2015-12-22",
    clause: l("об условном осуждении", "on suspended sentences"),
    articles: [ART.a73],
    excerpt: l(
      "Вывод о возможности исправления осуждённого без реального отбывания наказания должен быть мотивирован в приговоре с указанием конкретных обстоятельств, характеризующих личность виновного и содеянное. Формальная ссылка на совокупность смягчающих обстоятельств недостаточна.",
      "A finding that the offender can be reformed without actually serving the sentence must be reasoned in the judgment with reference to specific circumstances characterising the offender and the offence. A formal reference to the sum of mitigating circumstances is not sufficient.",
    ),
  },
  {
    id: "plenum-19",
    kind: "plenum",
    title: PLENUM_19,
    date: "2013-06-27",
    clause: l(
      "о примирении с потерпевшим",
      "on reconciliation with the victim",
    ),
    articles: [ART.a76, ART.p25],
    excerpt: l(
      "При наличии условий, предусмотренных статьёй 76 УК РФ, суд обязан обсудить вопрос об освобождении лица от уголовной ответственности и привести в судебном акте мотивы принятого решения. Освобождение является правом, а не обязанностью суда, однако вопрос подлежит рассмотрению во всех случаях, когда установлены необходимые условия.",
      "Where the conditions of Article 76 of the Criminal Code are met, the court must address the question of releasing the person from criminal liability and state the reasons for its decision in the judgment. Release is a power of the court rather than a duty, but the question must be considered in every case where the required conditions are established.",
    ),
  },
  {
    id: "plenum-19-fine",
    kind: "plenum",
    title: PLENUM_19,
    date: "2013-06-27",
    clause: l("о судебном штрафе", "on the court fine"),
    articles: [ART.a76_2, ART.p25_1, ART.a104_4],
    excerpt: l(
      "Освобождение от уголовной ответственности с назначением судебного штрафа возможно в отношении лица, впервые совершившего преступление небольшой или средней тяжести, если причинённый ущерб возмещён или вред иным образом заглажен. Возмещение вреда может быть произведено как самим лицом, так и по его просьбе другими лицами.",
      "Release from criminal liability with the imposition of a court fine is available to a person who has committed a minor offence or an offence of medium gravity for the first time, provided the damage caused has been compensated or otherwise made good. Compensation may be provided by the person themselves or, at their request, by others.",
    ),
  },
  {
    id: "presidium-review-76-2",
    kind: "review",
    title: l(
      "Обзор судебной практики освобождения от уголовной ответственности с назначением судебного штрафа, утверждённый Президиумом Верховного Суда РФ 10.07.2019",
      "Review of judicial practice on release from criminal liability with the imposition of a court fine, approved by the Presidium of the Supreme Court of the Russian Federation on 10 July 2019",
    ),
    date: "2019-07-10",
    clause: l(
      "об обязанности рассмотреть основание",
      "on the duty to consider the ground",
    ),
    articles: [ART.a76_2, ART.p25_1],
    excerpt: l(
      "Суды не вправе оставлять без рассмотрения вопрос о применении статьи 76.2 УК РФ при наличии установленных условий. Отказ в освобождении от уголовной ответственности должен быть мотивирован ссылкой на конкретные обстоятельства дела, а не на общие суждения о характере преступления.",
      "Courts may not leave the question of applying Article 76.2 of the Criminal Code unaddressed where the required conditions are established. A refusal to release from criminal liability must be reasoned by reference to the specific circumstances of the case rather than to general observations about the nature of the offence.",
    ),
  },
  {
    id: "plenum-10-category",
    kind: "plenum",
    title: l(
      "Постановление Пленума Верховного Суда РФ от 15.05.2018 № 10 «О практике применения судами положений части 6 статьи 15 Уголовного кодекса Российской Федерации»",
      "Resolution No. 10 of the Plenum of the Supreme Court of the Russian Federation of 15 May 2018 “On the practice of applying Article 15(6) of the Criminal Code of the Russian Federation”",
    ),
    date: "2018-05-15",
    clause: l(
      "об изменении категории преступления",
      "on changing the category of the offence",
    ),
    articles: [ART.a15_6],
    excerpt: l(
      "Вопрос об изменении категории преступления на менее тяжкую подлежит обсуждению по каждому делу при наличии формальных условий: вид и размер назначенного наказания, отсутствие отягчающих обстоятельств, фактические обстоятельства и степень общественной опасности содеянного. Решение отражается в приговоре.",
      "The question of reclassifying the offence into a less serious category must be considered in every case where the formal conditions are met: the type and amount of the punishment imposed, the absence of aggravating circumstances, and the factual circumstances and degree of public danger of the act. The decision is recorded in the judgment.",
    ),
  },
  {
    id: "plenum-55",
    kind: "plenum",
    title: l(
      "Постановление Пленума Верховного Суда РФ от 29.11.2016 № 55 «О судебном приговоре»",
      "Resolution No. 55 of the Plenum of the Supreme Court of the Russian Federation of 29 November 2016 “On the judgment of conviction”",
    ),
    date: "2016-11-29",
    clause: l("о мотивировке наказания", "on reasoning the sentence"),
    articles: [ART.p307, ART.p308],
    excerpt: l(
      "В описательно-мотивировочной части приговора приводятся мотивы решения по вопросам, связанным с назначением наказания, включая мотивы применения или неприменения правил Общей части УК РФ. Резолютивная часть должна содержать вид и размер как основного, так и дополнительного наказания.",
      "The reasoning part of the judgment sets out the grounds for the decisions related to sentencing, including the reasons for applying or not applying the rules of the General Part of the Criminal Code. The operative part must state the type and amount of both the principal and the additional punishment.",
    ),
  },
  {
    id: "plenum-14-drugs",
    kind: "plenum",
    title: l(
      "Постановление Пленума Верховного Суда РФ от 15.06.2006 № 14 «О судебной практике по делам о преступлениях, связанных с наркотическими средствами, психотропными, сильнодействующими и ядовитыми веществами»",
      "Resolution No. 14 of the Plenum of the Supreme Court of the Russian Federation of 15 June 2006 “On judicial practice in cases involving narcotic drugs, psychotropic, potent and toxic substances”",
    ),
    date: "2006-06-15",
    clause: l("о квалифицирующем размере", "on the qualifying quantity"),
    articles: [ART.a228, ART.a228_1],
    excerpt: l(
      "Крупный и особо крупный размер определяются на основании утверждённых Правительством Российской Федерации значений для соответствующего наркотического средства. Вывод о размере должен основываться на заключении эксперта с указанием вида средства и его массы.",
      "Large and especially large quantities are determined by the values approved by the Government of the Russian Federation for the substance concerned. The finding on quantity must rest on an expert report stating the type of substance and its mass.",
    ),
  },
  {
    id: "plenum-25-traffic",
    kind: "plenum",
    title: l(
      "Постановление Пленума Верховного Суда РФ от 09.12.2008 № 25 «О судебной практике по делам о преступлениях, связанных с нарушением правил дорожного движения и эксплуатации транспортных средств»",
      "Resolution No. 25 of the Plenum of the Supreme Court of the Russian Federation of 9 December 2008 “On judicial practice in cases involving breaches of traffic and vehicle operation rules”",
    ),
    date: "2008-12-09",
    clause: l(
      "о дополнительном наказании по статье 264 УК РФ",
      "on the additional punishment under Article 264 CC RF",
    ),
    articles: [ART.a264, ART.a47],
    excerpt: l(
      "При назначении наказания по статье 264 УК РФ суд обсуждает вопрос о лишении права заниматься деятельностью, связанной с управлением транспортным средством, и приводит мотивы решения. Если санкция предусматривает это наказание как обязательное, оно назначается независимо от того, лишено ли лицо такого права в административном порядке.",
      "When sentencing under Article 264 of the Criminal Code, the court addresses the question of depriving the offender of the right to engage in activities involving the operation of a vehicle and states the reasons for its decision. Where the sanction makes this punishment mandatory, it is imposed regardless of whether the person has already been deprived of that right in administrative proceedings.",
    ),
  },
  {
    id: "plenum-60-special",
    kind: "plenum",
    title: l(
      "Постановление Пленума Верховного Суда РФ от 05.12.2006 № 60 «О применении судами особого порядка судебного разбирательства уголовных дел»",
      "Resolution No. 60 of the Plenum of the Supreme Court of the Russian Federation of 5 December 2006 “On the application by the courts of the special procedure for the trial of criminal cases”",
    ),
    date: "2006-12-05",
    clause: l(
      "о пределах наказания при особом порядке",
      "on sentencing limits under the special procedure",
    ),
    articles: [ART.ch40, ART.a62_5],
    excerpt: l(
      "При рассмотрении дела в особом порядке наказание не может превышать двух третей максимального срока или размера наиболее строгого вида наказания, предусмотренного санкцией. Это ограничение применяется наряду с иными правилами Общей части УК РФ, влияющими на предел наказания.",
      "Where a case is tried under the special procedure, the punishment may not exceed two thirds of the maximum term or amount of the most severe type of punishment provided by the sanction. This limit applies alongside the other rules of the General Part of the Criminal Code that affect the sentencing ceiling.",
    ),
  },
  {
    id: "presidium-art-10",
    kind: "presidium",
    title: l(
      "Обзор судебной практики Верховного Суда РФ по применению обратной силы уголовного закона (позиции Президиума Верховного Суда РФ)",
      "Review of the practice of the Supreme Court of the Russian Federation on the retroactive effect of criminal law (positions of the Presidium of the Supreme Court)",
    ),
    date: "2021-04-14",
    clause: l(
      "о применении закона, действовавшего на момент деяния",
      "on applying the law in force at the time of the act",
    ),
    articles: [ART.a9, ART.a10],
    excerpt: l(
      "Преступность и наказуемость деяния определяются законом, действовавшим на момент его совершения. Закон, устраняющий преступность деяния, смягчающий наказание или иным образом улучшающий положение лица, имеет обратную силу; закон, усиливающий наказание, обратной силы не имеет. Применённая редакция подлежит указанию в судебном акте.",
      "The criminality and punishability of an act are determined by the law in force at the time it was committed. A law that decriminalises an act, mitigates the punishment or otherwise improves the position of the person has retroactive effect; a law that increases the punishment does not. The wording applied must be stated in the judgment.",
    ),
  },
];

export const PRACTICE_BY_ID: Record<string, PracticeItem> = Object.fromEntries(
  PRACTICE.map((item) => [item.id, item]),
);

export const PRACTICE_KIND_NAMES: Record<PracticeItem["kind"], LText> = {
  plenum: l("Постановление Пленума", "Plenum resolution"),
  presidium: l("Позиция Президиума", "Presidium position"),
  review: l("Обзор практики", "Practice review"),
};
