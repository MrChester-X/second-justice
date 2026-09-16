"use client";

import { useI18n } from "@/lib/i18n";

/**
 * Оговорка о вспомогательном характере системы. Требование п. 3 технического
 * задания: прототип не наделяется функциями принятия судебного решения.
 * Показывается на каждом экране и попадает в печатное заключение.
 */
export function Disclaimer({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  if (compact) {
    return (
      <p className="border-t border-rule pt-3 text-xs leading-relaxed text-ink-3">
        {t.disclaimer.compact}
      </p>
    );
  }

  return (
    <footer className="border-t-2 border-rule bg-paper">
      <div className="mx-auto max-w-shell px-4 py-5">
        <p className="max-w-prose text-xs leading-relaxed text-ink-2">
          <strong className="font-bold text-ink">{t.disclaimer.strong}</strong>{" "}
          {t.disclaimer.rest}
        </p>
        <p className="mt-3 text-2xs uppercase tracking-eyebrow text-ink-3">
          {t.disclaimer.footnote}
        </p>
      </div>
    </footer>
  );
}
