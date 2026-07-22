import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Относительный base: ассеты грузятся относительно index.html.
// Благодаря этому GitHub Pages работает при ЛЮБОМ имени репозитория —
// переименование (skill_framer -> R-D и т.п.) больше не ломает страницу
// и не требует правок конфига. Приложение без клиентского роутинга,
// поэтому относительный base безопасен.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
