/**
 * database.types.ts
 * 
 * Hand-authored TypeScript types mirroring the Supabase schema.
 * These will be replaced by auto-generated types via `supabase gen types`
 * once the Supabase project is connected. Until then, these provide
 * full type safety across the application.
 */

// =========================================
// Enums
// =========================================

export type ProjectStatus = 'draft' | 'published' | 'archived' | 'deleted'
export type ProjectVisibility = 'public' | 'private' | 'password_protected' | 'link_only'
export type SectionType = 'timeline' | 'letter' | 'gallery' | 'video' | 'music' | 'voice_message' | 'game' | 'countdown' | 'custom'
export type TemplateCategorySlug = 'birthday' | 'anniversary' | 'wedding' | 'proposal' | 'valentines' | 'friendship' | 'family' | 'graduation' | 'baby' | 'memorial' | 'holiday' | 'other'
export type GameType = 'quiz' | 'puzzle' | 'memory' | 'scratch_card' | 'spin_wheel' | 'treasure_hunt' | 'custom'
export type SubscriptionTier = 'free' | 'starter' | 'premium' | 'enterprise'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled'
export type PaymentProvider = 'razorpay' | 'stripe' | 'manual'
export type NotificationType = 'project_viewed' | 'project_liked' | 'project_commented' | 'project_shared' | 'subscription_renewed' | 'payment_received' | 'system_announcement' | 'account_activity'
export type ActivityAction = 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'share' | 'view' | 'login' | 'logout' | 'password_change' | 'profile_update' | 'settings_update'
export type ProjectRole = 'owner' | 'editor' | 'viewer'
export type MediaType = 'image' | 'video' | 'audio' | 'document'
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded'
export type DiscountType = 'percentage' | 'fixed'

// =========================================
// Table Row Types
// =========================================

