import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const require = createRequire(import.meta.url);
const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(testDirectory, "..");
const temporaryRoot = mkdtempSync(join(tmpdir(), "effy-edu-demo-check-"));

const transpile = (relativePath) => {
  const sourcePath = join(repositoryRoot, relativePath);
  const result = ts.transpileModule(readFileSync(sourcePath, "utf8"), {
    fileName: sourcePath,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
  });
  const errors = (result.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  assert.deepEqual(
    errors.map((diagnostic) => `TS${diagnostic.code}`),
    [],
    `failed to transpile ${relativePath}`,
  );

  const outputRelative = relativePath
    .replace(/^src[\\/]+features[\\/]+effy-edu-demo[\\/]+/, "")
    .replace(/\.ts$/, ".js");
  const outputPath = join(temporaryRoot, outputRelative);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, result.outputText);
};

transpile("src/features/effy-edu-demo/lib/demo/mock-data.ts");
transpile("src/features/effy-edu-demo/lib/demo/mock-supabase.ts");
transpile("src/features/effy-edu-demo/lib/schedule.ts");
transpile("src/features/effy-edu-demo/lib/finance/finance-domain.ts");

class LocalStorageMock {
  values = new Map();
  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }
  setItem(key, value) {
    this.values.set(key, String(value));
  }
  removeItem(key) {
    this.values.delete(key);
  }
}

class DocumentCookieMock {
  values = new Map();
  get cookie() {
    return [...this.values].map(([key, value]) => `${key}=${value}`).join("; ");
  }
  set cookie(rawValue) {
    const [pair, ...attributes] = String(rawValue).split(";");
    const separator = pair.indexOf("=");
    if (separator < 0) return;
    const key = pair.slice(0, separator).trim();
    const value = pair.slice(separator + 1).trim();
    const maxAge = attributes.find((attribute) =>
      attribute.trim().toLowerCase().startsWith("max-age="),
    );
    if (!value || maxAge?.trim().toLowerCase() === "max-age=0") {
      this.values.delete(key);
    } else {
      this.values.set(key, value);
    }
  }
}

globalThis.window = {};
globalThis.localStorage = new LocalStorageMock();
globalThis.document = new DocumentCookieMock();

const { createMockSupabase } = require(
  join(temporaryRoot, "lib", "demo", "mock-supabase.js"),
);
const { demoTables } = require(join(temporaryRoot, "lib", "demo", "mock-data.js"));
const { normalizeSchedule } = require(join(temporaryRoot, "lib", "schedule.js"));
const {
  calculateFinanceSummary,
  percentageChange,
  resolveFinancePeriod,
} = require(join(temporaryRoot, "lib", "finance", "finance-domain.js"));

after(() => rmSync(temporaryRoot, { recursive: true, force: true }));

test("teacher and student one-click demo sessions work without a backend", async () => {
  const client = createMockSupabase("TEACHER");
  const teacherLogin = await client.auth.signInWithPassword({
    email: "teacher@demo.edu",
    password: "demo123",
  });
  assert.equal(teacherLogin.error, null);
  assert.equal(teacherLogin.data.user?.id, "auth-teacher");
  assert.equal((await client.auth.getSession()).data.session?.user?.id, "auth-teacher");

  await client.auth.signOut();
  assert.equal((await client.auth.getSession()).data.session, null);
  assert.doesNotMatch(globalThis.document.cookie, /edupilot-demo-role/);

  const studentLogin = await client.auth.signInWithPassword({
    email: "student@demo.edu",
    password: "demo123",
  });
  assert.equal(studentLogin.error, null);
  assert.equal(studentLogin.data.user?.id, "auth-student");

  const studentProfile = await client
    .from("profiles")
    .select("*")
    .eq("auth_user_id", "auth-student")
    .single();
  const studentDetails = await client
    .from("student_profiles")
    .select("*")
    .eq("profile_id", studentProfile.data.id)
    .single();
  const enrollmentCount = await client
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("student_id", studentDetails.data.id)
    .eq("status", "ACTIVE");
  assert.ok(enrollmentCount.count >= 1);
});

