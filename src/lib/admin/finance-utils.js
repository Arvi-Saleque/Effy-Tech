export const FINANCE_TIME_ZONE = "Asia/Dhaka";
export const BASE_CURRENCY = "BDT";

export const TRANSACTION_TYPES = ["income", "expense", "transfer"];
export const TRANSACTION_STATUSES = ["planned", "cleared", "void"];
export const ACCOUNT_TYPES = ["cash", "bank", "mobile_banking", "card", "other"];
export const PAYMENT_METHODS = [
  "bank_transfer",
  "cash",
  "mobile_banking",
  "card",
  "online_gateway",
  "cheque",
  "other",
];
export const RECURRING_FREQUENCIES = ["weekly", "monthly", "quarterly", "yearly"];
export const TARGET_METRICS = ["revenue", "net_profit", "expense_limit"];
export const TARGET_PERIODS = ["weekly", "monthly", "quarterly", "yearly", "custom"];

export const TYPE_LABELS = {
  income: "Income",
  expense: "Expense",
  transfer: "Transfer",
};

export const STATUS_LABELS = {
  planned: "Planned",
  cleared: "Cleared",
  void: "Void",
  active: "Active",
  paused: "Paused",
  ended: "Ended",
  on_hold: "On hold",
  settled: "Settled",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const METRIC_LABELS = {
  revenue: "Revenue target",
  net_profit: "Net profit target",
  expense_limit: "Expense limit",
};

const MAX_MONEY_VALUE = 999999999999.99;

/**
 * Safely evaluates a small arithmetic expression without using eval or the
 * Function constructor. Finance inputs accept +, -, *, /, parentheses,
 * commas, and the visible multiplication/division symbols.
 */
export function evaluateMoneyExpression(input, { allowNegative = false } = {}) {
  const original = String(input ?? "").trim();
  const invalid = (error) => ({ valid: false, value: null, hasExpression: false, error });

  if (!original) return invalid("Enter an amount.");
  if (original.length > 120) return invalid("The calculation is too long.");
  if (!/^[0-9+\-*/().,\s\u00d7\u00f7]+$/.test(original)) {
    return invalid("Use only numbers and +, -, *, /, or brackets.");
  }

  const expression = original
    .replaceAll("\u00d7", "*")
    .replaceAll("\u00f7", "/")
    .replace(/[\s,]/g, "");
  const hasExpression = /[+\-*/()]/.test(expression);
  let cursor = 0;

  const fail = (message) => {
    throw new Error(message);
  };

  const assertFinite = (value) => {
    if (!Number.isFinite(value)) fail("The calculation is not finite.");
    if (Math.abs(value) > MAX_MONEY_VALUE) fail("Amount is too large.");
    return value;
  };

  const parsePrimary = () => {
    if (expression[cursor] === "(") {
      cursor += 1;
      const value = parseExpression();
      if (expression[cursor] !== ")") fail("Check the brackets in the calculation.");
      cursor += 1;
      return value;
    }

    const match = expression.slice(cursor).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if (!match) fail("Enter a complete calculation.");
    cursor += match[0].length;
    return assertFinite(Number(match[0]));
  };

  const parseUnary = () => {
    if (expression[cursor] === "+") {
      cursor += 1;
      return parseUnary();
    }
    if (expression[cursor] === "-") {
      cursor += 1;
      return assertFinite(-parseUnary());
    }
    return parsePrimary();
  };

  const parseTerm = () => {
    let value = parseUnary();
    while (expression[cursor] === "*" || expression[cursor] === "/") {
      const operator = expression[cursor];
      cursor += 1;
      const right = parseUnary();
      if (operator === "/" && right === 0) fail("Cannot divide by zero.");
      value = assertFinite(operator === "*" ? value * right : value / right);
    }
    return value;
  };

  function parseExpression() {
    let value = parseTerm();
    while (expression[cursor] === "+" || expression[cursor] === "-") {
      const operator = expression[cursor];
      cursor += 1;
      const right = parseTerm();
      value = assertFinite(operator === "+" ? value + right : value - right);
    }
    return value;
  }

  try {
    if (!expression) return invalid("Enter an amount.");
    const value = parseExpression();
    if (cursor !== expression.length) return invalid("Enter a complete calculation.");
    if (!allowNegative && value < 0) return invalid("Amount cannot be negative.");
    const rounded = Math.sign(value) * Math.round((Math.abs(value) + Number.EPSILON) * 100) / 100;
    return { valid: true, value: rounded, hasExpression, error: null };
  } catch (error) {
    return { valid: false, value: null, hasExpression, error: error.message || "Invalid calculation." };
  }
}

export function formatMoney(value, { compact = false, decimals = 0 } = {}) {
  const amount = Number(value || 0);
  const formatter = new Intl.NumberFormat("en-BD", {
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `৳${formatter.format(Number.isFinite(amount) ? amount : 0)}`;
}

export function formatFinanceDate(value, options = {}) {
  if (!value) return "—";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value))
    ? new Date(`${value}T00:00:00+06:00`)
    : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-BD", {
    timeZone: FINANCE_TIME_ZONE,
    day: "numeric",
    month: options.short ? "short" : "long",
    year: options.hideYear ? undefined : "numeric",
  }).format(date);
}

