import { z } from "zod"

// =========================================
// Project Validation Schemas
// =========================================

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().max(2000, "Description is too long").optional(),
  recipient_name: z.string().max(100).optional(),
  occasion: z.string().max(100).optional(),
  template_id: z.string().uuid().optional(),
  visibility: z.enum(["public", "private", "password_protected", "link_only"]).default("link_only"),
})

export const updateProjectSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  recipient_name: z.string().max(100).optional(),
  occasion: z.string().max(100).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  visibility: z.enum(["public", "private", "password_protected", "link_only"]).optional(),
  theme_config: z.record(z.string(), z.unknown()).optional(),
  music_config: z.record(z.string(), z.unknown()).optional(),
  section_order: z.array(z.string().uuid()).optional(),
  cover_image_url: z.string().url().optional(),
})

export const createSectionSchema = z.object({
  project_id: z.string().uuid("Invalid project ID"),
  type: z.enum(["timeline", "letter", "gallery", "video", "music", "voice_message", "game", "countdown", "custom"]),
  title: z.string().max(200).optional(),
  config: z.record(z.string(), z.unknown()).default({}),
  display_order: z.number().int().min(0).default(0),
})

export const updateSectionSchema = z.object({
  title: z.string().max(200).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  display_order: z.number().int().min(0).optional(),
  is_visible: z.boolean().optional(),
})

// =========================================
// Content Validation Schemas
// =========================================

export const timelineEventSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000).optional(),
  event_date: z.string().optional(), // ISO date string
  image_url: z.string().url().optional(),
  icon: z.string().max(50).optional(),
  display_order: z.number().int().min(0).default(0),
})

export const letterSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  title: z.string().max(200).optional(),
  content: z.string().min(1, "Content is required").max(50000),
  font_family: z.string().max(100).default("serif"),
  text_color: z.string().max(20).default("#000000"),
  bg_color: z.string().max(20).default("#ffffff"),
  animation: z.string().max(50).default("fade-in"),
  display_order: z.number().int().min(0).default(0),
})

export const photoSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  image_url: z.string().url("Image URL is required"),
  thumbnail_url: z.string().url().optional(),
  caption: z.string().max(500).optional(),
  alt_text: z.string().max(200).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  file_size: z.number().int().positive().optional(),
  display_order: z.number().int().min(0).default(0),
})

export const videoSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  video_url: z.string().url("Video URL is required"),
  thumbnail_url: z.string().url().optional(),
  title: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  duration: z.number().int().positive().optional(),
  file_size: z.number().int().positive().optional(),
  mime_type: z.string().max(50).optional(),
  display_order: z.number().int().min(0).default(0),
})

export const musicTrackSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  audio_url: z.string().url("Audio URL is required"),
  title: z.string().max(200).optional(),
  artist: z.string().max(200).optional(),
  duration: z.number().int().positive().optional(),
  file_size: z.number().int().positive().optional(),
  is_background: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0),
})

export const voiceMessageSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  audio_url: z.string().url("Audio URL is required"),
  title: z.string().max(200).optional(),
  transcript: z.string().max(10000).optional(),
  duration: z.number().int().positive().optional(),
  file_size: z.number().int().positive().optional(),
  display_order: z.number().int().min(0).default(0),
})

export const gameSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  game_type: z.enum(["quiz", "puzzle", "memory", "scratch_card", "spin_wheel", "treasure_hunt", "custom"]),
  title: z.string().max(200).optional(),
  config: z.record(z.string(), z.unknown()).default({}),
  display_order: z.number().int().min(0).default(0),
})

export const countdownSchema = z.object({
  project_id: z.string().uuid(),
  section_id: z.string().uuid().optional(),
  title: z.string().max(200).optional(),
  target_date: z.string().min(1, "Target date is required"), // ISO datetime string
  message: z.string().max(2000).optional(),
  style_config: z.record(z.string(), z.unknown()).default({}),
  display_order: z.number().int().min(0).default(0),
})

// =========================================
// Type exports from schemas
// =========================================

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type CreateSectionInput = z.infer<typeof createSectionSchema>
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>
export type TimelineEventInput = z.infer<typeof timelineEventSchema>
export type LetterInput = z.infer<typeof letterSchema>
export type PhotoInput = z.infer<typeof photoSchema>
export type VideoInput = z.infer<typeof videoSchema>
export type MusicTrackInput = z.infer<typeof musicTrackSchema>
export type VoiceMessageInput = z.infer<typeof voiceMessageSchema>
export type GameInput = z.infer<typeof gameSchema>
export type CountdownInput = z.infer<typeof countdownSchema>
