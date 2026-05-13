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
    // Static assets served verbatim by Next.js. Includes third-party vendor
    // bundles (html-docx.js etc.) used by the Lab tools — these are not our
    // source code and shouldn't be linted. Lab tool HTML lives here too;
    // any JS we author goes under src/, not public/.
    "public/**",
  ]),
]);

export default eslintConfig;
