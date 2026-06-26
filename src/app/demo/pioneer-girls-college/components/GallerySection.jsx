import Image from "next/image";
import { galleryItems, ROUTE_BASE } from "../data/college-data";
import SectionHeader from "./SectionHeader";

export default function GallerySection({ compact = true }) {
  const items = compact ? galleryItems : galleryItems;

  return (
    <section className="pgc-section pgc-section--soft">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="গ্যালারি"
          title="প্রতিষ্ঠানের কার্যক্রম ও ক্যাম্পাস মুহূর্ত"
          subtitle="অতিরঞ্জিত অ্যানিমেশন ছাড়া পরিষ্কার ক্যাপশন, অ্যালবাম বিভাগ ও অ্যাক্সেসিবল অল্ট টেক্সট।"
          action={compact ? { label: "পূর্ণ গ্যালারি", href: `${ROUTE_BASE}/gallery` } : undefined}
        />
        <div className="pgc-gallery-grid">
          {items.map((item, index) => (
            <figure className={`pgc-gallery-item pgc-gallery-item--${index + 1}`} key={item.image}>
              <Image
                src={item.image}
                alt={item.alt}
                width={760}
                height={480}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <figcaption>
                <span>{item.album}</span>
                <strong>{item.caption}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
