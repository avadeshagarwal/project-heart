"use client"

import { useThemeStore } from "@/lib/theme/store"

/**
 * Injects the current theme variables as CSS variables into the DOM.
 * We scope this to the `.experience-canvas` class so it only affects
 * the actual user's creation, not the Editor UI itself.
 */
export function ThemeInjector() {
  const { variables } = useThemeStore()

  // We map the Zustand state variables into raw CSS string
  const cssString = `
    .experience-canvas {
      --primary: ${variables.primary};
      --secondary: ${variables.secondary};
      --background: ${variables.background};
      --foreground: ${variables.foreground};
      --muted: ${variables.muted};
      --accent: ${variables.accent};
      
      --radius: ${variables.borderRadius};
      
      /* Typography */
      font-family: ${variables.fontBody};
    }
    
    .experience-canvas h1, 
    .experience-canvas h2, 
    .experience-canvas h3, 
    .experience-canvas h4, 
    .experience-canvas h5, 
    .experience-canvas h6 {
      font-family: ${variables.fontHeading};
    }
  `

  return (
    <style dangerouslySetInnerHTML={{ __html: cssString }} />
  )
}
