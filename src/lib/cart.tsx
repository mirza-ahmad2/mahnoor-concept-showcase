import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type PreviewProduct } from "@/data/catalog";

export interface CartLine {
  slug: string;
  quantity: number;
}

export interface ResolvedCartLine extends CartLine {
  product: PreviewProduct;
}

interface CartContextValue {
  lines: ResolvedCartLine[];
  count: number;
  isOpen: boolean;
  hydrated: boolean;
  lastAction: string;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const STORAGE_KEY = "mahnoor.cart.v1";

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l): l is CartLine => {
        if (typeof l !== "object" || l === null) return false;
        const line = l as Partial<CartLine>;
        return typeof line.slug === "string" && typeof line.quantity === "number";
      })
      .map((l) => ({ slug: l.slug, quantity: Math.max(1, Math.min(99, Math.round(l.quantity))) }))
      .filter((l) => Boolean(getProduct(l.slug)));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState("");

  useEffect(() => {
    setLines(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart stays in memory for this session */
    }
  }, [lines, hydrated]);

  const add = useCallback((slug: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, quantity: Math.min(99, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { slug, quantity: Math.min(99, quantity) }];
    });
    setLastAction(`${product.title} added to cart`);
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(99, quantity) } : l)),
    );
    setLastAction("Cart updated");
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
    setLastAction("Item removed from cart");
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setLastAction("Cart cleared");
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const resolved = lines
      .map((line) => {
        const product = getProduct(line.slug);
        return product ? { ...line, product } : null;
      })
      .filter((l): l is ResolvedCartLine => l !== null);

    return {
      lines: resolved,
      count: resolved.reduce((sum, l) => sum + l.quantity, 0),
      isOpen,
      hydrated,
      lastAction,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, isOpen, hydrated, lastAction, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
