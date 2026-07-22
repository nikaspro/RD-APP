// Каталог виджетов. Организован по агентному словарю, а не по алфавиту.
// Чтобы добавить виджет: положи файл в src/components, импортируй его
// и его исходник (?raw), добавь запись сюда. Галерея подхватит сама.

import AgentMessage from "./components/AgentMessage.jsx";
import AgentMessageRaw from "./components/AgentMessage.jsx?raw";
import VideoAutoplay from "./components/VideoAutoplay.jsx";
import VideoAutoplayRaw from "./components/VideoAutoplay.jsx?raw";
import { demoVideo } from "./gallery/demoVideo.js";

export const sections = [
  {
    id: "agent-messages",
    title: "Сообщения агента",
    items: [
      {
        id: "agent-message",
        name: "AgentMessage",
        summary: "Как выглядит информационное сообщение от агента",
        Component: AgentMessage,
        raw: AgentMessageRaw,
        // наборы пропсов, которые показываем как живые состояния
        states: [
          {
            label: "info",
            props: {
              variant: "info",
              title: "Заезд подтверждён",
              text: "Номер закреплён за вами до 14:00 в день заезда.",
            },
          },
          {
            label: "nudge",
            props: {
              variant: "nudge",
              title: "Погода меняется",
              text: "В день прогулки обещают дождь. Перенести на утро?",
              actionLabel: "Перенести",
            },
          },
          {
            label: "confirm",
            props: {
              variant: "confirm",
              title: "Отменить бронирование?",
              text: "Действие необратимо, вернуть номер потом нельзя.",
              actionLabel: "Отменить бронь",
            },
          },
        ],
      },
    ],
  },
  {
    id: "media",
    title: "Медиа",
    items: [
      {
        id: "video-autoplay",
        name: "VideoAutoplay",
        summary: "Автовоспроизводимое видео (mp4), которое подгружаешь сам",
        Component: VideoAutoplay,
        raw: VideoAutoplayRaw,
        states: [
          {
            label: "16 / 9",
            props: { src: demoVideo, aspectRatio: "16 / 9" },
          },
          {
            label: "1 / 1",
            props: { src: demoVideo, aspectRatio: "1 / 1" },
          },
        ],
      },
    ],
  },
];

// плоская мапа по имени компонента, нужна бандлеру для вклейки зависимостей
export const registryByName = new Map();
for (const s of sections) {
  for (const item of s.items) registryByName.set(item.name, item);
}
