"use client";

import type { RefObject } from "react";
import Button from "./Button";
import { RequiredAsterisk, inputClasses, useBookingSubmit } from "./booking-shared";

interface BookingFormProps {
  firstInputRef?: RefObject<HTMLInputElement | null>;
  onSuccess?: () => void;
}

export default function BookingForm({ firstInputRef, onSuccess }: BookingFormProps) {
  const { submitted, submitting, error, handleSubmit } = useBookingSubmit();

  if (submitted) {
    onSuccess?.();
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
        <input ref={firstInputRef} name="name" type="text" required aria-required="true" className={inputClasses} />
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
        <input name="email" type="email" required aria-required="true" className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Topic<RequiredAsterisk />
        </span>
        <input
          name="topic"
          type="text"
          required
          aria-required="true"
          placeholder="e.g. AI strategy, model governance, leadership adaptation"
          className={inputClasses}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
            Preferred date<RequiredAsterisk />
          </span>
          <input name="date" type="date" required aria-required="true" className={inputClasses} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
            Preferred time<RequiredAsterisk />
          </span>
          <input name="time" type="time" required aria-required="true" className={inputClasses} />
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
        <p className="font-ui text-sm text-error" role="alert">{error}</p>
      )}

      <div className="mt-2">
        <Button variant="gold" type="submit" showArrow disabled={submitting}>
          {submitting ? "Submitting..." : "Book consultation"}
        </Button>
      </div>
    </form>
  );
}