import { z } from "zod";

export const uuidSchema = z.string().uuid({ message: "Invalid UUID format." });

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format. Expected YYYY-MM-DD" })
  .optional()
  .nullable()
  .or(z.literal("").transform(() => null));

// Shared schema fields
const baseProjectSchema = z.object({
  client_id: uuidSchema,
  name: z
    .string()
    .min(1, { message: "Project name is required." })
    .max(200, { message: "Project name must be 200 characters or less." })
    .trim(),
  description: z
    .string()
    .max(10000, { message: "Description must be 10000 characters or less." })
    .trim()
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  priority: z.enum(["low", "normal", "high", "urgent"], {
    errorMap: () => ({ message: "Invalid priority." }),
  }),
  start_date: dateStringSchema,
  due_date: dateStringSchema,
  progress_percent: z.coerce
    .number()
    .int()
    .min(0, { message: "Progress cannot be less than 0." })
    .max(100, { message: "Progress cannot exceed 100." })
    .default(0),
}).refine(
  (data) => {
    if (data.start_date && data.due_date) {
      return new Date(data.due_date) >= new Date(data.start_date);
    }
    return true;
  },
  {
    message: "Due date cannot be earlier than start date.",
    path: ["due_date"],
  }
);

// Specifically for creating
export const createProjectSchema = baseProjectSchema.extend({
  status: z.enum(["planning", "active", "on_hold"], {
    errorMap: () => ({ message: "Invalid status for new project." }),
  }).default("planning"),
  initialMembers: z.array(
    z.object({
      user_id: uuidSchema,
      project_role: z.enum(["owner", "manager", "member", "reviewer"]),
    })
  ).optional().default([]),
});

// Specifically for updating (blocks archived, completed, cancelled)
export const updateProjectSchema = baseProjectSchema.extend({
  status: z.enum(["planning", "active", "on_hold"], {
    errorMap: () => ({ message: "Invalid status for editing project." }),
  }),
});

// Member management schema
export const projectMemberSchema = z.object({
  user_id: uuidSchema,
  project_role: z.enum(["owner", "manager", "member", "reviewer"], {
    errorMap: () => ({ message: "Invalid project role." }),
  }),
});

export const projectStatusFilterSchema = z.enum([
  "current",
  "all",
  "planning",
  "active",
  "on_hold",
  "completed",
  "cancelled",
  "archived",
]).catch("current");

export const projectPriorityFilterSchema = z.enum([
  "all",
  "low",
  "normal",
  "high",
  "urgent",
]).catch("all");

export const searchSchema = z
  .string()
  .max(100, { message: "Search text is too long." })
  .trim()
  .transform((val) => val.replace(/[()[\]{},"\\%_]/g, ""))
  .optional()
  .nullable();
