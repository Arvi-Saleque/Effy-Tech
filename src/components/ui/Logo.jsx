import Image from "next/image";
import Link from "next/link";

const sizeMap = {
  sm: { img: 30, text: "text-lg" },
  md: { img: 39, text: "text-xl" },
  lg: { img: 50, text: "text-2xl" },
};

export default function Logo({ size = "md", light = false, showText = true, className = "" }) {
  const { img, text } = sizeMap[size];
  return (
    <Link href="/" className={`brand-logo ${text} ${className}`}>
      <Image src="/images/logo.png" alt="Effy Tech" width={img} height={img} priority />
      {showText && <span className={light ? "brand-logo-light" : ""}>Effy Tech<small>Smart Solutions. Simple Execution.</small></span>}
    </Link>
  );
}
