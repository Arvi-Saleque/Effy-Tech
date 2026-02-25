/* ============================================================
   SectionWrapper — Consistent section container
   Provides max-width, vertical padding, anchor ID,
   and optional background color for every section.
   ============================================================ */

export default function SectionWrapper({
  id,
  children,
  className = "",
  bgClass = "",
  fullWidth = false,
}) {
  return (
    <section
      id={id}
      className={`w-full py-20 md:py-28 ${bgClass} ${className}`}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      )}
    </section>
  );
}
