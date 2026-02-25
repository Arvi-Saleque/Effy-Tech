/* ============================================================
   submitContact — Next.js Server Action
   ─────────────────────────────────────────────────
   Validates with shared Zod schema, then saves to MongoDB.
   Currently stubs the DB call with a console.log.
   Swap the TODO block with your Mongoose/MongoDB save.
   ============================================================ */

"use server";

import { contactSchema } from "@/lib/contactSchema";

export async function submitContact(_prevState, formData) {
  /* Parse raw FormData into a plain object */
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company") || "",
    service: formData.get("service"),
    message: formData.get("message"),
  };

  /* Server-side Zod validation (shared schema) */
  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  /* ── Save to MongoDB (swap this stub) ───────────────────── */
  // TODO: Replace with actual MongoDB save:
  // import dbConnect from "@/lib/dbConnect";
  // import Contact from "@/models/Contact";
  // await dbConnect();
  // await Contact.create({
  //   ...result.data,
  //   read: false,
  //   createdAt: new Date(),
  // });

  console.log("📩 New contact submission:", result.data);

  /* Simulate a slight delay for UX */
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: "Thank you! We'll get back to you within 24 hours.",
  };
}
