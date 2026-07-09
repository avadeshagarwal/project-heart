"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Eye, Lock, Image as ImageIcon } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectActionsDropdown } from "@/components/dashboard/project-actions-dropdown"
import { Project } from "@/lib/database.types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isPublished = project.status === "published"
  const isArchived = project.status === "archived"
  
  // Format last edited time
  const lastEdited = formatDistanceToNow(new Date(project.updated_at || project.created_at), { addSuffix: true })

  const getVisibilityIcon = () => {
    switch (project.visibility) {
      case "public":
        return <Eye className="h-3 w-3 mr-1" />
      case "private":
      case "password_protected":
        return <Lock className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  const getStatusBadge = () => {
    if (isArchived) return <Badge variant="secondary">Archived</Badge>
    if (isPublished) return <Badge variant="success">Published</Badge>
    return <Badge variant="outline">Draft</Badge>
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/50">
        {project.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={project.cover_image_url} 
            alt={project.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
          </div>
        )}
        
        <div className="absolute left-3 top-3 flex gap-2">
          {getStatusBadge()}
        </div>
      </div>
      
      <CardContent className="flex flex-1 flex-col justify-between p-4 pt-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link 
              href={`/projects/${project.id}/builder`}
              className="line-clamp-1 font-semibold hover:underline"
            >
              {project.title}
            </Link>
            <div className="-mr-2 -mt-2">
              <ProjectActionsDropdown 
                projectId={project.id} 
                title={project.title} 
                status={project.status} 
              />
            </div>
          </div>
          
          {project.description && (
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4 py-3 text-xs text-muted-foreground">
        <div className="flex items-center">
          {getVisibilityIcon()}
          <span className="capitalize">{project.visibility?.replace("_", " ")}</span>
        </div>
        <span>Edited {lastEdited}</span>
      </CardFooter>
    </Card>
  )
}
