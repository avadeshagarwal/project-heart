"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"
import { ImagePicker } from "../../builder/properties/image-picker"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface GallerySettingsProps {
  sectionId: string
}

export function GallerySettings({ sectionId }: GallerySettingsProps) {
  const { sections, updateSection } = useEditorStore()
  const section = sections.find(s => s.meta.id === sectionId)

  if (!section) return null

  const data = section.data
  const images = data.images || []

  const handleUpdateImage = (index: number, key: string, value: any) => {
    const newImages = [...images]
    newImages[index] = { ...newImages[index], [key]: value }
    updateSection(sectionId, { data: { ...data, images: newImages } })
  }

  const handleAddImage = () => {
    const newImages = [...images, { url: null, caption: "" }]
    updateSection(sectionId, { data: { ...data, images: newImages } })
  }

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index)
    updateSection(sectionId, { data: { ...data, images: newImages } })
  }

  return (
    <div className="space-y-1">
      <PropertyGroup label="Layout" description="Choose how photos are displayed">
        <div className="flex gap-2">
          {["grid", "masonry", "carousel"].map(layout => (
            <Button 
              key={layout}
              variant={data.layout === layout ? "default" : "outline"}
              size="sm"
              className="flex-1 capitalize text-xs"
              onClick={() => updateSection(sectionId, { data: { ...data, layout } })}
            >
              {layout}
            </Button>
          ))}
        </div>
      </PropertyGroup>

      <PropertyGroup label="Photos" description="Manage gallery images">
        {images.map((image: any, index: number) => (
          <div key={index} className="relative p-3 border rounded-md bg-card space-y-3 mb-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-destructive z-10"
              onClick={() => handleDeleteImage(index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            
            <ImagePicker 
              label={`Photo ${index + 1}`}
              value={image.url} 
              onChange={(val) => handleUpdateImage(index, "url", val)} 
            />
            <TextInput 
              label="Caption" 
              value={image.caption} 
              onChange={(val) => handleUpdateImage(index, "caption", val)}
              placeholder="A beautiful memory..."
            />
          </div>
        ))}
        
        <Button variant="outline" className="w-full text-xs gap-2" onClick={handleAddImage}>
          <Plus className="h-3 w-3" />
          Add Photo
        </Button>
      </PropertyGroup>
    </div>
  )
}
