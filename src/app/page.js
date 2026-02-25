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

      {/* ── Scrollable content — covers hero + footer reveals behind it */}
      <div className="relative z-10 bg-surface">
        {/* ── About Section ────────────────────────────────────── */}
        <About />

        {/* ── Project Showcase ─────────────────────────────────── */}
        <ProjectShowcase projects={projects} />

        {/* ── Contact Section ──────────────────────────────────── */}
        <Contact />
      </div>
    </main>
  );
}
