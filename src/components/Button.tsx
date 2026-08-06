import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-brand-950 hover:bg-gold-300 shadow-[0_0_0_1px_rgba(212,162,76,0.4)]",
  secondary:
    "bg-brand-800 text-cream border border-brand-600 hover:border-gold-400/60 hover:bg-brand-700",
  ghost: "text-cream hover:text-gold-300",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
