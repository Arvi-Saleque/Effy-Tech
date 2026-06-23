import { z } from "zod";

// Base schema excluding status
const baseClientSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Client name is required." })
    .max(150, { message: "Client name must be 150 characters or less." })
    .trim(),
  company_name: z
    .string()
    .max(150, { message: "Company name must be 150 characters or less." })
    .trim()
    .optional()
    .nullable(),
  contact_person: z
    .string()
    .max(150, { message: "Contact person must be 150 characters or less." })
    .trim()
    .optional()
    .nullable(),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(254, { message: "Email must be 254 characters or less." })
    .trim()
    .toLowerCase()
    .optional()
    .nullable()
    // Convert empty string to null before email validation
    .or(z.literal("").transform(() => null)),
  phone: z
    .string()
    .max(50, { message: "Phone number must be 50 characters or less." })
    .trim()
    .optional()
    .nullable(),
  notes: z
    .string()
    .max(5000, { message: "Notes must be 5000 characters or less." })
    .trim()
    .optional()
    .nullable(),
});

export const createClientSchema = baseClientSchema.extend({
  status: z.enum(["lead", "active", "inactive"], {
    errorMap: () => ({ message: "Invalid status for new client." }),
  }).default("active"),
});

export const updateClientSchema = baseClientSchema.extend({
  status: z.enum(["lead", "active", "inactive", "archived"], {
    errorMap: () => ({ message: "Invalid status." }),
  }),
});

export const uuidSchema = z.string().uuid({ message: "Invalid UUID format." });

export const clientStatusFilterSchema = z.enum([
  "current",
  "all",
  "lead",
  "active",
  "inactive",
  "archived"
]).catch("current");

export const searchSchema = z
  .string()
  .max(100, { message: "Search text is too long." })
  .trim()
  .transform((val) => val.replace(/[%_\\]/g, "")) // Basic strip for Postgres LIKE wildcards
  .optional()
  .nullable();
