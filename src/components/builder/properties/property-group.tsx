import { ReactNode } from "react"
import { Label } from "@/components/ui/label"

interface PropertyGroupProps {
  label: string
  description?: string
  children: ReactNode
}

export function PropertyGroup({ label, description, children }: PropertyGroupProps) {
  return (
    <div className="space-y-3 py-4 border-b border-border/50 last:border-0">
      <div className="space-y-1">
        <Label className="text-sm font-semibold">{label}</Label>
        {description && (
          <p className="text-[11px] text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
