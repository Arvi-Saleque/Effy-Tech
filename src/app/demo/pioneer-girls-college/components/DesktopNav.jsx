import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navItems } from "../data/college-data";

export default function DesktopNav() {
  return (
    <nav className="pgc-desktop-nav" aria-label="প্রধান মেনু">
      {navItems.map((item) => (
        <div className="pgc-nav-item" key={item.label}>
          <Link href={item.href} className="pgc-nav-link">
            {item.label}
            {item.children ? <ChevronDown size={14} aria-hidden="true" /> : null}
          </Link>
          {item.children ? (
            <div className="pgc-submenu" aria-label={`${item.label} সাবমেনু`}>
              {item.children.map((child) => (
                <Link href={child.href} key={child.href}>
                  {child.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}
