"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ReactNode } from "react"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { useEditorStore } from "@/lib/editor/store"

interface SortableItemProps {
  id: string
  children: ReactNode
}

export function SortableItem({ id, children }: SortableItemProps) {
  const { selectedSectionIds, selectSection } = useEditorStore()
  const isSelected = selectedSectionIds.includes(id)

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative flex w-full items-center gap-2 rounded-md border p-2 transition-colors",
        isSelected ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50 hover:bg-muted/50",
        isDragging && "opacity-50 shadow-lg border-primary ring-2 ring-primary ring-offset-2"
      )}
      onClick={() => selectSection(id)}
    >
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="flex h-full cursor-grab items-center justify-center p-1 opacity-50 transition-opacity hover:opacity-100 active:cursor-grabbing group-hover:opacity-100"
      >
        <GripVertical className="h-4 w-4" />
        <span className="sr-only">Drag to reorder</span>
      </button>
      
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
