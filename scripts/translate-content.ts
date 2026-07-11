// One-time DeepL translation of the German content modules into
// src/content/en/*. Run locally — production never calls DeepL:
//
//   npm run translate            # translates modules that have no en file yet
//   npm run translate -- --only=faq,home   # (re)translate specific modules
//   npm run translate -- --force           # overwrite ALL en files
//
// Requires DEEPL_API_KEY in .env.local (loaded via --env-file, see package.json).
// Generated files are drafts: review and edit them before committing — they are
// the committed source of truth afterwards, protected from accidental overwrite
// by the no-overwrite guard above.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { common } from "../src/content/de/common.ts";
import { home } from "../src/content/de/home.ts";
import { services } from "../src/content/de/services.ts";
import { faq } from "../src/content/de/faq.ts";
import { journey } from "../src/content/de/journey.ts";
import { vorgehen } from "../src/content/de/vorgehen.ts";
import { about } from "../src/content/de/about.ts";
import { booking } from "../src/content/de/booking.ts";
import { imprint } from "../src/content/de/imprint.ts";
import { privacy } from "../src/content/de/privacy.ts";

const MODULES: Record<string, unknown> = {
  common,
  home,
  services,
  faq,
  journey,
  vorgehen,
  about,
  booking,
  imprint,
  privacy,
};

// Keys whose string values are locale-invariant and copied verbatim.
const SKIP_KEYS = new Set([
  "id",
  "slug",
  "image",
  "href",
  "url",
  "path",
  "number",
  "no",
  "kind",
  "email",
  "institution",
  "source",
]);

// Exact strings DeepL must not touch (longest first, so e.g. the full course
// title wins over the bare "CAS"). Official names, brands, people, places.
const PROTECTED_TERMS = [
  "Digitale Transformation und KI in NPO",
  "CAS KI als Teammitglied",
  "CAS KI-Transformation",
  "CAS Chief AI Officer",
  "CAS AI Hands-On",
  "Chief AI Officer",
  "Harry Siegbert Witzthum",
  "Harry Witzthum",
  "Witzthum",
  "Rautaki",
  "Kilchberg",
  "Weinbergstrasse",
  "te reo Māori",
  "EU AI Act",
  "Custom GPTs",
  "Salesflare",
  "NEXT_LOCALE",
  "Holacracy",
  "LinkedIn",
  "ResearchGate",
  "Cal.com",
  "CHF",
  "VMI",
  "ikf",
];

const escapeXml = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const unescapeXml = (s: string) =>
  s.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");

// German string → XML-safe DeepL input: gold-highlight markers become <hl>
// (translated in place, position preserved), protected terms become <keep>
// (excluded from translation via ignore_tags).
function protect(text: string): string {
  let s = escapeXml(text);
  s = s.replace(/\*([^*]+)\*/g, "<hl>$1</hl>");
  for (const term of PROTECTED_TERMS) {
    s = s.replaceAll(escapeXml(term), `<keep>${escapeXml(term)}</keep>`);
  }
  return s;
}

function unprotect(text: string): string {
  return unescapeXml(
    text
      .replace(/<\/?keep>/g, "")
      .replace(/<hl>/g, "*")
      .replace(/<\/hl>/g, "*")
      .trim(),
  );
}

interface Slot {
  container: Record<string, unknown> | unknown[];
  key: string | number;
  text: string;
  // Leading/trailing whitespace is meaningful on seam strings that render
  // adjacent to links ("E-Mail: ", " — CRM …") — kept out of the DeepL
  // round-trip and re-attached verbatim.
  lead: string;
  trail: string;
}

function toSlot(
  container: Record<string, unknown> | unknown[],
  key: string | number,
  value: string,
): Slot {
  const [, lead, core, trail] = value.match(/^(\s*)([\s\S]*?)(\s*)$/)!;
  return { container, key, text: protect(core), lead, trail };
}

