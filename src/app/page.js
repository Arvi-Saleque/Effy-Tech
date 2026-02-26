/* ============================================================
   Effy Tech — Landing Page
   Assembles all sections. Each section is a separate component
   in /components/sections/.
   Data is fetched at the server level and passed as props
   (ready for MongoDB server-component fetch in the future).
   ============================================================ */

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import projects from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero — fixed behind everything (curtain-pull: content scrolls over it) */}
      <div className="fixed inset-0 z-0">
        <Hero />
      </div>

      {/* Spacer — reserves viewport height so content starts below hero */}
      <div className="h-screen" aria-hidden="true" />

      {/* ── Content + Footer — all inside z-10 so they cover the fixed hero */}
      <div className="relative z-10">
        {/* Sections with opaque bg — these cover the sticky footer below */}
        <div className="relative z-10 bg-surface-dark">
          {/* ── About Section ────────────────────────────────────── */}
          <About />

          {/* ── Project Showcase ─────────────────────────────────── */}
          <ProjectShowcase projects={projects} />

          {/* ── Contact Section ──────────────────────────────────── */}
          <Contact />
        </div>

        {/* ── Footer — sticky behind content on desktop, normal flow on mobile */}
        <div className="sticky bottom-0 z-0 max-lg:relative">
          <Footer />
        </div>
      </div>
    </main>
  );
}
