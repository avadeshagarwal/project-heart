import type { Variants } from "framer-motion"

export type AnimationType = 
  | "none" 
  | "fade-in" 
  | "fade-up" 
  | "fade-down" 
  | "slide-left" 
  | "slide-right" 
  | "zoom-in" 
  | "blur-in"

export interface AnimationConfig {
  type: AnimationType
  duration: number
  delay: number
}

// Global registry of all available Framer Motion variants
export const ANIMATION_VARIANTS: Record<AnimationType, Variants> = {
  "none": {},
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  "slide-left": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" }
  }
}
