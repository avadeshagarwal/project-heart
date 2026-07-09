import { Heart, Type, Clock, Image, Music, Video, Mic, Timer, Quote, Minus, MousePointer2, Puzzle, Ticket, Disc, Cake, Grid, Box } from "lucide-react"
import type { SectionType } from "./types"

import { HeroSection } from "@/components/sections/hero/hero-section"
import { HeroSettings } from "@/components/sections/hero/hero-settings"
import { LetterSection } from "@/components/sections/letter/letter-section"
import { LetterSettings } from "@/components/sections/letter/letter-settings"

import { TimelineSection } from "@/components/sections/timeline/timeline-section"
import { TimelineSettings } from "@/components/sections/timeline/timeline-settings"

import { CountdownSection } from "@/components/sections/countdown/countdown-section"
import { CountdownSettings } from "@/components/sections/countdown/countdown-settings"

export interface SectionPlugin {
  type: SectionType
  label: string
  icon: React.ElementType
  description: string
  defaultData: Record<string, any>
  Component?: React.ComponentType<{ data: any, sectionId: string }>
  SettingsComponent?: React.ComponentType<{ sectionId: string }>
}

// The central registry where all future sections register themselves.
export const SECTION_REGISTRY: Record<SectionType, SectionPlugin> = {
  hero: {
    type: "hero",
    label: "Hero",
    icon: Heart,
    description: "A large introductory banner with a title and image.",
    defaultData: {
      title: "Happy Birthday",
      subtitle: "To someone special",
      ctaText: "Scroll to begin",
      align: "center",
      image: null
    },
    Component: HeroSection,
    SettingsComponent: HeroSettings
  },
  letter: {
    type: "letter",
    label: "Letter",
    icon: Type,
    description: "A beautiful typography-focused text block.",
    defaultData: {
      content: "Write your heartfelt message here...",
      signature: "With love,",
      fontFamily: "serif"
    },
    Component: LetterSection,
    SettingsComponent: LetterSettings
  },
  timeline: {
    type: "timeline",
    label: "Timeline",
    icon: Clock,
    description: "A vertical timeline of memories.",
    defaultData: {
      events: []
    },
    Component: TimelineSection,
    SettingsComponent: TimelineSettings
  },
  gallery: {
    type: "gallery",
    label: "Gallery",
    icon: Image,
    description: "A masonry or grid layout of photos.",
    defaultData: {
      images: [],
      layout: "masonry"
    }
  },
  music: {
    type: "music",
    label: "Music",
    icon: Music,
    description: "An audio player block.",
    defaultData: {
      trackUrl: null,
      title: "",
      autoplay: false
    }
  },
  video: {
    type: "video",
    label: "Video",
    icon: Video,
    description: "A video player block.",
    defaultData: {
      videoUrl: null
    }
  },
  voice_message: {
    type: "voice_message",
    label: "Voice Message",
    icon: Mic,
    description: "An intimate voice recording player.",
    defaultData: {
      audioUrl: null,
      waveform: []
    }
  },
  countdown: {
    type: "countdown",
    label: "Countdown",
    icon: Timer,
    description: "A live countdown to a special date.",
    defaultData: {
      targetDate: new Date(Date.now() + 86400000).toISOString(),
      label: "Until the big day"
    },
    Component: CountdownSection,
    SettingsComponent: CountdownSettings
  },
  quote: {
    type: "quote",
    label: "Quote",
    icon: Quote,
    description: "A highlighted blockquote.",
    defaultData: {
      text: "The best thing to hold onto in life is each other.",
      author: "Audrey Hepburn"
    }
  },
  divider: {
    type: "divider",
    label: "Divider",
    icon: Minus,
    description: "A visual separator between sections.",
    defaultData: {
      style: "solid"
    }
  },
  buttons: {
    type: "buttons",
    label: "Buttons",
    icon: MousePointer2,
    description: "Interactive call to action buttons.",
    defaultData: {
      buttons: []
    }
  },
  puzzle: {
    type: "puzzle",
    label: "Puzzle",
    icon: Puzzle,
    description: "An interactive photo jigsaw puzzle.",
    defaultData: {
      image: null,
      difficulty: "medium"
    }
  },
  scratch_card: {
    type: "scratch_card",
    label: "Scratch Card",
    icon: Ticket,
    description: "A digital scratch-off reveal card.",
    defaultData: {
      coverImage: null,
      revealImage: null,
      revealText: "Surprise!"
    }
  },
  balloons: {
    type: "balloons",
    label: "Balloons",
    icon: Disc, // placeholder
    description: "Floating balloons animation.",
    defaultData: {
      colorTheme: "default",
      count: 20
    }
  },
  cake: {
    type: "cake",
    label: "Cake",
    icon: Cake,
    description: "An interactive birthday cake with blowable candles.",
    defaultData: {
      candles: 1
    }
  },
  memory_cards: {
    type: "memory_cards",
    label: "Memory Cards",
    icon: Grid,
    description: "A flip-card matching mini-game.",
    defaultData: {
      pairs: []
    }
  },
  custom: {
    type: "custom",
    label: "Custom",
    icon: Box,
    description: "A blank slate for custom code or rich text.",
    defaultData: {
      html: ""
    }
  }
}
