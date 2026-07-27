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
    profiles: 13,
    student_profiles: 12,
    batches: 5,
    enrollments: 15,
    payments: 40,
    exams: 11,
    exam_results: 10,
    academic_assignments: 9,
    academic_assignment_submissions: 8,
    academic_class_sessions: 10,
    batch_contents: 11,
    announcements: 8,
    notifications: 15,
    audit_logs: 10,
    finance_expense_categories: 9,
    finance_expenses: 19,
    finance_income_ledger: 30,
  };
  for (const [table, minimum] of Object.entries(requiredSeeds)) {
    assert.ok(demoTables[table].length >= minimum, `insufficient ${table} seed data`);
  }
  assert.ok(demoTables.exams.some((exam) => exam.status === "RESULT_DRAFT"));
  assert.ok(demoTables.enrollments.some((enrollment) => enrollment.status === "DISABLED"));
});

test("every client-facing demo workflow has representative records", () => {
  const activeBatches = demoTables.batches.filter((batch) =>
    ["OPEN", "RUNNING"].includes(batch.status),
  );
  const demoStudentEnrollments = demoTables.enrollments.filter(
    (enrollment) => enrollment.student_id === "student-1",
  );

  assert.ok(
    demoStudentEnrollments.some((enrollment) => enrollment.status === "ACTIVE"),
    "demo student needs an active batch",
  );
  assert.ok(
    demoStudentEnrollments.some((enrollment) => enrollment.status === "COMPLETED"),
    "demo student needs completed-batch history",
  );
  const demoStudentActiveBatchIds = demoStudentEnrollments
    .filter((enrollment) => enrollment.status === "ACTIVE")
    .map((enrollment) => enrollment.batch_id);
  const demoStudentSubmissionIds = new Set(
    demoTables.academic_assignment_submissions
      .filter((submission) => submission.student_id === "student-1")
      .map((submission) => submission.assignment_id),
  );
  assert.ok(
    demoTables.academic_assignments.some(
      (assignment) =>
        assignment.status === "PUBLISHED" &&
        demoStudentActiveBatchIds.includes(assignment.batch_id) &&
        !demoStudentSubmissionIds.has(assignment.id),
    ),
    "demo student dashboard needs a pending assignment",
  );

  for (const batch of activeBatches) {
    const subjects = demoTables.batch_subjects.filter(
      (subject) => subject.batch_id === batch.id,
    );
    assert.ok(subjects.length >= 2, `${batch.code} needs multiple subjects`);
    for (const subject of subjects) {
      assert.ok(
        demoTables.subject_units.some((unit) => unit.subject_id === subject.id),
        `${subject.code} needs a syllabus unit`,
      );
    }
    assert.ok(
      demoTables.enrollments.some(
        (enrollment) =>
          enrollment.batch_id === batch.id && enrollment.status === "ACTIVE",
      ),
      `${batch.code} needs active students`,
    );
    assert.ok(
      demoTables.exams.some((exam) => exam.batch_id === batch.id),
      `${batch.code} needs exams`,
    );
    assert.ok(
      demoTables.academic_assignments.some(
        (assignment) => assignment.batch_id === batch.id,
      ),
      `${batch.code} needs assignments`,
    );
    assert.ok(
      demoTables.academic_class_sessions.some(
        (session) => session.batch_id === batch.id,
      ),
      `${batch.code} needs routine entries`,
    );
    assert.ok(
      demoTables.batch_contents.some((content) => content.batch_id === batch.id),
      `${batch.code} needs study materials`,
    );
    assert.ok(
      demoTables.announcements.some(
        (announcement) => announcement.batch_id === batch.id,
      ),
      `${batch.code} needs announcements`,
    );
  }

  for (const status of ["PAID", "PARTIALLY_PAID", "UNPAID"]) {
    assert.ok(
      demoTables.payments.some((payment) => payment.status === status),
      `payment ledger needs ${status} records`,
    );
  }
  for (const status of ["DRAFT", "PUBLISHED", "CLOSED"]) {
    assert.ok(
      demoTables.academic_assignments.some(
        (assignment) => assignment.status === status,
      ),
      `assignment workspace needs ${status} records`,
    );
  }
  for (const status of ["SCHEDULED", "COMPLETED", "CANCELLED"]) {
    assert.ok(
      demoTables.academic_class_sessions.some(
        (session) => session.status === status,
      ),
      `routine needs ${status} records`,
    );
  }
  for (const session of demoTables.academic_class_sessions) {
    assert.equal(
      Number.isNaN(new Date(session.starts_at).getTime()),
      false,
      `${session.id} needs a valid start time`,
    );
    assert.equal(
      Number.isNaN(new Date(session.ends_at).getTime()),
      false,
      `${session.id} needs a valid end time`,
    );
  }
  for (const status of ["DRAFT", "PUBLISHED", "ARCHIVED"]) {
    assert.ok(
      demoTables.batch_contents.some((content) => content.status === status),
      `materials workspace needs ${status} records`,
    );
  }
  for (const category of demoTables.finance_expense_categories) {
    assert.ok(
      demoTables.finance_expenses.some(
        (expense) => expense.category_id === category.id,
      ),
      `${category.name} needs a representative expense`,
    );
  }
  assert.ok(
    demoTables.finance_expenses.some(
      (expense) =>
        expense.receipt_storage_path &&
        expense.receipt_file_name &&
        expense.receipt_content_type,
    ),
    "finance needs a downloadable receipt example",
  );
  assert.ok(
    demoTables.notifications.filter(
      (notification) => notification.user_id === "profile-student-1",
    ).length >= 8,
    "student notification inbox needs representative records",
  );
  assert.ok(
    demoTables.notifications.filter(
      (notification) => notification.user_id === "profile-teacher",
    ).length >= 6,
    "teacher notification inbox needs representative records",
  );
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
