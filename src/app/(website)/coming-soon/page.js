import Link from "next/link";
import { ArrowLeft, Bell, Clock3, Sparkles } from "lucide-react";
import Footer from "@/components/layout/Footer";
import {
  FloatingAsset,
  MotionBoundary,
  TiltSurface,
} from "@/components/visuals";
import "@/styles/spatial-components.css";
import "@/styles/coming-soon-spatial.css";

export const metadata = {
  title: "Coming Soon | Effy Tech",
  description:
    "A new Effy Tech experience is currently being designed and prepared.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function ComingSoon() {
  return (
    <>
      <main className="coming-soon-page">
        <div className="coming-soon-ambient coming-soon-ambient-one" aria-hidden="true" />
        <div className="coming-soon-ambient coming-soon-ambient-two" aria-hidden="true" />

        <section className="coming-soon-shell">
          <div className="coming-soon-copy">
            <span className="coming-soon-kicker">
              <Sparkles aria-hidden="true" />
              Coming Soon
            </span>

            <h1>
              Something <span>Amazing</span>
              <br />
              is Brewing
            </h1>

            <p className="coming-soon-lead">
              We&apos;re crafting something special for this page. Stay tuned —
              it&apos;ll be worth the wait.
            </p>

            <div className="coming-soon-actions">
              <Link href="/" className="coming-soon-primary">
                <ArrowLeft aria-hidden="true" />
                Back to Home
              </Link>
              <Link href="/#contact" className="coming-soon-secondary">
                Get Notified
                <Bell aria-hidden="true" />
              </Link>
            </div>

            <p className="coming-soon-note">
              <Clock3 aria-hidden="true" />
              A focused experience is currently in production.
            </p>
          </div>

          <MotionBoundary className="coming-soon-motion">
            <TiltSurface
              className="coming-soon-tilt"
              maxTilt={2.2}
              perspective={1300}
            >
              <div
                className="coming-soon-stage"
                aria-label="Effy Tech AI product system in development"
              >
                <div className="coming-soon-stage-grid" aria-hidden="true" />
                <div className="coming-soon-stage-halo" aria-hidden="true" />
                <div className="coming-soon-orbit coming-soon-orbit-one" aria-hidden="true" />
                <div className="coming-soon-orbit coming-soon-orbit-two" aria-hidden="true" />

                <div className="coming-soon-asset-frame">
                  <FloatingAsset
                    alt="3D AI product system prepared by Effy Tech"
                    animate={false}
                    className="coming-soon-asset"
                    height={1254}
                    priority
                    sizes="(max-width: 860px) 72vw, 440px"
                    src="/images/effy_tech/spatial/ai-systems.webp"
                    width={1254}
                  />
                </div>

                <div className="coming-soon-status">
                  <span aria-hidden="true" />
                  <div>
                    <small>BUILD STATUS</small>
                    <strong>Experience in progress</strong>
                  </div>
                </div>

                <div className="coming-soon-stage-tag" aria-hidden="true">
                  <small>NEXT RELEASE</small>
                  <strong>Designed. Refined. Ready soon.</strong>
                </div>
              </div>
            </TiltSurface>
          </MotionBoundary>
        </section>
      </main>
      <Footer />
    </>
  );
}
