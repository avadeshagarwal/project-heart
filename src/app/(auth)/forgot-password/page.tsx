"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { resetPassword } from "@/app/actions/auth"
import { ROUTES } from "@/lib/constants"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

type FormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const error = await resetPassword(data.email)
      if (error) {
        toast.error(error)
        return
      }
      setIsSubmitted(true)
      toast.success("Password reset email sent!")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email address and we will send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8">
        {isSubmitted ? (
          <div className="rounded-md bg-muted p-4 border border-border">
             <div className="flex">
                <div className="ml-3 flex-1 md:flex md:justify-between">
                   <p className="text-sm text-muted-foreground">
                      We've sent a password reset link to your email. Please check your inbox.
                   </p>
                </div>
             </div>
             <div className="mt-4">
                <Link href={ROUTES.login}>
                   <Button variant="outline" className="w-full">Return to login</Button>
                </Link>
             </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
                error={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <Button isLoading={isLoading}>Send reset link</Button>
            <div className="text-center mt-4">
               <Link href={ROUTES.login} className="text-sm font-medium text-primary hover:underline">
                  Back to login
               </Link>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
