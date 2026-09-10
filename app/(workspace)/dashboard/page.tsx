"use client";

import Link from "next/link";
import clsx from "clsx";
import { JUDGE } from "@/lib/data/judge";
import { STATUS_NAMES } from "@/lib/api/analysis";
import { useAllCases, useSession } from "@/lib/store/session";
import { caseHref } from "@/lib/routes";
import {
  formatDate,
  formatDateTime,
  formatFileSize,
  plural,
} from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { useChromeLabels } from "@/lib/theme/labels";
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
  const labels = useChromeLabels();
  const cases = useAllCases();
  const reportedIds = useSession((s) => s.reportedIds);
  const hydrated = useSession((s) => s.hydrated);

  const violations = cases.filter((c) => c.status === "violations").length;
  const warnings = cases.filter((c) => c.status === "warnings").length;
  const clean = cases.filter((c) => c.status === "ok").length;

  return (
    <>
      <PageHeader
        eyebrow="Личный кабинет"
        title={JUDGE.fio}
        lead={`${JUDGE.position}, ${JUDGE.court}. ${JUDGE.chamber}.`}
        actions={
          <Link href="/analysis/new" className="btn btn-primary">
            {labels.startCheck}
          </Link>
        }
      />

      <div className="mx-auto max-w-shell space-y-5 px-4 py-6">
        <Panel>
          <PanelHead
            title="Показатели проверок"
            aside={`всего дел в реестре: ${cases.length}`}
          />
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric value={cases.length} label="проектов проверено" />
            <Metric
              value={violations}
              label={plural(violations, "дело с нарушением", "дела с нарушениями", "дел с нарушениями")}
              tone="bordo"
            />
            <Metric
              value={warnings}
              label={plural(warnings, "дело с замечанием", "дела с замечаниями", "дел с замечаниями")}
              tone="warn"
            />
            <Metric value={clean} label="без замечаний" tone="ok" />
          </div>
          <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
            Показатели считаются по реестру текущего сеанса. Проверка носит
            справочный характер и не влияет на движение дела.
          </p>
        </Panel>

        <Panel>
          <PanelHead
            title="Реестр проектов судебных актов"
            aside={
              hydrated ? undefined : "восстановление сохранённого списка…"
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="th">Дело</th>
                  <th className="th">Подсудимый</th>
                  <th className="th">Квалификация</th>
                  <th className="th">Документ</th>
                  <th className="th">Загружен</th>
                  <th className="th">Результат проверки</th>
                  <th className="th">Заключение</th>
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
                        {item.number}
                      </Link>
                      {!item.demo ? (
                        <span className="ml-2 border border-rule px-1 py-0.5 text-2xs uppercase tracking-eyebrow text-ink-3">
                          загружено
                        </span>
                      ) : null}
                    </td>
                    <td className="cell">{item.defendantShort}</td>
                    <td className="cell whitespace-nowrap font-mono text-xs">
                      {item.articleShort}
                    </td>
                    <td className="cell">
                      <span className="block max-w-[18rem] truncate" title={item.fileName}>
                        {item.fileName}
                      </span>
                      <span className="text-xs text-ink-3">
                        {formatFileSize(item.fileSize)} · {item.pages} с.
                      </span>
                    </td>
                    <td className="cell whitespace-nowrap text-ink-2">
                      {formatDateTime(item.uploadedAt)}
                    </td>
                    <td
                      className={clsx(
                        "cell whitespace-nowrap font-bold",
                        STATUS_TONE[item.status],
                      )}
                    >
                      {STATUS_NAMES[item.status]}
                    </td>
                    <td className="cell whitespace-nowrap">
                      {reportedIds.includes(item.id) ? (
                        <Link href={caseHref(item.id)}>сформировано</Link>
                      ) : (
                        <span className="text-ink-3">не формировалось</span>
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
            <PanelHead title="Профиль" />
            <dl className="px-4 py-3 text-sm">
              <Row label="Фамилия, имя, отчество" value={JUDGE.fio} />
              <Row label="Должность" value={JUDGE.position} />
              <Row label="Суд" value={JUDGE.court} />
              <Row label="Субъект Российской Федерации" value={JUDGE.region} />
              <Row label="Коллегия" value={JUDGE.chamber} />
              <Row
                label="Дата назначения"
                value={formatDate(JUDGE.appointedAt)}
              />
              <Row label="Стаж" value={`${JUDGE.experienceYears} лет`} />
            </dl>
            <div className="border-t border-hair px-4 py-2.5">
              <Link href="/profile" className="text-sm">
                Настройки профиля
              </Link>
            </div>
          </Panel>

          <Panel>
            <PanelHead title="Порядок работы" />
            <ol className="space-y-3 px-4 py-4 text-sm">
              <Step
                number={1}
                title="Загрузите проект судебного акта"
                text="Поддерживаются форматы .docx и .pdf. Можно выбрать один из демонстрационных материалов."
              />
              <Step
                number={2}
                title="Проверьте извлечённые параметры"
                text="Квалификация, сведения о личности, обстоятельства и назначенное наказание. Любое поле можно исправить вручную."
              />
              <Step
                number={3}
                title="Изучите результат проверки"
                text="Пределы санкции, правила Общей части, основания раздела IV УК РФ и практика Верховного Суда РФ."
              />
              <Step
                number={4}
                title="Сформируйте заключение"
                text="Готовый документ с аннотацией, выводами и статистической справкой. Печать средствами браузера."
              />
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
