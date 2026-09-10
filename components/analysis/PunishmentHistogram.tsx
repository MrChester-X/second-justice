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
import { useTheme } from "@/lib/theme/store";
import { formatAmountShort, plural } from "@/lib/format";

/**
 * Распределение назначенных наказаний по схожим делам.
 *
 * Ряд один, поэтому легенда не нужна: заголовок называет ряд. Корзина, в
 * которую попало проверяемое решение, выделена цветом и подписана — цвет не
 * единственный носитель смысла. Те же данные доступны таблицей ниже.
 */

/*
 * Recharts задаёт цвета атрибутами SVG, в которых CSS-переменные не
 * раскрываются, поэтому палитра графика выбирается по теме здесь.
 *
 * Ряд один, поэтому легенда не нужна; выделенная корзина — статус, а не
 * второй ряд. Для тёмной темы цвета подобраны отдельно, а не осветлением
 * светлых: разделение выделенной корзины и остальных проверено — ΔE 23,4 при
 * обычном зрении и 17,0 при дейтераномалии, контраст к поверхности выше 3:1.
 */
const CHART = {
  classic: {
    bar: "#5C7DA6",
    barAssigned: "#8B2331",
    tick: "#727A83",
    axis: "#D8DCE3",
    cursor: "#F3F5F8",
  },
  arena: {
    bar: "#6E9BC4",
    barAssigned: "#E2604F",
    tick: "#8A93A3",
    axis: "#39404E",
    cursor: "#232A35",
  },
} as const;

/** Единица измерения оси: подписи корзин числовые, поэтому её нужно назвать. */
const UNIT_AXIS: Record<Statistics["unit"], string> = {
  months: "месяцев",
  hours: "часов",
  rub: "тыс. рублей",
};

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
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="border border-rule bg-paper px-3 py-2 text-xs shadow-none">
      <div className="font-bold text-navy">
        {formatAmountShort(row.from, unit)} — {formatAmountShort(row.to, unit)}
      </div>
      <div className="mt-1 text-ink-2 tnum">
        {row.count} {plural(row.count, "приговор", "приговора", "приговоров")}
      </div>
      {row.assigned ? (
        <div className="mt-1 font-bold text-bordo">
          сюда попадает проверяемое решение
        </div>
      ) : null}
    </div>
  );
}

export function PunishmentHistogram({ statistics }: { statistics: Statistics }) {
  const palette = CHART[useTheme((state) => state.theme)];
  const data: Row[] = statistics.histogram;
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
              tick={{ fill: palette.tick, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: palette.axis }}
              interval={0}
            />
            <YAxis
              tick={{ fill: palette.tick, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={32}
            />
            <Tooltip
              cursor={{ fill: palette.cursor }}
              content={<ChartTooltip unit={statistics.unit} />}
            />
            <Bar dataKey="count" isAnimationActive={false}>
              {data.map((row) => (
                <Cell
                  key={`${row.from}`}
                  fill={row.assigned ? palette.barAssigned : palette.bar}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-xs text-ink-3">
        По горизонтали — размер назначенного наказания ({UNIT_AXIS[statistics.unit]}), по
        вертикали — число приговоров в выборке.{" "}
        {assignedRow ? (
          <>
            {/* Цвет выделения зависит от темы, поэтому назван нейтрально. */}
            Выделена корзина{" "}
            <span className="font-bold text-bordo">
              {formatAmountShort(assignedRow.from, statistics.unit)} —{" "}
              {formatAmountShort(assignedRow.to, statistics.unit)}
            </span>
            , в которую попадает проверяемое решение.
          </>
        ) : null}
      </p>
    </div>
  );
}
