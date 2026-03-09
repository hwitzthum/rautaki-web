"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import BookingForm from "./BookingForm";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

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

function BookingModalContent({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
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
        aria-labelledby="booking-modal-title"
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
              <h2 id="booking-modal-title" className="font-serif text-h3 tracking-tight-h3 text-ink mb-4">
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
              <h2 id="booking-modal-title" className="font-serif text-h3 tracking-tight-h3 text-ink mb-2">
                Reserve a consultation
              </h2>
              <p className="font-ui text-sm text-mid-grey mb-8">
                Share your context and we will reply within one business day.
              </p>

              <BookingForm
                firstInputRef={firstInputRef}
                onSuccess={() => setSubmitted(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}