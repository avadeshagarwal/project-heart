"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface VideoSectionProps {
  data: any
}

export function VideoSection({ data }: VideoSectionProps) {
  const videoUrl = data.videoUrl
  const [isPlaying, setIsPlaying] = useState(false)

  // A simple heuristic for YouTube
  const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be")
  
  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    if (isYouTube) {
      // Basic extraction of ID
      const videoId = url.includes("v=") ? url.split("v=")[1]?.split("&")[0] : url.split("/").pop()
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
    return url
  }

  if (!videoUrl) {
    return (
      <div className="w-full py-20 flex items-center justify-center bg-background text-muted-foreground">
        <p>Add a video URL in the properties panel.</p>
      </div>
    )
  }

  return (
    <div className="w-full py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl group cursor-pointer" onClick={() => setIsPlaying(true)}>
          {isPlaying ? (
            <iframe 
              src={getEmbedUrl(videoUrl)} 
              className="absolute inset-0 w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              {/* Optional: if it's youtube, we could try to load the thumbnail here */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="w-20 h-20 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transition-transform group-hover:scale-110 z-10 shadow-lg">
                <Play className="w-10 h-10 ml-2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
