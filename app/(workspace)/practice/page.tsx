"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { PRACTICE, PRACTICE_KIND_NAMES } from "@/lib/data/practice";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/lib/i18n";
import { Panel, PanelHead } from "@/components/ui/primitives";
import type { PracticeItem } from "@/lib/types";

export default function PracticePage() {
  const { t, tr, trAll, f, locale } = useI18n();
  const [kind, setKind] = useState<"all" | PracticeItem["kind"]>("all");
  const [query, setQuery] = useState("");

  const kindFilters: Array<{
    id: "all" | PracticeItem["kind"];
    label: string;
  }> = [
    { id: "all", label: t.practice.filterAll },
    { id: "plenum", label: t.practice.filterPlenum },
    { id: "presidium", label: t.practice.filterPresidium },
    { id: "review", label: t.practice.filterReview },
  ];

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    /* Поиск идёт по тексту на выбранном языке: искать по скрытому
       переводу пользователь не может. */
    return PRACTICE.filter(
      (item) =>
        (kind === "all" || item.kind === kind) &&
        (normalized === "" ||
          item.title[locale].toLowerCase().includes(normalized) ||
          item.excerpt[locale].toLowerCase().includes(normalized) ||
          item.articles.some((a) =>
            a[locale].toLowerCase().includes(normalized),
          )),
    );
  }, [kind, query, locale]);

  return (
    <>
      <PageHeader
        eyebrow={t.practice.eyebrow}
        title={t.practice.title}
        lead={t.practice.lead}
        crumbs={[
          { href: "/dashboard", label: t.nav.dashboard },
          { label: t.nav.practice },
        ]}
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {kindFilters.map((item) => {
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
            <span className="field-label mb-1">{t.practice.searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.practice.searchPlaceholder}
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
                    {tr(PRACTICE_KIND_NAMES[item.kind])}
                  </span>
                }
                aside={f.dateLong(item.date)}
              />
              <div className="px-4 py-3">
                <h3 className="font-serif text-base leading-snug">
                  {tr(item.title)}
                </h3>
                <p className="mt-1 text-xs text-ink-3">{tr(item.clause)}</p>

                <p className="mt-3 max-w-prose border-l-2 border-navy-soft bg-mist px-3 py-2 text-sm leading-relaxed text-ink-2">
                  {tr(item.excerpt)}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {trAll(item.articles).map((article) => (
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
              {t.practice.empty}
            </p>
          ) : null}
        </div>

        <Panel>
          <PanelHead title={t.practice.aboutTitle} />
          <div className="max-w-prose space-y-2 px-4 py-3 text-sm leading-relaxed text-ink-2">
            <p>{t.practice.aboutParaphrase}</p>
            <p>{t.practice.aboutFuture}</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
