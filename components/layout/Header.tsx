"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Emblem } from "./Emblem";
import { LanguageSwitch } from "./LanguageSwitch";
import { JUDGE } from "@/lib/data/judge";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const pathname = usePathname();
  const { t, tr } = useI18n();

  const nav = [
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/analysis/new", label: t.nav.newCheck },
    { href: "/database", label: t.nav.database },
    { href: "/practice", label: t.nav.practice },
    { href: "/reports", label: t.nav.reports },
  ];

  return (
    <header className="no-print border-b-2 border-bordo bg-brand text-onbrand">
      <div className="mx-auto flex max-w-shell flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-onbrand no-underline"
        >
          <Emblem
            className="h-10 w-10 shrink-0 text-onbrand/85"
            label={t.common.emblem}
          />
          <span>
            <span className="block font-serif text-lg font-bold leading-tight">
              {t.common.brand}
            </span>
            <span className="block text-2xs uppercase tracking-eyebrow text-onbrand/70">
              {t.common.brandSubtitle}
            </span>
          </span>
        </Link>

        <div className="ml-auto text-right text-xs leading-tight text-onbrand/80">
          <div className="font-bold text-onbrand">{tr(JUDGE.shortFio)}</div>
          <div>{tr(JUDGE.court)}</div>
        </div>

        <LanguageSwitch />

        <Link
          href="/"
          className="border border-onbrand/30 px-2.5 py-1 text-xs text-onbrand/90 no-underline hover:bg-onbrand/10"
        >
          {t.nav.logout}
        </Link>
      </div>

      <nav
        aria-label={t.nav.mainNavigation}
        className="border-t border-onbrand/15 bg-brand-deep"
      >
        <ul className="mx-auto flex max-w-shell flex-wrap px-4">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href)) ||
              (item.href === "/analysis/new" &&
                pathname.startsWith("/analysis"));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "-mb-px inline-block border-b-2 px-3 py-2.5 text-sm no-underline transition-colors",
                    active
                      ? "border-bordo bg-onbrand/5 font-bold text-onbrand"
                      : "border-transparent text-onbrand/75 hover:bg-onbrand/5 hover:text-onbrand",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
