import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ROUTES } from "@/lib/constants"

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.login)
  }

  // Notice there is no TopNav or Sidebar here. 
  // The Builder handles its own full-screen layout.
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {children}
    </div>
  )
}
