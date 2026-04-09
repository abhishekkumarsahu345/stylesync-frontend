import { useTokenStore } from "../store/useTokenStore";

export default function SpacingEditor() {
  const {
    computedTokens,
    updateToken,
    lockToken,
    lockedTokens
  } = useTokenStore();

  if (!computedTokens) return null;

  const spacing = computedTokens.spacing;

  const isLocked = !!lockedTokens?.spacing?.unit;

  return (
    <div className="mb-4">
      <h3 className="text-xs uppercase tracking-widest text-[#6b7a99] mb-2">
        Spacing
      </h3>

      <div className="my-2">
        <label className="text-xs text-[#6b7a99]">
          Base Unit (px)
        </label>

        <div className="flex gap-2 mt-1">
          <input
            type="number"
            className="flex-1 px-2 py-1 text-sm border rounded"
            style={{
              borderColor: isLocked
                ? "#0a66c2"
                : "#d6e4f7"
            }}
            value={spacing.unit}
            disabled={isLocked}
            onChange={(e) =>
              updateToken(
                "spacing.unit",
                Number(e.target.value)
              )
            }
          />

          <button
            onClick={() =>
              lockToken(
                "spacing.unit",
                spacing.unit
              )
            }
          >
            {isLocked ? "🔒" : "🔓"}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <label className="text-xs text-[#6b7a99] mb-2 block">
          Scale Preview
        </label>

        <div className="flex items-end gap-1">
          {spacing.scale.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1"
            >
              <div
                className="bg-[#e8f1fb] border border-[#0a66c2] rounded"
                style={{
                  width: `${Math.max(
                    step * spacing.unit,
                    4
                  )}px`,
                  height: "20px",
                }}
              />

              <span className="text-[10px] text-[#6b7a99]">
                {step * spacing.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}