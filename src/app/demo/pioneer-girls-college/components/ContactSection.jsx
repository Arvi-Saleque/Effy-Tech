import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { institution } from "../data/college-data";
import SectionHeader from "./SectionHeader";

export default function ContactSection() {
  const contactRows = [
    { icon: MapPin, label: "ঠিকানা", value: institution.contact.address },
    { icon: Phone, label: "অফিস ফোন", value: institution.contact.phone },
    { icon: Mail, label: "ই-মেইল", value: institution.contact.email },
  ];

  return (
    <section className="pgc-section pgc-section--soft">
      <div className="pgc-container pgc-contact-grid">
        <div>
          <SectionHeader
            eyebrow="যোগাযোগ"
            title="কলেজ অফিস ও অবস্থান"
            subtitle="কলেজ অফিস, ঠিকানা, অফিস ফোন, ই-মেইল এবং যাচাইকৃত Google Maps অবস্থান।"
          />
          <div className="pgc-contact-list">
            {contactRows.map(({ icon: IconComponent, label, value }) => (
              <div key={label}>
                <IconComponent size={20} aria-hidden="true" />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="pgc-map-frame">
          <iframe
            title="Government Pioneer Women's College, Khulna map"
            src={institution.contact.mapEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="pgc-map-frame__card">
            <MapPin size={22} aria-hidden="true" />
            <strong>{institution.contact.address}</strong>
            <a href={institution.contact.mapUrl} target="_blank" rel="noopener noreferrer">
              Google Maps এ খুলুন
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
