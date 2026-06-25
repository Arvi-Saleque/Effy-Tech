/* ============================================================
   /projects/BUEK - Dedicated BUEK university website showcase page
   ============================================================ */

import DHAShowcase from "@/components/showcase/DHAShowcase";
import buek from "@/data/buek";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Bangladesh University of Excellence Khulna - University Website | Effy Tech",
  description: buek.description,
};

export default function BUEKPage() {
  return (
    <>
      <DHAShowcase data={buek} />
      <Footer />
    </>
  );
}
