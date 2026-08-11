import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { credit, footerNav, mailtoHref, site, telHref } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="obsidian-panel grain relative overflow-hidden">
      <p
        aria-hidden="true"
        className="font-display pointer-events-none absolute -bottom-6 left-0 w-full text-center text-[22vw] leading-none text-ivory/[0.045] select-none md:-bottom-14"
      >
        MAHNOOR
      </p>

      <div className="shell relative z-2 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-4xl text-ivory">Mahnoor</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">{site.tagline}</p>

            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a
                  href={mailtoHref}
                  className="link-underline inline-flex items-center gap-2.5 text-ivory/85 hover:text-ivory"
                >
                  <Mail aria-hidden="true" className="size-4 text-champagne" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  className="link-underline inline-flex items-center gap-2.5 text-ivory/85 hover:text-ivory"
                >
                  <Phone aria-hidden="true" className="size-4 text-champagne" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-ivory/70">
                <MapPin aria-hidden="true" className="size-4 text-champagne" />
                {site.city}
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="eyebrow font-sans text-champagne">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="link-underline text-sm text-ivory/70 hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.fullName}. {site.city}.
          </p>
          <a
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-ivory hover:text-champagne"
          >
            {credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
