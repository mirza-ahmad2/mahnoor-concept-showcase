import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { PreviewVisual } from "./PreviewVisual";
import { ProductBadge } from "./ProductBadge";
import { PRICE_PLACEHOLDER } from "@/config/site";
import type { PreviewProduct } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
  className,
}: {
  product: PreviewProduct;
  index?: number;
  className?: string;
}) {
  const { add } = useCart();
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={cn("group relative flex flex-col", className)}
      {...(reduce
        ? {}
        : {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-8% 0px" },
            transition: {
              duration: 0.6,
              delay: Math.min(index * 0.07, 0.35),
              ease: [0.22, 1, 0.36, 1] as const,
            },
          })}
    >
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
        <div className="aspect-4/5 w-full">
          <PreviewVisual shape={product.shape} />
        </div>

        <ProductBadge className="absolute top-3 left-3 z-10" />

        <button
          type="button"
          onClick={() => add(product.slug)}
          className="tap-target absolute right-3 bottom-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-obsidian px-4 py-2.5 text-xs font-semibold tracking-wide text-ivory opacity-100 shadow-lift transition-all duration-300 hover:bg-aubergine md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          Quick add
          <span className="sr-only">{product.title} to cart</span>
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg leading-tight">
            <Link
              to="/shop/$slug"
              params={{ slug: product.slug }}
              className="link-underline before:absolute before:inset-0 before:content-['']"
            >
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.caption}</p>
        </div>
        <span className="shrink-0 text-sm font-medium text-slate">{PRICE_PLACEHOLDER}</span>
      </div>
    </motion.article>
  );
}
