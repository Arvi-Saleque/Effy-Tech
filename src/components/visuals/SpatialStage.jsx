export function SpatialLayer({
  as: Component = "div",
  children,
  className = "",
  depth = "mid",
  ...props
}) {
  return (
    <Component
      className={`effy-spatial-layer ${className}`}
      data-layer={depth}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function SpatialStage({
  as: Component = "div",
  children,
  className = "",
  tone = "ivory",
  ...props
}) {
  return (
    <Component
      className={`effy-spatial-stage ${className}`}
      data-tone={tone}
      {...props}
    >
      <div className="effy-spatial-grid" aria-hidden="true" />
      <div className="effy-spatial-glow" aria-hidden="true" />
      {children}
    </Component>
  );
}
