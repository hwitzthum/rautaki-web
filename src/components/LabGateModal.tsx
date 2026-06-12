"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo";

// ── Storage ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "rautaki_lab_access";

// Allow same-origin paths or explicit same-origin absolute URLs only.
function isSafeHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    return new URL(href).origin === window.location.origin;
  } catch {
    return false;
  }
}
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ── Context ────────────────────────────────────────────────────────────────
interface LabGateContextValue {
  requestAccess: (href: string) => void;
}

const LabGateContext = createContext<LabGateContextValue>({
  requestAccess: (href) => {
    if (isSafeHref(href)) window.location.href = href;
  },
});

export function useLabGate() {
  return useContext(LabGateContext);
}

// ── Gate provider ──────────────────────────────────────────────────────────
// Wraps the Lab page. Renders children normally. Shows modal only when
// an unregistered user clicks a tool — passing the destination href through.

interface LabGateProps {
  children: React.ReactNode;
}

function readRegistered(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function LabGate({ children }: LabGateProps) {
  const [isRegistered, setIsRegistered] = useState(readRegistered);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const requestAccess = useCallback(
    (href: string) => {
      if (!isSafeHref(href)) return;
      if (isRegistered) {
        window.location.href = href;
      } else {
        setPendingHref(href);
      }
    },
    [isRegistered],
  );

  const handleSuccess = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore write failure
    }
    setIsRegistered(true);
    if (pendingHref && isSafeHref(pendingHref)) {
      window.location.href = pendingHref;
    }
  }, [pendingHref]);

  const handleClose = useCallback(() => {
    setPendingHref(null);
  }, []);

  const handleSkip = useCallback(() => {
    const href = pendingHref;
    setPendingHref(null);
    if (href && isSafeHref(href)) {
      window.location.href = href;
    }
  }, [pendingHref]);

  return (
    <LabGateContext.Provider value={{ requestAccess }}>
      {children}
      {pendingHref && !isRegistered && (
        <LabGatePortal
          onSuccess={handleSuccess}
          onClose={handleClose}
          onSkip={handleSkip}
        />
      )}
    </LabGateContext.Provider>
  );
}

// ── Tool link — replaces <a> on tool cards ─────────────────────────────────
// Behaves like a normal link for registered users; triggers the gate for new ones.

