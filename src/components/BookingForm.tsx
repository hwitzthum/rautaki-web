"use client";

import { useState } from "react";
import Button from "./Button";

const WEBHOOK_URL =
  "https://n8n-service-ayxj.onrender.com/webhook/booking";

function RequiredAsterisk() {
  return <span className="text-gold"> *</span>;
}

const inputClasses =
  "border border-ink/10 px-4 py-3 font-ui text-body text-ink bg-cream outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,166,35,0.22)] transition-all";

export default function BookingForm() {
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
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12">
        <h3 className="font-serif text-h3 tracking-tight-h3 text-ink mb-4">
          Booking received
        </h3>
        <p className="font-ui text-body text-mid-grey">
          Thank you for booking a consultation. We will confirm your session
          within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Name<RequiredAsterisk />
        </span>
        <input name="name" type="text" required className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Company (optional)
        </span>
        <input name="company" type="text" placeholder="Your organisation" className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Email<RequiredAsterisk />
        </span>
        <input name="email" type="email" required className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Topic<RequiredAsterisk />
        </span>
        <input
          name="topic"
          type="text"
          required
          placeholder="e.g. AI strategy, model governance, leadership adaptation"
          className={inputClasses}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
            Preferred date<RequiredAsterisk />
          </span>
          <input name="date" type="date" required className={inputClasses} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
            Preferred time<RequiredAsterisk />
          </span>
          <input name="time" type="time" required className={inputClasses} />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Message (optional)
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Any additional context about your consultation needs"
          className={`${inputClasses} resize-y`}
        />
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
  );
}