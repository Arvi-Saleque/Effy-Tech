/* ============================================================
   SectionHeading — Reusable section title + subtitle
   Consistent typography across all sections.
   alignment: left | center | right
   ============================================================ */

export default function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  light = false,
  className = "",
}) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-text-inverse" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl ${
            alignment === "center" ? "mx-auto" : ""
          } ${light ? "text-neutral-300" : "text-text-secondary"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
