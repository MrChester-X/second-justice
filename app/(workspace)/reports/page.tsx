"use client";

import Link from "next/link";
import clsx from "clsx";
import { useAllCases, useSession } from "@/lib/store/session";
import { caseHref } from "@/lib/routes";
import { STATUS_NAMES } from "@/lib/api/analysis";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/lib/i18n";
import { EmptyState, Panel, PanelHead } from "@/components/ui/primitives";
import type { CaseStatus } from "@/lib/types";

const STATUS_TONE: Record<CaseStatus, string> = {
  ok: "text-ok",
  warnings: "text-warn",
  violations: "text-bordo",
  draft: "text-ink-3",
  analyzing: "text-ink-3",
};

export default function ReportsPage() {
  const { t, tr, f } = useI18n();
  const cases = useAllCases();
  const reportedIds = useSession((s) => s.reportedIds);
  const hydrated = useSession((s) => s.hydrated);

  const reported = cases.filter((item) => reportedIds.includes(item.id));

  return (
    <>
      <PageHeader
        eyebrow={t.dashboard.eyebrow}
        title={t.reports.title}
        lead={t.reports.lead}
        crumbs={[
          { href: "/dashboard", label: t.nav.dashboard },
          { label: t.nav.reports },
        ]}
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        {reported.length === 0 ? (
          <EmptyState
            title={hydrated ? t.reports.emptyTitle : t.reports.restoringTitle}
            hint={hydrated ? t.reports.emptyHint : undefined}
          />
        ) : (
          <Panel>
            <PanelHead
              title={t.reports.tableTitle}
              aside={t.reports.documents(reported.length)}
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="th">{t.dashboard.colCase}</th>
                    <th className="th">{t.dashboard.colDefendant}</th>
                    <th className="th">{t.dashboard.colQualification}</th>
                    <th className="th text-right">{t.reports.colViolations}</th>
                    <th className="th text-right">{t.reports.colWarnings}</th>
                    <th className="th">{t.reports.colResult}</th>
                    <th className="th">{t.reports.colDocumentDate}</th>
                    <th className="th" />
                  </tr>
                </thead>
                <tbody>
                  {reported.map((item) => {
                    const checks = item.analysis.checks;
                    const violations = checks.filter(
                      (c) => c.verdict === "violation",
                    ).length;
                    const warnings = checks.filter(
                      (c) => c.verdict === "warning",
                    ).length;
                    return (
                      <tr key={item.id} className="hover:bg-mist">
                        <td className="cell whitespace-nowrap font-mono font-bold">
                          <Link href={caseHref(item.id)}>
                            {tr(item.number)}
                          </Link>
                        </td>
                        <td className="cell">{tr(item.defendantShort)}</td>
                        <td className="cell whitespace-nowrap font-mono text-xs">
                          {tr(item.articleShort)}
                        </td>
                        <td className="cell text-right tnum text-bordo">
                          {violations}
                        </td>
                        <td className="cell text-right tnum text-warn">
                          {warnings}
                        </td>
                        <td
                          className={clsx(
                            "cell whitespace-nowrap font-bold",
                            STATUS_TONE[item.status],
                          )}
                        >
                          {tr(STATUS_NAMES[item.status])}
                        </td>
                        <td className="cell whitespace-nowrap text-ink-2">
                          {f.dateTime(item.uploadedAt)}
                        </td>
                        <td className="cell whitespace-nowrap">
                          <Link href={caseHref(item.id)}>
                            {t.reports.openAndPrint}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
              {t.reports.exportNote}
            </p>
          </Panel>
        )}
      </div>
    </>
  );
}
