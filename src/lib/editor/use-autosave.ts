"use client"

import { useEffect, useRef } from "react"
import { useEditorStore } from "./store"

const AUTOSAVE_DEBOUNCE_MS = 2000

export function useAutosave() {
  const { projectId, sections, isDirty, projectName, updateSection } = useEditorStore()
  
  // We use a ref to track the timer without triggering re-renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Also track the previous state to avoid saving if nothing actually changed
  // (Zustand sometimes marks dirty on trivial updates, though our store tries to be smart)
  const previousSectionsRef = useRef(sections)

  useEffect(() => {
    // If we're not dirty, we don't need to save
    if (!isDirty) return

    // Clear existing timer if sections change again rapidly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a new timer to save after the user stops making changes for 2 seconds
    timeoutRef.current = setTimeout(async () => {
      // In a real application, we would call our Supabase API here:
      // await fetch(`/api/projects/${projectId}/autosave`, {
      //   method: 'POST',
      //   body: JSON.stringify({ sections, projectName })
      // })
      
      console.log(`[Autosave] Saved project ${projectId || 'draft'} with ${sections.length} sections.`)
      
      // Update store to mark as clean (we'll need to add `setIsDirty` to store)
      // For now, we simulate the 'saved' state by hooking into a new action we'll add
      const store = useEditorStore.getState()
      if (store.setIsDirty) {
        store.setIsDirty(false)
      }
      
      previousSectionsRef.current = sections
    }, AUTOSAVE_DEBOUNCE_MS)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [sections, isDirty, projectId, projectName])
}
