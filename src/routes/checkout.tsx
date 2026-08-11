import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageTransition, PageHeader, EmptyState, DisclosureNote } from "@/components/site/Layout";
import { PreviewVisual } from "@/components/site/PreviewVisual";
import { PRICING_NOTE } from "@/components/site/Cart";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Demo checkout | Mahnoor" },
      {
        name: "description",
        content:
          "A demonstration checkout flow. No payment is processed and no order is placed.",
      },
      { property: "og:title", content: "Demo checkout | Mahnoor" },
      { property: "og:description", content: "Demonstration checkout flow — no payment is taken." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const steps = ["Details", "Delivery", "Review"] as const;

interface CheckoutValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  method: "standard" | "pickup";
}

const fieldClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring";

function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, count, clear, hydrated } = useCart();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<CheckoutValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    method: "standard",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutValues, string>>>({});

  const set = <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const summary = useMemo(
    () => lines.map((line) => ({ title: line.product.title, quantity: line.quantity })),
    [lines],
  );

  const validateStep = (index: number) => {
    const next: Partial<Record<keyof CheckoutValues, string>> = {};
    if (index === 0) {
      if (!values.name.trim()) next.name = "Please enter your full name.";
      if (!values.email.trim()) next.email = "Please enter your email address.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
        next.email = "Please enter a valid email address.";
      if (!values.phone.trim()) next.phone = "Please enter a contact number.";
    }
    if (index === 1 && values.method === "standard") {
      if (!values.address.trim()) next.address = "Please enter a delivery address.";
      if (!values.city.trim()) next.city = "Please enter a city.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 2) {
      if (validateStep(step)) setStep(step + 1);
      return;
    }
    const reference = `DEMO-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    try {
      window.sessionStorage.setItem(
        "mahnoor.demo-order.v1",
        JSON.stringify({ reference, name: values.name, items: summary }),
      );
    } catch {
      /* storage unavailable — confirmation page falls back to generic copy */
    }
    clear();
    void navigate({ to: "/order-confirmation" });
  };

  if (hydrated && lines.length === 0) {
    return (
      <PageTransition>
        <main id="main">
          <PageHeader eyebrow="Demo checkout" title="Nothing to check out" />
          <div className="shell pb-32">
            <EmptyState
              title="Your cart is empty"
              description="Add a preview item first to walk through the demonstration checkout."
              action={
                <Link
                  to="/shop"
                  className="tap-target mt-2 inline-flex items-center gap-2 rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
                >
                  Browse the shop
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="Demonstration only"
          title="Checkout"
          description="This flow demonstrates the checkout experience. No payment is processed and no order is placed."
        />

        <div className="shell grid gap-10 pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 md:pb-36">
          <section aria-label="Checkout steps">
            <ol className="mb-8 flex flex-wrap items-center gap-3" aria-label="Progress">
              {steps.map((label, index) => (
                <li key={label} className="flex items-center gap-3">
                  <span
                    aria-current={step === index ? "step" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase",
                      index < step
                        ? "border-aubergine/40 bg-aubergine/10 text-aubergine"
                        : step === index
                          ? "border-obsidian bg-obsidian text-ivory"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {index < step ? <Check aria-hidden="true" className="size-3.5" /> : null}
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            <form noValidate onSubmit={handleSubmit} className="card-surface grid gap-5 p-6 md:p-8">
              {step === 0 ? (
                <>
                  <Field id="co-name" label="Full name" error={errors.name}>
                    <input
                      id="co-name"
                      autoComplete="name"
                      className={fieldClass}
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="co-email" label="Email" error={errors.email}>
                      <input
                        id="co-email"
                        type="email"
                        autoComplete="email"
                        className={fieldClass}
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </Field>
                    <Field id="co-phone" label="Phone" error={errors.phone}>
                      <input
                        id="co-phone"
                        type="tel"
                        autoComplete="tel"
                        className={fieldClass}
                        value={values.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                      />
                    </Field>
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium">Delivery method</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          { value: "standard", label: "Deliver to an address" },
                          { value: "pickup", label: "Arrange collection" },
                        ] as const
                      ).map((option) => (
                        <label
                          key={option.value}
                          className={cn(
                            "tap-target flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm transition-colors",
                            values.method === option.value
                              ? "border-aubergine bg-aubergine/8"
                              : "border-border hover:bg-muted",
                          )}
                        >
                          <input
                            type="radio"
                            name="method"
                            className="size-4 accent-[var(--aubergine)]"
                            checked={values.method === option.value}
                            onChange={() => set("method", option.value)}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {values.method === "standard" ? (
                    <>
                      <Field id="co-address" label="Address" error={errors.address}>
                        <input
                          id="co-address"
                          autoComplete="street-address"
                          className={fieldClass}
                          value={values.address}
                          onChange={(e) => set("address", e.target.value)}
                          aria-invalid={Boolean(errors.address)}
                        />
                      </Field>
                      <Field id="co-city" label="City" error={errors.city}>
                        <input
                          id="co-city"
                          autoComplete="address-level2"
                          className={fieldClass}
                          value={values.city}
                          onChange={(e) => set("city", e.target.value)}
                          aria-invalid={Boolean(errors.city)}
                        />
                      </Field>
                    </>
                  ) : (
                    <DisclosureNote>
                      Collection details will be arranged directly with Mahnoor.
                    </DisclosureNote>
                  )}

                  <Field id="co-notes" label="Notes" optional>
                    <textarea
                      id="co-notes"
                      rows={4}
                      className={cn(fieldClass, "resize-y")}
                      value={values.notes}
                      onChange={(e) => set("notes", e.target.value)}
                    />
                  </Field>
                </>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl">Review</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Confirm the details below. Submitting will not place a real order.
                    </p>
                  </div>
                  <dl className="grid gap-3 text-sm">
                    <Row label="Name" value={values.name} />
                    <Row label="Email" value={values.email} />
                    <Row label="Phone" value={values.phone} />
                    <Row
                      label="Method"
                      value={values.method === "standard" ? "Delivery" : "Collection"}
                    />
                    {values.method === "standard" ? (
                      <Row label="Address" value={`${values.address}, ${values.city}`} />
                    ) : null}
                    {values.notes.trim() ? <Row label="Notes" value={values.notes} /> : null}
                  </dl>
                  <DisclosureNote>
                    No payment method is collected. This checkout is a demonstration of the flow
                    only.
                  </DisclosureNote>
                </div>
              ) : null}

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="tap-target inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    Back
                  </button>
                ) : null}
                <button
                  type="submit"
                  className="tap-target inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine sm:flex-none"
                >
                  {step === 2 ? "Place demo order" : "Continue"}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </form>
          </section>

          <section aria-labelledby="order-summary">
            <div className="card-surface p-7 lg:sticky lg:top-28">
              <h2 id="order-summary" className="font-display text-2xl">
                Order summary
              </h2>
              <ul className="mt-6 space-y-4">
                {lines.map((line) => (
                  <li key={line.slug} className="flex items-center gap-3">
                    <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <PreviewVisual shape={line.product.shape} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{line.product.title}</p>
                      <p className="text-xs text-muted-foreground">Qty {line.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="font-medium">{count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total</dt>
                  <dd className="font-medium">To be added</dd>
                </div>
              </dl>
              <DisclosureNote className="mt-5">{PRICING_NOTE}</DisclosureNote>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-b border-border pb-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="max-w-[60%] text-right font-medium break-words">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {optional ? <span className="ml-1.5 text-muted-foreground">(optional)</span> : null}
      </label>
      {children}
      {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
