import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export interface Crumb {
  label: string;
  to?: string;
  params?: Record<string, string>;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.to ? (
              <Link
                to={item.to}
                {...(item.params ? { params: item.params } : {})}
                className="link-underline hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? (
              <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-surface flex flex-col items-center gap-4 px-6 py-16 text-center",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-14 place-items-center rounded-full border border-dashed border-aubergine/40 text-aubergine"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </span>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  children?: ReactNode;
}) {
  return (
    <header className="shell pt-32 pb-10 md:pt-44 md:pb-14">
      {eyebrow ? <p className="eyebrow mb-4 text-aubergine">{eyebrow}</p> : null}
      <h1 className="display-xl">{title}</h1>
      {description ? <p className="lede mt-5 text-muted-foreground">{description}</p> : null}
      {children}
    </header>
  );
}

export function DisclosureNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "hairline inline-flex rounded-2xl bg-card/70 px-4 py-3 text-sm text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <PageTransition>
      <PageHeader eyebrow="Legal" title={title} description={`Last reviewed: ${updated}`} />
      <div className="shell pb-24 md:pb-32">
        <div className="card-surface max-w-3xl space-y-8 p-7 md:p-12 [&_h2]:font-display [&_h2]:text-2xl [&_p]:text-[0.95rem] [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_li]:text-[0.95rem] [&_li]:leading-relaxed [&_li]:text-muted-foreground">
          {children}
        </div>
      </div>
    </PageTransition>
  );
}
