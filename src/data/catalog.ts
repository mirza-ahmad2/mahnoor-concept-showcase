/**
 * Sample preview catalog.
 *
 * These are interaction placeholders only — not real inventory. Every record is
 * flagged `isPreview: true` and surfaced in the UI with a "Preview item" badge.
 * Replace this module with a real API/CMS source without touching components.
 */

export type ShapeKind = "pedestal" | "plane" | "orb" | "prism";

export interface PreviewProduct {
  slug: string;
  title: string;
  /** Neutral, non-claiming descriptor of the placeholder composition. */
  caption: string;
  shape: ShapeKind;
  collection: "preview-collection-01" | "preview-collection-02" | "preview-collection-03";
  isPreview: true;
}

export const previewProducts: PreviewProduct[] = [
  {
    slug: "preview-item-01",
    title: "Preview Item 01",
    caption: "Placeholder composition — a sculpted pedestal form.",
    shape: "pedestal",
    collection: "preview-collection-01",
    isPreview: true,
  },
  {
    slug: "preview-item-02",
    title: "Preview Item 02",
    caption: "Placeholder composition — a folded plane in soft light.",
    shape: "plane",
    collection: "preview-collection-01",
    isPreview: true,
  },
  {
    slug: "preview-item-03",
    title: "Preview Item 03",
    caption: "Placeholder composition — a balanced orb study.",
    shape: "orb",
    collection: "preview-collection-02",
    isPreview: true,
  },
  {
    slug: "preview-item-04",
    title: "Preview Item 04",
    caption: "Placeholder composition — an angular prism study.",
    shape: "prism",
    collection: "preview-collection-02",
    isPreview: true,
  },
  {
    slug: "preview-item-05",
    title: "Preview Item 05",
    caption: "Placeholder composition — a stacked pedestal variation.",
    shape: "pedestal",
    collection: "preview-collection-03",
    isPreview: true,
  },
  {
    slug: "preview-item-06",
    title: "Preview Item 06",
    caption: "Placeholder composition — a drifting orb variation.",
    shape: "orb",
    collection: "preview-collection-03",
    isPreview: true,
  },
];

export const previewCollections = [
  {
    slug: "preview-collection-01",
    title: "Preview Collection 01",
    note: "A grouping module ready to hold a real product family.",
  },
  {
    slug: "preview-collection-02",
    title: "Preview Collection 02",
    note: "A second layout arrangement for a differently sized group.",
  },
  {
    slug: "preview-collection-03",
    title: "Preview Collection 03",
    note: "A compact grouping for smaller or seasonal sets.",
  },
] as const;

export function getProduct(slug: string): PreviewProduct | undefined {
  return previewProducts.find((p) => p.slug === slug);
}

export function searchProducts(query: string): PreviewProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return previewProducts;
  return previewProducts.filter(
    (p) => p.title.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q),
  );
}
