import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";

export default function ServiceCard({ service }) {
  const linkProps = service.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link className="pgc-service-card" href={service.href} {...linkProps}>
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
