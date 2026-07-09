"use client"

import { ReactNode } from "react"
import { TopToolbar } from "./top-toolbar"
import { BottomStatusBar } from "./bottom-status-bar"
import { LeftSidebar } from "./left-sidebar"
import dynamic from "next/dynamic"
import { RightPanel } from "./right-panel"
import { PreviewCanvas } from "./preview-canvas"
import { ThemeInjector } from "@/components/theme/theme-injector"
import { useAutosave } from "@/lib/editor/use-autosave"

// Lazy load heavy global modals
const MediaManager = dynamic(() => import("@/components/media/media-manager").then(mod => mod.MediaManager), { ssr: false })

interface EditorShellProps {
  children?: ReactNode
}

export function EditorShell({ children }: EditorShellProps) {
  // Mount autosave watcher
  useAutosave()

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Top Navigation / Toolbar */}
      <TopToolbar />

      {/* Main Builder Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Layers/Navigator) */}
        <LeftSidebar />

        {/* Center Canvas (Preview) */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-muted/20">
          <PreviewCanvas />
        </div>

        {/* Right Panel (Inspector/Properties) */}
        <RightPanel />
      </div>

      {/* Bottom Status Bar */}
      <BottomStatusBar />

      {/* Global Modals */}
      <MediaManager />
      
      {/* Dynamic Style Injection for Canvas */}
      <ThemeInjector />
    </div>
  )
}