export function toDateKey(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

export function parseDateKey(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (toDateKey(date) !== value) return null;
  return date;
}

export function addDays(dateKey, days) {
  const date = parseDateKey(dateKey);
  if (!date) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return toDateKey(date);
}

export function getDhakaToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: FINANCE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function monthBounds(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  return {
    start: toDateKey(new Date(Date.UTC(year, month, 1))),
    end: toDateKey(new Date(Date.UTC(year, month + 1, 0))),
  };
}

function rangeLabel(start, end, range) {
  if (range === "today") return `Today · ${formatFinanceDate(start, { short: true })}`;
  return `${formatFinanceDate(start, { short: true })} – ${formatFinanceDate(end, { short: true })}`;
}

export function resolveFinanceRange(filters = {}, todayOverride = null) {
  const requestedRange = ["today", "week", "month", "quarter", "year", "custom"].includes(filters.range)
    ? filters.range
    : "month";
  const todayKey = parseDateKey(todayOverride) ? todayOverride : getDhakaToday();
  const today = parseDateKey(todayKey);
  let start;
  let end;
  let range = requestedRange;

  if (range === "custom") {
    const customStart = parseDateKey(filters.from);
    const customEnd = parseDateKey(filters.to);
    const span = customStart && customEnd
      ? Math.round((customEnd - customStart) / 86400000)
      : -1;
    if (customStart && customEnd && span >= 0 && span <= 730) {
      start = filters.from;
      end = filters.to;
    } else {
      range = "month";
    }
  }

  if (!start) {
    if (range === "today") {
      start = todayKey;
      end = todayKey;
    } else if (range === "week") {
      const mondayOffset = (today.getUTCDay() + 6) % 7;
      start = addDays(todayKey, -mondayOffset);
      end = addDays(start, 6);
    } else if (range === "quarter") {
      const quarterStartMonth = Math.floor(today.getUTCMonth() / 3) * 3;
      start = toDateKey(new Date(Date.UTC(today.getUTCFullYear(), quarterStartMonth, 1)));
      end = toDateKey(new Date(Date.UTC(today.getUTCFullYear(), quarterStartMonth + 3, 0)));
    } else if (range === "year") {
      start = `${today.getUTCFullYear()}-01-01`;
      end = `${today.getUTCFullYear()}-12-31`;
    } else {
      const bounds = monthBounds(today);
      start = bounds.start;
      end = bounds.end;
    }
  }

  const durationDays = Math.round((parseDateKey(end) - parseDateKey(start)) / 86400000) + 1;
  let previousStart;
  let previousEnd = addDays(start, -1);
  if (range === "today") {
    previousStart = previousEnd;
  } else if (range === "week") {
    previousStart = addDays(start, -7);
  } else if (range === "month") {
    const startDate = parseDateKey(start);
    const previousMonth = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() - 1, 1));
    previousStart = toDateKey(previousMonth);
  } else if (range === "quarter") {
    const startDate = parseDateKey(start);
    previousStart = toDateKey(new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() - 3, 1)));
  } else if (range === "year") {
    const previousYear = parseDateKey(start).getUTCFullYear() - 1;
    previousStart = `${previousYear}-01-01`;
    previousEnd = `${previousYear}-12-31`;
  } else {
    previousStart = addDays(previousEnd, -(durationDays - 1));
  }

  return {
    range,
    start,
    end,
    label: rangeLabel(start, end, range),
    durationDays,
    previousStart,
    previousEnd,
    today: todayKey,
  };
}

