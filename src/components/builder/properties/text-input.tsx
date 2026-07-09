"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
  description?: string
}

export function TextInput({ label, value, onChange, placeholder, multiline, description }: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {multiline ? (
        <Textarea 
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-xs resize-none min-h-[80px]"
        />
      ) : (
        <Input 
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-xs h-8"
        />
      )}
      {description && <p className="text-[10px] text-muted-foreground">{description}</p>}
    </div>
  )
}
