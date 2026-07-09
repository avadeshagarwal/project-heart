"use client"

import { useEditorStore } from "@/lib/editor/store"
import { PropertyGroup } from "../../builder/properties/property-group"
import { TextInput } from "../../builder/properties/text-input"
import { ImagePicker } from "../../builder/properties/image-picker"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface TimelineSettingsProps {
  sectionId: string
}

export function TimelineSettings({ sectionId }: TimelineSettingsProps) {
  const { sections, updateSection } = useEditorStore()
  const section = sections.find(s => s.meta.id === sectionId)

  if (!section) return null

  const data = section.data
  const events = data.events || []

  const handleUpdateEvent = (index: number, key: string, value: any) => {
    const newEvents = [...events]
    newEvents[index] = { ...newEvents[index], [key]: value }
    updateSection(sectionId, { data: { ...data, events: newEvents } })
  }

  const handleAddEvent = () => {
    const newEvents = [...events, { date: "New Date", title: "New Memory", description: "", image: null }]
    updateSection(sectionId, { data: { ...data, events: newEvents } })
  }

  const handleDeleteEvent = (index: number) => {
    const newEvents = events.filter((_: any, i: number) => i !== index)
    updateSection(sectionId, { data: { ...data, events: newEvents } })
  }

  return (
    <div className="space-y-1">
      <PropertyGroup label="Timeline Events" description="Manage your milestones">
        {events.map((event: any, index: number) => (
          <div key={index} className="relative p-3 border rounded-md bg-card space-y-3 mb-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-destructive"
              onClick={() => handleDeleteEvent(index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            
            <TextInput 
              label="Date" 
              value={event.date} 
              onChange={(val) => handleUpdateEvent(index, "date", val)}
              placeholder="e.g. October 2021"
            />
            <TextInput 
              label="Title" 
              value={event.title} 
              onChange={(val) => handleUpdateEvent(index, "title", val)}
              placeholder="First Date"
            />
            <TextInput 
              label="Description" 
              value={event.description} 
              onChange={(val) => handleUpdateEvent(index, "description", val)}
              placeholder="Tell the story..."
              multiline
            />
            <ImagePicker 
              label="Photo" 
              value={event.image} 
              onChange={(val) => handleUpdateEvent(index, "image", val)} 
            />
          </div>
        ))}
        
        <Button variant="outline" className="w-full text-xs gap-2" onClick={handleAddEvent}>
          <Plus className="h-3 w-3" />
          Add Event
        </Button>
      </PropertyGroup>
    </div>
  )
}
