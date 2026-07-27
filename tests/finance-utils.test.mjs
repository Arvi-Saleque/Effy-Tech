import test from "node:test";
import assert from "node:assert/strict";
import {
  advanceRecurringDate,
  buildCashflowTrend,
  daysBetween,
  evaluateMoneyExpression,
  percentageChange,
  resolveFinanceRange,
} from "../src/lib/admin/finance-utils.js";

test("money expressions add partial amounts and ignore readable separators", () => {
  assert.deepEqual(evaluateMoneyExpression("400+300+1450"), {
    valid: true,
    value: 2150,
    hasExpression: true,
    error: null,
  });
  assert.equal(evaluateMoneyExpression("1,200 + 800").value, 2000);
});

test("money expressions support brackets, multiplication, and division", () => {
  assert.equal(evaluateMoneyExpression("(1200+800)*2").value, 4000);
  assert.equal(evaluateMoneyExpression("1000/4").value, 250);
  assert.equal(evaluateMoneyExpression("200\u00d73 + 800\u00f74").value, 800);
});

test("money expressions reject unsafe input and invalid arithmetic", () => {
  assert.equal(evaluateMoneyExpression("alert(1)").valid, false);
  assert.equal(evaluateMoneyExpression("100/0").valid, false);
  assert.equal(evaluateMoneyExpression("400+").valid, false);
});

test("negative money is opt-in for account opening balances only", () => {
  assert.equal(evaluateMoneyExpression("400-900").valid, false);
  assert.deepEqual(evaluateMoneyExpression("400-900", { allowNegative: true }).value, -500);
  assert.equal(evaluateMoneyExpression("-1.005", { allowNegative: true }).value, -1.01);
});

test("month range uses calendar month and the exact previous calendar month", () => {
  const range = resolveFinanceRange({ range: "month" }, "2026-07-18");
  assert.deepEqual(
    { start: range.start, end: range.end, previousStart: range.previousStart, previousEnd: range.previousEnd },
    { start: "2026-07-01", end: "2026-07-31", previousStart: "2026-06-01", previousEnd: "2026-06-30" }
  );
});

test("week range starts Monday in Dhaka reporting calendar", () => {
  const range = resolveFinanceRange({ range: "week" }, "2026-07-18");
  assert.equal(range.start, "2026-07-13");
  assert.equal(range.end, "2026-07-19");
  assert.equal(range.previousStart, "2026-07-06");
  assert.equal(range.previousEnd, "2026-07-12");
});

test("custom range rejects reversed dates and falls back to current month", () => {
  const range = resolveFinanceRange({ range: "custom", from: "2026-07-20", to: "2026-07-01" }, "2026-07-18");
  assert.equal(range.range, "month");
  assert.equal(range.start, "2026-07-01");
});

test("recurring monthly dates clamp safely at month end", () => {
  assert.equal(advanceRecurringDate("2027-01-31", "monthly"), "2027-02-28");
  assert.equal(advanceRecurringDate("2028-01-31", "monthly"), "2028-02-29");
  assert.equal(advanceRecurringDate("2026-11-30", "quarterly"), "2027-02-28");
  assert.equal(advanceRecurringDate("2028-02-29", "yearly"), "2029-02-28");
});

test("cash-flow trend fills missing dates and excludes planned or transfer entries", () => {
  const trend = buildCashflowTrend([
    { status: "cleared", type: "income", amount: 10000, transaction_date: "2026-07-01" },
    { status: "cleared", type: "expense", amount: 2500, transaction_date: "2026-07-01" },
    { status: "planned", type: "income", amount: 9999, transaction_date: "2026-07-02" },
    { status: "cleared", type: "transfer", amount: 500, transaction_date: "2026-07-03" },
  ], "2026-07-01", "2026-07-03");
  assert.equal(trend.length, 3);
  assert.deepEqual(
    trend.map(({ income, expense, net }) => ({ income, expense, net })),
    [
      { income: 10000, expense: 2500, net: 7500 },
      { income: 0, expense: 0, net: 0 },
      { income: 0, expense: 0, net: 0 },
    ]
  );
});

test("comparison and date helpers handle zero baselines and overdue dates", () => {
  assert.equal(percentageChange(0, 0), 0);
  assert.equal(percentageChange(100, 0), null);
  assert.equal(percentageChange(150, 100), 50);
  assert.equal(daysBetween("2026-07-18", "2026-07-15"), -3);
});
