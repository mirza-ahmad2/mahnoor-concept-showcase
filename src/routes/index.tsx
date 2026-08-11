import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Compass, FileText, Gauge, ShoppingBag, Mail, Phone, MapPin } from "lucide-react";
import { Hero3DScene } from "@/components/three/Hero3DScene";
import { MotionReveal, KineticText } from "@/components/site/MotionReveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { PageTransition, DisclosureNote } from "@/components/site/Layout";
import { previewProducts } from "@/data/catalog";
import { PREVIEW_NOTE, mailtoHref, site, telHref } from "@/config/site";
import { usePointerFine } from "@/lib/env-hooks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahnoor | E-commerce Experience" },
      {
        name: "description",
        content:
          "A refined storefront concept for Mahnoor Liaqat — clear navigation, thoughtful product presentation and an effortless checkout path.",
      },
      { property: "og:title", content: "Mahnoor | E-commerce Experience" },
      {
        property: "og:description",
        content: "A modern storefront experience designed around clarity, character and effortless browsing.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageTransition>
      <main id="main">
        <Hero />
        <EditorialIntro />
        <CatalogPreview />
        <ExperiencePrinciples />
        <StoryPanel />
        <ContactCta />
      </main>
    </PageTransition>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();
  const [glow, setGlow] = useState({ x: 50, y: 40 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section
      ref={ref}
      onPointerMove={
        pointerFine
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setGlow({
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
              });
            }
          : undefined
      }
      className="obsidian-panel grain relative flex min-h-[92svh] items-center overflow-hidden pt-28 pb-16 md:min-h-[95svh] md:pt-24"
    >
      {pointerFine ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(38rem 38rem at ${glow.x}% ${glow.y}%, color-mix(in oklab, var(--rose) 16%, transparent), transparent 70%)`,
          }}
        />
      ) : null}

      <div className="shell relative z-2 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y: copyY }}>
          <MotionReveal>
            <p className="eyebrow text-champagne">Independent · {site.city}</p>
          </MotionReveal>
          <h1 className="display-hero mt-6 text-ivory">
            <KineticText text="A refined space for what comes next." />
          </h1>
          <MotionReveal delay={0.12}>
            <p className="lede mt-7 text-ivory/70">{site.tagline}</p>
          </MotionReveal>
          <MotionReveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <MagneticLink to="/shop" variant="solid">
              Explore the shop
              <ArrowRight aria-hidden="true" className="size-4" />
            </MagneticLink>
            <MagneticLink to="/contact" variant="ghost">
              Get in touch
            </MagneticLink>
          </MotionReveal>
        </motion.div>

        <motion.div style={{ y: artY }} className="relative">
          <div className="mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none">
            <Hero3DScene className="h-full w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticLink({
  to,
  children,
  variant,
}: {
  to: string;
  children: React.ReactNode;
  variant: "solid" | "ghost";
}) {
  const pointerFine = usePointerFine();
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const magnetic = pointerFine && !reduce;

  return (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="inline-block"
      onPointerMove={
        magnetic
          ? (event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setOffset({
                x: (event.clientX - (rect.left + rect.width / 2)) * 0.22,
                y: (event.clientY - (rect.top + rect.height / 2)) * 0.3,
              });
            }
          : undefined
      }
      onPointerLeave={magnetic ? () => setOffset({ x: 0, y: 0 }) : undefined}
    >
      <Link
        to={to}
        className={
          variant === "solid"
            ? "tap-target inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-champagne"
            : "tap-target inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-4 text-sm font-medium text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/5"
        }
      >
        {children}
      </Link>
    </motion.span>
  );
}

function EditorialIntro() {
  return (
    <section className="grain section-y">
      <div className="shell grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <MotionReveal>
          <h2 className="display-xl">Designed to make discovery feel simple.</h2>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <p className="lede text-muted-foreground">
            Clear navigation, thoughtful product presentation and a checkout path that stays out of
            the way.
          </p>
          <Link
            to="/collections"
            className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aubergine"
          >
            See the collections framework
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}

function CatalogPreview() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Sample catalog"
          title="A shopping surface, ready for real products."
          description="Placeholder entries demonstrate how browsing, quick-add and the cart behave."
          action={
            <Link
              to="/shop"
              className="tap-target inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-card"
            >
              View all
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {previewProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <DisclosureNote className="mt-10">{PREVIEW_NOTE}</DisclosureNote>
      </div>
    </section>
  );
}

const principles = [
  {
    icon: Compass,
    title: "Easy discovery",
    body: "Navigation and search stay predictable, so nothing gets buried.",
  },
  {
    icon: FileText,
    title: "Clear product details",
    body: "Each product page has room for specifics without visual clutter.",
  },
  {
    icon: Gauge,
    title: "Fast, responsive browsing",
    body: "Lightweight visuals and smooth transitions across every screen size.",
  },
  {
    icon: ShoppingBag,
    title: "Simple checkout journey",
    body: "A short, staged path from cart to confirmation.",
  },
];

function ExperiencePrinciples() {
  return (
    <section className="section-y bg-sand/60">
      <div className="shell">
        <SectionHeading
          eyebrow="Site experience"
          title="Principles this storefront is built on."
          description="These describe how the website behaves — not commercial guarantees."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((item, i) => (
            <MotionReveal as="li" key={item.title} delay={i * 0.06}>
              <div className="card-surface group h-full p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <span className="grid size-12 place-items-center rounded-2xl bg-aubergine/10 text-aubergine transition-colors group-hover:bg-aubergine group-hover:text-ivory">
                  <item.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-6 text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </MotionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StoryPanel() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const layerA = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const layerB = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, reduce ? 0 : 40]);

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-aubergine py-28 text-ivory md:py-40"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: layerA }}
        className="absolute -top-24 -left-24 size-96 rounded-full border border-ivory/15"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: layerB }}
        className="absolute -right-32 bottom-0 size-[28rem] rounded-full bg-obsidian/30 blur-3xl"
      />

      <div className="shell relative z-2 max-w-4xl">
        <h2 className="display-hero">
          <KineticText text="Less clutter. More focus." />
        </h2>
        <p className="lede mt-8 text-ivory/75">
          Every interaction should help the customer move forward.
        </p>
        <Link
          to="/shop"
          className="tap-target mt-10 inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-champagne"
        >
          Explore the shop
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="section-y">
      <div className="shell">
        <MotionReveal className="card-surface overflow-hidden">
          <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:p-14">
            <div>
              <h2 className="display-lg">Have something in mind?</h2>
              <p className="lede mt-4 text-muted-foreground">Connect directly with Mahnoor.</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="size-4 text-aubergine" />
                {site.city}
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href={mailtoHref}
                className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-obsidian px-6 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
              >
                <Mail aria-hidden="true" className="size-4" />
                {site.email}
              </a>
              <a
                href={telHref}
                className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Phone aria-hidden="true" className="size-4 text-aubergine" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
