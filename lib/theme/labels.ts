"use client";

import { useTheme } from "./store";
import type { ThemeName } from "./constants";

/**
 * Подписи элементов оформления.
 *
 * Игровые названия распространяются только на «хром» — навигацию, кнопку
 * входа и главные действия. Юридические формулировки, нормы, вердикты,
 * названия вкладок и текст заключения одинаковы в обеих темах: содержание
 * судебного акта не может зависеть от выбранной темы, и второго набора
 * правовых строк в проекте нет.
 */
export interface ChromeLabels {
  brandSubtitle: string;
  navDashboard: string;
  navNew: string;
  navDatabase: string;
  navPractice: string;
  navReports: string;
  logout: string;
  /** Кнопка входа на титульном экране. */
  login: string;
  /** Главное действие в личном кабинете. */
  startCheck: string;
  /** Действие в шапке рабочей области. */
  newCheck: string;
  /** Кнопка у демонстрационного материала. */
  runDemo: string;
  /** Заголовок блока выбора оформления. */
  themeGroup: string;
}

const LABELS: Record<ThemeName, ChromeLabels> = {
  classic: {
    brandSubtitle: "Проверка проекта судебного акта",
    navDashboard: "Личный кабинет",
    navNew: "Новая проверка",
    navDatabase: "База решений",
    navPractice: "Практика ВС РФ",
    navReports: "Заключения",
    logout: "Выход",
    login: "Войти в личный кабинет",
    startCheck: "Проверить проект акта",
    newCheck: "Новая проверка",
    runDemo: "Проверить",
    themeGroup: "Оформление",
  },
  arena: {
    brandSubtitle: "Арена правосудия",
    navDashboard: "Профиль",
    navNew: "Играть",
    navDatabase: "Архив",
    navPractice: "Обучение",
    navReports: "Трофеи",
    logout: "Выйти из игры",
    login: "Войти в игру",
    startCheck: "Играть",
    newCheck: "Новый матч",
    runDemo: "В бой",
    themeGroup: "Оформление",
  },
};

export function useChromeLabels(): ChromeLabels {
  return LABELS[useTheme((state) => state.theme)];
}

export function chromeLabels(theme: ThemeName): ChromeLabels {
  return LABELS[theme];
}
