import { plural, pluralEn } from "@/lib/format";
import type { Locale } from "./constants";

/**
 * Словарь интерфейса.
 *
 * Русский объект задаёт тип: английский обязан повторить все ключи и
 * сигнатуры, иначе сборка падает. Это единственная защита от пропущенного
 * перевода, которая работает без ручной сверки.
 *
 * Правовые формулировки сюда не попадают: они живут в lib/data/ вместе с
 * данными дела. Здесь только подписи, заголовки и служебные фразы.
 */
const RU = {
  common: {
    brand: "Второе мнение",
    brandSubtitle: "Проверка проекта судебного акта",
    emblem: "Знак системы «Второе мнение»",
    breadcrumbs: "Хлебные крошки",
    languageGroup: "Язык интерфейса",
    confidenceLabel: "извлечение",
    confidenceHint: "Достоверность автоматического извлечения",
    originalLanguage: "приводится на языке оригинала",
    yes: "да",
    no: "нет",
  },

  nav: {
    dashboard: "Личный кабинет",
    newCheck: "Новая проверка",
    database: "База решений",
    practice: "Практика ВС РФ",
    reports: "Заключения",
    logout: "Выход",
    mainNavigation: "Основная навигация",
  },

  disclaimer: {
    strong:
      "Система не принимает судебных решений и не заменяет судью в процессе правоприменения.",
    rest: "Она выступает вспомогательным инструментом проверки проекта судебного акта: указывает на возможные несоответствия закону и практике и готовит справочные материалы. Все выводы подлежат самостоятельной оценке судьёй.",
    footnote: "Прототип · демонстрационные данные",
    compact:
      "Система не принимает судебных решений и не заменяет судью. Заключение носит справочно-аналитический характер.",
  },

  landing: {
    systemSubtitle:
      "Система проверки проекта судебного акта по уголовному делу",
    eyebrow: "Назначение системы",
    title: "Второе мнение при назначении наказания",
    lead: "Система проверяет проект приговора в пределах, установленных законом: сверяет назначенное наказание с санкцией статьи Особенной части УК РФ и правилами Общей части, проверяет основания освобождения от уголовной ответственности и наказания по разделу IV УК РФ, сопоставляет решение с практикой по схожим делам и формирует заключение.",
    features: [
      {
        term: "Что проверяется",
        detail:
          "Пределы санкции, правила ст. 62, 64, 65, 66, 68 УК РФ, обязательное дополнительное наказание, редакция закона на момент деяния, основания раздела IV УК РФ.",
      },
      {
        term: "С чем сверяется",
        detail:
          "Разъяснения Пленума Верховного Суда РФ, позиции Президиума, обзоры судебной практики и база судебных решений.",
      },
      {
        term: "Что на выходе",
        detail:
          "Заключение с аннотацией дела, результатом формальной проверки, областями для углублённого анализа и статистической справкой.",
      },
      {
        term: "Чего система не делает",
        detail:
          "Не принимает решений, не назначает наказание и не заменяет судью. Все выводы носят справочный характер.",
      },
    ],
    loginTitle: "Вход в систему",
    loginNote:
      "Демонстрационный режим. Аутентификация в прототипе не реализована: вход выполняется в подготовленный профиль.",
    experience: (years: number) =>
      `стаж ${years} ${plural(years, "год", "года", "лет")}`,
    login: "Войти в личный кабинет",
    registryNote: (total: number, violations: number) =>
      `В реестре ${total} ${plural(
        total,
        "демонстрационное дело",
        "демонстрационных дела",
        "демонстрационных дел",
      )}; по ${violations} из них проверка выявила нарушения.`,
    disclaimerRest:
      "Прототип разработан как вспомогательный инструмент проверки проекта судебного акта. Данные демонстрационные.",
  },

  dashboard: {
    eyebrow: "Личный кабинет",
    startCheck: "Проверить проект акта",
    metricsTitle: "Показатели проверок",
    totalInRegistry: (total: number) => `всего дел в реестре: ${total}`,
    metricChecked: "проектов проверено",
    metricViolations: (count: number) =>
      plural(
        count,
        "дело с нарушением",
        "дела с нарушениями",
        "дел с нарушениями",
      ),
    metricWarnings: (count: number) =>
      plural(
        count,
        "дело с замечанием",
        "дела с замечаниями",
        "дел с замечаниями",
      ),
    metricClean: "без замечаний",
    metricsNote:
      "Показатели считаются по реестру текущего сеанса. Проверка носит справочный характер и не влияет на движение дела.",
    registryTitle: "Реестр проектов судебных актов",
    restoring: "восстановление сохранённого списка…",
    colCase: "Дело",
    colDefendant: "Подсудимый",
    colQualification: "Квалификация",
    colDocument: "Документ",
    colUploaded: "Загружен",
    colResult: "Результат проверки",
    colOpinion: "Заключение",
    uploadedTag: "загружено",
    pages: (pages: number) => `${pages} с.`,
    opinionReady: "сформировано",
    opinionNone: "не формировалось",
    profileTitle: "Профиль",
    profileSettings: "Настройки профиля",
    howItWorksTitle: "Порядок работы",
    steps: [
      {
        title: "Загрузите проект судебного акта",
        text: "Поддерживаются форматы .docx и .pdf. Можно выбрать один из демонстрационных материалов.",
      },
      {
        title: "Проверьте извлечённые параметры",
        text: "Квалификация, сведения о личности, обстоятельства и назначенное наказание. Любое поле можно исправить вручную.",
      },
      {
        title: "Изучите результат проверки",
        text: "Пределы санкции, правила Общей части, основания раздела IV УК РФ и практика Верховного Суда РФ.",
      },
      {
        title: "Сформируйте заключение",
        text: "Готовый документ с аннотацией, выводами и статистической справкой. Печать средствами браузера.",
      },
    ],
  },

  profile: {
    title: "Профиль и настройки",
    lead: "Сведения о пользователе и параметры проверки. В прототипе настройки сохраняются только в текущем браузере.",
    crumb: "Профиль",
    userTitle: "Сведения о пользователе",
    fieldFio: "Фамилия, имя, отчество",
    fieldPosition: "Должность",
    fieldCourt: "Суд",
    fieldRegion: "Субъект Российской Федерации",
    fieldChamber: "Коллегия",
    fieldAppointed: "Дата назначения",
    fieldExperience: "Стаж",
    fieldExperienceFull: "Стаж работы",
    years: (years: number) => `${years} ${plural(years, "год", "года", "лет")}`,
    userNote:
      "Сведения демонстрационные. Аутентификация и связь с кадровыми системами в прототипе не реализованы.",
    settingsTitle: "Параметры проверки",
    optStatistics: "Показывать статистическую справку",
    optStatisticsHint: "Сопоставление с практикой по схожим делам в заключении",
    optPractice: "Проверять соответствие практике ВС РФ",
    optPracticeHint: "Разъяснения Пленума, позиции Президиума, обзоры",
    optAdditional: "Строгая проверка дополнительного наказания",
    optAdditionalHint:
      "Считать замечанием отсутствие мотивов неназначения, когда наказание предусмотрено как возможное",
    optAutoConclusion: "Формировать заключение автоматически",
    optAutoConclusionHint:
      "Открывать вкладку «Заключение» сразу после проверки",
    settingsNote:
      "Переключатели показывают состав настраиваемых параметров. В прототипе они не влияют на работу проверок.",
    sessionTitle: "Данные сеанса",
    sessionStored: (count: number) =>
      `В браузере сохранено загруженных дел: ${count}. Очистка удалит их из реестра; демонстрационные материалы останутся.`,
    confirmQuestion: "Удалить загруженные дела и архив заключений?",
    confirmYes: "Да, очистить",
    confirmCancel: "Отмена",
    clearSession: "Очистить данные сеанса",
  },

  upload: {
    title: "Загрузка проекта судебного акта",
    lead: "Загрузите проект приговора в машиночитаемом виде. Система извлечёт квалификацию, сведения о личности подсудимого, обстоятельства дела и назначенное наказание, после чего проверит решение на соответствие закону и практике.",
    documentTitle: "Документ",
    formats: (list: string) => `форматы: ${list}`,
    dropHere: "Перетащите файл в эту область",
    orPick: "или выберите документ на диске",
    pickFile: "Выбрать файл",
    localOnly: "Документ обрабатывается в браузере и никуда не передаётся.",
    errorFormat: (extension: string, list: string) =>
      `Формат ${
        extension || "без расширения"
      } не поддерживается. Загрузите документ в формате ${list}.`,
    errorEmpty: "Файл пустой. Проверьте документ и повторите загрузку.",
    processingTitle: "Обработка документа",
    stageDone: "готово",
    stageRunning: "выполняется",
    stageWaiting: "ожидание",
    demoTitle: "Демонстрационные материалы",
    demoAside: "подготовленные проекты судебных актов",
    caseLabel: "Дело",
    runDemo: "Проверить",
    demoNote:
      "Материалы подготовлены так, чтобы показать разные исходы проверки: соответствие закону, выход за пределы санкции, отклонение от практики, нерассмотренное основание освобождения от уголовной ответственности и превышение предела, установленного правилами Общей части.",
    extractedTitle: "Что извлекается из документа",
    extractedItems: [
      "Квалификация: статья, часть, дата совершения деяния",
      "Сведения о личности: возраст, семья, занятость, судимости",
      "Смягчающие обстоятельства по ст. 61 УК РФ",
      "Отягчающие обстоятельства по ст. 63 УК РФ",
      "Процессуальные особенности: гл. 40 и 40.1 УПК РФ",
      "Назначенное наказание: вид, размер, дополнительное наказание",
    ],
    limitsTitle: "Ограничения прототипа",
    limitsExtraction:
      "Извлечение параметров из произвольного документа в прототипе не реализовано. Загруженный файл проходит те же стадии обработки, но результат берётся из демонстрационных материалов; настоящими остаются имя, размер и время загрузки файла.",
    limitsData:
      "Правовые данные — санкции, разъяснения, статистика — являются справочными и подлежат сверке с официальными источниками.",
  },

  workspace: {
    eyebrow: "Рабочая область анализа",
    notFoundTitle: "Дело не найдено",
    loadingTitle: "Загрузка дела",
    notFoundLead:
      "Дело отсутствует в реестре текущего сеанса. Возможно, оно было загружено в другом сеансе или список был очищен.",
    loadingLead: "Восстановление сохранённого списка дел.",
    crumbAnalysis: "Анализ",
    crumbChecks: "Проверки",
    uploadDraft: "Загрузить проект судебного акта",
    caseTitle: (number: string) => `Дело № ${number}`,
    documentLabel: "Документ",
    uploadedAt: "загружен",
    tablist: "Разделы анализа",
    tabs: {
      params: "Параметры дела",
      checks: "Проверка соответствия",
      similar: "Аналогичные приговоры",
      conclusion: "Заключение",
    },
    printHint:
      "Заключение готово. Для сохранения используйте печать в PDF средствами браузера.",
    print: "Печать заключения",
  },

  params: {
    qualificationTitle: "Квалификация преступления",
    article: "Статья УК РФ",
    category: "Категория преступления",
    categoryHint: "ст. 15 УК РФ",
    commitDate: "Дата совершения деяния",
    commitDateHint: "определяет применимую редакцию закона — ст. 9, 10 УК РФ",
    edition: "Применённая редакция",
    qualificationMissing: "Квалификация не извлечена. Укажите статью вручную.",
    defendantTitle: "Сведения о личности подсудимого",
    fio: "Фамилия, имя, отчество",
    birth: "Дата рождения, возраст",
    ageValue: (age: number) => `${age} ${plural(age, "год", "года", "лет")}`,
    citizenship: "Гражданство",
    registration: "Место регистрации",
    marital: "Семейное положение",
    maritalValue: (status: string, dependents: number) =>
      `${status}, иждивенцев: ${dependents}`,
    employment: "Занятость",
    education: "Образование",
    priorConvictions: "Судимости",
    recidivism: "Рецидив (ст. 18 УК РФ)",
    established: "установлен",
    notEstablished: "не установлен",
    health: "Состояние здоровья",
    defendantMissing: "Сведения о личности не извлечены. Заполните вручную.",
    mitigatingTitle: "Смягчающие обстоятельства",
    mitigatingNorm: "ст. 61 УК РФ",
    mitigatingEmpty: "Смягчающих обстоятельств не установлено.",
    aggravatingTitle: "Отягчающие обстоятельства",
    aggravatingNorm: "ст. 63 УК РФ",
    aggravatingEmpty: "Отягчающих обстоятельств не установлено.",
    procedureTitle: "Процессуальные особенности",
    specialOrder: "Особый порядок (гл. 40 УПК РФ)",
    specialOrderHint: "влечёт применение ч. 5 ст. 62 УК РФ",
    applied: "применён",
    notApplied: "не применялся",
    preTrial: "Досудебное соглашение (гл. 40.1 УПК РФ)",
    preTrialHint: "влечёт применение ч. 2 ст. 62 УК РФ",
    concluded: "заключено",
    notConcluded: "не заключалось",
    jury: "Вердикт присяжных (ст. 65 УК РФ)",
    returned: "вынесен",
    notReturned: "не выносился",
    incomplete: "Неоконченное преступление (ст. 66 УК РФ)",
    incompleteValue: {
      none: "преступление окончено",
      preparation: "приготовление",
      attempt: "покушение",
    },
    firstOffence: "Преступление совершено впервые",
    damageCompensated: "Вред возмещён",
    reconciled: "Примирение с потерпевшим",
    declared: "заявлено",
    notDeclared: "не заявлялось",
    punishmentTitle: "Назначенное наказание",
    mainPunishment: "Основное наказание",
    amountLabel: (unit: string) => `Размер, ${unit}`,
    units: {
      months: "месяцев",
      hours: "часов",
      rub: "рублей",
    },
    rangeHint: (min: string, max: string) =>
      `Диапазон по санкции: ${min} — ${max}.`,
    serving: "Порядок отбывания",
    additional: "Дополнительное наказание",
    additionalNone: "не назначено",
    editedFrom: "Размер изменён:",
    editedNote: "Проверка пределов и статистика пересчитаны.",
    resetAmount: "Вернуть исходное значение",
    scaleTitle: "Наказание на шкале санкции",
    scaleAside: "санкция · пределы Общей части · практика",
    scaleImpossible:
      "Назначенный вид наказания санкцией не предусмотрен, шкала не строится.",
    sanctionText: "Текст санкции",
  },

  checks: {
    recomputed: "пересчитано",
    collapse: "свернуть",
    expand: "подробно",
    calculation: "Расчёт",
    practiceBasis: "Основания в практике",
    resultTitle: "Результат проверки",
    totalChecks: (total: number) => `всего проверок: ${total}`,
    filters: {
      all: "Все проверки",
      violation: "Нарушения",
      warning: "Замечания",
      ok: "Соответствует",
    },
    groups: {
      sanction: "Пределы санкции статьи",
      special_rules: "Специальные правила назначения наказания",
      additional: "Дополнительное наказание",
      general: "Общие начала назначения наказания",
      edition: "Редакция закона на момент деяния",
      release: "Освобождение от ответственности и наказания (раздел IV УК РФ)",
      practice: "Соответствие практике Верховного Суда РФ",
    },
    emptyFilter: (verdict: string) => `Проверок с вердиктом «${verdict}» нет.`,
  },

  similar: {
    statsTitle: "Статистическая справка",
    sample: (total: number) =>
      `выборка: ${total} ${plural(
        total,
        "приговор",
        "приговора",
        "приговоров",
      )}`,
    sampleCount: (total: number) =>
      `${total} ${plural(total, "приговор", "приговора", "приговоров")}`,
    median: "медиана по схожим делам",
    iqr: "межквартильный диапазон",
    assigned: "назначено по проверяемому делу",
    deviation: "отклонение от медианы",
    percentileBefore: "Назначенный размер соответствует",
    percentile: (value: number) => `${value}-му процентилю`,
    percentileAfter: (share: string) =>
      `выборки: строже назначено в ${share} схожих дел.`,
    suspendedShare: (share: string) =>
      `Условное осуждение применено в ${share} приговоров выборки.`,
    histogramTitle: "Распределение назначенных наказаний",
    histogramAside: "демонстрационная выборка",
    tableTitle: "Аналогичные приговоры",
    shown: (shown: number, total: number) => `показано: ${shown} из ${total}`,
    sameKindOnly: "только тот же вид наказания",
    minSimilarity: (value: string) => `Близость не ниже: ${value}`,
    tableCaption:
      "Приговоры по схожим делам с указанием суда, даты, вида и размера наказания",
    colSimilarity: "Близость",
    emptyRows: "По заданным условиям приговоров не найдено. Ослабьте фильтры.",
    syntheticNote:
      "Выборка синтетическая и приведена для демонстрации механизма сопоставления. Подсветкой отмечены приговоры с размером наказания, совпадающим с проверяемым решением.",
  },

  database: {
    eyebrow: "Справочные ресурсы",
    title: "База судебных решений",
    lead: "Выборка приговоров, по которой система сопоставляет проверяемое решение с практикой. Фильтры повторяют ключевые параметры сопоставления: статья, регион, год, вид наказания.",
    filtersTitle: "Условия отбора",
    reset: "Сбросить",
    filterArticle: "Статья УК РФ",
    allArticles: "все статьи",
    filterRegion: "Регион",
    allRegions: "все регионы",
    filterYear: "Год",
    allYears: "все годы",
    filterKind: "Вид наказания",
    anyKind: "любой",
    filterSuspended: "Условное осуждение",
    suspendedAny: "не важно",
    suspendedOnly: "только условное",
    realOnly: "только реальное",
    tableTitle: "Судебные решения",
    found: (total: number) =>
      `найдено ${total} ${plural(
        total,
        "приговор",
        "приговора",
        "приговоров",
      )}`,
    colId: "Номер",
    colCourt: "Суд",
    colRegion: "Регион",
    colDate: "Дата",
    colArticle: "Статья",
    colPunishment: "Наказание",
    colAmount: "Размер",
    colMitigating: "Смягч.",
    colAggravating: "Отягч.",
    suspendedMark: "условно",
    empty: "По заданным условиям решений не найдено.",
    showMore: (count: number) => `Показать ещё ${count}`,
    syntheticNote:
      "Выборка синтетическая: суды, даты и размеры наказаний сгенерированы для демонстрации механизма сопоставления. Реальные судебные акты не использованы.",
  },

  practice: {
    eyebrow: "Справочные ресурсы",
    title: "Практика Верховного Суда Российской Федерации",
    lead: "Разъяснения Пленума, позиции Президиума и обзоры судебной практики, на которые опираются проверки системы. Каждая проверка ссылается на конкретный документ из этого справочника.",
    filterAll: "Все документы",
    filterPlenum: "Постановления Пленума",
    filterPresidium: "Позиции Президиума",
    filterReview: "Обзоры практики",
    searchLabel: "Поиск по тексту и статьям",
    searchPlaceholder: "например: ст. 62 УК РФ",
    empty: "По заданным условиям документов не найдено.",
    aboutTitle: "О содержании справочника",
    aboutParaphrase:
      "Приведённые тексты являются кратким изложением позиций, а не дословными цитатами; раздел документа указан по содержанию, а не номером пункта. Так сделано намеренно: прототип не должен создавать видимость дословного цитирования непроверенного текста.",
    aboutFuture:
      "В рабочей версии системы справочник подключается к официальным публикациям Верховного Суда Российской Федерации, а изложения заменяются точными цитатами с указанием пунктов.",
  },

  reports: {
    title: "Архив заключений",
    lead: "Заключения, сформированные по проверенным проектам судебных актов. Заключение появляется в архиве после открытия соответствующей вкладки в рабочей области анализа.",
    emptyTitle: "Заключений пока нет",
    restoringTitle: "Восстановление сохранённого архива",
    emptyHint:
      "Откройте дело в рабочей области анализа и перейдите на вкладку «Заключение».",
    tableTitle: "Сформированные заключения",
    documents: (count: number) =>
      `${count} ${plural(count, "документ", "документа", "документов")}`,
    colViolations: "Нарушений",
    colWarnings: "Замечаний",
    colResult: "Результат",
    colDocumentDate: "Сформировано по документу от",
    openAndPrint: "Открыть и напечатать",
    exportNote:
      "Экспорт выполняется печатью средствами браузера: откройте заключение и выберите «Сохранить как PDF». Отдельного файлового хранилища в прототипе нет.",
  },

  conclusion: {
    systemLine: "Система проверки проекта судебного акта «Второе мнение»",
    documentTitle: "Заключение по результатам проверки назначенного наказания",
    fieldCase: "Дело:",
    fieldQualification: "Квалификация:",
    fieldCourt: "Суд:",
    fieldJudge: "Судья:",
    fieldDocument: "Документ:",
    fieldGenerated: "Сформировано:",
    section1: "Краткая аннотация дела",
    section2: "Результат проверки на соответствие закону",
    section3: "Результат проверки по судебной практике",
    section4: "Потенциальные области для более глубокого анализа",
    section5: "Статистическая справка по аналогичным приговорам",
    section6: "Использованные нормы",
    section7: "Использованные разъяснения и обзоры практики",
    noAttentionAreas:
      "Несоответствий и отклонений, требующих дополнительного анализа, не выявлено.",
    statSample: "Объём выборки",
    statRange: "Минимум — максимум",
    statQuartiles: "Первый и третий квартиль",
    statMedian: "Медиана",
    statAssigned: "Назначено по проверяемому делу",
    statDeviation: "Отклонение от медианы",
    statSuspended: "Доля условного осуждения в выборке",
    practiceNote:
      "Изложения позиций приведены в справочном виде и подлежат сверке с официальными текстами.",
    footer: (generatedAt: string, fileName: string, uploadedAt: string) =>
      `Заключение сформировано автоматически ${generatedAt} по документу «${fileName}», загруженному ${uploadedAt}. Подписи не требует.`,
  },

  histogram: {
    containsAssigned: "сюда попадает проверяемое решение",
    axes: (unit: string) =>
      `По горизонтали — размер назначенного наказания (${unit}), по вертикали — число приговоров в выборке.`,
    units: {
      months: "месяцев",
      hours: "часов",
      rub: "тыс. рублей",
    },
    highlightedBefore: "Выделена корзина",
    highlightedAfter: ", в которую попадает проверяемое решение.",
  },

  scale: {
    caption: "Шкала санкции",
    ariaLabel: (assigned: string, min: string, max: string) =>
      `Назначено ${assigned} при пределах санкции ${min} — ${max}`,
    medianOfPractice: "медиана практики",
    assigned: "назначено",
    legendSanction: "пределы санкции",
    legendClosed: "закрыто правилами Общей части",
    legendPractice: "практика: от первого до третьего квартиля",
    legendAssigned: "назначенное наказание",
  },
};