interface LabToolLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LabToolLink({ href, children, className }: LabToolLinkProps) {
  const { requestAccess } = useLabGate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let cmd/ctrl+click, middle-click, etc. through naturally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    requestAccess(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// ── Portal ─────────────────────────────────────────────────────────────────

interface PortalProps {
  onSuccess: () => void;
  onClose: () => void;
  onSkip: () => void;
}

function LabGatePortal({ onSuccess, onClose, onSkip }: PortalProps) {
  return createPortal(
    <LabGateOverlay onSuccess={onSuccess} onClose={onClose} onSkip={onSkip} />,
    document.body,
  );
}

// ── Overlay + modal ────────────────────────────────────────────────────────

function LabGateOverlay({ onSuccess, onClose, onSkip }: PortalProps) {
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Initial focus
  useEffect(() => {
    const timer = setTimeout(() => {
      const first = panelRef.current?.querySelector(
        FOCUSABLE,
      ) as HTMLElement | null;
      first?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Focus trap + Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((el) => !el.closest("[disabled]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10,10,10,0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        transition: prefersReduced ? "none" : "opacity 200ms ease",
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="lab-gate-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        style={{
          background: "#FAFAFA",
          width: "100%",
          maxWidth: "460px",
          borderTop: "3px solid #F5A623",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#0A0A0A",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Logo size="sm" variant="dark" />
            <p
              style={{
                fontFamily: "var(--font-ui, system-ui, sans-serif)",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.20)",
                margin: "4px 0 0",
              }}
            >
              Lab · In Kontakt bleiben
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Schliessen"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.30)",
              fontSize: "20px",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ background: "#FAFAFA", padding: "32px 32px 28px" }}>
          <h2
            id="lab-gate-title"
            className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink"
            style={{ marginBottom: "6px" }}
          >
            Bevor Sie loslegen —
            <br />
            bleiben wir in Kontakt?
          </h2>
          <p
            className="font-serif text-body font-normal leading-body"
            style={{
              fontStyle: "italic",
              color: "rgba(28,28,28,0.50)",
              marginBottom: "24px",
            }}
          >
            Notizen zu neuen Werkzeugen und Strategie-Updates. Kein Spam,
            jederzeit abbestellbar.
          </p>

          <div
            style={{
              height: "1px",
              background: "rgba(28,28,28,0.08)",
              marginBottom: "24px",
            }}
          />

          <LabGateForm onSuccess={onSuccess} onSkip={onSkip} />
        </div>
      </div>
    </div>
  );
}

// ── Form ───────────────────────────────────────────────────────────────────

const labelClasses =
  "font-ui text-xs font-medium uppercase tracking-wide-tight text-ink/55 block mb-[6px]";

const baseInputClasses =
  "w-full border px-4 py-3 font-ui text-body text-ink bg-cream transition-all";
const normalInputClasses =
  "border-ink/10 focus:border-gold focus:ring-2 focus:ring-gold focus:ring-offset-1 focus:shadow-[0_0_0_3px_var(--color-gold-focus)]";
const errorInputClasses =
  "border-error focus:border-error focus:ring-2 focus:ring-[rgba(197,48,48,0.22)] focus:ring-offset-1";

function inputClass(hasError: boolean) {
  return `${baseInputClasses} ${hasError ? errorInputClasses : normalInputClasses}`;
}

// Matches the server-side EMAIL_RE in src/app/api/lab-access/route.ts.
// Requires a TLD of 2+ chars and disallows consecutive dots / leading-or-trailing
// dots in the local part. Keep in sync with the server-side pattern.
const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

function validateForm(data: {
  name: string;
  company: string;
  email: string;
  consent: boolean;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Bitte geben Sie Ihren Namen ein.";
  if (!data.company) errors.company = "Bitte geben Sie Ihr Unternehmen ein.";
  if (!data.email) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }
  if (!data.consent)
    errors.consent = "Bitte stimmen Sie der Datenschutzerklärung zu.";
  return errors;
}

function LabGateForm({
  onSuccess,
  onSkip,
}: {
  onSuccess: () => void;
  onSkip: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: (formData.get("name") as string).trim(),
      company: (formData.get("company") as string).trim(),
      email: (formData.get("email") as string).trim(),
      consent: formData.get("consent") === "on",
    };

    const validationErrors = validateForm(payload);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      document
        .getElementById(`lg-${Object.keys(validationErrors)[0]}`)
        ?.focus();
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/lab-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          company: payload.company,
          email: payload.email,
          consent: payload.consent,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ??
            "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
        );
      }
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an hello@rautaki.ch.",
      );
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: "14px" }}>
        <label htmlFor="lg-name" className={labelClasses}>
          Vollständiger Name{" "}
          <span className="text-error" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="lg-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Maria Muster"
          className={inputClass(!!fieldErrors.name)}
          aria-required="true"
          aria-invalid={fieldErrors.name ? "true" : undefined}
          aria-describedby={fieldErrors.name ? "lg-name-error" : undefined}
          disabled={submitting}
          onChange={() => clearFieldError("name")}
        />
        {fieldErrors.name && (
          <p
            id="lg-name-error"
            role="alert"
            className="font-ui text-xs text-error mt-1"
          >
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "14px" }}>
        <label htmlFor="lg-company" className={labelClasses}>
          Unternehmen{" "}
          <span className="text-error" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="lg-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          placeholder="Muster AG"
          className={inputClass(!!fieldErrors.company)}
          aria-required="true"
          aria-invalid={fieldErrors.company ? "true" : undefined}
          aria-describedby={
            fieldErrors.company ? "lg-company-error" : undefined
          }
          disabled={submitting}
          onChange={() => clearFieldError("company")}
        />
        {fieldErrors.company && (
          <p
            id="lg-company-error"
            role="alert"
            className="font-ui text-xs text-error mt-1"
          >
            {fieldErrors.company}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="lg-email" className={labelClasses}>
          E-Mail-Adresse{" "}
          <span className="text-error" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="lg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="maria@musterag.ch"
          className={inputClass(!!fieldErrors.email)}
          aria-required="true"
          aria-invalid={fieldErrors.email ? "true" : undefined}
          aria-describedby={fieldErrors.email ? "lg-email-error" : undefined}
          disabled={submitting}
          onChange={() => clearFieldError("email")}
        />
        {fieldErrors.email && (
          <p
            id="lg-email-error"
            role="alert"
            className="font-ui text-xs text-error mt-1"
          >
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          marginBottom: fieldErrors.consent ? "8px" : "24px",
        }}
      >
        <input
          id="lg-consent"
          name="consent"
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={fieldErrors.consent ? "true" : undefined}
          aria-describedby={
            fieldErrors.consent ? "lg-consent-error" : undefined
          }
          className="mt-[3px] flex-shrink-0 accent-gold w-4 h-4"
          disabled={submitting}
          onChange={() => clearFieldError("consent")}
        />
        <label
          htmlFor="lg-consent"
          className="font-ui text-sm font-light leading-body"
          style={{ color: "rgba(28,28,28,0.60)" }}
        >
          Ich stimme zu, dass meine Kontaktdaten gespeichert werden, um mir
          gelegentlich Updates aus dem Rautaki Lab zukommen zu lassen. Details
          in der{" "}
          <a
            href="/privacy"
            className="text-ink underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung
          </a>
          .{" "}
          <span className="text-error" aria-hidden="true">
            *
          </span>
        </label>
      </div>
      {fieldErrors.consent && (
        <p
          id="lg-consent-error"
          role="alert"
          className="font-ui text-xs text-error mb-6"
        >
          {fieldErrors.consent}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="font-ui text-sm font-light leading-body text-error mb-4"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ink text-white font-ui text-xs font-medium uppercase tracking-wide-btn py-4 transition-colors duration-200 hover:bg-charcoal disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ borderRadius: 0, border: "none" }}
      >
        {submitting ? "Wird gesendet …" : "Anmelden und öffnen →"}
      </button>

      <div style={{ textAlign: "center", marginTop: "14px" }}>
        <button
          type="button"
          onClick={onSkip}
          disabled={submitting}
          className="font-ui text-xs font-light leading-body text-mid-grey hover:text-ink transition-colors underline underline-offset-4 decoration-ink/20 hover:decoration-ink/60 disabled:pointer-events-none disabled:opacity-40"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Direkt öffnen, ohne Anmeldung
        </button>
      </div>
    </form>
  );
}
