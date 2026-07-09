export type UploadStatus = "idle" | "compressing" | "uploading" | "success" | "error"

export interface UploadQueueItem {
  id: string
  file: File
  status: UploadStatus
  progress: number // 0-100
  error?: string
  resultUrl?: string
}

export type MediaType = "image" | "video" | "audio"

export interface MediaItem {
  id: string
  name: string
  url: string
  path: string
  type: MediaType
  size: number
  createdAt: string
  metadata: {
    width?: number
    height?: number
    duration?: number
  }
}

export interface MediaStoreState {
  // Queue
  queue: UploadQueueItem[]
  
  // Library
  items: MediaItem[]
  isLoadingItems: boolean
  
  // Global Media Manager UI State
  isOpen: boolean
  allowedTypes: MediaType[]
  multiple: boolean
  onSelectCallback?: (items: MediaItem[]) => void
  
  // Actions
  openManager: (options?: { allowedTypes?: MediaType[]; multiple?: boolean; onSelect?: (items: MediaItem[]) => void }) => void
  closeManager: () => void
  
  // Queue Actions
  addToQueue: (files: File[]) => void
  updateQueueItem: (id: string, updates: Partial<UploadQueueItem>) => void
  removeFromQueue: (id: string) => void
  clearQueue: () => void
  
  // Library Actions
  setItems: (items: MediaItem[]) => void
  setIsLoadingItems: (isLoading: boolean) => void
  addItems: (items: MediaItem[]) => void
  removeItem: (id: string) => void
}
