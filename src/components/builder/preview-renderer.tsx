"use client"

import { useEditorStore } from "@/lib/editor/store"
import { SECTION_REGISTRY } from "@/lib/editor/registry"

export function PreviewRenderer() {
  const { sections, selectedSectionIds } = useEditorStore()

  if (sections.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-muted-foreground animate-in fade-in duration-700">
        <p className="text-lg font-medium">Your canvas is empty.</p>
        <p className="mt-2 text-sm">Add a section from the left sidebar to begin building.</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col">
      {sections.map((section) => {
        const isSelected = selectedSectionIds.includes(section.meta.id)
        const Plugin = SECTION_REGISTRY[section.meta.type]

        if (!Plugin) return null
        if (section.meta.isHidden) return null

        return (
          <div
            key={section.meta.id}
            className={`relative w-full border-2 transition-colors ${
              isSelected ? "border-primary" : "border-transparent"
            }`}
          >
            {/* 
              Phase 5.1/5.4: We are only building the foundation.
              Actual section rendering logic will be built per-plugin in future phases.
              For now, we render a placeholder block reflecting the plugin data.
            */}
            <div className="flex min-h-[200px] w-full flex-col items-center justify-center bg-muted/10 p-8">
              <Plugin.icon className="mb-4 h-8 w-8 text-muted-foreground/50" />
              <h3 className="text-xl font-bold">{section.data.title || section.meta.title || Plugin.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{Plugin.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
