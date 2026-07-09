"use client"

import { Monitor, Smartphone, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/lib/editor/store"

export function DeviceToolbar() {
  const { deviceView, setDeviceView } = useEditorStore()

  return (
    <div className="flex items-center rounded-md border bg-muted/50 p-1">
      <Button
        variant={deviceView === "desktop" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7 rounded-sm"
        onClick={() => setDeviceView("desktop")}
        title="Desktop"
      >
        <Monitor className="h-4 w-4" />
      </Button>
      <Button
        variant={deviceView === "tablet" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7 rounded-sm"
        onClick={() => setDeviceView("tablet")}
        title="Tablet"
      >
        <Tablet className="h-4 w-4" />
      </Button>
      <Button
        variant={deviceView === "mobile" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7 rounded-sm"
        onClick={() => setDeviceView("mobile")}
        title="Mobile"
      >
        <Smartphone className="h-4 w-4" />
      </Button>
    </div>
  )
}
