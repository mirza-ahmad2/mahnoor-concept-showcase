import { cn } from "@/lib/utils";

/** Consistent, honest label for placeholder catalog entries. */
export function ProductBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-aubergine/25 bg-card/90 px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-aubergine backdrop-blur-sm",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-aubergine" />
      Preview item
    </span>
  );
}
