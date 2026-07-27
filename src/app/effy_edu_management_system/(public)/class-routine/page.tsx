// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { Metadata } from "next";
import ClassRoutineClient from "./ClassRoutineClient";
import { getPageSection } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";

export const metadata: Metadata = {
  title: "Class Routine | EduPilot Coaching Academy",
  description: "Explore Lead Instructor's complete class routines and schedule.",
};

export default async function ClassRoutinePage() {
  const [heroData, cardData] = await Promise.all([
    getPageSection("CLASS_ROUTINE", "ROUTINE_HERO"),
    getPageSection("CLASS_ROUTINE", "ROUTINE_CARD"),
  ]);

  return <ClassRoutineClient heroData={heroData} cardData={cardData} />;
}
