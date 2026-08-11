import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Wordmark } from "./Brand";
import { primaryNav } from "@/config/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const transparent = overHero && !scrolled && !menuOpen;
  const iconTone = transparent ? "text-ivory" : "text-foreground";

  return (
    <>
      <motion.header
        {...(reduce
          ? {}
          : {
              initial: { y: -24, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
            })}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          transparent
            ? "bg-transparent"
            : "border-b border-border bg-background/85 shadow-soft backdrop-blur-xl",
        )}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center gap-4 md:h-20">
          <div className="flex flex-1 items-center">
            <Wordmark tone={transparent ? "light" : "dark"} />
          </div>

          <ul className="hidden items-center gap-9 md:flex">
            {primaryNav.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    "link-underline text-sm font-medium tracking-wide transition-colors",
                    transparent ? "text-ivory/85 hover:text-ivory" : "text-foreground/80 hover:text-foreground",
                  )}
                  activeProps={{ className: transparent ? "text-champagne" : "text-aubergine" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 items-center justify-end gap-1">
            <Link
              to="/search"
              aria-label="Search the sample catalog"
              className={cn(
                "tap-target grid place-items-center rounded-full transition-colors hover:bg-foreground/10",
                iconTone,
              )}
            >
              <Search aria-hidden="true" className="size-5" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              className={cn(
                "tap-target relative grid place-items-center rounded-full transition-colors hover:bg-foreground/10",
                iconTone,
              )}
            >
              <ShoppingBag aria-hidden="true" className="size-5" />
              {count > 0 ? (
                <span className="absolute top-1 right-1 grid size-4.5 min-w-4.5 place-items-center rounded-full bg-aubergine px-1 text-[0.6rem] font-bold text-ivory">
                  {count}
                </span>
              ) : null}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "tap-target grid place-items-center rounded-full transition-colors hover:bg-foreground/10 md:hidden",
                iconTone,
              )}
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
      />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="obsidian-panel grain fixed inset-0 z-60 flex flex-col md:hidden"
        >
          <div className="shell flex h-16 items-center justify-between">
            <span className="font-display text-2xl text-ivory">Mahnoor</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="tap-target grid place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center gap-2 pb-24">
            {primaryNav.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i + 0.05, duration: 0.4 }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="font-display block py-3 text-4xl text-ivory"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex gap-3">
              <Link
                to="/search"
                onClick={onClose}
                className="tap-target inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-3 text-sm text-ivory"
              >
                <Search aria-hidden="true" className="size-4" /> Search
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="tap-target inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-obsidian"
              >
                <ShoppingBag aria-hidden="true" className="size-4" /> Cart
              </Link>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
