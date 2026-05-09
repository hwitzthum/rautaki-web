"use client";

import { useState } from "react";

export function RequiredAsterisk() {
  return <span className="text-gold" aria-hidden="true"> *</span>;
}

export const inputClasses =
  "border border-ink/10 px-4 py-3 font-ui text-body text-ink bg-cream outline-none focus:border-gold focus:shadow-[0_0_0_3px_var(--color-gold-focus)] transition-all";

export function useBookingSubmit(errorMessage?: string) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const dateValue = formData.get("date") as string;
    const timeValue = formData.get("time") as string;
    const dateTime =
      dateValue && timeValue ? `${dateValue}T${timeValue}:00` : dateValue || "";

    const payload = {
      name: formData.get("name") as string,
      company: (formData.get("company") as string) || "",
      email: formData.get("email") as string,
      topic: formData.get("topic") as string,
      date: dateTime,
      message: (formData.get("message") as string) || "",
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setSubmitted(true);
    } catch {
      setError(errorMessage ?? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an hello@rautaki.ch.");
    } finally {
      setSubmitting(false);
    }
  };

  return { submitted, submitting, error, handleSubmit };
}