// GENERATED from src/content/de/privacy.ts by scripts/translate-content.ts (DeepL, EN-GB).
// Review before commit — after review, THIS file is the source of truth for
// English copy and must be edited by hand (the script refuses to overwrite it
// without --force / --only).

import type { PrivacyContent } from "../types";

export const privacy = {
  metaTitle: "Data Protection",
  metaDescription:
    "Rautaki’s Privacy Policy — Handling of personal data, cookies, consent and your rights under the revDSG.",
  heroLabel: "Data Protection",
  heroTitle: "Privacy Policy",
  heroDescription:
    "Information on the processing of your personal data in accordance with the Swiss Data Protection Act (nDSG) and the EU General Data Protection Regulation (GDPR).",
  responsible: {
    label: "Responsible",
    heading: "Data controller",
    name: "Rautaki",
    addressLines: ["Weinbergstrasse 23", "8802 Kilchberg / ZH", "Switzerland"],
    email: "hello@rautaki.ch",
  },
  collection: {
    label: "Data collection",
    heading: "What data we collect",
    para1:
      "When you use our booking form, we collect the details you enter (name, company, email address, preferred date and message) so that we can process your enquiry for a consultation.",
    para2:
      "When you visit our website, technical data is automatically collected (e.g. IP address, browser type, time of access). This data is processed via Sentry for the purposes of error detection and performance monitoring.",
  },
  cookies: {
    label: "Cookies & Tracking",
    heading: "Cookies & Tracking",
    para1:
      "We use the Salesflare service to track which pages of our website are visited by our contacts. To do this, a tracking cookie is set which links website visits to a contact, provided that they have previously clicked on a link in one of our emails.",
    para2a:
      "This cookie is set only with your explicit consent. On your first visit, we will ask for your consent via a notice at the bottom of the page. You can withdraw your consent at any time via the ",
    cookieSettingsLabel: "Cookie settings",
    para2b: " link in the footer.",
    paraLocale:
      "In addition, we use a technically necessary cookie (NEXT_LOCALE) which stores your language preference (German or English) for one year. It does not contain any personal data, serves solely to ensure the website functions properly, and does not require your consent.",
  },
  rights: {
    label: "Your rights",
    heading: "Your rights",
    para1a:
      "You have the right to access, rectify and erase your personal data. For enquiries, please contact ",
    email: "hello@rautaki.ch",
    para1b: ".",
  },
  providers: {
    label: "Service provider",
    heading: "Other service providers",
    subheading: "Other service providers",
    items: [
      {
        name: "Cal.com Inc.",
        description:
          " — Appointment booking system (USA; data transfer based on standard contractual clauses)",
      },
      {
        name: "Vercel Inc.",
        description:
          " — Web hosting and deployment (USA; data transfers based on standard contractual clauses)",
      },
      {
        name: "Salesflare BV",
        description: " — CRM, website and email tracking (Belgium/EU)",
      },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Questions about data protection",
    para1a:
      "If you have any questions regarding data protection, please contact us at ",
    email: "hello@rautaki.ch",
    para1b: ".",
  },
} satisfies PrivacyContent;
