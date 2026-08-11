import { cn } from "@/lib/utils";
import type { ShapeKind } from "@/data/catalog";

/**
 * Abstract SVG composition used in place of product photography.
 * Purely decorative: the accessible name always lives on the surrounding card.
 */
export function PreviewVisual({
  shape,
  className,
  tone = "light",
}: {
  shape: ShapeKind;
  className?: string;
  tone?: "light" | "dark";
}) {
  const bg =
    tone === "dark"
      ? "from-onyx to-obsidian"
      : "from-[color-mix(in_oklab,var(--sand)_88%,white)] to-[color-mix(in_oklab,var(--rose)_22%,var(--ivory))]";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative grid h-full w-full place-items-center overflow-hidden rounded-[inherit] bg-gradient-to-br",
        bg,
        className,
      )}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-[72%] w-[72%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id={`g-${shape}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--aubergine)" stopOpacity="0.92" />
            <stop offset="100%" stopColor="var(--rose)" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`gc-${shape}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--champagne)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="168" rx="58" ry="9" fill="var(--obsidian)" opacity="0.1" />

        {shape === "pedestal" && (
          <g>
            <rect x="66" y="96" width="68" height="66" rx="14" fill={`url(#g-${shape})`} />
            <rect x="80" y="40" width="40" height="60" rx="20" fill={`url(#gc-${shape})`} />
            <circle cx="100" cy="40" r="12" fill="var(--obsidian)" opacity="0.75" />
          </g>
        )}

        {shape === "plane" && (
          <g>
            <path d="M36 150 L100 36 L164 150 Z" fill={`url(#g-${shape})`} opacity="0.95" />
            <path d="M100 36 L164 150 L100 128 Z" fill="var(--obsidian)" opacity="0.2" />
            <path d="M56 150 L100 74 L144 150 Z" fill={`url(#gc-${shape})`} opacity="0.55" />
          </g>
        )}

        {shape === "orb" && (
          <g>
            <circle cx="100" cy="100" r="58" fill={`url(#g-${shape})`} />
            <circle cx="82" cy="80" r="18" fill="var(--ivory)" opacity="0.35" />
            <ellipse
              cx="100"
              cy="100"
              rx="82"
              ry="24"
              fill="none"
              stroke={`url(#gc-${shape})`}
              strokeWidth="3"
              transform="rotate(-18 100 100)"
            />
          </g>
        )}

        {shape === "prism" && (
          <g>
            <path d="M100 30 L158 132 L42 132 Z" fill={`url(#g-${shape})`} />
            <path d="M100 30 L158 132 L100 132 Z" fill="var(--obsidian)" opacity="0.22" />
            <rect x="70" y="132" width="60" height="26" rx="10" fill={`url(#gc-${shape})`} />
          </g>
        )}
      </svg>
    </div>
  );
}
