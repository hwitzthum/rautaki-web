"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo";

const STORAGE_KEY = "rautaki_lab_access";
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ── Gate provider ──────────────────────────────────────────────────────────
// Wrap the Lab page. Children render normally; the modal overlays when needed.

interface LabGateProps {
  children: React.ReactNode;
}

export default function LabGate({ children }: LabGateProps) {
  const [mounted, setMounted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setIsRegistered(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // localStorage unavailable (private browsing on some browsers) — show gate
    }
  }, []);

  const handleSuccess = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore write failure — access still granted for this session
    }
    setIsRegistered(true);
  }, []);

  return (
    <>
      {children}
      {mounted && !isRegistered && (
        <LabGatePortal onSuccess={handleSuccess} />
      )}
    </>
  );
}

// ── Portal (rendered into document.body) ──────────────────────────────────

function LabGatePortal({ onSuccess }: { onSuccess: () => void }) {
  return createPortal(<LabGateOverlay onSuccess={onSuccess} />, document.body);
}

// ── Overlay + modal ────────────────────────────────────────────────────────

function LabGateOverlay({ onSuccess }: { onSuccess: () => void }) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Reduced-motion detection
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Initial focus
  useEffect(() => {
    const timer = setTimeout(() => {
      const first = panelRef.current?.querySelector(FOCUSABLE) as HTMLElement | null;
      first?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Focus trap — Tab stays inside modal; no Escape (gate is required)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        transition: prefersReduced ? "none" : "opacity 200ms ease",
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="lab-gate-title"
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
        {/* Modal header */}
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
              Lab · Freier Zugang
            </p>
          </div>
        </div>

        {/* Modal body */}
        <div style={{ background: "#FAFAFA", padding: "32px 32px 28px" }}>
          <h2
            id="lab-gate-title"
            className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink"
            style={{ marginBottom: "6px" }}
          >
            Einmal registrieren,<br />alle Werkzeuge nutzen.
          </h2>
          <p
            className="font-serif text-body font-normal leading-body"
            style={{
              fontStyle: "italic",
              color: "rgba(28,28,28,0.50)",
              marginBottom: "24px",
            }}
          >
            Kostenlos. Kein Passwort. Kein Spam.
          </p>

          <div
            style={{
              height: "1px",
              background: "rgba(28,28,28,0.08)",
              marginBottom: "24px",
            }}
          />

          <LabGateForm onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}

// ── Form ───────────────────────────────────────────────────────────────────

const labelClasses =
  "font-ui text-xs font-medium uppercase tracking-wide-tight text-ink/55 block mb-[6px]";
const inputClasses =
  "w-full border border-ink/10 px-4 py-3 font-ui text-body text-ink bg-cream focus:border-gold focus:ring-2 focus:ring-gold focus:ring-offset-1 focus:shadow-[0_0_0_3px_var(--color-gold-focus)] transition-all";

function LabGateForm({ onSuccess }: { onSuccess: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: (data.get("name") as string).trim(),
      company: (data.get("company") as string).trim(),
      email: (data.get("email") as string).trim(),
    };

    try {
      const res = await fetch("/api/lab-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      {/* Name */}
      <div style={{ marginBottom: "14px" }}>
        <label htmlFor="lg-name" className={labelClasses}>
          Vollständiger Name{" "}
          <span className="text-error" aria-hidden="true">*</span>
        </label>
        <input
          id="lg-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Maria Muster"
          className={inputClasses}
          aria-required="true"
        />
      </div>

      {/* Company */}
      <div style={{ marginBottom: "14px" }}>
        <label htmlFor="lg-company" className={labelClasses}>
          Unternehmen{" "}
          <span className="text-error" aria-hidden="true">*</span>
        </label>
        <input
          id="lg-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          placeholder="Muster AG"
          className={inputClasses}
          aria-required="true"
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="lg-email" className={labelClasses}>
          E-Mail-Adresse{" "}
          <span className="text-error" aria-hidden="true">*</span>
        </label>
        <input
          id="lg-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="maria@musterag.ch"
          className={inputClasses}
          aria-required="true"
        />
      </div>

      {/* DSGVO consent */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <input
          id="lg-consent"
          name="consent"
          type="checkbox"
          required
          aria-required="true"
          className="mt-[3px] flex-shrink-0 accent-gold w-4 h-4"
        />
        <label
          htmlFor="lg-consent"
          className="font-ui text-sm font-light leading-body"
          style={{ color: "rgba(28,28,28,0.60)" }}
        >
          Ich stimme zu, dass meine Kontaktdaten zur Kontaktaufnahme durch
          Rautaki gespeichert werden. Details in der{" "}
          <a
            href="/privacy"
            className="text-ink underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung
          </a>
          .{" "}
          <span className="text-error" aria-hidden="true">*</span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p
          role="alert"
          className="font-ui text-sm font-light leading-body text-error mb-4"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ink text-white font-ui text-xs font-medium uppercase tracking-wide-btn py-4 transition-colors duration-200 hover:bg-charcoal disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ borderRadius: 0, border: "none" }}
      >
        {submitting ? "Wird gesendet …" : "Werkzeuge freischalten →"}
      </button>

      <p
        className="font-ui text-xs font-light leading-body text-mid-grey"
        style={{ textAlign: "center", marginTop: "14px" }}
      >
        Ihre Daten werden nicht weitergegeben.
      </p>
    </form>
  );
}
