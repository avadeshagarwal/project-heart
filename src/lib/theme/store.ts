import { create } from 'zustand'
import type { ThemeStoreState, ThemeId } from './types'
import { THEME_PRESETS } from './types'

export const useThemeStore = create<ThemeStoreState>((set) => ({
  currentTheme: "light",
  variables: THEME_PRESETS["light"],
  isCustomizing: false,
  
  setTheme: (id: ThemeId) => set({
    currentTheme: id,
    variables: THEME_PRESETS[id],
    isCustomizing: id === "custom"
  }),
  
  updateVariable: (key, value) => set((state) => ({
    currentTheme: "custom", // Automatically switch to custom if they tweak a variable
    isCustomizing: true,
    variables: {
      ...state.variables,
      [key]: value
    }
  })),
  
  setIsCustomizing: (val) => set({ isCustomizing: val })
}))
