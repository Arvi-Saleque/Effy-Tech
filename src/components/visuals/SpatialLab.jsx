import Link from "next/link";
import {
  ArrowLeft,
  Gauge,
  Hand,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import {
  BrowserMockup,
  DepthCard,
  DeviceMockup,
  FloatingAsset,
  MotionBoundary,
  SpatialLayer,
  SpatialStage,
  TiltSurface,
} from "./index";

const assets = [
  {
    alt: "3D web application development system",
    label: "Web applications",
    src: "/images/effy_tech/spatial/web-application.webp",
    width: 1254,
    height: 1254,
  },
  {
    alt: "3D mobile product development system",
    label: "Mobile products",
    src: "/images/effy_tech/spatial/mobile-product.webp",
    width: 1254,
    height: 1254,
  },
  {
    alt: "3D custom software and automation system",
    label: "Automation systems",
    src: "/images/effy_tech/spatial/automation-systems.webp",
    width: 1254,
    height: 1254,
  },
  {
    alt: "3D artificial intelligence system",
    label: "AI systems",
    src: "/images/effy_tech/spatial/ai-systems.webp",
    width: 1254,
    height: 1254,
  },
  {
    alt: "3D e-commerce platform",
    label: "E-commerce",
    src: "/images/effy_tech/spatial/ecommerce-platform.webp",
    width: 1254,
    height: 1254,
  },
  {
    alt: "3D business operations and analytics system",
    label: "Business systems",
    src: "/images/effy_tech/spatial/business-systems.webp",
    width: 1448,
    height: 1086,
  },
];

function DashboardPreview() {
  return (
    <div className="spatial-lab-dashboard" aria-hidden="true">
      <aside>
        <i />
        <i />
        <i />
        <i />
      </aside>
      <div>
        <span className="spatial-lab-dashboard-title" />
        <div className="spatial-lab-metrics">
          <i />
          <i />
          <i />
        </div>
        <div className="spatial-lab-chart">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="spatial-lab-mobile" aria-hidden="true">
      <span />
      <strong />
      <div>
        <i />
        <i />
      </div>
      <div>
        <i />
        <i />
      </div>
      <span className="spatial-lab-mobile-action">Open system</span>
    </div>
  );
}

export default function SpatialLab() {
  return (
    <MotionBoundary className="spatial-lab-boundary">
      <main className="spatial-lab">
        <header className="spatial-lab-header">
          <Link href="/" className="spatial-lab-back">
            <ArrowLeft size={16} /> Back to homepage
          </Link>
          <span className="spatial-lab-kicker">
            PHASE 02 · UNLISTED PREVIEW
          </span>
          <h1>One controlled spatial system, before public integration.</h1>
          <p>
            This route validates transparent assets, restrained perspective,
            static touch behavior, reduced motion, and reusable device frames.
          </p>
          <div className="spatial-lab-rules" aria-label="Spatial system rules">
            <span>
              <Hand size={15} /> Tilt ≤ 4°
            </span>
            <span>
              <Sparkles size={15} /> Float ≤ 8px
            </span>
            <span>
              <MonitorSmartphone size={15} /> Touch static
            </span>
            <span>
              <Gauge size={15} /> Transform only
            </span>
          </div>
        </header>

        <section
          className="spatial-lab-hero"
          aria-labelledby="spatial-hero-title"
        >
          <TiltSurface maxTilt={3.5} perspective={1200}>
            <SpatialStage className="spatial-lab-hero-stage" tone="graphite">
              <SpatialLayer className="spatial-lab-hero-copy" depth="back">
                <span>BUSINESS SYSTEMS</span>
                <h2 id="spatial-hero-title">
                  Depth that supports the message.
                </h2>
                <p>
                  Product clarity stays primary; movement remains secondary.
                </p>
              </SpatialLayer>
              <SpatialLayer className="spatial-lab-hero-asset" depth="mid">
                <FloatingAsset
                  alt="3D business operations and analytics system"
                  height={1086}
                  priority
                  sizes="(max-width: 760px) 90vw, 620px"
                  src="/images/effy_tech/spatial/business-systems.webp"
                  width={1448}
                />
              </SpatialLayer>
              <SpatialLayer className="spatial-lab-status" depth="front">
                <i /> READY FOR COMPONENT QA
              </SpatialLayer>
            </SpatialStage>
          </TiltSurface>
        </section>

        <section
          className="spatial-lab-section"
          aria-labelledby="asset-set-title"
        >
          <div className="spatial-lab-section-heading">
            <span>PRODUCTION ASSET SET</span>
            <h2 id="asset-set-title">Six services, one visual language.</h2>
            <p>
              These cards tilt on fine-pointer devices; their images remain
              static.
            </p>
          </div>

          <div className="spatial-lab-asset-grid">
            {assets.map((asset, index) => (
              <TiltSurface key={asset.src} maxTilt={3}>
                <DepthCard
                  as="article"
                  className="spatial-lab-asset-card"
                  depth={index === 5 ? "highlight" : "raised"}
                >
                  <span className="spatial-lab-index">0{index + 1}</span>
                  <FloatingAsset
                    {...asset}
                    animate={false}
                    sizes="(max-width: 760px) 86vw, 360px"
                  />
                  <div>
                    <h3>{asset.label}</h3>
                    <p>Transparent WebP · optimized · responsive-safe</p>
                  </div>
                </DepthCard>
              </TiltSurface>
            ))}
          </div>
        </section>

        <section className="spatial-lab-section" aria-labelledby="frames-title">
          <div className="spatial-lab-section-heading">
            <span>REUSABLE PRODUCT FRAMES</span>
            <h2 id="frames-title">
              Real product UI gets the same depth system.
            </h2>
            <p>
              Browser and device frames are CSS-only, lightweight, and
              content-agnostic.
            </p>
          </div>

          <div className="spatial-lab-frame-grid">
            <TiltSurface maxTilt={2.5}>
              <BrowserMockup title="workspace.effy.tech">
                <DashboardPreview />
              </BrowserMockup>
            </TiltSurface>
            <TiltSurface maxTilt={2.5}>
              <DeviceMockup>
                <MobilePreview />
              </DeviceMockup>
            </TiltSurface>
          </div>
        </section>
      </main>
    </MotionBoundary>
  );
}
