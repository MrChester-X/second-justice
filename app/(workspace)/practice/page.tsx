"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { PRACTICE, PRACTICE_KIND_NAMES } from "@/lib/data/practice";
import { formatDateLong } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel, PanelHead } from "@/components/ui/primitives";
import type { PracticeItem } from "@/lib/types";

const KIND_FILTERS: Array<{ id: "all" | PracticeItem["kind"]; label: string }> =
  [
    { id: "all", label: "Все документы" },
    { id: "plenum", label: "Постановления Пленума" },
    { id: "presidium", label: "Позиции Президиума" },
    { id: "review", label: "Обзоры практики" },
  ];

export default function PracticePage() {
  const [kind, setKind] = useState<"all" | PracticeItem["kind"]>("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return PRACTICE.filter(
      (item) =>
        (kind === "all" || item.kind === kind) &&
        (normalized === "" ||
          item.title.toLowerCase().includes(normalized) ||
          item.excerpt.toLowerCase().includes(normalized) ||
          item.articles.some((a) => a.toLowerCase().includes(normalized))),
    );
  }, [kind, query]);

  return (
    <>
      <PageHeader
        eyebrow="Справочные ресурсы"
        title="Практика Верховного Суда Российской Федерации"
        lead="Разъяснения Пленума, позиции Президиума и обзоры судебной практики, на которые опираются проверки системы. Каждая проверка ссылается на конкретный документ из этого справочника."
        crumbs={[
          { href: "/dashboard", label: "Личный кабинет" },
          { label: "Практика ВС РФ" },
        ]}
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {KIND_FILTERS.map((item) => {
              const active = kind === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setKind(item.id)}
                  aria-pressed={active}
                  className={clsx(
                    "border px-3 py-1.5 text-sm",
                    active
                      ? "border-navy bg-navy text-paper"
                      : "border-rule bg-paper text-ink-2 hover:border-navy hover:text-navy",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <label className="block">
            <span className="field-label mb-1">Поиск по тексту и статьям</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="например: ст. 62 УК РФ"
              className="input w-72"
            />
          </label>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Panel key={item.id}>
              <PanelHead
                title={
                  <span className="text-2xs uppercase tracking-eyebrow text-ink-3">
                    {PRACTICE_KIND_NAMES[item.kind]}
                  </span>
                }
                aside={formatDateLong(item.date)}
              />
              <div className="px-4 py-3">
                <h3 className="font-serif text-base leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-ink-3">{item.clause}</p>

                <p className="mt-3 max-w-prose border-l-2 border-navy-soft bg-mist px-3 py-2 text-sm leading-relaxed text-ink-2">
                  {item.excerpt}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.articles.map((article) => (
                    <li
                      key={article}
                      className="border border-rule bg-paper px-2 py-0.5 font-mono text-xs text-navy"
                    >
                      {article}
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          ))}

          {items.length === 0 ? (
            <p className="border border-dashed border-rule bg-mist px-4 py-8 text-center text-sm text-ink-3">
              По заданным условиям документов не найдено.
            </p>
          ) : null}
        </div>

        <Panel>
          <PanelHead title="О содержании справочника" />
          <div className="max-w-prose space-y-2 px-4 py-3 text-sm leading-relaxed text-ink-2">
            <p>
              Приведённые тексты являются кратким изложением позиций, а не
              дословными цитатами; раздел документа указан по содержанию, а не
              номером пункта. Так сделано намеренно: прототип не должен
              создавать видимость дословного цитирования непроверенного текста.
            </p>
            <p>
              В рабочей версии системы справочник подключается к официальным
              публикациям Верховного Суда Российской Федерации, а изложения
              заменяются точными цитатами с указанием пунктов.
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}
