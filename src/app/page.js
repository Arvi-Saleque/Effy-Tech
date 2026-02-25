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
      {/* ── Hero Section ─────────────────────────────────────── */}
      <Hero />

      {/* ── About Section ────────────────────────────────────── */}
      <About />

      {/* ── Project Showcase ─────────────────────────────────── */}
      <ProjectShowcase projects={projects} />

      {/* ── Contact Section ──────────────────────────────────── */}
      <Contact />
    </main>
  );
}
