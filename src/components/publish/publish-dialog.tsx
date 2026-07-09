"use client"

import { useState } from "react"
import { Rocket, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useEditorStore } from "@/lib/editor/store"
import { validateProject, type ValidationError } from "@/lib/publish/validator"

interface PublishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PublishDialog({ open, onOpenChange }: PublishDialogProps) {
  const { sections } = useEditorStore()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishSuccess, setPublishSuccess] = useState(false)
  
  // Run validation on render (or we could memoize it)
  const validation = validateProject(sections)

  const handlePublish = async () => {
    if (!validation.isValid) return
    
    setIsPublishing(true)
    
    // Simulate network request to publishing endpoint
    // In production, this hits `/api/projects/[id]/publish`
    setTimeout(() => {
      setIsPublishing(false)
      setPublishSuccess(true)
    }, 2000)
  }

  const resetAndClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setPublishSuccess(false)
      setIsPublishing(false)
    }, 300) // Reset after animation
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Publish Experience
          </DialogTitle>
          <DialogDescription>
            {publishSuccess 
              ? "Your project is now live and ready to share!"
              : "Review your project before making it publicly accessible."}
          </DialogDescription>
        </DialogHeader>

        {!publishSuccess ? (
          <div className="py-4">
            {validation.isValid ? (
              <div className="rounded-lg border bg-green-500/10 p-4 text-green-700 dark:text-green-400">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Ready to publish
                </div>
                <p className="mt-1 text-sm opacity-90">
                  All checks passed. Your project looks great.
                </p>
                {validation.warnings.length > 0 && (
                  <ul className="mt-3 list-disc pl-5 text-sm opacity-80">
                    {validation.warnings.map((w, i) => (
                      <li key={i}>{w.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                <div className="flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-5 w-5" />
                  Cannot publish yet
                </div>
                <p className="mt-1 text-sm opacity-90">
                  Please fix the following issues before publishing:
                </p>
                <ul className="mt-3 list-disc pl-5 text-sm font-medium">
                  {validation.errors.map((e, i) => (
                    <li key={i}>{e.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">Successfully Published!</h3>
            <p className="text-muted-foreground mt-2">
              Your loved one can now view this experience.
            </p>
          </div>
        )}

        <DialogFooter>
          {!publishSuccess ? (
            <>
              <Button variant="outline" onClick={resetAndClose} disabled={isPublishing}>
                Cancel
              </Button>
              <Button 
                onClick={handlePublish} 
                disabled={!validation.isValid || isPublishing}
                className="gap-2"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Publish Now
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button onClick={resetAndClose} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
