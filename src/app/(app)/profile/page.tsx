"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updateProfile } from "@/app/actions/profile"
import { AvatarUpload } from "@/components/profile/avatar-upload"

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  timezone: z.string(),
  language: z.string(),
})

type FormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      username: "",
      timezone: "UTC",
      language: "en-US",
    }
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const error = await updateProfile(data)
      if (error) {
        toast.error(error)
        return
      }
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your public profile and personal details.
        </p>
      </div>

      <div className="space-y-8 divide-y">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <AvatarUpload />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-8">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              error={!!errors.fullName}
              {...register("fullName")}
            />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="johndoe"
              error={!!errors.username}
              {...register("username")}
            />
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              placeholder="UTC"
              error={!!errors.timezone}
              {...register("timezone")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              placeholder="en-US"
              error={!!errors.language}
              {...register("language")}
            />
          </div>

          <Button type="submit" isLoading={isLoading}>Save Changes</Button>
        </form>
      </div>
    </div>
  )
}
