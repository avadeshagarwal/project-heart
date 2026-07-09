import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"

import { getProjectById } from "@/lib/db/queries"
import { EditorShell } from "@/components/builder/editor-shell"
import { ROUTES } from "@/lib/constants"

export default async function BuilderPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.login)
  }

  const { data: project, error } = await getProjectById(supabase, params.id)

  if (error || !project) {
    notFound()
  }

  // TODO: We need a Client Component wrapper to inject this `project` data into the Zustand store on mount.
  // For now, the EditorShell will just render. We'll add the initialization later.
  return <EditorShell />
}
