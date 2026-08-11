/**
 * Single source of truth for verified public profile data.
 * Only information explicitly supplied by Mahnoor belongs here.
 */

export const site = {
  name: "Mahnoor",
  monogram: "ML",
  fullName: "Mahnoor Liaqat",
  role: "Independent freelancer",
  city: "Jaranwala",
  email: "lmahnoor773@gmail.com",
  phoneDisplay: "+92 325 7123624",
  phoneHref: "+923257123624",
  tagline: "A modern storefront experience designed around clarity, character and effortless browsing.",
} as const;

export const mailtoHref = `mailto:${site.email}`;
export const telHref = `tel:${site.phoneHref}`;

export const credit = {
  label: "This website is powered by The Innovations",
  href: "https://theinnovations.tech/",
} as const;

export type NavLink = { label: string; to: string };

export const primaryNav: NavLink[] = [
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Browse",
    links: [
      { label: "Home", to: "/" },
      { label: "Shop", to: "/shop" },
      { label: "Collections", to: "/collections" },
      { label: "Search", to: "/search" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Cart", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export const PREVIEW_NOTE =
  "Sample catalog shown for website preview. Final products and pricing can be added when supplied.";

export const PRICE_PLACEHOLDER = "PKR —";
