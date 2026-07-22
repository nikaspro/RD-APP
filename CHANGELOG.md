# Changelog

Одна строка на изменение публичного API виджета. Свежее сверху.

## 0.2.0
- VideoAutoplay: новый виджет. Автоплей mp4 по src, muted + loop + playsInline, уважает prefers-reduced-motion. props: src, poster, aspectRatio, loop, radius.
- Галерея: секция «Медиа» с демо-роликом (встроен как data-URI в src/gallery/demoVideo.js).
- vite base теперь относительный ("./") — Pages работает при любом имени репо, base править не нужно.
- CI: npm install вместо npm ci (package-lock.json не коммитим).

## 0.1.0
- Скелет кита: галерея на Vite, токены, бандлер "для артефакта", деплой на Pages.
- AgentMessage: первый виджет. variant = info | nudge | confirm.