test("mock realtime, schedules, and populated workflow seeds are available", async () => {
  const client = createMockSupabase("TEACHER");
  const channel = client
    .channel("integration-check")
    .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => {})
    .subscribe();
  assert.equal(client.getChannels().length, 1);
  await client.removeChannel(channel);
  assert.equal(client.getChannels().length, 0);

  assert.deepEqual(normalizeSchedule({ days: ["Sat", "Mon"], time: "5:00 PM" }), {
    days: ["Sat", "Mon"],
    daysText: "Sat, Mon",
    time: "5:00 PM",
  });

  const requiredSeeds = {
    profiles: 9,
    student_profiles: 8,
    batches: 4,
    enrollments: 8,
    payments: 12,
    exams: 6,
    academic_assignments: 3,
    academic_class_sessions: 4,
    batch_contents: 4,
    announcements: 3,
    notifications: 6,
    audit_logs: 5,
    finance_expense_categories: 9,
    finance_expenses: 18,
    finance_income_ledger: 12,
  };
  for (const [table, minimum] of Object.entries(requiredSeeds)) {
    assert.ok(demoTables[table].length >= minimum, `insufficient ${table} seed data`);
  }
  assert.ok(demoTables.exams.some((exam) => exam.status === "RESULT_DRAFT"));
  assert.ok(demoTables.enrollments.some((enrollment) => enrollment.status === "DISABLED"));
});

test("finance summaries, periods, relations, and reversible mutations work locally", async () => {
  assert.deepEqual(
    resolveFinancePeriod("this_month", undefined, undefined, "2026-07-27"),
    {
      key: "this_month",
      label: "July 2026",
      from: "2026-07-01",
      to: "2026-07-31",
      previousFrom: "2026-06-01",
      previousTo: "2026-06-30",
    },
  );
  assert.deepEqual(
    resolveFinancePeriod("custom", "2026-07-10", "2026-07-16", "2026-07-27"),
    {
      key: "custom",
      label: "2026-07-10 to 2026-07-16",
      from: "2026-07-10",
      to: "2026-07-16",
      previousFrom: "2026-07-03",
      previousTo: "2026-07-09",
    },
  );
  assert.equal(percentageChange(500, 0), null);
  assert.equal(percentageChange(125, 100), 25);

  const summary = calculateFinanceSummary(
    demoTables.finance_income_ledger.map((item) => ({
      paid_amount: item.amount,
      status: item.status,
    })),
    demoTables.finance_expenses,
  );
  assert.ok(summary.income > 0);
  assert.ok(summary.expense > 0);
  assert.equal(
    summary.expenseCount,
    demoTables.finance_expenses.filter((item) => item.status === "POSTED").length,
  );
  assert.ok(demoTables.finance_expenses.some((item) => item.status === "VOID"));

  const client = createMockSupabase("TEACHER");
  const relatedExpense = await client
    .from("finance_expenses")
    .select("*, category:finance_expense_categories(id, name, color_hex)")
    .eq("id", "finance-expense-1")
    .single();
  assert.equal(relatedExpense.error, null);
  assert.equal(relatedExpense.data.category.name, "Rent & Utility");

  const inserted = await client
    .from("finance_expenses")
    .insert({
      id: "finance-expense-runtime-test",
      category_id: demoTables.finance_expense_categories[0].id,
      title: "Runtime test expense",
      amount: 100,
      expense_date: "2026-07-20",
      payment_method: "CASH",
      status: "POSTED",
    })
    .select("*")
    .single();
  assert.equal(inserted.data.status, "POSTED");

  const voided = await client
    .from("finance_expenses")
    .update({ status: "VOID", void_reason: "Runtime verification" })
    .eq("id", "finance-expense-runtime-test")
    .select("*")
    .single();
  assert.equal(voided.data.status, "VOID");

  const restored = await client
    .from("finance_expenses")
    .update({ status: "POSTED", void_reason: null })
    .eq("id", "finance-expense-runtime-test")
    .select("*")
    .single();
  assert.equal(restored.data.status, "POSTED");

  await client
    .from("finance_expenses")
    .delete()
    .eq("id", "finance-expense-runtime-test");
  assert.equal(
    demoTables.finance_expenses.some(
      (item) => item.id === "finance-expense-runtime-test",
    ),
    false,
  );
});
