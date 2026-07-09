import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { ROUTES } from "@/lib/constants"

export const metadata = {
  title: "Sign up",
}

export default function SignupPage() {
  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={ROUTES.login}
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <AuthForm type="signup" />
      </div>
    </>
  )
}
