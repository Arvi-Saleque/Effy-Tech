/* ============================================================
   /projects/DHA — Dedicated Darul Hikmah Academy showcase page
   ─────────────────────────────────────────────────
   Overrides the generic [slug] route for this specific project.
   Uses a rich, full-page showcase layout designed to convert
   visitors into potential web development clients.
   ============================================================ */

import DHAShowcase from "@/components/showcase/DHAShowcase";
import dha from "@/data/dha";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Darul Hikmah Academy — Academic Management Website | Effy Tech",
  description: dha.description,
};

export default function DHAPage() {
  return <DHAShowcase data={dha} />;
}
