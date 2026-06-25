import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ROUTE_BASE } from "../data/college-data";
import Brand from "./Brand";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <>
      <TopBar />
      <header className="pgc-header">
        <div className="pgc-container pgc-header__inner">
          <Brand />
          <DesktopNav />
          <div className="pgc-header__actions">
            <Link className="pgc-demo-chip" href={ROUTE_BASE}>
              <Sparkles size={14} aria-hidden="true" /> Effy Tech Demo
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
