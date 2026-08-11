import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/env-hooks";

const Scene = lazy(() => import("./CommerceSculpture"));

/** Static CSS/SVG stand-in shown before hydration, on reduced motion, or on failure. */
export function SculptureFallback() {
  return (
    <div aria-hidden="true" className="relative grid h-full w-full place-items-center">
      <div className="absolute size-[62%] rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--rose)_70%,transparent),transparent_65%)] blur-2xl" />
      <svg viewBox="0 0 300 300" className="relative h-[78%] w-[78%]" role="presentation">
        <defs>
          <linearGradient id="fb-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--rose)" />
            <stop offset="100%" stopColor="var(--aubergine)" />
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="228" rx="86" ry="16" fill="var(--champagne)" opacity="0.16" />
        <circle cx="150" cy="140" r="66" fill="url(#fb-a)" opacity="0.95" />
        <ellipse
          cx="150"
          cy="150"
          rx="118"
          ry="38"
          fill="none"
          stroke="var(--champagne)"
          strokeWidth="1.5"
          opacity="0.6"
          transform="rotate(-16 150 150)"
        />
        <rect x="106" y="204" width="88" height="24" rx="12" fill="var(--champagne)" opacity="0.35" />
      </svg>
    </div>
  );
}

/**
 * Lazily mounts the R3F sculpture only after first paint, on capable devices,
 * and only while visible. Falls back to a static composition otherwise.
 */
export function Hero3DScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const enable = ready && !reduce;

  return (
    <div ref={containerRef} className={className}>
      {enable ? (
        <Suspense fallback={<SculptureFallback />}>
          <Scene paused={!visible} />
        </Suspense>
      ) : (
        <SculptureFallback />
      )}
    </div>
  );
}

export default Hero3DScene;
