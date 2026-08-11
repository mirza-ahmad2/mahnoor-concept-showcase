import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageTransition, Breadcrumbs, DisclosureNote } from "@/components/site/Layout";
import { ProductBadge } from "@/components/site/ProductBadge";
import { PreviewVisual } from "@/components/site/PreviewVisual";
import { QuantitySelector } from "@/components/site/Cart";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, previewProducts, type ShapeKind } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { PREVIEW_NOTE } from "@/config/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Item unavailable | Mahnoor" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.product.title} | Mahnoor`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `${loaderData.product.title} is a sample preview item used to demonstrate the product page layout.`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "A sample preview item demonstrating the product page layout.",
        },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/shop/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/shop/${params.slug}` }],
    };
  },
  component: ProductDetail,
});

const galleryAngles: { key: string; shape: ShapeKind; label: string }[] = [
  { key: "front", shape: "pedestal", label: "Front composition" },
  { key: "side", shape: "plane", label: "Side composition" },
  { key: "detail", shape: "orb", label: "Detail composition" },
];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeView, setActiveView] = useState(0);

  const views = [
    { key: "primary", shape: product.shape, label: "Primary composition" },
    ...galleryAngles.filter((angle) => angle.shape !== product.shape).slice(0, 2),
  ];
  const related = previewProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <PageTransition>
      <main id="main">
        <div className="shell pt-28 md:pt-36">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: product.title },
            ]}
          />
        </div>

        <div className="shell grid gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
          <section aria-label="Product visuals">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-card shadow-soft">
              <div className="aspect-4/5 w-full md:aspect-square">
                <PreviewVisual shape={views[activeView]?.shape ?? product.shape} />
              </div>
              <ProductBadge className="absolute top-4 left-4" />
            </div>

            <div className="mt-4 flex gap-3">
              {views.map((view, index) => (
                <button
                  key={view.key}
                  type="button"
                  onClick={() => setActiveView(index)}
                  aria-pressed={activeView === index}
                  aria-label={`Show ${view.label}`}
                  className={cn(
                    "size-20 overflow-hidden rounded-2xl border-2 transition-colors md:size-24",
                    activeView === index ? "border-aubergine" : "border-transparent hover:border-border",
                  )}
                >
                  <PreviewVisual shape={view.shape} />
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Purchase options">
            <div className="lg:sticky lg:top-28">
              <ProductBadge />
              <h1 className="display-lg mt-4">{product.title}</h1>
              <p className="mt-3 text-sm text-muted-foreground">{product.caption}</p>

              <p className="mt-6 text-lg font-semibold text-aubergine">Price to be added</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <QuantitySelector value={quantity} label={product.title} onChange={(next) => setQuantity(Math.max(1, next))} />
                <button
                  type="button"
                  onClick={() => add(product.slug, quantity)}
                  className="tap-target inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                >
                  <ShoppingBag aria-hidden="true" className="size-4" />
                  Add to cart
                </button>
              </div>

              <DisclosureNote className="mt-6">
                This is a sample preview item shown to demonstrate the product page. {PREVIEW_NOTE}
              </DisclosureNote>

              <Accordion type="single" collapsible className="mt-8">
                <AccordionItem value="details">
                  <AccordionTrigger>Product details</AccordionTrigger>
                  <AccordionContent>Product information will be added when supplied.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery">
                  <AccordionTrigger>Delivery</AccordionTrigger>
                  <AccordionContent>
                    Delivery information will appear here once confirmed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>Returns</AccordionTrigger>
                  <AccordionContent>Return terms will appear here once confirmed.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>

        <section aria-labelledby="related-heading" className="shell pb-32 md:pb-32">
          <h2 id="related-heading" className="display-lg">
            Other preview items
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.slug} product={item} index={index} />
            ))}
          </div>
        </section>

        {/* Mobile sticky purchase bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg lg:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{product.title}</p>
              <p className="text-xs text-muted-foreground">Price to be added</p>
            </div>
            <button
              type="button"
              onClick={() => add(product.slug, quantity)}
              className="tap-target inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-ivory"
            >
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}

export function ProductNotFound() {
  return (
    <main id="main" className="shell py-40 text-center">
      <h1 className="display-lg">Preview item not found</h1>
      <Link to="/shop" className="link-underline mt-6 inline-block text-aubergine">
        Back to shop
      </Link>
    </main>
  );
}
