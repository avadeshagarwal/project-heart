"use client"

import { Plus, Eye, EyeOff, Lock, Unlock, MoreHorizontal, Copy, Trash2, Edit2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEditorStore } from "@/lib/editor/store"
import { SECTION_REGISTRY } from "@/lib/editor/registry"
import { BuilderDndContext } from "./dnd-context"
import { SortableItem } from "./sortable-item"
import { SectionType, Section } from "@/lib/editor/types"

export function LeftSidebar() {
  const { sections, addSection, updateSection, removeSection } = useEditorStore()

  const handleAddSection = (type: SectionType) => {
    const plugin = SECTION_REGISTRY[type]
    const newSection: Section = {
      meta: {
        id: uuidv4(),
        type,
        title: plugin.label,
        isHidden: false,
        isLocked: false,
      },
      data: JSON.parse(JSON.stringify(plugin.defaultData)),
    }
    addSection(newSection)
  }

  return (
    <aside className="flex w-72 flex-col border-r bg-background">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <h3 className="text-sm font-semibold">Sections</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Section</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
            {Object.values(SECTION_REGISTRY).map((plugin) => (
              <DropdownMenuItem
                key={plugin.type}
                onClick={() => handleAddSection(plugin.type)}
                className="flex items-center gap-2"
              >
                <plugin.icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm">{plugin.label}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sections.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center text-center text-sm text-muted-foreground">
            <p>No sections yet.</p>
            <p className="mt-1">Click the + to add one.</p>
          </div>
        ) : (
          <BuilderDndContext>
            {sections.map((section) => {
              const Plugin = SECTION_REGISTRY[section.meta.type]
              if (!Plugin) return null

              return (
                <SortableItem key={section.meta.id} id={section.meta.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Plugin.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate text-sm font-medium">
                        {section.meta.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          updateSection(section.meta.id, {
                            meta: { ...section.meta, isHidden: !section.meta.isHidden }
                          })
                        }}
                      >
                        {section.meta.isHidden ? (
                          <EyeOff className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <Eye className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            // Rename logic would go here (could open a dialog or inline edit)
                          }}>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            const duplicate = JSON.parse(JSON.stringify(section))
                            duplicate.meta.id = uuidv4()
                            duplicate.meta.title = `${duplicate.meta.title} (Copy)`
                            addSection(duplicate)
                          }}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            updateSection(section.meta.id, {
                              meta: { ...section.meta, isLocked: !section.meta.isLocked }
                            })
                          }}>
                            {section.meta.isLocked ? (
                              <>
                                <Unlock className="mr-2 h-4 w-4" />
                                Unlock
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Lock
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeSection(section.meta.id)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </SortableItem>
              )
            })}
          </BuilderDndContext>
        )}
      </div>
    </aside>
  )
}
