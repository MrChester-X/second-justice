"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { SimilarSentence, Statistics } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { describeDeviation } from "@/lib/stats";
import { Metric, Panel, PanelHead } from "@/components/ui/primitives";
import { PunishmentHistogram } from "./PunishmentHistogram";

export function SimilarTab({
  similar,
  statistics,
  assignedAmount,
}: {
  similar: SimilarSentence[];
  statistics: Statistics;
  assignedAmount: number;
}) {
  const { t, tr, f } = useI18n();
  const [onlySameKind, setOnlySameKind] = useState(true);
  const [region, setRegion] = useState("all");
  const [minSimilarity, setMinSimilarity] = useState(0);

  /* Русское название региона служит ключом фильтра: выбор не сбрасывается
     при переключении языка. */
  const regions = useMemo(() => {
    const seen = new Map<string, (typeof similar)[number]["region"]>();
    for (const item of similar) {
      if (!seen.has(item.region.ru)) seen.set(item.region.ru, item.region);
    }
    return [...seen.values()].sort((a, b) => a.ru.localeCompare(b.ru, "ru"));
  }, [similar]);

  const rows = useMemo(
    () =>
      similar.filter(
        (s) =>
          (!onlySameKind || s.kind === statistics.kind) &&
          (region === "all" || s.region.ru === region) &&
          s.similarity >= minSimilarity,
      ),
    [similar, onlySameKind, region, minSimilarity, statistics.kind],
  );

  const deviation = describeDeviation(statistics.deviationSigma);
  const deviationTone =
    deviation.level === "strong"
      ? "bordo"
      : deviation.level === "notable"
      ? "warn"
      : "ok";

  return (
    <div className="space-y-5">
      <Panel>
        <PanelHead
          title={t.similar.statsTitle}
          aside={`${t.similar.sample(statistics.total)} · ${f.kindShort(
            statistics.kind,
          )}`}
        />
        <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            value={f.amountShort(statistics.median, statistics.unit)}
            label={t.similar.median}
          />
          <Metric
            value={`${f.amountShort(
              statistics.q1,
              statistics.unit,
            )} — ${f.amountShort(statistics.q3, statistics.unit)}`}
            label={t.similar.iqr}
          />
          <Metric
            value={f.amountShort(assignedAmount, statistics.unit)}
            label={t.similar.assigned}
            tone={deviationTone === "ok" ? "navy" : deviationTone}
          />
          <Metric
            value={f.sigma(statistics.deviationSigma)}
            label={t.similar.deviation}
            tone={deviationTone}
          />
        </div>
        <div className="border-t border-hair px-4 py-3">
          <p className="max-w-prose text-sm leading-relaxed text-ink-2">
            {tr(deviation.text)} {t.similar.percentileBefore}{" "}
            <span className="font-bold text-ink tnum">
              {t.similar.percentile(statistics.percentile)}
            </span>{" "}
            {t.similar.percentileAfter(
              f.percent(1 - statistics.percentile / 100),
            )}{" "}
            {t.similar.suspendedShare(f.percent(statistics.suspendedShare))}
          </p>
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title={t.similar.histogramTitle}
          aside={t.similar.histogramAside}
        />
        <div className="px-4 py-4">
          <PunishmentHistogram statistics={statistics} />
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title={t.similar.tableTitle}
          aside={t.similar.shown(rows.length, similar.length)}
        />

        <div className="flex flex-wrap items-end gap-4 border-b border-hair bg-mist px-4 py-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlySameKind}
              onChange={(event) => setOnlySameKind(event.target.checked)}
              className="h-4 w-4 accent-navy"
            />
            {t.similar.sameKindOnly}
          </label>

          <label className="text-sm">
            <span className="field-label mb-1">{t.database.filterRegion}</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="input w-56"
            >
              <option value="all">{t.database.allRegions}</option>
              {regions.map((item) => (
                <option key={item.ru} value={item.ru}>
                  {tr(item)}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="field-label mb-1">
              {t.similar.minSimilarity(minSimilarity.toFixed(2))}
            </span>
            <input
              type="range"
              min={0}
              max={0.9}
              step={0.05}
              value={minSimilarity}
              onChange={(event) => setMinSimilarity(Number(event.target.value))}
              className="w-48 accent-navy"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <caption className="sr-only">{t.similar.tableCaption}</caption>
            <thead>
              <tr>
                <th className="th">{t.database.colCourt}</th>
                <th className="th">{t.database.colRegion}</th>
                <th className="th">{t.database.colDate}</th>
                <th className="th">{t.database.colPunishment}</th>
                <th className="th text-right">{t.database.colAmount}</th>
                <th className="th text-right">{t.database.colMitigating}</th>
                <th className="th text-right">{t.database.colAggravating}</th>
                <th className="th text-right">{t.similar.colSimilarity}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isAssignedLevel =
                  row.kind === statistics.kind && row.amount === assignedAmount;
                return (
                  <tr
                    key={row.id}
                    className={clsx(
                      "hover:bg-mist",
                      isAssignedLevel && "bg-bordo-pale/60",
                    )}
                  >
                    <td className="cell">{tr(row.court)}</td>
                    <td className="cell text-ink-2">{tr(row.region)}</td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {f.date(row.date)}
                    </td>
                    <td className="cell">
                      {f.kindShort(row.kind)}
                      {row.suspended ? (
                        <span className="ml-1 text-xs text-ink-3">
                          {t.database.suspendedMark}
                        </span>
                      ) : null}
                    </td>
                    <td className="cell whitespace-nowrap text-right font-bold tnum">
                      {f.amountShort(row.amount, row.unit)}
                    </td>
                    <td className="cell text-right tnum">{row.mitigating}</td>
                    <td className="cell text-right tnum">{row.aggravating}</td>
                    <td className="cell text-right tnum">
                      {row.similarity.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 ? (
                <tr>
                  <td className="cell text-center text-ink-3" colSpan={8}>
                    {t.similar.emptyRows}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
          {t.similar.syntheticNote}
        </p>
      </Panel>
    </div>
  );
}
