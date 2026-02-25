/* ============================================================
   Effy Tech — Landing Page
   Assembles all sections. Each section is a separate component
   in /components/sections/.
   ============================================================ */

import Hero from "@/components/sections/Hero";
import {
  SectionWrapper,
  SectionHeading,
  Button,
  Card,
  Badge,
  FilterBar,
} from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <Hero />

      {/* ── Component Showcase ── */}
      <SectionWrapper id="showcase" bgClass="bg-glossy">
        <SectionHeading
          title="Component Showcase"
          subtitle="Verifying all reusable components render correctly. This section will be replaced with actual content."
        />

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">
              Primary SM
            </Button>
            <Button variant="primary" size="md">
              Primary MD
            </Button>
            <Button variant="primary" size="lg">
              Primary LG
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge label="Web" />
            <Badge label="Android" />
            <Badge label="iOS" />
            <Badge label="Premium" variant="accent" />
            <Badge label="UI/UX" variant="outline" />
            <Badge label="Small" size="sm" />
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Sample Project"
              description="A sample project card to verify the component renders correctly."
              category="Web"
              tags={["React", "Next.js"]}
            />
            <Card
              title="Another Project"
              description="Another sample card with different content."
              category="Android"
              tags={["Kotlin", "Firebase"]}
            />
            <Card
              title="Design System"
              description="A design system showcase card."
              category="UI/UX"
              tags={["Figma", "Design"]}
            />
          </div>
        </div>

        {/* Section Heading Variants */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Section Headings
          </h3>
          <SectionHeading
            title="Centered Heading"
            subtitle="With a subtitle below it"
          />
          <SectionHeading
            title="Left Aligned"
            subtitle="For asymmetric layouts"
            alignment="left"
          />
        </div>
      </SectionWrapper>
    </main>
  );
}
