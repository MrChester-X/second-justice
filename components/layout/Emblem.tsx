/**
 * Знак системы: весы правосудия в круге.
 *
 * Государственный герб намеренно не используется: прототип не является
 * официальным ресурсом государственного органа и не должен выглядеть как он.
 */
export function Emblem({
  className = "h-9 w-9",
  label,
}: {
  className?: string;
  /** Подпись для средств доступности: приходит из словаря интерфейса. */
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label={label}
      fill="none"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M20 9.5v21M12.5 30.5h15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 14.5h24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="14.5" r="1.75" fill="currentColor" />
      {/* Левая чаша */}
      <path
        d="M8 14.5 4.5 22h7L8 14.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Правая чаша — намеренно ниже: «второе мнение» перевешивает сомнение */}
      <path
        d="M32 14.5 28 23.5h8L32 14.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.16"
      />
    </svg>
  );
}
