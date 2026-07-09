import { SITE_CONFIG } from "@/lib/constants"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground font-serif">
        Welcome to {SITE_CONFIG.name}
      </h1>
      <p className="text-lg text-muted-foreground max-w-[600px]">
        You are successfully authenticated! The core dashboard and experience builder will be implemented in future phases.
      </p>
    </div>
  )
}
