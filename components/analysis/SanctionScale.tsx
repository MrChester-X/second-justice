import type { SanctionOption, ScaleLimit, Statistics, Unit } from "@/lib/types";
import { formatAmount, formatAmountShort, kindName } from "@/lib/format";

/**
 * Шкала санкции — основной измерительный инструмент интерфейса.
 *
 * На одной оси совмещены четыре вещи, которые судья иначе сверяет в уме:
 * пределы санкции статьи, пределы, наложенные правилами Общей части
 * (ст. 62, 64, 65, 66, 68 УК РФ), межквартильный размах практики по схожим
 * делам и точка назначенного наказания.
 */

const PAD_X = 52;
const WIDTH = 1000;
const PLOT = WIDTH - PAD_X * 2;

const Y_FLAG = 14;
const Y_LIMIT_LABEL = 30;
const Y_SANCTION = 40;
const H_SANCTION = 30;
const Y_PRACTICE = 80;
const H_PRACTICE = 12;
const Y_AXIS = 112;
const HEIGHT = 158;

function tickStep(unit: Unit, span: number): number {
  const steps =
    unit === "months"
      ? [1, 2, 3, 6, 12, 24, 36, 60]
      : unit === "hours"
        ? [20, 30, 60, 120]
        : [5000, 10000, 25000, 50000, 100000, 250000];
  const target = span / 6;
  return steps.find((s) => s >= target) ?? steps[steps.length - 1];
}

