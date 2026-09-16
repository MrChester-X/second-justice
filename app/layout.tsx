import type { Metadata } from "next";
import { PT_Serif, PT_Sans, PT_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from "@/lib/i18n/constants";

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

export const metadata: Metadata = {
  title: "Второе мнение — проверка назначенного наказания",
  description:
    "Прототип вспомогательной системы проверки проекта судебного акта по уголовному делу: соответствие санкции статьи УК РФ, правилам Общей части, разъяснениям Пленума и практике по схожим делам.",
};

/*
 * Язык выставляется на <html> до первой отрисовки: атрибут lang нужен
 * средствам доступности и переносу слов сразу, а не после гидратации.
 * Текст интерфейса переключается уже в React — статическая сборка отдаёт
 * одну и ту же русскую разметку всем.
 */
const LOCALE_BOOTSTRAP = `try{var v=localStorage.getItem(${JSON.stringify(
  LOCALE_STORAGE_KEY,
)});if(v==="en"||v==="ru"){document.documentElement.lang=v}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <body
        className={`${ptSerif.variable} ${ptSans.variable} ${ptMono.variable}`}
      >
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
