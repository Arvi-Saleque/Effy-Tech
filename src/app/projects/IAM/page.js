/* ============================================================
   /projects/IAM — Dedicated Amal Tracker showcase page
   ─────────────────────────────────────────────────
   Overrides the generic [slug] route for this specific project.
   Uses a rich, full-page showcase layout designed to convert
   visitors into app downloads.
   ============================================================ */

import AmalTrackerShowcase from "@/components/showcase/AmalTrackerShowcase";
import amalTracker from "@/data/amalTracker";

export const metadata = {
  title: "Amal Tracker — Islamic Habit Tracking App | Effy Tech",
  description: amalTracker.description,
};

export default function AmalTrackerPage() {
  return <AmalTrackerShowcase data={amalTracker} />;
}
