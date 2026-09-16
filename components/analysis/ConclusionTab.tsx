"use client";

import type { ReactNode } from "react";
import type { CaseFile, Check, Statistics } from "@/lib/types";
import { JUDGE } from "@/lib/data/judge";
import { PRACTICE_BY_ID } from "@/lib/data/practice";
import { useI18n } from "@/lib/i18n";
import { StatusMark, VERDICT_DOT } from "@/components/ui/primitives";
import { Disclaimer } from "@/components/layout/Disclaimer";

/**
 * Заключение. Свёрстано как документ, а не как экран: печатается по Ctrl+P
 * без навигации и рамок благодаря правилам @media print в globals.css.
 * Документ выводится на языке интерфейса — и печатается на нём же.
 */
export function ConclusionTab({
  caseFile,
  checks,
  statistics,
  generatedAt,
}: {
  caseFile: CaseFile;
  /** Актуальные проверки: при правке параметров они пересчитаны. */
  checks: Check[];
  statistics: Statistics;
  generatedAt: string;
}) {
  const { t, tr, trAll, f } = useI18n();
  const { conclusion } = caseFile.analysis;

  // Один документ может обосновывать несколько проверок: группируем по
  // названию, перечисляя разделы, иначе длинные названия дублируются.
  const practiceDocuments = Array.from(
    new Set(checks.flatMap((check) => check.practiceRefs ?? [])),
  ).reduce<Array<{ title: string; date: string; clauses: string[] }>>(
    (acc, id) => {
      const item = PRACTICE_BY_ID[id];
      if (!item) return acc;
      const title = tr(item.title);
      const clause = tr(item.clause);
      const existing = acc.find((entry) => entry.title === title);
      if (existing) {
        if (!existing.clauses.includes(clause)) existing.clauses.push(clause);
        return acc;
      }
      acc.push({ title, date: item.date, clauses: [clause] });
      return acc;
    },
    [],
  );

  return (
    <div className="mx-auto max-w-[52rem] border border-rule bg-paper print-flat print:mx-0 print:max-w-none">
      <div className="border-b-2 border-navy px-8 py-6 print:px-0">
        <p className="eyebrow">{t.conclusion.systemLine}</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight">
          {t.conclusion.documentTitle}
        </h2>
        <dl className="mt-4 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          <div className="flex gap-2">
            <dt className="text-ink-3">{t.conclusion.fieldCase}</dt>
            <dd className="font-bold">{tr(caseFile.number)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">{t.conclusion.fieldQualification}</dt>
            <dd className="font-bold">{tr(caseFile.articleShort)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">{t.conclusion.fieldCourt}</dt>
            <dd>{tr(JUDGE.court)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">{t.conclusion.fieldJudge}</dt>
            <dd>{tr(JUDGE.shortFio)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">{t.conclusion.fieldDocument}</dt>
            <dd className="break-all">{caseFile.fileName}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">{t.conclusion.fieldGenerated}</dt>
            <dd>{generatedAt}</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-7 px-8 py-6 print:px-0">
        <Section number="1" title={t.conclusion.section1}>
          <p>{tr(conclusion.annotation)}</p>
        </Section>

        <Section number="2" title={t.conclusion.section2}>
          <p>{tr(conclusion.formalResult)}</p>
          <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 border-y border-hair py-2.5">
            {(["violation", "warning", "ok"] as const).map((verdict) => {
              const count = checks.filter((c) => c.verdict === verdict).length;
              return (
                <span
                  key={verdict}
                  className="flex items-baseline gap-2 text-sm"
                >
                  <span className="font-serif text-xl font-bold tnum text-ink">
                    {count}
                  </span>
                  <span className="flex items-center gap-1.5 text-ink-2">
                    <span className={VERDICT_DOT[verdict]} aria-hidden />
                    {f.verdictCount(verdict, count)}
                  </span>
                </span>
              );
            })}
          </div>
        </Section>

        <Section number="3" title={t.conclusion.section3}>
          <p>{tr(conclusion.practiceResult)}</p>
        </Section>

        <Section number="4" title={t.conclusion.section4}>
          {conclusion.attentionAreas.length === 0 ? (
            <p>{t.conclusion.noAttentionAreas}</p>
          ) : (
            <ol className="space-y-3">
              {conclusion.attentionAreas.map((area, index) => (
                <li
                  key={area.title.ru}
                  className="avoid-break grid grid-cols-[1.75rem_1fr] gap-x-2"
                >
                  <span className="font-mono text-sm text-ink-3">
                    {index + 1}.
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-bold text-ink">
                        {tr(area.title)}
                      </span>
                      <StatusMark verdict={area.severity} />
                    </div>
                    <p className="mt-0.5">{tr(area.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Section>

        <Section number="5" title={t.conclusion.section5}>
          <p>{tr(conclusion.statisticalNote)}</p>
          <table className="mt-3 w-full border-collapse text-sm">
            <tbody>
              <StatRow
                label={t.conclusion.statSample}
                value={`${t.similar.sampleCount(
                  statistics.total,
                )} (${f.kindShort(statistics.kind)})`}
              />
              <StatRow
                label={t.conclusion.statRange}
                value={`${f.amountShort(
                  statistics.min,
                  statistics.unit,
                )} — ${f.amountShort(statistics.max, statistics.unit)}`}
              />
              <StatRow
                label={t.conclusion.statQuartiles}
                value={`${f.amountShort(
                  statistics.q1,
                  statistics.unit,
                )} — ${f.amountShort(statistics.q3, statistics.unit)}`}
              />
              <StatRow
                label={t.conclusion.statMedian}
                value={f.amountShort(statistics.median, statistics.unit)}
              />
              <StatRow
                label={t.conclusion.statAssigned}
                value={f.amountShort(statistics.assigned, statistics.unit)}
              />
              <StatRow
                label={t.conclusion.statDeviation}
                value={`${f.sigma(
                  statistics.deviationSigma,
                )} · ${t.similar.percentile(statistics.percentile)}`}
              />
              <StatRow
                label={t.conclusion.statSuspended}
                value={f.percent(statistics.suspendedShare)}
              />
            </tbody>
          </table>
        </Section>

        <Section number="6" title={t.conclusion.section6}>
          <ul className="columns-1 gap-x-8 text-sm sm:columns-2">
            {trAll(conclusion.normsUsed).map((norm) => (
              <li key={norm} className="break-inside-avoid py-0.5">
                {norm}
              </li>
            ))}
          </ul>
        </Section>

        <Section number="7" title={t.conclusion.section7}>
          <ul className="space-y-2 text-sm">
            {practiceDocuments.map((doc) => (
              <li key={doc.title} className="avoid-break">
                <span className="block">{doc.title}</span>
                <span className="text-xs text-ink-3">
                  {doc.clauses.join("; ")} · {f.dateLong(doc.date)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-3">{t.conclusion.practiceNote}</p>
        </Section>

        <div className="border-t border-rule pt-4">
          <Disclaimer compact />
          <p className="mt-3 text-xs text-ink-3">
            {t.conclusion.footer(
              generatedAt,
              caseFile.fileName,
              f.dateTime(caseFile.uploadedAt),
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="avoid-break">
      <h3 className="mb-2 grid grid-cols-[1.75rem_1fr] gap-x-2 font-serif text-base">
        <span className="font-mono text-sm font-normal text-ink-3">
          {number}.
        </span>
        <span>{title}</span>
      </h3>
      <div className="ml-0 space-y-2 text-sm leading-relaxed sm:ml-[1.75rem]">
        {children}
      </div>
    </section>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="border-b border-hair py-1.5 pr-4 align-top text-ink-3">
        {label}
      </td>
      <td className="border-b border-hair py-1.5 text-right align-top font-bold tnum">
        {value}
      </td>
    </tr>
  );
}
