"use client";

import { useMemo, useState } from "react";
import {
  ARTICLES_IN_BASE,
  REGIONS_IN_BASE,
  SENTENCES,
  YEARS_IN_BASE,
} from "@/lib/data/sentences";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/lib/i18n";
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
  const { t, tr, f } = useI18n();
  /* Значения фильтров — русские строки: они служат ключами и не зависят
     от выбранного языка, поэтому выбор переживает переключение. */
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
          (article === "all" || s.article.ru === article) &&
          (region === "all" || s.region.ru === region) &&
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
        eyebrow={t.database.eyebrow}
        title={t.database.title}
        lead={t.database.lead}
        crumbs={[
          { href: "/dashboard", label: t.nav.dashboard },
          { label: t.nav.database },
        ]}
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        <Panel>
          <PanelHead
            title={t.database.filtersTitle}
            aside={
              <button
                type="button"
                onClick={resetFilters}
                className="text-navy underline"
              >
                {t.database.reset}
              </button>
            }
          />
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-5">
            <Select
              label={t.database.filterArticle}
              value={article}
              onChange={setArticle}
              options={[
                { value: "all", label: t.database.allArticles },
                ...ARTICLES_IN_BASE.map((a) => ({
                  value: a.ru,
                  label: tr(a),
                })),
              ]}
            />
            <Select
              label={t.database.filterRegion}
              value={region}
              onChange={setRegion}
              options={[
                { value: "all", label: t.database.allRegions },
                ...REGIONS_IN_BASE.map((r) => ({
                  value: r.ru,
                  label: tr(r),
                })),
              ]}
            />
            <Select
              label={t.database.filterYear}
              value={year}
              onChange={setYear}
              options={[
                { value: "all", label: t.database.allYears },
                ...YEARS_IN_BASE.map((y) => ({
                  value: String(y),
                  label: String(y),
                })),
              ]}
            />
            <Select
              label={t.database.filterKind}
              value={kind}
              onChange={setKind}
              options={[
                { value: "all", label: t.database.anyKind },
                ...KINDS.map((k) => ({ value: k, label: f.kindShort(k) })),
              ]}
            />
            <Select
              label={t.database.filterSuspended}
              value={suspended}
              onChange={setSuspended}
              options={[
                { value: "all", label: t.database.suspendedAny },
                { value: "yes", label: t.database.suspendedOnly },
                { value: "no", label: t.database.realOnly },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title={t.database.tableTitle}
            aside={t.database.found(rows.length)}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="th">{t.database.colId}</th>
                  <th className="th">{t.database.colCourt}</th>
                  <th className="th">{t.database.colRegion}</th>
                  <th className="th">{t.database.colDate}</th>
                  <th className="th">{t.database.colArticle}</th>
                  <th className="th">{t.database.colPunishment}</th>
                  <th className="th text-right">{t.database.colAmount}</th>
                  <th className="th text-right">{t.database.colMitigating}</th>
                  <th className="th text-right">{t.database.colAggravating}</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, limit).map((row) => (
                  <tr key={row.id} className="hover:bg-mist">
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {row.id}
                    </td>
                    <td className="cell">{tr(row.court)}</td>
                    <td className="cell text-ink-2">{tr(row.region)}</td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {f.date(row.date)}
                    </td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {tr(row.article)}
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
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td className="cell text-center text-ink-3" colSpan={9}>
                      {t.database.empty}
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
                {t.database.showMore(Math.min(PAGE_SIZE, rows.length - limit))}
              </button>
            </div>
          ) : null}

          <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
            {t.database.syntheticNote}
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
