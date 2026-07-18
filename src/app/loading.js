export default function Loading() {
  return (
    <div
      className="effy-route-loader"
      role="status"
      aria-label="Loading Effy Tech page"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="effy-loader-stage" aria-hidden="true">
        <div className="effy-loader-grid" />
        <div className="effy-loader-halo" />
        <div className="effy-loader-mark">
          <span />
          <span />
          <span />
        </div>
        <div className="effy-loader-plinth" />
      </div>
      <div className="effy-loader-copy" aria-hidden="true">
        <strong>EFFY TECH</strong>
        <span>Preparing your experience</span>
      </div>
    </div>
  );
}
