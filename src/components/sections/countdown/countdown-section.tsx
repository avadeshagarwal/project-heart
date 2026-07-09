"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CountdownSectionProps {
  data: any
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownSection({ data }: CountdownSectionProps) {
  const label = data.label || "Until the big day"
  const targetDateStr = data.targetDate || new Date(Date.now() + 86400000).toISOString()
  const image = data.image

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const target = new Date(targetDateStr).getTime()

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsFinished(true)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
      setIsFinished(false)
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [targetDateStr])

  if (!isMounted) return null // Prevent hydration mismatch on date math

  return (
    <div className="relative w-full py-24 min-h-[60dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image} 
            alt="Countdown background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      )}

      {/* Content */}
      <div className={cn("relative z-10 flex flex-col items-center", image ? "text-white" : "text-foreground")}>
        <h2 className="text-2xl md:text-4xl font-serif mb-12 text-center tracking-wide">{label}</h2>

        {isFinished ? (
          <div className="text-4xl md:text-6xl font-bold animate-pulse text-primary">
            It&apos;s Here!
          </div>
        ) : (
          <div className="flex items-center gap-4 md:gap-8 text-center">
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="text-3xl md:text-5xl font-light opacity-50 mb-6">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="text-3xl md:text-5xl font-light opacity-50 mb-6">:</span>
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <span className="text-3xl md:text-5xl font-light opacity-50 mb-6">:</span>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
          </div>
        )}
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  // Pad with leading zero
  const formattedValue = value < 10 ? `0${value}` : value

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-7xl font-bold tabular-nums tracking-tighter">
        {formattedValue}
      </div>
      <div className="text-xs md:text-sm uppercase tracking-widest mt-2 opacity-80 font-medium">
        {label}
      </div>
    </div>
  )
}
