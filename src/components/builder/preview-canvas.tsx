"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PreviewRenderer } from "./preview-renderer"
import { cn } from "@/lib/utils"

export function PreviewCanvas() {
  const { deviceView } = useEditorStore()

  // Determine width based on device preview state
  const canvasMaxWidth = {
    desktop: "max-w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-auto p-4 md:p-8">
      <div 
        className={cn(
          "relative h-full w-full overflow-hidden rounded-lg bg-background shadow-2xl ring-1 ring-border transition-all duration-300",
          canvasMaxWidth[deviceView]
        )}
      >
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
          <PreviewRenderer />
        </div>
      </div>
    </div>
  )
}
