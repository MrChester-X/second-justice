"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Statistics } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

/**
 * Распределение назначенных наказаний по схожим делам.
 *
 * Ряд один, поэтому легенда не нужна: заголовок называет ряд. Корзина, в
 * которую попало проверяемое решение, выделена цветом и подписана — цвет не
 * единственный носитель смысла. Те же данные доступны таблицей ниже.
 *
 * Recharts задаёт цвета атрибутами SVG, в которых CSS-переменные не
 * раскрываются, поэтому палитра графика продублирована здесь значениями из
 * app/globals.css.
 */
const CHART = {
  bar: "#5C7DA6",
  barAssigned: "#8B2331",
  tick: "#727A83",
  axis: "#D8DCE3",
  cursor: "#F3F5F8",
} as const;

interface Row {
  label: string;
  from: number;
  to: number;
  count: number;
  assigned: boolean;
}

function ChartTooltip({
  active,
  payload,
  unit,
}: {
  active?: boolean;
  payload?: Array<{ payload: Row }>;
  unit: Statistics["unit"];
}) {
  const { t, f } = useI18n();
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="border border-rule bg-paper px-3 py-2 text-xs shadow-none">
      <div className="font-bold text-navy">
        {f.amountShort(row.from, unit)} — {f.amountShort(row.to, unit)}
      </div>
      <div className="mt-1 text-ink-2 tnum">
        {t.similar.sampleCount(row.count)}
      </div>
      {row.assigned ? (
        <div className="mt-1 font-bold text-bordo">
          {t.histogram.containsAssigned}
        </div>
      ) : null}
    </div>
  );
}

export function PunishmentHistogram({
  statistics,
}: {
  statistics: Statistics;
}) {
  const { t, tr, f } = useI18n();
  const data: Row[] = statistics.histogram.map((bin) => ({
    ...bin,
    label: tr(bin.label),
  }));
  if (data.length === 0) return null;

  const assignedRow = data.find((row) => row.assigned);

  return (
    <div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 8, bottom: 4, left: 0 }}
            barCategoryGap={2}
          >
            <XAxis
              dataKey="label"
              tick={{ fill: CHART.tick, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: CHART.axis }}
              interval={0}
            />
            <YAxis
              tick={{ fill: CHART.tick, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={32}
            />
            <Tooltip
              cursor={{ fill: CHART.cursor }}
              content={<ChartTooltip unit={statistics.unit} />}
            />
            <Bar dataKey="count" isAnimationActive={false}>
              {data.map((row) => (
                <Cell
                  key={`${row.from}`}
                  fill={row.assigned ? CHART.barAssigned : CHART.bar}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-xs text-ink-3">
        {t.histogram.axes(t.histogram.units[statistics.unit])}{" "}
        {assignedRow ? (
          <>
            {t.histogram.highlightedBefore}{" "}
            <span className="font-bold text-bordo">
              {f.amountShort(assignedRow.from, statistics.unit)} —{" "}
              {f.amountShort(assignedRow.to, statistics.unit)}
            </span>
            {t.histogram.highlightedAfter}
          </>
        ) : null}
      </p>
    </div>
  );
}
