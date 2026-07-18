"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import {
  financeAccountSchema,
  financeCategorySchema,
  financeTransactionSchema,
  financeUuidSchema,
  projectContractSchema,
  recurringItemSchema,
  targetSchema,
  transactionFilterSchema,
} from "./finance-schema";
import {
  addDays,
  advanceRecurringDate,
  buildCashflowTrend,
  getDhakaToday,
  percentageChange,
  resolveFinanceRange,
} from "./finance-utils";

async function requireFinanceAdmin() {
  const profile = await requireAdmin();
  if (!profile.is_active) throw new Error("Active admin access is required.");
  return profile;
}

function revalidateFinance() {
  revalidatePath("/admin/finance");
  revalidatePath("/admin/finance/transactions");
  revalidatePath("/admin/finance/projects");
  revalidatePath("/admin/finance/recurring");
  revalidatePath("/admin/finance/targets");
  revalidatePath("/admin/finance/settings");
}

function validationResult(parsed) {
  return {
    data: null,
    error: "Please correct the highlighted fields.",
    details: parsed.error.flatten(),
  };
}

function numberValue(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function summarizeTransactions(transactions) {
  return (transactions || []).reduce(
    (summary, transaction) => {
      const amount = numberValue(transaction.amount);
      if (transaction.status === "cleared" && transaction.type === "income") summary.income += amount;
      if (transaction.status === "cleared" && transaction.type === "expense") summary.expense += amount;
      if (transaction.status === "planned" && transaction.type === "income") summary.plannedIncome += amount;
      if (transaction.status === "planned" && transaction.type === "expense") summary.plannedExpense += amount;
      summary.count += 1;
      return summary;
    },
    { income: 0, expense: 0, plannedIncome: 0, plannedExpense: 0, count: 0 }
  );
}

function financeTransactionSelect() {
  return `
    *,
    account:finance_accounts!finance_transactions_account_id_fkey(id, name, account_type),
    destination_account:finance_accounts!finance_transactions_destination_account_id_fkey(id, name, account_type),
    category:finance_categories(id, name, direction, color),
    client:clients(id, name, company_name),
    project:projects(id, name),
    created_by_profile:admin_profiles!finance_transactions_created_by_fkey(id, name)
  `;
}

async function loadReferenceData(supabase, { includeInactive = false } = {}) {
  let accountsQuery = supabase
    .from("finance_account_balances")
    .select("*")
    .order("is_system", { ascending: false })
    .order("name");
  let categoriesQuery = supabase
    .from("finance_categories")
    .select("*")
    .order("direction")
    .order("name");

  if (!includeInactive) {
    accountsQuery = accountsQuery.eq("is_active", true);
    categoriesQuery = categoriesQuery.eq("is_active", true);
  }

  const [accountsResult, categoriesResult, clientsResult, projectsResult] = await Promise.all([
    accountsQuery,
    categoriesQuery,
    supabase
      .from("clients")
      .select("id, name, company_name, status")
      .neq("status", "archived")
      .order("name"),
    supabase
      .from("projects")
      .select("id, name, client_id, status, clients(id, name, company_name)")
      .not("status", "eq", "archived")
      .not("status", "eq", "cancelled")
      .order("name"),
  ]);

  const firstError = [accountsResult, categoriesResult, clientsResult, projectsResult].find((result) => result.error)?.error;
  if (firstError) throw firstError;

  return {
    accounts: accountsResult.data || [],
    categories: categoriesResult.data || [],
    clients: clientsResult.data || [],
    projects: projectsResult.data || [],
  };
}

async function validateTransactionReferences(supabase, payload) {
  const accountIds = [payload.account_id, payload.destination_account_id].filter(Boolean);
  const requests = [
    supabase.from("finance_accounts").select("id, is_active").in("id", accountIds),
  ];

  if (payload.category_id) {
    requests.push(
      supabase.from("finance_categories").select("id, direction, is_active").eq("id", payload.category_id).maybeSingle()
    );
  } else {
    requests.push(Promise.resolve({ data: null, error: null }));
  }

  if (payload.project_id) {
    requests.push(
      supabase.from("projects").select("id, client_id, status").eq("id", payload.project_id).maybeSingle()
    );
  } else {
    requests.push(Promise.resolve({ data: null, error: null }));
  }

  const [accountsResult, categoryResult, projectResult] = await Promise.all(requests);
  if (accountsResult.error || categoryResult.error || projectResult.error) {
    return { error: "Unable to verify the selected finance references." };
  }
  if ((accountsResult.data || []).length !== accountIds.length || accountsResult.data.some((account) => !account.is_active)) {
    return { error: "Choose active source and destination accounts." };
  }

  if (payload.type !== "transfer") {
    if (!categoryResult.data || !categoryResult.data.is_active) {
      return { error: "Choose an active finance category." };
    }
    if (categoryResult.data.direction !== "both" && categoryResult.data.direction !== payload.type) {
      return { error: "The selected category does not match the transaction type." };
    }
  }

  let clientId = payload.client_id || null;
  if (payload.project_id) {
    if (!projectResult.data || ["archived", "cancelled"].includes(projectResult.data.status)) {
      return { error: "Choose a current project." };
    }
    if (clientId && clientId !== projectResult.data.client_id) {
      return { error: "The selected project does not belong to that client." };
    }
    clientId = projectResult.data.client_id;
  }

  return { error: null, clientId };
}

export async function getFinanceReferenceData(options = {}) {
  await requireFinanceAdmin();
  try {
    const supabase = await createClient();
    const data = await loadReferenceData(supabase, options);
    return { data, error: null };
  } catch (error) {
    console.error("getFinanceReferenceData:", error);
    return { data: { accounts: [], categories: [], clients: [], projects: [] }, error: "Unable to load finance setup data." };
  }
}

export async function getFinanceOverview(filters = {}) {
  await requireFinanceAdmin();
  try {
    const supabase = await createClient();
    const period = resolveFinanceRange(filters);
    const upcomingEnd = addDays(period.today, 30);

    const [
      currentResult,
      previousResult,
      accountResult,
      projectResult,
      targetResult,
      recurringResult,
      upcomingPlannedResult,
      recentResult,
    ] = await Promise.all([
      supabase
        .from("finance_transactions")
        .select("id, type, status, title, amount, transaction_date, category_id, finance_categories(id, name, color)")
        .in("status", ["cleared", "planned"])
        .gte("transaction_date", period.start)
        .lte("transaction_date", period.end)
        .order("transaction_date"),
      supabase
        .from("finance_transactions")
        .select("type, status, amount, transaction_date")
        .eq("status", "cleared")
        .gte("transaction_date", period.previousStart)
        .lte("transaction_date", period.previousEnd),
      supabase
        .from("finance_account_balances")
        .select("*")
        .eq("is_active", true)
        .order("current_balance", { ascending: false }),
      supabase
        .from("finance_project_summary")
        .select("*")
        .neq("contract_status", "cancelled")
        .order("payment_deadline", { ascending: true, nullsFirst: false }),
      supabase
        .from("finance_target_progress")
        .select("*")
        .eq("status", "active")
        .lte("start_date", period.end)
        .gte("end_date", period.start)
        .order("end_date"),
      supabase
        .from("finance_recurring_items")
        .select(`
          *,
          category:finance_categories(id, name, color),
          account:finance_accounts(id, name),
          client:clients(id, name),
          project:projects(id, name)
        `)
        .eq("status", "active")
        .lte("next_due_date", upcomingEnd)
        .order("next_due_date")
        .limit(20),
      supabase
        .from("finance_transactions")
        .select(`
          id, type, status, title, amount, transaction_date, due_date,
          category:finance_categories(id, name, color),
          account:finance_accounts!finance_transactions_account_id_fkey(id, name)
        `)
        .eq("status", "planned")
        .gte("transaction_date", period.today)
        .lte("transaction_date", upcomingEnd)
        .order("transaction_date")
        .limit(20),
      supabase
        .from("finance_transactions")
        .select(financeTransactionSelect())
        .order("transaction_date", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    const results = [
      currentResult,
      previousResult,
      accountResult,
      projectResult,
      targetResult,
      recurringResult,
      upcomingPlannedResult,
      recentResult,
    ];
    const firstError = results.find((result) => result.error)?.error;
    if (firstError) throw firstError;

    const currentTransactions = currentResult.data || [];
    const current = summarizeTransactions(currentTransactions);
    const previous = summarizeTransactions(previousResult.data || []);
    const income = current.income;
    const expense = current.expense;
    const net = income - expense;
    const previousNet = previous.income - previous.expense;

    const expenseByCategoryMap = new Map();
    for (const transaction of currentTransactions) {
      if (transaction.status !== "cleared" || transaction.type !== "expense") continue;
      const category = transaction.finance_categories;
      const key = category?.id || "uncategorized";
      const existing = expenseByCategoryMap.get(key) || {
        id: key,
        name: category?.name || "Uncategorized",
        color: category?.color || "#64748b",
        value: 0,
      };
      existing.value += numberValue(transaction.amount);
      expenseByCategoryMap.set(key, existing);
    }

    const projects = (projectResult.data || []).map((project) => ({
      ...project,
      contract_value: numberValue(project.contract_value),
      received_amount: numberValue(project.received_amount),
      expense_amount: numberValue(project.expense_amount),
      outstanding_amount: numberValue(project.outstanding_amount),
      realized_net_cash: numberValue(project.realized_net_cash),
      projected_margin: numberValue(project.projected_margin),
    }));
    const outstanding = projects.reduce((total, project) => total + project.outstanding_amount, 0);
    const overdueProjects = projects.filter(
      (project) => project.outstanding_amount > 0 && project.payment_deadline && project.payment_deadline < period.today
    );

    const accounts = (accountResult.data || []).map((account) => ({
      ...account,
      opening_balance: numberValue(account.opening_balance),
      current_balance: numberValue(account.current_balance),
    }));
    const cashBalance = accounts.reduce((total, account) => total + account.current_balance, 0);

    const recurringUpcoming = (recurringResult.data || []).map((item) => ({
      id: `recurring-${item.id}`,
      sourceId: item.id,
      source: "recurring",
      type: item.type,
      title: item.title,
      amount: numberValue(item.amount),
      dueDate: item.next_due_date,
      category: item.category,
      account: item.account,
      frequency: item.frequency,
    }));
    const plannedUpcoming = (upcomingPlannedResult.data || []).map((item) => ({
      id: `planned-${item.id}`,
      sourceId: item.id,
      source: "planned",
      type: item.type,
      title: item.title,
      amount: numberValue(item.amount),
      dueDate: item.due_date || item.transaction_date,
      category: item.category,
      account: item.account,
    }));
    const upcoming = [...recurringUpcoming, ...plannedUpcoming]
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 10);

    const targets = (targetResult.data || []).map((target) => ({
      ...target,
      target_amount: numberValue(target.target_amount),
      actual_amount: numberValue(target.actual_amount),
      remaining_amount: numberValue(target.remaining_amount),
      progress_percent: numberValue(target.progress_percent),
    }));

    return {
      data: {
        period,
        totals: {
          income,
          expense,
          net,
          plannedIncome: current.plannedIncome,
          plannedExpense: current.plannedExpense,
          cashBalance,
          outstanding,
          overdueReceivables: overdueProjects.length,
          marginPercent: income > 0 ? (net / income) * 100 : null,
        },
        comparison: {
          income: percentageChange(income, previous.income),
          expense: percentageChange(expense, previous.expense),
          net: percentageChange(net, previousNet),
        },
        cashflowTrend: buildCashflowTrend(currentTransactions, period.start, period.end),
        expenseByCategory: Array.from(expenseByCategoryMap.values()).sort((a, b) => b.value - a.value),
        accounts,
        projects: projects.sort((a, b) => b.outstanding_amount - a.outstanding_amount).slice(0, 8),
        targets,
        upcoming,
        recentTransactions: (recentResult.data || []).map((transaction) => ({
          ...transaction,
          amount: numberValue(transaction.amount),
        })),
      },
      error: null,
    };
  } catch (error) {
    console.error("getFinanceOverview:", error);
    return { data: null, error: "Finance data is unavailable. Apply the Finance V1 migration, then reload this page." };
  }
}

export async function getFinanceTransactions(filters = {}) {
  await requireFinanceAdmin();
  try {
    const parsed = transactionFilterSchema.safeParse(filters);
    const safeFilters = parsed.success
      ? parsed.data
      : { type: "all", status: "all", account: null, category: null, client: null, project: null, from: null, to: null, search: null };
    const supabase = await createClient();
    let query = supabase
      .from("finance_transactions")
      .select(financeTransactionSelect())
      .order("transaction_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(500);

    if (safeFilters.type !== "all") query = query.eq("type", safeFilters.type);
    if (safeFilters.status !== "all") query = query.eq("status", safeFilters.status);
    if (safeFilters.account) {
      query = query.or(`account_id.eq.${safeFilters.account},destination_account_id.eq.${safeFilters.account}`);
    }
    if (safeFilters.category) query = query.eq("category_id", safeFilters.category);
    if (safeFilters.client) query = query.eq("client_id", safeFilters.client);
    if (safeFilters.project) query = query.eq("project_id", safeFilters.project);
    if (safeFilters.from) query = query.gte("transaction_date", safeFilters.from);
    if (safeFilters.to) query = query.lte("transaction_date", safeFilters.to);

    const { data, error } = await query;
    if (error) throw error;
    let transactions = data || [];
    if (safeFilters.search) {
      const search = safeFilters.search.toLowerCase();
      transactions = transactions.filter((transaction) =>
        [transaction.title, transaction.reference, transaction.notes, transaction.client?.name, transaction.project?.name]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search))
      );
    }

    const summary = summarizeTransactions(transactions);
    return {
      data: transactions.map((transaction) => ({ ...transaction, amount: numberValue(transaction.amount) })),
      summary: { ...summary, net: summary.income - summary.expense },
      filters: safeFilters,
      truncated: !safeFilters.search && (data || []).length === 500,
      error: null,
    };
  } catch (error) {
    console.error("getFinanceTransactions:", error);
    return { data: [], summary: summarizeTransactions([]), filters, truncated: false, error: "Unable to load finance transactions." };
  }
}

export async function getFinanceTransactionById(transactionId) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(transactionId);
    if (!id.success) return { data: null, error: "Invalid transaction." };
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("finance_transactions")
      .select(financeTransactionSelect())
      .eq("id", id.data)
      .maybeSingle();
    if (error) throw error;
    if (!data) return { data: null, error: "Transaction not found." };
    return { data: { ...data, amount: numberValue(data.amount) }, error: null };
  } catch (error) {
    console.error("getFinanceTransactionById:", error);
    return { data: null, error: "Unable to load the transaction." };
  }
}

