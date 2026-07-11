"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CalInline } from "./CalBooking";
import Logo from "./Logo";
import { common } from "@/content/de/common";

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function CalModal({ isOpen, onClose }: CalModalProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
    } else {
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(<CalModalContent onClose={onClose} />, document.body);
}

function CalModalContent({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Initial focus */
  useEffect(() => {
    const timer = setTimeout(() => {
      const focusable = panelRef.current?.querySelector(
        FOCUSABLE,
      ) as HTMLElement | null;
      focusable?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  /* Close on Escape + Tab trapping */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab") {
        const focusable = Array.from(
          panelRef.current?.querySelectorAll(FOCUSABLE) ?? [],
        ) as HTMLElement[];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Close on backdrop click */
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const callFacts = common.calModal.callFacts;

  return (
    <div
      className="fixed inset-0 z-modal flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={handleBackdrop}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm"
        style={{ animation: "fade-in 200ms var(--ease-out-expo) both" }}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={common.calModal.dialogAria}
        className="relative w-full max-w-[900px] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        style={{ animation: "scale-up 300ms var(--ease-spring) both" }}
      >
        {/* Gold top accent */}
        <div className="h-[3px] bg-gold" />

        {/* Charcoal header bar */}
        <div className="bg-charcoal px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo size="sm" variant="dark" />
            <div className="hidden sm:flex items-center gap-8 border-l border-white/10 pl-10">
              {callFacts.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-ui text-xs uppercase tracking-wide-label text-white/35">
                    {label}
                  </span>
                  <span className="font-serif text-[15px] tracking-tight-h4 font-normal text-white leading-tight">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={common.calModal.closeAria}
            className="text-white/40 hover:text-white transition-colors p-2 -mr-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 4l12 12M4 16L16 4" />
            </svg>
          </button>
        </div>

        {/* Cal.com inline embed */}
        <div className="bg-white">
          <CalInline />
        </div>

        {/* Footer note */}
        <div className="bg-white border-t border-ink/[0.07] px-8 py-3">
          <p className="font-ui text-xs text-mid-grey">
            {common.calModal.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
}
