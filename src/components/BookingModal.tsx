"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function RequiredAsterisk() {
  return <span className="text-gold"> *</span>;
}

const inputClasses =
  "border border-ink/10 px-4 py-3 font-ui text-body text-ink bg-cream outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,166,35,0.22)] transition-all";

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(<BookingModalContent onClose={onClose} />, document.body);
}

const WEBHOOK_URL =
  "https://n8n-service-ayxj.onrender.com/webhook/booking";

function BookingModalContent({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => firstInputRef.current?.focus(), 90);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const dateValue = formData.get("date") as string;
    const timeValue = formData.get("time") as string;
    const dateTime = dateValue && timeValue
      ? `${dateValue}T${timeValue}:00`
      : dateValue || "";

    const payload = {
      name: formData.get("name") as string,
      company: (formData.get("company") as string) || "",
      email: formData.get("email") as string,
      topic: formData.get("topic") as string,
      date: dateTime,
      message: (formData.get("message") as string) || "",
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-obsidian/80"
        style={{ animation: "fade-in 200ms var(--ease-out-expo) both" }}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Reserve a consultation"
        className="relative bg-white w-full max-w-[520px] shadow-modal"
        style={{ animation: "scale-up 300ms var(--ease-spring) both" }}
      >
        <div className="h-[3px] bg-gold" />

        <div className="p-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-mid-grey hover:text-ink transition-colors p-2"
            aria-label="Close dialog"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 4l12 12M4 16L16 4" />
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <h2 className="font-serif text-h3 tracking-tight-h3 text-ink mb-4">
                Thank you
              </h2>
              <p className="font-ui text-body text-mid-grey mb-6">
                We will be in touch shortly to confirm your consultation.
              </p>
              <Button variant="dark" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-h3 tracking-tight-h3 text-ink mb-2">
                Reserve a consultation
              </h2>
              <p className="font-ui text-sm text-mid-grey mb-8">
                Share your context and we will reply within one business day.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                    Name<RequiredAsterisk />
                  </span>
                  <input
                    ref={firstInputRef}
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                    Company (optional)
                  </span>
                  <input
                    name="company"
                    type="text"
                    placeholder="Your organisation"
                    className={inputClasses}
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                    Email<RequiredAsterisk />
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                    Topic<RequiredAsterisk />
                  </span>
                  <input
                    name="topic"
                    type="text"
                    required
                    placeholder="e.g. AI strategy, governance, leadership"
                    className={inputClasses}
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1">
                    <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                      Date<RequiredAsterisk />
                    </span>
                    <input name="date" type="date" required className={inputClasses} />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                      Time<RequiredAsterisk />
                    </span>
                    <input name="time" type="time" required className={inputClasses} />
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
                    Message (optional)
                  </span>
                  <textarea name="message" rows={3} className={`${inputClasses} resize-y`} />
                </label>

                {error && (
                  <p className="font-ui text-sm text-red-600">{error}</p>
                )}

                <div className="mt-2">
                  <Button variant="gold" type="submit" showArrow disabled={submitting}>
                    {submitting ? "Submitting..." : "Book consultation"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