export async function createFinanceTransaction(input) {
  const profile = await requireFinanceAdmin();
  try {
    const parsed = financeTransactionSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const checked = await validateTransactionReferences(supabase, parsed.data);
    if (checked.error) return { data: null, error: checked.error };

    const payload = {
      ...parsed.data,
      destination_account_id: parsed.data.type === "transfer" ? parsed.data.destination_account_id : null,
      category_id: parsed.data.type === "transfer" ? null : parsed.data.category_id,
      client_id: parsed.data.type === "transfer" ? null : checked.clientId,
      project_id: parsed.data.type === "transfer" ? null : parsed.data.project_id,
      created_by: profile.id,
    };
    const { data, error } = await supabase.from("finance_transactions").insert(payload).select("id").single();
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("createFinanceTransaction:", error);
    return { data: null, error: "Unable to save the transaction." };
  }
}

export async function updateFinanceTransaction(transactionId, input) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(transactionId);
    if (!id.success) return { data: null, error: "Invalid transaction." };
    const parsed = financeTransactionSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data: existing, error: existingError } = await supabase
      .from("finance_transactions")
      .select("id, status")
      .eq("id", id.data)
      .maybeSingle();
    if (existingError) throw existingError;
    if (!existing) return { data: null, error: "Transaction not found." };
    if (existing.status === "void") return { data: null, error: "Void transactions cannot be edited. Record a corrected entry instead." };

    const checked = await validateTransactionReferences(supabase, parsed.data);
    if (checked.error) return { data: null, error: checked.error };
    const payload = {
      ...parsed.data,
      destination_account_id: parsed.data.type === "transfer" ? parsed.data.destination_account_id : null,
      category_id: parsed.data.type === "transfer" ? null : parsed.data.category_id,
      client_id: parsed.data.type === "transfer" ? null : checked.clientId,
      project_id: parsed.data.type === "transfer" ? null : parsed.data.project_id,
    };
    const { data, error } = await supabase
      .from("finance_transactions")
      .update(payload)
      .eq("id", id.data)
      .select("id")
      .single();
    if (error) throw error;
    revalidateFinance();
    revalidatePath(`/admin/finance/transactions/${id.data}/edit`);
    return { data, error: null };
  } catch (error) {
    console.error("updateFinanceTransaction:", error);
    return { data: null, error: "Unable to update the transaction." };
  }
}

