"use client";

import Link from "next/link";
import clsx from "clsx";
import { useAllCases, useSession } from "@/lib/store/session";
import { caseHref } from "@/lib/routes";
import { STATUS_NAMES } from "@/lib/api/analysis";
import { formatDateTime, plural } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
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
  const cases = useAllCases();
  const reportedIds = useSession((s) => s.reportedIds);
  const hydrated = useSession((s) => s.hydrated);

  const reported = cases.filter((item) => reportedIds.includes(item.id));

  return (
    <>
      <PageHeader
        eyebrow="Личный кабинет"
        title="Архив заключений"
        lead="Заключения, сформированные по проверенным проектам судебных актов. Заключение появляется в архиве после открытия соответствующей вкладки в рабочей области анализа."
        crumbs={[
          { href: "/dashboard", label: "Личный кабинет" },
          { label: "Заключения" },
        ]}
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        {reported.length === 0 ? (
          <EmptyState
            title={
              hydrated
                ? "Заключений пока нет"
                : "Восстановление сохранённого архива"
            }
            hint={
              hydrated
                ? "Откройте дело в рабочей области анализа и перейдите на вкладку «Заключение»."
                : undefined
            }
          />
        ) : (
          <Panel>
            <PanelHead
              title="Сформированные заключения"
              aside={`${reported.length} ${plural(reported.length, "документ", "документа", "документов")}`}
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="th">Дело</th>
                    <th className="th">Подсудимый</th>
                    <th className="th">Квалификация</th>
                    <th className="th text-right">Нарушений</th>
                    <th className="th text-right">Замечаний</th>
                    <th className="th">Результат</th>
                    <th className="th">Сформировано по документу от</th>
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
                            {item.number}
                          </Link>
                        </td>
                        <td className="cell">{item.defendantShort}</td>
                        <td className="cell whitespace-nowrap font-mono text-xs">
                          {item.articleShort}
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
                          {STATUS_NAMES[item.status]}
                        </td>
                        <td className="cell whitespace-nowrap text-ink-2">
                          {formatDateTime(item.uploadedAt)}
                        </td>
                        <td className="cell whitespace-nowrap">
                          <Link href={caseHref(item.id)}>
                            Открыть и напечатать
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
              Экспорт выполняется печатью средствами браузера: откройте
              заключение и выберите «Сохранить как PDF». Отдельного файлового
              хранилища в прототипе нет.
            </p>
          </Panel>
        )}
      </div>
    </>
  );
}
