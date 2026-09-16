import type { Config } from "tailwindcss";

/**
 * Цвета заданы через CSS-переменные, а не хексами: палитра описана в одном
 * месте — app/globals.css, — и компоненты не знают конкретных значений.
 *
 * Форма `rgb(var(--c-x) / <alpha-value>)` обязательна: без неё перестанут
 * работать модификаторы прозрачности вида `bg-paper/5` и `border-navy/40`,
 * которых в разметке много.
 */
const withAlpha = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Поверхности
        paper: withAlpha("paper"),
        sand: withAlpha("sand"),
        mist: withAlpha("mist"),
        // Линейки
        rule: withAlpha("rule"),
        hair: withAlpha("hair"),
        // Текст
        ink: withAlpha("ink"),
        "ink-2": withAlpha("ink-2"),
        "ink-3": withAlpha("ink-3"),
        // Фирменная поверхность шапки и текст на ней
        brand: {
          DEFAULT: withAlpha("brand"),
          deep: withAlpha("brand-deep"),
        },
        onbrand: withAlpha("onbrand"),
        // Акцент: заголовки, ссылки, основные кнопки
        navy: {
          DEFAULT: withAlpha("navy"),
          deep: withAlpha("navy-deep"),
          mid: withAlpha("navy-mid"),
          soft: withAlpha("navy-soft"),
          pale: withAlpha("navy-pale"),
        },
        // Вердикты
        bordo: {
          DEFAULT: withAlpha("bordo"),
          pale: withAlpha("bordo-pale"),
        },
        ok: {
          DEFAULT: withAlpha("ok"),
          pale: withAlpha("ok-pale"),
        },
        warn: {
          DEFAULT: withAlpha("warn"),
          pale: withAlpha("warn-pale"),
        },
      },
      fontFamily: {
        serif: ["var(--font-pt-serif)", "Georgia", "serif"],
        sans: ["var(--font-pt-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-pt-mono)", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.8125rem", { lineHeight: "1.25rem" }],
        base: ["0.9375rem", { lineHeight: "1.5rem" }],
      },
      borderRadius: {
        none: "0",
        DEFAULT: "2px",
        sm: "1px",
        md: "2px",
        lg: "2px",
      },
      letterSpacing: {
        eyebrow: "0.09em",
      },
      maxWidth: {
        shell: "1320px",
        prose: "72ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
