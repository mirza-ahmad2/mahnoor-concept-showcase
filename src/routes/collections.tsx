import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageTransition, PageHeader, DisclosureNote } from "@/components/site/Layout";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PreviewVisual } from "@/components/site/PreviewVisual";
import { previewCollections, previewProducts } from "@/data/catalog";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections | Mahnoor" },
      {
        name: "description",
        content:
          "A grouping framework ready to hold real product collections once the catalog is supplied.",
      },
      { property: "og:title", content: "Collections | Mahnoor" },
      {
        property: "og:description",
        content: "Preview collection modules showing how catalog grouping will be presented.",
      },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/collections" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="Framework"
          title="Collections"
          description="These modules show how groups of products will be presented. They are layout placeholders, not real categories."
        >
          <DisclosureNote className="mt-7">
            The structure is ready for real catalog grouping once content is supplied.
          </DisclosureNote>
        </PageHeader>

        <div className="shell space-y-20 pb-28 md:space-y-28 md:pb-36">
          {previewCollections.map((collection, index) => {
            const items = previewProducts.filter((p) => p.collection === collection.slug);
            const reversed = index % 2 === 1;

            return (
              <MotionReveal key={collection.slug} as="section">
                <div
                  className={
                    "grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] " +
                    (reversed ? "lg:[&>*:first-child]:order-2" : "")
                  }
                >
                  <div>
                    <p className="eyebrow text-aubergine">0{index + 1}</p>
                    <h2 className="display-lg mt-3">{collection.title}</h2>
                    <p className="lede mt-4 text-muted-foreground">{collection.note}</p>
                    <Link
                      to="/shop"
                      className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aubergine"
                    >
                      Browse sample items
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {items.map((item) => (
                      <Link
                        key={item.slug}
                        to="/shop/$slug"
                        params={{ slug: item.slug }}
                        className="group block"
                      >
                        <div className="aspect-4/5 overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow group-hover:shadow-lift">
                          <PreviewVisual shape={item.shape} />
                        </div>
                        <p className="mt-3 text-sm font-medium">{item.title}</p>
                        <p className="text-xs tracking-[0.14em] text-aubergine uppercase">
                          Preview item
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </main>
    </PageTransition>
  );
}
