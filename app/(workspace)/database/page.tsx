"use client";

import { useMemo, useState } from "react";
import {
  ARTICLES_IN_BASE,
  REGIONS_IN_BASE,
  SENTENCES,
  YEARS_IN_BASE,
} from "@/lib/data/sentences";
import {
  formatAmountShort,
  formatDate,
  kindNameShort,
  plural,
} from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel, PanelHead } from "@/components/ui/primitives";
import type { PunishmentKind } from "@/lib/types";

const KINDS: PunishmentKind[] = [
  "imprisonment",
  "forced_labor",
  "corrective_works",
  "mandatory_works",
  "restriction_freedom",
  "fine",
  "arrest",
];

const PAGE_SIZE = 25;

export default function DatabasePage() {
  const [article, setArticle] = useState("all");
  const [region, setRegion] = useState("all");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");
  const [suspended, setSuspended] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const rows = useMemo(
    () =>
      SENTENCES.filter(
        (s) =>
          (article === "all" || s.article === article) &&
          (region === "all" || s.region === region) &&
          (year === "all" || s.date.startsWith(year)) &&
          (kind === "all" || s.kind === kind) &&
          (suspended === "all" ||
            (suspended === "yes" ? s.suspended : !s.suspended)),
      ).sort((a, b) => b.date.localeCompare(a.date)),
    [article, region, year, kind, suspended],
  );

  function resetFilters() {
    setArticle("all");
    setRegion("all");
    setYear("all");
    setKind("all");
    setSuspended("all");
    setLimit(PAGE_SIZE);
  }

  return (
    <>
      <PageHeader
        eyebrow="Справочные ресурсы"
        title="База судебных решений"
        lead="Выборка приговоров, по которой система сопоставляет проверяемое решение с практикой. Фильтры повторяют ключевые параметры сопоставления: статья, регион, год, вид наказания."
        crumbs={[
          { href: "/dashboard", label: "Личный кабинет" },
          { label: "База решений" },
        ]}
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        <Panel>
          <PanelHead
            title="Условия отбора"
            aside={
              <button
                type="button"
                onClick={resetFilters}
                className="text-navy underline"
              >
                Сбросить
              </button>
            }
          />
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-5">
            <Select
              label="Статья УК РФ"
              value={article}
              onChange={setArticle}
              options={[
                { value: "all", label: "все статьи" },
                ...ARTICLES_IN_BASE.map((a) => ({ value: a, label: a })),
              ]}
            />
            <Select
              label="Регион"
              value={region}
              onChange={setRegion}
              options={[
                { value: "all", label: "все регионы" },
                ...REGIONS_IN_BASE.map((r) => ({ value: r, label: r })),
              ]}
            />
            <Select
              label="Год"
              value={year}
              onChange={setYear}
              options={[
                { value: "all", label: "все годы" },
                ...YEARS_IN_BASE.map((y) => ({
                  value: String(y),
                  label: String(y),
                })),
              ]}
            />
            <Select
              label="Вид наказания"
              value={kind}
              onChange={setKind}
              options={[
                { value: "all", label: "любой" },
                ...KINDS.map((k) => ({ value: k, label: kindNameShort(k) })),
              ]}
            />
            <Select
              label="Условное осуждение"
              value={suspended}
              onChange={setSuspended}
              options={[
                { value: "all", label: "не важно" },
                { value: "yes", label: "только условное" },
                { value: "no", label: "только реальное" },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Судебные решения"
            aside={`найдено ${rows.length} ${plural(rows.length, "приговор", "приговора", "приговоров")}`}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="th">Номер</th>
                  <th className="th">Суд</th>
                  <th className="th">Регион</th>
                  <th className="th">Дата</th>
                  <th className="th">Статья</th>
                  <th className="th">Наказание</th>
                  <th className="th text-right">Размер</th>
                  <th className="th text-right">Смягч.</th>
                  <th className="th text-right">Отягч.</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, limit).map((row) => (
                  <tr key={row.id} className="hover:bg-mist">
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {row.id}
                    </td>
                    <td className="cell">{row.court}</td>
                    <td className="cell text-ink-2">{row.region}</td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {formatDate(row.date)}
                    </td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {row.article}
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
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td className="cell text-center text-ink-3" colSpan={9}>
                      По заданным условиям решений не найдено.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {limit < rows.length ? (
            <div className="border-t border-hair px-4 py-3 text-center">
              <button
                type="button"
                onClick={() => setLimit((value) => value + PAGE_SIZE)}
                className="btn btn-ghost"
              >
                Показать ещё {Math.min(PAGE_SIZE, rows.length - limit)}
              </button>
            </div>
          ) : null}

          <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
            Выборка синтетическая: суды, даты и размеры наказаний сгенерированы
            для демонстрации механизма сопоставления. Реальные судебные акты не
            использованы.
          </p>
        </Panel>
      </div>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="field-label mb-1">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
