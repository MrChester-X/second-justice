import type { NextConfig } from "next";

/*
 * Статический экспорт для GitHub Pages: сервера нет, сборка выкладывает
 * готовые HTML-файлы в out/.
 *
 * Префикс пути подставляется сборкой. Project pages лежат в подкаталоге
 * /<имя-репозитория>/, user pages — в корне домена, поэтому значение
 * приходит извне: в CI его выдаёт actions/configure-pages, локально
 * переменная не задана и сайт собирается для корня.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/* Next не принимает "/" и завершающий слеш: корень домена — это пустая строка. */
const basePath = rawBasePath.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  /* GitHub Pages отдаёт index.html из каталога, поэтому пути со слешем. */
  trailingSlash: true,
  basePath,
  /* Оптимизатор изображений требует сервера; в прототипе изображений нет. */
  images: { unoptimized: true },
};

export default nextConfig;
