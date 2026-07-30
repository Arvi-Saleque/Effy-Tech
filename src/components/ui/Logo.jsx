import Image from "next/image";
import Link from "next/link";

const sizeMap = {
  sm: { width: 30, text: "text-lg" },
  md: { width: 39, text: "text-xl" },
  lg: { width: 50, text: "text-2xl" },
};

export default function Logo({ size = "md", light = false, showText = true, className = "" }) {
  const { width, text } = sizeMap[size];
  return (
    <Link href="/" className={`brand-logo ${text} ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Effy Tech"
        width={1115}
        height={740}
        style={{ width, height: "auto" }}
        priority
      />
      {showText && <span className={light ? "brand-logo-light" : ""}>Effy Tech<small>Smart Solutions. Simple Execution.</small></span>}
    </Link>
  );
}
