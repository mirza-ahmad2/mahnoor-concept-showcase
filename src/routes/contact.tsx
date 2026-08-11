import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { PageTransition, PageHeader } from "@/components/site/Layout";
import { MotionReveal } from "@/components/site/MotionReveal";
import { ContactForm } from "@/components/site/ContactForm";
import { mailtoHref, site, telHref } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Mahnoor" },
      {
        name: "description",
        content: "Contact Mahnoor Liaqat in Jaranwala by email, phone, or through the contact form.",
      },
      { property: "og:title", content: "Contact | Mahnoor" },
      { property: "og:description", content: "Get in touch with Mahnoor directly." },
      { property: "og:url", content: "https://mahnoor-concept-showcase.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://mahnoor-concept-showcase.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="Contact"
          title="Have something in mind?"
          description="Send a message, or reach Mahnoor directly by email or phone."
        />

        <section className="shell grid gap-10 pb-28 lg:grid-cols-[0.85fr_1.15fr] md:pb-36">
          <MotionReveal>
            <div className="obsidian-panel grain rounded-[2rem] p-8 md:p-10">
              <div className="relative z-2">
                <h2 className="font-display text-3xl text-ivory">Direct details</h2>
                <ul className="mt-8 space-y-6 text-sm">
                  <li className="flex items-start gap-3 text-ivory/80">
                    <User aria-hidden="true" className="mt-0.5 size-4 text-champagne" />
                    <span>
                      {site.fullName}
                      <span className="block text-ivory/55">{site.role}</span>
                    </span>
                  </li>
                  <li>
                    <a
                      href={mailtoHref}
                      className="link-underline flex items-start gap-3 text-ivory/85 hover:text-ivory"
                    >
                      <Mail aria-hidden="true" className="mt-0.5 size-4 text-champagne" />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={telHref}
                      className="link-underline flex items-start gap-3 text-ivory/85 hover:text-ivory"
                    >
                      <Phone aria-hidden="true" className="mt-0.5 size-4 text-champagne" />
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-ivory/70">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 text-champagne" />
                    {site.city}
                  </li>
                </ul>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="sr-only">Contact form</h2>
            <ContactForm />
          </MotionReveal>
        </section>
      </main>
    </PageTransition>
  );
}
