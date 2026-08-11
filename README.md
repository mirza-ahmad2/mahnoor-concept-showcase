# Mahnoor Commerce Concept

Build a complete, premium, multi-page e-commerce website concept for the lead described below. This is a high-value prospect demo, so the result must feel exceptional, immersive, polished, conversion-focused, responsive, accessible, fast, and production-quality. Do not ask follow-up questions; use the verified facts and the safe assumptions explicitly defined below.

PROJECT / LEAD CONTEXT
- Person: Mahnoor Liaqat
- Status: Freelancer / independent individual; no verified company name exists.
- City: Jaranwala
- Email: lmahnoor773@gmail.com
- Phone: +92 325 7123624
- Requested website type: E-commerce
- Service category: Web development
- Lead source: Meta
- No verified website, LinkedIn URL, social-media URL, logo, brand palette, product catalog, product category, company size, founding year, client list, testimonials, awards, certifications, business statistics, business history, shipping policy, return policy, payment provider, or business address were provided.
- The CRM budget, stage, temperature, project status, import metadata, source metadata and all other internal sales fields are PRIVATE INTERNAL LEAD DATA. NEVER display them anywhere on the public website.

NON-NEGOTIABLE FACTUAL INTEGRITY
1. Never invent facts about Mahnoor, her business, products, customers, sales, history, qualifications, testimonials, clients, awards, certifications, partnerships, shipping, returns, inventory, or achievements.
2. Do not claim that any visual identity is her existing official brand. Since no logo or palette is provided, create a tasteful concept identity for this demo only.
3. If demo products are required to demonstrate the shopping experience, label them clearly and consistently as SAMPLE / PREVIEW items in the UI and data model. They are interaction placeholders only, not real products belonging to Mahnoor. Never write copy that implies they are actual inventory.
4. Do not publish fabricated reviews, ratings, customer counts, sale numbers, urgency counters, fake stock levels, fake discounts, press logos, brand logos, trust badges, client logos, or social proof.
5. Do not mention the words AI, artificial intelligence, Lovable, generated, template, or prototype in public-facing website content. A subtle “Preview item” label on sample catalog items is allowed and preferred for factual integrity.

CORE BRAND DIRECTION
Create an editorial-luxury, modern-commerce identity around the simple display name “Mahnoor” with a small secondary monogram “ML”. Treat it as a concept wordmark, not an existing verified logo.

Use a refined dark/light dual palette designed to work for an unknown future product niche:
- Obsidian: #0B0B10
- Warm Ivory: #F6F1E9
- Aubergine: #4B1D3F
- Dusty Rose: #C79AA8
- Champagne: #D6B777
- Slate: #66636B
- Pure White: #FFFFFF
Use Warm Ivory as the dominant light canvas, Obsidian for typography and dark immersive sections, Aubergine as the primary brand accent, Dusty Rose as a softer accent, and Champagne only for small premium highlights. Maintain WCAG-friendly contrast; do not put champagne small text on ivory.

TYPOGRAPHY
- Display / editorial headings: Instrument Serif or an equivalent elegant high-contrast serif.
- UI / body / commerce: Manrope or Inter.
- Use fluid clamp() scales, balanced line lengths, strong hierarchy and excellent mobile readability.
- Avoid excessively thin weights.

VISUAL DESIGN LANGUAGE
Create a 2026 contemporary e-commerce experience that feels tactile and dimensional without becoming gimmicky. Combine:
- spacious editorial layouts
- large expressive typography
- subtle paper/noise texture
- glass only where useful, never everywhere
- rounded 20–28px product surfaces
- soft shadows and layered depth
- oversized image frames
- asymmetric grid moments
- high-end whitespace
- elegant borders
- slow-browsing presentation with fewer, clearer choices
- premium micro-interactions
- selective cinematic dark sections
- sophisticated motion choreography
Avoid generic gradient blobs, overused neon cyberpunk styling, excessive bento grids, and animation on every element.

