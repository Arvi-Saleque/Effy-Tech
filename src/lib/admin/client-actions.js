"use server";

import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/admin/auth";
import { createClientSchema, updateClientSchema, uuidSchema, searchSchema, clientStatusFilterSchema } from "./client-schema";
import { revalidatePath } from "next/cache";

/**
 * Validates that the current user is an active admin.
 */
async function requireActiveAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin" || profile.is_active !== true) {
    throw new Error("Unauthorized: Active admin required");
  }
  return profile;
}

/**
 * Normalizes input: empty strings become null.
 */
function normalizeInput(input) {
  const result = { ...input };
  for (const key in result) {
    if (result[key] === "") {
      result[key] = null;
    }
  }
  return result;
}

/**
 * Fetch clients for the client list page.
 */
export async function getClients(filters = {}) {
  try {
    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    // 1. Fetch overall counts efficiently
    const { data: countsData, error: countsError } = await supabase
      .from("clients")
      .select("status");
    
    if (countsError) throw countsError;

    const counts = {
      current: 0,
      active: 0,
      leads: 0,
      archived: 0,
      visible: 0
    };

    if (countsData) {
      counts.active = countsData.filter(c => c.status === "active").length;
      counts.leads = countsData.filter(c => c.status === "lead").length;
      counts.archived = countsData.filter(c => c.status === "archived").length;
      counts.current = counts.active + counts.leads + countsData.filter(c => c.status === "inactive").length;
    }

    // 2. Fetch filtered clients
    let query = supabase
      .from("clients")
      .select("*, projects(count)");

    const statusFilter = clientStatusFilterSchema.parse(filters.status);

    if (statusFilter === "current") {
      query = query.in("status", ["lead", "active", "inactive"]);
    } else if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (filters.search) {
      const parsedSearch = searchSchema.safeParse(filters.search);
      if (parsedSearch.success && parsedSearch.data) {
        // Strip out PostgREST special characters completely to prevent query parser crashes
        const safeText = parsedSearch.data.replace(/[()[\]{},"\\%_]/g, "");
        if (safeText.trim()) {
          const searchTerm = `%${safeText.trim()}%`;
          query = query.or(
            `name.ilike.${searchTerm},company_name.ilike.${searchTerm},contact_person.ilike.${searchTerm},email.ilike.${searchTerm},phone.ilike.${searchTerm}`
          );
        }
      }
    }

    query = query.order("updated_at", { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    counts.visible = data.length;

    return { data, counts, error: null };
  } catch (error) {
    console.error("Error in getClients:", error);
    return { data: [], counts: null, error: "Unable to load clients." };
  }
}

/**
 * Fetch one client by ID with related project summary.
 */
export async function getClientById(clientId) {
  try {
    const uuidCheck = uuidSchema.safeParse(clientId);
    if (!uuidCheck.success) {
      return { data: null, error: "Invalid UUID format." };
    }

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select(`
        *,
        created_by_profile:admin_profiles!created_by(name)
      `)
      .eq("id", clientId)
      .maybeSingle();

    if (clientError) {
      console.error("Database error fetching client:", clientError);
      return { data: null, error: "Unable to load client details." };
    }

    if (!client) {
      return { data: null, error: "Client not found." };
    }

    // This fetches all projects for the client at once, avoiding N+1
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("id, name, status, priority, progress_percent, due_date")
      .eq("client_id", clientId)
      .order("updated_at", { ascending: false });

    if (projectsError) throw projectsError;

    const projectSummary = {
      total: projects.length,
      active: projects.filter(p => p.status === "active").length,
      completed: projects.filter(p => p.status === "completed").length,
      planning: projects.filter(p => p.status === "planning").length,
      latest: projects.slice(0, 5) // Show top 5 latest
    };

    return { data: { ...client, projectSummary }, error: null };
  } catch (error) {
    console.error("Error in getClientById:", error);
    return { data: null, error: "Unable to load client details." };
  }
}

/**
 * Create a new client.
 */
export async function createClient(input) {
  try {
    const profile = await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const normalized = normalizeInput(input);
    const parsed = createClientSchema.safeParse(normalized);

    if (!parsed.success) {
      return { data: null, error: "Validation failed", details: parsed.error.flatten() };
    }

    const newClient = {
      ...parsed.data,
      created_by: profile.id
    };

    const { data, error } = await supabase
      .from("clients")
      .insert(newClient)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/clients");
    return { data, error: null };
  } catch (error) {
    console.error("Error in createClient:", error);
    return { data: null, error: "Unable to create the client." };
  }
}

/**
 * Update an existing client.
 */
export async function updateClient(clientId, input) {
  try {
    const uuidCheck = uuidSchema.safeParse(clientId);
    if (!uuidCheck.success) {
      return { data: null, error: "Invalid UUID format." };
    }

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const normalized = normalizeInput(input);
    const parsed = updateClientSchema.safeParse(normalized);

    if (!parsed.success) {
      return { data: null, error: "Validation failed", details: parsed.error.flatten() };
    }

    // 1. Fetch the existing client to enforce status rules
    const { data: existingClient, error: fetchError } = await supabase
      .from("clients")
      .select("status")
      .eq("id", clientId)
      .maybeSingle();
      
    if (fetchError || !existingClient) {
      return { data: null, error: "Unable to verify existing client status." };
    }

    // 2. Prevent bypass of the archive/restore flow
    if (existingClient.status === "archived" && parsed.data.status && parsed.data.status !== "archived") {
      return { data: null, error: "Cannot change status of an archived client." };
    }
    
    if (existingClient.status !== "archived" && parsed.data.status === "archived") {
      return { data: null, error: "Client can only be archived through the dedicated archive action." };
    }

    // Do not pass id, created_by, or created_at to the update
    const updatePayload = { ...parsed.data };
    // Force status to remain archived if it was archived
    if (existingClient.status === "archived") {
      updatePayload.status = "archived";
    }
    
    const { data, error } = await supabase
      .from("clients")
      .update(updatePayload)
      .eq("id", clientId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${clientId}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in updateClient:", error);
    return { data: null, error: "Unable to update the client." };
  }
}

/**
 * Archive a client.
 */
export async function archiveClient(clientId, options = { force: false }) {
  try {
    const uuidCheck = uuidSchema.safeParse(clientId);
    if (!uuidCheck.success) {
      return { data: null, error: "Invalid UUID format." };
    }

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    // Check for active projects
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("id")
      .eq("client_id", clientId)
      .eq("status", "active");

    if (projectsError) throw projectsError;

    if (projects.length > 0 && !options.force) {
      return {
        data: null,
        error: null,
        requiresConfirmation: true,
        activeProjectCount: projects.length
      };
    }

    const { data, error } = await supabase
      .from("clients")
      .update({ status: "archived" })
      .eq("id", clientId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${clientId}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in archiveClient:", error);
    return { data: null, error: "Unable to archive the client." };
  }
}

/**
 * Restore a client (to inactive).
 */
export async function restoreClient(clientId) {
  try {
    const uuidCheck = uuidSchema.safeParse(clientId);
    if (!uuidCheck.success) {
      return { data: null, error: "Invalid UUID format." };
    }

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from("clients")
      .update({ status: "inactive" })
      .eq("id", clientId)
      .eq("status", "archived") // Only restore if currently archived
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${clientId}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in restoreClient:", error);
    return { data: null, error: "Unable to restore the client." };
  }
}
