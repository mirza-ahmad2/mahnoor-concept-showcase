import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/site/Layout";
import { mailtoHref, site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Mahnoor" },
      {
        name: "description",
        content:
          "How information submitted through this website concept is handled while it remains a preview build.",
      },
      { property: "og:title", content: "Privacy Policy | Mahnoor" },
      { property: "og:description", content: "How submitted information is handled." },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="This preview build">
      <section>
        <h2>Scope</h2>
        <p>
          This website is a preview build for {site.fullName}. It is not yet connected to a payment
          provider, email service, analytics platform, or database.
        </p>
      </section>
      <section>
        <h2>What is stored</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Cart contents are stored in your own browser so your selection survives a refresh.</li>
          <li>
            Contact form and demo checkout entries are stored in your own browser or tab session
            only. They are not transmitted anywhere.
          </li>
        </ul>
      </section>
      <section>
        <h2>What is not collected</h2>
        <p>
          No payment details are requested or processed. No accounts are created, and no tracking or
          advertising cookies are set.
        </p>
      </section>
      <section>
        <h2>Clearing your data</h2>
        <p>
          Because everything is stored locally, clearing your browser storage for this site removes
          all of it.
        </p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>
          For anything related to this policy, contact{" "}
          <a href={mailtoHref} className="link-underline font-medium text-aubergine">
            {site.email}
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          This policy will be replaced with a complete version once real services and business
          details are connected.
        </p>
      </section>
    </LegalPageLayout>
  );
}
