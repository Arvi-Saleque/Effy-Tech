export default function BrowserMockup({
  children,
  className = "",
  label = "Web product preview",
  title = "effy.tech",
}) {
  return (
    <div
      aria-label={label}
      className={`effy-browser-mockup ${className}`}
      role="img"
    >
      <div className="effy-browser-bar">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <small>{title}</small>
      </div>
      <div className="effy-browser-screen">{children}</div>
    </div>
  );
}