export type Dictionary = typeof RU;

const EN: Dictionary = {
  common: {
    brand: "Second Opinion",
    brandSubtitle: "Review of a draft judgment",
    emblem: "Emblem of the Second Opinion system",
    breadcrumbs: "Breadcrumbs",
    languageGroup: "Interface language",
    confidenceLabel: "extraction",
    confidenceHint: "Confidence of the automatic extraction",
    originalLanguage: "quoted in the original language",
    yes: "yes",
    no: "no",
  },

  nav: {
    dashboard: "Dashboard",
    newCheck: "New check",
    database: "Judgment database",
    practice: "Supreme Court practice",
    reports: "Opinions",
    logout: "Sign out",
    mainNavigation: "Main navigation",
  },

  disclaimer: {
    strong:
      "The system does not take judicial decisions and does not replace the judge in applying the law.",
    rest: "It is an auxiliary tool for reviewing a draft judgment: it points out possible departures from the law and from practice and prepares reference material. Every conclusion is subject to the judge's own assessment.",
    footnote: "Prototype · demonstration data",
    compact:
      "The system does not take judicial decisions and does not replace the judge. This opinion is advisory and analytical.",
  },

  landing: {
    systemSubtitle: "Review system for draft judgments in criminal cases",
    eyebrow: "Purpose of the system",
    title: "A second opinion on the sentence",
    lead: "The system reviews a draft judgment within the limits set by law: it checks the punishment imposed against the sanction of the article of the Special Part of the Criminal Code and the rules of the General Part, examines the grounds for release from criminal liability and from punishment under Section IV, compares the decision with practice in similar cases and produces an opinion.",
    features: [
      {
        term: "What is checked",
        detail:
          "The limits of the sanction, the rules of Arts. 62, 64, 65, 66 and 68 CC RF, mandatory additional punishment, the wording of the law in force at the time of the act, and the grounds under Section IV CC RF.",
      },
      {
        term: "What it is compared with",
        detail:
          "Guidance of the Plenum of the Supreme Court, positions of its Presidium, reviews of judicial practice and the database of judgments.",
      },
      {
        term: "What you get",
        detail:
          "An opinion with a summary of the case, the result of the formal review, areas for closer analysis and a statistical note.",
      },
      {
        term: "What the system does not do",
        detail:
          "It takes no decisions, imposes no punishment and does not replace the judge. Every conclusion is advisory.",
      },
    ],
    loginTitle: "Sign in",
    loginNote:
      "Demonstration mode. Authentication is not implemented in the prototype: you are signed in to a prepared profile.",
    experience: (years: number) =>
      `${years} ${pluralEn(years, "year", "years")} on the bench`,
    login: "Sign in to the dashboard",
    registryNote: (total: number, violations: number) =>
      `The registry holds ${total} demonstration ${pluralEn(
        total,
        "case",
        "cases",
      )}; in ${violations} of them the review found violations.`,
    disclaimerRest:
      "The prototype was built as an auxiliary tool for reviewing draft judgments. The data is for demonstration only.",
  },

  dashboard: {
    eyebrow: "Dashboard",
    startCheck: "Review a draft judgment",
    metricsTitle: "Review statistics",
    totalInRegistry: (total: number) => `cases in the registry: ${total}`,
    metricChecked: "drafts reviewed",
    metricViolations: (count: number) =>
      pluralEn(count, "case with a violation", "cases with violations"),
    metricWarnings: (count: number) =>
      pluralEn(count, "case with a caveat", "cases with caveats"),
    metricClean: "with no findings",
    metricsNote:
      "The figures cover the registry of the current session. The review is advisory and does not affect the progress of the case.",
    registryTitle: "Registry of draft judgments",
    restoring: "restoring the saved list…",
    colCase: "Case",
    colDefendant: "Defendant",
    colQualification: "Classification",
    colDocument: "Document",
    colUploaded: "Uploaded",
    colResult: "Review result",
    colOpinion: "Opinion",
    uploadedTag: "uploaded",
    pages: (pages: number) => `${pages} pp.`,
    opinionReady: "produced",
    opinionNone: "not produced",
    profileTitle: "Profile",
    profileSettings: "Profile settings",
    howItWorksTitle: "How it works",
    steps: [
      {
        title: "Upload the draft judgment",
        text: ".docx and .pdf are supported. You can also pick one of the demonstration materials.",
      },
      {
        title: "Check the extracted parameters",
        text: "Classification, personal details, circumstances and the punishment imposed. Every field can be corrected by hand.",
      },
      {
        title: "Study the review result",
        text: "The limits of the sanction, the General Part rules, the grounds under Section IV CC RF and Supreme Court practice.",
      },
      {
        title: "Produce the opinion",
        text: "A ready document with a summary, conclusions and a statistical note. Printing is done by the browser.",
      },
    ],
  },

  profile: {
    title: "Profile and settings",
    lead: "User details and review parameters. In the prototype the settings are stored in this browser only.",
    crumb: "Profile",
    userTitle: "User details",
    fieldFio: "Full name",
    fieldPosition: "Position",
    fieldCourt: "Court",
    fieldRegion: "Constituent entity of the Russian Federation",
    fieldChamber: "Division",
    fieldAppointed: "Date of appointment",
    fieldExperience: "Experience",
    fieldExperienceFull: "Years of service",
    years: (years: number) => `${years} ${pluralEn(years, "year", "years")}`,
    userNote:
      "The details are for demonstration. Authentication and links to personnel systems are not implemented in the prototype.",
    settingsTitle: "Review parameters",
    optStatistics: "Show the statistical note",
    optStatisticsHint:
      "Comparison with practice in similar cases in the opinion",
    optPractice: "Check against Supreme Court practice",
    optPracticeHint: "Plenum guidance, Presidium positions, practice reviews",
    optAdditional: "Strict check of the additional punishment",
    optAdditionalHint:
      "Treat the absence of reasons for omitting an optional additional punishment as a caveat",
    optAutoConclusion: "Produce the opinion automatically",
    optAutoConclusionHint:
      "Open the Opinion tab as soon as the review is complete",
    settingsNote:
      "The toggles show which parameters are configurable. In the prototype they do not affect how the checks run.",
    sessionTitle: "Session data",
    sessionStored: (count: number) =>
      `Cases uploaded and stored in this browser: ${count}. Clearing removes them from the registry; the demonstration materials remain.`,
    confirmQuestion: "Delete the uploaded cases and the archive of opinions?",
    confirmYes: "Yes, clear",
    confirmCancel: "Cancel",
    clearSession: "Clear session data",
  },

  upload: {
    title: "Uploading a draft judgment",
    lead: "Upload the draft judgment in machine-readable form. The system will extract the classification, the defendant's personal details, the circumstances of the case and the punishment imposed, and will then check the decision against the law and practice.",
    documentTitle: "Document",
    formats: (list: string) => `formats: ${list}`,
    dropHere: "Drop the file here",
    orPick: "or choose a document on disk",
    pickFile: "Choose file",
    localOnly:
      "The document is processed in the browser and is not sent anywhere.",
    errorFormat: (extension: string, list: string) =>
      `The ${
        extension || "extension-less"
      } format is not supported. Upload a document in one of: ${list}.`,
    errorEmpty: "The file is empty. Check the document and upload it again.",
    processingTitle: "Processing the document",
    stageDone: "done",
    stageRunning: "running",
    stageWaiting: "waiting",
    demoTitle: "Demonstration materials",
    demoAside: "prepared draft judgments",
    caseLabel: "Case",
    runDemo: "Review",
    demoNote:
      "The materials are prepared to show different outcomes of a review: compliance with the law, going outside the limits of the sanction, departure from practice, a ground for release from criminal liability left unaddressed, and a breach of a ceiling set by the General Part rules.",
    extractedTitle: "What is extracted from the document",
    extractedItems: [
      "Classification: article, part, date of the act",
      "Personal details: age, family, employment, prior convictions",
      "Mitigating circumstances under Art. 61 CC RF",
      "Aggravating circumstances under Art. 63 CC RF",
      "Procedural features: Chs. 40 and 40.1 CCP RF",
      "The punishment imposed: type, amount, additional punishment",
    ],
    limitsTitle: "Limits of the prototype",
    limitsExtraction:
      "Extracting parameters from an arbitrary document is not implemented in the prototype. An uploaded file goes through the same processing stages, but the result is taken from the demonstration materials; the file name, size and upload time are real.",
    limitsData:
      "The legal data — sanctions, guidance, statistics — is for reference and must be verified against official sources.",
  },

  workspace: {
    eyebrow: "Analysis workspace",
    notFoundTitle: "Case not found",
    loadingTitle: "Loading the case",
    notFoundLead:
      "The case is not in the registry of the current session. It may have been uploaded in another session, or the list may have been cleared.",
    loadingLead: "Restoring the saved list of cases.",
    crumbAnalysis: "Analysis",
    crumbChecks: "Checks",
    uploadDraft: "Upload a draft judgment",
    caseTitle: (number: string) => `Case No. ${number}`,
    documentLabel: "Document",
    uploadedAt: "uploaded",
    tablist: "Analysis sections",
    tabs: {
      params: "Case parameters",
      checks: "Compliance review",
      similar: "Comparable judgments",
      conclusion: "Opinion",
    },
    printHint:
      "The opinion is ready. To save it, print to PDF from your browser.",
    print: "Print the opinion",
  },

  params: {
    qualificationTitle: "Classification of the offence",
    article: "Article of the Criminal Code",
    category: "Category of the offence",
    categoryHint: "Art. 15 CC RF",
    commitDate: "Date of the act",
    commitDateHint:
      "determines the applicable wording of the law — Arts. 9, 10 CC RF",
    edition: "Wording applied",
    qualificationMissing:
      "The classification was not extracted. Enter the article manually.",
    defendantTitle: "Details of the defendant",
    fio: "Full name",
    birth: "Date of birth, age",
    ageValue: (age: number) => `${age} ${pluralEn(age, "year", "years")} old`,
    citizenship: "Citizenship",
    registration: "Place of registration",
    marital: "Marital status",
    maritalValue: (status: string, dependents: number) =>
      `${status}, dependants: ${dependents}`,
    employment: "Employment",
    education: "Education",
    priorConvictions: "Prior convictions",
    recidivism: "Recidivism (Art. 18 CC RF)",
    established: "established",
    notEstablished: "not established",
    health: "State of health",
    defendantMissing:
      "The personal details were not extracted. Fill them in manually.",
    mitigatingTitle: "Mitigating circumstances",
    mitigatingNorm: "Art. 61 CC RF",
    mitigatingEmpty: "No mitigating circumstances were established.",
    aggravatingTitle: "Aggravating circumstances",
    aggravatingNorm: "Art. 63 CC RF",
    aggravatingEmpty: "No aggravating circumstances were established.",
    procedureTitle: "Procedural features",
    specialOrder: "Special procedure (Ch. 40 CCP RF)",
    specialOrderHint: "triggers Art. 62(5) CC RF",
    applied: "applied",
    notApplied: "not applied",
    preTrial: "Pre-trial cooperation agreement (Ch. 40.1 CCP RF)",
    preTrialHint: "triggers Art. 62(2) CC RF",
    concluded: "concluded",
    notConcluded: "not concluded",
    jury: "Jury verdict (Art. 65 CC RF)",
    returned: "returned",
    notReturned: "not returned",
    incomplete: "Inchoate offence (Art. 66 CC RF)",
    incompleteValue: {
      none: "the offence was completed",
      preparation: "preparation",
      attempt: "attempt",
    },
    firstOffence: "First offence",
    damageCompensated: "Harm compensated",
    reconciled: "Reconciliation with the victim",
    declared: "declared",
    notDeclared: "not declared",
    punishmentTitle: "Punishment imposed",
    mainPunishment: "Principal punishment",
    amountLabel: (unit: string) => `Amount, ${unit}`,
    units: {
      months: "months",
      hours: "hours",
      rub: "roubles",
    },
    rangeHint: (min: string, max: string) =>
      `Range under the sanction: ${min} — ${max}.`,
    serving: "Manner of serving",
    additional: "Additional punishment",
    additionalNone: "not imposed",
    editedFrom: "Amount changed:",
    editedNote: "The limit checks and the statistics have been recomputed.",
    resetAmount: "Restore the original value",
    scaleTitle: "The punishment on the scale of the sanction",
    scaleAside: "sanction · General Part ceilings · practice",
    scaleImpossible:
      "The sanction does not provide for this type of punishment, so the scale cannot be drawn.",
    sanctionText: "Text of the sanction",
  },

  checks: {
    recomputed: "recomputed",
    collapse: "collapse",
    expand: "details",
    calculation: "Calculation",
    practiceBasis: "Basis in practice",
    resultTitle: "Review result",
    totalChecks: (total: number) => `checks in total: ${total}`,
    filters: {
      all: "All checks",
      violation: "Violations",
      warning: "Caveats",
      ok: "Compliant",
    },
    groups: {
      sanction: "Limits of the sanction",
      special_rules: "Special sentencing rules",
      additional: "Additional punishment",
      general: "General principles of sentencing",
      edition: "Wording of the law at the time of the act",
      release: "Release from liability and from punishment (Section IV CC RF)",
      practice: "Compliance with Supreme Court practice",
    },
    emptyFilter: (verdict: string) =>
      `There are no checks marked “${verdict}”.`,
  },

  similar: {
    statsTitle: "Statistical note",
    sample: (total: number) =>
      `sample: ${total} ${pluralEn(total, "judgment", "judgments")}`,
    sampleCount: (total: number) =>
      `${total} ${pluralEn(total, "judgment", "judgments")}`,
    median: "median in similar cases",
    iqr: "interquartile range",
    assigned: "imposed in the case under review",
    deviation: "deviation from the median",
    percentileBefore: "The amount imposed corresponds to the",
    percentile: (value: number) => `${value}th percentile`,
    percentileAfter: (share: string) =>
      `of the sample: a stricter punishment was imposed in ${share} of similar cases.`,
    suspendedShare: (share: string) =>
      `Sentences were suspended in ${share} of the judgments in the sample.`,
    histogramTitle: "Distribution of the punishments imposed",
    histogramAside: "demonstration sample",
    tableTitle: "Comparable judgments",
    shown: (shown: number, total: number) => `shown: ${shown} of ${total}`,
    sameKindOnly: "same type of punishment only",
    minSimilarity: (value: string) => `Similarity at least: ${value}`,
    tableCaption:
      "Judgments in similar cases with the court, date, and type and amount of punishment",
    colSimilarity: "Similarity",
    emptyRows: "No judgments match the conditions. Relax the filters.",
    syntheticNote:
      "The sample is synthetic and illustrates the matching mechanism. Highlighting marks judgments whose punishment equals the one under review.",
  },

  database: {
    eyebrow: "Reference resources",
    title: "Database of judgments",
    lead: "The sample of judgments against which the system compares the decision under review. The filters mirror the key matching parameters: article, region, year and type of punishment.",
    filtersTitle: "Selection criteria",
    reset: "Reset",
    filterArticle: "Article of the Criminal Code",
    allArticles: "all articles",
    filterRegion: "Region",
    allRegions: "all regions",
    filterYear: "Year",
    allYears: "all years",
    filterKind: "Type of punishment",
    anyKind: "any",
    filterSuspended: "Suspended sentence",
    suspendedAny: "any",
    suspendedOnly: "suspended only",
    realOnly: "custodial only",
    tableTitle: "Judgments",
    found: (total: number) =>
      `found ${total} ${pluralEn(total, "judgment", "judgments")}`,
    colId: "No.",
    colCourt: "Court",
    colRegion: "Region",
    colDate: "Date",
    colArticle: "Article",
    colPunishment: "Punishment",
    colAmount: "Amount",
    colMitigating: "Mit.",
    colAggravating: "Agg.",
    suspendedMark: "suspended",
    empty: "No judgments match the conditions.",
    showMore: (count: number) => `Show ${count} more`,
    syntheticNote:
      "The sample is synthetic: courts, dates and amounts of punishment were generated to demonstrate the matching mechanism. No real judgments were used.",
  },

  practice: {
    eyebrow: "Reference resources",
    title: "Practice of the Supreme Court of the Russian Federation",
    lead: "Plenum guidance, Presidium positions and reviews of judicial practice on which the system's checks rely. Every check refers to a specific document from this reference.",
    filterAll: "All documents",
    filterPlenum: "Plenum resolutions",
    filterPresidium: "Presidium positions",
    filterReview: "Practice reviews",
    searchLabel: "Search the text and the articles",
    searchPlaceholder: "for example: Art. 62 CC RF",
    empty: "No documents match the conditions.",
    aboutTitle: "About the contents of this reference",
    aboutParaphrase:
      "The texts are brief restatements of the positions, not verbatim quotations; the part of the document is identified by its subject matter rather than by paragraph number. This is deliberate: the prototype must not create the appearance of quoting an unverified text verbatim.",
    aboutFuture:
      "In a production version the reference is connected to the official publications of the Supreme Court of the Russian Federation, and the restatements are replaced with exact quotations with paragraph numbers.",
  },

  reports: {
    title: "Archive of opinions",
    lead: "Opinions produced for the draft judgments reviewed. An opinion appears in the archive once the corresponding tab has been opened in the analysis workspace.",
    emptyTitle: "No opinions yet",
    restoringTitle: "Restoring the saved archive",
    emptyHint:
      "Open a case in the analysis workspace and go to the Opinion tab.",
    tableTitle: "Opinions produced",
    documents: (count: number) =>
      `${count} ${pluralEn(count, "document", "documents")}`,
    colViolations: "Violations",
    colWarnings: "Caveats",
    colResult: "Result",
    colDocumentDate: "Produced for a document of",
    openAndPrint: "Open and print",
    exportNote:
      "Export is done by printing from the browser: open the opinion and choose “Save as PDF”. The prototype has no separate file storage.",
  },

  conclusion: {
    systemLine: "Second Opinion — draft judgment review system",
    documentTitle: "Opinion on the review of the punishment imposed",
    fieldCase: "Case:",
    fieldQualification: "Classification:",
    fieldCourt: "Court:",
    fieldJudge: "Judge:",
    fieldDocument: "Document:",
    fieldGenerated: "Produced:",
    section1: "Brief summary of the case",
    section2: "Result of the review for compliance with the law",
    section3: "Result of the review against judicial practice",
    section4: "Potential areas for closer analysis",
    section5: "Statistical note on comparable judgments",
    section6: "Provisions applied",
    section7: "Guidance and practice reviews used",
    noAttentionAreas:
      "No departures or deviations requiring further analysis were found.",
    statSample: "Size of the sample",
    statRange: "Minimum — maximum",
    statQuartiles: "First and third quartile",
    statMedian: "Median",
    statAssigned: "Imposed in the case under review",
    statDeviation: "Deviation from the median",
    statSuspended: "Share of suspended sentences in the sample",
    practiceNote:
      "The restatements of the positions are given for reference and must be verified against the official texts.",
    footer: (generatedAt: string, fileName: string, uploadedAt: string) =>
      `This opinion was produced automatically on ${generatedAt} for the document “${fileName}”, uploaded on ${uploadedAt}. It requires no signature.`,
  },

  histogram: {
    containsAssigned: "the decision under review falls here",
    axes: (unit: string) =>
      `The horizontal axis shows the amount of punishment imposed (${unit}), the vertical axis the number of judgments in the sample.`,
    units: {
      months: "months",
      hours: "hours",
      rub: "thousand roubles",
    },
    highlightedBefore: "The highlighted bin is",
    highlightedAfter: ", the one the decision under review falls into.",
  },

  scale: {
    caption: "Scale of the sanction",
    ariaLabel: (assigned: string, min: string, max: string) =>
      `${assigned} imposed, with the sanction running from ${min} to ${max}`,
    medianOfPractice: "median of practice",
    assigned: "imposed",
    legendSanction: "limits of the sanction",
    legendClosed: "closed off by the General Part rules",
    legendPractice: "practice: first to third quartile",
    legendAssigned: "punishment imposed",
  },
};

export const UI: Record<Locale, Dictionary> = { ru: RU, en: EN };
