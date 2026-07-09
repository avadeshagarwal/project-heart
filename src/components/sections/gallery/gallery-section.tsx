"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  url: string | null
  caption: string
}

interface GallerySectionProps {
  data: any
}

export function GallerySection({ data }: GallerySectionProps) {
  const images: GalleryImage[] = data.images || []
  const layout = data.layout || "masonry"
  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (images.length === 0) {
    return (
      <div className="w-full py-20 flex items-center justify-center bg-background text-muted-foreground">
        <p>Add photos to your gallery in the properties panel.</p>
      </div>
    )
  }

  const validImages = images.filter(img => img.url)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % validImages.length)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + validImages.length) % validImages.length)
    }
  }

  return (
    <div className="w-full py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        
        {layout === "masonry" && (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {validImages.map((img, i) => (
              <div 
                key={i} 
                className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url!} 
                  alt={img.caption || `Gallery image ${i + 1}`} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {layout === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {validImages.map((img, i) => (
              <div 
                key={i} 
                className="aspect-square cursor-pointer group relative rounded-xl overflow-hidden bg-muted"
                onClick={() => openLightbox(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url!} 
                  alt={img.caption || `Gallery image ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {layout === "carousel" && (
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar">
            {validImages.map((img, i) => (
              <div 
                key={i} 
                className="flex-none w-[80vw] sm:w-[50vw] md:w-[400px] aspect-[4/5] cursor-pointer group relative rounded-xl overflow-hidden snap-center"
                onClick={() => openLightbox(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url!} 
                  alt={img.caption || `Gallery image ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white text-lg font-medium">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center" onClick={closeLightbox}>
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-6 text-white/50 hover:text-white z-50 p-4"
            onClick={prevImage}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          
          <button 
            className="absolute right-6 text-white/50 hover:text-white z-50 p-4"
            onClick={nextImage}
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full px-16 flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={validImages[lightboxIndex].url!} 
              alt={validImages[lightboxIndex].caption} 
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
            />
            {validImages[lightboxIndex].caption && (
              <p className="text-white/90 text-lg mt-6 text-center max-w-2xl">
                {validImages[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
