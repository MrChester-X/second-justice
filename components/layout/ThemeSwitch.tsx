"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { THEMES, useTheme } from "@/lib/theme/store";
import { useChromeLabels } from "@/lib/theme/labels";

/**
 * Переключатель оформления. Живёт в шапке, помнит выбор в localStorage.
 *
 * Цвета применяются до первой отрисовки inline-скриптом в app/layout.tsx,
 * поэтому здесь остаётся только подтянуть уже выставленное значение в
 * состояние React.
 */
export function ThemeSwitch({ tone = "brand" }: { tone?: "brand" | "surface" }) {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);
  const syncFromDocument = useTheme((state) => state.syncFromDocument);
  const labels = useChromeLabels();

  useEffect(() => {
    syncFromDocument();
  }, [syncFromDocument]);

  const onBrand = tone === "brand";

  return (
    <div
      role="group"
      aria-label={labels.themeGroup}
      className={clsx(
        "no-print inline-flex shrink-0 border",
        onBrand ? "border-onbrand/25" : "border-rule",
      )}
    >
      {THEMES.map((item) => {
        const active = theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            title={item.title}
            aria-pressed={active}
            onClick={() => setTheme(item.id)}
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
