import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { MediaStoreState } from './types'

export const useMediaStore = create<MediaStoreState>((set) => ({
  // Queue
  queue: [],
  
  // Library
  items: [],
  isLoadingItems: false,
  
  // UI State
  isOpen: false,
  allowedTypes: ["image", "video", "audio"],
  multiple: false,
  onSelectCallback: undefined,
  
  // Actions
  openManager: (options) => set({
    isOpen: true,
    allowedTypes: options?.allowedTypes ?? ["image", "video", "audio"],
    multiple: options?.multiple ?? false,
    onSelectCallback: options?.onSelect,
  }),
  
  closeManager: () => set({
    isOpen: false,
    onSelectCallback: undefined,
  }),
  
  // Queue Actions
  addToQueue: (files) => set((state) => {
    const newItems = files.map((file) => ({
      id: uuidv4(),
      file,
      status: "idle" as const,
      progress: 0,
    }))
    return { queue: [...state.queue, ...newItems] }
  }),
  
  updateQueueItem: (id, updates) => set((state) => ({
    queue: state.queue.map((item) => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  
  removeFromQueue: (id) => set((state) => ({
    queue: state.queue.filter((item) => item.id !== id)
  })),
  
  clearQueue: () => set({ queue: [] }),
  
  // Library Actions
  setItems: (items) => set({ items }),
  
  setIsLoadingItems: (isLoadingItems) => set({ isLoadingItems }),
  
  addItems: (items) => set((state) => ({
    items: [...items, ...state.items]
  })),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
}))
