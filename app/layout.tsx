import type { Metadata } from "next";
import { PT_Serif, PT_Sans, PT_Mono, Forum, Exo_2 } from "next/font/google";
import "./globals.css";
import { THEME_STORAGE_KEY } from "@/lib/theme/constants";

/* Судебное оформление: гарнитуры ParaType (Россия), лицензия OFL. */
const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const ptMono = PT_Mono({
  variable: "--font-pt-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400"],
  display: "swap",
});

/*
 * Игровое оформление. Гарнитуры игры проприетарные и не используются: взяты
 * открытые аналоги с той же пластикой, обе по лицензии OFL и обе с полной
 * кириллицей — это обязательное условие, иначе русские заголовки откатились
 * бы на запасную гарнитуру.
 *   Forum — романские капители для заголовков;
 *   Exo 2 — узкий технический шрифт для интерфейса.
 */
const forum = Forum({
  variable: "--font-forum",
  subsets: ["cyrillic", "latin"],
  weight: ["400"],
  display: "swap",
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Второе мнение — проверка назначенного наказания",
  description:
    "Прототип вспомогательной системы проверки проекта судебного акта по уголовному делу: соответствие санкции статьи УК РФ, правилам Общей части, разъяснениям Пленума и практике по схожим делам.",
};

/*
 * Тема выставляется до первой отрисовки: иначе выбранное тёмное оформление
 * моргнёт светлым. Скрипт выполняется синхронно, до разбора остальной
 * разметки, поэтому вспышки не будет.
 */
const THEME_BOOTSTRAP = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="arena"||t==="classic"){document.documentElement.dataset.theme=t}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${ptSerif.variable} ${ptSans.variable} ${ptMono.variable} ${forum.variable} ${exo2.variable}`}
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
