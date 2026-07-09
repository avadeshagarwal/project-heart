"use client"

import Link from "next/link"
import { ArrowLeft, Play, Send, CheckCircle2, CircleDashed } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/lib/editor/store"
import { DeviceToolbar } from "./device-toolbar"

export function TopToolbar() {
  const { projectName, isDirty } = useEditorStore()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => window.location.href = "/dashboard"}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to Dashboard</span>
        </Button>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none">{projectName}</span>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
            {isDirty ? (
              <>
                <CircleDashed className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <span>Saved</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1">
        <DeviceToolbar />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <Play className="h-3.5 w-3.5 fill-current" />
          Preview
        </Button>
        <Button size="sm" className="h-8 gap-2">
          <Send className="h-3.5 w-3.5" />
          Publish
        </Button>
      </div>
    </header>
  )
}
