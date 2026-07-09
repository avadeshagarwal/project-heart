import type { Section } from "@/lib/editor/types"
import { SECTION_REGISTRY } from "@/lib/editor/registry"

export interface ValidationError {
  sectionId: string
  sectionType: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

export function validateProject(sections: Section[]): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (sections.length === 0) {
    errors.push({
      sectionId: "global",
      sectionType: "global",
      message: "Your project must have at least one section before publishing."
    })
    return { isValid: false, errors, warnings }
  }

  sections.forEach((section) => {
    // 1. Check if the section type exists
    const def = SECTION_REGISTRY[section.meta.type]
    if (!def) {
      errors.push({
        sectionId: section.meta.id,
        sectionType: section.meta.type,
        message: `Unknown section type: ${section.meta.type}`
      })
      return
    }

    // 2. Generic fallback validation
    // For example, if it's a hero section, ensure it has a title
    if (section.meta.type === "hero") {
      if (!section.data.title || typeof section.data.title !== "string" || section.data.title.trim() === "") {
        errors.push({ sectionId: section.meta.id, sectionType: section.meta.type, message: "Hero section is missing a title." })
      }
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}
