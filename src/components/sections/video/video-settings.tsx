"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"

interface VideoSettingsProps {
  sectionId: string
}

export function VideoSettings({ sectionId }: VideoSettingsProps) {
  const { sections, updateSection } = useEditorStore()
  const section = sections.find(s => s.meta.id === sectionId)

  if (!section) return null

  const data = section.data

  const handleChange = (key: string, value: any) => {
    updateSection(sectionId, {
      data: {
        ...data,
        [key]: value
      }
    })
  }

  return (
    <div className="space-y-1">
      <PropertyGroup label="Video Source" description="Embed a video (YouTube/Vimeo) or direct URL">
        <TextInput 
          label="Video URL" 
          value={data.videoUrl} 
          onChange={(val) => handleChange("videoUrl", val)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </PropertyGroup>
    </div>
  )
}
