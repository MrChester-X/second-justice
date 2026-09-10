/**
 * Оговорка о вспомогательном характере системы. Требование п. 3 технического
 * задания: прототип не наделяется функциями принятия судебного решения.
 * Показывается на каждом экране и попадает в печатное заключение.
 */
export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="border-t border-rule pt-3 text-xs leading-relaxed text-ink-3">
        Система не принимает судебных решений и не заменяет судью. Заключение
        носит справочно-аналитический характер.
      </p>
    );
  }

  return (
    <footer className="border-t-2 border-rule bg-paper">
      <div className="mx-auto max-w-shell px-4 py-5">
        <p className="max-w-prose text-xs leading-relaxed text-ink-2">
          <strong className="font-bold text-ink">
            Система не принимает судебных решений и не заменяет судью в процессе
            правоприменения.
          </strong>{" "}
          Она выступает вспомогательным инструментом проверки проекта судебного
          акта: указывает на возможные несоответствия закону и практике и
          готовит справочные материалы. Все выводы подлежат самостоятельной
          оценке судьёй.
        </p>
        <p className="mt-3 text-2xs uppercase tracking-eyebrow text-ink-3">
          Прототип · демонстрационные данные · интерфейс на русском языке
        </p>
      </div>
    </footer>
  );
}
