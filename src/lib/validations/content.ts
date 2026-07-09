import { z } from "zod"

// =========================================
// Analytics & Sharing Validation Schemas
// =========================================

export const analyticsEventSchema = z.object({
  project_id: z.string().uuid().optional(),
  event_name: z.string().min(1).max(100),
  event_data: z.record(z.string(), z.unknown()).default({}),
  session_id: z.string().max(100).optional(),
})

export const qrShareSchema = z.object({
  project_id: z.string().uuid("Invalid project ID"),
  short_code: z.string().min(4).max(20).regex(/^[a-zA-Z0-9]+$/, "Short code must be alphanumeric"),
  expires_at: z.string().optional(),
})

export const commentSchema = z.object({
  project_id: z.string().uuid(),
  parent_id: z.string().uuid().optional(),
  author_name: z.string().max(100).optional(),
  content: z.string().min(1, "Comment cannot be empty").max(5000),
})

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>
export type QrShareInput = z.infer<typeof qrShareSchema>
export type CommentInput = z.infer<typeof commentSchema>
