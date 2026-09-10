"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnalysisScreen } from "@/components/analysis/AnalysisScreen";

/*
 * Рабочая область для дела, загруженного пользователем. Идентификатор
 * появляется только в браузере, поэтому отдельной страницы для него собрать
 * нельзя и он передаётся параметром запроса: /analysis/case/?id=...
 */
function CaseFromQuery() {
  const id = useSearchParams().get("id") ?? "";
  return <AnalysisScreen id={id} />;
}

export default function AnalysisCasePage() {
  return (
    <Suspense fallback={null}>
      <CaseFromQuery />
    </Suspense>
  );
}
