"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Check, CheckGroup, Verdict } from "@/lib/types";
import { PRACTICE_BY_ID, PRACTICE_KIND_NAMES } from "@/lib/data/practice";
import { useI18n } from "@/lib/i18n";
import {
  Panel,
  PanelHead,
  StatusMark,
  VERDICT_BORDER,
  VERDICT_DOT,
} from "@/components/ui/primitives";

const GROUP_ORDER: CheckGroup[] = [
  "sanction",
  "special_rules",
  "additional",
  "general",
  "edition",
  "release",
  "practice",
];

const FILTER_IDS = ["all", "violation", "warning", "ok"] as const;

function CheckCard({
  check,
  recomputed,
}: {
  check: Check;
  recomputed: boolean;
}) {
  const { t, tr, trAll } = useI18n();
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
            <span className="font-mono text-xs text-ink-3">
              {tr(check.norm)}
            </span>
            {recomputed ? (
              <span className="border border-navy-soft bg-navy-pale px-1.5 py-0.5 text-2xs uppercase tracking-eyebrow text-navy">
                {t.checks.recomputed}
              </span>
            ) : null}
          </span>
          <span className="mt-1.5 block font-serif text-base font-bold text-navy">
            {tr(check.title)}
          </span>
          <span className="mt-0.5 block text-sm text-ink-2">
            {tr(check.summary)}
          </span>
        </span>
        <span className="shrink-0 pt-1 text-xs text-navy underline">
          {open ? t.checks.collapse : t.checks.expand}
        </span>
      </button>

      {open ? (
        <div className="border-t border-hair px-4 py-3">
          {check.calculation && check.calculation.length > 0 ? (
            <div className="mb-3">
              <p className="eyebrow mb-1.5">{t.checks.calculation}</p>
              <ol className="space-y-1 border-l border-rule pl-3">
                {trAll(check.calculation).map((line, index) => (
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

          <p className="max-w-prose text-sm leading-relaxed">
            {tr(check.detail)}
          </p>

          {check.practiceRefs && check.practiceRefs.length > 0 ? (
            <div className="mt-3 border-t border-hair pt-3">
              <p className="eyebrow mb-1.5">{t.checks.practiceBasis}</p>
              <ul className="space-y-2">
                {check.practiceRefs.map((refId) => {
                  const item = PRACTICE_BY_ID[refId];
                  if (!item) return null;
                  return (
                    <li key={refId} className="text-sm">
                      <span className="text-2xs uppercase tracking-eyebrow text-ink-3">
                        {tr(PRACTICE_KIND_NAMES[item.kind])}
                      </span>
                      <p className="text-ink">{tr(item.title)}</p>
                      <p className="text-xs text-ink-3">{tr(item.clause)}</p>
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
  const { t, f } = useI18n();
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
          title={t.checks.resultTitle}
          aside={t.checks.totalChecks(checks.length)}
        />
        <div className="flex flex-wrap gap-x-8 gap-y-3 px-4 py-3">
          {(["violation", "warning", "ok", "info"] as Verdict[]).map(
            (verdict) => (
              <div key={verdict} className="border-l-2 border-rule pl-3">
                <div className="font-serif text-2xl font-bold tnum text-navy">
                  {counts[verdict]}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-2">
                  <span className={VERDICT_DOT[verdict]} aria-hidden />
                  {f.verdictCount(verdict, counts[verdict])}
                </div>
              </div>
            ),
          )}
        </div>
      </Panel>

      <div className="flex flex-wrap items-center gap-2">
        {FILTER_IDS.map((id) => {
          const active = filter === id;
          const count = id === "all" ? checks.length : counts[id as Verdict];
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              aria-pressed={active}
              className={clsx(
                "border px-3 py-1.5 text-sm",
                active
                  ? "border-navy bg-navy text-paper"
                  : "border-rule bg-paper text-ink-2 hover:border-navy hover:text-navy",
              )}
            >
              {t.checks.filters[id]}
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
              {t.checks.groups[group]}
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
          {t.checks.emptyFilter(f.verdict(filter as Verdict))}
        </p>
      ) : null}
    </div>
  );
}
