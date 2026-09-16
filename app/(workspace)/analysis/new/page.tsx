"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  ANALYSIS_STAGES,
  DEMO_CASES,
  STATUS_NAMES,
  analyzeDemoCase,
  analyzeDocument,
} from "@/lib/api/analysis";
import { useSession } from "@/lib/store/session";
import { caseHref } from "@/lib/routes";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/lib/i18n";
import { Panel, PanelHead } from "@/components/ui/primitives";
import type { CaseStatus } from "@/lib/types";

const ACCEPTED = [".docx", ".pdf", ".doc", ".rtf", ".odt"];

const STATUS_TONE: Record<CaseStatus, string> = {
  ok: "text-ok",
  warnings: "text-warn",
  violations: "text-bordo",
  draft: "text-ink-3",
  analyzing: "text-ink-3",
};

export default function NewAnalysisPage() {
  const { t, tr, f } = useI18n();
  const router = useRouter();
  const addCase = useSession((s) => s.addCase);
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const [stageIndex, setStageIndex] = useState<number | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const running = stageIndex !== null;

  async function handleFile(file: File) {
    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPTED.includes(extension)) {
      setError(t.upload.errorFormat(extension, ACCEPTED.join(", ")));
      return;
    }
    if (file.size === 0) {
      setError(t.upload.errorEmpty);
      return;
    }

    setError(null);
    setProcessed(file.name);
    setStageIndex(0);
    const result = await analyzeDocument(
      { name: file.name, size: file.size },
      setStageIndex,
    );
    addCase(result);
    router.push(caseHref(result.id));
  }

  async function handleDemo(caseId: string, fileName: string) {
    setError(null);
    setProcessed(fileName);
    setStageIndex(0);
    const result = await analyzeDemoCase(caseId, setStageIndex);
    router.push(caseHref(result.id));
  }

  return (
    <>
      <PageHeader
        eyebrow={t.workspace.eyebrow}
        title={t.upload.title}
        lead={t.upload.lead}
        crumbs={[
          { href: "/dashboard", label: t.nav.dashboard },
          { label: t.nav.newCheck },
        ]}
      />

      <div className="mx-auto grid max-w-shell gap-5 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-5">
          <Panel>
            <PanelHead
              title={t.upload.documentTitle}
              aside={t.upload.formats(ACCEPTED.join(", "))}
            />
            <div className="px-4 py-4">
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  if (!running) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  if (running) return;
                  const file = event.dataTransfer.files?.[0];
                  if (file) void handleFile(file);
                }}
                className={clsx(
                  "border-2 border-dashed px-6 py-10 text-center transition-colors",
                  dragging ? "border-navy bg-navy-pale" : "border-rule bg-mist",
                  running && "opacity-60",
                )}
              >
                <p className="font-serif text-lg text-navy">
                  {t.upload.dropHere}
                </p>
                <p className="mt-1 text-sm text-ink-2">{t.upload.orPick}</p>
                <button
                  type="button"
                  disabled={running}
                  onClick={() => inputRef.current?.click()}
                  className="btn btn-ghost mt-4"
                >
                  {t.upload.pickFile}
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED.join(",")}
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void handleFile(file);
                    event.target.value = "";
                  }}
                />
                <p className="mt-4 text-xs text-ink-3">{t.upload.localOnly}</p>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="mt-3 border-l-2 border-bordo bg-bordo-pale px-3 py-2 text-sm text-bordo"
                >
                  {error}
                </p>
              ) : null}
            </div>
          </Panel>

          {running ? (
            <Panel>
              <PanelHead
                title={t.upload.processingTitle}
                aside={processed ?? undefined}
              />
              <ol className="divide-y divide-hair">
                {ANALYSIS_STAGES.map((stage, index) => {
                  const done = stageIndex !== null && index < stageIndex;
                  const active = stageIndex === index;
                  return (
                    <li
                      key={stage.id}
                      className={clsx(
                        "flex items-start gap-3 px-4 py-2.5",
                        active && "bg-navy-pale",
                      )}
                    >
                      <span
                        className={clsx(
                          "mt-1 h-2.5 w-2.5 shrink-0",
                          done
                            ? "bg-ok"
                            : active
                            ? "animate-pulse bg-navy"
                            : "bg-rule",
                        )}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span
                          className={clsx(
                            "block text-sm",
                            done || active
                              ? "font-bold text-ink"
                              : "text-ink-3",
                          )}
                        >
                          {tr(stage.label)}
                        </span>
                        <span className="block text-xs text-ink-3">
                          {tr(stage.detail)}
                        </span>
                      </span>
                      <span className="ml-auto shrink-0 text-2xs uppercase tracking-eyebrow text-ink-3">
                        {done
                          ? t.upload.stageDone
                          : active
                          ? t.upload.stageRunning
                          : t.upload.stageWaiting}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Panel>
          ) : null}

          <Panel>
            <PanelHead title={t.upload.demoTitle} aside={t.upload.demoAside} />
            <ul className="divide-y divide-hair">
              {DEMO_CASES.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm text-navy">
                      {item.fileName}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-2">
                      {t.upload.caseLabel} {tr(item.number)} ·{" "}
                      {tr(item.articleShort)} · {tr(item.defendantShort)} ·{" "}
                      {f.fileSize(item.fileSize)}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      "text-xs font-bold uppercase tracking-eyebrow",
                      STATUS_TONE[item.status],
                    )}
                  >
                    {tr(STATUS_NAMES[item.status])}
                  </span>
                  <button
                    type="button"
                    disabled={running}
                    onClick={() => void handleDemo(item.id, item.fileName)}
                    className="btn btn-ghost"
                  >
                    {t.upload.runDemo}
                  </button>
                </li>
              ))}
            </ul>
            <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
              {t.upload.demoNote}
            </p>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel>
            <PanelHead title={t.upload.extractedTitle} />
            <ul className="space-y-2.5 px-4 py-3 text-sm">
              {t.upload.extractedItems.map((item) => (
                <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-x-2">
                  <span className="mt-2 h-1 w-1.5 bg-navy-soft" aria-hidden />
                  <span className="text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHead title={t.upload.limitsTitle} />
            <div className="space-y-2 px-4 py-3 text-sm leading-relaxed text-ink-2">
              <p>{t.upload.limitsExtraction}</p>
              <p>{t.upload.limitsData}</p>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
