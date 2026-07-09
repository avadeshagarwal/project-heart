import { z } from "zod"

// =========================================
// Profile Validation Schemas
// =========================================

export const updateProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long")
    .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores")
    .optional(),
  bio: z.string().max(500, "Bio is too long").optional(),
  avatar_url: z.string().url().optional(),
  timezone: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
})

export const updatePreferencesSchema = z.object({
  marketing_emails: z.boolean().optional(),
  public_profile: z.boolean().optional(),
  email_on_view: z.boolean().optional(),
  email_on_like: z.boolean().optional(),
})

export const changePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
