import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageTransition, DisclosureNote } from "@/components/site/Layout";
import { mailtoHref, site } from "@/config/site";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Demo order received | Mahnoor" },
      {
        name: "description",
        content: "Confirmation screen for the demonstration checkout flow. No order was placed.",
      },
      { property: "og:title", content: "Demo order received | Mahnoor" },
      { property: "og:description", content: "Demonstration confirmation screen." },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/order-confirmation" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/order-confirmation" }],
  }),
  component: ConfirmationPage,
});

interface DemoOrder {
  reference: string;
  name: string;
  items: { title: string; quantity: number }[];
}

function ConfirmationPage() {
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("mahnoor.demo-order.v1");
      if (raw) setOrder(JSON.parse(raw) as DemoOrder);
    } catch {
      /* storage unavailable — generic copy is shown instead */
    }
  }, []);

  return (
    <PageTransition>
      <main id="main" className="shell pt-32 pb-32 md:pt-44">
        <div className="card-surface mx-auto max-w-2xl p-8 text-center md:p-12">
          <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-aubergine" />
          <p className="eyebrow mt-6 text-aubergine">Demonstration</p>
          <h1 className="display-lg mt-3">Demo order received</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {order?.name ? `Thank you, ${order.name}. ` : ""}This was a demonstration of the checkout
            flow. No payment was taken and no order has been placed with {site.fullName}.
          </p>

          {order ? (
            <div className="mt-8 text-left">
              <p className="text-sm">
                <span className="text-muted-foreground">Demo reference:</span>{" "}
                <span className="font-semibold">{order.reference}</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {order.items.map((item) => (
                  <li key={item.title} className="flex justify-between gap-4 border-b border-border pb-2">
                    <span>{item.title}</span>
                    <span>Qty {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <DisclosureNote className="mt-8 text-left">
            To make a real enquiry, email{" "}
            <a href={mailtoHref} className="link-underline ml-1 font-medium text-aubergine">
              {site.email}
            </a>
            .
          </DisclosureNote>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="tap-target inline-flex items-center rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
            >
              Keep browsing
            </Link>
            <Link
              to="/contact"
              className="tap-target inline-flex items-center rounded-full border border-border px-7 py-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              Contact Mahnoor
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
