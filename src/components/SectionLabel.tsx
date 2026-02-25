interface SectionLabelProps {
  text: string;
  variant?: "dark" | "light";
}

export default function SectionLabel({
  text,
  variant = "light",
}: SectionLabelProps) {
  const textColor =
    variant === "dark" ? "text-white/18" : "text-mid-grey";
  const lineColor =
    variant === "dark" ? "bg-white/18" : "bg-gold";

  return (
    <div
      className={`flex items-center gap-[14px] mb-10 font-ui text-xs font-medium uppercase tracking-wide-label ${textColor}`}
    >
      <span
        className={`w-7 h-px flex-shrink-0 ${lineColor}`}
        aria-hidden="true"
      />
      {text}
    </div>
  );
}
