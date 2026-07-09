"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud } from "lucide-react"

import { useMediaStore } from "@/lib/media/store"
import { cn } from "@/lib/utils"

export function UploadZone() {
  const { addToQueue, allowedTypes } = useMediaStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      addToQueue(acceptedFiles)
    }
  }, [addToQueue])

  // Map our simple "image", "video", "audio" types to mime types
  const acceptMap: Record<string, string[]> = {}
  if (allowedTypes.includes("image")) {
    acceptMap["image/*"] = [".png", ".jpg", ".jpeg", ".webp", ".gif"]
  }
  if (allowedTypes.includes("video")) {
    acceptMap["video/*"] = [".mp4", ".webm", ".mov"]
  }
  if (allowedTypes.includes("audio")) {
    acceptMap["audio/*"] = [".mp3", ".wav", ".ogg"]
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptMap,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
        isDragActive && !isDragReject ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50",
        isDragReject && "border-destructive bg-destructive/5"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">
        {isDragActive ? "Drop files here" : "Drag & drop files"}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        or click to browse from your computer
      </p>
      <p className="mt-4 text-xs text-muted-foreground">
        Supports: {allowedTypes.join(", ")}
      </p>
    </div>
  )
}
