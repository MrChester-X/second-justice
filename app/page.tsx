"use client";

import Link from "next/link";
import { Emblem } from "@/components/layout/Emblem";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { JUDGE } from "@/lib/data/judge";
import { DEMO_CASES } from "@/lib/api/analysis";
import { useI18n } from "@/lib/i18n";

export default function LoginPage() {
  const { t, tr } = useI18n();
  const violations = DEMO_CASES.filter((c) => c.status === "violations").length;

  return (
    <div className="flex min-h-screen flex-col bg-sand">
      <header className="border-b-2 border-bordo bg-brand text-onbrand">
        <div className="mx-auto flex max-w-shell flex-wrap items-center gap-3 px-4 py-4">
          <Emblem
            className="h-11 w-11 text-onbrand/85"
            label={t.common.emblem}
          />
          <div>
            <p className="font-serif text-xl font-bold leading-tight">
              {t.common.brand}
            </p>
            <p className="text-2xs uppercase tracking-eyebrow text-onbrand/70">
              {t.landing.systemSubtitle}
            </p>
          </div>
          <div className="ml-auto">
            <LanguageSwitch />
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-shell flex-1 items-start gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="max-w-prose">
          <p className="eyebrow">{t.landing.eyebrow}</p>
          <h1 className="mt-2 font-serif text-[2rem] leading-tight">
            {t.landing.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            {t.landing.lead}
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {t.landing.features.map((feature) => (
              <Feature
                key={feature.term}
                term={feature.term}
                detail={feature.detail}
              />
            ))}
          </dl>
        </div>

        <div className="border border-rule bg-paper">
          <div className="border-b border-rule bg-mist px-5 py-3">
            <h2 className="font-serif text-base">{t.landing.loginTitle}</h2>
          </div>
          <div className="px-5 py-5">
            <p className="text-sm text-ink-2">{t.landing.loginNote}</p>

            <div className="mt-4 border border-rule bg-mist px-4 py-3">
              <p className="font-bold text-navy">{tr(JUDGE.fio)}</p>
              <p className="mt-0.5 text-sm text-ink-2">{tr(JUDGE.position)}</p>
              <p className="text-sm text-ink-2">{tr(JUDGE.court)}</p>
              <p className="mt-2 text-xs text-ink-3">
                {tr(JUDGE.chamber)} ·{" "}
                {t.landing.experience(JUDGE.experienceYears)}
              </p>
            </div>

            <Link
              href="/dashboard"
              className="btn btn-primary mt-4 w-full justify-center"
            >
              {t.landing.login}
            </Link>

            <p className="mt-4 border-t border-hair pt-3 text-xs leading-relaxed text-ink-3">
              {t.landing.registryNote(DEMO_CASES.length, violations)}
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-rule bg-paper">
        <div className="mx-auto max-w-shell px-4 py-5">
          <p className="max-w-prose text-xs leading-relaxed text-ink-2">
            <strong className="text-ink">{t.disclaimer.strong}</strong>{" "}
            {t.landing.disclaimerRest}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="border-l-2 border-rule pl-4">
      <dt className="font-serif text-base font-bold text-navy">{term}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink-2">{detail}</dd>
    </div>
  );
}
