/**
 * Supabase Storage service.
 * Provides typed helpers for uploading, downloading, and managing
 * files across all storage buckets.
 */

import type { SupabaseClient } from "@supabase/supabase-js"
import type { StorageBucket, UploadResult } from "@/lib/types"
import { generateStoragePath, isAllowedMimeType, getMaxFileSize, formatFileSize } from "@/lib/db/helpers"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypedClient = SupabaseClient<any, "public", any>

/**
 * Upload a file to a Supabase Storage bucket.
 */
export async function uploadFile(
  client: TypedClient,
  bucket: StorageBucket,
  userId: string,
  file: File
): Promise<{ data: UploadResult | null; error: string | null }> {
  // Validate MIME type
  if (!isAllowedMimeType(bucket, file.type)) {
    return { data: null, error: `File type "${file.type}" is not allowed for this upload.` }
  }

  // Validate file size
  const maxSize = getMaxFileSize(bucket)
  if (file.size > maxSize) {
    return { data: null, error: `File is too large. Maximum size is ${formatFileSize(maxSize)}.` }
  }

  const path = generateStoragePath(userId, file.name)

  const { data, error } = await client.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    return { data: null, error: error.message }
  }

  // Get public URL for public buckets
  const isPublicBucket = bucket === "avatars" || bucket === "template-assets"
  let publicUrl: string | null = null

  if (isPublicBucket) {
    const { data: urlData } = client.storage.from(bucket).getPublicUrl(data.path)
    publicUrl = urlData.publicUrl
  }

  return {
    data: {
      path: data.path,
      fullPath: data.fullPath,
      publicUrl,
    },
    error: null,
  }
}

/**
 * Get a signed URL for a private file (valid for 1 hour by default).
 */
export async function getSignedUrl(
  client: TypedClient,
  bucket: StorageBucket,
  path: string,
  expiresInSeconds: number = 3600
): Promise<{ url: string | null; error: string | null }> {
  const { data, error } = await client.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds)

  if (error) {
    return { url: null, error: error.message }
  }

  return { url: data.signedUrl, error: null }
}

/**
 * Delete a file from a storage bucket.
 */
export async function deleteFile(
  client: TypedClient,
  bucket: StorageBucket,
  path: string
): Promise<{ error: string | null }> {
  const { error } = await client.storage.from(bucket).remove([path])
  return { error: error?.message ?? null }
}

/**
 * List files in a user's folder within a bucket.
 */
export async function listUserFiles(
  client: TypedClient,
  bucket: StorageBucket,
  userId: string,
  options?: { limit?: number; offset?: number }
) {
  const { data, error } = await client.storage
    .from(bucket)
    .list(userId, {
      limit: options?.limit ?? 100,
      offset: options?.offset ?? 0,
      sortBy: { column: "created_at", order: "desc" },
    })

  return { data: data ?? [], error: error?.message ?? null }
}

/**
 * Get the public URL for a file (only works for public buckets).
 */
export function getPublicUrl(
  client: TypedClient,
  bucket: StorageBucket,
  path: string
): string {
  const { data } = client.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
