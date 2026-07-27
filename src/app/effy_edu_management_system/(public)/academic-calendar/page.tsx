// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { Metadata } from "next";
import AcademicCalendarClient from "./AcademicCalendarClient";
import { getPageSection } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";

export const metadata: Metadata = {
  title: "Academic Calendar | EduPilot Coaching Academy",
  description: "Explore Lead Instructor's complete academic calendar and roadmap.",
};

export default async function AcademicCalendarPage() {
  const [heroData, cardData] = await Promise.all([
    getPageSection("ACADEMIC_CALENDAR", "CALENDAR_HERO"),
    getPageSection("ACADEMIC_CALENDAR", "CALENDAR_CARD"),
  ]);

  return <AcademicCalendarClient heroData={heroData} cardData={cardData} />;
}