// Collect every translatable string slot (mutable reference + prepared text).
function collect(
  node: unknown,
  keyOfNode: string | number | null,
  out: Slot[],
): void {
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      if (typeof v === "string") {
        if (!skip(keyOfNode, v)) out.push(toSlot(node, i, v));
      } else {
        collect(v, keyOfNode, out);
      }
    });
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      if (typeof v === "string") {
        if (!skip(k, v)) {
          out.push(toSlot(node as Record<string, unknown>, k, v));
        }
      } else {
        collect(v, k, out);
      }
    }
  }
}

const skip = (key: string | number | null, value: string) =>
  (typeof key === "string" && SKIP_KEYS.has(key)) ||
  !/[A-Za-zÄÖÜäöüß]/.test(value);

async function deeplTranslate(
  texts: string[],
  apiKey: string,
): Promise<string[]> {
  const host = apiKey.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";
  const results: string[] = [];
  for (let i = 0; i < texts.length; i += 50) {
    const batch = texts.slice(i, i + 50);
    const res = await fetch(`https://${host}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: batch,
        source_lang: "DE",
        target_lang: "EN-GB",
        tag_handling: "xml",
        ignore_tags: ["keep"],
      }),
    });
    if (!res.ok) {
      throw new Error(`DeepL ${res.status}: ${await res.text()}`);
    }
    const data = (await res.json()) as { translations: { text: string }[] };
    results.push(...data.translations.map((t) => t.text));
    process.stdout.write(
      `  ${Math.min(i + 50, texts.length)}/${texts.length} strings\n`,
    );
  }
  return results;
}

// Serialize the translated object as a TS module mirroring the de original.
function renderModule(name: string, value: unknown): string {
  const iface = `${name[0].toUpperCase()}${name.slice(1)}Content`;
  const body = JSON.stringify(value, null, 2);
  return `// GENERATED from src/content/de/${name}.ts by scripts/translate-content.ts (DeepL, EN-GB).
// Review before commit — after review, THIS file is the source of truth for
// English copy and must be edited by hand (the script refuses to overwrite it
// without --force / --only).

import type { ${iface} } from "../types";

export const ${name} = ${body} satisfies ${iface};
`;
}

async function main() {
  const args = process.argv.slice(2);
  // --dry-run: exercise the full pipeline (collect → protect → unprotect →
  // serialize) without calling DeepL; strings pass through untranslated.
  const dryRun = args.includes("--dry-run");
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey && !dryRun) {
    console.error(
      "DEEPL_API_KEY missing — add it to .env.local (local use only).",
    );
    process.exit(1);
  }
  const force = args.includes("--force");
  const only = args
    .filter((a) => a.startsWith("--only="))
    .flatMap((a) => a.replace("--only=", "").split(","))
    .filter(Boolean);

  const outDir = join(
    dirname(fileURLToPath(import.meta.url)),
    "../src/content/en",
  );
  mkdirSync(outDir, { recursive: true });

  for (const [name, deValue] of Object.entries(MODULES)) {
    if (only.length > 0 && !only.includes(name)) continue;
    const outFile = join(outDir, `${name}.ts`);
    if (existsSync(outFile) && !force && only.length === 0) {
      console.log(
        `skip ${name} (en file exists — use --force or --only=${name})`,
      );
      continue;
    }

    const clone = structuredClone(deValue);
    const slots: Slot[] = [];
    collect(clone, null, slots);
    console.log(`${name}: translating ${slots.length} strings…`);
    const texts = slots.map((s) => s.text);
    const translated = dryRun ? texts : await deeplTranslate(texts, apiKey!);
    slots.forEach((slot, i) => {
      (slot.container as Record<string | number, unknown>)[slot.key] =
        slot.lead + unprotect(translated[i]) + slot.trail;
    });

    writeFileSync(outFile, renderModule(name, clone), "utf-8");
    console.log(`→ src/content/en/${name}.ts written`);
  }
  console.log("Done. Review the generated files before committing.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
