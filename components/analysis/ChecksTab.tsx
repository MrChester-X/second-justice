"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Check, CheckGroup, Verdict } from "@/lib/types";
import { PRACTICE_BY_ID, PRACTICE_KIND_NAMES } from "@/lib/data/practice";
import { VERDICT_NAMES, verdictCountLabel } from "@/lib/format";
import {
  Panel,
  PanelHead,
  StatusMark,
  VERDICT_BORDER,
  VERDICT_DOT,
} from "@/components/ui/primitives";

const GROUP_NAMES: Record<CheckGroup, string> = {
  sanction: "Пределы санкции статьи",
  special_rules: "Специальные правила назначения наказания",
  additional: "Дополнительное наказание",
  general: "Общие начала назначения наказания",
  edition: "Редакция закона на момент деяния",
  release: "Освобождение от ответственности и наказания (раздел IV УК РФ)",
  practice: "Соответствие практике Верховного Суда РФ",
};

const GROUP_ORDER: CheckGroup[] = [
  "sanction",
  "special_rules",
  "additional",
  "general",
  "edition",
  "release",
  "practice",
];

const FILTERS: Array<{ id: "all" | Verdict; label: string }> = [
  { id: "all", label: "Все проверки" },
  { id: "violation", label: "Нарушения" },
  { id: "warning", label: "Замечания" },
  { id: "ok", label: "Соответствует" },
];

function CheckCard({ check, recomputed }: { check: Check; recomputed: boolean }) {
  const [open, setOpen] = useState(
    check.verdict === "violation" || check.verdict === "warning",
  );

  return (
    <article
      className={clsx(
        "border border-l-4 border-rule bg-paper",
        VERDICT_BORDER[check.verdict],
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4 py-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <StatusMark verdict={check.verdict} />
            <span className="font-mono text-xs text-ink-3">{check.norm}</span>
            {recomputed ? (
              <span className="border border-navy-soft bg-navy-pale px-1.5 py-0.5 text-2xs uppercase tracking-eyebrow text-navy">
                пересчитано
              </span>
            ) : null}
          </span>
          <span className="mt-1.5 block font-serif text-base font-bold text-navy">
            {check.title}
          </span>
          <span className="mt-0.5 block text-sm text-ink-2">{check.summary}</span>
        </span>
        <span className="shrink-0 pt-1 text-xs text-navy underline">
          {open ? "свернуть" : "подробно"}
        </span>
      </button>

      {open ? (
        <div className="border-t border-hair px-4 py-3">
          {check.calculation && check.calculation.length > 0 ? (
            <div className="mb-3">
              <p className="eyebrow mb-1.5">Расчёт</p>
              <ol className="space-y-1 border-l border-rule pl-3">
                {check.calculation.map((line, index) => (
                  <li
                    key={line}
                    className="grid grid-cols-[1.5rem_1fr] text-sm text-ink-2"
                  >
                    <span className="font-mono text-xs text-ink-3">
                      {index + 1}.
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <p className="max-w-prose text-sm leading-relaxed">{check.detail}</p>

          {check.practiceRefs && check.practiceRefs.length > 0 ? (
            <div className="mt-3 border-t border-hair pt-3">
              <p className="eyebrow mb-1.5">Основания в практике</p>
              <ul className="space-y-2">
                {check.practiceRefs.map((refId) => {
                  const item = PRACTICE_BY_ID[refId];
                  if (!item) return null;
                  return (
                    <li key={refId} className="text-sm">
                      <span className="text-2xs uppercase tracking-eyebrow text-ink-3">
                        {PRACTICE_KIND_NAMES[item.kind]}
                      </span>
                      <p className="text-ink">{item.title}</p>
                      <p className="text-xs text-ink-3">{item.clause}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function ChecksTab({
  checks,
  recomputedIds,
}: {
  checks: Check[];
  recomputedIds: string[];
}) {
  const [filter, setFilter] = useState<"all" | Verdict>("all");

  const counts = {
    violation: checks.filter((c) => c.verdict === "violation").length,
    warning: checks.filter((c) => c.verdict === "warning").length,
    ok: checks.filter((c) => c.verdict === "ok").length,
    info: checks.filter((c) => c.verdict === "info").length,
  };

  const visible = checks.filter(
    (check) => filter === "all" || check.verdict === filter,
  );

  return (
    <div className="space-y-5">
      <Panel>
        <PanelHead
          title="Результат проверки"
          aside={`всего проверок: ${checks.length}`}
        />
        <div className="flex flex-wrap gap-x-8 gap-y-3 px-4 py-3">
          {(["violation", "warning", "ok", "info"] as Verdict[]).map(
            (verdict) => (
              <div key={verdict} className="border-l-2 border-rule pl-3">
                <div className="font-serif text-2xl font-bold tnum text-navy">
                  {counts[verdict]}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-2">
                  <span
                    className={VERDICT_DOT[verdict]}
                    aria-hidden
                  />
                  {verdictCountLabel(verdict, counts[verdict])}
                </div>
              </div>
            ),
          )}
        </div>
      </Panel>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          const count =
            item.id === "all" ? checks.length : counts[item.id as Verdict];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={active}
              className={clsx(
                "border px-3 py-1.5 text-sm",
                active
                  ? "border-navy bg-navy text-paper"
                  : "border-rule bg-paper text-ink-2 hover:border-navy hover:text-navy",
              )}
            >
              {item.label}
              <span className="ml-1.5 tnum opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {GROUP_ORDER.map((group) => {
        const groupChecks = visible.filter((check) => check.group === group);
        if (groupChecks.length === 0) return null;
        return (
          <section key={group}>
            <h3 className="mb-2 border-b border-rule pb-1.5 font-serif text-base">
              {GROUP_NAMES[group]}
            </h3>
            <div className="space-y-2">
              {groupChecks.map((check) => (
                <CheckCard
                  key={check.id}
                  check={check}
                  recomputed={recomputedIds.includes(check.id)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {visible.length === 0 ? (
        <p className="border border-dashed border-rule bg-mist px-4 py-6 text-center text-sm text-ink-3">
          Проверок с вердиктом «{VERDICT_NAMES[filter as Verdict]}» нет.
        </p>
      ) : null}
    </div>
  );
}
