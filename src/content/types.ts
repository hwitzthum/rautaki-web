// Typed content model. One interface per content module; `SiteContent`
// aggregates them. The de and en modules each `satisfies` their interface, so
// any structural drift between locales is a compile error. Content is pure
// data — no JSX. Inline emphasis is encoded as marker strings ("wirksame *KI*")
// and rendered through <Highlight> (src/components/Highlight.tsx).

export type Locale = "de" | "en";

// ── common (shared chrome) ───────────────────────────────────────────────────
export interface NavLink {
  href: string;
  label: string;
}

export interface CommonContent {
  skipLink: string;
  graph: {
    orgDescription: string;
    personJobTitle: string;
    personDescription: string;
    credentials: { category: string; name: string }[];
    websiteInLanguage: string;
  };
  nav: {
    aria: string;
    items: NavLink[];
  };
  mobileNav: {
    aria: string;
    openLabel: string;
    closeLabel: string;
  };
  footer: {
    tagline: string;
    navHeading: string;
    navLinks: NavLink[];
    contactHeading: string;
    email: string;
    addressLines: string[];
    linkedInLabel: string;
    copyright: string;
    privacyLabel: string;
    imprintLabel: string;
    cookieSettingsLabel: string;
  };
  calModal: {
    dialogAria: string;
    callFacts: { label: string; value: string }[];
    closeAria: string;
    footerNote: string;
  };
  chat: {
    initialMessages: string[];
    title: string;
    subtitle: string;
    getStarted: string;
    inputPlaceholder: string;
    closeButtonTooltip: string;
  };
  consent: {
    dialogAria: string;
    textBeforeLink: string;
    privacyLinkLabel: string;
    textAfterLink: string;
    deny: string;
    accept: string;
  };
  cookieSettings: {
    label: string;
  };
  serviceCard: {
    moreLabel: string;
  };
  error: {
    label: string;
    title: string;
    body: string;
    retry: string;
  };
  notFound: {
    label: string;
    title: string;
    body: string;
    back: string;
  };
  maintenance: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    body: string;
    urgentPrefix: string;
    email: string;
  };
}

// ── home ─────────────────────────────────────────────────────────────────────
export interface HomeContent {
  metaTitle: string;
  metaDescription: string;
  heroDark: {
    headlineLines: [string, string, string];
    intro: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  stats: { value: number; suffix: string; label: string; source: string }[];
  credentialsLabel: string;
  credentials: string[];
  problem: {
    label: string;
    heading: string;
    body: string;
  };
  serviceCards: {
    label: string;
    heading: string;
    cta: string;
  };
  why: {
    label: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  cta: {
    label: string;
    heading: string;
    body: string;
    button: string;
    pricePrefix: string;
    priceLinkLabel: string;
    priceSuffix: string;
  };
}

// ── services ─────────────────────────────────────────────────────────────────
export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  /** Marker string for <Highlight>; plain form via stripMarkers(). */
  title: string;
  shortDesc: string;
  longDesc: string;
  detailHeading: string;
  forWhom: string;
  image: string;
}

export interface ServicesContent {
  metaTitle: string;
  metaDescription: string;
  items: ServiceItem[];
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  overview: {
    label: string;
    heading: string;
  };
  serviceBridgeNote: string;
  serviceBridgeLink: string;
  journeySection: {
    label: string;
    heading: string;
    intro: string;
    resultLabel: string;
    detailLink: string;
    bookletLink: string;
    audience: string;
  };
  pricing: {
    label: string;
    heading: string;
    intro: string;
    items: { format: string; price: string; description: string }[];
    note: string;
  };
  education: {
    label: string;
    heading: string;
    body: string;
    link: string;
  };
  faqSection: {
    label: string;
    heading: string;
  };
  cta: {
    heading: string;
    body: string;
    button: string;
  };
  breadcrumbLabel: string;
  schema: {
    offerCatalogName: string;
    offers: { name: string; description: string }[];
    hourlyUnitText: string;
    howToName: string;
    howToDescription: string;
    areaServedName: string;
    serviceType: string;
  };
}

// ── faq ──────────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export interface FaqContent {
  items: FaqItem[];
}

// ── journey ──────────────────────────────────────────────────────────────────
export type JourneyItem =
  | { kind: "phase"; label: string }
  | {
      kind: "step";
      no: string;
      title: string;
      question: string;
      activity: string;
      outcome: string;
    }
  | { kind: "gate"; label: string; note: string };

export interface JourneyContent {
  items: JourneyItem[];
}

