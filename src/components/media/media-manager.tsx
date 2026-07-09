"use client"

import { useEffect } from "react"
import { X, Search, SlidersHorizontal, Image as ImageIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useMediaStore } from "@/lib/media/store"
import { UploadZone } from "./upload-zone"
import { MediaGrid } from "./media-grid"
import { compressImage } from "@/lib/media/processing"

export function MediaManager() {
  const { isOpen, closeManager, queue, updateQueueItem } = useMediaStore()

  // Background processor for the upload queue
  useEffect(() => {
    // Basic mock processing loop for Milestone 5.5 demonstration
    const idleItems = queue.filter(item => item.status === "idle")
    
    idleItems.forEach(async (item) => {
      // 1. Mark as compressing
      updateQueueItem(item.id, { status: "compressing", progress: 10 })
      
      // 2. Compress (client side)
      const processedFile = await compressImage(item.file)
      updateQueueItem(item.id, { progress: 40, status: "uploading" })
      
      // 3. Upload (Mock for now until we hook up Supabase storage)
      // In production, we'd use `uploadFile` from `@/lib/supabase/storage`
      setTimeout(() => {
        updateQueueItem(item.id, { progress: 80 })
        setTimeout(() => {
          updateQueueItem(item.id, { status: "success", progress: 100 })
        }, 1000)
      }, 1000)
    })
  }, [queue, updateQueueItem])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeManager()}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-background">
        <DialogHeader className="p-4 border-b shrink-0 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            <DialogTitle>Media Library</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={closeManager} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="library" className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between shrink-0">
              <TabsList>
                <TabsTrigger value="library">Library</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search media..."
                    className="h-9 w-64 pl-9"
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="library" className="flex-1 overflow-y-auto p-6 m-0 outline-none">
              <MediaGrid />
            </TabsContent>
            
            <TabsContent value="upload" className="flex-1 overflow-y-auto p-6 m-0 outline-none flex flex-col items-center justify-center">
              <div className="w-full max-w-2xl">
                <UploadZone />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="p-4 border-t bg-muted/20 shrink-0 flex justify-end gap-2">
          <Button variant="outline" onClick={closeManager}>Cancel</Button>
          <Button>Insert Media</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
