"use client"

import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ANIMATION_VARIANTS, type AnimationConfig } from "@/lib/animation/registry"

interface WithAnimationProps {
  children: ReactNode
  config?: AnimationConfig
  inView?: boolean // Should we trigger when scrolling into view? (default true for published site)
  previewMode?: boolean // If true, we might force visible or replay animations
}

/**
 * Higher Order Component to wrap any Experience Builder Section or Element.
 * It reads the configured animation from the user and applies Framer Motion variants.
 */
export function WithAnimation({ 
  children, 
  config = { type: "none", duration: 0.5, delay: 0 },
  inView = true,
  previewMode = false
}: WithAnimationProps) {
  
  if (config.type === "none") {
    return <>{children}</>
  }

  const variants = ANIMATION_VARIANTS[config.type]

  // In the builder preview, we often want animations to play when they mount or update.
  // In published mode, we might want `whileInView`.
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate={previewMode ? "visible" : undefined}
        whileInView={!previewMode && inView ? "visible" : undefined}
        viewport={{ once: true, margin: "-10%" }} // Trigger slightly before it enters screen
        variants={variants}
        transition={{
          duration: config.duration,
          delay: config.delay,
          ease: [0.25, 0.1, 0.25, 1.0], // smooth, premium easing curve (cubic-bezier)
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
