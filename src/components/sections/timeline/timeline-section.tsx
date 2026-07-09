"use client"

import { cn } from "@/lib/utils"

interface TimelineEvent {
  date: string
  title: string
  description: string
  image: string | null
}

interface TimelineSectionProps {
  data: any
}

export function TimelineSection({ data }: TimelineSectionProps) {
  const events: TimelineEvent[] = data.events || []

  if (events.length === 0) {
    return (
      <div className="w-full py-20 flex items-center justify-center bg-background text-muted-foreground">
        <p>Add timeline events in the properties panel.</p>
      </div>
    )
  }

  return (
    <div className="w-full py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* The center line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        <div className="space-y-16">
          {events.map((event, index) => {
            const isEven = index % 2 === 0

            return (
              <div 
                key={index} 
                className={cn(
                  "relative flex items-center w-full",
                  isEven ? "md:flex-row-reverse" : "md:flex-row",
                  "flex-col md:gap-8"
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 mt-6 md:mt-0 z-10 ring-4 ring-background" />

                {/* Content Box */}
                <div className={cn(
                  "w-full md:w-1/2 pl-10 md:pl-0 flex flex-col",
                  isEven ? "md:items-start" : "md:items-end md:text-right"
                )}>
                  <div className="w-full bg-card border shadow-sm rounded-xl overflow-hidden p-6 hover:shadow-md transition-shadow">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider block mb-2">
                      {event.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{event.title}</h3>
                    
                    {event.image && (
                      <div className="mb-4 rounded-lg overflow-hidden aspect-video relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