export async function voidFinanceTransaction(transactionId) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(transactionId);
    if (!id.success) return { error: "Invalid transaction." };
    const supabase = await createClient();
    const { data: existing, error: fetchError } = await supabase
      .from("finance_transactions")
      .select("status")
      .eq("id", id.data)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!existing) return { error: "Transaction not found." };
    if (existing.status === "void") return { error: "Transaction is already void." };
    const { error } = await supabase.from("finance_transactions").update({ status: "void" }).eq("id", id.data);
    if (error) throw error;
    revalidateFinance();
    return { error: null };
  } catch (error) {
    console.error("voidFinanceTransaction:", error);
    return { error: "Unable to void the transaction." };
  }
}

export async function getProjectFinanceData() {
  await requireFinanceAdmin();
  try {
    const supabase = await createClient();
    const [summaryResult, projectsResult] = await Promise.all([
      supabase.from("finance_project_summary").select("*").order("updated_at", { ascending: false }),
      supabase
        .from("projects")
        .select("id, name, client_id, status, clients(id, name, company_name)")
        .not("status", "eq", "archived")
        .not("status", "eq", "cancelled")
        .order("name"),
    ]);
    if (summaryResult.error || projectsResult.error) throw summaryResult.error || projectsResult.error;
    const summaries = (summaryResult.data || []).map((project) => ({
      ...project,
      contract_value: numberValue(project.contract_value),
      received_amount: numberValue(project.received_amount),
      expense_amount: numberValue(project.expense_amount),
      outstanding_amount: numberValue(project.outstanding_amount),
      overpaid_amount: numberValue(project.overpaid_amount),
      realized_net_cash: numberValue(project.realized_net_cash),
      projected_margin: numberValue(project.projected_margin),
    }));
    const configuredIds = new Set(summaries.map((project) => project.project_id));
    return {
      data: summaries,
      availableProjects: (projectsResult.data || []).filter((project) => !configuredIds.has(project.id)),
      totals: summaries.reduce(
        (totals, project) => ({
          contract: totals.contract + project.contract_value,
          received: totals.received + project.received_amount,
          outstanding: totals.outstanding + project.outstanding_amount,
          expenses: totals.expenses + project.expense_amount,
        }),
        { contract: 0, received: 0, outstanding: 0, expenses: 0 }
      ),
      error: null,
    };
  } catch (error) {
    console.error("getProjectFinanceData:", error);
    return { data: [], availableProjects: [], totals: { contract: 0, received: 0, outstanding: 0, expenses: 0 }, error: "Unable to load project finances." };
  }
}

