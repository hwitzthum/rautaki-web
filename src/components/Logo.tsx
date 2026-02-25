import Link from "next/link";

type LogoSize = "xl" | "md" | "sm" | "xs";
type LogoVariant = "dark" | "light";

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  showTagline?: boolean;
}

const sizeClasses: Record<LogoSize, string> = {
  xl: "text-logo-xl",
  md: "text-logo-md",
  sm: "text-logo-sm",
  xs: "text-logo-xs",
};

export default function Logo({
  size = "sm",
  variant = "dark",
  showTagline = false,
}: LogoProps) {
  const baseColor =
    variant === "dark" ? "text-white" : "text-ink";

  return (
    <Link href="/" aria-label="Rautaki — home" className="inline-block">
      <div
        className={`font-serif font-normal leading-none tracking-tight-h4 ${sizeClasses[size]} ${baseColor}`}
        style={{ letterSpacing: "-0.01em" }}
      >
        R<span>aut</span>
        <span className="text-gold">a</span>
        <span>k</span>
        <span className="text-gold">i</span>
      </div>
      {showTagline && (size === "xl" || size === "md") && (
        <div className="mt-2 font-ui text-xs font-normal uppercase tracking-wide-label text-mid-grey">
          Strategy · Advisory · Growth
        </div>
      )}
    </Link>
  );
}
