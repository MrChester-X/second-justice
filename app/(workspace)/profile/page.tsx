"use client";

import { useState } from "react";
import { JUDGE } from "@/lib/data/judge";
import { useSession } from "@/lib/store/session";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel, PanelHead } from "@/components/ui/primitives";

export default function ProfilePage() {
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
        eyebrow="Личный кабинет"
        title="Профиль и настройки"
        lead="Сведения о пользователе и параметры проверки. В прототипе настройки сохраняются только в текущем браузере."
        crumbs={[
          { href: "/dashboard", label: "Личный кабинет" },
          { label: "Профиль" },
        ]}
      />

      <div className="mx-auto grid max-w-shell gap-5 px-4 py-6 lg:grid-cols-2">
        <Panel>
          <PanelHead title="Сведения о пользователе" />
          <dl className="px-4 py-3 text-sm">
            <Row label="Фамилия, имя, отчество" value={JUDGE.fio} />
            <Row label="Должность" value={JUDGE.position} />
            <Row label="Суд" value={JUDGE.court} />
            <Row label="Субъект Российской Федерации" value={JUDGE.region} />
            <Row label="Коллегия" value={JUDGE.chamber} />
            <Row label="Дата назначения" value={formatDate(JUDGE.appointedAt)} />
            <Row label="Стаж работы" value={`${JUDGE.experienceYears} лет`} />
          </dl>
          <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
            Сведения демонстрационные. Аутентификация и связь с кадровыми
            системами в прототипе не реализованы.
          </p>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <PanelHead title="Параметры проверки" />
            <div className="divide-y divide-hair">
              <Toggle
                label="Показывать статистическую справку"
                hint="Сопоставление с практикой по схожим делам в заключении"
                checked={settings.showStatistics}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, showStatistics: value }))
                }
              />
              <Toggle
                label="Проверять соответствие практике ВС РФ"
                hint="Разъяснения Пленума, позиции Президиума, обзоры"
                checked={settings.showPractice}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, showPractice: value }))
                }
              />
              <Toggle
                label="Строгая проверка дополнительного наказания"
                hint="Считать замечанием отсутствие мотивов неназначения, когда наказание предусмотрено как возможное"
                checked={settings.strictAdditional}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, strictAdditional: value }))
                }
              />
              <Toggle
                label="Формировать заключение автоматически"
                hint="Открывать вкладку «Заключение» сразу после проверки"
                checked={settings.autoConclusion}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, autoConclusion: value }))
                }
              />
            </div>
            <p className="border-t border-hair px-4 py-2.5 text-xs text-ink-3">
              Переключатели показывают состав настраиваемых параметров. В
              прототипе они не влияют на работу проверок.
            </p>
          </Panel>

          <Panel>
            <PanelHead title="Данные сеанса" />
            <div className="space-y-3 px-4 py-3 text-sm">
              <p className="text-ink-2">
                В браузере сохранено загруженных дел: {uploaded.length}.
                Очистка удалит их из реестра; демонстрационные материалы
                останутся.
              </p>
              {confirming ? (
                <div className="border-l-2 border-bordo bg-bordo-pale px-3 py-2">
                  <p className="text-sm text-bordo">
                    Удалить загруженные дела и архив заключений?
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
                      Да, очистить
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(false)}
                      className="btn btn-ghost"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  className="btn btn-ghost"
                >
                  Очистить данные сеанса
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
