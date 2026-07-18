export default function DeviceMockup({
  children,
  className = "",
  label = "Mobile product preview",
  variant = "phone",
}) {
  return (
    <div
      aria-label={label}
      className={`effy-device-mockup ${className}`}
      data-device={variant}
      role="img"
    >
      <div className="effy-device-speaker" aria-hidden="true" />
      <div className="effy-device-screen">{children}</div>
    </div>
  );
}
