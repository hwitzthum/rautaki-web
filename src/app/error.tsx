"use client";

import Button from "@/components/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="bg-cream px-6 sm:px-10 lg:px-20 py-32">
      <div className="mx-auto max-w-content text-center">
        <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-4">
          Something went wrong
        </h2>
        <p className="font-ui text-body font-light leading-body text-mid-grey mb-10">
          An unexpected error occurred. Please try again.
        </p>
        <Button variant="dark" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </section>
  );
}