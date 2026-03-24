import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary:
    "bg-green text-white hover:bg-green-light focus-visible:ring-green",
  outline:
    "border border-green text-green bg-transparent hover:bg-green hover:text-white focus-visible:ring-green",
  ghost:
    "text-green underline underline-offset-4 hover:text-green-light focus-visible:ring-green",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center font-medium tracking-wide",
    "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
