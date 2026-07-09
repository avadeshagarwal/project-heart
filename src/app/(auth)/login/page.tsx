import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { ROUTES } from "@/lib/constants"

export const metadata = {
  title: "Login",
}

export default function LoginPage() {
  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href={ROUTES.signup}
            className="font-medium text-primary hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <AuthForm type="login" />
      </div>
    </>
  )
}
