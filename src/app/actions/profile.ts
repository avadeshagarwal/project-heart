"use server"

import { createClient } from "@/lib/supabase/server"

// Basic server action to update user profile metadata in Supabase
export async function updateProfile(data: {
  fullName: string
  username: string
  timezone: string
  language: string
}) {
  const supabase = await createClient()

  // In Supabase, you can store this in the user's raw_user_meta_data 
  // or a separate `profiles` table. We'll use user metadata for simplicity.
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: data.fullName,
      username: data.username,
      timezone: data.timezone,
      language: data.language,
    },
  })

  if (error) {
    return error.message
  }
  return null
}

export async function updateSettings(data: {
  marketingEmails: boolean
  publicProfile: boolean
}) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: {
      marketing_emails: data.marketingEmails,
      public_profile: data.publicProfile,
    },
  })

  if (error) {
    return error.message
  }
  return null
}

export async function deleteAccount() {
  // NOTE: Calling supabase.auth.admin.deleteUser requires the Service Role Key.
  // Standard users cannot delete themselves directly via the client API in Supabase
  // without a custom edge function or backend endpoint using the service key.
  // For Phase 2, we simulate this or leave it as a backend task.
  return "Account deletion requires admin privileges. Please contact support."
}
