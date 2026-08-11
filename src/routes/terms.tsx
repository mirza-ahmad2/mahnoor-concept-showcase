import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/site/Layout";
import { mailtoHref, site } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Mahnoor" },
      {
        name: "description",
        content:
          "Terms covering use of this preview website concept, its sample catalog and demonstration checkout.",
      },
      { property: "og:title", content: "Terms & Conditions | Mahnoor" },
      { property: "og:description", content: "Terms covering use of this preview website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" updated="This preview build">
      <section>
        <h2>About this website</h2>
        <p>
          This is a preview website concept prepared for {site.fullName}, an independent freelancer
          based in {site.city}. It demonstrates layout, navigation and shopping behaviour.
        </p>
      </section>
      <section>
        <h2>Sample catalog</h2>
        <p>
          Every item shown is clearly labelled as a preview item. Titles, descriptions and imagery
          are placeholders for layout purposes and do not represent products offered for sale. No
          prices are stated.
        </p>
      </section>
      <section>
        <h2>Demonstration checkout</h2>
        <p>
          The checkout flow is a demonstration. No payment method is collected, no payment is
          processed, and submitting it does not create an order or any obligation for either party.
        </p>
      </section>
      <section>
        <h2>Contacting Mahnoor</h2>
        <p>
          The contact form is not connected to a delivery service yet. For a genuine enquiry, email{" "}
          <a href={mailtoHref} className="link-underline font-medium text-aubergine">
            {site.email}
          </a>{" "}
          or call {site.phoneDisplay}.
        </p>
      </section>
      <section>
        <h2>Content and updates</h2>
        <p>
          These terms will be replaced with final terms once real products, pricing and business
          details are supplied. Content on the site may change without notice while it remains a
          preview.
        </p>
      </section>
    </LegalPageLayout>
  );
}
