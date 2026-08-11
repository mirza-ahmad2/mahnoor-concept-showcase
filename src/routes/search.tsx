import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Search as SearchIcon } from "lucide-react";
import { PageTransition, PageHeader, EmptyState, DisclosureNote } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { searchProducts } from "@/data/catalog";
import { PREVIEW_NOTE } from "@/config/site";

type SearchQuery = z.infer<typeof querySchema>;

const querySchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: querySchema,
  head: () => ({
    meta: [
      { title: "Search | Mahnoor" },
      {
        name: "description",
        content: "Search the sample preview catalog by name or description.",
      },
      { property: "og:title", content: "Search | Mahnoor" },
      { property: "og:description", content: "Search the sample preview catalog." },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/search" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [term, setTerm] = useState(q ?? "");

  const query = (q ?? "").trim();
  const results = query ? searchProducts(query) : [];

  return (
    <PageTransition>
      <main id="main">
        <PageHeader eyebrow="Search" title="Find a preview item">
          <form
            role="search"
            className="mt-8 flex max-w-xl gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              void navigate({
                search: (prev: SearchQuery) => ({ ...prev, q: term.trim() || undefined }),
              });
            }}
          >
            <label htmlFor="site-search" className="sr-only">
              Search preview items
            </label>
            <div className="relative flex-1">
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="site-search"
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search the sample catalog"
                className="w-full rounded-full border border-border bg-card py-3.5 pr-4 pl-11 text-sm outline-none transition-colors focus-visible:border-ring"
              />
            </div>
            <button
              type="submit"
              className="tap-target inline-flex items-center rounded-full bg-obsidian px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
            >
              Search
            </button>
          </form>
          <DisclosureNote className="mt-6">{PREVIEW_NOTE}</DisclosureNote>
        </PageHeader>

        <div className="shell pb-28 md:pb-36">
          <p aria-live="polite" className="mb-8 text-sm text-muted-foreground">
            {query
              ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
              : "Enter a term to search the sample catalog."}
          </p>

          {query && results.length === 0 ? (
            <EmptyState
              title="No matches found"
              description="Try a different word, or browse the full sample catalog."
              action={
                <Link
                  to="/shop"
                  className="tap-target mt-2 inline-flex items-center rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                >
                  Browse the shop
                </Link>
              }
            />
          ) : null}

          {results.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
              {results.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </PageTransition>
  );
}
