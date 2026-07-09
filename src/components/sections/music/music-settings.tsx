"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"

interface MusicSettingsProps {
  sectionId: string
}

export function MusicSettings({ sectionId }: MusicSettingsProps) {
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
      <PropertyGroup label="Audio Track" description="Provide a link to an audio file (mp3, wav)">
        <TextInput 
          label="Title" 
          value={data.title} 
          onChange={(val) => handleChange("title", val)}
          placeholder="Our Song..."
        />
        <TextInput 
          label="Track URL" 
          value={data.trackUrl} 
          onChange={(val) => handleChange("trackUrl", val)}
          placeholder="https://example.com/audio.mp3"
        />
      </PropertyGroup>
    </div>
  )
}
