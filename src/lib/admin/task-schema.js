import { z } from "zod";

const dateStringSchema = z.string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format")
  .optional()
  .nullable()
  .transform(val => val === "" ? null : val);

export const taskIdSchema = z.string().uuid("Invalid task ID format");
export const subtaskIdSchema = z.string().uuid("Invalid subtask ID format");
export const taskAssigneeIdSchema = z.string().uuid("Invalid task assignee ID format");
export const subtaskAssigneeIdSchema = z.string().uuid("Invalid subtask assignee ID format");

export const taskStatusCreateSchema = z.enum(["backlog", "todo", "in_progress", "blocked"]);
export const subtaskStatusCreateSchema = z.enum(["todo", "in_progress", "blocked"]);
export const taskStatusNormalSchema = z.enum(["backlog", "todo", "in_progress", "blocked"]);

export const prioritySchema = z.enum(["low", "normal", "high", "urgent"]);

export const createTaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().trim().min(1, "Title is required").max(250, "Title is too long"),
  description: z.string().trim().max(10000, "Description is too long").optional().nullable().transform(v => v === "" ? null : v),
  status: taskStatusCreateSchema.default("todo"),
  priority: prioritySchema.default("normal"),
  progressPercent: z.number().int().min(0).max(100).default(0),
  estimatedMinutes: z.number().int().min(0).max(100000).optional().nullable(),
  startDate: dateStringSchema,
  dueDate: dateStringSchema,
  sortOrder: z.number().int().min(0).default(0),
  assignees: z.array(z.string().uuid()).default([])
}).refine(data => {
  if (data.startDate && data.dueDate) {
    return new Date(data.dueDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: "Due date cannot be earlier than start date",
  path: ["dueDate"]
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title is too long").optional(),
  description: z.string().trim().max(10000, "Description is too long").optional().nullable().transform(v => v === "" ? null : v),
  status: taskStatusNormalSchema.optional(),
  priority: prioritySchema.optional(),
  progressPercent: z.number().int().min(0).max(100).optional(),
  estimatedMinutes: z.number().int().min(0).max(100000).optional().nullable(),
  startDate: dateStringSchema,
  dueDate: dateStringSchema,
  sortOrder: z.number().int().min(0).optional(),
  assignees: z.array(z.string().uuid()).optional()
}).refine(data => {
  if (data.startDate && data.dueDate) {
    return new Date(data.dueDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: "Due date cannot be earlier than start date",
  path: ["dueDate"]
});

export const createSubtaskSchema = z.object({
  taskId: z.string().uuid(),
  title: z.string().trim().min(1, "Title is required").max(250, "Title is too long"),
  description: z.string().trim().max(10000, "Description is too long").optional().nullable().transform(v => v === "" ? null : v),
  status: subtaskStatusCreateSchema.default("todo"),
  priority: prioritySchema.default("normal"),
  progressPercent: z.number().int().min(0).max(100).default(0),
  estimatedMinutes: z.number().int().min(0).max(100000).optional().nullable(),
  dueDate: dateStringSchema,
  sortOrder: z.number().int().min(0).default(0),
  assignees: z.array(z.string().uuid()).default([])
});

export const updateSubtaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(250, "Title is too long").optional(),
  description: z.string().trim().max(10000, "Description is too long").optional().nullable().transform(v => v === "" ? null : v),
  status: subtaskStatusCreateSchema.optional(),
  priority: prioritySchema.optional(),
  progressPercent: z.number().int().min(0).max(100).optional(),
  estimatedMinutes: z.number().int().min(0).max(100000).optional().nullable(),
  dueDate: dateStringSchema,
  sortOrder: z.number().int().min(0).optional(),
  assignees: z.array(z.string().uuid()).optional()
});

export const taskStatusFilterSchema = z.enum([
  "all",
  "current",
  "backlog",
  "todo",
  "in_progress",
  "blocked",
  "review",
  "done",
  "cancelled",
  "archived"
]);

export const taskPriorityFilterSchema = z.enum(["all", "low", "normal", "high", "urgent"]);
export const taskDueStateFilterSchema = z.enum(["all", "overdue", "due_today", "due_soon", "no_due_date"]);

export const taskStatusTransitionSchema = z.enum([
  "backlog",
  "todo",
  "in_progress",
  "blocked",
  "review",
  "done"
]);

export const subtaskStatusTransitionSchema = z.enum([
  "todo",
  "in_progress",
  "blocked",
  "review",
  "done"
]);

export const taskAssignmentSchema = z.object({
  userId: z.string().uuid()
});

export const subtaskAssignmentSchema = z.object({
  userId: z.string().uuid()
});

export const taskReorderSchema = z.object({
  orderedTaskIds: z.array(z.string().uuid()).refine(arr => new Set(arr).size === arr.length, "Duplicate IDs are not allowed")
});

export const subtaskReorderSchema = z.object({
  orderedSubtaskIds: z.array(z.string().uuid()).refine(arr => new Set(arr).size === arr.length, "Duplicate IDs are not allowed")
});

/**
 * safeSearchSchema
 * Normalizes input for safe use in PostgREST .or() filters.
 * - Trims input
 * - Max 100 characters
 * - Removes PostgREST special structural characters (comma, parentheses, quotes)
 * - Removes regex/LIKE wildcards (backslash, percent, underscore)
 * Special characters are removed completely rather than escaped, to ensure robust fallbacks.
 */
export const safeSearchSchema = z.string().trim().max(100).transform(val => {
  if (!val) return "";
  // Remove , ( ) " ' \ % _
  return val.replace(/[,()"'\\%_]/g, "").trim();
});
