"use client";

import Link from "next/link";
import { Emblem } from "@/components/layout/Emblem";
import { JUDGE } from "@/lib/data/judge";
import { DEMO_CASES } from "@/lib/api/analysis";
import { plural } from "@/lib/format";
import { ThemeSwitch } from "@/components/layout/ThemeSwitch";
import { useChromeLabels } from "@/lib/theme/labels";

export default function LoginPage() {
  const labels = useChromeLabels();
  const violations = DEMO_CASES.filter((c) => c.status === "violations").length;

  return (
    <div className="flex min-h-screen flex-col bg-sand">
      <header className="border-b-2 border-bordo bg-brand text-onbrand">
        <div className="mx-auto flex max-w-shell flex-wrap items-center gap-3 px-4 py-4">
          <Emblem className="h-11 w-11 text-onbrand/85" />
          <div>
            <p className="font-serif text-xl font-bold leading-tight">
              Второе мнение
            </p>
            <p className="text-2xs uppercase tracking-eyebrow text-onbrand/70">
              Система проверки проекта судебного акта по уголовному делу
            </p>
          </div>
          <div className="ml-auto">
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-shell flex-1 items-start gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="max-w-prose">
          <p className="eyebrow">Назначение системы</p>
          <h1 className="mt-2 font-serif text-[2rem] leading-tight">
            Второе мнение при назначении наказания
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Система проверяет проект приговора в пределах, установленных
            законом: сверяет назначенное наказание с санкцией статьи Особенной
            части УК РФ и правилами Общей части, проверяет основания
            освобождения от уголовной ответственности и наказания по разделу IV
            УК РФ, сопоставляет решение с практикой по схожим делам и формирует
            заключение.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <Feature
              term="Что проверяется"
              detail="Пределы санкции, правила ст. 62, 64, 65, 66, 68 УК РФ, обязательное дополнительное наказание, редакция закона на момент деяния, основания раздела IV УК РФ."
            />
            <Feature
              term="С чем сверяется"
              detail="Разъяснения Пленума Верховного Суда РФ, позиции Президиума, обзоры судебной практики и база судебных решений."
            />
            <Feature
              term="Что на выходе"
              detail="Заключение с аннотацией дела, результатом формальной проверки, областями для углублённого анализа и статистической справкой."
            />
            <Feature
              term="Чего система не делает"
              detail="Не принимает решений, не назначает наказание и не заменяет судью. Все выводы носят справочный характер."
            />
          </dl>
        </div>

        <div className="border border-rule bg-paper">
          <div className="border-b border-rule bg-mist px-5 py-3">
            <h2 className="font-serif text-base">Вход в систему</h2>
          </div>
          <div className="px-5 py-5">
            <p className="text-sm text-ink-2">
              Демонстрационный режим. Аутентификация в прототипе не реализована:
              вход выполняется в подготовленный профиль.
            </p>

            <div className="mt-4 border border-rule bg-mist px-4 py-3">
              <p className="font-bold text-navy">{JUDGE.fio}</p>
              <p className="mt-0.5 text-sm text-ink-2">{JUDGE.position}</p>
              <p className="text-sm text-ink-2">{JUDGE.court}</p>
              <p className="mt-2 text-xs text-ink-3">
                {JUDGE.chamber} · стаж {JUDGE.experienceYears} лет
              </p>
            </div>

            <Link
              href="/dashboard"
              className="btn btn-primary mt-4 w-full justify-center"
            >
              {labels.login}
            </Link>

            <p className="mt-4 border-t border-hair pt-3 text-xs leading-relaxed text-ink-3">
              В реестре {DEMO_CASES.length}{" "}
              {plural(
                DEMO_CASES.length,
                "демонстрационное дело",
                "демонстрационных дела",
                "демонстрационных дел",
              )}
              ; по {violations} из них проверка выявила нарушения.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-rule bg-paper">
        <div className="mx-auto max-w-shell px-4 py-5">
          <p className="max-w-prose text-xs leading-relaxed text-ink-2">
            <strong className="text-ink">
              Система не принимает судебных решений и не заменяет судью в
              процессе правоприменения.
            </strong>{" "}
            Прототип разработан как вспомогательный инструмент проверки проекта
            судебного акта. Данные демонстрационные.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="border-l-2 border-rule pl-4">
      <dt className="font-serif text-base font-bold text-navy">{term}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink-2">{detail}</dd>
    </div>
  );
}
