"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"

interface VoiceSettingsProps {
  sectionId: string
}

export function VoiceSettings({ sectionId }: VoiceSettingsProps) {
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
      <PropertyGroup label="Voice Message" description="Upload or link to a voice recording">
        <TextInput 
          label="Label" 
          value={data.label} 
          onChange={(val) => handleChange("label", val)}
          placeholder="A message from me..."
        />
        <TextInput 
          label="Audio URL" 
          value={data.audioUrl} 
          onChange={(val) => handleChange("audioUrl", val)}
          placeholder="https://example.com/voice.mp3"
        />
      </PropertyGroup>
    </div>
  )
}
