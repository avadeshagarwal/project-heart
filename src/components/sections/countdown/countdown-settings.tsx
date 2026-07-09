"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"
import { ImagePicker } from "../../builder/properties/image-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CountdownSettingsProps {
  sectionId: string
}

export function CountdownSettings({ sectionId }: CountdownSettingsProps) {
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

  // Next.js inputs require YYYY-MM-DDThh:mm for datetime-local
  const formattedDate = data.targetDate 
    ? new Date(data.targetDate).toISOString().slice(0, 16)
    : ""

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    if (!isNaN(newDate.getTime())) {
      handleChange("targetDate", newDate.toISOString())
    }
  }

  return (
    <div className="space-y-1">
      <PropertyGroup label="Countdown Settings" description="Set the target date and time">
        <TextInput 
          label="Label" 
          value={data.label} 
          onChange={(val) => handleChange("label", val)}
          placeholder="Until the big day"
        />
        
        <div className="space-y-1.5">
          <Label className="text-xs">Target Date & Time</Label>
          <Input 
            type="datetime-local" 
            value={formattedDate} 
            onChange={handleDateChange}
            className="text-xs h-8"
          />
        </div>
      </PropertyGroup>

      <PropertyGroup label="Background" description="Optional background image">
        <ImagePicker 
          label="Background Image" 
          value={data.image} 
          onChange={(val) => handleChange("image", val)} 
        />
      </PropertyGroup>
    </div>
  )
}
