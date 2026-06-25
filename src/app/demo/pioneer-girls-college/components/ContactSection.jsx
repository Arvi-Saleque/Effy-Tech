import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { institution } from "../data/college-data";
import SectionHeader from "./SectionHeader";

export default function ContactSection() {
  const contactRows = [
    { icon: MapPin, label: "ঠিকানা", value: institution.contact.address },
    { icon: Phone, label: "ফোন", value: institution.contact.phone },
    { icon: Mail, label: "ই-মেইল", value: institution.contact.email },
    { icon: Clock3, label: "অফিস সময়", value: institution.contact.hours },
  ];

  return (
    <section className="pgc-section pgc-section--soft">
      <div className="pgc-container pgc-contact-grid">
        <div>
          <SectionHeader
            eyebrow="যোগাযোগ"
            title="কলেজ অফিস ও অবস্থান"
            subtitle="বর্তমান ফোন, ই-মেইল, অফিস সময় ও নির্ভুল ম্যাপ কর্তৃপক্ষ যাচাইয়ের পর যুক্ত করার জন্য এই অংশ প্রস্তুত।"
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
        <div className="pgc-map-placeholder" role="img" aria-label="যাচাইকৃত ম্যাপ যুক্ত করার স্থান">
          <div className="pgc-map-placeholder__grid" />
          <div className="pgc-map-placeholder__card">
            <MapPin size={24} aria-hidden="true" />
            <strong>যাচাইকৃত ম্যাপ যুক্ত করা হবে</strong>
            <span>ভুল লোকেশন এড়াতে Google Map এমবেড করা হয়নি।</span>
          </div>
        </div>
      </div>
    </section>
  );
}