export async function getProjectContractById(contractId) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(contractId);
    if (!id.success) return { data: null, error: "Invalid contract." };
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("finance_project_contracts")
      .select("*, project:projects(id, name, client_id, clients(id, name, company_name))")
      .eq("id", id.data)
      .maybeSingle();
    if (error) throw error;
    if (!data) return { data: null, error: "Project finance record not found." };
    return { data: { ...data, contract_value: numberValue(data.contract_value) }, error: null };
  } catch (error) {
    console.error("getProjectContractById:", error);
    return { data: null, error: "Unable to load the project finance record." };
  }
}

export async function createProjectContract(input) {
  const profile = await requireFinanceAdmin();
  try {
    const parsed = projectContractSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, status")
      .eq("id", parsed.data.project_id)
      .maybeSingle();
    if (projectError) throw projectError;
    if (!project || ["archived", "cancelled"].includes(project.status)) return { data: null, error: "Choose a current project." };
    const { data, error } = await supabase
      .from("finance_project_contracts")
      .insert({ ...parsed.data, created_by: profile.id })
      .select("id")
      .single();
    if (error?.code === "23505") return { data: null, error: "That project already has a finance record." };
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("createProjectContract:", error);
    return { data: null, error: "Unable to save the project finance record." };
  }
}

export async function updateProjectContract(contractId, input) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(contractId);
    if (!id.success) return { data: null, error: "Invalid contract." };
    const parsed = projectContractSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data: existing, error: fetchError } = await supabase
      .from("finance_project_contracts")
      .select("id, project_id")
      .eq("id", id.data)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!existing) return { data: null, error: "Project finance record not found." };
    const { project_id: ignoredProjectId, ...changes } = parsed.data;
    void ignoredProjectId;
    const { data, error } = await supabase
      .from("finance_project_contracts")
      .update(changes)
      .eq("id", id.data)
      .select("id")
      .single();
    if (error) throw error;
    revalidateFinance();
    revalidatePath(`/admin/finance/projects/${id.data}/edit`);
    return { data, error: null };
  } catch (error) {
    console.error("updateProjectContract:", error);
    return { data: null, error: "Unable to update the project finance record." };
  }
}

