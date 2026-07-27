// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { Metadata } from "next";
import ReviewsClient from "./ReviewsClient";
import { getPageSection } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";
import { getPublicTestimonials } from "@/features/effy-edu-demo/features/website-cms/actions/testimonials-actions";

export const metadata: Metadata = {
  title: "All Reviews | EduPilot Coaching Academy",
  description: "Read what our students and parents have to say about their experience with EduPilot Coaching Academy.",
};

export default async function ReviewsPage() {
  const heroData = await getPageSection("REVIEWS", "REVIEWS_HERO");
  const testimonialsData = await getPublicTestimonials();

  return <ReviewsClient heroData={heroData} testimonialsData={testimonialsData} />;
}
