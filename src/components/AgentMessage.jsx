import { motion } from "framer-motion";
import { tokens } from "../../tokens/tokens.js";

// Информационное сообщение от агента.
// variant: "info" | "nudge" | "confirm"
//  - info    : агент сообщает факт, без действия
//  - nudge   : агент предлагает первым, есть мягкое действие
//  - confirm : агент просит подтвердить необратимое, две кнопки
export default function AgentMessage({
  variant = "info",
  title,
  text,
  actionLabel,
  onAction,
  onDismiss,
}) {
  const t = tokens;

  const accentByVariant = {
    info: t.color.textMuted,
    nudge: t.color.accent,
    confirm: t.color.ink,
  };
  const bar = accentByVariant[variant] || t.color.textMuted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={t.motion.spring}
      style={{
        display: "flex",
        gap: t.space.md,
        maxWidth: 420,
        padding: t.space.lg,
        borderRadius: t.radius.card,
        background: t.color.surface,
        fontFamily: t.font.family,
        color: t.color.ink,
      }}
    >
      <div
        style={{
          width: 4,
          alignSelf: "stretch",
          borderRadius: t.radius.pill,
          background: bar,
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: t.space.sm }}>
        {title && (
          <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>
            {title}
          </div>
        )}
        {text && (
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.45,
              color: t.color.textMuted,
            }}
          >
            {text}
          </div>
        )}

        {(variant === "nudge" || variant === "confirm") && (
          <div style={{ display: "flex", gap: t.space.sm, marginTop: t.space.xs }}>
            <button
              onClick={onAction}
              style={{
                border: "none",
                cursor: "pointer",
                fontFamily: t.font.family,
                fontSize: 16,
                padding: `${t.space.sm}px ${t.space.lg}px`,
                borderRadius: t.radius.pill,
                background: variant === "confirm" ? t.color.ink : t.color.accent,
                color: t.color.surface,
              }}
            >
              {actionLabel || (variant === "confirm" ? "Подтвердить" : "Ок")}
            </button>
            {variant === "confirm" && (
              <button
                onClick={onDismiss}
                style={{
                  border: "none",
                  cursor: "pointer",
                  fontFamily: t.font.family,
                  fontSize: 16,
                  padding: `${t.space.sm}px ${t.space.lg}px`,
                  borderRadius: t.radius.pill,
                  background: t.color.surfaceMuted,
                  color: t.color.ink,
                }}
              >
                Отмена
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
