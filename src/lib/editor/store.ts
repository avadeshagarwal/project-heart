import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { arrayMove } from '@dnd-kit/sortable'
import type { EditorState, Section } from './types'

const initialState = {
  projectId: null,
  projectName: "Untitled Project",
  sections: [],
  selectedSectionIds: [],
  deviceView: "desktop" as const,
  isDragging: false,
  isDirty: false,
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setProjectId: (id, name) => set({ projectId: id, projectName: name }),
      
      setSections: (sections) => set({ sections, isDirty: true }),
      
      addSection: (section, index) => set((state) => {
        const newSections = [...state.sections]
        if (typeof index === 'number') {
          newSections.splice(index, 0, section)
        } else {
          newSections.push(section)
        }
        return { sections: newSections, isDirty: true, selectedSectionIds: [section.meta.id] }
      }),

      updateSection: (id, updates) => set((state) => ({
        sections: state.sections.map((section) => 
          section.meta.id === id 
            ? { ...section, ...updates, meta: { ...section.meta, ...(updates.meta || {}) }, data: { ...section.data, ...(updates.data || {}) } }
            : section
        ),
        isDirty: true,
      })),

      removeSection: (id) => set((state) => ({
        sections: state.sections.filter((s) => s.meta.id !== id),
        selectedSectionIds: state.selectedSectionIds.filter((selectedId) => selectedId !== id),
        isDirty: true,
      })),

      reorderSections: (startIndex, endIndex) => set((state) => ({
        sections: arrayMove(state.sections, startIndex, endIndex),
        isDirty: true,
      })),

      selectSection: (id, multi = false) => set((state) => {
        if (multi) {
          const isSelected = state.selectedSectionIds.includes(id)
          return {
            selectedSectionIds: isSelected
              ? state.selectedSectionIds.filter((sId) => sId !== id)
              : [...state.selectedSectionIds, id]
          }
        }
        return { selectedSectionIds: [id] }
      }),

      clearSelection: () => set({ selectedSectionIds: [] }),

      setDeviceView: (view) => set({ deviceView: view }),
      
      setIsDragging: (isDragging) => set({ isDragging }),
      
      setIsDirty: (isDirty) => set({ isDirty }),

      reset: () => set(initialState),
    }),
    { name: 'EditorStore' }
  )
)
