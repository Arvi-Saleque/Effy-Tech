// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import Navbar from "@/features/effy-edu-demo/components/layout/Navbar";
import Footer from "@/features/effy-edu-demo/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-soft text-text flex flex-col selection:bg-accent selection:text-primary relative">
      {/* Public Header Navbar */}
      <Navbar />

      {/* Main Sections Body */}
      <main className="flex-grow">{children}</main>

      {/* Page Layout Footer */}
      <Footer />
    </div>
  );
}
