import { useTokenStore } from "../store/useTokenStore";

export default function PreviewGrid() {
  const { computedTokens, status, url } = useTokenStore();

  if (status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-24">
        <div className="text-5xl mb-4">🎨</div>
        <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">
          Paste a URL to get started
        </h2>
        <p className="text-sm text-[#6b7a99]">
          StyleSync will extract colors, fonts, and spacing from any website.
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="p-8 space-y-6">
        <p className="text-sm text-[#6b7a99] animate-pulse">⚙ Parsing DOM tree...</p>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 bg-[#e8f1fb] rounded animate-pulse w-32" />
            <div className="h-12 bg-[#e8f1fb] rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-24">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-xl font-semibold text-[#d32f2f] mb-2">
          This site blocks scanners
        </h2>
        <p className="text-sm text-[#6b7a99] mb-6">
          Bot protection or CORS policy prevented analysis. A fallback style guide has been applied.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => useTokenStore.getState().resetState?.()}
            className="px-4 py-2 bg-[#0a66c2] text-white rounded text-sm"
          >
            Try Another URL
          </button>
          <button className="px-4 py-2 border border-[#0a66c2] text-[#0a66c2] rounded text-sm">
            Enter Tokens Manually
          </button>
        </div>
      </div>
    );
  }

  if (!computedTokens) return null;

  return (
    <div className="p-8 space-y-10">

      {/* Site info banner */}
      {url && (
        <div className="border-l-4 border-[#0a66c2] pl-4 py-2 bg-[#f0f7ff] rounded-r">
          <p className="text-sm text-[#6b7a99]">
            Style guide extracted from{" "}
            <span className="font-semibold text-[#0a66c2]">
              {url.replace(/^https?:\/\//, "")}
            </span>{" "}
            • just now
          </p>
        </div>
      )}

      {/* ── BUTTONS ─────────────────────────────────────────── */}
      <section>
        <p className="text-xs uppercase tracking-widest text-[#6b7a99] mb-4">
          Buttons
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <button
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "10px 20px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-body)",
              border: "none",
              cursor: "pointer",
              transition: "opacity 150ms",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.85}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Primary Action
          </button>

          <button
            style={{
              background: "var(--color-secondary)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "10px 20px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-body)",
              border: "none",
              cursor: "pointer",
              transition: "opacity 150ms",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.85}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Secondary
          </button>

          <button
            style={{
              background: "transparent",
              color: "var(--color-primary)",
              borderRadius: "var(--radius-md)",
              padding: "10px 20px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-body)",
              border: "1.5px solid var(--color-primary)",
              cursor: "pointer",
            }}
          >
            Ghost Button
          </button>

          <button
            disabled
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "10px 20px",
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-body)",
              border: "none",
              opacity: 0.4,
              cursor: "not-allowed",
            }}
          >
            Disabled
          </button>
        </div>
      </section>

      {/* ── INPUT FIELDS ─────────────────────────────────────── */}
      <section>
        <p className="text-xs uppercase tracking-widest text-[#6b7a99] mb-4">
          Input Fields
        </p>
        <div className="flex flex-wrap gap-4">
          {/* Default */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6b7a99]">Default</label>
            <input
              placeholder="Default input"
              style={{
                border: "1px solid #d6e4f7",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                width: "200px",
                background: "var(--color-background)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-body)",
                outline: "none",
                color: "var(--color-text)",
              }}
            />
          </div>

          {/* Focus (always-on simulation) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6b7a99]">Focus</label>
            <input
              placeholder="Focused input"
              defaultValue="Focused input"
              style={{
                border: "2px solid var(--color-primary)",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                width: "200px",
                background: "var(--color-background)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-body)",
                outline: "none",
                boxShadow: "0 0 0 3px rgba(10,102,194,0.15)",
                color: "var(--color-text)",
              }}
            />
          </div>

          {/* Error */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#6b7a99]">Error</label>
            <input
              placeholder="Error input"
              defaultValue="wrong@"
              style={{
                border: "2px solid #d32f2f",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                width: "200px",
                background: "var(--color-background)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-body)",
                outline: "none",
                color: "var(--color-text)",
              }}
            />
            <span style={{ color: "#d32f2f", fontSize: "12px" }}>
              This field is required
            </span>
          </div>
        </div>
      </section>

      {/* ── CARDS ─────────────────────────────────────────────── */}
      <section>
        <p className="text-xs uppercase tracking-widest text-[#6b7a99] mb-4">
          Cards
        </p>
        <div className="flex flex-wrap gap-5">
          {/* Elevated card */}
          <div
            style={{
              background: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-md)",
              padding: "24px",
              width: "240px",
            }}
          >
            <span
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
              }}
            >
              Design
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h3)",
                color: "var(--color-text)",
                margin: "12px 0 8px",
                lineHeight: 1.2,
              }}
            >
              Card Title
            </h3>
            <p
              style={{
                color: "var(--color-muted-text)",
                fontSize: "var(--font-size-body)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.5,
                marginBottom: "16px",
              }}
            >
              A short description that supports the card heading with more context.
            </p>
            <button
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                padding: "8px 16px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              View More
            </button>
          </div>

          {/* Outlined card */}
          <div
            style={{
              background: "var(--color-background)",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid var(--color-primary)",
              padding: "24px",
              width: "240px",
            }}
          >
            <span
              style={{
                background: "transparent",
                color: "var(--color-primary)",
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Outlined
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h3)",
                color: "var(--color-text)",
                margin: "12px 0 8px",
                lineHeight: 1.2,
              }}
            >
              Card Title
            </h3>
            <p
              style={{
                color: "var(--color-muted-text)",
                fontSize: "var(--font-size-body)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.5,
                marginBottom: "16px",
              }}
            >
              Same card structure, outlined variant with no shadow.
            </p>
            <button
              style={{
                background: "transparent",
                color: "var(--color-primary)",
                border: "1.5px solid var(--color-primary)",
                borderRadius: "var(--radius-md)",
                padding: "8px 16px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {/* ── TYPOGRAPHY SCALE ─────────────────────────────────── */}
      <section>
        <p className="text-xs uppercase tracking-widest text-[#6b7a99] mb-4">
          Typography Scale
        </p>
        <div className="space-y-3">
          {[
            { tag: "H1", sizeVar: "--font-size-h1", font: "--font-heading", label: "h1 · Heading Display" },
            { tag: "H2", sizeVar: "--font-size-h2", font: "--font-heading", label: "h2 · Section Heading" },
            { tag: "H3", sizeVar: "--font-size-h3", font: "--font-heading", label: "h3 · Sub Heading" },
            { tag: "Body", sizeVar: "--font-size-body", font: "--font-body", label: "body · Body Text" },
            { tag: "Caption", sizeVar: "--font-size-caption", font: "--font-body", label: "caption · Supporting Text", muted: true },
          ].map(({ tag, sizeVar, font, label, muted }) => (
            <div key={tag} className="flex items-baseline justify-between border-b border-[#e8f1fb] pb-3">
              <span
                style={{
                  fontFamily: `var(${font})`,
                  fontSize: `var(${sizeVar})`,
                  color: muted ? "var(--color-muted-text)" : "var(--color-text)",
                  lineHeight: tag === "H1" || tag === "H2" || tag === "H3" ? 1.2 : 1.5,
                }}
              >
                {label}
              </span>
              <span className="text-xs text-[#6b7a99] ml-4 shrink-0 font-mono">
                {sizeVar}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}