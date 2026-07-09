"use client"

import { useState } from "react"
import { MoreVertical, Edit2, Copy, Archive, Trash2, Undo } from "lucide-react"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { 
  duplicateProject, 
  archiveProject, 
  restoreProject, 
  deleteProject 
} from "@/app/actions/projects"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { renameProject } from "@/app/actions/projects"

interface ProjectActionsDropdownProps {
  projectId: string
  title: string
  status: "draft" | "published" | "archived" | "deleted" | string
}

export function ProjectActionsDropdown({ projectId, title, status }: ProjectActionsDropdownProps) {
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const handleDuplicate = async () => {
    const promise = duplicateProject(projectId)
    toast.promise(promise, {
      loading: "Duplicating project...",
      success: "Project duplicated successfully",
      error: "Failed to duplicate project",
    })
  }

  const handleArchive = async () => {
    const promise = archiveProject(projectId)
    toast.promise(promise, {
      loading: "Archiving project...",
      success: "Project archived",
      error: "Failed to archive project",
    })
  }

  const handleRestore = async () => {
    const promise = restoreProject(projectId)
    toast.promise(promise, {
      loading: "Restoring project...",
      success: "Project restored",
      error: "Failed to restore project",
    })
  }

  const handleDelete = async () => {
    const promise = deleteProject(projectId)
    toast.promise(promise, {
      loading: "Deleting project...",
      success: "Project moved to trash",
      error: "Failed to delete project",
    })
  }

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || newTitle === title) {
      setIsRenameOpen(false)
      return
    }

    const formData = new FormData()
    formData.append("title", newTitle)

    const promise = renameProject(projectId, formData).then((res) => {
      if (res.error) throw new Error(res.error)
      setIsRenameOpen(false)
    })

    toast.promise(promise, {
      loading: "Renaming...",
      success: "Project renamed",
      error: (err) => err.message || "Failed to rename project",
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsRenameOpen(true)}>
            <Edit2 className="mr-2 h-4 w-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {status === "archived" ? (
            <DropdownMenuItem onClick={handleRestore}>
              <Undo className="mr-2 h-4 w-4" />
              Restore
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleArchive}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => setIsDeleting(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>
              Enter a new name for your project.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRename}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="sr-only">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="col-span-3"
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsRenameOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action will move the project to the trash. It will be permanently deleted after 30 days.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={() => {
                handleDelete()
                setIsDeleting(false)
              }}
            >
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
