import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import Footer from "@/components/layout/Footer";
import "@/styles/not-found-spatial.css";

export default function NotFound() {
  return (
    <>
      <span id="page-top" className="not-found-top-anchor" aria-hidden="true" />
      <main className="not-found-page">
        <div className="not-found-ambient not-found-ambient-one" aria-hidden="true" />
        <div className="not-found-ambient not-found-ambient-two" aria-hidden="true" />

        <section className="not-found-shell">
          <div className="not-found-copy">
            <span className="not-found-kicker">
              <Compass aria-hidden="true" />
              Error 404
            </span>
            <h1>
              This route went
              <span> off the map.</span>
            </h1>
            <p>
              The page may have moved, the address may be incomplete, or the
              route may no longer be available. The main site and our live work
              are still one click away.
            </p>

            <div className="not-found-actions">
              <Link href="/" className="not-found-primary">
                <ArrowLeft aria-hidden="true" />
                Return Home
              </Link>
              <Link href="/projects" className="not-found-secondary">
                View Projects
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="not-found-stage" aria-label="Effy Tech route recovery illustration">
            <div className="not-found-stage-grid" aria-hidden="true" />
            <span className="not-found-code" aria-hidden="true">
              404
            </span>
            <div className="not-found-asset-frame">
              <Image
                src="/images/effy_tech/tools.jpeg"
                alt="3D software tools by Effy Tech"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 900px) 72vw, 430px"
              />
            </div>
            <div className="not-found-status">
              <span aria-hidden="true" />
              <div>
                <small>ROUTE STATUS</small>
                <strong>Unavailable</strong>
              </div>
            </div>
            <div className="not-found-recovery">
              <small>RECOVERY PATH</small>
              <strong>Home → Services → Projects</strong>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
