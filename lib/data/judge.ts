import { l } from "@/lib/i18n/text";
import type { Judge } from "@/lib/types";

/** Демонстрационный профиль пользователя. Аутентификации в прототипе нет. */
export const JUDGE: Judge = {
  fio: l("Иванов Игорь Игоревич", "Ivanov Igor Igorevich"),
  shortFio: l("Иванов И. И.", "Ivanov I. I."),
  position: l("Судья", "Judge"),
  court: l(
    "Ленинский районный суд г. Кирова",
    "Leninsky District Court of Kirov",
  ),
  region: l("Кировская область", "Kirov Region"),
  chamber: l("Коллегия по уголовным делам", "Criminal Division"),
  experienceYears: 11,
  appointedAt: "2015-03-12",
};
