"use client"

import { Image as ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// In the future this will hook directly into the MediaManager
// For now it triggers an alert or mock action since MediaManager might need a callback system

interface ImagePickerProps {
  label: string
  value: string | null
  onChange: (url: string | null) => void
  description?: string
}

export function ImagePicker({ label, value, onChange, description }: ImagePickerProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      
      {value ? (
        <div className="relative group rounded-md overflow-hidden border bg-muted aspect-video flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="sm" 
              variant="destructive" 
              className="h-7 text-[10px]"
              onClick={() => onChange(null)}
            >
              <X className="h-3 w-3 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full h-20 border-dashed gap-2 flex-col text-muted-foreground hover:text-foreground"
          onClick={() => {
            // Mocking MediaManager selection for Milestone A
            const sampleImages = [
              "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80", // hearts
              "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", // flowers
              "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80", // rings
            ]
            const random = sampleImages[Math.floor(Math.random() * sampleImages.length)]
            onChange(random)
          }}
        >
          <ImageIcon className="h-5 w-5" />
          <span className="text-xs">Browse Media</span>
        </Button>
      )}
      
      {description && <p className="text-[10px] text-muted-foreground">{description}</p>}
    </div>
  )
}
