import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "outline" | "ghost" | "light" | "outline-light";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
}

/**
 * Every variant defines its own resting, hover and active colours — never
 * override these via className (two competing bg-* classes make the winner
 * depend on stylesheet order, which is how buttons end up white-on-white).
 * On light sections use "primary"/"outline"; on dark green or photo
 * sections use "light"/"outline-light".
 */
const variantClasses = {
    primary:
        "bg-green text-white shadow-accent-b hover:bg-green-light hover:translate-y-[3px] active:bg-purple focus-visible:ring-green",
    outline:
        "border-2 border-green text-green bg-transparent shadow-accent-b hover:bg-green hover:text-white hover:translate-y-[3px] active:border-purple active:bg-purple active:text-white focus-visible:ring-green",
    ghost:
        "text-green underline underline-offset-4 hover:text-purple active:text-purple focus-visible:ring-green",
    light:
        "bg-beige text-green-700 shadow-accent-b hover:bg-beige-dark hover:translate-y-[3px] active:bg-purple active:text-white focus-visible:ring-white",
    "outline-light":
        "border-2 border-beige/80 text-beige-light bg-transparent shadow-accent-b hover:bg-beige hover:border-beige hover:text-green-700 hover:translate-y-[3px] active:border-purple active:bg-purple active:text-white focus-visible:ring-white",
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
        "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
