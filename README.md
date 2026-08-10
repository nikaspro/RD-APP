# RD-APP: Чепош Парк

Интерфейс бронирования путешествий с ИИ-агентом на React + TypeScript + Tailwind.

## Структура проекта

```
rd-app/
├── src/                          # React компоненты и логика
│   ├── components/               # React компоненты
│   ├── data/                     # Данные (мокданные, константы)
│   ├── lib/                      # Вспомогательные функции
│   ├── assets/                   # Картинки и Lottie для Vite
│   ├── App.tsx                   # Главная компонента
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Глобальные стили (Tailwind)
│   └── App.css                   # Стили App
├── legacy/                       # Архивная статичная версия
│   ├── ChiposhPark.html          # Эталонный HTML (источник истины)
│   ├── assets/                   # Картинки и Lottie для legacy/
│   ├── stars/                    # Lottie JSON источники
│   ├── versions/                 # Снапшоты предыдущих сборок
│   └── README.md                 # Документация legacy версии
├── dist/                         # Production сборка (gitignored)
├── index.html                    # HTML шаблон для Vite
├── vite.config.ts                # Vite конфиг (single-file plugin)
├── tsconfig.json                 # TypeScript конфиг
├── tailwind.config.js            # Tailwind конфиг
├── postcss.config.js             # PostCSS конфиг
└── package.json                  # npm зависимости

```

## Разработка

### Установка зависимостей

```bash
npm install
```

### Локальный dev-сервер

```bash
npm run dev
```

Откроется на http://localhost:5173

### Production сборка

```bash
npm run build
```

Результат в `dist/index.html` (152 KB gzipped с vite-plugin-singlefile)

### Preview production сборки

```bash
npm run preview
```

## Архивная версия

`legacy/ChiposhPark.html` — это эталонный HTML-файл (источник истины), по которому сверяется вся разработка.

- **Открытие**: двойной клик на файл (работает offline)
- **Через HTTP**: `python3 -m http.server 5000`, затем http://localhost:5000/legacy/ChiposhPark.html
- **Относительные пути**: заложены на `legacy/assets/`, поэтому работает везде

Не редактировать напрямую — при необходимости переносить функциональность в React компоненты.

## Инструмент build

- **Vite 5** — быстрый dev и production build
- **vite-plugin-singlefile** — сборка в один HTML-файл (для future single-file releasов, как legacy/ChiposhPark.html)
- **React 18** + **TypeScript 5** — типизированная разработка
- **Tailwind CSS** — утилитарные стили

## Миграция

Проект находится в процессе миграции со статичного HTML на React:

1. ✅ Перенос архивного контента в `legacy/`
2. ✅ Vite + React скелет с инфраструктурой
3. ⏳ Портирование компонентов из `legacy/ChiposhPark.html` в `src/components/`
4. ⏳ Интеграция shadcn/ui компонентов

Портирование разметки — отдельный этап, здесь — только инфраструктура.

## Дальше

- Добавить shadcn/ui: `npx shadcn-ui@latest init`
- Портировать компоненты интерфейса из legacy версии
- Интегрировать API агента

---

**Документация legacy версии**: см. `legacy/README.md`
