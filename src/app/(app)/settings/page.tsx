"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updatePassword } from "@/app/actions/auth"
import { updateSettings, deleteAccount } from "@/app/actions/profile"

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type PasswordFormData = z.infer<typeof passwordSchema>

export default function SettingsPage() {
  const [isPasswordLoading, setIsPasswordLoading] = React.useState(false)
  const [isSettingsLoading, setIsSettingsLoading] = React.useState(false)
  const [marketingEmails, setMarketingEmails] = React.useState(true)
  const [publicProfile, setPublicProfile] = React.useState(false)

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  async function onPasswordSubmit(data: PasswordFormData) {
    setIsPasswordLoading(true)
    try {
      const error = await updatePassword(data.password)
      if (error) {
        toast.error(error)
        return
      }
      toast.success("Password updated successfully")
      resetPasswordForm()
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setIsPasswordLoading(false)
    }
  }
  
  async function savePreferences() {
     setIsSettingsLoading(true)
     try {
       const error = await updateSettings({ marketingEmails, publicProfile })
       if (error) {
         toast.error(error)
         return
       }
       toast.success("Preferences saved successfully")
     } catch (error) {
       toast.error("Failed to save preferences")
     } finally {
       setIsSettingsLoading(false)
     }
  }
  
  async function handleDeleteAccount() {
     if (confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
        const msg = await deleteAccount()
        toast.info(msg)
     }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account security and preferences.
        </p>
      </div>

      <div className="space-y-8 divide-y">
        
        {/* Change Password Section */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-medium">Change Password</h3>
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                error={!!passwordErrors.password}
                {...registerPassword("password")}
              />
              {passwordErrors.password && <p className="text-sm text-destructive">{passwordErrors.password.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                error={!!passwordErrors.confirmPassword}
                {...registerPassword("confirmPassword")}
              />
              {passwordErrors.confirmPassword && <p className="text-sm text-destructive">{passwordErrors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" isLoading={isPasswordLoading}>Update Password</Button>
          </form>
        </div>
        
        {/* Preferences Section */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-medium">Preferences</h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div>
                   <Label className="text-base">Marketing Emails</Label>
                   <p className="text-sm text-muted-foreground">Receive emails about new features and updates.</p>
                </div>
                <input 
                   type="checkbox" 
                   className="h-4 w-4 accent-primary"
                   checked={marketingEmails}
                   onChange={(e) => setMarketingEmails(e.target.checked)}
                />
             </div>
             <div className="flex items-center justify-between">
                <div>
                   <Label className="text-base">Public Profile</Label>
                   <p className="text-sm text-muted-foreground">Allow others to see your public profile page.</p>
                </div>
                <input 
                   type="checkbox" 
                   className="h-4 w-4 accent-primary"
                   checked={publicProfile}
                   onChange={(e) => setPublicProfile(e.target.checked)}
                />
             </div>
             <Button variant="secondary" onClick={savePreferences} isLoading={isSettingsLoading}>
                Save Preferences
             </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4 pt-8">
          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all of your data. This action cannot be undone.
          </p>
          <Button variant="destructive" onClick={handleDeleteAccount}>
             Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
