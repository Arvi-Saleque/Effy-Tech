// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { Metadata } from "next";
import {
  profileData,
  metricsData,
  educationData,
  researchExperienceData,
  researchThesisData,
  publicationsData,
  skillCategoriesData,
  projectsData,
  trainingData,
  ecaData,
} from "@/features/effy-edu-demo/data/about";
import { getPageSection } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";

import { AboutHero } from "@/features/effy-edu-demo/components/about/AboutHero";
import { AboutMetrics } from "@/features/effy-edu-demo/components/about/AboutMetrics";
import { EducationTimeline } from "@/features/effy-edu-demo/components/about/EducationTimeline";
import { ResearchExperienceSection } from "@/features/effy-edu-demo/components/about/ResearchExperienceSection";
import { PublicationsSection } from "@/features/effy-edu-demo/components/about/PublicationsSection";
import { ProjectsGrid } from "@/features/effy-edu-demo/components/about/ProjectsGrid";
import { IndustrialTrainingBanner } from "@/features/effy-edu-demo/components/about/IndustrialTrainingBanner";
import TechnicalSkillsSection from "@/features/effy-edu-demo/components/about/TechnicalSkillsSection";
import ECASection from "@/features/effy-edu-demo/components/about/ECASection";

export const metadata: Metadata = {
  title: "About Dr. Arif Rahman | Academic & Professional Portfolio | EduPilot Coaching Academy",
  description: "Explore the academic portfolio, research publications, engineering projects, and teaching background of Dr. Arif Rahman (Lead Instructor), CEO at EduPilot Coaching Academy.",
};

export default async function AboutPage() {
  const aboutHeroSection = await getPageSection("ABOUT", "ABOUT_HERO");
  const aboutMetricsSection = await getPageSection("ABOUT", "ABOUT_METRICS");
  const aboutEducationSection = await getPageSection("ABOUT", "ABOUT_EDUCATION");
  const aboutResearchSection = await getPageSection("ABOUT", "ABOUT_RESEARCH_EXP");
  const aboutPublicationsSection = await getPageSection("ABOUT", "ABOUT_PUBLICATIONS");
  const aboutTrainingSection = await getPageSection("ABOUT", "ABOUT_TRAINING");
  const aboutProjectsSection = await getPageSection("ABOUT", "ABOUT_PROJECTS");
  const aboutSkillsSection = await getPageSection("ABOUT", "ABOUT_SKILLS");
  const aboutEcaSection = await getPageSection("ABOUT", "ABOUT_ECA");

  return (
    <div className="relative pt-20 pb-0 bg-bg-soft text-text flex flex-col min-h-screen selection:bg-accent selection:text-primary overflow-x-hidden">
      {/* Global Background Noise / Pattern */}
      <div className="absolute inset-0 bg-[url('/effy_edu_management_system/noise.png')] opacity-[0.015] pointer-events-none mix-blend-overlay z-0" />

      {/* 1. About Hero Section */}
      <AboutHero profileData={aboutHeroSection?.content || profileData} />

      {/* 2. Summary Metrics Strip */}
      <AboutMetrics metrics={aboutMetricsSection?.content?.metrics || metricsData} />

      {/* 3. Education Timeline */}
      <EducationTimeline
        education={aboutEducationSection?.content?.education || educationData}
        header={aboutEducationSection?.content?.header}
      />

      {/* New Section: Research Experience */}
      <ResearchExperienceSection
        researchData={aboutResearchSection?.content?.researchData || researchExperienceData}
        header={aboutResearchSection?.content?.header}
      />

      {/* New Section: Research Publications */}
      <PublicationsSection
        publications={aboutPublicationsSection?.content?.publications || publicationsData}
        header={aboutPublicationsSection?.content?.header}
      />

      {/* 7. Industrial Training Banner */}
      <IndustrialTrainingBanner
        training={aboutTrainingSection?.content?.training || trainingData}
        header={aboutTrainingSection?.content?.header}
      />

      {/* 6. Projects Grid */}
      <ProjectsGrid
        projects={aboutProjectsSection?.content?.projects || projectsData}
        header={aboutProjectsSection?.content?.header}
      />

      {/* 8. Technical Skills */}
      <TechnicalSkillsSection
        skills={aboutSkillsSection?.content?.skills || skillCategoriesData}
        header={aboutSkillsSection?.content?.header}
      />

      {/* 9. Extra Curricular Activities */}
      <ECASection
        ecaItems={aboutEcaSection?.content?.ecaList || ecaData}
        header={aboutEcaSection?.content?.header}
      />

    </div>
  );
}
