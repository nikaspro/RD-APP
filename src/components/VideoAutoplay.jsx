import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "../../tokens/tokens.js";

// Автовоспроизводимое видео. Ты подгружаешь свой файл (обычно mp4) через src.
// Всегда muted + playsInline — без этого браузеры блокируют автоплей.
// Уважает prefers-reduced-motion: если система просит меньше движения,
// автоплей выключается и показываются controls, чтобы человек включил сам.
//
// props:
//  - src         : URL видео (обязательно). Формат-агностично: mp4 | webm | ogg.
//  - poster      : кадр-превью до загрузки
//  - aspectRatio : пропорции контейнера, по умолчанию "16 / 9"
//  - loop        : зациклить, по умолчанию true
//  - radius      : скругление, по умолчанию токен card
export default function VideoAutoplay({
  src,
  poster,
  aspectRatio = "16 / 9",
  loop = true,
  radius,
}) {
  const t = tokens;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const r = radius ?? t.radius.card;

  // Гарантируем автоплей: React не всегда проставляет muted как DOM-свойство,
  // а play() может вернуть отклонённый промис — тихо игнорируем.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (!reduce) {
      const p = v.play?.();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [reduce, src]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={t.motion.spring}
      style={{
        width: "100%",
        maxWidth: 640,
        aspectRatio,
        borderRadius: r,
        overflow: "hidden",
        background: t.color.surfaceMuted,
        fontFamily: t.font.family,
      }}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay={!reduce}
        muted
        loop={loop}
        playsInline
        controls={reduce}
        preload="metadata"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
}
