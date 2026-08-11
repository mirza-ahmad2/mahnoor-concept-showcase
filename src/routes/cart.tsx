import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageTransition, PageHeader, EmptyState, DisclosureNote } from "@/components/site/Layout";
import { CartLineItem, PRICING_NOTE } from "@/components/site/Cart";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart | Mahnoor" },
      {
        name: "description",
        content: "Review the preview items you have added before starting the demo checkout.",
      },
      { property: "og:title", content: "Your cart | Mahnoor" },
      { property: "og:description", content: "Review your selected preview items." },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, count, clear, hydrated } = useCart();

  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="Cart"
          title="Your selection"
          description={hydrated ? `${count} item${count === 1 ? "" : "s"} selected.` : undefined}
        />

        <div className="shell pb-28 md:pb-36">
          {hydrated && lines.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Browse the sample catalog and add a preview item to see how the cart behaves."
              action={
                <Link
                  to="/shop"
                  className="tap-target mt-2 inline-flex items-center gap-2 rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                >
                  Browse the shop
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          ) : null}

          {lines.length > 0 ? (
            <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
              <section aria-label="Cart items">
                <ul className="card-surface divide-y divide-border px-5 md:px-7">
                  {lines.map((line) => (
                    <CartLineItem
                      key={line.slug}
                      slug={line.slug}
                      title={line.product.title}
                      shape={line.product.shape}
                      quantity={line.quantity}
                    />
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={clear}
                  className="tap-target mt-5 inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Clear cart
                </button>
              </section>

              <section aria-labelledby="summary-heading">
                <div className="card-surface p-7 lg:sticky lg:top-28">
                  <h2 id="summary-heading" className="font-display text-2xl">
                    Summary
                  </h2>

                  <dl className="mt-6 space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Items</dt>
                      <dd className="font-medium">{count}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Subtotal</dt>
                      <dd className="font-medium">To be added</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Delivery</dt>
                      <dd className="font-medium">To be confirmed</dd>
                    </div>
                  </dl>

                  <Link
                    to="/checkout"
                    className="tap-target mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                  >
                    Continue to demo checkout
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>

                  <DisclosureNote className="mt-5">{PRICING_NOTE}</DisclosureNote>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </main>
    </PageTransition>
  );
}