export function SanctionScale({
  option,
  limits,
  assigned,
  statistics,
  sanctionLabel,
}: {
  option: SanctionOption;
  limits: ScaleLimit[];
  assigned: number;
  statistics?: Statistics;
  sanctionLabel: string;
}) {
  const unit = option.unit;
  const lawMin = option.min ?? option.generalMin ?? 0;
  const lawMax = option.max;

  // Самый строгий из пределов Общей части; санкция задаёт потолок по умолчанию.
  const tightest = limits.reduce(
    (acc, limit) => Math.min(acc, limit.value),
    lawMax,
  );

  const domainMax = Math.max(lawMax, assigned) * 1.06;
  const x = (value: number) => PAD_X + (value / domainMax) * PLOT;

  const withinSanction = assigned >= lawMin && assigned <= lawMax;
  const withinLimits = assigned <= tightest;
  const ok = withinSanction && withinLimits;
  // Классы, а не хексы: цвет отметки должен следовать выбранной теме.
  const markStroke = ok ? "stroke-navy" : "stroke-bordo";
  const markFill = ok ? "fill-navy" : "fill-bordo";
  const markSwatch = ok ? "bg-navy" : "bg-bordo";

  const step = tickStep(unit, domainMax);
  const ticks: number[] = [];
  for (let value = 0; value <= domainMax; value += step) ticks.push(value);

  return (
    <figure className="m-0">
      <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="eyebrow">Шкала санкции</span>
        <span className="text-xs text-ink-2">
          {sanctionLabel} · {kindName(option.kind)}
        </span>
      </figcaption>

      <div className="overflow-x-auto border border-rule bg-paper">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="block h-auto w-full min-w-[680px]"
          role="img"
          aria-label={`Назначено ${formatAmount(assigned, unit)} при пределах санкции ${formatAmount(lawMin, unit)} — ${formatAmount(lawMax, unit)}`}
        >
          <defs>
            <pattern
              id="hatch-out"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="7" height="7" className="fill-mist" />
              <line x1="0" y1="0" x2="0" y2="7" className="stroke-rule" strokeWidth="2.5" />
            </pattern>
            <pattern
              id="hatch-limit"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="7" height="7" className="fill-bordo-pale" />
              <line x1="0" y1="0" x2="0" y2="7" className="stroke-bordo/40" strokeWidth="2.5" />
            </pattern>
          </defs>

          {/* Вне санкции: слева от нижнего предела и справа от верхнего */}
          <rect
            x={PAD_X}
            y={Y_SANCTION}
            width={Math.max(0, x(lawMin) - PAD_X)}
            height={H_SANCTION}
            fill="url(#hatch-out)"
          />
          <rect
            x={x(lawMax)}
            y={Y_SANCTION}
            width={Math.max(0, PAD_X + PLOT - x(lawMax))}
            height={H_SANCTION}
            fill="url(#hatch-out)"
          />

          {/* Допустимый диапазон санкции */}
          <rect
            x={x(lawMin)}
            y={Y_SANCTION}
            width={x(lawMax) - x(lawMin)}
            height={H_SANCTION}
            className="fill-navy-pale"
          />

          {/* Зона, закрытая правилами Общей части */}
          {tightest < lawMax ? (
            <rect
              x={x(tightest)}
              y={Y_SANCTION}
              width={x(lawMax) - x(tightest)}
              height={H_SANCTION}
              fill="url(#hatch-limit)"
            />
          ) : null}

          <rect
            x={PAD_X}
            y={Y_SANCTION}
            width={PLOT}
            height={H_SANCTION}
            fill="none"
            className="stroke-rule"
          />

          {/* Границы санкции */}
          {[lawMin, lawMax].map((bound) => (
            <g key={`bound-${bound}`}>
              <line
                x1={x(bound)}
                y1={Y_SANCTION - 6}
                x2={x(bound)}
                y2={Y_SANCTION + H_SANCTION + 6}
                className="stroke-navy"
                strokeWidth="1.5"
              />
              <text
                x={x(bound)}
                y={Y_SANCTION + H_SANCTION + 19}
                textAnchor="middle"
                className="fill-navy font-sans"
                fontSize="11"
                fontWeight="700"
              >
                {formatAmountShort(bound, unit)}
              </text>
            </g>
          ))}

          {/* Пределы правил Общей части */}
          {limits.map((limit) => (
            <g key={limit.norm}>
              <line
                x1={x(limit.value)}
                y1={Y_SANCTION - 6}
                x2={x(limit.value)}
                y2={Y_SANCTION + H_SANCTION + 6}
                className="stroke-bordo"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <text
                x={x(limit.value)}
                y={Y_LIMIT_LABEL}
                textAnchor="middle"
                className="fill-bordo font-sans"
                fontSize="11"
              >
                {limit.norm} — {formatAmountShort(limit.value, unit)}
              </text>
            </g>
          ))}

          {/* Межквартильный размах практики */}
          {statistics && statistics.total > 0 ? (
            <g>
              <rect
                x={x(statistics.q1)}
                y={Y_PRACTICE}
                width={Math.max(2, x(statistics.q3) - x(statistics.q1))}
                height={H_PRACTICE}
                className="fill-navy-mid stroke-navy-mid"
                fillOpacity="0.28"
              />
              <line
                x1={x(statistics.median)}
                y1={Y_PRACTICE - 4}
                x2={x(statistics.median)}
                y2={Y_PRACTICE + H_PRACTICE + 4}
                className="stroke-navy"
                strokeWidth="2"
              />
              <text
                x={x(statistics.median)}
                y={Y_PRACTICE + H_PRACTICE + 18}
                textAnchor="middle"
                className="fill-ink-2 font-sans"
                fontSize="11"
              >
                медиана практики {formatAmountShort(statistics.median, unit)}
              </text>
            </g>
          ) : null}

          {/* Назначенное наказание */}
          <g>
            <line
              x1={x(assigned)}
              y1={Y_FLAG + 5}
              x2={x(assigned)}
              y2={Y_PRACTICE + H_PRACTICE + 2}
              className={markStroke}
              strokeWidth="2.5"
            />
            <polygon
              points={`${x(assigned)},${Y_SANCTION - 1} ${x(assigned) - 6},${Y_SANCTION - 10} ${x(assigned) + 6},${Y_SANCTION - 10}`}
              className={markFill}
            />
            <text
              x={x(assigned)}
              y={Y_FLAG}
              textAnchor={
                x(assigned) > WIDTH - 180
                  ? "end"
                  : x(assigned) < 180
                    ? "start"
                    : "middle"
              }
              className={`font-sans ${markFill}`}
              fontSize="12.5"
              fontWeight="700"
            >
              назначено: {formatAmountShort(assigned, unit)}
            </text>
          </g>

          {/* Ось */}
          <line
            x1={PAD_X}
            y1={Y_AXIS}
            x2={PAD_X + PLOT}
            y2={Y_AXIS}
            className="stroke-rule"
          />
          {ticks.map((tick) => (
            <g key={`tick-${tick}`}>
              <line
                x1={x(tick)}
                y1={Y_AXIS}
                x2={x(tick)}
                y2={Y_AXIS + 4}
                className="stroke-rule"
              />
              <text
                x={x(tick)}
                y={Y_AXIS + 17}
                textAnchor="middle"
                className="fill-ink-3 font-sans"
                fontSize="10.5"
              >
                {tick === 0 ? "0" : formatAmountShort(tick, unit)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-2">
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-5 border border-rule bg-navy-pale" />
          пределы санкции
        </li>
        {limits.length > 0 ? (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 border border-bordo/40 bg-bordo-pale" />
            закрыто правилами Общей части
          </li>
        ) : null}
        {statistics && statistics.total > 0 ? (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 border border-navy-mid bg-navy-mid/30" />
            практика: от первого до третьего квартиля
          </li>
        ) : null}
        <li className="flex items-center gap-1.5">
          <span className={`inline-block h-3 w-0.5 ${markSwatch}`} />
          назначенное наказание
        </li>
      </ul>
    </figure>
  );
}
