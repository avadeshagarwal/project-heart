/**
 * Supabase Admin client.
 * Uses the Service Role key for server-side admin operations
 * that bypass RLS (e.g., deleting users, managing admin settings).
 * 
 * IMPORTANT: Never expose this client or key to the browser.
 * Only use in Server Actions, API Routes, or Edge Functions.
 */

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL environment variable. " +
      "The admin client requires these to be set on the server."
    )
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
