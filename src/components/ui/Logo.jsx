/* ============================================================
   Logo — Brand logo component
   Uses the actual Effy Tech logo image from /images/logo.png.
   Sizes: sm | md | lg
   ============================================================ */

import Image from "next/image";
import Link from "next/link";

const sizeMap = {
  sm: { img: 32, text: "text-lg" },
  md: { img: 40, text: "text-xl" },
  lg: { img: 52, text: "text-2xl" },
};

export default function Logo({
  size = "md",
  light = false,
  showText = true,
  className = "",
}) {
  const { img, text } = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold ${text} ${className}`}
    >
      {/* Logo Image */}
      <Image
        src="/images/logo.png"
        alt="Effy Tech"
        width={img}
        height={img}
        className="object-contain drop-shadow-md"
        priority
        unoptimized
      />

      {/* Logo Text */}
      {showText && (
        <span className={light ? "text-text-inverse" : "text-text-primary"}>
          Effy <span className="text-gradient-accent">Tech</span>
        </span>
      )}
    </Link>
  );
}
