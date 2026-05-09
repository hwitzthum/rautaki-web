interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

// Escape characters that could break out of an inline <script> tag.
// JSON \uXXXX escapes are valid JSON and invisible to the HTML parser.
function safeJsonLd(schema: JsonLdProps["schema"]): string {
  return JSON.stringify(schema)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
