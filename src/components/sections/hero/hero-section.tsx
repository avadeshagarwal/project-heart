"use client"

import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  data: any
}

export function HeroSection({ data }: HeroSectionProps) {
  const title = data.title || "Happy Birthday"
  const subtitle = data.subtitle || "To someone special"
  const ctaText = data.ctaText || "Scroll to begin"
  const image = data.image

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Media */}
      {image && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white drop-shadow-lg tracking-tight">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl md:text-3xl text-white/90 font-medium drop-shadow-md max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce cursor-pointer">
        <span className="text-xs uppercase tracking-widest text-white/70 font-semibold drop-shadow-sm">{ctaText}</span>
        <ChevronDown className="h-6 w-6 text-white/70" />
      </div>
    </div>
  )
}
