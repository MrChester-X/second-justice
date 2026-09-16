"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { CaseFile } from "@/lib/types";
import { getSanction } from "@/lib/data/uk-sanctions";
import { checkSanctionBounds, checkScaleLimits } from "@/lib/rules";
import { computeStatistics } from "@/lib/stats";
import { statusFromChecks, STATUS_NAMES } from "@/lib/api/analysis";
import { useSession } from "@/lib/store/session";
import { useI18n } from "@/lib/i18n";
import { l } from "@/lib/i18n/text";
import { ParamsTab } from "./ParamsTab";
import { ChecksTab } from "./ChecksTab";
import { SimilarTab } from "./SimilarTab";
import { ConclusionTab } from "./ConclusionTab";

const TAB_IDS = ["params", "checks", "similar", "conclusion"] as const;

type TabId = (typeof TAB_IDS)[number];

const STATUS_TONE: Record<string, string> = {
  ok: "text-ok",
  warnings: "text-warn",
  violations: "text-bordo",
  draft: "text-ink-3",
  analyzing: "text-ink-3",
};

export function Workspace({ caseFile }: { caseFile: CaseFile }) {
  const { t, tr, f, locale } = useI18n();
  const analysis = caseFile.analysis;
  const sanction = getSanction(analysis.sanctionKey);
  const originalTerm = analysis.params.punishment.value?.main;

  const [tab, setTab] = useState<TabId>("params");
  const [amount, setAmount] = useState(originalTerm?.amount ?? 0);
  const [generatedAt, setGeneratedAt] = useState("—");
  const markReported = useSession((s) => s.markReported);

  useEffect(() => {
    setGeneratedAt(
      new Date().toLocaleString(locale === "ru" ? "ru-RU" : "en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [locale]);

  useEffect(() => {
    if (tab === "conclusion") markReported(caseFile.id);
  }, [tab, caseFile.id, markReported]);

  const term = useMemo(
    () => (originalTerm ? { ...originalTerm, amount } : undefined),
    [originalTerm, amount],
  );

  const edited = !!originalTerm && amount !== originalTerm.amount;

  const liveSanctionCheck = useMemo(
    () =>
      term
        ? checkSanctionBounds(sanction, term)
        : {
            id: "live-sanction",
            group: "sanction" as const,
            title: l(
              "Наказание не извлечено",
              "The punishment was not extracted",
            ),
            norm: sanction.label,
            verdict: "warning" as const,
            summary: l(
              "Укажите вид и размер наказания вручную.",
              "Enter the type and amount of punishment manually.",
            ),
            detail: l(
              "Проверка пределов санкции невозможна без сведений о назначенном наказании.",
              "The limits of the sanction cannot be checked without details of the punishment imposed.",
            ),
          },
    [sanction, term],
  );

  const liveLimitChecks = useMemo(
    () => (term ? checkScaleLimits(sanction, term, analysis.scaleLimits) : []),
    [sanction, term, analysis.scaleLimits],
  );

  /**
   * При правке размера наказания проверки пределов заменяются на пересчитанные;
   * остальные остаются исходными — прототип не переписывает мотивировочную
   * часть заключения.
   */
  const checks = useMemo(() => {
    if (!edited) return analysis.checks;
    const replaced = new Set(["sanction", "special_rules"]);
    return [
      liveSanctionCheck,
      ...liveLimitChecks,
      ...analysis.checks.filter((check) => !replaced.has(check.group)),
    ];
  }, [edited, analysis.checks, liveSanctionCheck, liveLimitChecks]);

  const recomputedIds = edited
    ? [liveSanctionCheck.id, ...liveLimitChecks.map((c) => c.id)]
    : [];

  const statistics = useMemo(
    () =>
      edited && term
        ? computeStatistics(analysis.similar, term.amount, term.kind, term.unit)
        : analysis.statistics,
    [edited, term, analysis.similar, analysis.statistics],
  );

  const status = edited ? statusFromChecks(checks) : caseFile.status;

  return (
    <div className="mx-auto max-w-shell px-4 py-6 print:max-w-none print:p-0">
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border border-rule bg-paper px-4 py-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-ink-2">
          <span>
            {t.workspace.documentLabel}:{" "}
            <span className="font-mono text-ink">{caseFile.fileName}</span>
          </span>
          <span>{f.fileSize(caseFile.fileSize)}</span>
          <span>{t.dashboard.pages(caseFile.pages)}</span>
          <span>
            {t.workspace.uploadedAt} {f.dateTime(caseFile.uploadedAt)}
          </span>
        </div>
        <span
          className={clsx(
            "font-bold uppercase tracking-eyebrow",
            STATUS_TONE[status],
          )}
        >
          {tr(STATUS_NAMES[status])}
        </span>
      </div>

      <div className="no-print mb-5 border-b border-rule">
        <div
          role="tablist"
          aria-label={t.workspace.tablist}
          className="flex flex-wrap"
        >
          {TAB_IDS.map((id) => {
            const active = tab === id;
            return (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTab(id)}
                className={clsx(
                  "-mb-px border-b-2 px-4 py-2.5 font-sans text-sm transition-colors",
                  active
                    ? "border-bordo font-bold text-navy"
                    : "border-transparent text-ink-2 hover:border-rule hover:text-navy",
                )}
              >
                {t.workspace.tabs[id]}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "params" && term ? (
        <ParamsTab
          params={analysis.params}
          sanction={sanction}
          term={term}
          originalAmount={originalTerm?.amount ?? 0}
          onAmountChange={setAmount}
          onReset={() => setAmount(originalTerm?.amount ?? 0)}
          liveCheck={liveSanctionCheck}
          statistics={statistics}
          scaleLimits={analysis.scaleLimits}
        />
      ) : null}

      {tab === "checks" ? (
        <ChecksTab checks={checks} recomputedIds={recomputedIds} />
      ) : null}

      {tab === "similar" ? (
        <SimilarTab
          similar={analysis.similar}
          statistics={statistics}
          assignedAmount={amount}
        />
      ) : null}

      {tab === "conclusion" ? (
        <>
          <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 border border-rule bg-mist px-4 py-3">
            <p className="text-sm text-ink-2">{t.workspace.printHint}</p>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-primary"
            >
              {t.workspace.print}
            </button>
          </div>
          <ConclusionTab
            caseFile={{ ...caseFile, status }}
            checks={checks}
            statistics={statistics}
            generatedAt={generatedAt}
          />
        </>
      ) : null}
    </div>
  );
}
