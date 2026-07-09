"use client"

import { useEditorStore } from "@/lib/editor/store"

export function BottomStatusBar() {
  const { sections, selectedSectionIds } = useEditorStore()

  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t bg-muted/30 px-4 text-[10px] text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>{sections.length} sections</span>
        <span>{selectedSectionIds.length} selected</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Project Heart OS v1.0</span>
      </div>
    </footer>
  )
}
