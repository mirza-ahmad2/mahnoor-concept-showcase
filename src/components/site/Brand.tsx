import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Concept wordmark for the demo identity. */
export function Wordmark({
  className,
  tone = "auto",
}: {
  className?: string;
  tone?: "auto" | "light" | "dark";
}) {
  return (
    <Link
      to="/"
      className={cn(
        "font-display text-2xl leading-none tracking-tight transition-opacity hover:opacity-70 md:text-[1.7rem]",
        tone === "light" && "text-ivory",
        tone === "dark" && "text-obsidian",
        className,
      )}
      aria-label="Mahnoor — home"
    >
      Mahnoor
    </Link>
  );
}

/** Sculptural ML monogram built from SVG geometry. */
export function Monogram({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-16 w-16", className)}
      role="img"
      aria-label="ML monogram"
    >
      <defs>
        <linearGradient id="mono-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--aubergine)" />
          <stop offset="100%" stopColor="var(--rose)" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r="55"
        fill="none"
        stroke="url(#mono-grad)"
        strokeWidth="1.5"
        opacity="0.55"
        className={animated ? "origin-center motion-safe:animate-[spin_28s_linear_infinite]" : ""}
        strokeDasharray="6 10"
      />
      <path
        d="M28 82 V42 L47 68 L66 42 V82"
        fill="none"
        stroke="url(#mono-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M78 42 V82 H98"
        fill="none"
        stroke="var(--champagne)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
