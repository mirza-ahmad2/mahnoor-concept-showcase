import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { PreviewVisual } from "./PreviewVisual";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const PRICING_NOTE = "Pricing will be added when the final catalog is supplied.";

export function QuantitySelector({
  value,
  onChange,
  label,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center rounded-full border border-border bg-card", className)}
      role="group"
      aria-label={`Quantity for ${label}`}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className="tap-target grid place-items-center rounded-full transition-colors hover:bg-muted"
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus aria-hidden="true" className="size-4" />
      </button>
      <span aria-live="polite" className="min-w-8 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="tap-target grid place-items-center rounded-full transition-colors hover:bg-muted"
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

export function CartLineItem({
  slug,
  title,
  shape,
  quantity,
  compact = false,
}: {
  slug: string;
  title: string;
  shape: Parameters<typeof PreviewVisual>[0]["shape"];
  quantity: number;
  compact?: boolean;
}) {
  const { setQuantity, remove } = useCart();

  return (
    <li className="flex gap-4 py-5">
      <div
        className={cn(
          "shrink-0 overflow-hidden rounded-2xl bg-muted",
          compact ? "size-20" : "size-24 md:size-28",
        )}
      >
        <PreviewVisual shape={shape} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/shop/$slug"
            params={{ slug }}
            className="link-underline block truncate text-base font-medium"
          >
            {title}
          </Link>
          <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-aubergine uppercase">
            Preview item
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <QuantitySelector
            value={quantity}
            label={title}
            onChange={(next) => setQuantity(slug, next)}
          />
          <button
            type="button"
            onClick={() => remove(slug)}
            className="tap-target inline-flex items-center gap-1.5 px-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 aria-hidden="true" className="size-3.5" />
            Remove<span className="sr-only"> {title} from cart</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer() {
  const { isOpen, closeCart, lines, count, lastAction } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
      return () => {
        document.body.style.overflow = previous;
        returnFocusRef.current?.focus?.();
      };
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <>
      <span aria-live="polite" className="sr-only">
        {lastAction}
      </span>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCart}
              className="fixed inset-0 z-70 bg-obsidian/55 backdrop-blur-[2px]"
              aria-hidden="true"
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-80 flex w-full max-w-md flex-col bg-background shadow-lift"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="font-display text-2xl">
                  Cart{" "}
                  <span className="font-sans text-sm text-muted-foreground">
                    ({count} {count === 1 ? "item" : "items"})
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="tap-target grid place-items-center rounded-full transition-colors hover:bg-muted"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5">
                {lines.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                    <p className="font-display text-2xl">Your cart is empty</p>
                    <p className="max-w-xs text-sm text-muted-foreground">
                      Add a sample preview item to see how the shopping flow behaves.
                    </p>
                    <Link
                      to="/shop"
                      onClick={closeCart}
                      className="tap-target inline-flex items-center rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                    >
                      Browse the shop
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {lines.map((line) => (
                      <CartLineItem
                        key={line.slug}
                        slug={line.slug}
                        title={line.product.title}
                        shape={line.product.shape}
                        quantity={line.quantity}
                        compact
                      />
                    ))}
                  </ul>
                )}
              </div>

              {lines.length > 0 ? (
                <div className="border-t border-border bg-muted/50 px-5 py-5">
                  <p className="text-sm text-muted-foreground">{PRICING_NOTE}</p>
                  <div className="mt-4 grid gap-2">
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="tap-target inline-flex items-center justify-center rounded-full bg-obsidian px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                    >
                      Continue
                    </Link>
                    <Link
                      to="/cart"
                      onClick={closeCart}
                      className="tap-target inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-card"
                    >
                      View full cart
                    </Link>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