export function percentageChange(current, previous) {
  const currentNumber = Number(current || 0);
  const previousNumber = Number(previous || 0);
  if (previousNumber === 0) return currentNumber === 0 ? 0 : null;
  return ((currentNumber - previousNumber) / Math.abs(previousNumber)) * 100;
}

export function buildCashflowTrend(transactions, start, end) {
  const startDate = parseDateKey(start);
  const endDate = parseDateKey(end);
  if (!startDate || !endDate) return [];
  const totalDays = Math.round((endDate - startDate) / 86400000) + 1;
  const mode = totalDays <= 45 ? "day" : totalDays <= 140 ? "week" : "month";
  const buckets = [];
  const bucketByDate = new Map();

  if (mode === "day") {
    for (let cursor = new Date(startDate); cursor <= endDate; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      const key = toDateKey(cursor);
      const bucket = {
        key,
        label: new Intl.DateTimeFormat("en-BD", { month: "short", day: "numeric", timeZone: "UTC" }).format(cursor),
        income: 0,
        expense: 0,
        net: 0,
      };
      buckets.push(bucket);
      bucketByDate.set(key, bucket);
    }
  } else if (mode === "week") {
    let cursor = new Date(startDate);
    while (cursor <= endDate) {
      const bucketStart = toDateKey(cursor);
      const bucketEndDate = new Date(cursor);
      bucketEndDate.setUTCDate(bucketEndDate.getUTCDate() + 6);
      if (bucketEndDate > endDate) bucketEndDate.setTime(endDate.getTime());
      const bucket = {
        key: bucketStart,
        start: bucketStart,
        end: toDateKey(bucketEndDate),
        label: `Wk ${new Intl.DateTimeFormat("en-BD", { month: "short", day: "numeric", timeZone: "UTC" }).format(cursor)}`,
        income: 0,
        expense: 0,
        net: 0,
      };
      buckets.push(bucket);
      cursor = new Date(bucketEndDate);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  } else {
    let cursor = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1));
    while (cursor <= endDate) {
      const monthStart = new Date(cursor);
      const monthEnd = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0));
      const bucket = {
        key: `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}`,
        start: toDateKey(monthStart < startDate ? startDate : monthStart),
        end: toDateKey(monthEnd > endDate ? endDate : monthEnd),
        label: new Intl.DateTimeFormat("en-BD", { month: "short", year: "2-digit", timeZone: "UTC" }).format(cursor),
        income: 0,
        expense: 0,
        net: 0,
      };
      buckets.push(bucket);
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
  }

  for (const transaction of transactions || []) {
    if (transaction.status !== "cleared" || transaction.type === "transfer") continue;
    const amount = Number(transaction.amount || 0);
    let bucket;
    if (mode === "day") {
      bucket = bucketByDate.get(transaction.transaction_date);
    } else {
      bucket = buckets.find((candidate) =>
        transaction.transaction_date >= candidate.start && transaction.transaction_date <= candidate.end
      );
    }
    if (!bucket) continue;
    if (transaction.type === "income") bucket.income += amount;
    if (transaction.type === "expense") bucket.expense += amount;
    bucket.net = bucket.income - bucket.expense;
  }

  return buckets;
}

export function advanceRecurringDate(dateKey, frequency) {
  const date = parseDateKey(dateKey);
  if (!date) return null;
  if (frequency === "weekly") {
    date.setUTCDate(date.getUTCDate() + 7);
    return toDateKey(date);
  }

  const months = frequency === "monthly" ? 1 : frequency === "quarterly" ? 3 : 12;
  const originalDay = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(originalDay, lastDay));
  return toDateKey(date);
}

export function daysBetween(from, to) {
  const start = parseDateKey(from);
  const end = parseDateKey(to);
  if (!start || !end) return null;
  return Math.round((end - start) / 86400000);
}
