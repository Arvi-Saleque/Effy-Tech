/* ============================================================
   Badge — Small pill for category labels
   Variants: solid | outline
   Sizes: sm | md
   ============================================================ */

const variantStyles = {
  solid: "bg-primary/10 text-primary-dark border border-primary/20",
  outline: "bg-transparent text-text-secondary border border-border-dark",
  gold: "bg-accent-lightest text-accent-dark border border-accent/25",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  label,
  variant = "solid",
  size = "md",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full 
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {label}
    </span>
  );
}