export async function getRecurringFinanceItems(filters = {}) {
  await requireFinanceAdmin();
  try {
    const supabase = await createClient();
    let query = supabase
      .from("finance_recurring_items")
      .select(`
        *,
        category:finance_categories(id, name, direction, color),
        account:finance_accounts(id, name, account_type),
        client:clients(id, name, company_name),
        project:projects(id, name)
      `)
      .order("next_due_date");
    if (["active", "paused", "ended"].includes(filters.status)) query = query.eq("status", filters.status);
    if (["income", "expense"].includes(filters.type)) query = query.eq("type", filters.type);
    const { data, error } = await query;
    if (error) throw error;
    return {
      data: (data || []).map((item) => ({ ...item, amount: numberValue(item.amount) })),
      today: getDhakaToday(),
      error: null,
    };
  } catch (error) {
    console.error("getRecurringFinanceItems:", error);
    return { data: [], today: getDhakaToday(), error: "Unable to load recurring finance items." };
  }
}

export async function getRecurringFinanceItemById(itemId) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(itemId);
    if (!id.success) return { data: null, error: "Invalid recurring item." };
    const supabase = await createClient();
    const { data, error } = await supabase.from("finance_recurring_items").select("*").eq("id", id.data).maybeSingle();
    if (error) throw error;
    if (!data) return { data: null, error: "Recurring item not found." };
    return { data: { ...data, amount: numberValue(data.amount) }, error: null };
  } catch (error) {
    console.error("getRecurringFinanceItemById:", error);
    return { data: null, error: "Unable to load the recurring item." };
  }
}

