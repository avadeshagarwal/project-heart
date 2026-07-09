/**
 * Database helper utilities.
 * Pure functions for slug generation, pagination, and common patterns.
 */

/**
 * Generate a URL-safe slug from a string.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100)
}

/**
 * Generate a unique slug by appending a random suffix.
 */
export function generateUniqueSlug(text: string): string {
  const base = generateSlug(text)
  const suffix = Math.random().toString(36).substring(2, 8)
  return `${base}-${suffix}`
}

/**
 * Generate a short code for QR shares or short links.
 */
export function generateShortCode(length: number = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Calculate pagination range for Supabase queries.
 */
export function getPaginationRange(page: number, perPage: number): { from: number; to: number } {
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  return { from, to }
}

/**
 * Build a paginated result from query data.
 */
export function buildPaginatedResult<T>(
  data: T[],
  count: number,
  page: number,
  perPage: number
) {
  const totalPages = Math.ceil(count / perPage)
  return {
    data,
    count,
    page,
    per_page: perPage,
    total_pages: totalPages,
    has_next: page < totalPages,
    has_prev: page > 1,
  }
}

/**
 * Format file size from bytes to a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Validate that a MIME type is allowed for a given storage bucket.
 */
export function isAllowedMimeType(bucket: string, mimeType: string): boolean {
  const allowedTypes: Record<string, string[]> = {
    avatars: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    "project-photos": ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"],
    "project-videos": ["video/mp4", "video/webm", "video/quicktime"],
    music: ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/aac"],
    "voice-notes": ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/webm"],
    "template-assets": ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "application/json"],
    "generated-images": ["image/jpeg", "image/png", "image/webp"],
    "ai-assets": ["image/jpeg", "image/png", "image/webp", "audio/mpeg", "audio/wav", "video/mp4", "application/json"],
  }

  return (allowedTypes[bucket] ?? []).includes(mimeType)
}

/**
 * Get the maximum file size for a given storage bucket (in bytes).
 */
export function getMaxFileSize(bucket: string): number {
  const limits: Record<string, number> = {
    avatars: 5 * 1024 * 1024,           // 5MB
    "project-photos": 10 * 1024 * 1024, // 10MB
    "project-videos": 100 * 1024 * 1024, // 100MB
    music: 20 * 1024 * 1024,            // 20MB
    "voice-notes": 10 * 1024 * 1024,    // 10MB
    "template-assets": 10 * 1024 * 1024, // 10MB
    "generated-images": 10 * 1024 * 1024, // 10MB
    "ai-assets": 50 * 1024 * 1024,      // 50MB
  }

  return limits[bucket] ?? 10 * 1024 * 1024
}

/**
 * Generate a storage file path scoped to a user.
 * Pattern: {userId}/{timestamp}-{random}.{ext}
 */
export function generateStoragePath(userId: string, fileName: string): string {
  const ext = fileName.split(".").pop() ?? "bin"
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${userId}/${timestamp}-${random}.${ext}`
}

/**
 * Extract the file extension from a filename or URL.
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? ""
}

/**
 * Check if a soft-deleted record should be excluded.
 */
export function isNotDeleted<T extends { deleted_at: string | null }>(record: T): boolean {
  return record.deleted_at === null
}
