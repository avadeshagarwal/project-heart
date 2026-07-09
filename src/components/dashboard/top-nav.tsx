"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, LogOut, User as UserIcon, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/app/actions/auth"
import { ROUTES } from "@/lib/constants"
import type { User } from "@supabase/supabase-js"

interface TopNavProps {
  user: User
  profile: any // Will be properly typed when we wire the page up
}

export function TopNav({ user, profile }: TopNavProps) {
  const pathname = usePathname()

  // Breadcrumbs mapping
  const breadcrumbs: Record<string, string> = {
    "/dashboard": "Overview",
    "/projects": "All Projects",
    "/profile": "Profile",
    "/settings": "Settings",
  }
  const currentTitle = breadcrumbs[pathname] || "Dashboard"

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger - we'll implement the sheet later if needed, for now just an icon */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">Project Heart</span>
          <span className="text-muted-foreground hidden sm:inline-block">/</span>
          <span className="text-sm font-medium">{currentTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="hidden w-64 justify-start text-sm text-muted-foreground sm:flex"
          onClick={() => {
            const downEvent = new KeyboardEvent('keydown', {
              key: 'k',
              metaKey: true,
            });
            document.dispatchEvent(downEvent);
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search projects...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <UserIcon className="h-4 w-4" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{profile?.full_name || 'Creator'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.settings} className="w-full cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={logout} className="w-full">
                <button className="flex w-full items-center cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
