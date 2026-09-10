import { DEMO_CASES } from "@/lib/api/analysis";
import { AnalysisScreen } from "@/components/analysis/AnalysisScreen";

/*
 * Статический экспорт требует перечислить маршруты на сборке. Известны
 * только демонстрационные дела; дело, загруженное пользователем, открывается
 * маршрутом /analysis/case/ (см. lib/routes.ts).
 */
export function generateStaticParams() {
  return DEMO_CASES.map((item) => ({ id: item.id }));
}

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AnalysisScreen id={id} />;
}
