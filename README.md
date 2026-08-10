# RD-APP: Чепош Парк

Интерфейс бронирования путешествий с ИИ-агентом на React + TypeScript + Tailwind.

## Структура проекта

```
rd-app/
├── src/                          # React компоненты и логика
│   ├── components/               # React компоненты виджета
│   ├── data/                     # starAnims.ts — Lottie-данные звезды
│   ├── lib/                      # chiposhRuntime.js — логика из legacy, cn()
│   ├── styles/                   # chiposh.css (из legacy) + theme.css (токены)
│   ├── assets/                   # Картинки и Lottie для Vite
│   ├── App.tsx                   # Точка сборки
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Утилиты Tailwind
├── legacy/                       # Архивная статичная версия
│   ├── ChiposhPark.html          # Эталонный HTML (источник истины)
│   ├── assets/                   # Картинки и Lottie для legacy/
│   ├── stars/                    # Lottie JSON источники
│   ├── versions/                 # Снапшоты предыдущих сборок
│   └── README.md                 # Документация legacy версии
├── public/assets/                # Картинки и вендорные библиотеки
├── components.json               # Конфигурация shadcn
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
3. ✅ Портирование разметки и логики в `src/components/`
4. ✅ Конфигурация shadcn и тема проекта
5. ⏳ Замена самописных блоков на компоненты shadcn — по согласованному списку

## Как устроен перенос

`legacy/ChiposhPark.html` разложен на три части:

- **CSS** → `src/styles/chiposh.css` без правок. У Tailwind отключён
  preflight, чтобы базовый слой не переопределял перенесённые стили.
- **Разметка** → компоненты в `src/components/`. Классы и `data-*` сохранены:
  по ним работает логика.
- **Логика** → `src/lib/chiposhRuntime.js` целиком, как есть. Запускается из
  `useEffect` в `Widget`. Часть контейнеров (билеты, табы, часы погоды, пины
  карты, клавиатура) он наполняет сам — там, где в legacy разметка тоже была
  динамической.

Дни 5.07 и 6.07 отдельными компонентами не выделены: рантайм клонирует панель
«Сегодня» и подставляет свои числа — так это устроено в источнике.

## Токены

Значения живут в `src/styles/theme.css` и переопределяют дефолты shadcn:
ink `#060708`, тег `#F0F5F7`, лайм `#EFFF5D`, мятный `#34DDC6`. Радиус не один
на проект, а по компонентам. Карточки плоские — без бордеров и теней.

## Дальше

- Согласовать список компонентов shadcn на замену
- Интегрировать API агента

---

**Документация legacy версии**: см. `legacy/README.md`