3D / IMMERSIVE EXPERIENCE
Use tasteful React Three Fiber / Three.js only where it adds real value. The hero should include a lightweight abstract 3D “commerce sculpture”: a sculptural floating pedestal/ribbon/orbit made from simple geometry and optimized materials, not a fake real product. It should subtly rotate with pointer movement and respond to scroll, with elegant lighting, soft reflections, and no heavy downloadable 3D asset.

Also add one optional spatial transition or product-viewer frame on the Sample Product detail experience, but keep it lightweight.

Performance requirements for 3D:
- dynamically load the 3D scene after primary page content
- provide a static CSS/SVG fallback
- reduce DPR on small/mobile devices
- pause rendering when offscreen
- honor prefers-reduced-motion
- disable complex pointer effects on touch devices
- no autoplay video backgrounds
- maintain good Core Web Vitals

MOTION
Use Framer Motion or equivalent for:
- page enter/exit transitions
- header reveal
- clip/mask image reveals
- text fade/slide with short stagger
- card hover lift
- magnetic CTA effect only on desktop pointer devices
- cart drawer motion
- subtle parallax in hero and editorial sections
- smooth but not slow interactions
All animations must be interruptible and respect prefers-reduced-motion.

SITE PURPOSE
This public project should work as a highly polished E-commerce concept for Mahnoor that can later be populated with her real product catalog. Because product niche/content is unverified, do not pretend to know what she sells. Demonstrate a complete premium shopping UX using clearly labeled sample preview items and make the catalog architecture easy to replace later.

SITEMAP / ROUTES
Build real routes, not one long single page:
1. / — Home
2. /shop — Shop / sample catalog
3. /shop/:slug — Sample product detail
4. /collections — Collections framework
5. /about — About Mahnoor
6. /contact — Contact
7. /cart — Full cart page
8. /checkout — Checkout demo / request flow
9. /order-confirmation — Confirmation state
10. /search — Search UI
11. /privacy — Privacy Policy
12. /terms — Terms & Conditions
13. /404 or wildcard not-found page

Do NOT create account/login or customer order history unless a real backend/auth flow is implemented. Do not create fake user data.

GLOBAL HEADER
Desktop:
- left: “Mahnoor” wordmark
- center: Shop, Collections, About, Contact
- right: Search icon and Cart icon with item count
- transparent over hero, then transitions to an ivory/blurred solid navigation after scroll
- clear focus rings and keyboard navigation
Mobile:
- compact wordmark
- cart icon
- menu trigger
- full-screen or sheet menu with large touch targets
- body scroll lock while menu is open

HOME PAGE
A. HERO
Dark Obsidian immersive opening section, minimum 85–95vh on desktop, shorter on mobile.
Left-aligned editorial copy, right-side 3D sculpture on desktop; stacked on mobile.
Use factual/non-specific copy such as:
Eyebrow: “Independent · Jaranwala”
H1: “A refined space for what comes next.”
Supporting line: “A modern storefront experience designed around clarity, character and effortless browsing.”
Primary CTA: “Explore the shop” → /shop
Secondary CTA: “Get in touch” → /contact
Do not claim a particular product niche.

B. EDITORIAL INTRO
Warm Ivory section with oversized serif statement:
“Designed to make discovery feel simple.”
Short copy about the website experience, not Mahnoor’s unverified business history: “Clear navigation, thoughtful product presentation and a checkout path that stays out of the way.”

C. SAMPLE CATALOG PREVIEW
Show 4–6 placeholder items to make the commerce UX interactive. Every card must have a small visible “Preview item” badge. Use tasteful abstract/product-neutral generated CSS/SVG compositions instead of photographs implying real merchandise.
Use neutral names such as:
- Preview Item 01
- Preview Item 02
- Preview Item 03
- Preview Item 04
Use a clearly non-final placeholder price format (e.g. “PKR —”) rather than invented numeric prices.
Cards need hover image motion, quick-add button that adds the preview item to cart, and accessible names.
Include a small note near the section: “Sample catalog shown for website preview. Final products and pricing can be added when supplied.”

