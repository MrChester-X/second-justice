"use client";

import { useState } from "react";
import { JUDGE } from "@/lib/data/judge";
import { useSession } from "@/lib/store/session";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/lib/i18n";
import { Panel, PanelHead } from "@/components/ui/primitives";

export default function ProfilePage() {
  const { t, tr, f } = useI18n();
  const uploaded = useSession((s) => s.uploaded);
  const reset = useSession((s) => s.reset);
  const [confirming, setConfirming] = useState(false);

  const [settings, setSettings] = useState({
    showStatistics: true,
    showPractice: true,
    strictAdditional: true,
    autoConclusion: false,
  });

  return (
    <>
      <PageHeader
        eyebrow={t.dashboard.eyebrow}
        title={t.profile.title}
        lead={t.profile.lead}
        crumbs={[
          { href: "/dashboard", label: t.nav.dashboard },
          { label: t.profile.crumb },
        ]}
      />

      <div className="mx-auto grid max-w-shell gap-5 px-4 py-6 lg:grid-cols-2">
        <Panel>
          <PanelHead title={t.profile.userTitle} />
          <dl className="px-4 py-3 text-sm">
            <Row label={t.profile.fieldFio} value={tr(JUDGE.fio)} />
            <Row label={t.profile.fieldPosition} value={tr(JUDGE.position)} />
            <Row label={t.profile.fieldCourt} value={tr(JUDGE.court)} />
            <Row label={t.profile.fieldRegion} value={tr(JUDGE.region)} />
            <Row label={t.profile.fieldChamber} value={tr(JUDGE.chamber)} />
            <Row
              label={t.profile.fieldAppointed}
              value={f.date(JUDGE.appointedAt)}
            />
            <Row
              label={t.profile.fieldExperienceFull}
              value={t.profile.years(JUDGE.experienceYears)}
            />
          </dl>
          <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
            {t.profile.userNote}
          </p>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <PanelHead title={t.profile.settingsTitle} />
            <div className="divide-y divide-hair">
              <Toggle
                label={t.profile.optStatistics}
                hint={t.profile.optStatisticsHint}
                checked={settings.showStatistics}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, showStatistics: value }))
                }
              />
              <Toggle
                label={t.profile.optPractice}
                hint={t.profile.optPracticeHint}
                checked={settings.showPractice}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, showPractice: value }))
                }
              />
              <Toggle
                label={t.profile.optAdditional}
                hint={t.profile.optAdditionalHint}
                checked={settings.strictAdditional}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, strictAdditional: value }))
                }
              />
              <Toggle
                label={t.profile.optAutoConclusion}
                hint={t.profile.optAutoConclusionHint}
                checked={settings.autoConclusion}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, autoConclusion: value }))
                }
              />
            </div>
            <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
              {t.profile.settingsNote}
            </p>
          </Panel>

          <Panel>
            <PanelHead title={t.profile.sessionTitle} />
            <div className="space-y-3 px-4 py-3 text-sm">
              <p className="text-ink-2">
                {t.profile.sessionStored(uploaded.length)}
              </p>
              {confirming ? (
                <div className="border-l-2 border-bordo bg-bordo-pale px-3 py-2">
                  <p className="text-sm text-bordo">
                    {t.profile.confirmQuestion}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setConfirming(false);
                      }}
                      className="btn btn-primary"
                    >
                      {t.profile.confirmYes}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(false)}
                      className="btn btn-ghost"
                    >
                      {t.profile.confirmCancel}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="btn btn-ghost"
                >
                  {t.profile.clearSession}
                </button>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,14rem)_1fr] gap-4 border-b border-hair py-2 last:border-b-0">
      <dt className="text-ink-3">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-navy"
      />
      <span>
        <span className="block text-sm font-bold text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-ink-3">{hint}</span>
      </span>
    </label>
  );
}
