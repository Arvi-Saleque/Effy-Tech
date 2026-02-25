/* ============================================================
   Button — Reusable button component
   Variants: primary | secondary | outline | ghost
   Sizes: sm | md | lg
   Renders <a> if href is provided, otherwise <button>.
   ============================================================ */

import Link from "next/link";

const variantStyles = {
  primary:
    "bg-primary text-text-inverse hover:bg-primary-dark active:bg-primary-darkest shadow-sm hover:shadow-md",
  secondary:
    "bg-accent text-neutral-900 hover:bg-accent-dark active:bg-accent-darkest shadow-sm hover:shadow-accent",
  outline:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-text-inverse",
  ghost:
    "bg-transparent text-primary hover:bg-primary-lightest active:bg-primary-light",
  accent:
    "bg-gradient-to-r from-accent-dark via-accent to-accent-light text-neutral-900 font-semibold shadow-sm hover:shadow-accent",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-[var(--transition-base)] cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
