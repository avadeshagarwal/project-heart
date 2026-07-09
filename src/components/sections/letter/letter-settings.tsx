"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"

interface LetterSettingsProps {
  sectionId: string
}

export function LetterSettings({ sectionId }: LetterSettingsProps) {
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
      <PropertyGroup label="Content" description="The body of your letter">
        <TextInput 
          label="Message" 
          value={data.content} 
          onChange={(val) => handleChange("content", val)}
          placeholder="Write your heartfelt message here..."
          multiline
        />
        <TextInput 
          label="Signature" 
          value={data.signature} 
          onChange={(val) => handleChange("signature", val)}
          placeholder="With love, John"
        />
      </PropertyGroup>
    </div>
  )
}
