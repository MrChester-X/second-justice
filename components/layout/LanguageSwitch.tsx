"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { LOCALES } from "@/lib/i18n/constants";
import { useLocale } from "@/lib/i18n/store";
import { useI18n } from "@/lib/i18n";

/**
 * Переключатель языка. Живёт в шапке, помнит выбор в localStorage.
 *
 * Статическая сборка отдаёт русскую разметку всем, поэтому выбранный
 * английский применяется сразу после гидратации: inline-скрипт в
 * app/layout.tsx успевает выставить только атрибут lang.
 */
export function LanguageSwitch({
  tone = "brand",
}: {
  tone?: "brand" | "surface";
}) {
  const { t } = useI18n();
  const locale = useLocale((state) => state.locale);
  const setLocale = useLocale((state) => state.setLocale);
  const syncFromDocument = useLocale((state) => state.syncFromDocument);

  useEffect(() => {
    syncFromDocument();
  }, [syncFromDocument]);

  const onBrand = tone === "brand";

  return (
    <div
      role="group"
      aria-label={t.common.languageGroup}
      className={clsx(
        "no-print inline-flex shrink-0 border",
        onBrand ? "border-onbrand/25" : "border-rule",
      )}
    >
      {LOCALES.map((item) => {
        const active = locale === item.id;
        return (
          <button
            key={item.id}
            type="button"
            title={item.title}
            lang={item.id}
            aria-pressed={active}
            onClick={() => setLocale(item.id)}
            className={clsx(
              "px-2.5 py-1 text-2xs font-bold uppercase tracking-eyebrow transition-colors",
              active
                ? onBrand
                  ? "bg-onbrand/15 text-onbrand"
                  : "bg-navy text-paper"
                : onBrand
                ? "text-onbrand/60 hover:text-onbrand"
                : "text-ink-3 hover:text-navy",
            )}
          >
            {item.short}
          </button>
        );
      })}
    </div>
  );
}
