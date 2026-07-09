"use client"

import { ReactNode } from "react"
import { TopToolbar } from "./top-toolbar"
import { BottomStatusBar } from "./bottom-status-bar"
import { LeftSidebar } from "./left-sidebar"
import { RightPanel } from "./right-panel"
import { PreviewCanvas } from "./preview-canvas"

interface EditorShellProps {
  children?: ReactNode
}

export function EditorShell({ children }: EditorShellProps) {
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
    </div>
  )
}
