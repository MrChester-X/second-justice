"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export interface Crumb {
  href?: string;
  label: string;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
}) {
  const { t } = useI18n();

  return (
    <div className="no-print border-b border-rule bg-paper">
      <div className="mx-auto max-w-shell px-4 py-6">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label={t.common.breadcrumbs} className="no-print mb-3">
            <ol className="flex flex-wrap items-center gap-x-2 text-xs text-ink-3">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-prose">
            {eyebrow ? <p className="eyebrow mb-1.5">{eyebrow}</p> : null}
            <h1 className="font-serif text-[1.75rem] leading-tight">{title}</h1>
            {lead ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{lead}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="no-print flex flex-wrap gap-2">{actions}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
