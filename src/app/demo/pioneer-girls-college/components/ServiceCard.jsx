import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";

export default function ServiceCard({ service }) {
  return (
    <Link className="pgc-service-card" href={service.href}>
      <span className="pgc-service-card__icon">
        <Icon name={service.icon} />
      </span>
      <span>
        <strong>{service.title}</strong>
        <small>{service.description}</small>
      </span>
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
