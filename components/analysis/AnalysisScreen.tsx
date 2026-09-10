"use client";

import Link from "next/link";
import { useCaseById, useSession } from "@/lib/store/session";
import { PageHeader } from "@/components/layout/PageHeader";
import { Workspace } from "@/components/analysis/Workspace";
import { useChromeLabels } from "@/lib/theme/labels";

/**
 * Рабочая область анализа. Дело берётся из реестра сеанса, поэтому экран
 * одинаков и для заранее собранных страниц демонстрационных дел, и для
 * дела, загруженного пользователем в браузере.
 */
export function AnalysisScreen({ id }: { id: string }) {
  const labels = useChromeLabels();
  const caseFile = useCaseById(id);
  const hydrated = useSession((s) => s.hydrated);

  if (!caseFile) {
    return (
      <>
        <PageHeader
          eyebrow="Рабочая область анализа"
          title={hydrated ? "Дело не найдено" : "Загрузка дела"}
          lead={
            hydrated
              ? "Дело отсутствует в реестре текущего сеанса. Возможно, оно было загружено в другом сеансе или список был очищен."
              : "Восстановление сохранённого списка дел."
          }
          crumbs={[
            { href: "/dashboard", label: "Личный кабинет" },
            { label: "Анализ" },
          ]}
        />
        {hydrated ? (
          <div className="mx-auto max-w-shell px-4 py-8">
            <Link href="/analysis/new" className="btn btn-primary">
              Загрузить проект судебного акта
            </Link>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Рабочая область анализа"
        title={`Дело № ${caseFile.number}`}
        lead={`${caseFile.articleShort} · ${caseFile.defendantShort}`}
        crumbs={[
          { href: "/dashboard", label: "Личный кабинет" },
          { href: "/analysis/new", label: "Проверки" },
          { label: `Дело № ${caseFile.number}` },
        ]}
        actions={
          <Link href="/analysis/new" className="btn btn-ghost">
            {labels.newCheck}
          </Link>
        }
      />
      <Workspace caseFile={caseFile} />
    </>
  );
}
