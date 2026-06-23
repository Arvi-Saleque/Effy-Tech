"use server";

import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/admin/auth";
import { revalidatePath } from "next/cache";
import {
  createProjectSchema,
  updateProjectSchema,
  uuidSchema,
  searchSchema,
  projectStatusFilterSchema,
  projectPriorityFilterSchema,
  projectMemberSchema,
} from "./project-schema";

async function requireActiveAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin" || profile.is_active !== true) {
    throw new Error("Unauthorized: Active admin required");
  }
  return profile;
}

function normalizeInput(input) {
  const result = { ...input };
  for (const key in result) {
    if (result[key] === "") {
      result[key] = null;
    }
  }
  return result;
}

export async function getProjects(filters = {}) {
  try {
    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    // 1. Fetch counts
    const { data: countsData, error: countsError } = await supabase
      .from("projects")
      .select("status");

    if (countsError) throw countsError;

    const counts = {
      current: 0,
      planning: 0,
      active: 0,
      onHold: 0,
      completed: 0,
      archived: 0,
      visible: 0,
    };

    if (countsData) {
      counts.planning = countsData.filter(p => p.status === "planning").length;
      counts.active = countsData.filter(p => p.status === "active").length;
      counts.onHold = countsData.filter(p => p.status === "on_hold").length;
      counts.completed = countsData.filter(p => p.status === "completed").length;
      counts.archived = countsData.filter(p => p.status === "archived").length;
      counts.current = counts.planning + counts.active + counts.onHold;
    }

    // 2. Query
    let query = supabase
      .from("projects")
      .select(`
        *,
        clients (id, name, company_name),
        project_members (id, user_id, project_role, admin_profiles(name))
      `);

    const statusFilter = projectStatusFilterSchema.parse(filters.status);
    if (statusFilter === "current") {
      query = query.in("status", ["planning", "active", "on_hold"]);
    } else if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    } else {
      // Exclude archived by default in 'all' unless specifically requested
      query = query.neq("status", "archived");
    }

    const priorityFilter = projectPriorityFilterSchema.parse(filters.priority);
    if (priorityFilter !== "all") {
      query = query.eq("priority", priorityFilter);
    }

    if (filters.clientId) {
      const parsedClient = uuidSchema.safeParse(filters.clientId);
      if (parsedClient.success) {
        query = query.eq("client_id", parsedClient.data);
      }
    }

    if (filters.search) {
      const parsedSearch = searchSchema.safeParse(filters.search);
      if (parsedSearch.success && parsedSearch.data) {
        const searchTerm = `%${parsedSearch.data.trim()}%`;
        // PostgREST foreign table search syntax
        query = query.or(
          `name.ilike.${searchTerm},description.ilike.${searchTerm},clients.name.ilike.${searchTerm},clients.company_name.ilike.${searchTerm}`
        );
      }
    }

    const { data, error } = await query;
    if (error) throw error;

    // Supabase foreign table filters can sometimes return rows where clients is null if it didn't match the OR condition.
    // We will do a post-fetch filter if search is used.
    let filteredData = data;
    if (filters.search) {
       const parsedSearch = searchSchema.safeParse(filters.search);
       if (parsedSearch.success && parsedSearch.data) {
           const s = parsedSearch.data.trim().toLowerCase();
           filteredData = data.filter(p => {
               const pMatch = p.name?.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s);
               const cMatch = p.clients?.name?.toLowerCase().includes(s) || p.clients?.company_name?.toLowerCase().includes(s);
               return pMatch || cMatch;
           });
       }
    }

    if (filters.memberId) {
      const pMember = uuidSchema.safeParse(filters.memberId);
      if (pMember.success) {
        filteredData = filteredData.filter(p => 
          p.project_members.some(m => m.user_id === pMember.data)
        );
      }
    }

    counts.visible = filteredData.length;

    // Sort safely in JS (as requested by prompt)
    const priorityWeight = { urgent: 4, high: 3, normal: 2, low: 1 };
    filteredData.sort((a, b) => {
      if (priorityWeight[b.priority] !== priorityWeight[a.priority]) {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      if (a.due_date && b.due_date) {
        return new Date(a.due_date) - new Date(b.due_date);
      }
      if (a.due_date) return -1;
      if (b.due_date) return 1;
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return { data: filteredData, counts, error: null };
  } catch (error) {
    console.error("Error in getProjects:", error);
    return { data: [], counts: null, error: "Unable to load projects." };
  }
}

export async function getProjectById(projectId) {
  try {
    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) {
      return { data: null, error: "Invalid UUID format." };
    }

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: project, error } = await supabase
      .from("projects")
      .select(`
        *,
        clients (*),
        created_by_profile:admin_profiles!created_by(id, name, email),
        project_members (
          id,
          project_role,
          added_at,
          user:admin_profiles!user_id(id, name, email)
        )
      `)
      .eq("id", projectId)
      .maybeSingle();

    if (error) throw error;
    if (!project) return { data: null, error: "Project not found." };

    return { data: project, error: null };
  } catch (error) {
    console.error("Error in getProjectById:", error);
    return { data: null, error: "Unable to load project details." };
  }
}

