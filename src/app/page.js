/* ============================================================
   Effy Tech — Landing Page
   Assembles all sections. Each section is a separate component
   in /components/sections/.
   ============================================================ */

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <Hero />

      {/* ── About Section ────────────────────────────────────── */}
      <About />
    </main>
  );
}
