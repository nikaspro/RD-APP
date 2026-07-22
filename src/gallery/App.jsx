import { useState } from "react";
import { tokens } from "../../tokens/tokens.js";
import { sections } from "../registry.js";
import CodePanel from "./CodePanel.jsx";

const t = tokens;

function StateCard({ label, Component, props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: t.space.sm }}>
      <div
        style={{
          fontFamily: t.font.family,
          fontSize: 14,
          color: t.color.textMuted,
          textTransform: "lowercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          padding: t.space.xl,
          borderRadius: t.radius.card,
          background: t.color.surfaceMuted,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Component {...props} />
      </div>
    </div>
  );
}

function WidgetBlock({ item }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: t.space.lg }}>
      <div>
        <h2
          style={{
            margin: 0,
            fontFamily: t.font.family,
            fontSize: 22,
            fontWeight: 500,
            color: t.color.ink,
          }}
        >
          {item.name}
        </h2>
        <p
          style={{
            margin: `${t.space.xs}px 0 0`,
            fontFamily: t.font.family,
            fontSize: 16,
            color: t.color.textMuted,
          }}
        >
          {item.summary}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: t.space.lg,
        }}
      >
        {item.states.map((st) => (
          <StateCard
            key={st.label}
            label={st.label}
            Component={item.Component}
            props={st.props}
          />
        ))}
      </div>

      <CodePanel item={item} />
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const current = sections.find((s) => s.id === activeSection) || sections[0];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        fontFamily: t.font.family,
        color: t.color.ink,
        background: t.color.surface,
      }}
    >
      <aside
        style={{
          padding: t.space.xl,
          borderRight: `1px solid ${t.color.line}`,
          display: "flex",
          flexDirection: "column",
          gap: t.space.xl,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 500 }}>agent-kit</div>
          <div style={{ fontSize: 14, color: t.color.textMuted, marginTop: 2 }}>
            каталог виджетов
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: t.space.xs }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: t.font.family,
                fontSize: 16,
                padding: `${t.space.sm}px ${t.space.md}px`,
                borderRadius: t.radius.card,
                background: s.id === activeSection ? t.color.surfaceMuted : "transparent",
                color: s.id === activeSection ? t.color.ink : t.color.textMuted,
              }}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      <main
        style={{
          padding: `${t.space.xl * 1.5}px ${t.space.xl * 1.5}px`,
          display: "flex",
          flexDirection: "column",
          gap: t.space.xl * 1.5,
          maxWidth: 900,
        }}
      >
        <header>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 500 }}>{current.title}</h1>
        </header>
        {current.items.map((item) => (
          <WidgetBlock key={item.id} item={item} />
        ))}
      </main>
    </div>
  );
}
