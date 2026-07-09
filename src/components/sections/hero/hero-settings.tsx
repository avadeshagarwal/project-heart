"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"
import { ImagePicker } from "../../builder/properties/image-picker"

interface HeroSettingsProps {
  sectionId: string
}

export function HeroSettings({ sectionId }: HeroSettingsProps) {
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
      <PropertyGroup label="Content">
        <TextInput 
          label="Title" 
          value={data.title} 
          onChange={(val) => handleChange("title", val)}
          placeholder="Happy Birthday"
        />
        <TextInput 
          label="Subtitle" 
          value={data.subtitle} 
          onChange={(val) => handleChange("subtitle", val)}
          placeholder="To someone special"
          multiline
        />
        <TextInput 
          label="Button Text" 
          value={data.ctaText} 
          onChange={(val) => handleChange("ctaText", val)}
          placeholder="Scroll down"
        />
      </PropertyGroup>

      <PropertyGroup label="Media" description="Background imagery or video">
        <ImagePicker 
          label="Background Image" 
          value={data.image} 
          onChange={(val) => handleChange("image", val)} 
          description="High quality portrait images work best."
        />
      </PropertyGroup>
    </div>
  )
}
