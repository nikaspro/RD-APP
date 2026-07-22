import { useState } from "react";
import { tokens } from "../../tokens/tokens.js";
import { registryByName } from "../registry.js";
import { buildArtifactSnippet } from "../bundler/inline.js";

const t = tokens;

function CopyButton({ label, getText }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error("clipboard failed", e);
    }
  }
  return (
    <button
      onClick={copy}
      style={{
        border: "none",
        cursor: "pointer",
        fontFamily: t.font.family,
        fontSize: 15,
        padding: `${t.space.sm}px ${t.space.md}px`,
        borderRadius: t.radius.pill,
        background: copied ? t.color.accent : t.color.surfaceMuted,
        color: copied ? t.color.surface : t.color.ink,
        transition: `background ${t.motion.duration}s ${t.motion.easing}`,
      }}
    >
      {copied ? "Скопировано" : label}
    </button>
  );
}

export default function CodePanel({ item }) {
  const [mode, setMode] = useState("import"); // import | artifact

  const importCode = item.raw;
  const artifactCode = buildArtifactSnippet(item, registryByName, tokens);
  const shown = mode === "import" ? importCode : artifactCode;

  const tab = (id, label) => (
    <button
      onClick={() => setMode(id)}
      style={{
        border: "none",
        cursor: "pointer",
        fontFamily: t.font.family,
        fontSize: 15,
        padding: `${t.space.xs}px ${t.space.md}px`,
        borderRadius: t.radius.pill,
        background: mode === id ? t.color.ink : "transparent",
        color: mode === id ? t.color.surface : t.color.textMuted,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        borderRadius: t.radius.card,
        background: t.color.surfaceMuted,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: t.space.sm,
          padding: `${t.space.md}px ${t.space.lg}px`,
        }}
      >
        <div style={{ display: "flex", gap: t.space.xs }}>
          {tab("import", "Импорт (Codex)")}
          {tab("artifact", "Для артефакта")}
        </div>
        <CopyButton label="Копировать" getText={() => shown} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: t.space.lg,
          maxHeight: 360,
          overflow: "auto",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 13,
          lineHeight: 1.55,
          color: t.color.ink,
          background: t.color.surface,
          whiteSpace: "pre",
        }}
      >
        {shown}
      </pre>
    </div>
  );
}
