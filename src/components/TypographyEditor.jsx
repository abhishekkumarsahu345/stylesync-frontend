import { useTokenStore } from "../store/useTokenStore";

export default function TypographyEditor() {
  const {
    computedTokens,
    updateToken,
    lockToken,
    lockedTokens
  } = useTokenStore();

  if (!computedTokens) return null;

  const typo = computedTokens.typography;

  return (
    <div className="mb-4">
      <h3 className="text-xs uppercase tracking-widest text-[#6b7a99] mb-2">
        Typography
      </h3>

      {[
        ["headingFont", "Heading Font"],
        ["bodyFont", "Body Font"],
        ["baseSize", "Base Size"]
      ].map(([field, label]) => {
        const isLocked = !!lockedTokens?.typography?.[field];

        return (
          <div key={field} className="my-2">
            <label className="text-xs text-[#6b7a99]">
              {label}
            </label>

            <div className="flex gap-2 mt-1">
              <input
                className="flex-1 px-2 py-1 text-sm border rounded"
                style={{
                  borderColor: isLocked
                    ? "#0a66c2"
                    : "#d6e4f7"
                }}
                value={typo[field]}
                disabled={isLocked}
                onChange={(e) =>
                  updateToken(
                    `typography.${field}`,
                    e.target.value
                  )
                }
              />

              <button
                onClick={() =>
                  lockToken(
                    `typography.${field}`,
                    typo[field]
                  )
                }
              >
                {isLocked ? "🔒" : "🔓"}
              </button>
            </div>
          </div>
        );
      })}

      <div className="my-2">
        <label className="text-xs text-[#6b7a99] mb-1 block">
          Scale
        </label>

        {Object.entries(typo.scale).map(([tag, size]) => {
          const isLocked =
            !!lockedTokens?.typography?.scale?.[tag];

          return (
            <div
              key={tag}
              className="flex items-center gap-2 my-1"
            >
              <span className="w-10 text-xs font-mono text-[#6b7a99]">
                {tag}
              </span>

              <input
                className="flex-1 px-2 py-1 text-sm border rounded"
                style={{
                  borderColor: isLocked
                    ? "#0a66c2"
                    : "#d6e4f7"
                }}
                value={size}
                disabled={isLocked}
                onChange={(e) =>
                  updateToken(
                    `typography.scale.${tag}`,
                    e.target.value
                  )
                }
              />

              <button
                onClick={() =>
                  lockToken(
                    `typography.scale.${tag}`,
                    size
                  )
                }
              >
                {isLocked ? "🔒" : "🔓"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}