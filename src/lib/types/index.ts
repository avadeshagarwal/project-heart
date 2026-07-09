/**
 * Shared interfaces and utility types for the application layer.
 * These extend the raw database types with computed fields,
 * join results, and frontend-specific structures.
 */

import type {
  Project,
  Profile,
  ProjectSection,
  TimelineEvent,
  Letter,
  PhotoGalleryItem,
  Video,
  MusicTrack,
  VoiceMessage,
  InteractiveGame,
  Countdown,
  Template,
  TemplateCategory,
  Notification,
  Subscription,
  ProjectComment,
  AnalyticsEvent,
  ProjectView,
  ProjectVisitor,
  SectionType,
  ProjectStatus,
  ProjectVisibility,
} from "@/lib/database.types"

// =========================================
// Composite / Joined Types
// =========================================

/** Project with owner profile attached */
export interface ProjectWithOwner extends Project {
  owner: Pick<Profile, 'id' | 'full_name' | 'username' | 'avatar_url'>
}

/** Project with all its sections */
export interface ProjectWithSections extends Project {
  sections: ProjectSection[]
}

/** Full project with all content (for builder and rendering) */
export interface ProjectFull extends Project {
  owner: Pick<Profile, 'id' | 'full_name' | 'username' | 'avatar_url'>
  sections: ProjectSection[]
  timeline_events: TimelineEvent[]
  letters: Letter[]
  photos: PhotoGalleryItem[]
  videos: Video[]
  music_tracks: MusicTrack[]
  voice_messages: VoiceMessage[]
  games: InteractiveGame[]
  countdowns: Countdown[]
}

/** Template with its category */
export interface TemplateWithCategory extends Template {
  category: TemplateCategory | null
}

/** Notification for display */
export interface NotificationWithMeta extends Notification {
  time_ago: string
}

/** Analytics summary for a project */
export interface ProjectAnalyticsSummary {
  project_id: string
  total_views: number
  unique_visitors: number
  total_likes: number
  total_comments: number
  views_by_date: ProjectView[]
  recent_visitors: ProjectVisitor[]
  top_events: Array<{ event_name: string; count: number }>
}

// =========================================
// API / Action Payloads
// =========================================

export interface CreateProjectPayload {
  title: string
  slug: string
  description?: string
  recipient_name?: string
  occasion?: string
  template_id?: string
  visibility?: ProjectVisibility
}

export interface UpdateProjectPayload {
  title?: string
  description?: string
  recipient_name?: string
  occasion?: string
  status?: ProjectStatus
  visibility?: ProjectVisibility
  theme_config?: Record<string, unknown>
  music_config?: Record<string, unknown>
  section_order?: string[]
  cover_image_url?: string
}

export interface CreateSectionPayload {
  project_id: string
  type: SectionType
  title?: string
  config?: Record<string, unknown>
  display_order?: number
}

export interface UpdateProfilePayload {
  full_name?: string
  username?: string
  bio?: string
  avatar_url?: string
  timezone?: string
  language?: string
}

// =========================================
// Pagination
// =========================================

export interface PaginationParams {
  page: number
  per_page: number
}

export interface PaginatedResult<T> {
  data: T[]
  count: number
  page: number
  per_page: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

// =========================================
// Storage
// =========================================

export type StorageBucket =
  | 'avatars'
  | 'project-photos'
  | 'project-videos'
  | 'music'
  | 'voice-notes'
  | 'template-assets'
  | 'generated-images'
  | 'ai-assets'

export interface UploadResult {
  path: string
  fullPath: string
  publicUrl: string | null
}

// =========================================
// Feature Flags
// =========================================

export interface FeatureFlagCheck {
  key: string
  enabled: boolean
}
