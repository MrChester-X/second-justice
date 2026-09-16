"use client";

import Link from "next/link";
import { useCaseById, useSession } from "@/lib/store/session";
import { PageHeader } from "@/components/layout/PageHeader";
import { Workspace } from "@/components/analysis/Workspace";
import { useI18n } from "@/lib/i18n";

/**
 * Рабочая область анализа. Дело берётся из реестра сеанса, поэтому экран
 * одинаков и для заранее собранных страниц демонстрационных дел, и для
 * дела, загруженного пользователем в браузере.
 */
export function AnalysisScreen({ id }: { id: string }) {
  const { t, tr } = useI18n();
  const caseFile = useCaseById(id);
  const hydrated = useSession((s) => s.hydrated);

  if (!caseFile) {
    return (
      <>
        <PageHeader
          eyebrow={t.workspace.eyebrow}
          title={
            hydrated ? t.workspace.notFoundTitle : t.workspace.loadingTitle
          }
          lead={hydrated ? t.workspace.notFoundLead : t.workspace.loadingLead}
          crumbs={[
            { href: "/dashboard", label: t.nav.dashboard },
            { label: t.workspace.crumbAnalysis },
          ]}
        />
        {hydrated ? (
          <div className="mx-auto max-w-shell px-4 py-8">
            <Link href="/analysis/new" className="btn btn-primary">
              {t.workspace.uploadDraft}
            </Link>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t.workspace.eyebrow}
        title={t.workspace.caseTitle(tr(caseFile.number))}
        lead={`${tr(caseFile.articleShort)} · ${tr(caseFile.defendantShort)}`}
        crumbs={[
          { href: "/dashboard", label: t.nav.dashboard },
          { href: "/analysis/new", label: t.workspace.crumbChecks },
          { label: t.workspace.caseTitle(tr(caseFile.number)) },
        ]}
        actions={
          <Link href="/analysis/new" className="btn btn-ghost">
            {t.nav.newCheck}
          </Link>
        }
      />
      <Workspace caseFile={caseFile} />
    </>
  );
}