export async function createProject(input) {
  try {
    const profile = await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const normalized = normalizeInput(input);
    const parsed = createProjectSchema.safeParse(normalized);

    if (!parsed.success) {
      return { data: null, error: "Validation failed", details: parsed.error.flatten() };
    }

    // Check client validity
    const { data: client, error: clientErr } = await supabase
      .from("clients")
      .select("status")
      .eq("id", parsed.data.client_id)
      .maybeSingle();
    
    if (clientErr || !client) return { data: null, error: "Client not found." };
    if (client.status === "archived") return { data: null, error: "Cannot add project to an archived client." };

    const { initialMembers, ...projectData } = parsed.data;

    // 1. Insert Project
    const newProject = {
      ...projectData,
      created_by: profile.id
    };

    const { data: insertedProject, error: insertError } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();

    if (insertError) throw insertError;

    // 2. Insert Members
    // Ensure creator is an owner if not already in the list
    let membersToInsert = [...initialMembers];
    const hasCreatorAsOwner = membersToInsert.some(m => m.user_id === profile.id && m.project_role === "owner");
    const hasCreatorAnyRole = membersToInsert.some(m => m.user_id === profile.id);

    if (!hasCreatorAnyRole) {
        membersToInsert.push({ user_id: profile.id, project_role: "owner" });
    } else if (!hasCreatorAsOwner) {
        // Find existing creator membership and force it to owner, or ensure at least one owner exists.
        // Rule: Ensure at least one owner.
    }
    
    const hasAnyOwner = membersToInsert.some(m => m.project_role === "owner");
    if (!hasAnyOwner) {
        membersToInsert.push({ user_id: profile.id, project_role: "owner" });
    }

    // Deduplicate members by user_id, taking the first role provided (which is user's selection or owner default)
    const uniqueMembers = [];
    const seenUserIds = new Set();
    for (const m of membersToInsert) {
      if (!seenUserIds.has(m.user_id)) {
        seenUserIds.add(m.user_id);
        uniqueMembers.push({
          project_id: insertedProject.id,
          user_id: m.user_id,
          project_role: m.project_role,
          added_by: profile.id
        });
      }
    }

    const { error: membersError } = await supabase
      .from("project_members")
      .insert(uniqueMembers);

    if (membersError) {
      console.error("Failed to insert members, manual cleanup required or members left empty.", membersError);
      // We will allow the project to exist but it's empty (except for creator if it succeeded).
      // Since no transaction, we won't delete the project. 
    }

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/clients/${parsed.data.client_id}`);
    return { data: insertedProject, error: null };
  } catch (error) {
    console.error("Error in createProject:", error);
    return { data: null, error: "Unable to create project." };
  }
}

export async function updateProject(projectId, input) {
  try {
    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) return { data: null, error: "Invalid UUID format." };

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const normalized = normalizeInput(input);
    const parsed = updateProjectSchema.safeParse(normalized);

    if (!parsed.success) {
      return { data: null, error: "Validation failed", details: parsed.error.flatten() };
    }

    const { data: existing, error: fetchError } = await supabase
      .from("projects")
      .select("status, client_id")
      .eq("id", projectId)
      .maybeSingle();

    if (fetchError || !existing) return { data: null, error: "Project not found." };
    if (existing.status === "archived") return { data: null, error: "Archived projects cannot be edited. Restore first." };
    if (existing.status === "completed") return { data: null, error: "Completed projects cannot be edited normally." };
    if (existing.status === "cancelled") return { data: null, error: "Cancelled projects cannot be edited normally." };

    // Prevent changing client to an archived client
    if (parsed.data.client_id !== existing.client_id) {
       const { data: newClient } = await supabase.from("clients").select("status").eq("id", parsed.data.client_id).single();
       if (newClient?.status === "archived") {
           return { data: null, error: "Cannot move project to an archived client." };
       }
    }

    const { data, error } = await supabase
      .from("projects")
      .update(parsed.data)
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath(`/admin/clients/${existing.client_id}`);
    if (parsed.data.client_id !== existing.client_id) {
      revalidatePath(`/admin/clients/${parsed.data.client_id}`);
    }
    return { data, error: null };
  } catch (error) {
    console.error("Error in updateProject:", error);
    return { data: null, error: "Unable to update project." };
  }
}

export async function archiveProject(projectId, options = { force: false }) {
  try {
    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) return { data: null, error: "Invalid UUID format." };

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: existing, error: fetchErr } = await supabase.from("projects").select("status, client_id").eq("id", projectId).maybeSingle();
    if (fetchErr || !existing) return { data: null, error: "Project not found." };

    if (existing.status === "archived") return { data: null, error: "Project is already archived." };

    if ((existing.status === "active" || existing.status === "on_hold") && !options.force) {
      return { data: null, error: null, requiresConfirmation: true };
    }

    const { data, error } = await supabase
      .from("projects")
      .update({ status: "archived" })
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath(`/admin/clients/${existing.client_id}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in archiveProject:", error);
    return { data: null, error: "Unable to archive project." };
  }
}

