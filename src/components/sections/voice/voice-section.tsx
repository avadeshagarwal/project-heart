"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Mic } from "lucide-react"

interface VoiceSectionProps {
  data: any
}

export function VoiceSection({ data }: VoiceSectionProps) {
  const { audioUrl, label } = data
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const onEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", onEnded)
    
    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  if (!audioUrl) {
    return (
      <div className="w-full py-20 flex items-center justify-center bg-background text-muted-foreground">
        <p>Add a voice recording URL in the properties panel.</p>
      </div>
    )
  }

  // Generate a fake waveform for visual appeal (Milestone B requirement)
  const waveformBars = Array.from({ length: 40 }).map((_, i) => {
    // Math.sin creates a nice natural envelope
    const height = Math.max(10, Math.sin(i / 12) * 40 + Math.random() * 20)
    return height
  })

  return (
    <div className="w-full py-16 bg-background">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-sm">
          
          <button 
            onClick={togglePlay}
            className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Mic className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80 truncate">
                {label || "Voice Message"}
              </span>
            </div>
            
            {/* Waveform Visualization */}
            <div className="relative w-full h-12 flex items-end gap-1">
              {/* Played progress overlay mask */}
              <div 
                className="absolute inset-y-0 left-0 bg-primary/20 mix-blend-multiply z-10 transition-all duration-100 ease-linear pointer-events-none"
                style={{ width: `${progress}%` }}
              />
              
              {/* The bars */}
              {waveformBars.map((height, i) => {
                // Color bars differently based on progress
                const isPlayed = (i / waveformBars.length) * 100 <= progress
                return (
                  <div 
                    key={i}
                    className="flex-1 rounded-full transition-colors duration-150"
                    style={{ 
                      height: `${height}px`,
                      backgroundColor: isPlayed ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'
                    }}
                  />
                )
              })}
            </div>
          </div>
          
          <audio ref={audioRef} src={audioUrl} preload="auto" />
        </div>
      </div>
    </div>
  )
}
