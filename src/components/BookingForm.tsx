"use client";

import type { RefObject } from "react";
import Button from "./Button";
import { RequiredAsterisk, inputClasses, useBookingSubmit } from "./BookingShared";

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
          Buchungsanfrage eingegangen
        </h3>
        <p className="font-ui text-body text-mid-grey">
          Vielen Dank für Ihre Buchung. Wir bestätigen Ihre Sitzung innerhalb
          eines Arbeitstags.
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
          Organisation (optional)
        </span>
        <input name="company" type="text" placeholder="Ihre Organisation" className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          E-Mail<RequiredAsterisk />
        </span>
        <input name="email" type="email" required aria-required="true" className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Thema<RequiredAsterisk />
        </span>
        <input
          name="topic"
          type="text"
          required
          aria-required="true"
          placeholder="z. B. KI-Strategie, Governance, Führungsanpassung"
          className={inputClasses}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
            Bevorzugtes Datum<RequiredAsterisk />
          </span>
          <input name="date" type="date" required aria-required="true" className={inputClasses} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
            Bevorzugte Uhrzeit<RequiredAsterisk />
          </span>
          <input name="time" type="time" required aria-required="true" className={inputClasses} />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Nachricht (optional)
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Weitere Informationen zu Ihrem Beratungsbedarf"
          className={`${inputClasses} resize-y`}
        />
      </label>

      {error && (
        <p className="font-ui text-sm text-error" role="alert">{error}</p>
      )}

      <div className="mt-2">
        <Button variant="gold" type="submit" showArrow disabled={submitting}>
          {submitting ? "Wird gesendet…" : "Beratung anfragen"}
        </Button>
      </div>
    </form>
  );
}