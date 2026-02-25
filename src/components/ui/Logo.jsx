/* ============================================================
   Logo — Brand logo component
   Renders the Effy Tech logo mark + text.
   Sizes: sm | md | lg
   ============================================================ */

import siteConfig from "@/theme/siteConfig";

const sizeStyles = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export default function Logo({ size = "md", light = false, className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-bold ${sizeStyles[size]} ${className}`}
    >
      {/* Logo Mark */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <span className="text-sm font-extrabold text-text-inverse">E</span>
      </div>

      {/* Logo Text */}
      <span className={light ? "text-text-inverse" : "text-text-primary"}>
        {siteConfig.name}
      </span>
    </div>
  );
}
