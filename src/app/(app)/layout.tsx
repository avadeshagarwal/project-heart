import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ROUTES } from "@/lib/constants"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { getProfile } from "@/lib/db/queries"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.login)
  }

  const { data: profile } = await getProfile(supabase, user.id)

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav user={user} profile={profile} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      <CommandPalette />
    </div>
  )
}
