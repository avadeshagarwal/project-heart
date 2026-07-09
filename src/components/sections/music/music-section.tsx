"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface MusicSectionProps {
  data: any
}

export function MusicSection({ data }: MusicSectionProps) {
  const { trackUrl, title } = data
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
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

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  if (!trackUrl) {
    return (
      <div className="w-full py-20 flex items-center justify-center bg-background text-muted-foreground">
        <p>Add a music track URL in the properties panel.</p>
      </div>
    )
  }

  return (
    <div className="w-full py-16 bg-background">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col items-center">
          
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
            <div className="w-8 h-8 rounded-full bg-background" />
          </div>

          <h3 className="font-semibold text-lg mb-6 text-center">{title || "Unknown Track"}</h3>

          <div className="w-full space-y-4">
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-100 ease-linear" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button 
                onClick={togglePlay}
                className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              
              {/* Spacer for symmetry */}
              <div className="w-5 h-5" />
            </div>
          </div>

          <audio ref={audioRef} src={trackUrl} preload="auto" />
        </div>
      </div>
    </div>
  )
}
