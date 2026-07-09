"use client"

import { useMediaStore } from "@/lib/media/store"
import { formatBytes } from "@/lib/media/processing"
import { FileImage, FileVideo, FileAudio, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export function MediaGrid() {
  const { queue, items, isLoadingItems } = useMediaStore()

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Queue Section */}
      {queue.length > 0 && (
        <div>
          <h4 className="mb-3 text-sm font-medium text-muted-foreground">Uploading</h4>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {queue.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-md border bg-muted/30 p-3">
                <div className="flex items-center gap-3">
                  {item.file.type.startsWith("image/") ? (
                    <FileImage className="h-8 w-8 text-muted-foreground" />
                  ) : item.file.type.startsWith("video/") ? (
                    <FileVideo className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <FileAudio className="h-8 w-8 text-muted-foreground" />
                  )}
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium">{item.file.name}</span>
                    <span className="text-xs text-muted-foreground">{formatBytes(item.file.size)}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="capitalize">{item.status}</span>
                  {item.status === "uploading" && <Loader2 className="h-3 w-3 animate-spin" />}
                  {item.status === "success" && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                  {item.status === "error" && <AlertCircle className="h-3 w-3 text-destructive" />}
                </div>
                
                {/* Progress bar */}
                {(item.status === "compressing" || item.status === "uploading") && (
                  <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300" style={{ width: `${item.progress}%` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Library Section */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Your Media</h4>
        {isLoadingItems ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
            <p>No media found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-md border bg-muted/10 transition-colors hover:border-primary/50 cursor-pointer">
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-muted/30">
                    {item.type === "video" ? <FileVideo className="h-8 w-8 text-muted-foreground" /> : <FileAudio className="h-8 w-8 text-muted-foreground" />}
                    <span className="mt-2 w-full truncate px-2 text-center text-xs text-muted-foreground">{item.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