export async function createRecurringFinanceItem(input) {
  const profile = await requireFinanceAdmin();
  try {
    const parsed = recurringItemSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const checked = await validateTransactionReferences(supabase, parsed.data);
    if (checked.error) return { data: null, error: checked.error };
    const { data, error } = await supabase
      .from("finance_recurring_items")
      .insert({ ...parsed.data, client_id: checked.clientId, created_by: profile.id })
      .select("id")
      .single();
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("createRecurringFinanceItem:", error);
    return { data: null, error: "Unable to save the recurring item." };
  }
}

export async function updateRecurringFinanceItem(itemId, input) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(itemId);
    if (!id.success) return { data: null, error: "Invalid recurring item." };
    const parsed = recurringItemSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const checked = await validateTransactionReferences(supabase, parsed.data);
    if (checked.error) return { data: null, error: checked.error };
    const { data, error } = await supabase
      .from("finance_recurring_items")
      .update({ ...parsed.data, client_id: checked.clientId })
      .eq("id", id.data)
      .select("id")
      .single();
    if (error) throw error;
    revalidateFinance();
    revalidatePath(`/admin/finance/recurring/${id.data}/edit`);
    return { data, error: null };
  } catch (error) {
    console.error("updateRecurringFinanceItem:", error);
    return { data: null, error: "Unable to update the recurring item." };
  }
}

export async function setRecurringFinanceStatus(itemId, status) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(itemId);
    if (!id.success || !["active", "paused", "ended"].includes(status)) return { error: "Invalid recurring item update." };
    const supabase = await createClient();
    const { error } = await supabase.from("finance_recurring_items").update({ status }).eq("id", id.data);
    if (error) throw error;
    revalidateFinance();
    return { error: null };
  } catch (error) {
    console.error("setRecurringFinanceStatus:", error);
    return { error: "Unable to update the recurring item." };
  }
}

export async function recordRecurringFinanceItem(itemId, input = {}) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(itemId);
    if (!id.success) return { data: null, error: "Invalid recurring item." };
    const paidDate = /^\d{4}-\d{2}-\d{2}$/.test(input.paid_date || "") ? input.paid_date : getDhakaToday();
    const reference = String(input.reference || "").trim().slice(0, 160) || null;
    const notes = String(input.notes || "").trim().slice(0, 5000) || null;
    const supabase = await createClient();
    const { data: item, error: fetchError } = await supabase
      .from("finance_recurring_items")
      .select("id, frequency, next_due_date, status")
      .eq("id", id.data)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!item) return { data: null, error: "Recurring item not found." };
    if (item.status !== "active") return { data: null, error: "Only active recurring items can be recorded." };
    const nextDueDate = advanceRecurringDate(item.next_due_date, item.frequency);
    const { data, error } = await supabase.rpc("record_recurring_finance_item_v1", {
      p_item_id: id.data,
      p_paid_date: paidDate,
      p_next_due_date: nextDueDate,
      p_reference: reference,
      p_notes: notes,
    });
    if (error) throw error;
    revalidateFinance();
    return { data: { transactionId: data, nextDueDate }, error: null };
  } catch (error) {
    console.error("recordRecurringFinanceItem:", error);
    return { data: null, error: "Unable to record this recurring item." };
  }
}

