"use client";

import type {
  CaseParams,
  Check,
  Sanction,
  Statistics,
  ScaleLimit,
  Term,
} from "@/lib/types";
import { useI18n } from "@/lib/i18n";
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
  const { t, tr, f, locale } = useI18n();
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
            title={t.params.qualificationTitle}
            aside={
              <ConfidenceMark confidence={params.qualification.confidence} />
            }
          />
          <div className="px-4 py-3">
            {qualification ? (
              <>
                <dl>
                  <DataRow
                    label={t.params.article}
                    value={
                      <span className="font-bold text-navy">
                        {f.article(qualification.article, qualification.part)}
                      </span>
                    }
                    hint={tr(qualification.title)}
                  />
                  <DataRow
                    label={t.params.category}
                    value={f.category(qualification.category)}
                    hint={t.params.categoryHint}
                  />
                  <DataRow
                    label={t.params.commitDate}
                    value={f.dateLong(qualification.commitDate)}
                    hint={t.params.commitDateHint}
                  />
                  <DataRow
                    label={t.params.edition}
                    value={tr(sanction.edition)}
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
                {t.params.qualificationMissing}
              </p>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHead
            title={t.params.defendantTitle}
            aside={<ConfidenceMark confidence={params.defendant.confidence} />}
          />
          <div className="px-4 py-3">
            {defendant ? (
              <>
                <dl>
                  <DataRow label={t.params.fio} value={tr(defendant.fio)} />
                  <DataRow
                    label={t.params.birth}
                    value={`${f.dateLong(
                      defendant.birthDate,
                    )} — ${t.params.ageValue(defendant.age)}`}
                  />
                  <DataRow
                    label={t.params.citizenship}
                    value={tr(defendant.citizenship)}
                  />
                  <DataRow
                    label={t.params.registration}
                    value={tr(defendant.registration)}
                  />
                  <DataRow
                    label={t.params.marital}
                    value={t.params.maritalValue(
                      tr(defendant.maritalStatus),
                      defendant.dependents,
                    )}
                  />
                  <DataRow
                    label={t.params.employment}
                    value={tr(defendant.employment)}
                  />
                  <DataRow
                    label={t.params.education}
                    value={tr(defendant.education)}
                  />
                  <DataRow
                    label={t.params.priorConvictions}
                    value={f.priorConvictions(defendant.priorConvictions)}
                    hint={tr(defendant.priorConvictionsNote)}
                  />
                  <DataRow
                    label={t.params.recidivism}
                    value={
                      defendant.recidivism
                        ? t.params.established
                        : t.params.notEstablished
                    }
                  />
                  <DataRow
                    label={t.params.health}
                    value={tr(defendant.health)}
                  />
                </dl>
                {params.defendant.quote ? (
                  <div className="mt-3">
                    <SourceQuote>{params.defendant.quote}</SourceQuote>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-bordo">{t.params.defendantMissing}</p>
            )}
          </div>
        </Panel>

        <div className="grid gap-5 md:grid-cols-2">
          <Panel>
            <PanelHead
              title={t.params.mitigatingTitle}
              aside={`${t.params.mitigatingNorm} · ${params.mitigating.length}`}
            />
            <ul className="divide-y divide-hair">
              {params.mitigating.map((item) => (
                <li key={item.norm.ru + item.text.ru} className="px-4 py-2.5">
                  <div className="font-mono text-xs text-navy">
                    {tr(item.norm)}
                  </div>
                  <div className="mt-0.5 text-sm">{tr(item.text)}</div>
                </li>
              ))}
              {params.mitigating.length === 0 ? (
                <li className="px-4 py-3 text-sm text-ink-3">
                  {t.params.mitigatingEmpty}
                </li>
              ) : null}
            </ul>
          </Panel>

          <Panel>
            <PanelHead
              title={t.params.aggravatingTitle}
              aside={`${t.params.aggravatingNorm} · ${params.aggravating.length}`}
            />
            <ul className="divide-y divide-hair">
              {params.aggravating.map((item) => (
                <li key={item.norm.ru + item.text.ru} className="px-4 py-2.5">
                  <div className="font-mono text-xs text-bordo">
                    {tr(item.norm)}
                  </div>
                  <div className="mt-0.5 text-sm">{tr(item.text)}</div>
                </li>
              ))}
              {params.aggravating.length === 0 ? (
                <li className="px-4 py-3 text-sm text-ink-3">
                  {t.params.aggravatingEmpty}
                </li>
              ) : null}
            </ul>
          </Panel>
        </div>

        <Panel>
          <PanelHead title={t.params.procedureTitle} />
          <dl className="px-4 py-3">
            <DataRow
              label={t.params.specialOrder}
              value={
                params.procedure.specialOrder
                  ? t.params.applied
                  : t.params.notApplied
              }
              hint={
                params.procedure.specialOrder
                  ? t.params.specialOrderHint
                  : undefined
              }
            />
            <DataRow
              label={t.params.preTrial}
              value={
                params.procedure.preTrialAgreement
                  ? t.params.concluded
                  : t.params.notConcluded
              }
              hint={
                params.procedure.preTrialAgreement
                  ? t.params.preTrialHint
                  : undefined
              }
            />
            <DataRow
              label={t.params.jury}
              value={
                params.procedure.juryVerdict
                  ? t.params.returned
                  : t.params.notReturned
              }
            />
            <DataRow
              label={t.params.incomplete}
              value={t.params.incompleteValue[params.procedure.incomplete]}
            />
            <DataRow
              label={t.params.firstOffence}
              value={params.procedure.firstOffence ? t.common.yes : t.common.no}
            />
            <DataRow
              label={t.params.damageCompensated}
              value={
                params.procedure.damageCompensated ? t.common.yes : t.common.no
              }
            />
            <DataRow
              label={t.params.reconciled}
              value={
                params.procedure.reconciled
                  ? t.params.declared
                  : t.params.notDeclared
              }
            />
          </dl>
        </Panel>
      </div>

      {/* Правая колонка: назначенное наказание и мгновенная проверка пределов */}
      <div className="space-y-5">
        <Panel className="lg:sticky lg:top-4">
          <PanelHead
            title={t.params.punishmentTitle}
            aside={<ConfidenceMark confidence={params.punishment.confidence} />}
          />
          <div className="space-y-4 px-4 py-3">
            <div>
              <span className="field-label">{t.params.mainPunishment}</span>
              <p className="mt-1 text-sm font-bold text-navy">
                {f.kind(term.kind)}
              </p>
            </div>

            <div>
              <label className="field-label" htmlFor="punishment-amount">
                {t.params.amountLabel(t.params.units[term.unit])}
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
                  {f.amount(term.amount, term.unit)}
                </span>
              </div>
              {bounds ? (
                <p className="mt-1.5 text-xs text-ink-3">
                  {t.params.rangeHint(
                    f.amount(bounds.min, term.unit),
                    f.amount(bounds.max, term.unit),
                  )}
                </p>
              ) : null}
            </div>

            {term.note ? (
              <div>
                <span className="field-label">{t.params.serving}</span>
                <p className="mt-0.5 text-sm">{tr(term.note)}</p>
              </div>
            ) : null}

            <div>
              <span className="field-label">{t.params.additional}</span>
              <p className="mt-0.5 text-sm">
                {params.punishment.value?.additional.length
                  ? params.punishment.value.additional
                      .map(
                        (item) =>
                          `${f.kind(item.kind)} ${f.amount(
                            item.amount,
                            item.unit,
                          )}`,
                      )
                      .join("; ")
                  : t.params.additionalNone}
              </p>
            </div>

            {edited ? (
              <div className="border border-navy-soft bg-navy-pale px-3 py-2 text-xs">
                <p className="text-ink-2">
                  {t.params.editedFrom} {f.amount(originalAmount, term.unit)} →{" "}
                  <span className="font-bold text-ink">
                    {f.amount(term.amount, term.unit)}
                  </span>
                  . {t.params.editedNote}
                </p>
                <button
                  type="button"
                  onClick={onReset}
                  className="mt-1.5 font-bold text-navy underline"
                >
                  {t.params.resetAmount}
                </button>
              </div>
            ) : null}

            <div
              className={`border-l-2 bg-mist px-3 py-2.5 ${
                VERDICT_BORDER[liveCheck.verdict]
              }`}
            >
              <StatusMark verdict={liveCheck.verdict} />
              <p className="mt-1 text-sm font-bold text-ink">
                {tr(liveCheck.title)}
              </p>
              <p className="mt-0.5 text-xs text-ink-2">
                {tr(liveCheck.summary)}
              </p>
            </div>

            {params.punishment.quote ? (
              <SourceQuote>{params.punishment.quote}</SourceQuote>
            ) : null}
          </div>
        </Panel>
      </div>

      <div className="min-w-0 lg:col-span-2">
        <Panel>
          <PanelHead title={t.params.scaleTitle} aside={t.params.scaleAside} />
          <div className="px-4 py-4">
            {option ? (
              <SanctionScale
                option={option}
                limits={scaleLimits}
                assigned={term.amount}
                statistics={statistics}
                sanctionLabel={tr(sanction.label)}
              />
            ) : (
              <p className="text-sm text-bordo">{t.params.scaleImpossible}</p>
            )}
            <div className="mt-4 border-t border-hair pt-3">
              <p className="eyebrow mb-1">{t.params.sanctionText}</p>
              <p className="max-w-prose text-sm leading-relaxed text-ink-2">
                {sanction.text}
              </p>
              {locale === "ru" ? null : (
                <p className="mt-1 text-2xs uppercase tracking-eyebrow text-ink-3">
                  {t.common.originalLanguage}
                </p>
              )}
              <p className="mt-1.5 text-xs text-ink-3">
                {tr(sanction.edition)}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
