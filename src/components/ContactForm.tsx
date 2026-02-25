"use client";

import { useState } from "react";
import Button from "./Button";

function RequiredAsterisk() {
  return <span className="text-gold"> *</span>;
}

const inputClasses =
  "border border-ink/10 px-4 py-3 font-ui text-body text-ink bg-cream outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,166,35,0.22)] transition-all";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12">
        <h3 className="font-serif text-h3 tracking-tight-h3 text-ink mb-4">
          Message sent
        </h3>
        <p className="font-ui text-body text-mid-grey">
          Thank you for reaching out. We will respond within 24 hours.
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
          Email<RequiredAsterisk />
        </span>
        <input name="email" type="email" required className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Subject<RequiredAsterisk />
        </span>
        <input name="subject" type="text" required className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey">
          Message<RequiredAsterisk />
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className={`${inputClasses} resize-y`}
        />
      </label>

      <label className="flex items-start gap-3 font-ui text-sm text-mid-grey">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded-none border-ink/20 accent-gold"
        />
        <span>
          I agree that Rautaki may use this information to respond to my
          inquiry.
          <RequiredAsterisk />
        </span>
      </label>

      <div className="mt-2">
        <Button variant="gold" type="submit" showArrow>
          Send message
        </Button>
      </div>
    </form>
  );
}
