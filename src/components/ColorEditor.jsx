import { useTokenStore } from "../store/useTokenStore";

export default function ColorEditor() {
  const {
    computedTokens,
    updateToken,
    lockToken,
    lockedTokens
  } = useTokenStore();

  if (!computedTokens) return null;

  const colors = computedTokens.colors;

  return (
    <div>
      {Object.entries(colors).map(([key, val]) => {
        const isLocked = !!lockedTokens?.colors?.[key];

        return (
          <div
            key={key}
            className="flex items-center gap-2 py-2 px-1 rounded transition-all"
            style={{
              border: isLocked
                ? "1px solid #0a66c2"
                : "1px solid transparent",

              boxShadow: isLocked
                ? "0 0 0 2px rgba(10,102,194,0.15)"
                : "none",

              marginBottom: "4px",
            }}
          >
            <label className="cursor-pointer relative">
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: val,
                  border: "1px solid #d6e4f7",
                }}
              />

              <input
                type="color"
                value={val}
                disabled={isLocked}
                onChange={(e) =>
                  updateToken(`colors.${key}`, e.target.value)
                }
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>

            <span className="text-sm text-[#1a1a2e] capitalize flex-1">
              {key}
            </span>

            <span className="text-xs text-[#6b7a99] font-mono">
              {val}
            </span>

            <button
              onClick={() =>
                lockToken(`colors.${key}`, val)
              }
              title={isLocked ? "Unlock token" : "Lock token"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                color: isLocked ? "#0a66c2" : "#b0bec5",
                transition: "all 200ms",
                transform: isLocked ? "scale(1.2)" : "scale(1)",
              }}
            >
              {isLocked ? "🔒" : "🔓"}
            </button>
          </div>
        );
      })}
    </div>
  );
}