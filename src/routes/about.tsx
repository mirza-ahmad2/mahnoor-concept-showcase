import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { PageTransition, PageHeader } from "@/components/site/Layout";
import { MotionReveal } from "@/components/site/MotionReveal";
import { Monogram } from "@/components/site/Brand";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Mahnoor" },
      {
        name: "description",
        content:
          "Mahnoor Liaqat is an independent freelancer based in Jaranwala. This commerce experience is a flexible foundation for her online presence.",
      },
      { property: "og:title", content: "About | Mahnoor" },
      {
        property: "og:description",
        content: "About Mahnoor Liaqat, an independent freelancer based in Jaranwala.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageTransition>
      <main id="main">
        <PageHeader eyebrow={`Independent · ${site.city}`} title="About Mahnoor" />

        <section className="shell grid gap-14 pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-start md:pb-36">
          <MotionReveal>
            <p className="lede text-foreground">
              {site.fullName} is an independent freelancer based in {site.city}. This commerce
              experience has been structured as a flexible foundation for her online presence, ready
              to be tailored around the products and brand details she chooses to provide.
            </p>

            <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4 text-aubergine" />
              {site.city}
            </p>

            <div className="mt-10">
              <Link
                to="/contact"
                className="tap-target inline-flex items-center gap-2 rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
              >
                Contact Mahnoor
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <div className="obsidian-panel grain grid aspect-square place-items-center rounded-[2rem] p-10">
              <div className="relative z-2 text-center">
                <Monogram animated className="mx-auto h-40 w-40" />
                <p className="mt-6 font-display text-3xl text-ivory">Mahnoor</p>
                <p className="eyebrow mt-2 text-champagne">Concept identity</p>
              </div>
            </div>
          </MotionReveal>
        </section>
      </main>
    </PageTransition>
  );
}
