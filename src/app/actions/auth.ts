"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ROUTES } from "@/lib/constants"
import { headers } from "next/headers"

export async function login(email: string, password: string): Promise<string | null> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return error.message
  }

  return null
}

export async function signup(email: string, password: string): Promise<string | null> {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return error.message
  }

  return null
}

export async function signInWithGoogle(): Promise<string | null> {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return error.message
  }

  if (data?.url) {
    redirect(data.url)
  }

  return null
}

export async function resetPassword(email: string): Promise<string | null> {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/update-password`,
  })

  if (error) {
    return error.message
  }

  return null
}

export async function updatePassword(password: string): Promise<string | null> {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return error.message
  }

  return null
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect(ROUTES.login)
}