D. EXPERIENCE / VALUE SECTION
Do not frame these as existing company guarantees. Frame them as site experience principles:
- Easy discovery
- Clear product details
- Fast, responsive browsing
- Simple checkout journey
Use visual iconography and subtle motion.

E. IMMERSIVE STORY PANEL
Use an Aubergine/Obsidian full-width section with kinetic typography and a slow layered parallax composition. Copy should remain non-factual, e.g.:
“Less clutter. More focus.”
“Every interaction should help the customer move forward.”

F. CONTACT CTA
Create a warm, premium contact block:
Heading: “Have something in mind?”
Copy: “Connect directly with Mahnoor.”
Email button: mailto:lmahnoor773@gmail.com
Phone button: tel:+923257123624
Display location: “Jaranwala” only.
Do not display a street address.

SHOP PAGE /shop
- strong editorial title
- sample-catalog disclosure visible near heading
- responsive product grid
- filter/sort UI that works on sample data: All, Newest, Price only if price data exists; because price is unknown, prefer Sort: Featured / A–Z
- search field
- mobile filter sheet if filters are present
- quick add to cart
- empty-state UX
- use URL query parameters for search/filter where reasonable
- no invented categories unless labeled “Preview Collection A/B”. Prefer simple All Items only.

PRODUCT DETAIL /shop/:slug
- breadcrumb
- large abstract sample visual/gallery
- visible “Preview item” label
- sample title
- price displayed as “Price to be added” rather than fabricated
- configurable quantity
- Add to cart
- clear sample-content disclaimer
- accordion areas for “Product details”, “Delivery”, “Returns” should NOT invent policy text. Instead use honest setup states such as “Product information will be added when supplied.” / “Delivery information will appear here once confirmed.” / “Return terms will appear here once confirmed.”
- related preview items
- desktop sticky purchase column
- mobile sticky add-to-cart bar that does not obscure content

COLLECTIONS /collections
Because no real collections exist, treat this as a visual framework page showing 2–3 clearly labeled preview collection modules, e.g. “Preview Collection 01”. Include a small explanation that the layout is ready for real catalog grouping once content is supplied. Do not use fabricated category names like clothing, beauty, electronics, etc.

ABOUT /about
Use only verified personal data.
Suggested copy:
H1: “About Mahnoor”
“Mahnoor Liaqat is an independent freelancer based in Jaranwala. This commerce experience has been structured as a flexible foundation for her online presence, ready to be tailored around the products and brand details she chooses to provide.”
Do not add education, experience, years in business, specialties, mission, values, customers or personal biography not supplied.
Add a sculptural ML monogram visual rather than a fake portrait.
CTA: “Contact Mahnoor”.

CONTACT /contact
Create a premium two-column contact layout.
Verified info:
- Mahnoor Liaqat
- Jaranwala
- lmahnoor773@gmail.com
- +92 325 7123624
Provide clickable mailto and tel links.
Contact form fields:
- Full name
- Email
- Phone (optional)
- Subject
- Message
- Consent checkbox referencing privacy policy
- Submit
If no backend/email service is configured, implement a graceful client-side demo confirmation and clearly code the form so a real endpoint can be connected later. Do not falsely claim the message was emailed if it was not.
Use validation, descriptive errors, accessible labels, keyboard navigation and spam-honeypot field.

SEARCH /search
- full-page search experience
- search the sample catalog client-side
- keyboard-friendly
- clear empty state
- URL query persistence

CART
Implement both:
- global slide-out cart drawer from header
- dedicated /cart page
Features:
- item image/placeholder
- title
- “Preview item” label
- quantity increment/decrement
- remove
- cart count
- subtotal state, but because pricing is not confirmed, do not fabricate totals. Display “Pricing will be added when the final catalog is supplied.”
- persist sample cart state using localStorage
- cart should never break on refresh
- CTA “Continue” → /checkout

