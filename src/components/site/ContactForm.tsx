import { useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

const emptyValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof ContactValues, string>>;

function validate(values: ContactValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";
  if (values.phone.trim() && values.phone.trim().length < 7)
    errors.phone = "Please enter a valid phone number or leave this blank.";
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (values.message.trim().length < 10)
    errors.message = "Please write at least 10 characters so the request is clear.";
  if (!values.consent) errors.consent = "Please confirm you agree to the privacy policy.";
  return errors;
}

const fieldClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring";

/**
 * Client-side contact form. No email service is connected in this build, so the
 * form records the request locally and says so. `onSubmitRequest` is the single
 * seam to replace with a real endpoint later.
 */
export function ContactForm({
  onSubmitRequest,
}: {
  onSubmitRequest?: (values: ContactValues) => Promise<void> | void;
}) {
  const id = useId();
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [botField, setBotField] = useState("");

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (botField) return; // honeypot
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    if (onSubmitRequest) await onSubmitRequest(values);
    try {
      const key = "mahnoor.contact-requests.v1";
      const existing: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      const list = Array.isArray(existing) ? existing : [];
      list.push({ ...values, at: new Date().toISOString() });
      window.localStorage.setItem(key, JSON.stringify(list));
    } catch {
      /* storage unavailable — the confirmation below still reflects reality */
    }
    setSubmitted(true);
    setValues(emptyValues);
  };

  if (submitted) {
    return (
      <div className="card-surface flex flex-col items-start gap-4 p-8" role="status">
        <CheckCircle2 aria-hidden="true" className="size-8 text-aubergine" />
        <h2 className="font-display text-2xl">Details captured on this device</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This form is not connected to an email service yet, so nothing has been sent. Your details
          were saved in this browser only. To reach Mahnoor right now, use the email or phone link
          on this page.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="tap-target inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="card-surface grid gap-5 p-6 md:p-8">
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${id}-company`}>Company (leave blank)</label>
        <input
          id={`${id}-company`}
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(event) => setBotField(event.target.value)}
        />
      </div>

      <Field id={`${id}-name`} label="Full name" error={errors.name}>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => set("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-email`} label="Email" error={errors.email}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={fieldClass}
          />
        </Field>

        <Field id={`${id}-phone`} label="Phone" optional error={errors.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id={`${id}-subject`} label="Subject" error={errors.subject}>
        <input
          id={`${id}-subject`}
          name="subject"
          value={values.subject}
          onChange={(event) => set("subject", event.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${id}-subject-error` : undefined}
          className={fieldClass}
        />
      </Field>

      <Field id={`${id}-message`} label="Message" error={errors.message}>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => set("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(fieldClass, "resize-y")}
        />
      </Field>

      <div>
        <label htmlFor={`${id}-consent`} className="flex items-start gap-3 text-sm">
          <input
            id={`${id}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(event) => set("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            className="mt-0.5 size-5 shrink-0 rounded-md accent-[var(--aubergine)]"
          />
          <span className="text-muted-foreground">
            I agree that my details may be handled as described in the{" "}
            <Link to="/privacy" className="link-underline font-medium text-aubergine">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id={`${id}-consent-error`} className="mt-2 text-sm text-destructive">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="tap-target mt-1 inline-flex items-center justify-center rounded-full bg-obsidian px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-aubergine"
      >
        Send message
      </button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        This form is not connected to an email service yet. Submissions are stored in your browser
        only until a delivery endpoint is configured.
      </p>
    </form>
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
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
