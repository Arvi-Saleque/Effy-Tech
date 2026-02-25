/* ============================================================
   ImagePlaceholder — Styled placeholder for missing images
   Shows a gradient box with optional text label.
   Useful during development before real assets are added.
   ============================================================ */

export default function ImagePlaceholder({ text = "Image", className = "" }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center 
        bg-gradient-to-br from-primary-lightest via-neutral-100 to-neutral-200 
        ${className}`}
    >
      <span className="text-sm font-medium text-text-tertiary">{text}</span>
    </div>
  );
}