CHECKOUT /checkout
This is a FUNCTIONAL DEMO REQUEST FLOW rather than a fake payment checkout because no products, prices, payment provider, shipping model or policies are verified.
Step structure:
1. Contact
2. Delivery details
3. Review
Fields: name, email, phone, city, address, notes.
Show sample-cart items and the factual note that final product/payment configuration is pending.
Primary action: “Submit demo request”. Store the request locally for the demo and route to /order-confirmation. Do not falsely represent it as a paid order or a message sent externally.
Architect components so Stripe/Shopify/Supabase checkout can be connected later without redesigning the UI.

ORDER CONFIRMATION
Make language accurate:
Heading: “Request captured for this demo.”
Text: “No payment has been processed. Final ordering will be enabled once the live product catalog and payment setup are connected.”
Offer Back to Shop and Contact Mahnoor.

PRIVACY /privacy
Create a concise, generic privacy template appropriate to the current demo. Only claim handling of data that this build actually handles. If contact/checkout data is only stored client-side during the demo, say so accurately. Do not invent a company registration, legal address or jurisdiction.
Include a note that the page should be reviewed with final business/payment setup before commercial launch.

TERMS /terms
Create neutral demo terms. Do not invent shipping, refunds, governing law, business registration, warranty or commercial terms. Clearly state that preview catalog items are demonstration content and no transaction is completed through this preview unless a real payment integration is later enabled.

404
Premium branded not-found state with animated ML monogram, clear Home and Shop CTAs.

FOOTER — CRITICAL
Create a substantial premium footer with:
- “Mahnoor” wordmark
- navigation links
- email
- phone
- location Jaranwala
- Privacy and Terms
- dynamic current year
AND include a persistent clickable credit link with EXACT visible text:
“This website is powered by The Innovations”
and href EXACTLY:
https://theinnovations.tech/
It must be a real clickable <a> link, open safely in a new tab with rel="noopener noreferrer", be readable on desktop and mobile, and remain present in the finished website. Do not alter, abbreviate, hide, remove, or paraphrase this credit.

REUSABLE COMPONENTS
Use clean reusable components for:
- SiteHeader
- MobileMenu
- SiteFooter
- PageTransition
- Hero3DScene
- SectionHeading
- ProductCard
- ProductGrid
- ProductBadge
- ProductGallery
- QuantitySelector
- CartDrawer
- CartLineItem
- ContactForm
- CheckoutStepper
- EmptyState
- SearchOverlay / SearchInput
- MotionReveal
- AccessibleDialog/Sheet
- Breadcrumbs
- LegalPageLayout

DATA / STATE ARCHITECTURE
- Keep verified profile/contact data in one typed config file.
- Keep sample preview catalog in a separate typed data module with explicit `isPreview: true`.
- Centralize navigation and footer links.
- Cart store should be typed and persisted.
- Do not scatter personal contact details through component code.
- Make it easy to replace sample data with API/Supabase/Shopify data later.
- Do not provision a database unless absolutely necessary for this demo.

TECHNICAL QUALITY
Use the Lovable default modern TypeScript stack with Tailwind and shadcn/ui where appropriate. Prefer:
- React + TypeScript
- React Router or current routing used by the project
- Tailwind CSS
- shadcn/ui primitives
- Framer Motion
- Three.js / @react-three/fiber only for selective 3D
- Lucide icons
Keep dependency footprint reasonable.

CODE QUALITY
- strict TypeScript
- semantic HTML
- no huge monolithic page component
- accessible composable UI primitives
- stable keys
- avoid console errors/warnings
- no dead routes
- no broken links
- graceful 404
- no `any` unless unavoidable
- comments only where they add architectural value
- use CSS variables/design tokens for palette/radii/shadows

