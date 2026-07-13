import Logo from "@/components/ui/Logo";
import siteConfig from "@/theme/siteConfig";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="new-footer">
      <div className="home-shell footer-grid">
        <div className="footer-brand">
          <Logo size="md" light />
          <p>Custom software systems that help businesses operate with more clarity, control, and scale.</p>
          <span>{siteConfig.tagline}</span>
        </div>
        <div>
          <h3>Navigate</h3>
          <a href="/#services">Services</a><a href="/#work">Projects</a><a href="/#process">Process</a><a href="/#technology">Technology</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="/#about">About</a><a href="/#team">Team</a><a href="/#faq">FAQ</a><a href="/#contact">Contact</a>
        </div>
        <div>
          <h3>Connect</h3>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
          <p>{siteConfig.contact.address}</p>
          <div className="footer-socials">
            <a href={siteConfig.socials.find((s) => s.platform === "facebook")?.url} aria-label="Facebook"><span>f</span></a>
            <a href={siteConfig.socials.find((s) => s.platform === "linkedin")?.url} aria-label="LinkedIn"><span>in</span></a>
            <a href={siteConfig.socials.find((s) => s.platform === "instagram")?.url} aria-label="Instagram"><span>ig</span></a>
          </div>
        </div>
      </div>
      <div className="home-shell footer-bottom"><span>© {new Date().getFullYear()} Effy Tech. All rights reserved.</span><a href="#hero">Back to top <ArrowUpRight size={15}/></a></div>
    </footer>
  );
}