export interface Profile {
  id: string
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  bio: string | null
  timezone: string
  language: string
  subscription_tier: SubscriptionTier
  subscription_expires_at: string | null
  preferences: UserPreferencesJson
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface UserPreferencesJson {
  marketing_emails: boolean
  public_profile: boolean
  email_on_view: boolean
  email_on_like: boolean
}

export interface UserPreference {
  id: string
  user_id: string
  key: string
  value: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface TemplateCategory {
  id: string
  name: string
  slug: TemplateCategorySlug
  description: string | null
  icon: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  preview_url: string | null
  thumbnail_url: string | null
  config: Record<string, unknown>
  is_premium: boolean
  is_active: boolean
  use_count: number
  created_by: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Project {
  id: string
  owner_id: string
  template_id: string | null
  title: string
  slug: string
  description: string | null
  recipient_name: string | null
  occasion: string | null
  status: ProjectStatus
  visibility: ProjectVisibility
  password_hash: string | null
  theme_config: Record<string, unknown>
  music_config: Record<string, unknown>
  section_order: string[]
  cover_image_url: string | null
  custom_domain: string | null
  expires_at: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ProjectMember {
  id: string
  project_id: string
  user_id: string
  role: ProjectRole
  invited_by: string | null
  accepted_at: string | null
  created_at: string
  updated_at: string
}

export interface ProjectSection {
  id: string
  project_id: string
  type: SectionType
  title: string | null
  config: Record<string, unknown>
  display_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface TimelineEvent {
  id: string
  project_id: string
  section_id: string | null
  title: string
  description: string | null
  event_date: string | null
  image_url: string | null
  icon: string | null
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Letter {
  id: string
  project_id: string
  section_id: string | null
  title: string | null
  content: string
  font_family: string
  text_color: string
  bg_color: string
  animation: string
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface PhotoGalleryItem {
  id: string
  project_id: string
  section_id: string | null
  image_url: string
  thumbnail_url: string | null
  caption: string | null
  alt_text: string | null
  width: number | null
  height: number | null
  file_size: number | null
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Video {
  id: string
  project_id: string
  section_id: string | null
  video_url: string
  thumbnail_url: string | null
  title: string | null
  description: string | null
  duration: number | null
  file_size: number | null
  mime_type: string | null
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface MusicTrack {
  id: string
  project_id: string
  section_id: string | null
  audio_url: string
  title: string | null
  artist: string | null
  duration: number | null
  file_size: number | null
  is_background: boolean
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface VoiceMessage {
  id: string
  project_id: string
  section_id: string | null
  audio_url: string
  title: string | null
  transcript: string | null
  duration: number | null
  file_size: number | null
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface InteractiveGame {
  id: string
  project_id: string
  section_id: string | null
  game_type: GameType
  title: string | null
  config: Record<string, unknown>
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Countdown {
  id: string
  project_id: string
  section_id: string | null
  title: string | null
  target_date: string
  message: string | null
  style_config: Record<string, unknown>
  display_order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface PublishedProject {
  id: string
  project_id: string
  version: number
  snapshot: Record<string, unknown>
  published_by: string
  published_at: string
}

export interface QrShare {
  id: string
  project_id: string
  created_by: string
  short_code: string
  qr_image_url: string | null
  scan_count: number
  is_active: boolean
  expires_at: string | null
  created_at: string
  updated_at: string
}

export interface AnalyticsEvent {
  id: string
  project_id: string | null
  user_id: string | null
  event_name: string
  event_data: Record<string, unknown>
  session_id: string | null
  ip_address: string | null
  user_agent: string | null
  referrer: string | null
  country: string | null
  city: string | null
  device_type: string | null
  created_at: string
}

export interface ProjectView {
  id: string
  project_id: string
  view_date: string
  view_count: number
  unique_visitors: number
}

export interface ProjectVisitor {
  id: string
  project_id: string
  visitor_hash: string
  first_visit_at: string
  last_visit_at: string
  visit_count: number
  country: string | null
  device_type: string | null
}

export interface ProjectLike {
  id: string
  project_id: string
  user_id: string | null
  visitor_hash: string | null
  created_at: string
}

export interface ProjectComment {
  id: string
  project_id: string
  user_id: string | null
  parent_id: string | null
  author_name: string | null
  content: string
  is_approved: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string | null
  data: Record<string, unknown>
  is_read: boolean
  read_at: string | null
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  tier: SubscriptionTier
  provider: PaymentProvider | null
  provider_subscription_id: string | null
  starts_at: string
  ends_at: string | null
  cancelled_at: string | null
  is_active: boolean
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Coupon {
  id: string
  code: string
  description: string | null
  discount_type: DiscountType
  discount_value: number
  currency: string
  max_uses: number | null
  current_uses: number
  min_order_amount: number
  applicable_tiers: SubscriptionTier[]
  starts_at: string
  expires_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  subscription_id: string | null
  coupon_id: string | null
  status: OrderStatus
  amount: number
  currency: string
  discount_amount: number
  tax_amount: number
  total_amount: number
  description: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  order_id: string
  user_id: string
  provider: PaymentProvider
  provider_payment_id: string | null
  provider_order_id: string | null
  amount: number
  currency: string
  status: PaymentStatus
  payment_method: string | null
  receipt: string | null
  notes: Record<string, unknown>
  paid_at: string | null
  refunded_at: string | null
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  user_id: string | null
  action: ActivityAction
  entity_type: string
  entity_id: string | null
  old_data: Record<string, unknown> | null
  new_data: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface AdminSetting {
  id: string
  key: string
  value: Record<string, unknown>
  description: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface FeatureFlag {
  id: string
  key: string
  description: string | null
  is_enabled: boolean
  rollout_percentage: number
  allowed_users: string[]
  created_at: string
  updated_at: string
}

// =========================================
// Supabase Database Type Map (compatible with supabase-js)
// =========================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & { created_at?: string; updated_at?: string }
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      user_preferences: {
        Row: UserPreference
        Insert: Omit<UserPreference, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserPreference, 'id' | 'user_id' | 'created_at'>>
      }
      template_categories: {
        Row: TemplateCategory
        Insert: Omit<TemplateCategory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<TemplateCategory, 'id' | 'created_at'>>
      }
      templates: {
        Row: Template
        Insert: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'use_count'>
        Update: Partial<Omit<Template, 'id' | 'created_at'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'owner_id' | 'created_at'>>
      }
      project_members: {
        Row: ProjectMember
        Insert: Omit<ProjectMember, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ProjectMember, 'id' | 'project_id' | 'user_id' | 'created_at'>>
      }
      project_sections: {
        Row: ProjectSection
        Insert: Omit<ProjectSection, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ProjectSection, 'id' | 'project_id' | 'created_at'>>
      }
      timeline_events: {
        Row: TimelineEvent
        Insert: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<TimelineEvent, 'id' | 'project_id' | 'created_at'>>
      }
      letters: {
        Row: Letter
        Insert: Omit<Letter, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Letter, 'id' | 'project_id' | 'created_at'>>
      }
      photo_gallery: {
        Row: PhotoGalleryItem
        Insert: Omit<PhotoGalleryItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<PhotoGalleryItem, 'id' | 'project_id' | 'created_at'>>
      }
      videos: {
        Row: Video
        Insert: Omit<Video, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Video, 'id' | 'project_id' | 'created_at'>>
      }
      music_tracks: {
        Row: MusicTrack
        Insert: Omit<MusicTrack, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MusicTrack, 'id' | 'project_id' | 'created_at'>>
      }
      voice_messages: {
        Row: VoiceMessage
        Insert: Omit<VoiceMessage, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<VoiceMessage, 'id' | 'project_id' | 'created_at'>>
      }
      interactive_games: {
        Row: InteractiveGame
        Insert: Omit<InteractiveGame, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<InteractiveGame, 'id' | 'project_id' | 'created_at'>>
      }
      countdowns: {
        Row: Countdown
        Insert: Omit<Countdown, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Countdown, 'id' | 'project_id' | 'created_at'>>
      }
      published_projects: {
        Row: PublishedProject
        Insert: Omit<PublishedProject, 'id' | 'published_at'>
        Update: never
      }
      qr_shares: {
        Row: QrShare
        Insert: Omit<QrShare, 'id' | 'created_at' | 'updated_at' | 'scan_count'>
        Update: Partial<Omit<QrShare, 'id' | 'project_id' | 'created_by' | 'created_at'>>
      }
      analytics_events: {
        Row: AnalyticsEvent
        Insert: Omit<AnalyticsEvent, 'id' | 'created_at'>
        Update: never
      }
      project_views: {
        Row: ProjectView
        Insert: Omit<ProjectView, 'id'>
        Update: Partial<Pick<ProjectView, 'view_count' | 'unique_visitors'>>
      }
      project_visitors: {
        Row: ProjectVisitor
        Insert: Omit<ProjectVisitor, 'id'>
        Update: Partial<Pick<ProjectVisitor, 'last_visit_at' | 'visit_count' | 'country' | 'device_type'>>
      }
      project_likes: {
        Row: ProjectLike
        Insert: Omit<ProjectLike, 'id' | 'created_at'>
        Update: never
      }
      project_comments: {
        Row: ProjectComment
        Insert: Omit<ProjectComment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Pick<ProjectComment, 'content' | 'is_approved' | 'deleted_at'>>
      }
      notifications: {
        Row: Notification
        Insert: Omit<Notification, 'id' | 'created_at'>
        Update: Partial<Pick<Notification, 'is_read' | 'read_at'>>
      }
      subscriptions: {
        Row: Subscription
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Subscription, 'id' | 'user_id' | 'created_at'>>
      }
      coupons: {
        Row: Coupon
        Insert: Omit<Coupon, 'id' | 'created_at' | 'updated_at' | 'current_uses'>
        Update: Partial<Omit<Coupon, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'user_id' | 'created_at'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Payment, 'id' | 'order_id' | 'user_id' | 'created_at'>>
      }
      activity_logs: {
        Row: ActivityLog
        Insert: Omit<ActivityLog, 'id' | 'created_at'>
        Update: never
      }
      admin_settings: {
        Row: AdminSetting
        Insert: Omit<AdminSetting, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AdminSetting, 'id' | 'created_at'>>
      }
      feature_flags: {
        Row: FeatureFlag
        Insert: Omit<FeatureFlag, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<FeatureFlag, 'id' | 'created_at'>>
      }
    }
    Enums: {
      project_status: ProjectStatus
      project_visibility: ProjectVisibility
      section_type: SectionType
      template_category_slug: TemplateCategorySlug
      game_type: GameType
      subscription_tier: SubscriptionTier
      order_status: OrderStatus
      payment_provider: PaymentProvider
      notification_type: NotificationType
      activity_action: ActivityAction
      project_role: ProjectRole
      media_type: MediaType
    }
  }
}
