import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone Node.js CLI scripts (CommonJS) — not part of the Next.js app
    "docs/**",
    // Static assets served verbatim by Next.js (incl. the EU AI Act checker
    // HTML under public/lab/) — any JS we author goes under src/, not public/.
    "public/**",
    // Retired Lab tools kept for reference, incl. the third-party html-docx.js
    // bundle — not our source code, not built, not served.
    "archiv/**",
  ]),
]);

export default eslintConfig;
