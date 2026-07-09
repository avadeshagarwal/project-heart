"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FolderGit2, 
  Archive, 
  Settings, 
  Compass, 
  Heart 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ROUTES, SITE_CONFIG } from "@/lib/constants"

const mainNavItems = [
  {
    title: "Overview",
    href: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    title: "All Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Discover",
    href: "/discover",
    icon: Compass,
    disabled: true,
  },
]

const secondaryNavItems = [
  {
    title: "Archived",
    href: "/projects?filter=archived",
    icon: Archive,
  },
  {
    title: "Settings",
    href: ROUTES.settings,
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-muted/20 md:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Link href={ROUTES.dashboard} className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
          <Heart className="h-5 w-5 fill-primary" />
          {SITE_CONFIG.name}
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  item.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8">
          <h4 className="mb-2 px-7 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Library
          </h4>
          <nav className="grid gap-1 px-4">
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
