import { createClient } from "@/lib/supabase/server"
import { getUserProjects } from "@/lib/db/queries"
import Link from "next/link"
import { LayoutGrid, List, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/dashboard/project-card"
import { ProjectListItem } from "@/components/dashboard/project-list-item"
import { CreateProjectModal } from "@/components/dashboard/create-project-modal"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const view = typeof searchParams.view === "string" ? searchParams.view : "grid"
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : "all"

  // Fetch all projects for now. In Phase 5 we can add proper pagination searchParams.
  const { data: allProjects } = await getUserProjects(supabase, user.id, { page: 1, per_page: 100 })
  
  let projects = allProjects
  
  if (filter === "published") {
    projects = allProjects.filter(p => p.status === "published")
  } else if (filter === "draft") {
    projects = allProjects.filter(p => p.status === "draft")
  } else if (filter === "archived") {
    projects = allProjects.filter(p => p.status === "archived")
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-1">
            Manage your digital experiences.
          </p>
        </div>
        <CreateProjectModal />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-4">
          <Tabs value={filter} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all" asChild>
                <Link href={`/projects?filter=all&view=${view}`}>All</Link>
              </TabsTrigger>
              <TabsTrigger value="draft" asChild>
                <Link href={`/projects?filter=draft&view=${view}`}>Drafts</Link>
              </TabsTrigger>
              <TabsTrigger value="published" asChild>
                <Link href={`/projects?filter=published&view=${view}`}>Published</Link>
              </TabsTrigger>
              <TabsTrigger value="archived" asChild>
                <Link href={`/projects?filter=archived&view=${view}`}>Archived</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8 bg-background"
            />
          </div>
          <div className="flex items-center rounded-md border bg-background p-1">
            <Link 
              href={`/projects?filter=${filter}&view=grid`}
              className={`p-1.5 rounded-sm transition-colors ${view === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Link>
            <Link 
              href={`/projects?filter=${filter}&view=list`}
              className={`p-1.5 rounded-sm transition-colors ${view === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Link>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center animate-in fade-in-50 duration-500">
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
            {filter === "all" 
              ? "You haven't created any projects yet." 
              : `You don't have any ${filter} projects.`}
          </p>
          {filter === "all" && <CreateProjectModal />}
        </div>
      ) : (
        <>
          {view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]"></TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Edited</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <ProjectListItem key={project.id} project={project} />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
