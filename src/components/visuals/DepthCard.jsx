const allowedDepths = new Set([
  "flat",
  "raised",
  "floating",
  "focus",
  "highlight",
]);

export default function DepthCard({
  as: Component = "div",
  children,
  className = "",
  depth = "raised",
  ...props
}) {
  const safeDepth = allowedDepths.has(depth) ? depth : "raised";

  return (
    <Component
      className={`effy-depth-card ${className}`}
      data-depth={safeDepth}
      {...props}
    >
      {children}
    </Component>
  );
}
