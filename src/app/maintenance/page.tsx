import type { Metadata } from "next";
import Logo from "@/components/Logo";
import GoldRule from "@/components/GoldRule";
import { common } from "@/content/de/common";
import { common as commonEn } from "@/content/en/common";

export const metadata: Metadata = {
  title: common.maintenance.metaTitle,
  description: common.maintenance.metaDescription,
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-narrow text-center">
        <div className="flex justify-center mb-12">
          <Logo size="xl" variant="dark" showTagline />
        </div>

        <div className="mx-auto w-24 mb-10">
          <GoldRule />
        </div>

        <h1 className="font-serif text-h1 tracking-tight-h2 font-normal leading-heading mb-6">
          {common.maintenance.title}
        </h1>

        <p className="font-ui text-lead font-light leading-body text-mid-grey mb-3">
          {common.maintenance.body}
        </p>
        <p
          className="font-ui text-body font-light leading-body text-mid-grey/80 mb-10"
          lang="en"
        >
          {commonEn.maintenance.body}
        </p>

        <p className="font-ui text-body font-light leading-body text-mid-grey">
          {common.maintenance.urgentPrefix}
          <a
            href={`mailto:${common.maintenance.email}`}
            className="text-gold hover:text-gold-light transition-colors"
          >
            {common.maintenance.email}
          </a>
        </p>
      </div>
    </div>
  );
}