export async function restoreProject(projectId) {
  try {
    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) return { data: null, error: "Invalid UUID format." };

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: existing, error: fetchErr } = await supabase.from("projects").select("status, client_id").eq("id", projectId).maybeSingle();
    if (fetchErr || !existing) return { data: null, error: "Project not found." };
    if (existing.status !== "archived") return { data: null, error: "Only archived projects can be restored." };

    const { data, error } = await supabase
      .from("projects")
      .update({ status: "on_hold" }) // Safest state
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath(`/admin/clients/${existing.client_id}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in restoreProject:", error);
    return { data: null, error: "Unable to restore project." };
  }
}

export async function completeProject(projectId) {
  try {
    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) return { data: null, error: "Invalid UUID format." };

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: existing, error: fetchErr } = await supabase.from("projects").select("status, client_id").eq("id", projectId).maybeSingle();
    if (fetchErr || !existing) return { data: null, error: "Project not found." };
    if (existing.status === "archived" || existing.status === "cancelled") {
      return { data: null, error: "Cannot complete an archived or cancelled project." };
    }

    const { data, error } = await supabase
      .from("projects")
      .update({ 
        status: "completed",
        progress_percent: 100,
        completed_at: new Date().toISOString()
      })
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath(`/admin/clients/${existing.client_id}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in completeProject:", error);
    return { data: null, error: "Unable to complete project." };
  }
}

export async function cancelProject(projectId) {
  try {
    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) return { data: null, error: "Invalid UUID format." };

    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: existing, error: fetchErr } = await supabase.from("projects").select("status, client_id").eq("id", projectId).maybeSingle();
    if (fetchErr || !existing) return { data: null, error: "Project not found." };
    if (existing.status === "archived" || existing.status === "completed") {
      return { data: null, error: "Cannot cancel an archived or completed project." };
    }

    const { data, error } = await supabase
      .from("projects")
      .update({ status: "cancelled" })
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath(`/admin/clients/${existing.client_id}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in cancelProject:", error);
    return { data: null, error: "Unable to cancel project." };
  }
}

export async function addProjectMember(projectId, input) {
  try {
    const profile = await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const uuidCheck = uuidSchema.safeParse(projectId);
    if (!uuidCheck.success) return { data: null, error: "Invalid UUID format." };

    const parsed = projectMemberSchema.safeParse(input);
    if (!parsed.success) return { data: null, error: "Invalid member input." };

    // Check if member already exists
    const { data: existingMember } = await supabase
      .from("project_members")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", parsed.data.user_id)
      .maybeSingle();
      
    if (existingMember) return { data: null, error: "User is already a member of this project." };

    const { data, error } = await supabase
      .from("project_members")
      .insert({
        project_id: projectId,
        user_id: parsed.data.user_id,
        project_role: parsed.data.project_role,
        added_by: profile.id
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath(`/admin/projects/${projectId}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in addProjectMember:", error);
    return { data: null, error: "Unable to add project member." };
  }
}

export async function updateProjectMemberRole(projectId, membershipId, role) {
  try {
    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: allMembers, error: membersErr } = await supabase
      .from("project_members")
      .select("id, project_role")
      .eq("project_id", projectId);
      
    if (membersErr) throw membersErr;

    const targetMember = allMembers.find(m => m.id === membershipId);
    if (!targetMember) return { data: null, error: "Membership not found." };

    // Owner safeguard
    if (targetMember.project_role === "owner" && role !== "owner") {
      const otherOwners = allMembers.filter(m => m.project_role === "owner" && m.id !== membershipId);
      if (otherOwners.length === 0) {
        return { data: null, error: "Cannot demote the only owner of the project." };
      }
    }

    const { data, error } = await supabase
      .from("project_members")
      .update({ project_role: role })
      .eq("id", membershipId)
      .select()
      .single();

    if (error) throw error;

    revalidatePath(`/admin/projects/${projectId}`);
    return { data, error: null };
  } catch (error) {
    console.error("Error in updateProjectMemberRole:", error);
    return { data: null, error: "Unable to update member role." };
  }
}

export async function removeProjectMember(projectId, membershipId) {
  try {
    await requireActiveAdmin();
    const supabase = await createSupabaseClient();

    const { data: allMembers, error: membersErr } = await supabase
      .from("project_members")
      .select("id, project_role")
      .eq("project_id", projectId);
      
    if (membersErr) throw membersErr;

    const targetMember = allMembers.find(m => m.id === membershipId);
    if (!targetMember) return { data: null, error: "Membership not found." };

    // Owner safeguard
    if (targetMember.project_role === "owner") {
      const otherOwners = allMembers.filter(m => m.project_role === "owner" && m.id !== membershipId);
      if (otherOwners.length === 0) {
        return { data: null, error: "Cannot remove the only owner of the project." };
      }
    }

    const { error } = await supabase
      .from("project_members")
      .delete()
      .eq("id", membershipId);

    if (error) throw error;

    revalidatePath(`/admin/projects/${projectId}`);
    return { data: true, error: null };
  } catch (error) {
    console.error("Error in removeProjectMember:", error);
    return { data: null, error: "Unable to remove project member." };
  }
}
