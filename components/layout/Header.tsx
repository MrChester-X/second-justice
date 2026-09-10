"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Emblem } from "./Emblem";
import { ThemeSwitch } from "./ThemeSwitch";
import { JUDGE } from "@/lib/data/judge";
import { useChromeLabels } from "@/lib/theme/labels";

export function Header() {
  const pathname = usePathname();
  const labels = useChromeLabels();

  const nav = [
    { href: "/dashboard", label: labels.navDashboard },
    { href: "/analysis/new", label: labels.navNew },
    { href: "/database", label: labels.navDatabase },
    { href: "/practice", label: labels.navPractice },
    { href: "/reports", label: labels.navReports },
  ];

  return (
    <header className="no-print border-b-2 border-bordo bg-brand text-onbrand">
      <div className="mx-auto flex max-w-shell flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-onbrand no-underline"
        >
          <Emblem className="h-10 w-10 shrink-0 text-onbrand/85" />
          <span>
            <span className="block font-serif text-lg font-bold leading-tight">
              Второе мнение
            </span>
            <span className="block text-2xs uppercase tracking-eyebrow text-onbrand/70">
              {labels.brandSubtitle}
            </span>
          </span>
        </Link>

        <div className="ml-auto text-right text-xs leading-tight text-onbrand/80">
          <div className="font-bold text-onbrand">{JUDGE.shortFio}</div>
          <div>{JUDGE.court}</div>
        </div>

        <ThemeSwitch />

        <Link
          href="/"
          className="border border-onbrand/30 px-2.5 py-1 text-xs text-onbrand/90 no-underline hover:bg-onbrand/10"
        >
          {labels.logout}
        </Link>
      </div>

      <nav
        aria-label="Основная навигация"
        className="border-t border-onbrand/15 bg-brand-deep"
      >
        <ul className="mx-auto flex max-w-shell flex-wrap px-4">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href)) ||
              (item.href === "/analysis/new" && pathname.startsWith("/analysis"));
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
