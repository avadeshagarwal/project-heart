"use client"

import Link from "next/link"
import { formatDistanceToNow, format } from "date-fns"
import { Eye, Lock, Image as ImageIcon } from "lucide-react"

import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProjectActionsDropdown } from "@/components/dashboard/project-actions-dropdown"
import { Project } from "@/lib/database.types"

interface ProjectListItemProps {
  project: Project
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  const isPublished = project.status === "published"
  const isArchived = project.status === "archived"
  
  // Format times
  const lastEdited = formatDistanceToNow(new Date(project.updated_at || project.created_at), { addSuffix: true })
  const createdDate = format(new Date(project.created_at), "MMM d, yyyy")

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
    <TableRow>
      <TableCell className="w-[60px]">
        <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted/50">
          {project.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={project.cover_image_url} 
              alt={project.title} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-4 w-4 text-muted-foreground/30" />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <Link 
          href={`/projects/${project.id}/builder`}
          className="hover:underline"
        >
          {project.title}
        </Link>
      </TableCell>
      <TableCell>{getStatusBadge()}</TableCell>
      <TableCell>
        <div className="flex items-center text-muted-foreground">
          {getVisibilityIcon()}
          <span className="capitalize">{project.visibility?.replace("_", " ")}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{createdDate}</TableCell>
      <TableCell className="text-muted-foreground">Edited {lastEdited}</TableCell>
      <TableCell className="text-right">
        <ProjectActionsDropdown 
          projectId={project.id} 
          title={project.title} 
          status={project.status} 
        />
      </TableCell>
    </TableRow>
  )
}
