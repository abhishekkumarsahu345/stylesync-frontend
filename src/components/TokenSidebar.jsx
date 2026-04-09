import { useState } from "react";
import ColorEditor from "./ColorEditor";
import TypographyEditor from "./TypographyEditor";
import SpacingEditor from "./SpacingEditor";
import { useTokenStore } from "../store/useTokenStore";

function Section({ title, icon, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2 border-b border-[#d6e4f7]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#1a1a2e]">
          <span>{icon}</span>
          {title}
        </span>

        <span
          className="text-[#0a66c2] text-xs transition-transform duration-200"
          style={{
            transform: open
              ? "rotate(180deg)"
              : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function TokenSidebar() {
  const {
    status,
    fetchHistory,
    history
  } = useTokenStore();

  const [showHistory, setShowHistory] =
    useState(false);

  const openHistory = async () => {
    await fetchHistory();
    setShowHistory(true);
  };

  return (
    <div
      className="bg-[#e8f1fb] border-r border-[#d6e4f7] overflow-y-auto relative"
      style={{
        width: "280px",
        minHeight: "100%",
        padding: "16px",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] uppercase tracking-[0.08em] text-[#6b7a99] font-semibold">
          Extracted Tokens
        </p>

        {(status === "success" ||
          status === "error") && (
          <button
            onClick={openHistory}
            className="text-[10px] px-2 py-1 rounded bg-white border hover:bg-[#f3f7fd]"
          >
            History
          </button>
        )}
      </div>

      {status === "loading" && (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-[#d6e4f7] rounded animate-pulse"
            />
          ))}
        </div>
      )}

      {(status === "success" ||
        status === "error") && (
        <>
          <Section title="Colors" icon="🎨">
            <ColorEditor />
          </Section>

          <Section title="Typography" icon="Ⓣ">
            <TypographyEditor />
          </Section>

          <Section title="Spacing" icon="⇔">
            <SpacingEditor />
          </Section>
        </>
      )}

      {status === "idle" && (
        <div className="text-xs text-[#6b7a99] text-center mt-8">
          Tokens will appear here after analysis.
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] max-h-[500px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">
                Version History
              </h2>

              <button
                onClick={() =>
                  setShowHistory(false)
                }
              >
                ✕
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-sm text-gray-500">
                No history yet.
              </p>
            ) : (
              history.map((item, i) => (
                <div
                  key={item.id}
                  className="border rounded p-3 mb-2"
                >
                  <p className="text-xs text-[#6b7a99]">
                    Version #{history.length - i}
                  </p>

                  <p className="text-sm">
                    {new Date(
                      item.changed_at
                    ).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}