import "./globals.css";
import siteConfig from "@/theme/siteConfig";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Custom Software, Apps & Automation | Effy Tech",
    description: siteConfig.description,
    images: [
      {
        url: "/images/services/og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Effy Tech connected software services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software, Apps & Automation | Effy Tech",
    description: siteConfig.description,
    images: ["/images/services/og-1200x630.jpg"],
  },
  icons: { shortcut: "/favicon.ico" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
    addressCountry: "BD",
  },
  sameAs: siteConfig.socials.map((social) => social.url),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