RESPONSIVENESS
Desktop >= 1280:
- immersive hero split layout
- 4-column sample product grid where space permits
Tablet:
- 2-column grids
- reduced 3D size and motion
Mobile:
- single-column editorial rhythm
- compact hero with 3D behind/below content only if performance remains good
- sticky cart controls where appropriate
- 44px minimum touch targets
- no horizontal overflow
- no hover-dependent functionality
Test common widths around 375, 390, 768, 1024, 1440.

ACCESSIBILITY
Target WCAG 2.2 AA patterns:
- semantic landmarks
- logical heading order
- visible focus states
- skip-to-content link
- keyboard-operable menus/dialogs/cart
- focus trap and focus return for overlays
- label every form control
- aria-live for cart count/action feedback where useful
- alt text for meaningful visuals; mark decorative shapes appropriately
- no color-only status communication
- contrast-safe text
- reduced-motion support
- do not autoplay sound

SEO / METADATA
Create route-aware title/meta descriptions without inventing business claims.
Suggested title convention:
- Home: “Mahnoor | E-commerce Experience”
- Shop: “Shop | Mahnoor”
- About: “About | Mahnoor”
- Contact: “Contact | Mahnoor”
Add:
- canonical-ready structure
- Open Graph metadata
- Twitter card metadata
- favicon using abstract ML monogram
- sitemap-ready route structure
- robots defaults appropriate to public demo; do not index sensitive internal data because none should be present
Use structured data only if it can be accurate. Do NOT add fabricated Organization, Product price, AggregateRating or Review schema. A Person schema may include only Mahnoor Liaqat and Jaranwala/contact data if implemented carefully.

PERFORMANCE
- lazy-load below-fold visuals and 3D
- responsive image strategy
- use CSS/SVG placeholder visuals rather than huge stock photography
- code-split heavy 3D where possible
- minimize layout shift
- preload only essential fonts
- use font-display: swap
- avoid oversized JS bundles
- animations should mostly use transform/opacity
- make mobile experience fast on mid-range devices

CONVERSION UX
Because there is no verified product catalog, prioritize safe lead conversion:
- primary nav CTA path toward Shop
- secondary Contact path
- persistent cart visibility
- clear CTAs after major sections
- frictionless contact form
- click-to-email and click-to-call
- do not use fake urgency, scarcity or social proof

VISUAL DETAILS
- Use a subtle grain/noise overlay built in CSS/SVG at very low opacity.
- Cursor-follow glow only on desktop and only inside hero.
- Product cards should use abstract neutral compositions (pedestal, folded plane, orb, prism) created with CSS/SVG, not category-specific fake product photos.
- Monogram should be generated from text/SVG geometry, not an external fabricated logo image.
- Footer can use giant outlined “M” or “MAHNOOR” type as a decorative background treatment, keeping the required The Innovations credit fully readable above it.

CONTENT TONE
Elegant, confident, concise, human, premium. Never overclaim. Avoid clichés such as “best quality”, “world-class”, “trusted by thousands”, “premium products” as factual claims. Copy should describe the experience rather than invent business facts.

FINAL QA BEFORE COMPLETION
Before considering the build complete:
- click every navigation link
- verify all routes render
- verify mobile menu
- verify cart add/update/remove/persist behavior
- verify search
- verify checkout demo flow and accurate non-payment language
- verify forms validation
- verify reduced-motion handling
- verify no personal/internal CRM data except approved public contact details is exposed
- verify no fake factual claims
- verify no references to AI or Lovable in public website copy
- verify exact footer credit text and exact https://theinnovations.tech/ href are present on every page
- verify there are no console-breaking errors
- ensure the site is visually polished at desktop/tablet/mobile breakpoints

Build the full project now. Do not stop at a wireframe or design plan. Implement the complete responsive website with all pages, interactions and refined visual states described above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mahnoor-concept-showcase.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ea53e1a1-a2f2-4d7e-85c8-501237cfc699).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
