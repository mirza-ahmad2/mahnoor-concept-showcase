import { createFileRoute } from "@tanstack/react-router";
import { previewProducts } from "@/data/catalog";

const BASE = "https://mahnoor-concept-showcase.lovable.app";

const staticPaths = ["/", "/shop", "/collections", "/about", "/contact", "/search", "/privacy", "/terms"];

export const Route = createFileRoute("/sitemap[.]xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...staticPaths,
          ...previewProducts.map((product) => `/shop/${product.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${BASE}${path}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
