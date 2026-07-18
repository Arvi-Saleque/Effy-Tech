import { z } from "zod";
import {
  ACCOUNT_TYPES,
  PAYMENT_METHODS,
  RECURRING_FREQUENCIES,
  TARGET_METRICS,
  TARGET_PERIODS,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
} from "./finance-utils";

export const financeUuidSchema = z.string().uuid({ message: "Invalid identifier." });

const nullableUuid = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((value) => value || null)
  .refine((value) => value === null || financeUuidSchema.safeParse(value).success, {
    message: "Invalid selection.",
  });

const requiredText = (label, max = 180) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

const optionalText = (max = 5000) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or less.`)
    .optional()
    .nullable()
    .transform((value) => value || null);

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date.");

const nullableDate = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((value) => value || null)
  .refine((value) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Use a valid date.",
  });

const moneySchema = z.coerce
  .number({ message: "Enter a valid amount." })
  .positive("Amount must be greater than zero.")
  .max(999999999999.99, "Amount is too large.")
  .transform((value) => Math.round(value * 100) / 100);

export const financeTransactionSchema = z
  .object({
    type: z.enum(TRANSACTION_TYPES),
    status: z.enum(TRANSACTION_STATUSES).refine((status) => status !== "void", {
      message: "A transaction cannot be created directly as void.",
    }),
    title: requiredText("Title", 180),
    amount: moneySchema,
    transaction_date: dateSchema,
    due_date: nullableDate,
    account_id: financeUuidSchema,
    destination_account_id: nullableUuid,
    category_id: nullableUuid,
    client_id: nullableUuid,
    project_id: nullableUuid,
    payment_method: z.enum(PAYMENT_METHODS),
    reference: optionalText(160),
    notes: optionalText(5000),
  })
  .superRefine((data, ctx) => {
    if (data.type === "transfer") {
      if (!data.destination_account_id) {
        ctx.addIssue({ code: "custom", path: ["destination_account_id"], message: "Destination account is required." });
      }
      if (data.destination_account_id === data.account_id) {
        ctx.addIssue({ code: "custom", path: ["destination_account_id"], message: "Choose a different destination account." });
      }
    } else if (!data.category_id) {
      ctx.addIssue({ code: "custom", path: ["category_id"], message: "Category is required." });
    }
  });

export const projectContractSchema = z
  .object({
    project_id: financeUuidSchema,
    contract_value: moneySchema,
    signed_date: nullableDate,
    payment_deadline: nullableDate,
    status: z.enum(["active", "on_hold", "settled", "cancelled"]),
    notes: optionalText(5000),
  })
  .refine(
    (data) => !data.signed_date || !data.payment_deadline || data.payment_deadline >= data.signed_date,
    { path: ["payment_deadline"], message: "Deadline cannot be before the signed date." }
  );

export const recurringItemSchema = z.object({
  type: z.enum(["income", "expense"]),
  title: requiredText("Title", 180),
  category_id: financeUuidSchema,
  account_id: financeUuidSchema,
  client_id: nullableUuid,
  project_id: nullableUuid,
  amount: moneySchema,
  payment_method: z.enum(PAYMENT_METHODS),
  frequency: z.enum(RECURRING_FREQUENCIES),
  next_due_date: dateSchema,
  reminder_days: z.coerce.number().int().min(0).max(365),
  status: z.enum(["active", "paused", "ended"]),
  notes: optionalText(5000),
});

export const targetSchema = z
  .object({
    name: requiredText("Target name", 180),
    metric: z.enum(TARGET_METRICS),
    category_id: nullableUuid,
    target_amount: moneySchema,
    period_type: z.enum(TARGET_PERIODS),
    start_date: dateSchema,
    end_date: dateSchema,
    status: z.enum(["active", "completed", "cancelled"]),
    notes: optionalText(5000),
  })
  .refine((data) => data.end_date >= data.start_date, {
    path: ["end_date"],
    message: "End date cannot be before start date.",
  });

export const financeAccountSchema = z.object({
  name: requiredText("Account name", 120),
  account_type: z.enum(ACCOUNT_TYPES),
  opening_balance: z.coerce
    .number({ message: "Enter a valid opening balance." })
    .min(-999999999999.99)
    .max(999999999999.99)
    .transform((value) => Math.round(value * 100) / 100),
  notes: optionalText(1000),
});

export const financeCategorySchema = z.object({
  name: requiredText("Category name", 120),
  direction: z.enum(["income", "expense", "both"]),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Choose a valid color."),
});

export const transactionFilterSchema = z.object({
  type: z.enum(["all", ...TRANSACTION_TYPES]).catch("all"),
  status: z.enum(["all", ...TRANSACTION_STATUSES]).catch("all"),
  account: nullableUuid,
  category: nullableUuid,
  client: nullableUuid,
  project: nullableUuid,
  from: nullableDate,
  to: nullableDate,
  search: z
    .string()
    .trim()
    .max(100)
    .transform((value) => value.replace(/[%_\\]/g, ""))
    .optional()
    .nullable(),
});
