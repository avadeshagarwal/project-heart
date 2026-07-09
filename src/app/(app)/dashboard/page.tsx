import { createClient } from "@/lib/supabase/server"
import { getUserProjects } from "@/lib/db/queries"
import { FolderGit2, HardDrive, Share2, Activity } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectCard } from "@/components/dashboard/project-card"
import { CreateProjectModal } from "@/components/dashboard/create-project-modal"
import { formatFileSize } from "@/lib/db/helpers"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch first page of projects (up to 4 for the recent projects grid)
  const { data: projects, count: totalProjects } = await getUserProjects(supabase, user.id, { page: 1, per_page: 4 })
  
  const publishedProjects = projects.filter(p => p.status === "published").length
  // In a real app with real file sizes tracked in the DB, this would be computed
  const estimatedStorage = formatFileSize(totalProjects * 15 * 1024 * 1024) 

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>
        <CreateProjectModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderGit2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active and draft projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Live experiences
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estimatedStorage}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Images, videos & audio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Views in the last 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">Recent Projects</h3>
          {totalProjects > 4 && (
            <Link href="/projects" className="text-sm text-primary hover:underline font-medium">
              View all
            </Link>
          )}
        </div>
        
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center animate-in fade-in-50 duration-500">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <FolderGit2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">No projects yet</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
              You haven&apos;t created any projects. Get started by creating your first digital experience.
            </p>
            <CreateProjectModal />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