// ── vorgehen ─────────────────────────────────────────────────────────────────
export interface VorgehenContent {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  outcomes: { title: string; description: string }[];
  complianceIntro: string;
  compliance: { label: string; description: string }[];
  collaboration: { label: string; title: string; description: string }[];
  collaborationNote: string;
  heroLabel: string;
  heroTitle: string;
  outcomesSection: {
    label: string;
    heading: string;
  };
  complianceSection: {
    label: string;
    heading: string;
  };
  collaborationSection: {
    label: string;
    heading: string;
    tariffLinkLabel: string;
  };
  cta: {
    heading: string;
    body: string;
    button: string;
    bookletLink: string;
  };
  breadcrumbLabel: string;
  resultLabel: string;
  schema: {
    howToName: string;
    bookletName: string;
    bookletDescription: string;
    resultLabel: string;
  };
}

// ── about ────────────────────────────────────────────────────────────────────
export interface TeachingCourse {
  title: string;
  institution: string;
  url: string;
}

export interface AboutContent {
  metaTitle: string;
  metaDescription: string;
  workshopClients: string[];
  teachingCourses: TeachingCourse[];
  values: { title: string; description: string }[];
  heroLabel: string;
  hero: {
    tagline: string;
    nameHeading: string;
    brandRautaki: string;
    namePara1Mid: string;
    brandStrategie: string;
    namePara2: string;
    namePara3: string;
    whyHeading: string;
    whyPara1: string;
    whyPara2Prefix: string;
    whyPara2Seg1: string;
    brandA: string;
    whyPara2And: string;
    brandI: string;
    whyPara2Seg3: string;
    brandAI: string;
    whyPara2Seg4: string;
    portraitAlt: string;
    portraitName: string;
    portraitRole: string;
  };
  perspective: {
    label: string;
    heading: string;
    para1a: string;
    und: string;
    para1b: string;
    para1c: string;
    para1d: string;
    para2: string;
    para3: string;
    quote: string;
  };
  work: {
    label: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  approach: {
    label: string;
    heading: string;
    para1: string;
    para2: string;
    quote: string;
  };
  founding: {
    label: string;
    heading: string;
    para1: string;
    para2: string;
    para3: string;
    para4: string;
    portraitAlt: string;
  };
  workshops: {
    label: string;
    heading: string;
    intro: string;
  };
  teaching: {
    label: string;
    heading: string;
    intro: string;
  };
  valuesSection: {
    label: string;
    heading: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    button: string;
  };
  breadcrumbLabel: string;
  schema: {
    profileName: string;
  };
}

// ── booking ──────────────────────────────────────────────────────────────────
export interface BookingContent {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  callFactsHeading: string;
  callFacts: { label: string; value: string }[];
  expectationsLabel: string;
  expectations: { number: string; title: string; body: string }[];
  calendar: {
    label: string;
    note: string;
  };
  breadcrumbLabel: string;
}

// ── imprint ──────────────────────────────────────────────────────────────────
export interface ImprintContent {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  company: {
    label: string;
    heading: string;
    name: string;
    addressLines: string[];
    legalFormLabel: string;
    legalFormValue: string;
    uidLabel: string;
    uidValue: string;
  };
  contact: {
    label: string;
    heading: string;
    emailPrefix: string;
    email: string;
  };
  representation: {
    label: string;
    heading: string;
    person: string;
  };
  liability: {
    label: string;
    heading: string;
    para1: string;
    para2: string;
  };
}

// ── privacy ──────────────────────────────────────────────────────────────────
export interface PrivacyContent {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  responsible: {
    label: string;
    heading: string;
    name: string;
    addressLines: string[];
    email: string;
  };
  collection: {
    label: string;
    heading: string;
    para1: string;
    para2: string;
  };
  cookies: {
    label: string;
    heading: string;
    para1: string;
    para2a: string;
    cookieSettingsLabel: string;
    para2b: string;
    paraLocale: string;
  };
  rights: {
    label: string;
    heading: string;
    para1a: string;
    email: string;
    para1b: string;
  };
  providers: {
    label: string;
    heading: string;
    subheading: string;
    items: { name: string; description: string }[];
  };
  contact: {
    label: string;
    heading: string;
    para1a: string;
    email: string;
    para1b: string;
  };
}

// ── aggregate ────────────────────────────────────────────────────────────────
export interface SiteContent {
  common: CommonContent;
  home: HomeContent;
  services: ServicesContent;
  faq: FaqContent;
  journey: JourneyContent;
  vorgehen: VorgehenContent;
  about: AboutContent;
  booking: BookingContent;
  imprint: ImprintContent;
  privacy: PrivacyContent;
}