export async function getFinanceTargets(filters = {}) {
  await requireFinanceAdmin();
  try {
    const supabase = await createClient();
    let query = supabase.from("finance_target_progress").select("*").order("end_date", { ascending: false });
    if (["active", "completed", "cancelled"].includes(filters.status)) query = query.eq("status", filters.status);
    const { data, error } = await query;
    if (error) throw error;
    return {
      data: (data || []).map((target) => ({
        ...target,
        target_amount: numberValue(target.target_amount),
        actual_amount: numberValue(target.actual_amount),
        remaining_amount: numberValue(target.remaining_amount),
        progress_percent: numberValue(target.progress_percent),
      })),
      today: getDhakaToday(),
      error: null,
    };
  } catch (error) {
    console.error("getFinanceTargets:", error);
    return { data: [], today: getDhakaToday(), error: "Unable to load finance targets." };
  }
}

export async function getFinanceTargetById(targetId) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(targetId);
    if (!id.success) return { data: null, error: "Invalid target." };
    const supabase = await createClient();
    const { data, error } = await supabase.from("finance_targets").select("*").eq("id", id.data).maybeSingle();
    if (error) throw error;
    if (!data) return { data: null, error: "Target not found." };
    return { data: { ...data, target_amount: numberValue(data.target_amount) }, error: null };
  } catch (error) {
    console.error("getFinanceTargetById:", error);
    return { data: null, error: "Unable to load the target." };
  }
}

export async function createFinanceTarget(input) {
  const profile = await requireFinanceAdmin();
  try {
    const parsed = targetSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    if (parsed.data.category_id) {
      const { data: category, error: categoryError } = await supabase
        .from("finance_categories")
        .select("id, direction, is_active")
        .eq("id", parsed.data.category_id)
        .maybeSingle();
      if (categoryError) throw categoryError;
      if (!category || !category.is_active) return { data: null, error: "Choose an active category." };
      if (parsed.data.metric === "revenue" && !["income", "both"].includes(category.direction)) {
        return { data: null, error: "Revenue targets need an income category." };
      }
      if (parsed.data.metric === "expense_limit" && !["expense", "both"].includes(category.direction)) {
        return { data: null, error: "Expense limits need an expense category." };
      }
    }
    const { data, error } = await supabase
      .from("finance_targets")
      .insert({ ...parsed.data, created_by: profile.id })
      .select("id")
      .single();
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("createFinanceTarget:", error);
    return { data: null, error: "Unable to save the finance target." };
  }
}

export async function updateFinanceTarget(targetId, input) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(targetId);
    if (!id.success) return { data: null, error: "Invalid target." };
    const parsed = targetSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    if (parsed.data.category_id) {
      const { data: category, error: categoryError } = await supabase
        .from("finance_categories")
        .select("id, direction, is_active")
        .eq("id", parsed.data.category_id)
        .maybeSingle();
      if (categoryError) throw categoryError;
      if (!category || !category.is_active) return { data: null, error: "Choose an active category." };
      if (parsed.data.metric === "revenue" && !["income", "both"].includes(category.direction)) {
        return { data: null, error: "Revenue targets need an income category." };
      }
      if (parsed.data.metric === "expense_limit" && !["expense", "both"].includes(category.direction)) {
        return { data: null, error: "Expense limits need an expense category." };
      }
    }
    const { data, error } = await supabase
      .from("finance_targets")
      .update(parsed.data)
      .eq("id", id.data)
      .select("id")
      .single();
    if (error) throw error;
    revalidateFinance();
    revalidatePath(`/admin/finance/targets/${id.data}/edit`);
    return { data, error: null };
  } catch (error) {
    console.error("updateFinanceTarget:", error);
    return { data: null, error: "Unable to update the finance target." };
  }
}

export async function setFinanceTargetStatus(targetId, status) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(targetId);
    if (!id.success || !["active", "completed", "cancelled"].includes(status)) return { error: "Invalid target update." };
    const supabase = await createClient();
    const { error } = await supabase.from("finance_targets").update({ status }).eq("id", id.data);
    if (error) throw error;
    revalidateFinance();
    return { error: null };
  } catch (error) {
    console.error("setFinanceTargetStatus:", error);
    return { error: "Unable to update the finance target." };
  }
}

