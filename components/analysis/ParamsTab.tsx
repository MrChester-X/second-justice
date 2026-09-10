"use client";

import type {
  CaseParams,
  Check,
  Sanction,
  Statistics,
  ScaleLimit,
  Term,
} from "@/lib/types";
import {
  CATEGORY_NAMES,
  PRIOR_CONVICTION_NAMES,
  articleLabel,
  formatAmount,
  formatDateLong,
  kindName,
  plural,
} from "@/lib/format";
import {
  ConfidenceMark,
  DataRow,
  Panel,
  PanelHead,
  SourceQuote,
  StatusMark,
  VERDICT_BORDER,
} from "@/components/ui/primitives";
import { SanctionScale } from "./SanctionScale";
import { findOption, optionBounds } from "@/lib/rules";

/** Единицы измерения размера наказания для подписи поля ввода. */
const UNIT_LABEL: Record<Term["unit"], string> = {
  months: "месяцев",
  hours: "часов",
  rub: "рублей",
};

export function ParamsTab({
  params,
  sanction,
  term,
  originalAmount,
  onAmountChange,
  onReset,
  liveCheck,
  statistics,
  scaleLimits,
}: {
  params: CaseParams;
  sanction: Sanction;
  term: Term;
  originalAmount: number;
  onAmountChange: (amount: number) => void;
  onReset: () => void;
  liveCheck: Check;
  statistics: Statistics;
  scaleLimits: ScaleLimit[];
}) {
  const qualification = params.qualification.value;
  const defendant = params.defendant.value;
  const option = findOption(sanction, term.kind);
  const bounds = option ? optionBounds(option) : null;
  const edited = term.amount !== originalAmount;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-5">
        <Panel>
          <PanelHead
            title="Квалификация преступления"
            aside={<ConfidenceMark confidence={params.qualification.confidence} />}
          />
          <div className="px-4 py-3">
            {qualification ? (
              <>
                <dl>
                  <DataRow
                    label="Статья УК РФ"
                    value={
                      <span className="font-bold text-navy">
                        {articleLabel(qualification.article, qualification.part)}
                      </span>
                    }
                    hint={qualification.title}
                  />
                  <DataRow
                    label="Категория преступления"
                    value={CATEGORY_NAMES[qualification.category]}
                    hint="ст. 15 УК РФ"
                  />
                  <DataRow
                    label="Дата совершения деяния"
                    value={formatDateLong(qualification.commitDate)}
                    hint="определяет применимую редакцию закона — ст. 9, 10 УК РФ"
                  />
                  <DataRow
                    label="Применённая редакция"
                    value={sanction.edition}
                  />
                </dl>
                {params.qualification.quote ? (
                  <div className="mt-3">
                    <SourceQuote>{params.qualification.quote}</SourceQuote>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-bordo">
                Квалификация не извлечена. Укажите статью вручную.
              </p>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title="Сведения о личности подсудимого"
            aside={<ConfidenceMark confidence={params.defendant.confidence} />}
          />
          <div className="px-4 py-3">
            {defendant ? (
              <>
                <dl>
                  <DataRow label="Фамилия, имя, отчество" value={defendant.fio} />
                  <DataRow
                    label="Дата рождения, возраст"
                    value={`${formatDateLong(defendant.birthDate)} — ${defendant.age} ${plural(defendant.age, "год", "года", "лет")}`}
                  />
                  <DataRow label="Гражданство" value={defendant.citizenship} />
                  <DataRow
                    label="Место регистрации"
                    value={defendant.registration}
                  />
                  <DataRow
                    label="Семейное положение"
                    value={`${defendant.maritalStatus}, иждивенцев: ${defendant.dependents}`}
                  />
                  <DataRow label="Занятость" value={defendant.employment} />
                  <DataRow label="Образование" value={defendant.education} />
                  <DataRow
                    label="Судимости"
                    value={PRIOR_CONVICTION_NAMES[defendant.priorConvictions]}
                    hint={defendant.priorConvictionsNote}
                  />
                  <DataRow
                    label="Рецидив (ст. 18 УК РФ)"
                    value={defendant.recidivism ? "установлен" : "не установлен"}
                  />
                  <DataRow label="Состояние здоровья" value={defendant.health} />
                </dl>
                {params.defendant.quote ? (
                  <div className="mt-3">
                    <SourceQuote>{params.defendant.quote}</SourceQuote>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-bordo">
                Сведения о личности не извлечены. Заполните вручную.
              </p>
            )}
          </div>
        </Panel>

        <div className="grid gap-5 md:grid-cols-2">
          <Panel>
            <PanelHead
              title="Смягчающие обстоятельства"
              aside={`ст. 61 УК РФ · ${params.mitigating.length}`}
            />
            <ul className="divide-y divide-hair">
              {params.mitigating.map((item) => (
                <li key={item.norm + item.text} className="px-4 py-2.5">
                  <div className="font-mono text-xs text-navy">{item.norm}</div>
                  <div className="mt-0.5 text-sm">{item.text}</div>
                </li>
              ))}
              {params.mitigating.length === 0 ? (
                <li className="px-4 py-3 text-sm text-ink-3">
                  Смягчающих обстоятельств не установлено.
                </li>
              ) : null}
            </ul>
          </Panel>

          <Panel>
            <PanelHead
              title="Отягчающие обстоятельства"
              aside={`ст. 63 УК РФ · ${params.aggravating.length}`}
            />
            <ul className="divide-y divide-hair">
              {params.aggravating.map((item) => (
                <li key={item.norm + item.text} className="px-4 py-2.5">
                  <div className="font-mono text-xs text-bordo">{item.norm}</div>
                  <div className="mt-0.5 text-sm">{item.text}</div>
                </li>
              ))}
              {params.aggravating.length === 0 ? (
                <li className="px-4 py-3 text-sm text-ink-3">
                  Отягчающих обстоятельств не установлено.
                </li>
              ) : null}
            </ul>
          </Panel>
        </div>

        <Panel>
          <PanelHead title="Процессуальные особенности" />
          <dl className="px-4 py-3">
            <DataRow
              label="Особый порядок (гл. 40 УПК РФ)"
              value={params.procedure.specialOrder ? "применён" : "не применялся"}
              hint={
                params.procedure.specialOrder
                  ? "влечёт применение ч. 5 ст. 62 УК РФ"
                  : undefined
              }
            />
            <DataRow
              label="Досудебное соглашение (гл. 40.1 УПК РФ)"
              value={
                params.procedure.preTrialAgreement ? "заключено" : "не заключалось"
              }
              hint={
                params.procedure.preTrialAgreement
                  ? "влечёт применение ч. 2 ст. 62 УК РФ"
                  : undefined
              }
            />
            <DataRow
              label="Вердикт присяжных (ст. 65 УК РФ)"
              value={params.procedure.juryVerdict ? "вынесен" : "не выносился"}
            />
            <DataRow
              label="Неоконченное преступление (ст. 66 УК РФ)"
              value={
                params.procedure.incomplete === "none"
                  ? "преступление окончено"
                  : params.procedure.incomplete === "attempt"
                    ? "покушение"
                    : "приготовление"
              }
            />
            <DataRow
              label="Преступление совершено впервые"
              value={params.procedure.firstOffence ? "да" : "нет"}
            />
            <DataRow
              label="Вред возмещён"
              value={params.procedure.damageCompensated ? "да" : "нет"}
            />
            <DataRow
              label="Примирение с потерпевшим"
              value={params.procedure.reconciled ? "заявлено" : "не заявлялось"}
            />
          </dl>
        </Panel>
      </div>

      {/* Правая колонка: назначенное наказание и мгновенная проверка пределов */}
      <div className="space-y-5">
        <Panel className="lg:sticky lg:top-4">
          <PanelHead
            title="Назначенное наказание"
            aside={<ConfidenceMark confidence={params.punishment.confidence} />}
          />
          <div className="space-y-4 px-4 py-3">
            <div>
              <span className="field-label">Основное наказание</span>
              <p className="mt-1 text-sm font-bold text-navy">
                {kindName(term.kind)}
              </p>
            </div>

            <div>
              <label className="field-label" htmlFor="punishment-amount">
                Размер, {UNIT_LABEL[term.unit]}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  id="punishment-amount"
                  type="number"
                  min={0}
                  step={term.unit === "rub" ? 1000 : 1}
                  value={term.amount}
                  onChange={(event) =>
                    onAmountChange(Math.max(0, Number(event.target.value) || 0))
                  }
                  className="input w-32 tnum"
                />
                <span className="text-sm text-ink-2">
                  {formatAmount(term.amount, term.unit)}
                </span>
              </div>
              {bounds ? (
                <p className="mt-1.5 text-xs text-ink-3">
                  Диапазон по санкции: {formatAmount(bounds.min, term.unit)} —{" "}
                  {formatAmount(bounds.max, term.unit)}.
                </p>
              ) : null}
            </div>

            {term.note ? (
              <div>
                <span className="field-label">Порядок отбывания</span>
                <p className="mt-0.5 text-sm">{term.note}</p>
              </div>
            ) : null}

            <div>
              <span className="field-label">Дополнительное наказание</span>
              <p className="mt-0.5 text-sm">
                {params.punishment.value?.additional.length
                  ? params.punishment.value.additional
                      .map((item) => `${kindName(item.kind)} ${formatAmount(item.amount, item.unit)}`)
                      .join("; ")
                  : "не назначено"}
              </p>
            </div>

            {edited ? (
              <div className="border border-navy-soft bg-navy-pale px-3 py-2 text-xs">
                <p className="text-ink-2">
                  Размер изменён: {formatAmount(originalAmount, term.unit)} →{" "}
                  <span className="font-bold text-ink">
                    {formatAmount(term.amount, term.unit)}
                  </span>
                  . Проверка пределов и статистика пересчитаны.
                </p>
                <button
                  type="button"
                  onClick={onReset}
                  className="mt-1.5 font-bold text-navy underline"
                >
                  Вернуть исходное значение
                </button>
              </div>
            ) : null}

            <div
              className={`border-l-2 bg-mist px-3 py-2.5 ${VERDICT_BORDER[liveCheck.verdict]}`}
            >
              <StatusMark verdict={liveCheck.verdict} />
              <p className="mt-1 text-sm font-bold text-ink">{liveCheck.title}</p>
              <p className="mt-0.5 text-xs text-ink-2">{liveCheck.summary}</p>
            </div>

            {params.punishment.quote ? (
              <SourceQuote>{params.punishment.quote}</SourceQuote>
            ) : null}
          </div>
        </Panel>
      </div>

      <div className="min-w-0 lg:col-span-2">
        <Panel>
          <PanelHead
            title="Наказание на шкале санкции"
            aside="санкция · пределы Общей части · практика"
          />
          <div className="px-4 py-4">
            {option ? (
              <SanctionScale
                option={option}
                limits={scaleLimits}
                assigned={term.amount}
                statistics={statistics}
                sanctionLabel={sanction.label}
              />
            ) : (
              <p className="text-sm text-bordo">
                Назначенный вид наказания санкцией не предусмотрен, шкала не
                строится.
              </p>
            )}
            <div className="mt-4 border-t border-hair pt-3">
              <p className="eyebrow mb-1">Текст санкции</p>
              <p className="max-w-prose text-sm leading-relaxed text-ink-2">
                {sanction.text}
              </p>
              <p className="mt-1.5 text-xs text-ink-3">{sanction.edition}</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
