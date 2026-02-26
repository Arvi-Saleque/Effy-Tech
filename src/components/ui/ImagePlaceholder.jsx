/* ============================================================
   ImagePlaceholder — Styled placeholder for missing images
   Shows a gradient box with optional text label.
   Supports dark mode for dark-themed sections.
   ============================================================ */

export default function ImagePlaceholder({
  text = "Image",
  dark = false,
  className = "",
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}
        ${
          dark
            ? "bg-gradient-to-br from-neutral-800 via-neutral-900 to-primary-darkest/30"
            : "bg-gradient-to-br from-primary-lightest via-neutral-100 to-neutral-200"
        }`}
    >
      {/* Decorative grid lines for tech feel */}
      {dark && (
        <>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl" />
        </>
      )}
      <span
        className={`relative text-sm font-medium ${dark ? "text-neutral-500" : "text-text-tertiary"}`}
      >
        {text}
      </span>
    </div>
  );
}
