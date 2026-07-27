// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { Metadata } from "next";
import { requireTeacher } from "@/features/effy-edu-demo/lib/auth-guards";
import { getSectionItems } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";
import CourseCardsAdmin from "./CourseCardsAdmin";

export const metadata: Metadata = {
  title: "Manage Course Cards | Admin",
};

export default async function CourseCardsPage() {
  await requireTeacher();

  // Fetch existing course cards
  const items = await getSectionItems("COURSES_CARDS");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#08132E]">Manage Course Cards</h1>
        <p className="text-gray-600 mt-1">Add, edit, or remove courses that appear on the public Courses page.</p>
      </div>

      <CourseCardsAdmin initialItems={items} />
    </div>
  );
}
