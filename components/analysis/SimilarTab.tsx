"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { SimilarSentence, Statistics } from "@/lib/types";
import {
  formatAmountShort,
  formatDate,
  formatPercent,
  formatSigma,
  kindNameShort,
  plural,
} from "@/lib/format";
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
  const [onlySameKind, setOnlySameKind] = useState(true);
  const [region, setRegion] = useState("all");
  const [minSimilarity, setMinSimilarity] = useState(0);

  const regions = useMemo(
    () =>
      Array.from(new Set(similar.map((s) => s.region))).sort((a, b) =>
        a.localeCompare(b, "ru"),
      ),
    [similar],
  );

  const rows = useMemo(
    () =>
      similar.filter(
        (s) =>
          (!onlySameKind || s.kind === statistics.kind) &&
          (region === "all" || s.region === region) &&
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
          title="Статистическая справка"
          aside={`выборка: ${statistics.total} ${plural(statistics.total, "приговор", "приговора", "приговоров")} · ${kindNameShort(statistics.kind)}`}
        />
        <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            value={formatAmountShort(statistics.median, statistics.unit)}
            label="медиана по схожим делам"
          />
          <Metric
            value={`${formatAmountShort(statistics.q1, statistics.unit)} — ${formatAmountShort(statistics.q3, statistics.unit)}`}
            label="межквартильный диапазон"
          />
          <Metric
            value={formatAmountShort(assignedAmount, statistics.unit)}
            label="назначено по проверяемому делу"
            tone={deviationTone === "ok" ? "navy" : deviationTone}
          />
          <Metric
            value={formatSigma(statistics.deviationSigma)}
            label="отклонение от медианы"
            tone={deviationTone}
          />
        </div>
        <div className="border-t border-hair px-4 py-3">
          <p className="max-w-prose text-sm leading-relaxed text-ink-2">
            {deviation.text} Назначенный размер соответствует{" "}
            <span className="font-bold text-ink tnum">
              {statistics.percentile}-му процентилю
            </span>{" "}
            выборки: строже назначено в{" "}
            {formatPercent(1 - statistics.percentile / 100)} схожих дел. Условное
            осуждение применено в {formatPercent(statistics.suspendedShare)}{" "}
            приговоров выборки.
          </p>
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Распределение назначенных наказаний"
          aside="демонстрационная выборка"
        />
        <div className="px-4 py-4">
          <PunishmentHistogram statistics={statistics} />
        </div>
      </Panel>

      <Panel>
        <PanelHead
          title="Аналогичные приговоры"
          aside={`показано: ${rows.length} из ${similar.length}`}
        />

        <div className="flex flex-wrap items-end gap-4 border-b border-hair bg-mist px-4 py-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlySameKind}
              onChange={(event) => setOnlySameKind(event.target.checked)}
              className="h-4 w-4 accent-navy"
            />
            только тот же вид наказания
          </label>

          <label className="text-sm">
            <span className="field-label mb-1">Регион</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="input w-56"
            >
              <option value="all">все регионы</option>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="field-label mb-1">
              Близость не ниже: {minSimilarity.toFixed(2)}
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
            <caption className="sr-only">
              Приговоры по схожим делам с указанием суда, даты, вида и размера
              наказания
            </caption>
            <thead>
              <tr>
                <th className="th">Суд</th>
                <th className="th">Регион</th>
                <th className="th">Дата</th>
                <th className="th">Наказание</th>
                <th className="th text-right">Размер</th>
                <th className="th text-right">Смягч.</th>
                <th className="th text-right">Отягч.</th>
                <th className="th text-right">Близость</th>
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
                    <td className="cell">{row.court}</td>
                    <td className="cell text-ink-2">{row.region}</td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {formatDate(row.date)}
                    </td>
                    <td className="cell">
                      {kindNameShort(row.kind)}
                      {row.suspended ? (
                        <span className="ml-1 text-xs text-ink-3">условно</span>
                      ) : null}
                    </td>
                    <td className="cell whitespace-nowrap text-right font-bold tnum">
                      {formatAmountShort(row.amount, row.unit)}
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
                    По заданным условиям приговоров не найдено. Ослабьте фильтры.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
          Выборка синтетическая и приведена для демонстрации механизма
          сопоставления. Подсветкой отмечены приговоры с размером наказания,
          совпадающим с проверяемым решением.
        </p>
      </Panel>
    </div>
  );
}
