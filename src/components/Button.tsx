import Link from "next/link";

type ButtonVariant = "gold" | "dark" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold text-obsidian hover:bg-gold-light",
  dark: "bg-obsidian text-white hover:bg-charcoal",
  ghost:
    "border border-white/35 text-white bg-transparent hover:border-gold hover:text-gold",
};

function TrailingArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

export default function Button({
  variant = "gold",
  href,
  onClick,
  children,
  type = "button",
  className = "",
  showArrow = false,
  disabled = false,
}: ButtonProps) {
  const baseClasses = `group inline-flex items-center gap-2 font-ui text-xs font-medium uppercase tracking-wide-btn px-8 py-4 cursor-pointer border-none rounded-none transition-all duration-200 active:scale-[0.98] ${variantStyles[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <TrailingArrow />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} no-underline`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {content}
    </button>
  );
}
