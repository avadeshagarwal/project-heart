"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { 
  createProjectSchema,
  updateProjectSchema
} from "@/lib/validations/project"
import {
  createProject as dbCreateProject,
  updateProject as dbUpdateProject,
  softDeleteProject,
  getProjectById
} from "@/lib/db/queries"
import { ROUTES } from "@/lib/constants"
import { generateUniqueSlug } from "@/lib/db/helpers"

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: "You must be logged in to create a project." }
  }

  const title = formData.get("title") as string
  const slug = generateUniqueSlug(title)

  const validatedFields = createProjectSchema.safeParse({
    title,
    slug,
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.title?.[0] || "Invalid input" }
  }

  const { data: project, error } = await dbCreateProject(supabase, {
    title: validatedFields.data.title,
    slug: validatedFields.data.slug,
    owner_id: user.id,
    status: "draft",
  })

  if (error) {
    return { error: "Failed to create project. Please try again." }
  }

  revalidatePath(ROUTES.dashboard)
  revalidatePath("/projects")
  
  return { success: true, project }
}

export async function renameProject(projectId: string, formData: FormData) {
  const supabase = await createClient()
  const title = formData.get("title") as string

  const validatedFields = updateProjectSchema.safeParse({ title })

  if (!validatedFields.success) {
    return { error: "Invalid title" }
  }

  const { error } = await dbUpdateProject(supabase, projectId, {
    title: validatedFields.data.title,
    updated_at: new Date().toISOString()
  })

  if (error) {
    return { error: "Failed to rename project" }
  }

  revalidatePath(ROUTES.dashboard)
  revalidatePath("/projects")
  
  return { success: true }
}

export async function duplicateProject(projectId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Unauthorized" }

  const { data: originalProject, error: fetchError } = await getProjectById(supabase, projectId)

  if (fetchError || !originalProject) {
    return { error: "Project not found" }
  }

  const newTitle = `${originalProject.title} (Copy)`
  const newSlug = generateUniqueSlug(newTitle)

  const { data: newProject, error: createError } = await dbCreateProject(supabase, {
    title: newTitle,
    slug: newSlug,
    owner_id: user.id,
    status: "draft",
    description: originalProject.description,
    recipient_name: originalProject.recipient_name,
    occasion: originalProject.occasion,
    theme_config: originalProject.theme_config,
    music_config: originalProject.music_config,
    cover_image_url: originalProject.cover_image_url
  })

  if (createError) {
    return { error: "Failed to duplicate project" }
  }

  // NOTE: A complete duplication would also involve copying all sections and content blocks.
  // This is a complex background task that should be handled by an edge function or queue in the future.
  // For now, we duplicate the top-level project settings.

  revalidatePath(ROUTES.dashboard)
  revalidatePath("/projects")
  
  return { success: true, project: newProject }
}

export async function archiveProject(projectId: string) {
  const supabase = await createClient()
  
  const { error } = await dbUpdateProject(supabase, projectId, {
    status: "archived",
    updated_at: new Date().toISOString()
  })

  if (error) {
    return { error: "Failed to archive project" }
  }

  revalidatePath(ROUTES.dashboard)
  revalidatePath("/projects")
  
  return { success: true }
}

export async function restoreProject(projectId: string) {
  const supabase = await createClient()
  
  const { error } = await dbUpdateProject(supabase, projectId, {
    status: "draft",
    updated_at: new Date().toISOString()
  })

  if (error) {
    return { error: "Failed to restore project" }
  }

  revalidatePath(ROUTES.dashboard)
  revalidatePath("/projects")
  
  return { success: true }
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient()
  
  const { error } = await softDeleteProject(supabase, projectId)

  if (error) {
    return { error: "Failed to delete project" }
  }

  revalidatePath(ROUTES.dashboard)
  revalidatePath("/projects")
  
  return { success: true }
}
