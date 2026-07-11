// Renders marker strings from the content modules: text wrapped in *asterisks*
// becomes an italic gold <span>. Content stays JSX-free (one string per locale),
// while the page keeps its exact visual output. `stripMarkers` recovers the
// plain text (used for schema names, alt text and llms-full.txt).

const DEFAULT_SPAN_CLASS = "italic text-gold";

export function stripMarkers(text: string): string {
  return text.replace(/\*/g, "");
}

export default function Highlight({
  text,
  spanClassName = DEFAULT_SPAN_CLASS,
}: {
  text: string;
  spanClassName?: string;
}) {
  // Odd indices are the highlighted segments. Empty parts (e.g. a marker at the
  // very start/end) are dropped so React emits no stray empty text nodes.
  const parts = text.split("*");
  return (
    <>
      {parts.map((part, index) =>
        part === "" ? null : index % 2 === 1 ? (
          <span key={index} className={spanClassName}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