export async function getFinanceSettingsData() {
  await requireFinanceAdmin();
  try {
    const supabase = await createClient();
    const [references, auditResult] = await Promise.all([
      loadReferenceData(supabase, { includeInactive: true }),
      supabase
        .from("finance_audit_log")
        .select("id, entity_type, entity_id, action, changed_at, changed_by_profile:admin_profiles!finance_audit_log_changed_by_fkey(id, name)")
        .order("changed_at", { ascending: false })
        .limit(20),
    ]);
    if (auditResult.error) throw auditResult.error;
    return { data: { ...references, audit: auditResult.data || [] }, error: null };
  } catch (error) {
    console.error("getFinanceSettingsData:", error);
    return { data: { accounts: [], categories: [], clients: [], projects: [], audit: [] }, error: "Unable to load finance settings." };
  }
}

export async function createFinanceAccount(input) {
  const profile = await requireFinanceAdmin();
  try {
    const parsed = financeAccountSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("finance_accounts")
      .insert({ ...parsed.data, created_by: profile.id })
      .select("id")
      .single();
    if (error?.code === "23505") return { data: null, error: "An account with this name already exists." };
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("createFinanceAccount:", error);
    return { data: null, error: "Unable to create the account." };
  }
}

export async function updateFinanceAccount(accountId, input) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(accountId);
    if (!id.success) return { data: null, error: "Invalid account." };
    const parsed = financeAccountSchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("finance_accounts")
      .update(parsed.data)
      .eq("id", id.data)
      .select("id")
      .single();
    if (error?.code === "23505") return { data: null, error: "An account with this name already exists." };
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("updateFinanceAccount:", error);
    return { data: null, error: "Unable to update the account." };
  }
}

export async function setFinanceAccountActive(accountId, isActive) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(accountId);
    if (!id.success || typeof isActive !== "boolean") return { error: "Invalid account update." };
    const supabase = await createClient();
    const { data: account, error: fetchError } = await supabase
      .from("finance_accounts")
      .select("is_system")
      .eq("id", id.data)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!account) return { error: "Account not found." };
    if (account.is_system && !isActive) return { error: "The General Fund account must stay active." };
    const { error } = await supabase.from("finance_accounts").update({ is_active: isActive }).eq("id", id.data);
    if (error) throw error;
    revalidateFinance();
    return { error: null };
  } catch (error) {
    console.error("setFinanceAccountActive:", error);
    return { error: "Unable to update the account." };
  }
}

export async function createFinanceCategory(input) {
  const profile = await requireFinanceAdmin();
  try {
    const parsed = financeCategorySchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("finance_categories")
      .insert({ ...parsed.data, created_by: profile.id })
      .select("id")
      .single();
    if (error?.code === "23505") return { data: null, error: "That category already exists for this direction." };
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("createFinanceCategory:", error);
    return { data: null, error: "Unable to create the category." };
  }
}

export async function updateFinanceCategory(categoryId, input) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(categoryId);
    if (!id.success) return { data: null, error: "Invalid category." };
    const parsed = financeCategorySchema.safeParse(input);
    if (!parsed.success) return validationResult(parsed);
    const supabase = await createClient();
    const { data: existing, error: fetchError } = await supabase
      .from("finance_categories")
      .select("direction")
      .eq("id", id.data)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!existing) return { data: null, error: "Category not found." };
    if (existing.direction !== parsed.data.direction) {
      return { data: null, error: "Category direction cannot change after creation. Create a new category instead." };
    }
    const { data, error } = await supabase
      .from("finance_categories")
      .update({ name: parsed.data.name, color: parsed.data.color })
      .eq("id", id.data)
      .select("id")
      .single();
    if (error?.code === "23505") return { data: null, error: "That category already exists for this direction." };
    if (error) throw error;
    revalidateFinance();
    return { data, error: null };
  } catch (error) {
    console.error("updateFinanceCategory:", error);
    return { data: null, error: "Unable to update the category." };
  }
}

export async function setFinanceCategoryActive(categoryId, isActive) {
  await requireFinanceAdmin();
  try {
    const id = financeUuidSchema.safeParse(categoryId);
    if (!id.success || typeof isActive !== "boolean") return { error: "Invalid category update." };
    const supabase = await createClient();
    const { error } = await supabase.from("finance_categories").update({ is_active: isActive }).eq("id", id.data);
    if (error) throw error;
    revalidateFinance();
    return { error: null };
  } catch (error) {
    console.error("setFinanceCategoryActive:", error);
    return { error: "Unable to update the category." };
  }
}
