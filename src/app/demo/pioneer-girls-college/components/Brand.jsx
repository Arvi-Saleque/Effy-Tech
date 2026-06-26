import Image from "next/image";
import Link from "next/link";
import { ASSET_PATH, institution, ROUTE_BASE } from "../data/college-data";

export default function Brand({ compact = false }) {
  return (
    <Link className={compact ? "pgc-brand pgc-brand--compact" : "pgc-brand"} href={ROUTE_BASE}>
      <span className="pgc-brand__logo">
        <Image
          src={`${ASSET_PATH}/college-logo.png`}
          alt={`${institution.nameBn} লোগো`}
          width={72}
          height={78}
          priority
        />
      </span>
      <span className="pgc-brand__text">
        <strong>{institution.nameBn}</strong>
        <span>{institution.nameEn}</span>
      </span>
    </Link>
  );
}
