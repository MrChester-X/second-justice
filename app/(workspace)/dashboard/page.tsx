"use client";

import Link from "next/link";
import clsx from "clsx";
import { JUDGE } from "@/lib/data/judge";
import { STATUS_NAMES } from "@/lib/api/analysis";
import { useAllCases, useSession } from "@/lib/store/session";
import { caseHref } from "@/lib/routes";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/lib/i18n";
import { Metric, Panel, PanelHead } from "@/components/ui/primitives";
import type { CaseStatus } from "@/lib/types";

const STATUS_TONE: Record<CaseStatus, string> = {
  ok: "text-ok",
  warnings: "text-warn",
  violations: "text-bordo",
  draft: "text-ink-3",
  analyzing: "text-ink-3",
};

export default function DashboardPage() {
  const { t, tr, f } = useI18n();
  const cases = useAllCases();
  const reportedIds = useSession((s) => s.reportedIds);
  const hydrated = useSession((s) => s.hydrated);

  const violations = cases.filter((c) => c.status === "violations").length;
  const warnings = cases.filter((c) => c.status === "warnings").length;
  const clean = cases.filter((c) => c.status === "ok").length;

  return (
    <>
      <PageHeader
        eyebrow={t.dashboard.eyebrow}
        title={tr(JUDGE.fio)}
        lead={`${tr(JUDGE.position)}, ${tr(JUDGE.court)}. ${tr(
          JUDGE.chamber,
        )}.`}
        actions={
          <Link href="/analysis/new" className="btn btn-primary">
            {t.dashboard.startCheck}
          </Link>
        }
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        <Panel>
          <PanelHead
            title={t.dashboard.metricsTitle}
            aside={t.dashboard.totalInRegistry(cases.length)}
          />
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric value={cases.length} label={t.dashboard.metricChecked} />
            <Metric
              value={violations}
              label={t.dashboard.metricViolations(violations)}
              tone="bordo"
            />
            <Metric
              value={warnings}
              label={t.dashboard.metricWarnings(warnings)}
              tone="warn"
            />
            <Metric value={clean} label={t.dashboard.metricClean} tone="ok" />
          </div>
          <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
            {t.dashboard.metricsNote}
          </p>
        </Panel>

        <Panel>
          <PanelHead
            title={t.dashboard.registryTitle}
            aside={hydrated ? undefined : t.dashboard.restoring}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="th">{t.dashboard.colCase}</th>
                  <th className="th">{t.dashboard.colDefendant}</th>
                  <th className="th">{t.dashboard.colQualification}</th>
                  <th className="th">{t.dashboard.colDocument}</th>
                  <th className="th">{t.dashboard.colUploaded}</th>
                  <th className="th">{t.dashboard.colResult}</th>
                  <th className="th">{t.dashboard.colOpinion}</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr key={item.id} className="hover:bg-mist">
                    <td className="cell whitespace-nowrap">
                      <Link
                        href={caseHref(item.id)}
                        className="font-bold font-mono"
                      >
                        {tr(item.number)}
                      </Link>
                      {!item.demo ? (
                        <span className="ml-2 border border-rule px-1 py-0.5 text-2xs uppercase tracking-eyebrow text-ink-3">
                          {t.dashboard.uploadedTag}
                        </span>
                      ) : null}
                    </td>
                    <td className="cell">{tr(item.defendantShort)}</td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {tr(item.articleShort)}
                    </td>
                    <td className="cell">
                      <span
                        className="block max-w-[18rem] truncate"
                        title={item.fileName}
                      >
                        {item.fileName}
                      </span>
                      <span className="text-xs text-ink-3">
                        {f.fileSize(item.fileSize)} ·{" "}
                        {t.dashboard.pages(item.pages)}
                      </span>
                    </td>
                    <td className="cell whitespace-nowrap text-ink-2">
                      {f.dateTime(item.uploadedAt)}
                    </td>
                    <td
                      className={clsx(
                        "cell whitespace-nowrap font-bold",
                        STATUS_TONE[item.status],
                      )}
                    >
                      {tr(STATUS_NAMES[item.status])}
                    </td>
                    <td className="cell whitespace-nowrap">
                      {reportedIds.includes(item.id) ? (
                        <Link href={caseHref(item.id)}>
                          {t.dashboard.opinionReady}
                        </Link>
                      ) : (
                        <span className="text-ink-3">
                          {t.dashboard.opinionNone}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel>
            <PanelHead title={t.dashboard.profileTitle} />
            <dl className="px-4 py-3 text-sm">
              <Row label={t.profile.fieldFio} value={tr(JUDGE.fio)} />
              <Row label={t.profile.fieldPosition} value={tr(JUDGE.position)} />
              <Row label={t.profile.fieldCourt} value={tr(JUDGE.court)} />
              <Row label={t.profile.fieldRegion} value={tr(JUDGE.region)} />
              <Row label={t.profile.fieldChamber} value={tr(JUDGE.chamber)} />
              <Row
                label={t.profile.fieldAppointed}
                value={f.date(JUDGE.appointedAt)}
              />
              <Row
                label={t.profile.fieldExperience}
                value={t.profile.years(JUDGE.experienceYears)}
              />
            </dl>
            <div className="border-t border-hair px-4 py-2.5">
              <Link href="/profile" className="text-sm">
                {t.dashboard.profileSettings}
              </Link>
            </div>
          </Panel>

          <Panel>
            <PanelHead title={t.dashboard.howItWorksTitle} />
            <ol className="space-y-3 px-4 py-4 text-sm">
              {t.dashboard.steps.map((step, index) => (
                <Step
                  key={step.title}
                  number={index + 1}
                  title={step.title}
                  text={step.text}
                />
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,14rem)_1fr] gap-4 border-b border-hair py-2 last:border-b-0">
      <dt className="text-ink-3">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <li className="grid grid-cols-[2rem_1fr] gap-x-2">
      <span className="font-serif text-xl font-bold text-navy-soft tnum">
        {number}
      </span>
      <span>
        <span className="block font-bold text-ink">{title}</span>
        <span className="mt-0.5 block text-ink-2">{text}</span>
      </span>
    </li>
  );
}
