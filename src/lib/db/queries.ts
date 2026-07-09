/**
 * Database query helpers.
 * Typed wrappers around Supabase queries for common operations.
 * All functions accept a Supabase client instance to support
 * both server-side and client-side usage.
 *
 * Note: We use SupabaseClient without the Database generic here because
 * the auto-generated types will be wired through `supabase gen types`
 * once the Supabase project is connected. Until then, input validation
 * is handled by Zod schemas and return types are explicit.
 */

import type { SupabaseClient } from "@supabase/supabase-js"
import type { Project } from "@/lib/database.types"
import type { PaginationParams, PaginatedResult } from "@/lib/types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypedClient = SupabaseClient<any, "public", any>

// =========================================
// Profiles
// =========================================

export async function getProfile(client: TypedClient, userId: string) {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .is("deleted_at", null)
    .single()

  return { data, error }
}

export async function getProfileByUsername(client: TypedClient, username: string) {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("username", username)
    .is("deleted_at", null)
    .single()

  return { data, error }
}

export async function updateProfile(
  client: TypedClient,
  userId: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await client
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single()

  return { data, error }
}

// =========================================
// Projects
// =========================================

export async function getUserProjects(
  client: TypedClient,
  userId: string,
  pagination: PaginationParams = { page: 1, per_page: 20 }
): Promise<PaginatedResult<Project>> {
  const from = (pagination.page - 1) * pagination.per_page
  const to = from + pagination.per_page - 1

  const { data, error, count } = await client
    .from("projects")
    .select("*", { count: "exact" })
    .eq("owner_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, to)

  const total = count ?? 0
  const total_pages = Math.ceil(total / pagination.per_page)

  return {
    data: data ?? [],
    count: total,
    page: pagination.page,
    per_page: pagination.per_page,
    total_pages,
    has_next: pagination.page < total_pages,
    has_prev: pagination.page > 1,
  }
}

export async function getProjectById(client: TypedClient, projectId: string) {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .is("deleted_at", null)
    .single()

  return { data, error }
}

export async function getProjectBySlug(
  client: TypedClient,
  ownerId: string,
  slug: string
) {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("owner_id", ownerId)
    .eq("slug", slug)
    .is("deleted_at", null)
    .single()

  return { data, error }
}

export async function getPublishedProject(client: TypedClient, projectId: string) {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .eq("status", "published")
    .is("deleted_at", null)
    .single()

  return { data, error }
}

export async function createProject(
  client: TypedClient,
  project: Record<string, unknown>
) {
  const { data, error } = await client
    .from("projects")
    .insert(project)
    .select()
    .single()

  return { data, error }
}

export async function updateProject(
  client: TypedClient,
  projectId: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await client
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single()

  return { data, error }
}

export async function softDeleteProject(client: TypedClient, projectId: string) {
  const { data, error } = await client
    .from("projects")
    .update({ deleted_at: new Date().toISOString(), status: "deleted" as const })
    .eq("id", projectId)
    .select()
    .single()

  return { data, error }
}

// =========================================
// Project Sections
// =========================================

export async function getProjectSections(client: TypedClient, projectId: string) {
  const { data, error } = await client
    .from("project_sections")
    .select("*")
    .eq("project_id", projectId)
    .is("deleted_at", null)
    .order("display_order", { ascending: true })

  return { data: data ?? [], error }
}

export async function createSection(
  client: TypedClient,
  section: Record<string, unknown>
) {
  const { data, error } = await client
    .from("project_sections")
    .insert(section)
    .select()
    .single()

  return { data, error }
}

export async function updateSection(
  client: TypedClient,
  sectionId: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await client
    .from("project_sections")
    .update(updates)
    .eq("id", sectionId)
    .select()
    .single()

  return { data, error }
}

// =========================================
// Templates
// =========================================

export async function getActiveTemplates(
  client: TypedClient,
  categorySlug?: string
) {
  let query = client
    .from("templates")
    .select("*, template_categories!inner(*)")
    .eq("is_active", true)
    .is("deleted_at", null)
    .order("use_count", { ascending: false })

  if (categorySlug) {
    query = query.eq("template_categories.slug", categorySlug)
  }

  const { data, error } = await query

  return { data: data ?? [], error }
}

export async function getTemplateById(client: TypedClient, templateId: string) {
  const { data, error } = await client
    .from("templates")
    .select("*, template_categories(*)")
    .eq("id", templateId)
    .single()

  return { data, error }
}

// =========================================
// Notifications
// =========================================

export async function getUserNotifications(
  client: TypedClient,
  userId: string,
  pagination: PaginationParams = { page: 1, per_page: 20 }
) {
  const from = (pagination.page - 1) * pagination.per_page
  const to = from + pagination.per_page - 1

  const { data, error, count } = await client
    .from("notifications")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to)

  const total = count ?? 0
  const total_pages = Math.ceil(total / pagination.per_page)

  return {
    data: data ?? [],
    count: total,
    page: pagination.page,
    per_page: pagination.per_page,
    total_pages,
    has_next: pagination.page < total_pages,
    has_prev: pagination.page > 1,
  }
}

export async function markNotificationRead(client: TypedClient, notificationId: string) {
  const { data, error } = await client
    .from("notifications")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("id", notificationId)
    .select()
    .single()

  return { data, error }
}

export async function markAllNotificationsRead(client: TypedClient, userId: string) {
  const { error } = await client
    .from("notifications")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("is_read", false)

  return { error }
}

export async function getUnreadNotificationCount(client: TypedClient, userId: string) {
  const { count, error } = await client
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false)

  return { count: count ?? 0, error }
}
