import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartDrawer } from "@/components/site/Cart";
import { Monogram } from "@/components/site/Brand";
import { site } from "@/config/site";

function NotFoundComponent() {
  return (
    <main id="main" className="grain flex min-h-[80vh] items-center justify-center px-4 py-32">
      <div className="max-w-md text-center">
        <Monogram animated className="mx-auto h-24 w-24" />
        <p className="eyebrow mt-8 text-aubergine">Error 404</p>
        <h1 className="display-xl mt-3">This page isn't here.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="tap-target inline-flex items-center justify-center rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
          >
            Back home
          </Link>
          <Link
            to="/shop"
            className="tap-target inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-card"
          >
            Go to shop
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main id="main" className="flex min-h-[80vh] items-center justify-center px-4 py-32">
      <div className="max-w-md text-center">
        <h1 className="display-lg">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="tap-target inline-flex items-center justify-center rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
          >
            Try again
          </button>
          <a
            href="/"
            className="tap-target inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-card"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0B0B10"/><path d="M12 46V20l10 14 10-14v26" fill="none" stroke="#C79AA8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 20v26h11" fill="none" stroke="#D6B777" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  );

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mahnoor | E-commerce Experience" },
      {
        name: "description",
        content:
          "A modern storefront experience by Mahnoor Liaqat, an independent freelancer based in Jaranwala.",
      },
      { property: "og:site_name", content: "Mahnoor" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: favicon, type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.fullName,
          email: site.email,
          telephone: site.phoneDisplay,
          address: { "@type": "PostalAddress", addressLocality: site.city },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <a
          href="#main"
          className="sr-only rounded-full bg-obsidian px-5 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <SiteFooter />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
