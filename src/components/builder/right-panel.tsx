"use client"

import { useEditorStore } from "@/lib/editor/store"
import { SECTION_REGISTRY } from "@/lib/editor/registry"

export function RightPanel() {
  const { sections, selectedSectionIds } = useEditorStore()

  // For Milestone 1, we only handle single selection in the properties panel
  const selectedSection = sections.find((s) => s.meta.id === selectedSectionIds[0])

  return (
    <aside className="flex w-72 flex-col border-l bg-background">
      <div className="flex h-12 items-center border-b px-4">
        <h3 className="text-sm font-semibold">Properties</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!selectedSection ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
            <p>No section selected.</p>
            <p className="mt-1">Select a section on the canvas or in the layers panel to edit its properties.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Section Type
              </h4>
              <div className="mt-2 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                {(() => {
                  const Plugin = SECTION_REGISTRY[selectedSection.meta.type]
                  if (!Plugin) return null
                  return (
                    <>
                      <Plugin.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{Plugin.label}</span>
                    </>
                  )
                })()}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Settings
              </h4>
              
              {/* 
                Phase 5.1/5.3: Foundation only.
                In future phases, this will dynamically render the specific property controls
                (inputs, toggles, select menus, color pickers) required by the selected Plugin's schema.
                For now, we just dump the data to prove the state flow works.
              */}
              <div className="rounded-md border bg-muted/30 p-3">
                <pre className="text-[10px] overflow-x-auto text-muted-foreground">
                  {JSON.stringify(selectedSection.data, null, 2)}
                </pre>
              </div>
              
              <p className="mt-4 text-xs text-muted-foreground">
                Note: Interactive property controls for this specific section type will be implemented in a subsequent phase.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
