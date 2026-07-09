export type ThemeId = 
  | "light" 
  | "dark" 
  | "birthday" 
  | "proposal" 
  | "wedding" 
  | "luxury" 
  | "minimal" 
  | "glass" 
  | "custom"

export interface ThemeVariables {
  // Colors
  primary: string
  secondary: string
  background: string
  foreground: string
  muted: string
  accent: string
  
  // Typography (CSS Custom Properties mapping to Google Fonts)
  fontHeading: string
  fontBody: string
  
  // Spacing & Geometry
  borderRadius: string // e.g., "0.5rem"
  spacingBase: string // e.g., "1rem"
}

export interface ThemeStoreState {
  currentTheme: ThemeId
  variables: ThemeVariables
  isCustomizing: boolean
  
  // Actions
  setTheme: (id: ThemeId) => void
  updateVariable: (key: keyof ThemeVariables, value: string) => void
  setIsCustomizing: (val: boolean) => void
}

export const THEME_PRESETS: Record<ThemeId, ThemeVariables> = {
  light: {
    primary: "222.2 47.4% 11.2%",
    secondary: "210 40% 96.1%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96.1%",
    accent: "210 40% 96.1%",
    fontHeading: "Inter, sans-serif",
    fontBody: "Inter, sans-serif",
    borderRadius: "0.5rem",
    spacingBase: "1rem"
  },
  dark: {
    primary: "210 40% 98%",
    secondary: "217.2 32.6% 17.5%",
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    accent: "217.2 32.6% 17.5%",
    fontHeading: "Inter, sans-serif",
    fontBody: "Inter, sans-serif",
    borderRadius: "0.5rem",
    spacingBase: "1rem"
  },
  birthday: {
    primary: "330 80% 60%", // Bright pink
    secondary: "45 100% 50%", // Gold
    background: "0 0% 100%",
    foreground: "330 90% 10%",
    muted: "330 20% 95%",
    accent: "180 70% 50%", // Teal
    fontHeading: "Comic Sans MS, cursive", // Placeholder for a playful font
    fontBody: "Inter, sans-serif",
    borderRadius: "1.5rem", // Very rounded
    spacingBase: "1.25rem"
  },
  proposal: {
    primary: "0 0% 15%", // Deep charcoal
    secondary: "35 30% 90%", // Warm white
    background: "35 20% 98%", // Soft cream
    foreground: "0 0% 20%",
    muted: "35 20% 92%",
    accent: "45 80% 60%", // Ring gold
    fontHeading: "Playfair Display, serif",
    fontBody: "Lato, sans-serif",
    borderRadius: "0.25rem",
    spacingBase: "1rem"
  },
  wedding: {
    primary: "200 20% 40%", // Slate blue
    secondary: "0 0% 96%", // Ivory
    background: "0 0% 100%",
    foreground: "200 40% 15%",
    muted: "200 10% 96%",
    accent: "330 30% 80%", // Dusty rose
    fontHeading: "Cormorant Garamond, serif",
    fontBody: "Montserrat, sans-serif",
    borderRadius: "0rem", // Elegant sharp edges
    spacingBase: "1.5rem"
  },
  luxury: {
    primary: "45 90% 50%", // Pure gold
    secondary: "0 0% 10%", // Almost black
    background: "0 0% 5%", // Deepest black
    foreground: "45 90% 80%", // Light gold
    muted: "0 0% 15%",
    accent: "45 90% 50%",
    fontHeading: "Cinzel, serif",
    fontBody: "Inter, sans-serif",
    borderRadius: "0rem",
    spacingBase: "1rem"
  },
  minimal: {
    primary: "0 0% 0%",
    secondary: "0 0% 90%",
    background: "0 0% 100%",
    foreground: "0 0% 0%",
    muted: "0 0% 96%",
    accent: "0 0% 0%",
    fontHeading: "Helvetica Neue, sans-serif",
    fontBody: "Helvetica Neue, sans-serif",
    borderRadius: "0px",
    spacingBase: "1rem"
  },
  glass: {
    primary: "210 100% 100%", // White
    secondary: "210 20% 90%", // Semi-transparent later
    background: "210 50% 10%", // Deep ocean blue
    foreground: "210 100% 100%",
    muted: "210 50% 20%",
    accent: "210 100% 70%", // Bright blue
    fontHeading: "Outfit, sans-serif",
    fontBody: "Outfit, sans-serif",
    borderRadius: "1rem",
    spacingBase: "1rem"
  },
  custom: {
    primary: "222.2 47.4% 11.2%",
    secondary: "210 40% 96.1%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96.1%",
    accent: "210 40% 96.1%",
    fontHeading: "Inter, sans-serif",
    fontBody: "Inter, sans-serif",
    borderRadius: "0.5rem",
    spacingBase: "1rem"
  }
}
