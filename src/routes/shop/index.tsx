import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { PageTransition, PageHeader, DisclosureNote, EmptyState } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { previewProducts } from "@/data/catalog";
import { PREVIEW_NOTE } from "@/config/site";

type ShopSearch = z.infer<typeof searchSchema>;

const searchSchema = z.object({
  q: z.string().optional(),
  sort: z.enum(["featured", "az", "za"]).optional(),
});

export const Route = createFileRoute("/shop/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop | Mahnoor" },
      {
        name: "description",
        content:
          "Browse the sample catalog of this storefront concept. Preview items demonstrate the full shopping experience.",
      },
      { property: "og:title", content: "Shop | Mahnoor" },
      {
        property: "og:description",
        content: "A responsive product grid with quick add, search and sorting.",
      },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/shop" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/shop" }],
  }),
  component: ShopPage,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
] as const;

function ShopPage() {
  const { q = "", sort = "featured" } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = query
      ? previewProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(query) || p.caption.toLowerCase().includes(query),
        )
      : [...previewProducts];
    if (sort === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") filtered.sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  }, [q, sort]);

  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="All items"
          title="Shop"
          description="A complete browsing surface built around a sample catalog, ready to be swapped for a real product feed."
        >
          <DisclosureNote className="mt-7">{PREVIEW_NOTE}</DisclosureNote>
        </PageHeader>

        <div className="shell pb-24 md:pb-32">
          <div className="flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <label htmlFor="shop-search" className="sr-only">
                Search sample catalog
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="shop-search"
                type="search"
                value={q}
                placeholder="Search preview items"
                onChange={(event) =>
                  navigate({
                    search: (prev: ShopSearch) => ({ ...prev, q: event.target.value || undefined }),
                    replace: true,
                  })
                }
                className="tap-target w-full rounded-full border border-border bg-card pr-4 pl-10 text-sm outline-none focus-visible:border-ring"
              />
            </div>

            <div className="flex items-center gap-2">
              <span id="sort-label" className="text-xs tracking-wide text-muted-foreground uppercase">
                Sort
              </span>
              <div role="group" aria-labelledby="sort-label" className="flex gap-1">
                {sortOptions.map((option) => {
                  const active = option.value === sort;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        navigate({
                          search: (prev: ShopSearch) => ({
                            ...prev,
                            sort: option.value === "featured" ? undefined : option.value,
                          }),
                          replace: true,
                        })
                      }
                      className={
                        "tap-target rounded-full px-4 text-sm font-medium transition-colors " +
                        (active
                          ? "bg-obsidian text-ivory"
                          : "border border-border text-muted-foreground hover:bg-card")
                      }
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            {results.length} {results.length === 1 ? "item" : "items"}
          </p>

          {results.length === 0 ? (
            <EmptyState
              className="mt-8"
              title="No matching preview items"
              description="Try a different term, or clear the search to see the full sample catalog."
              action={
                <Link
                  to="/shop"
                  search={{}}
                  className="tap-target inline-flex items-center rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                >
                  Clear search
                </Link>
              }
            />
          ) : (
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
              {results.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
