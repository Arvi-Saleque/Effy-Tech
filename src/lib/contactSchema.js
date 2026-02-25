/* ============================================================
   Contact Schema — Zod validation
   ─────────────────────────────────────────────────
   Shared between client (React Hook Form) and server action.
   Mirrors future MongoDB model:
   { name, email, phone, company, service, message, read, createdAt }
   ============================================================ */

import { z } from "zod";

export const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "web-dev", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "consulting", label: "Technical Consulting" },
  { value: "other", label: "Other" },
];

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  company: z
    .string()
    .max(100, "Company name is too long")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});
