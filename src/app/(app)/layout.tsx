import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ROUTES, SITE_CONFIG } from "@/lib/constants"
import { logout } from "@/app/actions/auth"

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

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link href={ROUTES.dashboard} className="font-serif text-xl font-bold text-primary">
            {SITE_CONFIG.name}
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href={ROUTES.dashboard} className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:text-primary transition-colors">
              Settings
            </Link>
            <form action={logout}>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {children}
      </main>
    </div>
  )
}
