"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createBrowserClient } from "@supabase/ssr"

export function AvatarUpload() {
  const [isUploading, setIsUploading] = React.useState(false)
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null)
  
  // Minimal client creation for storage upload
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setIsUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Simulate getting public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)
      setAvatarUrl(data.publicUrl)
      
      // Update user metadata with new avatar
      await supabase.auth.updateUser({
         data: { avatar_url: data.publicUrl }
      })

      toast.success("Avatar uploaded successfully")
    } catch (error: any) {
      toast.error(error.message || "Error uploading avatar")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="h-24 w-24 overflow-hidden rounded-full bg-muted border border-border flex items-center justify-center">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-sm">No Image</span>
        )}
      </div>
      <div>
        <Label htmlFor="avatar-upload" className="cursor-pointer">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 border border-muted bg-transparent shadow-sm hover:bg-muted hover:text-foreground h-9 px-4 py-2">
             {isUploading ? "Uploading..." : "Upload New Photo"}
          </div>
        </Label>
        <Input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={uploadAvatar}
          disabled={isUploading}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Recommended: Square image, at least 500x500px. JPG, PNG or GIF.
        </p>
      </div>
    </div>
  )
}
