import type { ReactNode } from "react";
import clsx from "clsx";
import type { Confidence, Verdict } from "@/lib/types";
import { CONFIDENCE_NAMES, VERDICT_NAMES } from "@/lib/format";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={clsx("panel", className)}>{children}</section>;
}

export function PanelHead({
  title,
  aside,
}: {
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="panel-head">
      <h2 className="font-serif text-[1.0625rem] leading-6">{title}</h2>
      {aside ? <div className="text-xs text-ink-2">{aside}</div> : null}
    </header>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

const VERDICT_STYLES: Record<Verdict, { dot: string; text: string }> = {
  ok: { dot: "bg-ok", text: "text-ok" },
  warning: { dot: "bg-warn", text: "text-warn" },
  violation: { dot: "bg-bordo", text: "text-bordo" },
  info: { dot: "bg-navy-soft", text: "text-ink-2" },
};

/**
 * Вердикт обозначается словом и точкой, а не только цветом: заключение
 * печатают на монохромном принтере, и цвет там пропадает.
 */
export function StatusMark({
  verdict,
  className,
}: {
  verdict: Verdict;
  className?: string;
}) {
  const style = VERDICT_STYLES[verdict];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-2xs font-bold uppercase tracking-eyebrow",
        style.text,
        className,
      )}
    >
      <span className={clsx("h-2 w-2 shrink-0", style.dot)} aria-hidden />
      {VERDICT_NAMES[verdict]}
    </span>
  );
}

/** Квадратная метка вердикта для счётчиков: цвет плюс слово рядом. */
export const VERDICT_DOT: Record<Verdict, string> = {
  ok: "inline-block h-2 w-2 shrink-0 bg-ok",
  warning: "inline-block h-2 w-2 shrink-0 bg-warn",
  violation: "inline-block h-2 w-2 shrink-0 bg-bordo",
  info: "inline-block h-2 w-2 shrink-0 bg-navy-soft",
};

/** Левая цветная полоса блока проверки. */
export const VERDICT_BORDER: Record<Verdict, string> = {
  ok: "border-l-ok",
  warning: "border-l-warn",
  violation: "border-l-bordo",
  info: "border-l-navy-soft",
};

const CONFIDENCE_STYLES: Record<Confidence, string> = {
  high: "text-ok",
  medium: "text-warn",
  low: "text-bordo",
  none: "text-bordo",
};

export function ConfidenceMark({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={clsx(
        "font-sans text-2xs uppercase tracking-eyebrow",
        CONFIDENCE_STYLES[confidence],
      )}
      title="Достоверность автоматического извлечения"
    >
      извлечение: {CONFIDENCE_NAMES[confidence]}
    </span>
  );
}

/** Строка «подпись — значение» в карточке параметров. */
export function DataRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-4 border-b border-hair py-2 last:border-b-0 sm:grid-cols-[minmax(0,15rem)_1fr]">
      <dt className="field-label pt-0.5">{label}</dt>
      <dd className="text-sm text-ink">
        {value}
        {hint ? <div className="mt-1 text-xs text-ink-3">{hint}</div> : null}
      </dd>
    </div>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="border border-dashed border-rule bg-mist px-4 py-8 text-center">
      <p className="font-serif text-base text-navy">{title}</p>
      {hint ? <p className="mt-1 text-sm text-ink-3">{hint}</p> : null}
    </div>
  );
}

/** Цитата из исходного документа, на которой основано извлечение. */
export function SourceQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-navy-soft bg-mist px-3 py-2 font-serif text-sm italic text-ink-2">
      {children}
    </blockquote>
  );
}

/** Показатель в шапке раздела: крупное число и подпись. */
export function Metric({
  value,
  label,
  tone = "navy",
}: {
  value: ReactNode;
  label: string;
  tone?: "navy" | "bordo" | "ok" | "warn";
}) {
  const toneClass = {
    navy: "text-navy",
    bordo: "text-bordo",
    ok: "text-ok",
    warn: "text-warn",
  }[tone];
  return (
    <div className="border-l-2 border-rule pl-3">
      <div className={clsx("font-serif text-2xl font-bold tnum", toneClass)}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-ink-3">{label}</div>
    </div>
  );
}
